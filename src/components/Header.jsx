import React from "react";
import { useNavigate } from "react-router-dom";
import UserAccount from "./UserAccount";

const Header = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/articles");
  };

  return (
    <header className="header">
      <img
        src="https://logodix.com/logo/247130.jpg"
        alt="Logo"
        className="logo-image"
      />
      <nav className="nav">
        <ul>
          <li>
            <button onClick={handleButtonClick}>Go to Articles</button>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <UserAccount />
      </div>
    </header>
  );
};

export default Header;
