import React from "react";
import "../Styles/Friends.css";

const Friends = () => {
  return (
    <div className="friends-container">
      <div className="friends-list">
        <h2>友達リスト</h2>
        <p>人数：3名</p>
        <div className="friend">
          <img src="https://5.imimg.com/data5/SELLER/Default/2020/12/AP/QI/NQ/14784178/groot1.jpg" alt="友達の画像" />
          <p>mo mo</p>
        </div>
        <div className="friend">
          <img src="https://5.imimg.com/data5/SELLER/Default/2020/12/AP/QI/NQ/14784178/groot1.jpg" alt="友達の画像" />
          <p>Du Du</p>
        </div>
        <div className="friend">
          <img src="https://5.imimg.com/data5/SELLER/Default/2020/12/AP/QI/NQ/14784178/groot1.jpg" alt="友達の画像" />
          <p>Bu Bu</p>
        </div>
      </div>
    </div>
  );
};

export default Friends;
