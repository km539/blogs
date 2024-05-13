import React, { useState } from "react";
import "../Styles/Reply.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Reply = ({ replyData, onDelete}) => {
  const [reply] = useState(replyData);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const toggleDeleteButton = () => {
    setShowDeleteButton(!showDeleteButton);
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
        <textarea
          className="commentReply"
          readOnly
          rows={4}
          cols={50}
          defaultValue={reply.content}
        />
        <div className="menu-icon" onClick={toggleDeleteButton}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        {showDeleteButton && (
          <button className="delete-button" onClick={handleDelete}>
            削除
          </button>
        )}
      </div>
    </div>
  );
};

export default Reply;
