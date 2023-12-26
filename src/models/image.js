const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  title: String,
  file: String,
});

mongoose.models = {}

export default mongoose.model("image", ImageSchema)