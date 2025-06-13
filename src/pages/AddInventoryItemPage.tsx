import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { getBackendBaseApiUrl } from "../service/api-url";
import { InventoryItemDTO, ItemType } from '../types/inventory-item/InventoryItemDTO';

import "./AddInventoryItemPage.css";


const API_URL = getBackendBaseApiUrl() + "/inventoryitems";

export function AddInventoryItemPage() {
  const navigate = useNavigate();

  /* The 'backendAvailable' variable keeps track if the back-end is online (available) or not.
  ** If the back-end is not available, then this page fails gracefully, instead of trowing
  ** JavaScript errors in the browser console. */
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [newItem, setNewItem] = useState<Omit<InventoryItemDTO, 'id'>>({
        name: "",
        itemType: ItemType.OTHER,
        brand: "",
        model: "",
        quantity: 0
    });

  const handleCreate = async () => {
    try {
        await axios.post(API_URL, newItem);
        setNewItem({ name: "", itemType: ItemType.OTHER, brand: "", model: "", quantity: 0 });
        // fetchItems();
    }
    catch (err) {
        setErrorMessage("Failed to create item.");
        setBackendAvailable(false);
    }
  };

  const handleChange = (field: keyof Omit<InventoryItemDTO, 'id'>, value: any) => {
      setNewItem(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="add-component-container">
      <h1>Add New Component</h1>
      <p className="subtitle">Fill in the details to register a new PC component</p>

      <form className="component-form">
        <label>
          Name:
          <input type="text" placeholder="e.g. GeForce RTX 3080" value={newItem.name} onChange={e => handleChange('name', e.target.value)} />
        </label>

        <select value={newItem.itemType} onChange={e => handleChange('itemType', e.target.value as ItemType)} >
          {Object.values(ItemType).map(type => <option key={type} value={type}>{type}</option>)}
        </select>

        <label>
          Brand:
          <input type="text" placeholder="Brand" value={newItem.brand} onChange={e => handleChange('brand', e.target.value)} />
        </label>

        <label>
          Model:
          <input type="text" placeholder="Model" value={newItem.model} onChange={e => handleChange('model', e.target.value)} />
        </label>

        <label>
          Quantity:
          <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={e => handleChange('quantity', parseInt(e.target.value))} />
        </label>

        <button type="submit" className="submit-button" onClick={handleCreate} >Add Component</button>
      </form>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
