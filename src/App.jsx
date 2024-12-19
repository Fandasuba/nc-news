import React from "react";
import AllArticles from "./components/AllArticles";
import Homepage from "./components/Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ViewArticle from "./components/ViewArticle";
import { UserProvider } from "../UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/articles" element={<AllArticles />} />
              <Route path="/articles/:article_id" element={<ViewArticle />} />
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
