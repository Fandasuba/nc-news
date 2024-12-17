import React from "react";
const ArticleCard = ({ article, className }) => {
  return (
    <div className={className}>
      <strong>{article.title}</strong>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="card-image"
      />
      <div className="card-text">
        <p>{article.title}</p>
        <p>
          by {article.author} on {[article.created_at]}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;
