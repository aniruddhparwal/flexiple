import { useState, useEffect } from "react";
import CommentForm from "./CommentForm.js";
import Comment from "./Comment";
import axios from "axios";
import data from "./../data/currentUserDetails.json";
import { Grid } from "@mui/material";

const Comments = () => {
  const backEndUrl = process.env.REACT_APP_API_URL;
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const parentsComments = backendComments.filter(
    (backendComment) => backendComment.parentCommentId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentCommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    axios
      .post(`${backEndUrl}/addNewComment`, {
        authorName: data.userName,
        commentDescription: text,
        parentCommentId: parentId,
      })
      .then((res) => {
        getAllComments();
        setActiveComment(null);
      });
    console.log("add comment");
  };

  const updateComment = (text, commentId) => {
    axios
      .post(`${backEndUrl}/editComment`, {
        commentId: commentId,
        commentDescription: text,
      })
      .then((res) => {
        console.log(res);
        getAllComments();
        setActiveComment(null);
      });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      axios
        .post(`${backEndUrl}/deleteComment`, {
          commentId: commentId,
        })
        .then((res) => {
          console.log(res);
          getAllComments();
        });
    }
  };

  const getAllComments = () => {
    axios.get(`${backEndUrl}/getAllComments`).then((res) => {
      console.log(res.data.message);
      setBackendComments(res.data.message);
    });
  };

  const updateUpVote = (commentId) => {
    axios
      .post(`${backEndUrl}/updateVoteCount`, { commentId: commentId })
      .then((res) => {
        console.log(res);
        getAllComments();
      });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="comments">
      <h3>Flexiple Comments</h3>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        <Grid>
          {parentsComments.map((rootComment) => (
            <Comment
              key={rootComment._id}
              comment={rootComment}
              replies={getReplies(rootComment._id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              updateUpVote={updateUpVote}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Comments;
