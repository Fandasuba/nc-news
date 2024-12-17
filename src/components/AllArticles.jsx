import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        const sortedArticles = [...articles].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        console.log(sortedArticles);
        setArticles(sortedArticles);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div>
        <p>Loading all articles, please wait...</p>
        <br />
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.tenor.com%2FqERcAX4xHwMAAAAC%2Ftower-broadcast.gif&f=1&nofb=1&ipt=04235848f101013243d4d00cdc89f27662d739ef1b4a735bcd75bc964990a617&ipo=images"
          alt="Loading animation"
        />
      </div>
    );
  return (
    <div className="card-container">
      <h1>Explore the latest from around the world!</h1>
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          article={article}
          className={index === 0 ? "large-card" : "card"}
        />
      ))}
    </div>
  );
};

export default AllArticles;
