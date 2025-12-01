const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const Visitor = require("../models/visitors");
const generateToken = require("../utils/generateToken.js");
const { ResponseMessage } = require("../utils/responseMessage.js");
const bcrypt = require("bcryptjs");
const { Resend } = require("resend");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, unAuthenticatedError } = require("../errors/errorsIndex");

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// JWT config
const JWT_CONFIG = { expiresIn: "30m" };

// Generate numeric verification codes
const generateVerificationCode = (digits = 6) =>
  Math.floor(10 ** (digits - 1) + Math.random() * 9 * 10 ** (digits - 1));

// Centralized error handler
const handleError = (error, res, message = "Server error, please try again later.") => {
  console.error(message, error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: message });
};

// Find user by email
const findUserByEmail = async (email) => User.findOne({ email });

// Send email using Resend
const sendEmail = async (to, subject, html, from = process.env.MAILER_EMAIL) => {
  try {
    const { data } = await resend.emails.send({ from, to, subject, html });
    return data;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

// ======================= CONTROLLERS ======================= //

// Get all users
const getallclient = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ clients: users });
  } catch (error) {
    handleError(error, res);
  }
};

// Get single user
const getOneclient = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

// Delete single user
const deleteOneclient = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

// Get all blocked users
const getallBlockedclient = async (req, res) => {
  try {
    const users = await User.find({ blocked: true });
    res.status(StatusCodes.OK).json({ clients: users });
  } catch (error) {
    handleError(error, res);
  }
};

// User registration - send verification code
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await findUserByEmail(email)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "User with this email already exists." });
    }

    const verificationCode = generateVerificationCode();
    const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET || "johnsundayjwtsecret", JWT_CONFIG);

    const emailHtml = `
      <div style="text-align:left; padding:20px">
        <h4>Apex Corporate Account Verification Code</h4>
        <h2>Hi ${name}, your account is almost ready!</h2>
        <p>Copy and paste the code below to complete registration:</p>
        <p style="padding:10px; font-size:30px; color:black">${verificationCode}</p>
        <p>If you didn't request this code, ignore this message.</p>
      </div>
    `;

    await sendEmail(email, "Your Email Verification Code", emailHtml);

    res.status(StatusCodes.OK).json({
      message: "Verification email sent successfully.",
      code: verificationCode,
      token,
    });
  } catch (error) {
    handleError(error, res, "Error during registration");
  }
};

// Account activation
const accountActivation = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.createJWT();

    const welcomeEmailHtml = `
      <div style="text-align:left; padding:20px">
        <h2>Hi ${user.name}, your account is ready!</h2>
        <p>Login and choose a plan to start earning.</p>
      </div>
    `;

    const adminNotificationHtml = `<div style="padding:20px"><h2>New User: ${user.name} (${user.email})</h2></div>`;

    await Promise.all([
      sendEmail(user.email, "Welcome To Apex Corporate", welcomeEmailHtml),
      sendEmail(process.env.MAILER_EMAIL, "New User", adminNotificationHtml),
    ]);

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    handleError(error, res, "Account activation error");
  }
};

// Dashboard info
const dashboard = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) throw new unAuthenticatedError("No token found, please login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "johnsundayjwtsecret");
    const user = await User.findById(decoded.userId);
    if (!user) throw new unAuthenticatedError("User not found");

    res.status(StatusCodes.OK).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        blocked: user.blocked,
        accountType: user.accountType,
        withdrawableBalance: user.withdrawableBalance,
        referalCode: user.referalCode,
        notifications: user.notifications,
        referlink: user.referalLink,
      },
      accounts: {
        balance: user.totalBalance,
        totalDeposite: user.totaldeposite,
        totalWithdraw: user.totalWithdraw,
        capital: user.capital,
        withdrawableBalance: user.withdrawableBalance,
        dailyEarnings: user.dailyEarnings,
        activeplan: user.activePlan,
        status: user.status,
        connectWallet: user.wallet,
        depositeBonus: user.depositeBonus,
        signupBonus: user.signupBonus,
        referalBonus: user.referalBonus,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Visitors tracking
const Visitors = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);

    const htmlContent = `<div style="padding:20px">
      <h2>New Visitor</h2>
      <p>Email: ${req.body.email || "N/A"}</p>
      <p>City: ${req.body.userCity}</p>
      <p>Country: ${req.body.userCountry}</p>
    </div>`;

    await sendEmail(process.env.MAILER_EMAIL, "New Visitor", htmlContent, "contact@fox-funds.com");

    res.status(StatusCodes.CREATED).json({ msg: "Visitor logged" });
  } catch (error) {
    handleError(error, res);
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("Provide email and password");

    const user = await findUserByEmail(email);
    if (!user) throw new unAuthenticatedError("User not registered");

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new unAuthenticatedError("Wrong password");

    generateToken(user._id, res);

    res.status(StatusCodes.OK).json({ message: "Login Successful" });
  } catch (error) {
    handleError(error, res);
  }
};

// Password reset
const beforePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ error: "User does not exist" });

    const verificationCode = generateVerificationCode(7);
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "johnsundayjwtsecret", JWT_CONFIG);

    const resetEmailHtml = `<div style="padding:20px">
      <p>Use this code to reset your password:</p>
      <p style="font-size:30px">${verificationCode}</p>
    </div>`;

    await sendEmail(email, "Password Reset Code", resetEmailHtml);

    res.json({ message: "Verification code sent", code: verificationCode });
  } catch (error) {
    handleError(error, res);
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email: emailID } = req.params;
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { email: emailID },
      { password: newPassword },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

    const htmlContent = `<div style="padding:20px">
      <p>Your password has been changed. If this wasn't you, contact support.</p>
    </div>`;

    await sendEmail(emailID, "Password Reset", htmlContent);

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

// General user update
const generalUpdate = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ email: req.body.email }, req.body, { new: true, runValidators: true });
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

// Update earning status
const updateStatusEarning = async (req, res) => {
  try {
    const { activePlan, email, amount, dailyEarnings, totalBalance } = req.body;
    const oldUser = await findUserByEmail(email);
    if (!oldUser) return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });

    const user = await User.findOneAndUpdate(
      { email },
      { activePlan, dailyEarnings, usdt: oldUser.usdt - amount, totalBalance, capital: amount },
      { new: true, runValidators: true }
    );

    const investmentEmailHtml = `<div style="padding:20px">
      <p>User ${email} just made an investment plan</p>
      <p>Plan: ${activePlan}</p>
      <p>Amount: ${amount}</p>
    </div>`;

    await sendEmail(process.env.MAILER_EMAIL, "Investment Plan Triggered", investmentEmailHtml);

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

// Logout
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, secure: true, sameSite: "none", expires: new Date(0), path: "/", maxAge: 1 });
    return res.status(200).json(new ResponseMessage("success", 200, "User logged out successfully"));
  } catch (error) {
    return res.status(500).json(new ResponseMessage("error", 500, "Could not logout user"));
  }
};

module.exports = {
  register,
  login,
  logoutUser,
  dashboard,
  getallBlockedclient,
  getallclient,
  deleteOneclient,
  accountActivation,
  generalUpdate,
  getOneclient,
  updateStatusEarning,
  beforePassword,
  forgotPassword,
  Visitors,
};
