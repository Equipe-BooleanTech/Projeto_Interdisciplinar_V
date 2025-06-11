import { LoginBody, RegisterBody } from './interfaces';
import { api, removeToken } from './API';


export const login = async (params: LoginBody) => {
  const response = await api.post('/users/login', params);
  return response.data;
};

export const register = async (params: RegisterBody) => {
  const response = await api.post('/users/create-user', params);
  return response.data;
};

export const logout = async () => {
  await removeToken();
  delete api.defaults.headers.common['Authorization'];
  return true;
};

export const requestPasswordResetCode = async (email: string) => {
  const response = await api.post('/users/request-password-reset', { email });
  return response.data;
}

export const resetPassword = async (userId: string, code: string, newPassword: string) => {
  const response = await api.post('/users/reset-password', {
    userId,
    code,
    newPassword,
  });
  return response.data;
};