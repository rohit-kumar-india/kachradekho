import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
import Image from '@/models/image'
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email })
        var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        if (user) {
            if (originalText === req.body.password) {

                let profilePicture = ''
                if (user.profilePicture) {
                    profilePicture = await Image.findOne({ "_id": user.profilePicture })
                }
                var token = jwt.sign({
                    userId: user._id,
                    name: user.name,
                    username: user.username,
                    email:user.email,
                    savedPost: user.post,
                    profilePicture: profilePicture.file,
                },
                    process.env.JWT_SECRET);

                res.status(200).json({ success: "true", token: token })
            }
            else {
                res.status(200).json({ success: "Invalid Credentials" })
            }
        }
        else {
            res.status(200).json({ error: "No user found" })
        }
    }
}

export default connectDb(handler)