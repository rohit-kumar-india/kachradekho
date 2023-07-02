import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        // console.log(req.body)
        // const {name,username} = req.body;
        // console.log(req.body);
        let u = new User({name:req.body.name,username:req.body.username,password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()})
        // let u = new User({name:req.body.name,username:req.body.username,password:req.body.password})
        // console.log(u)
        await u.save()
        res.status(200).json({ success:"success"})
    }
    else{
        res.status(500).json({ error:"This method is not allowed"})
    }
}

export default connectDb(handler)