const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const connectDB = require('../../middleware/connectDB');
connectDB()

export default async function handler(req, res) {
  try {
    if (req.method == 'POST') {
      const { name, email,phone, password } = req.body
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = new User({
        name, email,phone, password: hash
      });
      await user.save();
      res.status(200).json({ "Success": true });
    } else {
      res.send("Bad request!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
