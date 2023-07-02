import connectDb from "@/middleware/mongoose";
import User from "@/models/user";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        // console.log(req.body)
        const updatedFields = {
            name : req.body.name,
            bio :req.body.bio,
            username: req.body.username,
            gender: req.body.gender,
            contactNo :req.body.contactNo,
            country: req.body.country,
            state: req.body.state,
            city : req.body.city,
            address: req.body.address,
        } 
        
        try {
            const user = await User.findByIdAndUpdate(req.body.userId, updatedFields, { new: true });
        
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            res.status(200).json({success:"success"});
          } catch (error) {
            res.status(500).json({ message: 'Failed to update user' });
          }
    }
    else{
        res.status(500).json({ error:"This method is not allowed"})
    }
}

export default connectDb(handler)