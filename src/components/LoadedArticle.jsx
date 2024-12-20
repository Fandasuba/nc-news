import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import moment from "moment";
import ArticleVote from "./ArticleVote";
import PostComment from "./PostComment";
import { useUser } from "../../UserContext";

const LoadedArticle = ({ article }) => {
  const [refreshComments, setRefreshComments] = useState(false);
  const [commentCount, setCommentCount] = useState(article.comment_count);
  const { user } = useUser();

  const handleRefreshComments = () => {
    setRefreshComments(false);
  };

  useEffect(() => {
    if (refreshComments) {
      handleRefreshComments();
    }
  }, [refreshComments]);

  const updateCommentCount = (newCount) => {
    setCommentCount(newCount);
  };

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
          <br />
          <ArticleVote article={article} />
          <br />
          <p>Comment Count: {commentCount}</p>
        </div>
      </article>
      <PostComment
        article_id={article.article_id}
        setRefreshComments={setRefreshComments}
        updateCommentCount={updateCommentCount}
      />
      <CommentCard
        article_id={article.article_id}
        refreshComments={refreshComments}
        setRefreshComments={setRefreshComments}
        updateCommentCount={updateCommentCount}
      />
    </>
  );
};

export default LoadedArticle;
