import React, { useState } from "react";
import Reply from "./Reply";
import "../Styles/Comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ commentData, onDelete }) => {
  const [comment, setComment] = useState({
    ...commentData,
    replies: commentData.replies || [],
  });
  const [replyContent, setReplyContent] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [deletedReplyId, setDeletedReplyId] = useState(null);
  const [showEditButton, setShowEditButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(commentData.content);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const toggleDeleteButton = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const handleDeleteReply = (deletedId) => {
    setDeletedReplyId(deletedId);
  };

  const toggleEditButton = () => {
    setShowEditButton(!showEditButton);
  };

  //編集モードの切り替え関数
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleReply = async () => {
    try {
      if (!replyContent.trim()) {
        alert("返信内容を入力してください。");
        return;
      }

      const res = await fetch("http://localhost:5000/api/replies", {
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
    setComment((prevComment) => {
      return {
        ...prevComment,
        replies: [...(prevComment.replies || []), newReply],
      };
    });
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${comment.id}`,
        {
          method: "DELETE",
        }
      );

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

  //編集内容を送信する関数
  const handleEditSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${comment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (res.ok) {
        console.log("Comment edited successfully!");
        setEditMode(false);
        toggleEditButton();
        toggleDeleteButton();
        setComment((prevComment) => ({
          ...prevComment,
          content: editedContent,
        }));
      } else {
        console.error("Failed to edit comment:", res.statusText);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
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
          <div
            className="menu-icon"
            onClick={() => {
              toggleDeleteButton();
              toggleEditButton();
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>

          {showDeleteButton && (
            <button className="delete-button" onClick={handleDeleteComment}>
              削除
            </button>
          )}
          {showEditButton && (
            <button className="edit-button" onClick={handleEdit}>
              編集
            </button>
          )}
        </div>
        {editMode ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
            cols={50}
          />
        ) : (
          <p>{comment.content}</p>
        )}

        {editMode && (
          <button className="edit-submit-button" onClick={handleEditSubmit}>
            送信
          </button>
        )}
      </div>

      <div className="replies">
        {comment.replies &&
          comment.replies.map(
            (reply) =>
              reply.id !== deletedReplyId && (
                <Reply
                  key={reply.id}
                  replyData={reply}
                  onDelete={handleDeleteReply}
                />
              )
          )}
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
            返信
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
