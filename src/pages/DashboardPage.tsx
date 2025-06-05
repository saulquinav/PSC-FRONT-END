import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>File Manager</h1>
        <p className="welcome-message">Manage your files securely</p>
      </div>
      
      <div className="action-buttons">
        <div 
          className="action-card upload-card"
          onClick={() => navigate("/upload")}  // Navigates to upload page
        >
          <div className="card-icon">📤</div>
          <h2>Store Files</h2>
          <p>Upload and securely store your files</p>
        </div>
        
        <div 
          className="action-card download-card"
          onClick={() => navigate("/download")}  // Navigates to download page
        >
          <div className="card-icon">📥</div>
          <h2>My Files</h2>
          <p>View and download your stored files</p>
        </div>
      </div>
    </div>
  );
}