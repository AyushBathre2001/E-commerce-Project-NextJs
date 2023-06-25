const bcrypt = require('bcryptjs');
const User = require('../../models/User')
var randomstring = require("randomstring");
const sendMail = require('../../middleware/sendMail')
const deleteCode = require('../../middleware/deletefpToken')
const connectDB = require('../../middleware/connectDB');
connectDB();


const handler = async (req, res) => {
    try {

        if (req.method === 'POST') {
            const { sendemail } = req.body
            if (sendemail) {
                const { email } = req.body
                const fpToken = randomstring.generate();
                const link = `${process.env.NEXT_PUBLIC_HOST}/forgot?m=${email}&fp=${fpToken}`
                const user = await User.findOneAndUpdate({ email: email }, {
                    fptoken: fpToken
                })
                if (user) {
                    sendMail(link, email)
                    deleteCode(email)
                    res.json({ "success": true })
                }
                else {
                    res.json({ "success": false })
                }
            }
            else{
                const {password,fptoken} = req.body
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);

                const user = await User.findOneAndUpdate({fptoken:fptoken},{
                    password:hashPassword,
                    fptoken:''
                })

                if(user){
                    res.json({"success":true})
                }
                else{
                    res.json({"success":false})
                }


            }

        } else {
            res.send("Bad request!")
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }

}

export default handler