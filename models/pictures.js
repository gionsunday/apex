const mongoose = require('mongoose')

const profileImageSchema = new mongoose.Schema({
    name: {
        type:String,
        default: ""
    },
  
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bio"
    },
    img_url:{

        type:String,
        default:""
    }
    
})

module.exports = mongoose.model('Profile_Img', profileImageSchema)