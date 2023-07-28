const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
    likes: {
        type: Number,
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

// Check if the model has already been registered before compiling it
// const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
// const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

// export default {
//   Post,
//   Image
// };
mongoose.models = {}
export default mongoose.model("post", PostSchema)
