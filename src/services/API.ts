import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Create non-hook token utility functions
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

// Add refresh token utility functions
export const getRefreshToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem('refreshToken');
  }
  return await SecureStore.getItemAsync('refreshToken');
};

export const setRefreshToken = async (refreshToken: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('refreshToken', refreshToken);
  } else {
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  }
};

export const removeRefreshToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('refreshToken');
  } else {
    await SecureStore.deleteItemAsync('refreshToken');
  }
};

const BASE_URL = 'http://localhost:8080/api';
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Flag to prevent multiple refresh calls
let isRefreshing = false;
// Store for waiting requests
let failedQueue = [];

// Process the queue of failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

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

// Response interceptor for refresh token logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is not 401 or request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    
    // Mark this request as retried to prevent infinite loops
    originalRequest._retry = true;
    
    // If token refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }
    
    isRefreshing = true;
    
    try {
      // Get the refresh token
      const refreshToken = await getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      // Call your refresh token endpoint
      const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
        refreshToken
      });
      
      // Store the new tokens
      const { accessToken, newRefreshToken } = response.data;
      await setToken(accessToken);
      await setRefreshToken(newRefreshToken);
      
      // Update authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      
      // Process waiting requests
      processQueue(null, accessToken);
      
      // Retry the original request
      return api(originalRequest);
    } catch (err) {
      // Handle refresh token failure
      await removeToken();
      await removeRefreshToken();
      processQueue(err, null);
      
      // Redirect to login or handle authentication error
      // You might want to trigger a navigation or state change here
      
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default { api, getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken };