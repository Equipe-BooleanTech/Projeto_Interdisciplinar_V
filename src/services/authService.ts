import AsyncStorage from '@react-native-async-storage/async-storage';
import { post } from './common';
export const login = async (email: string, password: string) => {
  try {
    const response = await post<{ email: string; password: string }, { token: string }>(
      '/api/users/login',
      { email, password }
    );

    const token = response.token;
    if (token) {
      await AsyncStorage.setItem('jwt_token', token);
    }

    return response;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// 🚪 Logout ➝ Remove o token
export const logout = async () => {
  await AsyncStorage.removeItem('jwt_token');
};
