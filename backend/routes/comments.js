const express = require("express");
const router = express.Router();

const {
  addNewComment,
  updateVoteCount,
  addNestedComment,
  deleteComment,
  editComment,
} = require("../controller/commentController");

router.route("/addNewComment").post(addNewComment);
router.route("/addNestedComment").post(addNestedComment);
router.route("/updateVoteCount").post(updateVoteCount);
router.route("/deleteComment").post(deleteComment);
router.route("/editComment").post(editComment);

module.exports = router;
