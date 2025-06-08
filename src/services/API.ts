import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


let BASE_URL = 'http://172.31.240.1:8080/api'; 

export const getToken = async () => {
  if (Platform.OS === 'web') {
    return Promise.resolve(localStorage.getItem('token')); 
  }
  return AsyncStorage.getItem('token'); 
}

export const setToken = async (token) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('token', token);
    return Promise.resolve(); 
  }
  return AsyncStorage.setItem('token', token);
}

export const removeToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
  return AsyncStorage.removeItem('token');
}

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


api.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response && (error.response.status === 401)) {
      await removeToken();
    }


    return Promise.reject(error);
  }
);

export default { api, getToken, setToken, removeToken };