const { BadRequestError } = require("../errors/errorsIndex")
require('dotenv').config()
const nodemailer = require('nodemailer')
const notFoundMiddlewareError = require('../middleware/notfound')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const newTransaction = require('../models/newTransactions')

const getAllTransactions = async (req, res) => {
  const newtransactions = await newTransaction.find({ createdBy: req.params.id }).sort()
  res.status(StatusCodes.OK).json({ newtransactions, count: newtransactions.length })
}
const getSingleTransaction = async (req, res) => {
  //console.log(req.params)
  const newtransactions = await newTransaction.find({ _id: req.body.transactionID})
  res.status(StatusCodes.OK).json({ newtransactions, })
}

const createTransaction = async (req, res) => {

  const newtransaction = await newTransaction.create(req.body)
  const { transactionType, asset, amount, createdBy, walletAddress, email, where } = req.body
  res.status(StatusCodes.CREATED).json({ newtransaction })

  var transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS
    }
  })
  const mailOptions2 = {
    from: process.env.MAILER_EMAIL,
    to: process.env.MAILER_EMAIL,
    subject: 'New Transaction Alert',
    html: `
  <div style="text-align:left; min-height:60vh; padding:20px">
    
  <h2> New Possible Transaction </h2>
   
  <h4>Client: ${email} <br/></h4>
  
   <h4>Type: ${transactionType} <br/></h4>
   
   <h4>From: ${where} <br/></h4>
   <h4>Amount: ${amount} <br/></h4>
   <h4>Asset: ${asset} <br/></h4>
   <h4>Wallet Address: ${walletAddress} <br/></h4>
   <h4>UserID: ${createdBy} <br/></h4>
   <h4>transactionID: ${newtransaction._id} <br/></h4>

   <p> Please check your wallet to confirm transaction. Then login admin top-up or debit the client with amount received.</p>

   <button style="background-color:#3e2280; color: white; padding:4px"> <a href="https://apexcorporategroup.com">Goto Admin Dashboard</a> </button>
   


  </div>
  `
  };
  transporter2.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error })
    }
    res.status(StatusCodes.CREATED).json({ newtransaction })
  })

}

const updateTransaction = async (req,res, next) =>{
  const {transactionID,status, asset, walletAddress, transactionType, name, email, amount } = req.body
  const transaction = await newTransaction.findOneAndUpdate({_id:transactionID}, {status:status, amount:amount}, {
      new:true,
      runValidators:true
  })
  if(!transaction){
      return res.json({error:`No transaction with email found 404`})
  }
  var transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS
    }
  })
  const mailOptions2 = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: 'Transaction Receipt',
    html: `
  <div style="text-align:left; min-height:60vh; padding:20px;">
    
  <h2>Hello. </h2>
  <p> Your ${transactionType} has been completed. </p>
  <p>Amount: ${amount}</p>
  <p>Asset: ${asset}</p>
  <p>Address: ${walletAddress}</p>
  <p>Login your account for details.</p>

  </div>
  `
  };
  transporter2.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error })
    }
    res.status(StatusCodes.CREATED).json({ msg:"done" })
  })



}



const createSuport = async (req, res) => {

  const { email, message} = req.body

  var transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS
    }
  })
  const mailOptions2 = {
    from: process.env.MAILER_EMAIL,
    to: process.env.MAILER_EMAIL,
    subject: 'New Support Ticket',
    html: `
  <div style="text-align:left; min-height:60vh; padding:20px">
    
  <h2> Client's Complaints </h2>
   
  <h4>Client: ${email} <br/></h4>
   <h4>Message: ${message} <br/></h4>

   <p>Reply only when necessary</p>

   <button style="background-color:#3e2280; color: white; padding:4px"> <a href="https://apexcorporategroup.com">Goto Admin Dashboard</a> </button>
   


  </div>
  `
  };
  transporter2.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error })
    }
    res.status(StatusCodes.CREATED).json({ msg:"done" })
  })

}




module.exports = {
  getAllTransactions,
  updateTransaction ,
  createSuport,
  getSingleTransaction,
  createTransaction

}
