import React, { useState } from "react";
import "../Styles/Reply.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Reply = ({ replyData, onDelete}) => {
  const [reply, setReply] = useState(replyData);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);

  const toggleDeleteButton = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const toggleEditButton = () => {
    setShowEditButton(!showEditButton);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/replies/${reply.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Reply deleted successfully!");
        onDelete(reply.id);
      } else {
        console.error("Failed to delete reply:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/replies/${reply.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });
  
      if (res.ok) {
        const responseJson = await res.json();
        setEditedContent(responseJson.updatedReply.content);
        setEditMode(false);
        toggleEditButton();
        toggleDeleteButton();
        setReply((prevReply) => ({
          ...prevReply,
          content: responseJson.updatedReply.content,
        }));
        console.log("Reply edited successfully!");
      } else {
        console.error("Failed to edit reply:", res.statusText);
      }
    } catch (error) {
      console.error("Error editing reply:", error);
    }
  };

  return (
    <div className={`comment${reply.id}`}>
      <div className="commentInfo">
        <div className="commentUser1">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbC9kG2N9m9Atiw4Vp8meRz5eOxPuKg7OnfQ&s"
            alt="Baby Groot"
          />
          <p>{reply.username}</p>
          <p>{reply.createdAt}</p>
        </div>
        {editMode ? (
          <textarea
            className="commentTextarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
            cols={50}
          />
        ) : (
          <div className="commentContent">
            <p>{reply.content}</p>
          </div>
        )}
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
          <button className="delete-button" onClick={handleDelete}>
            削除
          </button>
        )}
        {showEditButton && (
          <button className="edit-button" onClick={handleEdit}>
            編集
          </button>
        )}
        {editMode && (
          <button className="edit-submit-button" onClick={handleEditSubmit}>
            送信
          </button>
        )}
      </div>
    </div>
  );
};

export default Reply;
