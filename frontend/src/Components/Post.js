import React, { useState } from "react";
import "../Styles/Post.css";
const Post = () => {
  const [comment, setComment] = useState("");

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  return (
    <div className="post">
      <form className="postForm" onSubmit={() => {}}>
        <textarea
          name="comment"
          value={comment}
          onChange={handleCommentChange}
          cols="50"
          rows="3"
          required
        ></textarea>
        <button>Post</button>
      </form>
    </div>
  );
};

export default Post;
