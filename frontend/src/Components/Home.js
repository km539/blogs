import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import "../Styles/Home.css";

const Home = () => {
  const [data, setData] = useState([]); 
  const [comment, setComment] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/comments");
      // const res = await fetch("/api/comments");
      const jsonData = await res.json();
      // console.log("Comments data:", jsonData);
      setData(jsonData.comments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      
      getData();
    } else {
      
      try {
        const res = await fetch("http://localhost:5000/api/comments/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: search }),
        });
        const jsonData = await res.json();
        setData(jsonData.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const sendComment = async () => {
    try {
      if (!comment.trim()) {
        alert("コメントを入力してください。");
        return;
      }
      const res = await fetch("http://localhost:5000/api/comments", {
        // const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      });

      if (res.ok) {
        console.log("Comment added successfully!");
        const responseJson = await res.json();
        updateComments(responseJson.newComment);
        setComment("");
      } else {
        console.error("Failed to add comment:", res.statusText);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  const updateComments = (newComment) => {
    setData((prevComments) => [...prevComments, newComment]);
  };

  const handleDeleteComment = async (deletedId) => {
    setData((prevData) => prevData.filter(comment => comment.id !== deletedId));
  };

  return (
    <>
      <div className="home-container">
        <div className="Search">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="コメントを検索"
            />
            <button type="submit">検索</button>
          </form>
        </div>

        <div className="comments">
          {data.map((comment) => {
            return (
              <div key={comment.id}>
                <Comment key={comment.id} commentData={comment} onDelete={handleDeleteComment}/>
              </div>
            );
          })}
        </div>
        <div className="post">
          <form
            className="postForm"
            onSubmit={(e) => {
              e.preventDefault();
              sendComment();
            }}
          >
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
      </div>
    </>
  );
};

export default Home;
