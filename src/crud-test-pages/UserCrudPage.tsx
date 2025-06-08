import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBackendBaseAPI } from "../service/api";
import { UserReadingDTO } from "../types/user/UserReadingDTO";
import { UserRegisterDTO } from "../types/user/UserRegisterDTO";

const API_URL = getBackendBaseAPI() + "/users";

export function UserCrudPage() {
  const [users, setUsers] = useState<UserReadingDTO[]>([]);
  const [newUser, setNewUser] = useState<UserRegisterDTO>({ username: "", password: "" });
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get<UserReadingDTO[]>(API_URL);
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
      await axios.post(API_URL, newUser, { withCredentials: true });
      setNewUser({ username: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to create user:", error);
      setBackendAvailable(false);
    }
  };

  // Delete user
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      setBackendAvailable(false);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {!backendAvailable && (
        <div>Backend not available. Showing limited data.</div>
      )}

      <div>
        <h2>Create User</h2>
        <input
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={createUser}>Create</button>
      </div>

      <div>
        <h2>User List</h2>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <span>{user.username || "N/A"}</span>
                <div>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
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