import axios from 'axios';
import { useDevice, useStorage } from '../hooks';

export const BASE_URL = 'http://localhost:8080/api'; // URL do backend (obtida do ngrok)

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getToken = async () => {
  const { getItem } = useStorage();
  const response = await getItem('token');
  console.log('Token:', response);
  return response;
};


export const setToken = async (token: string) => {
  const { setItem } = useStorage();
  setItem('token', token);
};

export const removeToken = async () => {
  const { removeItem } = useStorage();
  await removeItem('token');
};