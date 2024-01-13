const express = require("express");
const router = express.Router();

const { referral, getrefferalCode } = require("../controllers/referral");
router.route(`/reffered/:useridqueryVC=:referalcode`).get(referral);

router.get(`/refferer`, getrefferalCode);

module.exports = router;
