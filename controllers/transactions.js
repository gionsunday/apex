const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Transaction = require('../models/transactions')

const getAllTransactions = async (req, res) => {
   const transactions = await Transaction.find({createdBy:req.user.userID}).sort('createdAt')
   res.status(StatusCodes.OK).json({transactions, count: transactions.length})
}

 const createTransaction = async (req, res) => {
   req.body.createdBy = req.user.userID
   const transaction = await Transaction.create(req.body)
   res.status(StatusCodes.CREATED).json({ transaction })
 }

 
 
 
 module.exports = {
     getAllTransactions,
     createTransaction

 }
