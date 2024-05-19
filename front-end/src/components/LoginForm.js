import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Your AuthContext for managing authentication state

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      // Make an API call to authenticate the user
      const response = await fetch("https://jobs-yong-zhong.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
      } else {
        // Handle non-successful response
        const errorMessage = await response.text();
        console.error(`Login failed: ${response.status} - ${errorMessage}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred during login:", error.message);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
