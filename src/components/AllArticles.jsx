import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access the topic from the URL
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import SortMenu from "./SortMenu";

const AllArticles = () => {
  const { topic } = useParams(); // Get the topic from the URL params
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");
  const [refresh, setRefresh] = useState(false);

  // Fetch all articles, with optional sorting
  const fetchArticles = (sortBy, orderBy) => {
    setLoading(true);
    setError(null);

    getArticles(sortBy, orderBy)
      .then((fetchedArticles) => {
        // If a topic is provided, filter articles by topic
        if (topic) {
          const filteredArticles = fetchedArticles.filter(
            (article) => article.topic === topic
          );
          setArticles(filteredArticles);
        } else {
          setArticles(fetchedArticles);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch articles. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
    fetchArticles(sortBy, orderBy);
  }, [sortBy, orderBy, refresh, topic]);

  const handleRetry = () => {
    setRefresh(true);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleOrderChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
  };

  if (loading)
    return (
      <div>
        <p>Loading articles, please wait...</p>
        <br />
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.tenor.com%2FqERcAX4xHwMAAAAC%2Ftower-broadcast.gif&f=1&nofb=1&ipt=04235848f101013243d4d00cdc89f27662d739ef1b4a735bcd75bc964990a617&ipo=images"
          alt="Loading animation"
        />
      </div>
    );

  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );

  return (
    <div>
      <SortMenu
        sortBy={sortBy}
        sortOrder={orderBy}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
        refresh={setRefresh}
      />
      <div className="card-container">
        <h1>
          {topic
            ? `Articles about ${topic}`
            : "Explore the latest from around the world!"}
        </h1>

        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((article, index) => (
            <ArticleCard
              key={article.article_id}
              article={article}
              className={index === 0 ? "large-card" : "card"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllArticles;
