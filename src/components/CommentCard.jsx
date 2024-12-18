import React from "react";
import { getCommentsForArticles, getUsers } from "../api";
import { useState, useEffect } from "react";
import moment from "moment";
// import thumbsUpIcon from "../assets/thumbs-up_icon-icons.com_73369.png";
// import thumbsDownIcon from "../assets/thumbs_down_icon_194546.png";

const CommentCard = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    getCommentsForArticles(article_id).then((data) => {
      setComments(data.comments);
      //console.log(data, "data comments");
    });

    getUsers().then((data) => {
      // console.log(data, "inside getUsers in CommentCard");
      setAvatars(data.users);
    });
  }, [article_id]);

  // Helper function to find avatar URL for a comment's author per Aimee's feedback. I genuinely forgot there were avatar urls in the users table, hence placing custom SVGs. More good practice though!
  const getAvatarForAuthor = (author) => {
    const user = avatars.find((user) => user.username === author);
    return user
      ? user.avatar_url
      : "https://duckduckgo.com/i/a62c4a70778183e1.png";
  };

  // console.log(avatars, "avatars");

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
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
