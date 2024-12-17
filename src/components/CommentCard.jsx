import React from "react";
import { getCommentsForArticles } from "../api";
import { useState, useEffect } from "react";
import moment from "moment";
// import thumbsUpIcon from "../assets/thumbs-up_icon-icons.com_73369.png";
// import thumbsDownIcon from "../assets/thumbs_down_icon_194546.png";

const CommentCard = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsForArticles(article_id).then((data) => {
      setComments(data.comments);
      // console.log(data, "data comments");
    });
  }, [article_id]);

  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-card">
          <div className="comment-header">
            <img
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${comment.author}`}
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
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
