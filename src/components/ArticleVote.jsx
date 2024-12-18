import { patchArticleVotes } from "../api";
import { useState, useEffect } from "react";
const ArticleVote = ({ article }) => {
  const [voteTally, setVotes] = useState(article.votes);
  const [voteSubmission, setVoteSubmission] = useState("");

  const handleClick = (vote) => {
    // console.log(article, "inside articlevote.");
    patchArticleVotes(article.article_id, vote)
      .then(() => {
        setVotes((prevVotes) => {
          if (vote === -1) {
            setVoteSubmission("Article successfully down voted.");
            return prevVotes - 1;
          } else {
            setVoteSubmission("Article successfully up voted.");
            return prevVotes + 1;
          }
        });
      })
      .catch((error) => {
        console.error("Error in voting:", error);
        setVoteSubmission("Error updating the vote.");
      });
  };
  return (
    <>
      <div className="rating-system">
        Rate this article{" "}
        <button className="comment-vote-buttons" onClick={() => handleClick(1)}>
          👍
        </button>
        <button
          className="comment-vote-buttons"
          onClick={() => handleClick(-1)}
        >
          👎
        </button>
        Popularity: 🔥&nbsp; {voteTally}
      </div>
      <p>{voteSubmission}</p>
    </>
  );
};

export default ArticleVote;
