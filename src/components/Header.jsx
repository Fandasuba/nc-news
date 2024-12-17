import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/articles");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <button onClick={handleButtonClick}>Go to Articles</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
