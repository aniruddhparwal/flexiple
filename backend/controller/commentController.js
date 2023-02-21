const Comment = require("../model/comment");
const bigPromise = require("../middleware/bigPromise");
const customError = require("../utils/customeError");

exports.addNewComment = bigPromise(async (req, res, next) => {
  const { authorName, commentDescription } = req.body;
  if (!authorName || !commentDescription) {
    return next(new customError("Required data is missing", 400));
  }

  const comment = await Comment.create({
    authorName,
    commentDescription,
  });
  res.status(200).json({
    success: true,
    message: comment,
  });
});

exports.addNestedComment = bigPromise(async (req, res, next) => {
  const { authorName, commentDescription, parentCommentId } = req.body;
  if (!authorName || !commentDescription || !parentCommentId) {
    return next(new customError("Required data is missing", 400));
  }

  const comment = await Comment.create({
    authorName,
    commentDescription,
    parentCommentId,
  });
  const parentComment = await Comment.findOne({
    _id: parentCommentId,
  });
  if (!parentComment) {
    return next(new customError("parent comment not found", 400));
  }
  parentComment.hasNestedComment = true;
  await parentComment.save();
  res.status(200).json({
    success: true,
    message: comment,
  });
});

exports.updateVoteCount = bigPromise(async (req, res, next) => {
  const { commentId } = req.body;
  const comment = await Comment.findOne({
    _id: commentId,
  });
  if (!comment) {
    return next(new customError("comment not found", 400));
  }
  comment.upvoteCount = comment.upvoteCount + 1;
  await comment.save();
  res.status(200).json({
    success: true,
    message: "Vote Count Updated Successfully",
  });
});

exports.editComment = bigPromise(async (req, res, next) => {
  const { commentId, commentDescription } = req.body;
  const comment = await Comment.findOne({
    _id: commentId,
  });
  if (!comment) {
    return next(new customError("comment not found", 400));
  }
  comment.commentDescription = commentDescription;
  await comment.save();
  res.status(200).json({
    success: true,
    message: "Comment Updated Successfully",
  });
});

exports.deleteComment = bigPromise(async (req, res, next) => {
  const { commentId } = req.body;
  const comment = await Comment.findOne({
    _id: commentId,
  });
  if (!comment) {
    return next(new customError("comment not found", 400));
  }

  if (comment.hasNestedComment) {
    const nestedComments = await Comment.find({
      parentCommentId: commentId,
    });
    if (nestedComments.length > 0) {
      nestedComments.forEach(async (comment) => {
        comment.remove();
      });
    }
  }

  await comment.remove();
  res.status(200).json({
    success: true,
    message: "Comment Deleted Successfully",
  });
});
