import { useState, useEffect } from "react";
import { postNewComment } from "../api";
import { useUser } from "../../UserContext";

const PostComment = ({ article_id, setRefreshComments }) => {
  const { user } = useUser();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setLoading(false);
      return;
    }

    postNewComment(username, body, article_id)
      .then(() => {
        setLoading(false);
        setSuccessMessage(
          "Post Successful - The comments list will now refresh!"
        );
        setRefreshComments(true);
      })
      .catch((err) => {
        setLoading(false);
        setError("Provide valid comment body.");
      });
  };

  return (
    <form className="post-comment-to-article">
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
