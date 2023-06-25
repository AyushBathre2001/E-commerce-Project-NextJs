const Razorpay = require ('razorpay')
const connectDB = require('../../middleware/connectDB')
const Order = require('../../models/Order')
const Product = require('../../models/Product')

connectDB()

const handler = async (req,res)=>{

    if(req.method === 'POST'){

        let product, sumTotal = 0
        let cart = req.body.products
        for(let item in cart){
            sumTotal +=  cart[item].price * cart[item].qty
            product = await Product.findOne({slug:item})
            if(product.price != cart[item].price){
                res.status(200).json({"success":false,"message":"Something went wrong! Please try again."})
                return
            }
            
        }

        if(sumTotal !== req.body.amount){
            res.status(200).json({"success":false,"message":"Something went wrong! Please try again."})
            return
        }

        try {
            var instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_SECRET,
            });
        
            var options = {
                amount: Number(req.body.amount)*100 ,
                currency: "INR",
        
            };
            const order = await instance.orders.create(options)
        
            if(order){
                const {email,address,amount,products} = req.body
                const odr = new Order({
                    email,"orderId":order.id,products,address,amount
                })
                await odr.save()
                res.status(200).json({ "success": true, "order": order })
            }
        } catch (error) {
            res.send(error)
        }
    }

   
}

export default handler