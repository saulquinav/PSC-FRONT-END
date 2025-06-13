import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getBackendBaseApiUrl } from "../service/api-url";
import { InventoryItemDTO } from "../types/inventory-item/InventoryItemDTO";

import "./EditInventoryItemPage.css";

const API_URL = getBackendBaseApiUrl() + "/inventoryitems";

export function EditInventoryItemPage() {
  /* The 'backendAvailable' variable keeps track if the back-end is online (available) or not.
  ** If the back-end is not available, then this page fails gracefully, instead of trowing
  ** JavaScript errors in the browser console. */
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [inventoryItems, setInventoryItems] = useState<InventoryItemDTO[]>([]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    quantity: "",
  });

  const fetchItems = async () => {
    try{
        const response = await axios.get<InventoryItemDTO[]>(API_URL);
        setInventoryItems(response.data);
        setErrorMessage(null);
        setBackendAvailable(true);
    }
    catch (err) {
        setErrorMessage("Failed to fetch items from the server.");
        setBackendAvailable(false);
    }
  };

  const handleComponentSelect = (id: number) => {
    const selected = inventoryItems.find((c) => c.id === id);
    if (selected) {
      setSelectedId(id);
      setFormData({
        name: selected.name,
        brand: selected.brand,
        model: selected.model,
        quantity: String(selected.quantity),
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.model || formData.quantity === "") {
      alert("Please complete all fields.");
      return;
    }

    console.log("Updated component:", { id: selectedId, ...formData });
    alert("Component updated!");
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {/* Back Button placed outside the container */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← Back to Dashboard
      </button>

      {/* Main Container */}
      <div className="edit-component-container">
        <h1>Edit Component</h1>

        {/* First we check if the backend is unavailable or if an error occured
        ** and only then we display the list of inventory items */}
        {(!backendAvailable || errorMessage) && <div>{errorMessage}</div>}

        <div className="form-group">
          <label>Select Component</label>
          <select
            value={selectedId ?? ""}
            onChange={(e) => handleComponentSelect(Number(e.target.value))}
          >
            <option value="" disabled>Select a component</option>
            {inventoryItems.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <form className="component-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Component Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-button">Update Component</button>
          </form>
        )}
      </div>
    </div>
  );
}