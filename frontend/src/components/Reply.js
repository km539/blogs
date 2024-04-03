import React from "react";

const Reply = ({ reply, toggleReplyBox }) => {
  return (
    <div className={`comment${reply.id}`}>
      <textarea className="commentContent" readOnly rows={4} cols={50}>
        {reply.content}
      </textarea>
      <div className="commentUser">
        <p>{reply.user.username}</p>
        <p>{reply.createdAt}</p>
        <button
          type="button"
          className="replayBtn"
          onClick={toggleReplyBox}
        >
          reply
        </button>
      </div>
      <p>{reply.score}</p>
    </div>
  );
};

export default Reply;