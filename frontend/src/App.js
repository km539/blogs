import React, { useEffect, useState } from "react";
import "./App.css";
import Comment from "./Components/Comment";
import Post from "./Components/Post";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const res = await fetch("/api/comments");
    const res = await fetch("http://localhost:5000/api/comments");
    const jsonData = await res.json();
    setData(jsonData.comments);
  };

  return (
    <>
      <div className="comments">
        {data.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      <Post />
    </>
  );
};

export default App;
