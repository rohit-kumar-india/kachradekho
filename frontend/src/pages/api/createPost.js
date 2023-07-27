import connectDb from "@/middleware/mongoose";
import Post from "@/models/post";
import Image from '@/models/image'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { productName, caption, images, user } = req.body;
        let post = new Post({ productName, caption, images, user });
        await post.save();
        res.status(200).json({ success: "success" });
    } else {
        res.status(500).json({ error: "This method is not allowed" });
    }
}

export default connectDb(handler)