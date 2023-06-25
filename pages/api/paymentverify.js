const Razorpay = require ('razorpay')
const connectDB = require('../../middleware/connectDB')
const Order = require('../../models/Order')
const Product = require('../../models/Product')

connectDB()

const handler = async (req,res)=>{
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest('hex');
    
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.razorpay_signature){
        response = { "signatureIsValid": "true" }
        let odr = await Order.findOneAndUpdate({orderId:req.body.razorpay_order_id},{
            paymentInfo:JSON.stringify(req.body),
            status:"Paid"
        })
        let products = odr.products
        for(let slug in products){
            await Product.findOneAndUpdate({slug:slug}, {$inc:{"availableQty": - products[slug].qty}})
        }
        res.redirect(`http://localhost:3000/order?id=${odr._id}`)
    }
    else{
        res.send("Bad request!")
    }
}

export default handler