const express = require('express')
const router = express.Router()

const {
    getAllTransactions,
    createSuport,
    createTransaction,
    
} = require('../controllers/newtransactions')

router.route('/').post(createTransaction)

router.route('/createsupport').post(createSuport)
router.route('/:id').get(getAllTransactions)

module.exports = router