import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const ArticlesByTopic = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getArticles()
      .then((allArticles) => {
        const filteredArticles = allArticles.filter(
          (article) => article.topic === topic
        );
        setArticles(filteredArticles);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [topic]);

  return (
    <div className="card-container">
      <h2>Articles about {topic}</h2>
      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          article={article}
          className="card"
        />
      ))}
    </div>
  );
};

export default ArticlesByTopic;
