const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Visitor = require("../models/visitors");
const bcrypt = require("bcryptjs");
const { Resend } = require("resend");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, unAuthenticatedError } = require("../errors/errorsIndex");

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Constants and reusable configurations
const JWT_CONFIG = {
  expiresIn: "30m",
};

// Utility functions
const generateVerificationCode = (digits = 6) => 
  Math.floor(10 ** (digits - 1) + Math.random() * 9 * 10 ** (digits - 1));

const handleError = (error, res, message = "Server error, please try again later.") => {
  console.error(message, error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: message });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Email sending function with Resend
const sendEmail = async (to, subject, html, from = process.env.MAILER_EMAIL) => {
  try {
    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });

    if (error) {
      throw new Error(`Email sending failed: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Controller functions
const getallclient = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ clients: users });
  } catch (error) {
    handleError(error, res);
  }
};

const getOneclient = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

const deleteOneclient = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

const getallBlockedclient = async (req, res) => {
  try {
    const users = await User.find({ blocked: "true" });
    res.status(StatusCodes.OK).json({ clients: users });
  } catch (error) {
    handleError(error, res);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: "User with this email already exists." 
      });
    }

    const verificationCode = generateVerificationCode();
    const token = jwt.sign(
      { name, email, password }, 
      process.env.JWT_SECRET || "johnsundayjwtsecret", 
      JWT_CONFIG
    );

    const emailHtml = `<body style="background-color:white; padding:5px; height:100%; width:100%>
        <div style="text-align:left; min-height:100vh; padding:20px">
          <h4>Apex Corporate Account Verification Code</h4>
          <h2>Hi ${name}! <br/> Account almost ready...</h2>
          <p>Kindly copy the and paste the verification code below to complete your account registration</p>
          <br/>
          code: <p type="s" value=${verificationCode} style="padding:10px; font-size:30px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
          <p>If you didn't request this code, you can safely ignore this message. Someone might have typed your email address by mistaken <br/> Thanks.</p>
        </div>
      </body>`;

    await sendEmail(email, "Your Email Verification Code", emailHtml);
    
    return res.status(StatusCodes.OK).json({
      message: "Verification email sent successfully.",
      code: verificationCode,
      token,
    });
  } catch (error) {
    handleError(error, res, "Error during registration");
  }
};

const accountActivation = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const { name, email } = req.body;
    const token = user.createJWT();

    const welcomeEmailHtml = `<body style="background-color:#fff; padding:5px; height:100%; width:100%">
        <div style="text-align:left; min-height:100vh; padding:20px">
          <img src="https:/" alt="logo" width="60" height="60"/>
          <h2>Hi, ${name}. <br/> Your Account is Ready</h2>
          <p>Kindly login and choose a suitable plan to start earning</p><br/><br/>
          <h4 style="color:aqua">How To Get Started</h4>
          <ol>
            <li>Register</li>
            <li>Connect Wallet (Optional)</li>
            <li>Choose Plan Of Your Choice</li>
            <li>Deposit</li>
            <li>Refer Your Friends</li>
          </ol>
          <h4>There You Go!</h4>
          <p>Welcome to the investment company for smart investors, with profits and bonuses that beat any other.</p>
          <p>For assistance email us at <a href="mailto:contact@fox-funds.com">contact@fox-funds.com</a> or <a href="mailto:contact.ApexCorporates@gmail.com">contact.ApexCorporates@gmail.com</a></p>
        </div>
      </body>`;

    const adminNotificationHtml = `<div style="text-align:left; min-height:100vh; padding:20px">
        <h2>Name: ${name}</h2>
        <h2>Email: ${email}</h2>
      </div>`;

    // Send both emails concurrently
    await Promise.all([
      sendEmail(email, "Welcome To Apex Corporate", welcomeEmailHtml),
      sendEmail(process.env.MAILER_EMAIL, "New User", adminNotificationHtml)
    ]);

    res.status(StatusCodes.CREATED).json({
      user: { name: user.name },
      token,
    });
  } catch (error) {
    handleError(error, res, "Account activation error");
  }
};

const dashboard = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    
    if (!user) {
      throw new unAuthenticatedError("Not a REGISTERED user register now");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new unAuthenticatedError("Wrong password!");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        blocked: user.blocked,
        id: user._id,
        accountType: user.accountType,
      },
      token,
    });
  } catch (error) {
    handleError(error, res);
  }
};

const Visitors = async (req, res) => {
  try {
    const visitor = await Visitor.create({ ...req.body });
    const {
      userCity,
      userCountry,
      networkProvider,
      countryCode,
      network,
      latitude,
      longitude,
      userRegionName,
      regionCode,
      userTimezone,
      query,
    } = req.body;

    const visitorEmailHtml = `<div style="text-align:left; min-height:100vh; padding:20px">
        <h2>Visitor's City: ${userCity}, <br/></h2>
        <h2>Visitor's Country: ${userCountry}, <br/></h2>
        <h2>Visitor's Network Provider: ${networkProvider}, <br/></h2>
        <h2>Visitor's Region Name: ${userRegionName}, <br/></h2>
        <h2>Visitor's Timezone: ${userTimezone}, <br/></h2>
        <h2>Country Code: ${countryCode}, <br/></h2>
        <h2>Visitor's Network: ${network}, <br/></h2>
        <h2>Visitor's Latitude: ${latitude}, <br/></h2>
        <h2>Visitor's Longitude: ${longitude}, <br/></h2>
        <h2>Visitor's Country Code: ${countryCode}, <br/></h2>
        <h2>Visitor's Region Code: ${regionCode}, <br/></h2>
        <h2>Visitor's query(ip Address): ${query}, <br/></h2>
      </div>`;

    await sendEmail(
      process.env.MAILER_EMAIL, 
      "New Visitor", 
      visitorEmailHtml, 
      "contact@fox-funds.com"
    );

    res.status(StatusCodes.CREATED).json({ msg: "request sent" });
  } catch (error) {
    handleError(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    const user = await findUserByEmail(email);
    if (!user) {
      throw new unAuthenticatedError("Not a REGISTERED user register now");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new unAuthenticatedError("Wrong password!");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        blocked: user.blocked,
        withdrawableBalance: user.withdrawableBalance,
        referalCode: user.referalCode,
        notifications: user.notifications,
        referlink: user.referalLink,
      },
      accounts: {
        balance: user.totalBalance,
        balanceIn: user.balanceInc,
        earnigs: user.totalEarnings,
        totalDeposite: user.totaldeposite,
        totalWithdraw: user.totalWithdraw,
        capital: user.capital,
        withdrawableBalance: user.withdrawableBalance,
        dailyEarnings: user.dailyEarnings,
        btc: user.btc,
        usdt: user.usdt,
        bnb: user.bnb,
        eth: user.eth,
        asset: user.asset,
        depositeAmount: user.depositeAmount,
        time: user.regTime,
        activeplan: user.activePlan,
        statu: user.status,
        connectWallet: user.wallet,
        depositeBonus: user.depositeBonus,
        signupBonus: user.signupBonus,
        referalBonus: user.referalBonus,
        beforeW: user.beforeWithdraw,
      },
      token,
    });
  } catch (error) {
    handleError(error, res);
  }
};

const beforePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "User does not exist" });
    }

    const verificationCode = generateVerificationCode(7);
    const token = jwt.sign({ email }, "johnsundayjwtsecret", JWT_CONFIG);

    const resetEmailHtml = `<body style="background-color:#fff; padding:5px; height:100%; width:100%>
        <div style="text-align:left; min-height:60vh; padding:20px">
          <h2>Hi!, <br/></h2>
          <p>Kindly copy the and paste the verification code below to complete your password reset</p>
          <br/>
          code: <p type="s" value=${verificationCode} style="padding:10px; font-size:30px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
        </div>
      </body>`;

    await sendEmail(email, "Your Password Reset Code", resetEmailHtml);
    
    res.json({
      message: "Email has be sent to you, kindly activate your account to continue",
      code: verificationCode,
    });
  } catch (error) {
    handleError(error, res);
  }
};

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

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `No user with email: ${emailID} found` });
    }

    const passwordResetHtml = `<div style="text-align:left; min-height:60vh; padding:20px">
        <h1>Apex Corporates</h1>
        <h2>Your password was changed <br/></h2>
        <p> If this is not your doing, contact us Apex Corporates@hotmail.com</p>
      </div>`;

    await sendEmail(emailID, "Password Reset", passwordResetHtml);
    
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

const generalUpdate = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No user with email found" });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

const updateStatusEarning = async (req, res) => {
  try {
    const { activePlan, email, amount, dailyEarnings, totalBalance } = req.body;
    
    const oldUser = await findUserByEmail(email);
    if (!oldUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No user with email found" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        activePlan,
        dailyEarnings,
        usdt: (oldUser.usdt - amount),
        totalBalance,
        capital: amount,
      },
      { new: true, runValidators: true }
    );

    const investmentEmailHtml = `<div style="text-align:left; min-height:60vh; padding:20px">
        <h1>Apex Corporate</h1>
        <h2>Check it out <br/></h2>
        <p> User with ${email}: just made an investment plan</p>
        <p> Plan: ${activePlan}</p>
        <p> Amount: ${amount}</p>
      </div>`;

    await sendEmail(process.env.MAILER_EMAIL, "Investment Plan Triggered", investmentEmailHtml);
    
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  register,
  login,
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