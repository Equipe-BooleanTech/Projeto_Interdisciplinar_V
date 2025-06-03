import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


let BASE_URL = 'https://open-snakes-cough.loca.lt/api'; // Always change this to your actual API base URL

export const getToken = async () => {
  if (Platform.OS === 'web') {
    return Promise.resolve(localStorage.getItem('token')); // Make web return a Promise too
  }
  return AsyncStorage.getItem('token'); // For React Native, use AsyncStorage
}

export const setToken = async (token) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('token', token); // For web, use localStorage
    return Promise.resolve(); // localStorage is synchronous
  }
  return AsyncStorage.setItem('token', token); // For React Native, use AsyncStorage
}

export const removeToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('token'); // For web, use localStorage
    return Promise.resolve(); // Consistently return a Promise
  }
  return AsyncStorage.removeItem('token'); // For React Native, use AsyncStorage
}

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
    const token = await getToken(); // This will work correctly now
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