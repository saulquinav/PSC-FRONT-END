import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/login">Login</Link> |{' '}
            <Link to="/register">Register</Link> |{' '}
            <Link to="/dashboard">Dashboard</Link>|{' '}
            <Link to="/user-crud">User CRUD</Link>|{' '}
            <Link to="/inventory-item-crud">Inventory Item CRUD</Link>|{' '}
            <Link to="/inventory-log-crud">Inventory Log CRUD</Link>|{' '}
      {token && (
        <>
          {' '}| <button onClick={handleLogout}>Logout</button>
        </>
      )}
        </nav>
    );
}