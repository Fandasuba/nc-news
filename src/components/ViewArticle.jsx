import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getArticleById } from "../api";
import LoadedArticle from "./LoadedArticle";

const ViewArticle = () => {
  const { article_id } = useParams(); // Must match :article_id in the route
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  console.log("article_id from params:", article_id);

  useEffect(() => {
    if (article_id) {
      getArticleById(article_id)
        .then((articleData) => {
          setArticle(articleData); // Set the article data
          console.log("Fetched article data:", articleData);
        })
        .catch((err) => {
          console.error("Error fetching article:", err);
          setError(err);
        });
    }
  }, [article_id]);

  if (error) {
    return (
      <p>Error loading article: {error.message || "Something went wrong"}</p>
    );
  }

  if (!article) {
    return <p>Troubles finding article</p>;
  }

  return <LoadedArticle article={article} />;
};

export default ViewArticle;
