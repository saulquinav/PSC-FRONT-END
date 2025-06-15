import React, { useEffect, useState } from "react";

import { getBackendBaseApiUrl } from "../service/api-url";
import { UserReadingDTO } from "../types/user/UserReadingDTO";
import { UserRegisterDTO } from "../types/user/UserRegisterDTO";
import { axiosPublicClient } from "../service/auth";


export function UserCrudPage() {
  /* This internal "variable" keeps track if the back-end is online (available) or not.
  ** If the back-end is not available, then this page fails gracefully, instead of trowing
  ** JavaScript errors in the browser console. */
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [users, setUsers] = useState<UserReadingDTO[]>([]);
  const [newUser, setNewUser] = useState<UserRegisterDTO>({ username: '', password: '' });
  const [editUsers, setEditUsers] = useState<Record<number, { username: string; password: string }>>({});

  // Sort Users Before Displaying
  const fetchUsers = async () => {
    try {
      const response = await axiosPublicClient.get<UserReadingDTO[]>("/users");
      const sortedUsers = response.data.sort((a, b) => a.id - b.id); // sort by ID ascending
      setUsers(sortedUsers);
      const edits: Record<number, { username: string; password: string }> = {};
      sortedUsers.forEach(user => {
        edits[user.id] = { username: user.username, password: user.password };
      });
      setEditUsers(edits);
      setErrorMessage('');
      setBackendAvailable(true);
    }
    catch (err) {
      setErrorMessage('Failed to fetch users. Backend might be unavailable.');
      setBackendAvailable(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    try {
      // post() seems to work with or without '{ withCredentials: true }'
      await axiosPublicClient.post("/auth/register", newUser);
      setNewUser({ username: '', password: '' });
      fetchUsers();
    }
    catch (err) {
      setErrorMessage('Failed to create user.');
      setBackendAvailable(false);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const updatedUser = { id, ...editUsers[id] };
      await axiosPublicClient.put(`/users/${id}`, updatedUser);
      fetchUsers();
    }
    catch (err) {
      setErrorMessage('Failed to update user.');
      setBackendAvailable(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosPublicClient.delete(`/users/${id}`);
      fetchUsers();
    }
    catch (err) {
      setErrorMessage('Failed to delete user.');
      setBackendAvailable(false);
    }
  };

  const handleEditChange = (id: number, field: 'username' | 'password', value: string) => {
    setEditUsers(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  return (
    <div>
      <h1>User CRUD</h1>

      {(!backendAvailable || errorMessage) && <div>{errorMessage}</div>}

      <div>
        <input
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={handleCreate}>Create User</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>Username: {user.username}</div>
            <div>Password: {user.password}</div>
            <input
              value={editUsers[user.id]?.username || ''}
              onChange={(e) => handleEditChange(user.id, 'username', e.target.value)}
            />
            <input
              value={editUsers[user.id]?.password || ''}
              onChange={(e) => handleEditChange(user.id, 'password', e.target.value)}
            />
            <button onClick={() => handleUpdate(user.id)}>Save</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}