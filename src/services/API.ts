import axios from 'axios';
import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export const BASE_URL = 'http://localhost:8080/api'; // Loclx
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Storage instance (similar to useStorage implementation but outside React)
const storage = new MMKV({
  id: 'storage',
});

// Direct storage functions that don't use hooks
export const getToken = async () => {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem('token');
    } else {
      return storage.getString('token');
    }
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const setToken = async (token: string) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem('token', token);
    } else {
      storage.set('token', token);
    }
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = async () => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem('token');
    } else {
      storage.delete('token');
    }
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Setup interceptor with the non-hook version
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
