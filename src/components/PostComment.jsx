import { useState, useEffect } from "react";
import { postNewComment } from "../api";

const PostComment = ({ article_id }) => {
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    postNewComment(username, body, article_id)
      .then(() => {
        setLoading(false);
        setSuccessMessage("Post Successful!");
      })
      .catch((err) => {
        setLoading(false);
        setError("Provide valid Username or body.");
      });
  };

  return (
    <form className="post-comment-to-article">
      <label className="form-username">
        Username:
        <input
          placeholder="Username goes here."
          className="form-username-box"
          required
          onChange={handleUsernameChange}
        />
      </label>
      <label className="form-body">
        Share your thoughts?:
        <textarea
          placeholder="Comments go here."
          className="form-comments-box"
          required
          onChange={handleBodyChange}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Publish!
      </button>{" "}
      <button
        type="reset"
        onClick={() => {
          setUsername("");
          setBody("");
        }}
      >
        Clear
      </button>
      <div className="form-optimistic-rendering">
        {loading && <p>Loading, please wait.</p>}
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
      </div>
    </form>
  );
};

export default PostComment;
