const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = (ur) =>{
    return mongoose.connect(url, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
} 
module.exports = connectDB