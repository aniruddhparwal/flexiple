const express = require("express");
const router = express.Router();

const {
  addNewComment,
  updateVoteCount,
  deleteComment,
  editComment,
  getAllComments,
} = require("../controller/commentController");

router.route("/addNewComment").post(addNewComment);
router.route("/updateVoteCount").post(updateVoteCount);
router.route("/deleteComment").post(deleteComment);
router.route("/editComment").post(editComment);
router.route("/getAllComments").get(getAllComments);

module.exports = router;
