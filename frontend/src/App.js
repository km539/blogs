import React, { useEffect, useState } from "react";
import Comment from "./Components/Comment";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("/api/comments");
    const jsonData = await res.json();
    setData(jsonData.comments);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <div className="comments">
        {data.map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment} />
          </div>
        ))}
      </div>
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
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default App;
