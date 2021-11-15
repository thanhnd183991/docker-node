const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "post must have username"],
  },
  password: {
    type: String,
    required: [true, "post must have password"],
  },
});

module.exports = mongoose.model("User", userSchema);
