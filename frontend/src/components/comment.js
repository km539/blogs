import React from "react";
import Reply from "./Reply";

const Comment = ({ comment, toggleReplyBox }) => {
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
      <p>{comment.score}</p>
      <div className="replies">
        {comment.replies.map((reply) => (
          <Reply key={reply.id} reply={reply} toggleReplyBox={toggleReplyBox} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
