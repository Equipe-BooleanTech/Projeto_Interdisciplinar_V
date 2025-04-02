import { api } from './API';
import { LoginBody, RegisterBody } from './interfaces';

export const login = async (params: LoginBody) => {
  const response = await api.post('/api/users/login', params);
  return response.data;
};

export const register = async (params: RegisterBody) => {
  const response = await api.post('/api/users/create-user', params);
  return response.data;
};

export const logout = async () => {
  delete api.defaults.headers.common['Authorization'];
  return true;
};
