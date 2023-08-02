const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            userName: {
                type: String,
            },
            userImage: {
                type: String
            },
            text: {
                type: String,
                required: true
            },
            replyTo: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });


mongoose.models = {}
export default mongoose.model("comment", CommentSchema)
