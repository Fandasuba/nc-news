import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ArticleCard = ({ article, className }) => {
  return (
    <Link
      to={`/articles/${article.article_id}`}
      className={`${className} card-link`}
    >
      <div className="article-votes">
        <label>🔥{article.votes}</label>
      </div>
      <div className={className}>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="card-image"
        />
        <div className="card-text">
          <p>
            <b>{article.title}</b>
          </p>
          <p>{article.topic}</p>
          <p>
            by {article.author} on{" "}
            {moment(article.created_at).format("Do MMM, YYYY, @ h:mm A")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
