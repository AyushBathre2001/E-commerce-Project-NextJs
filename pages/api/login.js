
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const connectDB = require('../../middleware/connectDB');
connectDB()

export default async function handler(req, res) {
  try {
    if(req.method == 'POST'){
        const {email,password} = req.body
        const user = await User.findOne({"email":email})
        const pass = bcrypt.compareSync(password, user.password); // true
        if(user){
            if(user.email == email && pass ){
              var token = jwt.sign({data:user}, process.env.JWT_SECRET ,{expiresIn:"4d"});
              res.status(200).json({"Success":true,"Token":token})
            }
            else{
                res.status(404).json({"Success":false,"Message":"Invalid credentials!"})
            }
        }
        else{
            res.status(404).json({"Success":false,"Message":"Invalid credentials!"})
        }
      
    }
    else{
        res.send("Bad request!")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

