import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <div className="commentForm">
      {/* <form onSubmit={onSubmit}>
        <TextField
          id="outlined-multiline-static"
          label="Write Your Comment"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={onSubmit}
        />
        <div className="commentForm__button">
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={isTextareaDisabled}
          >
            {submitLabel}
          </Button>
          {hasCancelButton && (
            <Button variant="outlined" onClick={handleCancel} color="error">
              Cancel
            </Button>
          )}
        </div>
      </form> */}
      <form onSubmit={onSubmit}>
        <div className="commentArea">
          <input
            type="text"
            placeholder="Write your Comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSubmit={onSubmit}
          />
        </div>
        <div className="commentForm__button">
      
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={isTextareaDisabled}
          >
            {submitLabel}
          </Button>
          {hasCancelButton && (
            <Button variant="outlined" onClick={handleCancel} color="error">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
