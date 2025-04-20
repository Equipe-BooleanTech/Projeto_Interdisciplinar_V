import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginBody } from './interfaces';
import { api } from './API';

export const login = async (params: LoginBody) => {
  const response = await api.post('/api/users/login', params);
  const token = response.data.token;

  if (token) {
    await AsyncStorage.setItem('jwt_token', token); // Salva o token localmente
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Define o token no Axios
  }

  return response.data;
};

// 📝 Registrar usuário ➝ (Caso o backend já retorne um token no cadastro, salve como no login)
export const register = async (params: {
  name: string;
  lastname: string;
  email: string;
  username: string;
  birthdate: string;
  phone: string;
  password: string;
}) => {
  const response = await api.post('/users/create-user', params);
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('jwt_token'); // Remove o token salvo
  delete api.defaults.headers.common['Authorization']; // Remove do Axios
  return true;
};

export const loadToken = async () => {
  const token = await AsyncStorage.getItem('jwt_token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};
