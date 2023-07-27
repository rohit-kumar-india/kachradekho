import connectDb from "@/middleware/mongoose";
import Post from "@/models/post";

const handler = async (req, res) => {
    const { limit, page } = req.query;
    // console.log(req.query)
    const limitValue = parseInt(limit, 10) || 5;
    const pageValue = parseInt(page, 10) || 1;

    try {
        const skip = (pageValue - 1) * limitValue;
        const posts = await Post.find().skip(skip).limit(limitValue);

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default connectDb(handler)