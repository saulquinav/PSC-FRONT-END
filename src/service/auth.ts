import axios from "axios";

import { getBackendBaseApiUrl } from "./api-url";


export interface AuthContextType
{
    token: string | null;
    setToken: (token: string | null) => void;
}

const API_URL = getBackendBaseApiUrl();

const token = localStorage.getItem('jwt-auth-token');

/* In this file we have two 'axios' clients:
** - a client for back-end APIs that do not require an authenticated user (public client)
** - a client for back-end APIs that require an authenticated user (auth client) */

// Public APIs client
export const axiosPublicClient = axios.create({
  baseURL: API_URL,
  // withCredentials: true, // 🔸 Important for sending cookies/auth
  headers: {
    "Content-Type": "application/json"
    // 'Accept': 'application/json',   // Optional, but useful:
  },
});

// Protected APIs client
export const axiosAuthClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

// Automatically attach token on each request
axiosAuthClient.interceptors.request.use((config) => {
  // First, get the authentication token from the browser's 'locaLStorage'
  const token = localStorage.getItem('jwt-auth-token');

  if (token) {
    config.headers = config.headers || {};
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers['Authorization'] = `Bearer ${token}`; // might also work
  }
  return config;
});