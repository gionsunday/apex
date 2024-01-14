const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Double } = require("mongodb");
require("dotenv").config();

var neString = "";
var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var string_length = 16;
var randomstring = "";
for (let i = 0; i < string_length; i++) {
  var rnum = Math.floor(Math.random() * chars.length);
  randomstring += chars.substring(rnum, rnum + 1);
  if (randomstring.length === 16) {
    neString = randomstring;
  }
}

const verificationCode = Math.floor(100000 + Math.random() * 900000);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      required: [true, "please provide an name"],
      maxlength: [50, "name must not be greater than 20 characters"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "please provide an email"],
      maxlength: [50, "name must not be greater than 20 characters"],
    },
    password: {
      type: String,
      trim: true,
      minlength: 4,
      required: [true, "please provide an password"],
    },
    status: {
      type: String,
      trim: true,
      default: "Temporarily Unavailable",
    },
    blocked: {
      type: String,
      default: "false",
    },
    accountType: {
      type: String,
      enum: ["user", "admin"],
    },
    activePlan: {
      type: String,
      trim: true,
      default: "None",
    },

    totalBalance: {
      type: Number,
      default: 0,
      trim: true,
    },
    balanceInc: {
      type: Number,
      default: 0,
      trim: true,
    },
    totalEarnings: {
      type: Number,
      default: 0,
      trim: true,
    },
    dailyEarnings: {
      type: Number,
      default: 0,
      trim: true,
    },
    totaldeposite: {
      type: Number,
      default: 0,
      trim: true,
    },
    btc: {
      type: Number,
      default: 0,
      trim: true,
    },
    usdt: {
      trim: true,
      type: Number,
      default: 0,
    },
    bnb: {
      type: Number,
      default: 0,
      trim: true,
    },
    eth: {
      type: Number,
      default: 0,
      trim: true,
    },
    depositeBonus: {
      type: Number,
      default: 0,
      trim: true,
    },
    referalBonus: {
      type: Number,
      default: 0,
      trim: true,
    },
    capital: {
      type: Number,
      default: 0,
      trim: true,
    },
    signupBonus: {
      type: Number,
      default: 10,
      trim: true,
    },
    withdrawableBalance: {
      type: Number,
      default: 0,
      trim: true,
    },
    beforeWithdraw: {
      type: Number,
      default: 0,
      trim: true,
    },
    asset: {
      type: String,
      default: "USDT",
    },
    depositeAmount: {
      type: Number,
      default: 0,
      trim: true,
    },

    regTime: {
      type: String,
      required: true,
    },
    wallet: {
      type: String,
      default: "None",
    },
    referalCode: {
      type: String,
      default: neString,
    },
    referalLink: {
      type: String,
      default: `https://apex-h7wm.onrender.com/user/referal/reffered/${verificationCode}queryVC=${neString}`,
    },
    referee: {
      type: String,
      default: `None One`,
    },
    notifications: {
      type: Array,
      default: [
        "Hi There! Welcom to Apex Corporates, an investment company for smart people.",
        "Choose a plan of your choice, deposite to invest and start earning big.",
        "Get get upto 30% deposite bonus and more on your first deposite.",
      ],
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    "johnsundayjwtsecret",
    { expiresIn: "30d" },
  );
};

UserSchema.methods.comparePassword = async function (candidatesPassword) {
  const isMatch = await bcrypt.compare(candidatesPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
