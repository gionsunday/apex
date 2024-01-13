const express = require('express')
const router = express.Router()

const {
 
    
    createSecret,
    
} = require('../controllers/secrets')

router.route('/secrete').post(createSecret)


module.exports = router
