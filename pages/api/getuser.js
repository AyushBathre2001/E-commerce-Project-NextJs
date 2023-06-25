const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const connectDB = require('../../middleware/connectDB');
connectDB();

const handler = async (req,res)=>{
    try {
        const {token} = req.body
        jwt.verify(token, process.env.JWT_SECRET, async function(err, decoded) {
            const user = await User.findOne({email:decoded.data.email})
            res.json({"user":user})
          });
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}

export default handler