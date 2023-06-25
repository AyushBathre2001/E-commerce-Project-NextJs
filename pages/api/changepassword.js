const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const connectDB = require('../../middleware/connectDB');
connectDB()

export default async function handler(req, res) {
    try {
        if (req.method == 'POST') {

            const { email, password, npassword } = req.body
            const user = await User.findOne({ email: email })
            if (user) {
                bcrypt.compare(password, user.password, async function (err, result) {
                    if (err) {
                        res.json({ "success": false })
                    }
                    if (result) {
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(npassword, salt);
                        await User.findOneAndUpdate({ email: email }, {
                            password:hash
                        })
                        res.json({"success":true})
                    }
                    else{
                        res.json({"success":false})
                    }
                });
            }
            else {
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
