import React from "react";
import AllArticles from "./components/AllArticles";
import Homepage from "./components/Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/articles" element={<AllArticles />} />
          </Routes>
        </main>
        <footer>
          <p>© 2024 News Room</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
