import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  return await AsyncStorage.getItem("jwt_token"); // Token salvo no login
};
