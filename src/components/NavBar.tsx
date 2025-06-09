import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav>
            <Link to="/">Login</Link> |{' '}
            <Link to="/register">Register</Link> |{' '}
            <Link to="/dashboard">Dashboard</Link>|{' '}
            <Link to="/upload">Upload</Link>|{' '}
            <Link to="/download">Download</Link>|{' '}
            <Link to="/user-crud">User CRUD</Link>|{' '}
            <Link to="/doc-metadata-crud">Doc Metadata CRUD</Link>|{' '}
            <Link to="/doc-data-crud">Doc Data CRUD</Link>|{' '}
        </nav>
    );
}