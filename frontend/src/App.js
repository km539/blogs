import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("/api/comments");
    const jsonData = await res.json();
    setData(jsonData.comments);
  };

  return (
    <>
      <div class="replyBox" hidden>
        <form class="replyForm">
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
      {data.map(com => {
        return (
          <div className={`comment${com.id}`} key={com.id}>
            <textarea readOnly rows={4} cols={50}>
              {com.content}
            </textarea>
            <div>
              <p>{com.user.username}</p>
              <p>{com.createdAt}</p>
              <button type="button" className="replayBtn">
                reply
              </button>
            </div>
            <p>{com.score}</p>
            <div className="replies">
              {com.replies.map(row => {
                return (
                  <div className={`comment${row.id}`}>
                    <textarea readOnly rows={4} cols={50}>
                      {row.content}
                    </textarea>
                    <div>
                      <p>{row.user.username}</p>
                      <p>{row.createdAt}</p>
                      <button type="button" className="replayBtn">
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
      <div className="post">
        <form className="postForm" onSubmit={() => {}}>
          <textarea
            name="comment"
            value={""}
            onChange={() => {}}
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
