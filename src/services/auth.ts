import { LoginBody, RegisterBody } from './interfaces';
import { api, setToken, removeToken, setRefreshToken } from './API';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Direct storage utility function (not a hook)
const storeUserId = async (userId: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('userId', userId);
  } else {
    await SecureStore.setItemAsync('userId', userId);
  }
};

export const login = async (params: LoginBody) => {
  const response = await api.post('/users/login', params);
  const token = response.data.token;
  const userId = response.data.id;

  if (token) {
    await setToken(token);
    await setRefreshToken(response.data.refreshToken);
    await storeUserId(userId);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

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
