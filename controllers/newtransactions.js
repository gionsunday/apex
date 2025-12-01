const { BadRequestError } = require("../errors/errorsIndex");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const newTransaction = require("../models/newTransactions");
const { Resend } = require("resend");
const User = require("../models/user.js");

const resend = new Resend(process.env.RESEND_API_KEY);

// Get all transactions for the logged-in user
const getAllTransactions = async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) throw new Error("No token found");

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "johnsundayjwtsecret");

  const newtransactions = await newTransaction
    .find({ createdBy: decoded.userId })
    .sort();

  res.status(StatusCodes.OK).json({ newtransactions, count: newtransactions.length });
};

// Get a single transaction
const getSingleTransaction = async (req, res) => {
  const newtransactions = await newTransaction.find({ _id: req.body.transactionID });
  res.status(StatusCodes.OK).json({ newtransactions });
};

// Create a new transaction and notify via Resend
const createTransaction = async (req, res) => {
  try {
    // 1️⃣ Get and verify JWT
    const token = req.cookies?.jwt;
    if (!token) throw new Error("No token found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "johnsundayjwtsecret");

    // 2️⃣ Get user email
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error("User not found");

    req.body.createdBy = decoded.userId;
    req.body.email = user.email;

    // 3️⃣ Create transaction
    const transaction = await newTransaction.create(req.body);

    // 4️⃣ Send email notification using Resend
    const { transactionType, asset, amount, walletAddress, where, createdBy } = req.body;

    const htmlContent = `
      <div style="text-align:left; min-height:60vh; padding:20px">
        <h2>New Possible Transaction</h2>
        <h4>Client: ${user.email}</h4>
        <h4>Type: ${transactionType}</h4>
        <h4>From: ${where}</h4>
        <h4>Amount: ${amount}</h4>
        <h4>Asset: ${asset}</h4>
        <h4>Wallet Address: ${walletAddress}</h4>
        <h4>UserID: ${createdBy}</h4>
        <h4>TransactionID: ${transaction._id}</h4>
        <p>Please check your wallet to confirm the transaction. Then login admin top-up or debit the client with amount received.</p>
        <button style="background-color:#3e2280; color:white; padding:4px">
          <a href="https://apexcorporategroup.com" style="color:white; text-decoration:none;">Goto Admin Dashboard</a>
        </button>
      </div>
    `;

    await resend.emails.send({
      from: process.env.MAILER_EMAIL,
      to: process.env.MAIL,
      subject: "New Transaction Alert",
      html: htmlContent,
    });

    // 5️⃣ Respond to frontend
    res.status(StatusCodes.CREATED).json({ newtransaction: transaction });
  } catch (error) {
    console.error("Transaction creation error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a transaction and send receipt via Resend
const updateTransaction = async (req, res) => {
  const { transactionID, status, asset, walletAddress, transactionType, email, amount } = req.body;

  const transaction = await newTransaction.findOneAndUpdate(
    { _id: transactionID },
    { status: status, amount: amount },
    { new: true, runValidators: true }
  );

  if (!transaction) {
    return res.status(404).json({ error: `No transaction found` });
  }

  const htmlContent = `
    <div style="text-align:left; min-height:60vh; padding:20px;">
      <h2>Hello,</h2>
      <p>Your ${transactionType} has been completed.</p>
      <p>Amount: ${amount}</p>
      <p>Asset: ${asset}</p>
      <p>Wallet Address: ${walletAddress}</p>
      <p>Login to your account for details.</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Transaction Receipt",
      html: htmlContent,
    });

    res.status(StatusCodes.OK).json({ msg: "Transaction updated and email sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Transaction updated but email failed" });
  }
};

// Create a support ticket and send via Resend
const createSupport = async (req, res) => {
  const { email, message } = req.body;

  const htmlContent = `
    <div style="text-align:left; min-height:60vh; padding:20px">
      <h2>Client's Complaint</h2>
      <h4>Client: ${email}</h4>
      <h4>Message: ${message}</h4>
      <p>Reply only when necessary</p>
      <button style="background-color:#3e2280; color:white; padding:4px">
        <a href="https://apexcorporategroup.com" style="color:white; text-decoration:none;">Goto Admin Dashboard</a>
      </button>
    </div>
  `;

  try {
    await resend.emails.send({
      from: process.env.MAILER_EMAIL,
      to: process.env.MAIL,
      subject: "New Support Ticket",
      html: htmlContent,
    });

    res.status(StatusCodes.CREATED).json({ msg: "Support ticket sent" });
  } catch (err) {
    console.error("Error sending support email:", err);
    res.status(500).json({ error: "Failed to send support email" });
  }
};

module.exports = {
  getAllTransactions,
  getSingleTransaction,
  createTransaction,
  updateTransaction,
};
