const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  contactNo: {
    type: String
  },
  bio: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  profilePicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostId'
    }
  ],
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostId'
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestmps: true })

mongoose.models = {}

export default mongoose.model("user", UserSchema)