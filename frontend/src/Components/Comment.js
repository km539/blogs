import React, { useState } from "react";
import Reply from "./Reply";
import "../styles/Comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ commentData, onDelete }) => {
  const [comment, setComment] = useState(commentData);
  const [replyContent, setReplyContent] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [deletedReplyId, setDeletedReplyId] = useState(null);
  
  const handleDeleteComment = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${comment.id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        console.log("Comment deleted successfully!");
        onDelete(comment.id);
      } else {
        console.error("Failed to delete comment:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };  

  const handleDeleteReply = (deletedId) => {
    setDeletedReplyId(deletedId);
  };

  const toggleDeleteButton = () => {
    setShowDeleteButton(!showDeleteButton);
  };

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
          <p className="commentCreatedAt">{comment.createdAt}</p>
          <div className="menu-icon" onClick={toggleDeleteButton}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
          {showDeleteButton && (
            <button className="delete-button" onClick={handleDeleteComment}>
              削除
            </button>
          )}
        </div>
        <textarea readOnly rows={4} cols={50} defaultValue={comment.content} />
      </div>

      <div className="replies">
        {comment.replies &&
          comment.replies.map((reply) => (
            reply.id !== deletedReplyId && 
            <Reply key={reply.id} replyData={reply} onDelete={handleDeleteReply} />
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
