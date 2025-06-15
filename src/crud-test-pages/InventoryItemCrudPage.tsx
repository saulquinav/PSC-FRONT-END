import React, { useEffect, useState } from 'react';
import { InventoryItemDTO, ItemType } from '../types/inventory-item/InventoryItemDTO';
import { axiosAuthClient, axiosPublicClient } from '../service/auth';


export function InventoryItemCrudPage()
{
  /* The 'backendAvailable' variable keeps track if the back-end is online (available) or not.
  ** If the back-end is not available, then this page fails gracefully, instead of trowing
  ** JavaScript errors in the browser console. */
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [inventoryItems, setInventoryItems] = useState<InventoryItemDTO[]>([]);
  const [newItem, setNewItem] = useState<Omit<InventoryItemDTO, 'id'>>({
        name: "",
        itemType: ItemType.OTHER,
        brand: "",
        model: "",
        quantity: 0
    });

    const fetchItems = async () => {
        try{
            // const response = await axiosPublicClient.get<InventoryItemDTO[]>("/inventoryitems");
            const response = await axiosAuthClient.get<InventoryItemDTO[]>("/inventoryitems");
            setInventoryItems(response.data);
            setErrorMessage(null);
            setBackendAvailable(true);
        }
        catch (err) {
            setErrorMessage("Failed to fetch items from the server.");
            setBackendAvailable(false);
        }
    };

    const handleCreate = async () => {
        try {
            // await axiosPublicClient.post("/inventoryitems", newItem);
            await axiosAuthClient.post("/inventoryitems", newItem);
            setNewItem({ name: "", itemType: ItemType.OTHER, brand: "", model: "", quantity: 0 });
            fetchItems();
        }
        catch (err) {
            setErrorMessage("Failed to create item.");
            setBackendAvailable(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            // await axiosPublicClient.delete(`/inventoryitems/${id}`);
            await axiosAuthClient.delete(`/inventoryitems/${id}`);
            fetchItems();
        }
        catch (err) {
            setErrorMessage("Failed to delete item.");
            setBackendAvailable(false);
        }
    };

    const handleUpdate = async (item: InventoryItemDTO) => {
        try {
            // await axiosPublicClient.put(`/inventoryitems/${item.id}`, item);
            await axiosAuthClient.put(`/inventoryitems/${item.id}`, item);
            fetchItems();
        }
        catch (err) {
            setErrorMessage("Failed to update item.");
            setBackendAvailable(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleChange = (field: keyof Omit<InventoryItemDTO, 'id'>, value: any) => {
        setNewItem(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div>
            <h1>Inventory Items</h1>

            {errorMessage && <div>{errorMessage}</div>}

            <div>
                <h2>Create New Item</h2>
                <input type="text" placeholder="Name" value={newItem.name} onChange={e => handleChange('name', e.target.value)} />
                <select value={newItem.itemType} onChange={e => handleChange('itemType', e.target.value as ItemType)} >
                    {Object.values(ItemType).map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <input type="text" placeholder="Brand" value={newItem.brand} onChange={e => handleChange('brand', e.target.value)} />
                <input type="text" placeholder="Model" value={newItem.model} onChange={e => handleChange('model', e.target.value)} />
                <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={e => handleChange('quantity', parseInt(e.target.value))} />
                <button onClick={handleCreate} >Create Item</button>
            </div>

            <ul>
                {inventoryItems.map(item => (
                    <li key={item.id}>
                        <div>ID: {item.id}</div>
                        <div>Name: {item.name}</div>
                        <div>Type: {item.itemType}</div>
                        <div>Brand: {item.brand}</div>
                        <div>Model: {item.model}</div>
                        <div>Quantity: {item.quantity}</div>

                        <button onClick={() => handleDelete(item.id)}>Delete</button>

                        <button
                            onClick={() => {
                                const updatedItem = { ...item, quantity: item.quantity + 1 }; // Sample update logic
                                handleUpdate(updatedItem);
                            }}
                        >Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}