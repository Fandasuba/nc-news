import React from "react";

const LoadedArticle = ({ article }) => {
  return (
    <article>
      <div className="rendered-article">
        <h1>{article.title}</h1>
        <img src={article.article_img_url} alt={article.title} />
        <p>Author: {article.author}</p>
        <p>
          Posted in {article.topic} on {article.created_at}
        </p>
        <p>{article.body}</p>
        <p>Comment Count: {article.comment_count}</p>
      </div>
    </article>
  );
};

export default LoadedArticle;
