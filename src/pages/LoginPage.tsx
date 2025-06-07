import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";
import { UserLoginDTO } from "../types/UserLoginDTO";
import { LoginResponseDTO } from "../types/LoginResponseDTO";


export function LoginPage() {
  const [loginData, setLoginData] = useState<UserLoginDTO>({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginData.username || !loginData.password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token }: LoginResponseDTO = await response.json();
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", loginData.username);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome to your safe file storage service!</h2>
          <p className="welcome-message">Sign in to access your files</p>
        </div>
        <input
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleInputChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleInputChange}
        />
        <button onClick={handleLogin}>Sign In</button>
        <p className="auth-footer">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}