import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Inventory Dashboard</h1>
        <p className="welcome-message">Monitor and manage PC components efficiently</p>
      </div>

      <div className="dashboard-content-grid">
        {/* Action Cards */}
        <div className="dashboard-card" onClick={() => navigate("/components")}>
          <div className="card-icon">📋</div>
          <h2>View Inventory</h2>
          <p>Browse, filter, and manage components</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/add-component")}>
          <div className="card-icon">➕</div>
          <h2>Add New Component</h2>
          <p>Register new hardware in your inventory</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/edit-component")}>
          <div className="card-icon">✏️</div>
          <h2>Edit Component</h2>
          <p>Modify existing component details</p>
        </div>

        {/* Stat Cards */}
        <div className="dashboard-card total">
          <div className="card-icon">📦</div>
          <h2>Total Components</h2>
          <p>1,254</p>
        </div>

        <div className="dashboard-card low-stock">
          <div className="card-icon">⚠️</div>
          <h2>Low Stock</h2>
          <p>8 Items</p>
        </div>

        <div className="dashboard-card out-of-stock">
          <div className="card-icon">❌</div>
          <h2>Out of Stock</h2>
          <p>3 Items</p>
        </div>
      </div>
    </div>
  );
}
