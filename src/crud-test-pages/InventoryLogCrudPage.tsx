import React, { useEffect, useState } from 'react';

import { InventoryAction, InventoryLogDTO } from '../types/inventory-log/InventoryLogDTO';
import { axiosPublicClient } from '../service/auth';


export function InventoryLogCrudPage()
{
    /* The 'backendAvailable' variable keeps track if the back-end is online (available) or not.
    ** If the back-end is not available, then this page fails gracefully, instead of trowing
    ** JavaScript errors in the browser console. */
    const [backendAvailable, setBackendAvailable] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [logs, setInventoryItems] = useState<InventoryLogDTO[]>([]);
    const [newLog, setNewLog] = useState<Omit<InventoryLogDTO, 'id'>>({
        action: InventoryAction.CREATE,
        quantityChange: 0,
        note: "",
    });

    const fetchItems = async () => {
        try{
            const response = await axiosPublicClient.get<InventoryLogDTO[]>("/inventorylogs");
            setInventoryItems(response.data);
            setErrorMessage(null);
            setBackendAvailable(true);
        }
        catch (err) {
            setErrorMessage("Failed to fetch items from the server.");
            setBackendAvailable(false);
        }
    };

    const createItem = async () => {
        try {
            await axiosPublicClient.post("/inventorylogs", newLog);
            setNewLog({ action: InventoryAction.CREATE, quantityChange: 0, note: "" });
            fetchItems();
        }
        catch (err) {
            setErrorMessage("Failed to create item.");
            setBackendAvailable(false);
        }
    };

    const deleteLog = async (id: number) => {
        try {
            await axiosPublicClient.delete(`/inventorylogs/${id}`);
            fetchItems();
        }
        catch (err) {
            setErrorMessage("Failed to delete item.");
            setBackendAvailable(false);
        }
    };

    const updateLog = async (item: InventoryLogDTO) => {
        try {
            await axiosPublicClient.put(`/inventorylogs/${item.id}`, item);
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

    const handleChange = (field: keyof Omit<InventoryLogDTO, 'id'>, value: any) => {
        setNewLog(prev => ({ ...prev, [field]: value }));
    };

        return (
        <div>
            <h1>Inventory Log Management</h1>

            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

            <div style={{ marginBottom: "1rem" }}>
                <h2>Create New Log</h2>
                <input
                    type="number"
                    placeholder="Quantity Change"
                    value={newLog.quantityChange}
                    onChange={(e) => setNewLog({ ...newLog, quantityChange: Number(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Note"
                    value={newLog.note}
                    onChange={(e) => setNewLog({ ...newLog, note: e.target.value })}
                />
                <button onClick={createItem}>Create Log</button>
            </div>

            <h2>Existing Logs</h2>
            <ul>
                {logs.map((log) => (
                    <li key={log.id} style={{ marginBottom: "1rem" }}>
                        <strong>ID:</strong> {log.id} <br />
                        <strong>Action:</strong> {log.action} <br />
                        <strong>Quantity Change:</strong> {log.quantityChange} <br />
                        <strong>Note:</strong> {log.note} <br />
                        <button onClick={() => updateLog(log)}>Update</button>{" "}
                        <button onClick={() => deleteLog(log.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}