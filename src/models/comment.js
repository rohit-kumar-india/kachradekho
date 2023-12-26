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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'replyId'
        }
    ],
    replyTo: {
        type: String,
        ref: 'replyUser'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });


mongoose.models = {}
export default mongoose.model("comment", CommentSchema)
