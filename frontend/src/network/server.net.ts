import axios from "axios";
import { getAuthToken } from "../stores/auth.store";

export const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const axiosInstToSv = axios.create({ baseURL });

export const axiosAuthInstToSv = axios.create({ baseURL });

axiosAuthInstToSv.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});