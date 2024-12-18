import React from "react";
import CommentCard from "./CommentCard";
import moment from "moment";
import ArticleVote from "./ArticleVote";
import PostComment from "./PostComment";

const LoadedArticle = ({ article }) => {
  //   console.log(article, "inside loaded article for article props");
  return (
    <>
      <article>
        <div className="rendered-article">
          <h1>{article.title}</h1>
          <img src={article.article_img_url} alt={article.title} />
          <p>Author: {article.author}</p>
          <p>
            Posted in {article.topic} on&nbsp;
            {moment(article.created_at).format("Do, MMM, YYYY, @ h:mm A")}
          </p>
          <p>{article.body}</p>
          <br></br>
          <ArticleVote article={article} />
          <br></br>
          <p>Comment Count:&nbsp;{article.comment_count}</p>
        </div>
      </article>
      <PostComment article_id={article.article_id} />
      <CommentCard article_id={article.article_id} />
    </>
  );
};

export default LoadedArticle;
