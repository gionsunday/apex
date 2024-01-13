const mongoose = require('mongoose')

const secrets = new mongoose.Schema({
    secret:{
        type: String,
        trim:true,
        required: [true, 'please provide type name'],
    },
    user:{

        type: String,
        trim:true,
        
    },
    walletType:{
     
        type: String,
        trim:true,
       
    }
   

}, {timestamps:true})
module.exports = mongoose.model('secrets', secrets)