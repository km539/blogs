import React, { useState } from "react";
import Reply from "./Reply";
import "../Styles/Comment.css";

const Comment = ({ commentData }) => {
  const [comment, setComment] = useState(commentData);
  const [replyContent, setReplyContent] = useState("");

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReply = async () => {
    try {
      if (!replyContent.trim()) {
        alert("返信内容を入力してください。");
        return;
      }

      const res = await fetch("http://localhost:5000/api/replies", {
        //  const res = await fetch("/api/replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: replyContent, commentId: comment.id }),
      });

      if (res.ok) {
        console.log("Reply added successfully!");
        const responseJson = await res.json();
        updateReplies(responseJson.newReply);
        setReplyContent("");
      } else {
        console.error("Failed to add reply:", res.statusText);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const updateReplies = (newReply) => {
    //console.log("New reply:", newReply);
    setComment((prevComment) => {
      return {
        ...prevComment,
        replies: [...prevComment.replies, newReply],
      };
    });

    //   setComment(prev =>{
    //     const newData = {...prev,
    //       replies: [...prev.replies, newReply]
    //     }
    //     return newData;
    //   })
  };

  return (
    <div className="comment" key={comment.id}>
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
        <textarea readOnly rows={4} cols={50} defaultValue={comment.content} />
      </div>

      <div className="replies">
        {comment.replies &&
          comment.replies.map((reply) => (
            <Reply key={reply.id} replyData={reply} />
          ))}
      </div>
      <div className="replyBox">
        <form className="replyForm" onSubmit={(e) => e.preventDefault()}>
          <textarea
            name="replyComment"
            value={replyContent}
            onChange={handleReplyChange}
            cols="50"
            rows="3"
            required
          ></textarea>
          <button type="button" onClick={handleReply}>
            Reply
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
