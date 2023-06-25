const User = require('../models/User')

const deleteCode = (email)=>{
    setTimeout(async () => {
        const result = await User.updateOne({email},{
            $set:{
                fptoken:""
            }
        })
    }, 60000*10);
}

module.exports = deleteCode