const express = require('express')
const router = express.Router()

const {
    getAllTransactions,

    createTransaction,
    updateTransaction,
    getSingleTransaction,
} = require('../controllers/newtransactions')

router.route('/').post(createTransaction)


router.route('/updatetransaction').post(updateTransaction)

router.route('/getOnetransaction/').post(getSingleTransaction)
router.route('/').get(getAllTransactions)

module.exports = router
