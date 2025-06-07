import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBackendBaseAPI } from "../service/api";
import { UserReadDTO } from "../types/user/UserReadDTO";
import { UserCreateDTO } from "../types/user/UserCreateDTO";
import { UserUpdateDTO } from "../types/user/UserUpdateDTO";
import { UserDeleteDTO } from "../types/user/UserDeleteDTO";

const API_URL = getBackendBaseAPI() + "/users";

export function UserCrudPage() {
  const [users, setUsers] = useState<UserReadDTO[]>([]);
  const [newUser, setNewUser] = useState<UserCreateDTO>({ username: "", password: "" });
  const [editingUser, setEditingUser] = useState<UserUpdateDTO | null>(null);
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get<UserReadDTO[]>(API_URL);
      setUsers(response.data);
      setBackendAvailable(true);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
      setBackendAvailable(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user
  const createUser = async () => {
    try {
      await axios.post(API_URL, newUser);
      setNewUser({ username: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to create user:", error);
      setBackendAvailable(false);
    }
  };

  // Update user
  const updateUser = async () => {
    if (!editingUser) return;
    try {
      await axios.put(`${API_URL}/${editingUser.id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
      setBackendAvailable(false);
    }
  };

  // Delete user
  const deleteUser = async (id: number) => {
    const deleteDTO: UserDeleteDTO = { id };
    try {
      await axios.delete(`${API_URL}/${id}`, { data: deleteDTO });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      setBackendAvailable(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {!backendAvailable && (
        <div className="bg-red-100 text-red-700 p-2 mb-4">Backend not available. Showing limited data.</div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create User</h2>
        <input
          className="border p-2 mr-2"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={createUser}>Create</button>
      </div>

      {editingUser && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Edit User</h2>
          <input
            className="border p-2 mr-2"
            placeholder="Username"
            value={editingUser.username}
            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
          />
          <input
            className="border p-2 mr-2"
            placeholder="Password"
            value={editingUser.password}
            onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
          />
          <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={updateUser}>Update</button>
          <button className="bg-gray-300 px-4 py-2" onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">User List</h2>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="flex justify-between items-center border-b py-2">
                <span>{user.username || "N/A"}</span>
                <div>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 mr-2"
                    onClick={() => setEditingUser({ id: user.id, username: user.username, password: "" })} // fill email on demand
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="py-2">{backendAvailable ? "No users available." : "N/A"}</li>
          )}
        </ul>
      </div>
    </div>
  );
};