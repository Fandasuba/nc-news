import { patchArticleVotes } from "../api";
import { useState } from "react";

const ArticleVote = ({ article }) => {
  const [voteTally, setVotes] = useState(article.votes);
  const [voteSubmission, setVoteSubmission] = useState("");
  const [voteStatus, setVoteStatus] = useState(""); // "success" or "error"

  const handleClick = (vote) => {
    patchArticleVotes(article.article_id, vote)
      .then(() => {
        setVotes((prevVotes) => {
          if (vote === -1) {
            setVoteSubmission("Article successfully downvoted.");
            setVoteStatus("success");
            return prevVotes - 1;
          } else {
            setVoteSubmission("Article successfully upvoted.");
            setVoteStatus("success");
            return prevVotes + 1;
          }
        });
      })
      .catch((error) => {
        console.error("Error in voting:", error);
        setVoteSubmission("Error updating the vote.");
        setVoteStatus("error");
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
      <p
        style={{
          color:
            voteStatus === "success"
              ? "green"
              : voteStatus === "error"
              ? "red"
              : "inherit",
          fontWeight: voteStatus ? "bold" : "normal",
        }}
      >
        {voteSubmission}
      </p>
    </>
  );
};

export default ArticleVote;
