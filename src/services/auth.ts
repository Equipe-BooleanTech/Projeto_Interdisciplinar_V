import { LoginBody, RegisterBody } from './interfaces';
import { api } from './API';
import { useStorage } from '../hooks';

export const login = async (params: LoginBody) => {
  const { setItem } = useStorage();
  const response = await api.post('/users/login', params);

  const token = response.data.token;

  if (token) {
    setItem('token', token); 
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return response.data;
};

export const register = async (params: RegisterBody) => {
  const response = await api.post('/users/create-user', params);
  return response.data;
};

export const logout = async () => {
  const { removeItem } = useStorage();
  await removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  return true;
};