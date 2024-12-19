import React from "react";

const LoggedInUser = ({ user }) => {
  if (!user) {
    return <p>No user details available.</p>;
  }

  const { username, name, avatar_url } = user;

  return (
    <div className="user-card">
      <img
        className="logged-in-avatar"
        src={avatar_url}
        alt={`${username}'s avatar`}
      />
      <div className="logged-in-user-text">
        <strong>{username}</strong>
      </div>
    </div>
  );
};

export default LoggedInUser;
