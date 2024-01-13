const mongoose = require('mongoose')

const visitors = new mongoose.Schema({
    userCity:{
        type: String,
        trim:true,
   },
    userCountry:{

        type: String,
        trim:true,
        
    },
    networkProvider:{
     
        type: String,
        trim:true,
       
    },
    countryCode:{
     
        type: String,
        trim:true,
       
    },
    network:{
     
        type: String,
        trim:true,
       
    },
    latitude:{
     
        type: String,
        trim:true,
       
    },
    longitude:{
     
        type: String,
        trim:true,
       
    },
    userRegionName:{
     
        type: String,
        trim:true,
       
    },
    regionCode:{
     
        type: String,
        trim:true,
       
    },
    userTimezone:{
     
        type: String,
        trim:true,
       
    },
    query:{
     
        type: String,
        trim:true,
       
    }
   

}, {timestamps:true})
module.exports = mongoose.model('Visitor', visitors)
