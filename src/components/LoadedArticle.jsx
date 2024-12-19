import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import moment from "moment";
import ArticleVote from "./ArticleVote";
import PostComment from "./PostComment";
import { useUser } from "../../UserContext";

const LoadedArticle = ({ article }) => {
  const [refreshComments, setRefreshComments] = useState(false);
  const { user } = useUser();

  const handleRefreshComments = () => {
    setRefreshComments(false); // aiming to re render as false once the trigger happens.
  };

  useEffect(() => {
    if (refreshComments) {
      handleRefreshComments();
    }
  }, [refreshComments]);

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
      <PostComment
        article_id={article.article_id}
        setRefreshComments={setRefreshComments}
        children={user}
      />
      <CommentCard
        article_id={article.article_id}
        refreshComments={refreshComments}
        user={user}
      />
    </>
  );
};

export default LoadedArticle;
