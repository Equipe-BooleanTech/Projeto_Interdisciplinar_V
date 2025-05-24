import { LoginBody, RegisterBody } from './interfaces';
import { api, setToken as storeToken, removeToken as clearToken } from './API';
import { useStorage } from '../hooks';

export const login = async (params: LoginBody) => {
  const { setItem } = useStorage();
  const response = await api.post('/users/login', params);
  const token = response.data.token;
  const userId = response.data.id;

  if (token) {
    await storeToken(token);
    await setItem('userId', userId);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return response.data;
};

export const register = async (params: RegisterBody) => {
  const response = await api.post('/users/create-user', params);
  return response.data;
};

export const logout = async () => {
  await clearToken();
  delete api.defaults.headers.common['Authorization'];
  return true;
};
