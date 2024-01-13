const express = require('express')
const router = express.Router()

const {
    getAllTransactions,
    
    createTransaction,
    
} = require('../controllers/transactions')

router.route('/').get(getAllTransactions).post(createTransaction)

module.exports = router