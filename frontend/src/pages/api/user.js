import connectDb from "@/middleware/mongoose";
import User from "@/models/user";

const handler = async (req, res) => {
    try {
        // for getting user by their userId
        if (req.method === 'GET') {
            const { userId } = req.query;
            let user = await User.findOne({ _id: userId })
            if (user) {
                res.status(200).json({ user })
            }
            else {
                res.status(200).json({ error: "No user found" })
            }
        }

        //for updating user in database
        else if (req.method === 'PUT') {
            const updatedFields = {
                name: req.body.name,
                bio: req.body.bio,
                username: req.body.username,
                gender: req.body.gender,
                contactNo: req.body.contactNo,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
                address: req.body.address,
                profilePicture: req.body.profilePicture,
            }

            const user = await User.findByIdAndUpdate(req.body.userId, updatedFields, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ success: "success" });
        }

        //for deleting the user in database

        else {
            res.status(405).json({ error: "This method is not allowed" });
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}


export default connectDb(handler)