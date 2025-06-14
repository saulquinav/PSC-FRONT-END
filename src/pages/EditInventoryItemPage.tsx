import React, { useEffect, useState } from 'react';

import { getBackendBaseApiUrl } from "../service/api-url";
import { InventoryItemDTO, ItemType } from "../types/inventory-item/InventoryItemDTO";

import "./EditInventoryItemPage.css";
import { axiosPublicClient } from '../service/client';

const API_URL = getBackendBaseApiUrl() + "/inventoryitems";

export function EditInventoryItemPage() {
  /* The 'backendAvailable' variable keeps track if the back-end is online (available) or not.
  ** If the back-end is not available, then this page fails gracefully, instead of trowing
  ** JavaScript errors in the browser console. */
  const [backendAvailable, setBackendAvailable] = useState(true);

  /* An error message that is displayed if back-end is unavailable or an error occured */
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [inventoryItems, setInventoryItems] = useState<InventoryItemDTO[]>([]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItemDTO>({
                                                                          id: 0,
                                                                          name: "",
                                                                          itemType: ItemType.OTHER,
                                                                          brand: "",
                                                                          model: "",
                                                                          quantity: 0
                                                                      });

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    quantity: "",
  });

  // Function for fetching all items, so we can select the item we want to edit
  const fetchItems = async () => {
    try{
        const response = await axiosPublicClient.get<InventoryItemDTO[]>(API_URL);
        setInventoryItems(response.data);
        setErrorMessage(null);
        setBackendAvailable(true);
    }
    catch (err) {
        setErrorMessage("Failed to fetch items from the server.");
        setBackendAvailable(false);
    }
  };

  // Function that selects an item from a list of all items
  const handleItemSelect = (id: number) => {
    const selected = inventoryItems.find((c) => c.id === id);

    if (selected) {
      setSelectedId(id);
      setSelectedItem(selected);
      
      setFormData({
        name: selected.name,
        brand: selected.brand,
        model: selected.model,
        quantity: String(selected.quantity),
      });
    }
  };

  // Function which handles the update/change of a single value/field of the InventoryItemDTO
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // This is the asynchronious function that saves the updated item to the back-end.
  // It has to be declared at the top-level because it's an asynchronious function.
  const handleUpdate = async (item: InventoryItemDTO) => {
    try {
        await axiosPublicClient.put(`${API_URL}/${item.id}`, item);
        fetchItems();
    }
    catch (err) {
        setErrorMessage("Failed to update item.");
        setBackendAvailable(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.model || formData.quantity === "") {
      alert("Please complete all fields.");
      return;
    }

    // Construct the updated item
    const updatedItem: InventoryItemDTO = {
        id: selectedId!,
        name: formData.name,
        itemType: selectedItem.itemType,
        brand: formData.brand,
        model: formData.model,
        quantity: parseInt(formData.quantity)
    };

    // Save the updated item to the back-end
    handleUpdate(updatedItem);
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
            onChange={(e) => handleItemSelect(Number(e.target.value))}
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
                onChange={handleValueChange}
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleValueChange}
              />
            </div>

            <div className="form-group">
              <label>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleValueChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleValueChange}
              />
            </div>

            <button type="submit" className="submit-button">Update Component</button>
          </form>
        )}
      </div>
    </div>
  );
}