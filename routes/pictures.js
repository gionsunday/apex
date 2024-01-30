
const express = require('express')
const router = express.Router()
const multer = require('multer')


const upload = multer({dest: 'uploads'})
const {getProfileImage,  getAllProfileImage, uploadProfileImage} = require("../controllers/pictures")


router.post('/uploadimages', upload.array('images'), uploadProfileImage)
router.get('/getimage/:creator', getProfileImage)
router.get('/getimageall', getAllProfileImage)


module.exports = router