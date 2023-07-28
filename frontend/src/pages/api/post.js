import connectDb from "@/middleware/mongoose";
import Post from "@/models/post";

const handler = async (req, res) => {
    try {
        //for creating the post
        if (req.method === 'POST') {
            const { productName, caption, images, user } = req.body;
            let post = new Post({ productName, caption, images, user, likes: 0 });
            await post.save();
            res.status(200).json({ success: "success" });
        }

        // for getting the post data
        else if (req.method === 'GET') {
            const { limit, page } = req.query;
            const limitValue = parseInt(limit, 10) || 5;
            const pageValue = parseInt(page, 10) || 1;

            const skip = (pageValue - 1) * limitValue;
            const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limitValue);
            res.status(200).json(posts);
        }

        // for updating likes
        else if (req.method === 'PUT') {
            const { like } = req.body;
            // console.log(req.body)
            const post = await Post.findByIdAndUpdate(req.body.postId, { likes: like }, { new: true });
            if (!post) {
                res.status(404).json({ message: 'post not found' });
            }
            res.status(200).json({ success: "success" });
        }

        //for deleting the post

        else {
            res.status(405).json({ error: "This method is not allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }

}

export default connectDb(handler)