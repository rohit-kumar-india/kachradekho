const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });


mongoose.models = {}
export default mongoose.model("notification", NotificationSchema)
