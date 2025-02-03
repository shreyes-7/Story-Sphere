import { createContext, useState } from "react";

// Create User Context
export const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Username",
    profilePic: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg", // Default profile picture
    bio: "Hii I'm a passionate blog writer who loves sharing insights, stories, and ideas through engaging content. I enjoy exploring new topics, researching in-depth, and crafting articles that inform and inspire readers.I aim to create content that adds value and sparks curiosity. When I'm not writing, you'll likely find me reading, brainstorming new ideas, or enjoying a good cup of coffee.",
  });

  // Function to update user data
  const updateUser = (newData) => {
    setUser((prevUser) => ({ ...prevUser, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
