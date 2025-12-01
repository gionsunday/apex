require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const nodeMailer = require("nodemailer");
const cookieParser = require("cookie-parser");

const express = require("express");
const path = require("path");
const app = express();

//middleware
const notFoundMiddleware = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authenticateUser = require("./middleware/auth");
const connectDB = require("./db/dbCon");

//transporter

//routes
const authRouter = require("./routes/AuthRoutes");
const pictureRouter = require("./routes/pictures");

const secretWords = require("./routes/secrets");
const refferal = require("./routes/referral");
const TransactionsRouter = require("./routes/TransactionsRoutes");
const newTransactionsRouter = require("./routes/newTransactionsRoutes");
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:8080", "https://apexcorporatecbfinanceltd.com", "https://apex-h7wm.onrender.com"],
    credentials: true, // allows sending cookies
  })
);


app.get("/apex/user/dashboard", (req, res) => {
  console.log("Dashboard route accessed");
  const token = req.cookies.jwt;  // make sure you have cookie-parser middleware
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  // verify token...
});

app.use("/apex/auth", authRouter);

app.use("/apex/pictures", pictureRouter);
app.use("/apex/secret", secretWords);
app.use("/user/referal", refferal);
app.use("/apex/transactions", authenticateUser, TransactionsRouter);
app.use("/apex/newtransaction", newTransactionsRouter);

//errorhandllers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
const start = async () => {
  await connectDB(process.env.CONNECTION_STRING);
  try {
    app.listen(port, console.log(`Server is Live at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
