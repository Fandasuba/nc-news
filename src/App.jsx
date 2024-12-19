import AllArticles from "./components/AllArticles";
import Homepage from "./components/Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ViewArticle from "./components/ViewArticle";
import { UserProvider } from "../UserContext";
import ViewTopics from "./components/ViewTopics";
import ArticlesByTopic from "./components/ArticlesByTopic";
import { useState, useEffect } from "react";
import { getArticles } from "./api";

const App = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getArticles().then((allArticles) => {
      const uniqueTopics = [
        ...new Set(allArticles.map((article) => article.topic)),
      ];
      setTopics(uniqueTopics);
    });
  }, []);
  return (
    <UserProvider>
      <Router>
        <header>
          <Header topics={topics} />
        </header>
        <div className="app">
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/articles" element={<AllArticles />} />
              <Route path="/articles/:article_id" element={<ViewArticle />} />
              <Route path="/topics" element={<ViewTopics />} />
              <Route path="/topics/:topic" element={<ArticlesByTopic />} />
            </Routes>
          </main>
          <footer>
            <p>© 2024 News Room</p>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
