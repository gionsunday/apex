
const express = require('express')
const router = express.Router()

const {login, register, dashboard, beforePassword, getOneclient, getallBlockedclient, getallclient, forgotPassword, generalUpdate, accountActivation,  updateStatusEarning, Visitors, deleteOneclient} = require('../controllers/auth')
const authMiddleware = require('../middleware/auth')

router.post('/register', register)
router.post('/visitors', Visitors)
router.post('/forgotpassword/:email', forgotPassword)
router.post('/beforeforgot', beforePassword)
router.post('/register/accountactivation', accountActivation )
router.post('/login', login)
router.post('/dashboard', dashboard)
router.post('/updateactiveplan', updateStatusEarning )
router.post('/generalupdates', generalUpdate )
router.post('/getallclients', getallclient)
router.post('/getoneclient', getOneclient)
router.post('/deleteoneclient', deleteOneclient)
router.post('/getallblockedclients', getallBlockedclient )

module.exports = router
