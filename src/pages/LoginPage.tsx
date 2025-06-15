import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosPublicClient } from "../service/client";
import { getBackendBaseApiUrl } from "../service/api-url";

import "./AuthPages.css";
import { UserLoginDTO } from "../types/user/UserLoginDTO";


// const API_URL = getBackendBaseApiUrl() + "/auth/login";

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      const loginDTO: UserLoginDTO = { username: username, password: password }

      const response = await axiosPublicClient.post("/auth/login", loginDTO);

      /* This is the important part: after a successful login, we obtain a 'token'
      ** from the back-end, and we store inside the browser's 'localStorage'. */
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome to your PC store inventory!</h2>
          <p className="welcome-message">Sign in to manage your stock</p>
        </div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Sign In</button>
        <p className="auth-footer">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}