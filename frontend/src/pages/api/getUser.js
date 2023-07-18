import connectDb from "@/middleware/mongoose";
import User from "@/models/user";

const handler = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log(userId)
        let user = await User.findOne({ _id: userId })
        if (user) {
            res.status(200).json({ user })
        }
        else {
            res.status(200).json({ error: "No user found" })
        }
    } catch (error) {
        console.log("error in fetching user from api", error)
    }
}

export default connectDb(handler)