import connectDb from "@/middleware/mongoose";
import Comment from "@/models/comment";
import User from '@/models/user'
import Image from '@/models/image'
import Project from '@/models/project'

const handler = async (req, res) => {
    try {
        //for creating the comment
        if (req.method === 'POST') {
            let allCommentIds = req.body;

            // for fetching comments with ids
            if (allCommentIds.length > 0) {

                // for fetching comments with ids, 10 at a time
                if (req.query.limit > 0) {
                    const perPageLimit = parseInt(req.query.limit || 10);
                    const page = parseInt(req.query.page || 1);

                    const startIndex = (page - 1) * perPageLimit;
                    const endIndex = startIndex + perPageLimit;

                    // Fetch the comments based on the calculated indices
                    allCommentIds = allCommentIds.slice(startIndex, endIndex);
                }

                const commentsData = await Promise.all(allCommentIds.map(async (commentId) => {
                    const comment = await Comment.findOne({ "_id": commentId }).sort({ createdAt: -1 })
                    const user = await User.findOne({ "_id": comment.user })
                    const userImage = await Image.findOne({ "_id": user.profilePicture })

                    return {
                        comment,
                        "username": user.username,
                        "userImage": userImage.file
                    }
                }));
                // const commentsData = await Comment.find({_id : {$in : comments}})
                res.status(200).json(commentsData);
            }

            // for creating new project
            else {
                const newComment = req.body;
                let cmt = new Comment(newComment);
                await cmt.save();
                let cmtId = cmt._id
                res.status(200).json(cmtId);
            }
        }

        // for updating replyId
        else if (req.method === 'PATCH') {
            const comment = await Comment.findById(req.query.commentId);

            // Check if the comment exists
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }

            // Add the new reply to replies array
            comment.replies.push(req.body);

            // Save the updated project
            await comment.save();
            const allIds = await comment.replies
            return res.status(200).json(allIds);
        }

        //for deleting the project
        else if (req.method === 'DELETE') {
            const { commentId, projectId, replyId } = req.query

            // find comment and send replyId when delete the project
            const cmt = await Comment.findById(commentId)
            const cmtReplies = cmt.replies || ''

            //delete the comment
            const result = await Comment.deleteOne({ "_id": replyId || commentId });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'comment not found' });
            }

            console.log(cmtReplies)
            // at the time of project deletion
            if(!projectId){
                return res.status(200).json(cmtReplies)
            }

            if (replyId) {
                let comment = await Comment.findOne({ "_id": commentId })
                if (!comment) {
                    return res.status(404).json({ message: "comment not found" });
                }

                // Find the index of the reply within replies array
                const replyIndex = comment.replies.findIndex(rplId => rplId.toString() === replyId)
                // If the reply exists in the array, remove it
                if (replyIndex >= 0) {
                    comment.replies.splice(replyIndex, 1);
                    await comment.save();
                    const allId = comment.replies
                    return res.status(200).json(allId);
                } else {
                    return res.status(404).json({ message: "Reply not found" });
                }
            }
            else {
                // find project
                const project = await Project.findById({ "_id": projectId });

                // Check if the project exists
                if (!project) {
                    return res.status(404).json({ message: "project not found"});
                }

                // Find the index of the comment within comments array
                const commentIndex = project.comments.findIndex(cmtId => cmtId.toString() === commentId.toString())

                // If the comment exists in the array, remove it
                if (commentIndex >= 0) {
                    project.comments.splice(commentIndex, 1);
                    await project.save();
                    return res.status(200).json({ success: "comment deleted successfully" });
                } else {
                    return res.status(404).json({ message: "comment not found" });
                }
            }

        }

        else {
            res.status(405).json({ error: "This method is not allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }

}

export default connectDb(handler) 