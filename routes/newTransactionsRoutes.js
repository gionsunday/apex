const express = require('express')
const router = express.Router()

const {
    getAllTransactions,
    createSuport,
    createTransaction,
    updateTransaction,
    getSingleTransaction,
} = require('../controllers/newtransactions')

router.route('/').post(createTransaction)

router.route('/createsupport').post(createSuport)
router.route('/updatetransaction').post(updateTransaction)

router.route('/getOnetransaction/:transactionID').get(getSingleTransaction)
router.route('/:id').get(getAllTransactions)

module.exports = router