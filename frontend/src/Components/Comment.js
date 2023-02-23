import { ArrowUpward, Delete, Edit, Reply } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import CommentForm from "./CommentForm";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

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
    <div className="individualComment">
      <div className="individualComment__left">
        <Avatar src={comment.profilePicture} />
      </div>
      <div className="individualComment__right">
        <div className="individualComment__right__top">
          <div className="individualComment__right__top__left">
            <span>{comment.authorName}</span>
            <Edit
              style={{ cursor: "pointer" }}
              sx={{ color: "#443C68" }}
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
            <div>
              <Tooltip title="Up Vote">
                <ArrowUpward
                  style={{ cursor: "pointer" }}
                  sx={{ color: "#443C68" }}
                  onClick={() => updateUpVote(comment._id)}
                />
              </Tooltip>

              {comment.upvoteCount}
            </div>
            <div style={{ marginLeft: "20px", marginRight: "5px" }}>
              <Tooltip title="Delete">
                <Delete
                  style={{ cursor: "pointer" }}
                  tooltip="Description here"
                  sx={{ color: "#443C68" }}
                  onClick={() => deleteComment(comment._id)}
                />
              </Tooltip>
            </div>
            {canReply && (
              <div>
                <Tooltip title="Reply">
                  <Reply
                    style={{ cursor: "pointer" }}
                    sx={{ color: "#443C68" }}
                    onClick={() =>
                      setActiveComment({ id: comment._id, type: "replying" })
                    }
                  />
                </Tooltip>
                {replies.length}
              </div>
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
  );
};

export default Comment;
