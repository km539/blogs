import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [replyBoxHidden, setReplyBoxHidden] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("/api/comments");
    const jsonData = await res.json();
    setData(jsonData.comments);
  };

  const toggleReplyBox = () => {
    setReplyBoxHidden(!replyBoxHidden);
  };

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  return (
    <>
      <div className="replyBox" hidden={replyBoxHidden}>
        <form className="replyForm">
          <textarea
            name="replyComment"
            id=""
            cols="50"
            rows="3"
            required
          ></textarea>
          <button type="submit">Reply</button>
        </form>
      </div>
      <div className="comments">
        {data.map(com => {
          return (
            <div className={`comment${com.id}`} key={com.id}>
              <textarea className="commentContent" readOnly rows={4} cols={50}>
                {com.content}
              </textarea>
              <div className="commentUser">
                <p>{com.user.username}</p>
                <p>{com.createdAt}</p>
                <button
                  type="button"
                  className="replayBtn"
                  onClick={toggleReplyBox}
                >
                  reply
                </button>
              </div>
              <p>{com.score}</p>
              <div className="replies">
                {com.replies.map(row => {
                  return (
                    <div className={`comment${row.id}`}>
                      <textarea
                        className="commentContent"
                        readOnly
                        rows={4}
                        cols={50}
                      >
                        {row.content}
                      </textarea>
                      <div className="commentUser">
                        <p>{row.user.username}</p>
                        <p>{row.createdAt}</p>
                        <button
                          type="button"
                          className="replayBtn"
                          onClick={toggleReplyBox}
                        >
                          reply
                        </button>
                      </div>
                      <p>{row.score}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
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
