import React from "react";

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
      {/* <div className="replies">
                {com.replies.map(row => {
                  return (
                    <div className={`comment${row.id}`}>
                      <textarea
                        className="commentContent"
                        readOnly
                        rows={4}
                        cols={50}
                      >
                        {row.content}
                      </textarea>
                      <div className="commentUser">
                        <p>{row.user.username}</p>
                        <p>{row.createdAt}</p>
                        <button
                          type="button"
                          className="replayBtn"
                          onClick={toggleReplyBox}
                        >
                          reply
                        </button>
                      </div>
                      <p>{row.score}</p>
                    </div>
                  );
                })}
              </div> */}
    </div>
  );
};

export default Comment;
