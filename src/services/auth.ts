import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginBody, RegisterBody } from './interfaces';
import { api } from './API';

export const login = async (params: LoginBody) => {
  const response = await api.post('/users/login', params);
  const token = response.data.token;

  if (token) {
    await AsyncStorage.setItem('jwt_token', token); // Salva o token localmente
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Define o token no Axios
  }

  return response.data;
};

export const register = async (params: RegisterBody) => {
  const response = await api.post('/users/create-user', params);
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('jwt_token');
  delete api.defaults.headers.common['Authorization'];
  return true;
};

export const loadToken = async () => {
  const token = await AsyncStorage.getItem('jwt_token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};
