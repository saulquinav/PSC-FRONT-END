import axios from "axios";

import { getBackendBaseApiUrl } from "./api-url";

const API_URL = getBackendBaseApiUrl() + "/auth";

const token = localStorage.getItem('token');

const axiosAuthClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

// Automatically attach token on each request
axiosAuthClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


const axiosPublicClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {axiosAuthClient, axiosPublicClient};