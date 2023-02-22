import { ArrowUpward, Delete, Edit, Reply } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentCommentId = null,
  updateUpVote,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";

  const canReply = parentCommentId === null;
  const replyId = parentCommentId ? parentCommentId : comment._id;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="individualComment">
          <div className="individualComment__left">
            <Avatar src={comment.profilePicture} />
          </div>
          <div className="individualComment__right">
            <div className="individualComment__right__top">
              <div className="individualComment__right__top__left">
                <span>{comment.authorName}</span>
                <Edit
                  onClick={() =>
                    setActiveComment({ id: comment._id, type: "editing" })
                  }
                />
              </div>
              <p>{!isEditing && comment.commentDescription}</p>
              {isEditing && (
                <CommentForm
                  submitLabel="Update"
                  hasCancelButton
                  initialText={comment.commentDescription}
                  handleSubmit={(text) => updateComment(text, comment._id)}
                  handleCancel={() => {
                    setActiveComment(null);
                  }}
                />
              )}
            </div>
            {!isEditing && (
              <div className="individualComment__right__bottom">
                <ArrowUpward onClick={() => updateUpVote(comment._id)} />
                {comment.upvoteCount}
                <div style={{ marginLeft: "20px", marginRight: "5px" }}>
                  <Delete onClick={() => deleteComment(comment._id)} />
                </div>
                {canReply && (
                  <Reply
                    onClick={() =>
                      setActiveComment({ id: comment._id, type: "replying" })
                    }
                  />
                )}
              </div>
            )}
            {isReplying && (
              <div className="newReply">
                <CommentForm
                  submitLabel="Reply"
                  handleSubmit={(text) => addComment(text, replyId)}
                />
              </div>
            )}
            {replies.length > 0 && (
              <div className="IndividualComments--replies">
                {replies.map((reply) => (
                  <Comment
                    comment={reply}
                    key={reply._id}
                    setActiveComment={setActiveComment}
                    activeComment={activeComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                    addComment={addComment}
                    parentCommentId={comment._id}
                    replies={[]}
                    updateUpVote={updateUpVote}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
