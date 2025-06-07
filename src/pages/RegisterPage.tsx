import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";

interface UserDTO {
  username: string;
  password: string;
}

export function RegisterPage() {
  const [userData, setUserData] = useState<UserDTO>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!userData.username || !userData.password) {
      alert("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p className="welcome-message">Join us to start managing your files</p>
        </div>
        <input
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button 
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
        <p className="auth-footer">
          Already have an account? <a href="/">Sign in</a>
        </p>
      </div>
    </div>
  );
}