import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";

const NavBar = () => {
  return (
    <div id="nav">
      <ul>
        <li>
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="Homeicon"
            className="Homeicon"
          />
          <Link to="/">Home</Link>
        </li>
        <li>
          <img
            src="https://cdn-icons-png.flaticon.com/512/880/880594.png"
            alt="Friendsicon"
            className="Friendsicon"
          />
          <Link to="/Friends">Friends</Link>
        </li>
        <li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpUJhFwB85GyHaxths8hBLh6L9kSmttcgOQ&s"
            alt="MyPageicon"
            className="MyPageicon"
          />
          <Link to="/MyPage">My Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
