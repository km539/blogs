import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div id="nav">
      <ul>
        <li>
          <img
            src={
              activeLink === "Home"
                ? "https://cdn-icons-png.flaticon.com/512/25/25694.png"
                : "https://cdn-icons-png.freepik.com/512/2550/2550264.png"
            }
            alt="Homeicon"
            className="Homeicon"
          />
          <Link
            to="/"
            onClick={() => handleClick("Home")}
            className={activeLink === "Home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <img
            src={
              activeLink === "Friends"
                ? "https://cdn-icons-png.flaticon.com/512/880/880594.png"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVMrWuHL2-CePyWU6RChDEgqQyjEKvldJrFw&s"
            }
            alt="Friendsicon"
            className="Friendsicon"
          />
          <Link
            to="/Friends"
            onClick={() => handleClick("Friends")}
            className={activeLink === "Friends" ? "active" : ""}
          >
            Friends
          </Link>
        </li>
        <li>
          <img
            src={
              activeLink === "MyPage"
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpUJhFwB85GyHaxths8hBLh6L9kSmttcgOQ&s"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgMiuHM7E_Jwy7M0NcdjzGYU5_dEwpGSwIdA&s"
            }
            alt="MyPageicon"
            className="MyPageicon"
          />
          <Link
            to="/MyPage"
            onClick={() => handleClick("MyPage")}
            className={activeLink === "MyPage" ? "active" : ""}
          >
            My Page
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
