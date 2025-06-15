import axios from "axios";

import { getBackendBaseApiUrl } from "./api-url";

/* Define the base URL of the axios instances. In this way, we only have to specify the extra paths
** when we are using axios instances. For example:
** axiosInstance.get('/products') will actually send a request at 'http://localhost:8080/products'. */
const API_URL = getBackendBaseApiUrl();

const token = localStorage.getItem('token');

export const axiosAuthClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

// Automatically attach token on each request
axiosAuthClient.interceptors.request.use((config) => {
  // First, get the authentication token from the browser's 'locaLStorage'
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const axiosPublicClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});