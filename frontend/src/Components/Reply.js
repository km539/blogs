import React, { useState, useEffect, useRef } from "react";
import "../Styles/Reply.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Reply = ({ replyData, onDelete }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(replyData.content);
  const menuIconRef = useRef(null);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/replies/${replyData.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Reply deleted successfully!");
        onDelete(replyData.id);
      } else {
        console.error("Failed to delete reply:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setShowEditButton(false);
    setShowDeleteButton(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent(replyData.content);
  };


  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`/api/replies/${replyData.id}`, {
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
        console.log("Reply edited successfully!");
      } else {
        console.error("Failed to edit reply:", res.statusText);
      }
    } catch (error) {
      console.error("Error editing reply:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuIcon = menuIconRef.current;
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
    <div className="reply">
      <div className="replyContent">
        <div className="replyText">
          <div className="replyUser">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbC9kG2N9m9Atiw4Vp8meRz5eOxPuKg7OnfQ&s"
              alt="User Avatar"
            />
            <p>
              {replyData.username}{" "}
              <span className="replyCreatedAt">{replyData.createdAt}</span>
            </p>
          </div>
          <div
            ref={menuIconRef}
            className="menu-icon"
            onClick={() => {
              setShowDeleteButton(!showDeleteButton);
              setShowEditButton(!showEditButton);
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
        </div>
        {editMode ? (
          <div>
            <textarea
              className="replyTextarea"
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
          <p>{replyData.content}</p>
        )}
      </div>
    </div>
  );
};

export default Reply;
