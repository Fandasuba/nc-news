import { useUser } from "../../UserContext";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { fetchCommentsAndAvatars } from "../../utils";
import { deleteComments } from "../api";

const CommentCard = ({
  article_id,
  refreshComments,
  setRefreshComments,
  updateCommentCount,
}) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [deleteMessage, setDelete] = useState({});
  const [shakeComment, setShakeComment] = useState({});
  const [errorComment, setErrorComment] = useState({}); // Track error state by comment ID

  useEffect(() => {
    fetchCommentsAndAvatars(article_id, setComments, setAvatars);
  }, [article_id]);

  useEffect(() => {
    if (refreshComments) {
      fetchCommentsAndAvatars(article_id, setComments, setAvatars);
      setDelete({});
      setShakeComment({});
      setErrorComment({});
    }
  }, [refreshComments]);

  const getAvatarForAuthor = (author) => {
    const user = avatars.find((user) => user.username === author);
    return user
      ? user.avatar_url
      : "https://duckduckgo.com/i/a62c4a70778183e1.png";
  };

  const handleDelete = (comment_id) => {
    const deletedComment = comments.find(
      (comment) => comment.comment_id === comment_id
    );

    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== comment_id)
    );
    setDelete((prev) => ({
      ...prev,
      [comment_id]: "Deleting comment in progress...",
    }));

    deleteComments(comment_id)
      .then(() => {
        setDelete((prev) => ({
          ...prev,
          [comment_id]: "Comment deleted successfully.",
        }));
        setRefreshComments(true);
        updateCommentCount((prevCount) => prevCount - 1);
      })
      .catch((err) => {
        console.error("Error deleting comment:", err);
        setDelete((prev) => ({
          ...prev,
          [comment_id]:
            "Failed to delete comment. Try again later or check your connection.",
        }));
        // Re-add the comment to the list and trigger shake animation
        setComments((prevComments) => [deletedComment, ...prevComments]);
        setShakeComment((prev) => ({
          ...prev,
          [comment_id]: true,
        }));
        setErrorComment((prev) => ({
          ...prev,
          [comment_id]: true,
        }));
        // Remove shake animation class after it completes
        setTimeout(() => {
          setShakeComment((prev) => ({
            ...prev,
            [comment_id]: false,
          }));
        }, 500); // Match the duration of the shake animation
      });
  };

  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <div
          key={comment.comment_id}
          className={`comment-card ${
            shakeComment[comment.comment_id] ? "shake" : ""
          } ${errorComment[comment.comment_id] ? "error" : ""}`}
        >
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
          {deleteMessage[comment.comment_id] && (
            <p className="delete-message">
              {deleteMessage[comment.comment_id]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
