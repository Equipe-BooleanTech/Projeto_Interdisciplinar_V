import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://3dee-189-111-31-67.ngrok-free.app/api'; // URL do backend (obtida do ngrok)

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Obtém o token armazenado
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
  return await AsyncStorage.getItem('jwt_token'); // Token salvo no login
};
