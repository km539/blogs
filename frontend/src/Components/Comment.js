import React, { useState, useEffect } from "react";
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

  const handleDeleteReply = (deletedId) => {
    setDeletedReplyId(deletedId);
  };

  const handleEdit = () => {
    setEditMode(true);
    setShowEditButton(false);
    setShowDeleteButton(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent(comment.content);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuIcon = document.querySelector(".menu-icon");
      const deleteButton = document.querySelector(".delete-button");
      const editButton = document.querySelector(".edit-button");

      if (menuIcon && menuIcon.contains(event.target)) {
        return;
      }

      if (deleteButton && !deleteButton.contains(event.target)) {
        setShowDeleteButton(false);
      }

      if (editButton && !editButton.contains(event.target)) {
        setShowEditButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="comment" key={comment.id}>
      <div className="commentContent">
        <div className="commentText">
          <div className="commentUser">
            <img
              src="https://www.comingsoon.net/wp-content/uploads/sites/3/2022/06/Baby-Groot.jpeg?w=800"
              alt="Baby Groot"
            />
            <p>
              {comment.username}{" "}
              <span className="commentCreatedAt">{comment.createdAt}</span>
            </p>
          </div>
          <div
            className="menu-icon"
            onClick={() => {
              setShowDeleteButton(!showDeleteButton);
              setShowEditButton(!showEditButton);
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
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={4}
              cols={50}
            />
            <div className="edit-buttons">
              <button className="cancel-button" onClick={handleCancelEdit}>
                キャンセル
              </button>
              <button className="edit-submit-button" onClick={handleEditSubmit}>
                送信
              </button>
            </div>
          </div>
        ) : (
          <p>{comment.content}</p>
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
