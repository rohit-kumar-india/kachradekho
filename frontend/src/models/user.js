const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description: { type: String, },
    images: [{ type: String }] // Array of image URLs
  });

const UserSchema = new mongoose.Schema({
    name: {type: String,},
    username: {type: String, unique:true},
    password: {type: String,},
    gender: {type: String},
    contactNo: {type: String},
    bio: {type: String, },
    country: {type: String, },
    state: {type: String, },
    city:{ type :String ,},
    address: {type: String, },
    post:[postSchema]
}, {timestmps:true} )



mongoose.models = {}

export default mongoose.model("user", UserSchema)