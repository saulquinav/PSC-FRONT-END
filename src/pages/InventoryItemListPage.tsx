import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBackendBaseApiUrl } from "../service/api-url";
import { InventoryItemDTO } from "../types/inventory-item/InventoryItemDTO";

import "./InventoryItemListPage.css";
import { axiosPublicClient } from "../service/client";

const API_URL = getBackendBaseApiUrl() + "/inventoryitems";

export function InventoryItemListPage() {
  const navigate = useNavigate();

  /* The 'backendAvailable' variable keeps track if the back-end is online (available) or not.
  ** If the back-end is not available, then this page fails gracefully, instead of trowing
  ** JavaScript errors in the browser console. */
  const [backendAvailable, setBackendAvailable] = useState(true);

  /* An error message that is displayed if back-end is unavailable or an error occured */
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [inventoryItems, setInventoryItems] = useState<InventoryItemDTO[]>([]);

  /* Fetch all inventory items from the back-end.
  ** We use 'axios' library for fetching items from the back-end. */
  const fetchItems = async () => {
    try {
      // Get items
      const response = await axiosPublicClient.get<InventoryItemDTO[]>("/inventoryitems");

      // Sort items before displaying
      const sortedItems = response.data.sort((a, b) => a.id - b.id); // sort by ID ascending
      setInventoryItems(sortedItems);

      setErrorMessage(null);
      setBackendAvailable(true);
    }
    catch (err) {
      setErrorMessage('Failed to fetch inventory items. Backend might be unavailable.');
      setBackendAvailable(false);
    }
  };

  // We use the 'useEffect()' React lifecycle hook in order to fetch all inventory
  // item from the back-end, when this component is started
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="component-list-container">
      <div className="header">
        <h1>Component Inventory</h1>
        <p>Browse and manage all hardware components</p>
      </div>

      {/* First we check if the backend is unavailable or if an error occured
       ** and only then we display the list of inventory items */}
      {(!backendAvailable || errorMessage) && <div>{errorMessage}</div>}

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
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.itemType}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
