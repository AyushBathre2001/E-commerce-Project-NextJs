const User = require('../../models/User')
const connectDB = require('../../middleware/connectDB');
connectDB()

export default async function handler(req, res) {
  try {
    if (req.method == 'POST') {
      const {name,phone,address,pincode,email} = req.body
      const user = await User.findOneAndUpdate({email:email},{
        name,phone,address,pincode
      },{new:true})
      if(user){
          res.json({"success":true,"info":user})
      }
      else{
        res.json({"success":false})
      }
    } else {
      res.send("Bad request!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
