
const express = require('express')
const router = express.Router()


const {
 
    
    referral,
    
} = require('../controllers/referral')
router.route(`/reffered/:useridqueryVC=:referalcode`).get(referral)


module.exports = router