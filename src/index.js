// index.js
import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import { UserProvider } from "./context/UserContext";  // Import the UserProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>  {/* Wrap your app with the UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
