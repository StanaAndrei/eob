import axios from "axios";
import { getAuthToken } from "../stores/auth.store";

export const baseURL = 'http://localhost:3001/api';

export const axiosInstToSv = axios.create({ baseURL });

export const axiosAuthInstToSv = axios.create({
    baseURL, headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    }
})