const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Visitor = require("../models/visitors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  unAuthenticatedError,
} = require("../errors/errorsIndex");

const getallclient = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(StatusCodes.CREATED).json({ clients: users });
  } catch (error) {
    console.log(error);
  }
};
const getOneclient = async (req, res) => {
  try {
    const user = await User.findOne({email:req.body.email});

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.log(error);
  }
};
const deleteOneclient = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({email:req.body.email});

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const getallBlockedclient = async (req, res) => {
  try {
    const users = await User.find({ blocked: "true" });

    res.status(StatusCodes.CREATED).json({ clients: users });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    if (user) {
      return res
        .status(400)
        .json({ err: "User with this email alredy exists." });
    }

    const token = jwt.sign({ name, email, password }, "johnsundayjwtsecret", {
      expiresIn: "30m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS,
      },
    });
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: " Your Email Verification Code",
      html: `
            <body style="background-color:white; padding:5px; height:100%; width:100%>
            <div style="text-align:left; min-height:100vh; padding:20px">
         
         
             <h4>Apex Corporate Account Verification Code</>
             <h2>Hi ${name}! <br/> Account almost ready...</h2>
            <p>Kindly copy the and paste the verification code below to complete your account registration</p> <br/>
      
            code:  <p type="s" value=${verificationCode} style="padding:10px; font-size:30px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
           
            <p>If you didn't request this code, you can safely ignore this message. Someone might have typed your email address by mistaken <br/> Thanks.</p>
            </div>
            </body>
            
            `,
    };
    transporter.sendMail(mailOptions, function (error, body) {
      if (error) {
        return res.json({ error: error });
      }
      res.json({
        message:
          "Email has be sent to you, kindly activate your accoutn to continue",
        code: verificationCode,
      });
    });
  });
};

const accountActivation = async (req, res) => {
  const user = await User.create({ ...req.body });
  const { name, email } = req.body;
  const token = user.createJWT();

  var transporter1 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });
  const mailOptions1 = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: "Welcome To Apex Corporate",
    html: `
        <body style="background-color:#fff; padding:5px; height:100%; width:100%>
        <div style="text-align:left; min-height:100vh; padding:20px">
        <img src="https:/" alt="logo" width="60" height="60"/>
         <h2>Hi, ${name}. <br/> Your Account is Ready</h2>
        <p>Kindly login choose a suitable plan to start earning</p> <br/> <br/>
        <h4 style="color:aqua">How To Get Started </h4>
        <ol>
        <li>Register</li>
        <li>Connect Wallet(Optional)</li>
        <li> Choose Plan Of Your Choice</li>
        <li>deposite</li>
        <li>Refer Your Friends</li>
        </ol>
        <h4> There You Go!</h4>
        <p>Welcome to the investment company for smart investors, With profits and bonus that beats any other</p>
  
       
        <p>  For assistance Email Us at <a href="contact@fox-funds.com"> or contact.Apex Corporates@gmail.com</a></p>
        </div>
        </body>
        `,
  };
  transporter1.sendMail(mailOptions1, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
    console.log("Done!");
  });

  var transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });
  const mailOptions2 = {
    from: process.env.MAILER_EMAIL,
    to: process.env.MAILER_EMAIL,
    subject: "New User",
    html: `
        <div style="text-align:left; min-height:100vh; padding:20px">
        
         <h2>name: ${name}, <br/></h2>
         <h2>name: ${email}, <br/></h2>
         
  
      
        </div>
        `,
  };
  transporter2.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  });
};

const dashboard = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new unAuthenticatedError("Not a REGISTERED user register now");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new unAuthenticatedError("Wrong password!");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        name: user.name,
        email: user.email,
        blocked: user.blocked,
        id: user._id,
        accountType:user.accountType
      },
      token,
    });
};

const Visitors = async (req, res) => {
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

  var transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });
  const mailOptions2 = {
    from: "contact@fox-funds.com",
    to: process.env.MAILER_EMAIL,
    subject: "New Visitor",
    html: `
         <div style="text-align:left; min-height:100vh; padding:20px">
         
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
          
   
       
         </div>
         `,
  };
  transporter2.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
    res.status(StatusCodes.CREATED).json({ msg: "request sent" });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new unAuthenticatedError("Not a REGISTERED user register now");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new unAuthenticatedError("Wrong password!");
  }
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
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
      totalWithdraw : user.totalWithdraw,
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
};

const beforePassword = async (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).exec((err, user) => {
    const verificationCode = Math.floor(1000000 + Math.random() * 9000000);
    if (!user) {
      return res.status(400).json({ err: "User does not exist" });
    }

    const token = jwt.sign({ email }, "johnsundayjwtsecret", {
      expiresIn: "30m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS,
      },
    });
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Your Password Reset Code",
      html: `
            <body style="background-color:#fff; padding:5px; height:100%; width:100%>
            <div style="text-align:left; min-height:60vh; padding:20px">
           
             <h2>Hi!, <br/></h2>
            <p>Kindly copy the and paste the verification code below to complete your password reset</p> <br/>
      
            code:  <p type="s" value=${verificationCode} style="padding:10px; font-size:30px; text-alig:left !important; color:black; background-color: inherit; font-weight:400">${verificationCode}</p>
           
            </div>
            </body>
            `,
    };
    transporter.sendMail(mailOptions, function (error, body) {
      if (error) {
        return res.json({ error: error });
      }
      res.json({
        message:
          "Email has be sent to you, kindly activate your accoutn to continue",
        code: verificationCode,
      });
    });
  });
};

const forgotPassword = async (req, res, next) => {
  const { email: emailID } = req.params;
  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  const user = await User.findOneAndUpdate(
    { email: emailID },
    { password: newPassword },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!user) {
    return next(createCustomError(`No task with id: ${emailID} found`, 404));
  }

  var transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });
  const mailOptions2 = {
    from: process.env.MAILER_EMAIL,
    to: emailID,
    subject: "Password Reset",
    html: `
      <div style="text-align:left; min-height:60vh; padding:20px">
      <h1>Apex Corporates</h1>
       <h2>Your password was changed <br/></h2>
       <p> If this is not your doing, contact us Apex Corporates@hotmail.com</p>
       
    
    
      </div>
      `,
  };
  transporter2.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
    res.status(StatusCodes.CREATED).json({ user });
  });
};

const generalUpdate = async (req, res, next) => {
 
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return res.json({error :`No transaction with email found 404`})
    }

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const updateStatusEarning = async (req, res, next) => {
  const { activePlan, email, amount, dailyEarnings } = req.body;
  const user = await User.findOneAndUpdate(
    { email: email },
    { activePlan: activePlan, dailyEarnings: dailyEarnings, capital: amount },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!user) {
    return next(createCustomError(`No task with email found`, 404));
  }

  var transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });
  const mailOptions2 = {
    from: process.env.MAILER_EMAIL,
    to: process.env.MAILER_EMAIL,
    subject: "Investment Plan Triggered",
    html: `
     
      <div style="text-align:left; min-height:60vh; padding:20px">
      <h1>Apex Corporate</h1>
       <h2>Check it out <br/></h2>
       <p> User with ${email}: just made an investment plan</p>
       <p> Plan: ${activePlan}</p>
       <p> Amount: ${amount}</p>
      </div>
      `,
  };
  transporter2.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
    res.status(StatusCodes.CREATED).json({ user });
  });
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
