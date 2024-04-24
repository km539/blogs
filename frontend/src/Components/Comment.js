import React, { useState } from "react";
import Reply from "./Reply";
import "../Styles/Comment.css";

const Comment = ({ comment, handleReply }) => {
  const [replyContent, setReplyContent] = useState("");

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    handleReply(comment.id, replyContent); // コメント ID も一緒に送信
    setReplyContent(""); // フォームをクリア
  };

  return (
    <div className={`comment`} key={comment.id}>
      <div className="commentContent">
        <div className="commentText">
          <div className="commentUser">
            <img
              src="https://www.comingsoon.net/wp-content/uploads/sites/3/2022/06/Baby-Groot.jpeg?w=800"
              alt="Baby Groot"
            />
            <p>{comment.username}</p>
          </div>
          <p>{comment.createdAt}</p>
        </div>
        <textarea readOnly rows={4} cols={50} value={comment.content} />
      </div>

      <div className="replies">
      {comment.replies && comment.replies.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
      <div className="replyBox">
        <form className="replyForm" onSubmit={handleSubmitReply}>
          <textarea
            name="replyComment"
            value={replyContent}
            onChange={handleReplyChange}
            cols="50"
            rows="3"
            required
          ></textarea>
          <button type="submit">Reply</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
