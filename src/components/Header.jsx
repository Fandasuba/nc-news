import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserAccount from "./UserAccount";
import SortMenu from "./SortMenu";

const Header = ({ topics }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleArticleClick = () => {
    navigate("/articles");
  };

  const handleTopicClick = (topic) => {
    navigate(`/topics/${topic}`);
  };

  const handleGoToTopicsClick = () => {
    navigate("/topics");
  };
  const isTopicsPage = location.pathname.startsWith("/topics");

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
            <button onClick={handleArticleClick} className="nav-button">
              Go to Articles
            </button>
            <button onClick={handleGoToTopicsClick} className="nav-button">
              Go to Topics
            </button>
          </li>
        </ul>
        {isTopicsPage && topics && topics.length > 0 && (
          <ul className="topics-nav">
            {topics.map((topic) => (
              <li key={topic}>
                <button
                  onClick={() => handleTopicClick(topic)}
                  className="nav-button"
                >
                  {topic}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <div className="user-info">
        <UserAccount />
      </div>
    </header>
  );
};
export default Header;
