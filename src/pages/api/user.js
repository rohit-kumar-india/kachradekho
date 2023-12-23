import connectDb from "@/middleware/mongoose";
import User from "@/models/user";

const handler = async (req, res) => {
    try {
        // for getting user by their userId
        if (req.method === 'GET') {
            let user = await User.findOne({ "username": req.query.username })
            if(!user){
                user = await User.findOne({ "_id": req.query.userId })
            }
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(200).json({ error: "No user found" })
            }
        }

        //for updating user in database
        else if (req.method === 'PUT') {
            console.log(req.body)
            const user = await User.findByIdAndUpdate(req.query.userId, req.body, { new: true });

            console.log(user)

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ success: "success" });
        }

        // for updating some part of data
        if (req.method === 'PATCH') {
            const user = await User.findById(req.query.userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // push postId into posts array
            user.posts.push(req.body)
            await user.save()
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