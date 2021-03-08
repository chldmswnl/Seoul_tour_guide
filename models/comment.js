const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title: { type: String, required: true },
  writer: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
