const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    orderId:{type:String},
    paymentInfo:{type:String, default:''},
    products: {type:Object,required:true},
    address:{type:Object,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:'Initiated',required:true}
},{timestamps:true})

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);