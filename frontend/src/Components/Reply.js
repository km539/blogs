import React, { useState } from "react";
import "../Styles/Reply.css";

const Reply = ({ replyData }) => {
  const [reply] = useState(replyData);
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
        <textarea className="commentReply" readOnly rows={4} cols={50} defaultValue={reply.content} />
      </div>
    </div>
  );
};

export default Reply;
