const { BadRequestError } = require("../errors/errorsIndex");
require("dotenv").config();
const notFoundMiddlewareError = require("../middleware/notfound");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const Transaction = require("../models/transactions");
const User = require("../models/user.js");

const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find({
    createdBy: req.user.userID,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ transactions, count: transactions.length });
};

const createTransaction = async (req, res) => {
  const token = req.cookies.jwt;
  // 2️⃣ Verify token
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET || "johnsundayjwtsecret"
  );

  // 3️⃣ Get user from decoded token
  console.log("Decoded token:", decoded);

  const { email } = await User.findOne({ _id: decoded.userId });
  req.body.createdBy = decoded.userId;
  req.body.email = email;
  const transaction = await Transaction.create(req.body);
  res.status(StatusCodes.CREATED).json({ transaction });
};

module.exports = {
  getAllTransactions,
  createTransaction,
};
