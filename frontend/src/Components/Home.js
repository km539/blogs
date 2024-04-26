import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import "../Styles/Home.css";

const Home = () => {
  const [data, setData] = useState([]); //comments
  const [comment, setComment] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // const res = await fetch("http://localhost:5000/api/comments");
      const res = await fetch("/api/comments");
      const jsonData = await res.json();
      setData(jsonData.comments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // const handleReply = async (commentId, replyContent) => {
  //   try {
  //     if (!replyContent.trim()) {
  //       alert("返信内容を入力してください。");
  //       return;
  //     }

  //     const res = await fetch("http://localhost:5000/api/replies", {
  //       // const res = await fetch("/api/replies", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ content: replyContent, commentId }),
  //     });

  //     if (res.ok) {
  //       console.log("Reply added successfully!");
  //       const responseJson = await res.json();
  //       console.log("New reply data:", responseJson.newReply);
  //       updatereplies(commentId, responseJson.newReply);
  //     } else {
  //       console.error("Failed to add reply:", res.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error adding reply:", error);
  //   }
  // };

  // const updatereplies = (commentId, newReply) => {
  //   setData((prevData) => {
  //     return prevData.map((comment) => {
  //       if (comment.id === commentId) {
  //         return {
  //           ...comment,
  //           replies: [...comment.replies, newReply],
  //         };
  //       }
  //       return comment;
  //     });
  //   });
  // };

  const sendComment = async () => {
    try {
      if (!comment.trim()) {
        alert("コメントを入力してください。");
        return;
      }
      // const res = await fetch("http://localhost:5000/api/comments", {
        const res = await fetch("/api/comments", {
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

  return (
    <>
     <div className="home-container">
      <div className="comments">
        {data.map((comment) => {
          return (
            <div key={comment.id}>
              {/* <Comment comment={comment} handleReply={handleReply} /> */}
              <Comment key={comment.id} commentData={comment} />
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
