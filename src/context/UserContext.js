import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Create User Context
export const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from the backend
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);  // Ensure user is set to null when there's no token
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Fetch user when the component mounts
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Function to log in the user and update the state
  const loginUser = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser(); // Re-fetch user after login
  };

  // Function to log out the user
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null); // Immediately update UI
  };

  return (
    <UserContext.Provider value={{ user, loading, fetchUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
