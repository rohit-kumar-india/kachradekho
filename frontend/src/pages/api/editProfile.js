import connectDb from "@/middleware/mongoose";
import User from "@/models/user";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        // console.log(req.body)
        const {
            name,
            bio,
            username,
            gender,
            contact,
            country,
            state,
            city,
            address,
        } = req.body;
        // console.log(req.body);
        let u = new User({ 
            name,
            bio,
            username,
            gender,
            contact,
            country,
            state,
            city,
            address,e})
        // let u = new User({name,email,password})
        await u.save()
        res.status(200).json({ success:"success"})
    }
    else{
        res.status(500).json({ error:"This method is not allowed"})
    }
}

export default connectDb(handler)