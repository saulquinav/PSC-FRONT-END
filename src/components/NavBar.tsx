import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// export function NavBar({ token, setToken }: { token: string | null; setToken: (t: string | null) => void })
export function NavBar() {
    const navigate = useNavigate();

    /* Here we do not use 'useState' but we use 'useContext' instead.
    ** 'useContext' is a React function that allows a component to automatically
    ** inherit a "prop" from a custom React <Context.Provider> (in this case <AuthContext.Provider>).
    ** This component will inherit those "props" directly from a <Context.Provider> whithout "prop-drilling". */
    const { token, setToken } = React.useContext(AuthContext);

    const handleLogout = () => {
        /* We "remove" the token in two places:
        ** - in the React Context
        ** - in the browser's 'localStorage' */
        setToken(null); // remove from React Context
        localStorage.removeItem('jwt-auth-token'); // also remove from 'localStorage'

        navigate('/login'); // send the user to the login page
    };

    return (
        <nav>
            <Link to="/">Login</Link> |{' '}
            <Link to="/register">Register</Link> |{' '}
            <Link to="/dashboard">Dashboard</Link>|{' '}
            <Link to="/user-crud">User CRUD</Link>|{' '}
            <Link to="/inventory-item-crud">Inventory Item CRUD</Link>|{' '}
            <Link to="/inventory-log-crud">Inventory Log CRUD</Link>|{' '}
            {token && (
                <div>
                    <button onClick={handleLogout}>Logout</button>|{' '}
                </div>
            )}
        </nav>
    );
}