import { useNavigate } from "react-router-dom";
import "./ComponentListPage.css";

export function InventoryItemListPage() {
  const navigate = useNavigate();

  return (
    <div className="component-list-container">
      <div className="header">
        <h1>Component Inventory</h1>
        <p>Browse and manage all hardware components</p>
      </div>

      <div className="filters">
        <input type="text" placeholder="Search by name..." />
        <select>
          <option value="">All Categories</option>
          <option value="GPU">GPU</option>
          <option value="CPU">CPU</option>
          <option value="SSD">SSD</option>
        </select>
        <select>
          <option value="">All Brands</option>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
          <option value="NVIDIA">NVIDIA</option>
        </select>
        <select>
          <option value="">Stock Status</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <table className="component-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GeForce RTX 3080</td>
            <td>NVIDIA</td>
            <td>Founders Edition</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Ryzen 5 5600X</td>
            <td>AMD</td>
            <td>100-100000065BOX</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Samsung 980 Pro</td>
            <td>Samsung</td>
            <td>MZ-V8P1T0BW</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
