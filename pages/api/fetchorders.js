const mongoose = require('mongoose')
const Order = require('../../models/Order')
const connectDB = require('../../middleware/connectDB');
connectDB();


const handler = async (req,res)=>{
    try {
       const{email} = req.body
       const orders = await Order.find({email})
       res.json({"orders":orders})

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}

export default handler