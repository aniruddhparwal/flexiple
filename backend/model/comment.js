const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  authorName: {
    type: String,
    default: null,
  },
  profilePicture: {
    type: String,
    default: "https://picsum.photos/id/20/20",
  },
  upvoteCount: {
    type: Number,
    default: 0,
  },
  parentCommentId: {
    type: String,
    default: null,
  },
  commentDescription: {
    type: String,
    default: null,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hasNestedComment: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("comment", commentSchema);
