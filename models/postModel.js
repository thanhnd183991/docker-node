const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "post must have title"],
  },
  body: {
    type: String,
    required: [true, "post must have body"],
  },
});

module.exports = mongoose.model("Post", postSchema);
