import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Token utility functions
export const getToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem('token');
  }
  return await SecureStore.getItemAsync('token');
};

export const setToken = async (token: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('token', token);
  } else {
    await SecureStore.setItemAsync('token', token);
  }
};

export const removeToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('token');
  } else {
    await SecureStore.deleteItemAsync('token');
  }
};

let BASE_URL = 'https://blue-bobcats-poke.loca.lt/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
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

// Response interceptor to handle authentication issues
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if error has a response and status code is in the 401-403 range (auth issues)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      
      await removeToken();
      
}
    
    // Always reject the promise to handle the error at the call site
    return Promise.reject(error);
  }
);

export default { api, getToken, setToken, removeToken };