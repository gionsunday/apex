const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
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
        enum:['pending', 'completed', 'cancelled' ],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }


}, {timestamps:true})
module.exports = mongoose.model('Transaction', TransactionSchema)
