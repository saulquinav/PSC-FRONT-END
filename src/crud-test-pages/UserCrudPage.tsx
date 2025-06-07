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

  // Fetch all users
  const fetchUsers = async () => {
    const response = await axios.get<UserReadDTO[]>(API_URL);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user
  const createUser = async () => {
    await axios.post(API_URL, newUser);
    setNewUser({ username: "", password: "" });
    fetchUsers();
  };

  // Update user
  const updateUser = async () => {
    if (!editingUser) return;
    await axios.put(`${API_URL}/${editingUser.id}`, editingUser);
    setEditingUser(null);
    fetchUsers();
  };

  // Delete user
  const deleteUser = async (id: number) => {
    const deleteDTO: UserDeleteDTO = { id };
    await axios.delete(`${API_URL}/${id}`, { data: deleteDTO });
    fetchUsers();
  };

  return (
    <div>
      <h1>User Management</h1>

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

      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <input
            placeholder="Username"
            value={editingUser.username}
            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
          />
          <input
            placeholder="Password"
            value={editingUser.password}
            onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
          />
          <button onClick={updateUser}>Update</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.username}</span>
              <div>
                <button
                  onClick={() => setEditingUser({ id: user.id, username: user.username, password: "" })} // fill email on demand
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};