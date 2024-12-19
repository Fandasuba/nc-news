import React, { createContext, useState, useContext, useEffect } from "react";
import { getUsers } from "./src/api";

export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const testUsername = "grumpy19";

  useEffect(() => {
    getUsers().then(({ users }) => {
      const userFound = users.find((user) => user.username === testUsername);
      if (userFound) {
        setUser(userFound);
      } else {
        console.error("User not found.");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
