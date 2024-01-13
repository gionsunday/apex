const mongoose = require('mongoose')

const newTransactionSchema = new mongoose.Schema({
    transactionType:{
        type: String,
        trim:true,
        required: [true, 'please provide type name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },
    asset:{

        type: String,
        trim:true,
        required: [true, 'please provide type name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },
    amount:{
     
        type: Number,
        trim:true,
        required: [true, 'please provide type name'],
        maxlength: [20, "name must not be greater than 20 characters"]
    },  
    status:{
        type: String,
        enum:['Processing', 'Completed', 'Cancelled' ],
        default:'Processing'
    },
    createdBy:{
        type: String,
        
        required:[true, 'Please provide user']
    },
    walletAddress:{
        type: String,
        default:'Apex Corporate Wallet'
    }


}, {timestamps:true})
module.exports = mongoose.model('newTransaction', newTransactionSchema)