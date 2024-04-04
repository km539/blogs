import React, { useState } from "react";
import Reply from "./Reply";

const Comment = ({ comment }) => {
  const [replyBoxHidden, setReplyBoxHidden] = useState(true);

  const toggleReplyBox = () => {
    setReplyBoxHidden(!replyBoxHidden);
  };

  return (
    <div className={`comment${comment.id}`} key={comment.id}>
      <textarea className="commentContent" readOnly rows={4} cols={50}>
        {comment.content}
      </textarea>
      <div className="commentUser">
        <p>{comment.user.username}</p>
        <p>{comment.createdAt}</p>
        <button type="button" className="replayBtn" onClick={toggleReplyBox}>
          reply
        </button>
      </div>
      <div className="replyBox" hidden={replyBoxHidden}>
        <form className="replyForm">
          <textarea
            name="replyComment"
            id=""
            cols="50"
            rows="3"
            required
          ></textarea>
          <button type="submit">Reply</button>
        </form>
      </div>
      <p>{comment.score}</p>
      <div className="replies">
        {comment.replies.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
