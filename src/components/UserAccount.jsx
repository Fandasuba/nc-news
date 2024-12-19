import { useState, useEffect } from "react";
import { getUsers } from "../api";
import LoggedInUser from "./LoggedInUser";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const testUsername = "grumpy19";

  useEffect(() => {
    getUsers().then(({ users }) => {
      console.log("Fetched Users:", typeof users);
      const userFound = users.find((user) => user.username === testUsername);
      if (userFound) {
        setUser(userFound);
      } else {
        console.error("User not found.");
      }
    });
  }, []);

  return <LoggedInUser user={user} />;
};
export default UserAccount;
