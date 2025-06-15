import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosPublicClient } from "../service/auth";
import { getBackendBaseApiUrl } from "../service/api-url";
import { UserRegisterDTO } from "../types/user/UserRegisterDTO";

import "./AuthPages.css";


const API_URL = getBackendBaseApiUrl() + "/auth/register";

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /* The 'backendAvailable' variable keeps track if the back-end is online (available) or not.
  ** If the back-end is not available, then this page fails gracefully, instead of trowing
  ** JavaScript errors in the browser console. */
  const [backendAvailable, setBackendAvailable] = useState(true);

  /* An error message that is displayed if back-end is unavailable or an error occured */
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (username && password) {
      try {
        const newUser: UserRegisterDTO = { username: username, password: password }

        // post() seems to work with or without '{ withCredentials: true }'
        // await axiosPublicClient.post(API_URL, newUser, { withCredentials: true });
        await axiosPublicClient.post(API_URL, newUser);
        
        alert("Account created successfully!");
        navigate("/login");
      }
      catch (err) {
        setErrorMessage('Failed to create user.');
        setBackendAvailable(false);
      }
    }
    else
      alert("Please enter both username and password");
  };


  return (
    <div className="auth-container">
      {(!backendAvailable || errorMessage) && <div>{errorMessage}</div>}

      <div className="auth-card">
        <div className="auth-header">
          <h2>Create New Account</h2>
          <p className="welcome-message">Join to manage PC components stock</p>
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
        <button onClick={handleRegister}>Register</button>
        <p className="auth-footer">
          Already have an account? <a href="/">Sign in</a>
        </p>
      </div>
    </div>
  );
}