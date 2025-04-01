import axios from 'axios';
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor } from 'axios-jwt';

export const BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajustar conforme o backend
  // headers: {"token": ""}
});

// Token utils
export const refreshToken: TokenRefreshRequest = async (
  refreshToken: string
): Promise<IAuthTokens | string> => {
  const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
    token: refreshToken,
  }); // Ajustar conforme o backend

  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  };
};

applyAuthTokenInterceptor(api, { requestRefresh: refreshToken });
