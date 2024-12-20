import { useState } from "react";
import { postNewComment } from "../api";
import { useUser } from "../../UserContext";

const PostComment = ({
  article_id,
  setRefreshComments,
  updateCommentCount,
}) => {
  const { user } = useUser();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [shake, setShake] = useState(false);

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const username = user ? user.username : "";

    if (!username) {
      setError("User not found. Please log in.");
      setShake(true); // Apply shake effect
      setTimeout(() => setShake(false), 500); // Remove shake after animation
      setLoading(false);
      return;
    }

    postNewComment(username, body, article_id)
      .then(() => {
        setLoading(false);
        setSuccessMessage("Post Successful - The comment has been refreshed!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
        setRefreshComments(true);
        setBody("");
        updateCommentCount((prevCount) => prevCount + 1);
      })
      .catch((err) => {
        setLoading(false);
        if (!navigator.onLine) {
          setError(
            "Cannot post comment. Please check your internet connection."
          );
        } else {
          setError("Invalid comment body. Please try again.");
        }
        setShake(true); // Apply shake effect
        setTimeout(() => setShake(false), 500); // Remove shake after animation
      });
  };

  return (
    <form
      className={`post-comment-to-article ${shake ? "shake" : ""}`}
      onSubmit={handleSubmit}
    >
      <label className="form-body">
        Share your thoughts?:
        <textarea
          placeholder="Comments go here."
          className="form-comments-box"
          required
          value={body}
          onChange={handleBodyChange}
        />
      </label>
      <button type="submit" disabled={loading}>
        Publish!
      </button>
      <button
        type="reset"
        onClick={() => {
          setBody("");
        }}
      >
        Clear
      </button>
      <div className="form-optimistic-rendering">
        {loading && <p>Loading, please wait.</p>}
        {error && <p className="error">{error}</p>}
        {successMessage && (
          <div className="success">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default PostComment;
