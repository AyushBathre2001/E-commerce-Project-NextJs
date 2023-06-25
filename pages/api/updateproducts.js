const Product = require('../../models/Product');
const connectDB = require('../../middleware/connectDB');
connectDB()

const handler = async(req,res)=>{
   if(req.method == 'POST'){
    for(let i = 0;i<req.body.length;i++){
      let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
    }
  
    res.status(200).json({"Success":true})
   }
   else{
    res.status(400).send("Bad request!")
   }
    
}

export default handler
