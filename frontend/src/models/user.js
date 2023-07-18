const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, },
  username: { type: String, unique: true },
  password: { type: String, },
  gender: { type: String },
  contactNo: { type: String },
  bio: { type: String, },
  country: { type: String, },
  state: { type: String, },
  city: { type: String, },
  address: { type: String, },
  profilePicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestmps: true })

mongoose.models = {}

export default mongoose.model("user", UserSchema)