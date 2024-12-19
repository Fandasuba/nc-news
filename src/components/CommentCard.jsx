import { useUser } from "../../UserContext";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { fetchCommentsAndAvatars } from "../../utils";
import { deleteComments } from "../api";

const CommentCard = ({ article_id, refreshComments, setRefreshComments }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [deleteMessage, setDelete] = useState("");

  useEffect(() => {
    // Initial fetch on component mount or when article_id changes
    fetchCommentsAndAvatars(article_id, setComments, setAvatars);
  }, [article_id]);

  useEffect(() => {
    // Trigger a re-fetch when refreshComments changes
    if (refreshComments) {
      fetchCommentsAndAvatars(article_id, setComments, setAvatars);
    }
  }, [refreshComments]);

  const getAvatarForAuthor = (author) => {
    const user = avatars.find((user) => user.username === author);
    return user
      ? user.avatar_url
      : "https://duckduckgo.com/i/a62c4a70778183e1.png";
  };

  const handleDelete = (comment_id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== comment_id)
    );
    setDelete(
      "Deleting comment in progress. Comment list should soon refresh."
    );
    deleteComments(comment_id)
      .then(() => {
        setDelete("Comment deleted successfully.");
        // setRefreshComments(true);
      })
      .catch((err) => {
        console.error("Error deleting comment:", err);
        setDelete("Error deleting comment.");
        // Revert state in case of error
        fetchCommentsAndAvatars(article_id, setComments, setAvatars);
      });
  };

  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-card">
          <div className="comment-header">
            <img
              src={getAvatarForAuthor(comment.author)}
              alt={`${comment.author}'s avatar`}
              className="comment-avatar"
            />
            <div className="comment-user-info">
              <p className="comment-user">{comment.author}</p>
              <p className="comment-date">
                {moment(comment.created_at).format("Do, MMM, YYYY")}
              </p>
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.body}</p>
            <p className="comment-votes">
              Votes: {comment.votes}{" "}
              <button className="comment-vote-buttons">👍</button>
              <button className="comment-vote-buttons">👎</button>
              {user && user.username === comment.author && (
                <button
                  className="comment-vote-buttons"
                  onClick={() => handleDelete(comment.comment_id)}
                >
                  Delete
                </button>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
