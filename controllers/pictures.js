const fs = require('fs')
const path = require('path')
const multer = require('multer')
const Profile_Img = require('../models/pictures')
const cloudinary = require('../utils/cluidinary')
const {StatusCodes} = require('http-status-codes')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '/uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({dest: '../uploads'})
const getProfileImage = async (req, res) =>{
    const profileImage = await Profile_Img.find({creator:req.params.creator})
    res.status(StatusCodes.OK).json({ profileImage})
}
const getAllProfileImage = async (req, res) =>{
    const profileImages = await Profile_Img.find()
    res.status(StatusCodes.OK).json({ profileImages})
}

const uploadProfileImage = async  (req, res, next) =>{
const files = req.files
const {email} = req.body
console.log(email)
console.log(files)
const filepath = files[0].path
console.log(filepath)

 try {
    const result = await cloudinary.v2.uploader.upload(filepath, {
        folder: "eaglex/team/pictures"
    })
    console.log(result)
    
     const {secure_url, name} = result
            req.body.img_url = secure_url
            const productImage = await Profile_Img.create({...req.body})
            res.status(StatusCodes.CREATED).json({productImage})
        
 } catch (error) {
    console.log(error)
 }

}





module.exports = {
    getProfileImage,
    getAllProfileImage,
    uploadProfileImage,
  
}

