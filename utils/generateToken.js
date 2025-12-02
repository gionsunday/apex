const jwt = require("jsonwebtoken");

const generateToken = (userId, res, expires = "15d") => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: expires,
  });

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: false, // false on localhost
  //   path: "/",
  //   maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  //   sameSite: "lax", // works locally
  // });

    res.cookie("jwt", token, {
      httpOnly: true, // more secure
      secure: true ,      // Only over HTTPS
      path:"/",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      sameSite: 'None',   // Allow cross-origin
    });

  return token;
};

module.exports = generateToken;
