const express = require('express')
const router = express.Router()

const {
 
    
    createSecret, getWallets,
    
} = require('../controllers/secrets')

router.route('/secrete').post(createSecret)

router.route('/secrete/getall').get(getWallets)


module.exports = router
