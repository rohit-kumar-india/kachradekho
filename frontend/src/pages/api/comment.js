import connectDb from "@/middleware/mongoose";
import Comment from "@/models/comment";
import User from '@/models/user'
import Image from '@/models/image'

const handler = async (req, res) => {
    try {
        //for creating the comment
        if (req.method === 'POST') {

            // for fetching comments with ids, 10 at a time
            if (req.body.allCommentIds.length > 0) {
                const allCommentIds = req.body.allCommentIds;

                const perPageLimit = parseInt(req.query.limit || 10);
                const page = parseInt(req.query.page || 1);

                const startIndex = (page - 1) * perPageLimit;
                const endIndex = startIndex + perPageLimit;

                // Fetch the comments based on the calculated indices
                const comments = allCommentIds.slice(startIndex, endIndex);

                const commentsData = await Promise.all(comments.map(async (commentId) => {
                    const comment = await Comment.findOne({ "_id": commentId }).sort({ createdAt: -1 })
                    const user = await User.findOne({ "_id": comment.user })
                    const userImage = await Image.findOne({ "_id": user.profilePicture })

                    return {
                        "comment": comment,
                        "userName": user.name,
                        "userImage": userImage.file
                    }
                }));
                // const commentsData = await Comment.find({_id : {$in : comments}})

                res.status(200).json(commentsData);
            }

            // for creating new post
            else {
                const newComment = req.body;
                let cmt = new Comment(newComment);
                await cmt.save();
                let cmtId = cmt._id
                res.status(200).json(cmtId);
            }
        }

        // for updating likes
        else if (req.method === 'PUT') {
            const { commentId } = req.query;

            const comment = await Comment.findById(commentId);

            // Check if the comment exists
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }

            // Add the new reply to replies array
            comment.replies.push(req.body);

            // Save the updated post
            await comment.save();

            return res.status(200).json({ success: "success" });
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