var refferal_code = "";
const referral = (req, res) => {
  console.log(req.params);
  refferal_code = req.params.referalcode;
  return res.redirect("https://apexcorporatefinanceltd.com/user");

  //   res.redirect("<script> window.location="https://apex.onrender.com/home"<script/>")
};

const getrefferalCode = (req, res) => {
  res.json({ msg: refferal_code });
};

module.exports = {
  referral,
  getrefferalCode,
};
