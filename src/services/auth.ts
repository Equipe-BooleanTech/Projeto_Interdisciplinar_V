import { isLoggedIn, setAuthTokens, clearAuthTokens, getAccessToken, getRefreshToken } from 'axios-jwt'
import { api } from './API'
import { LoginBody } from './interfaces'

export const login = async (params: LoginBody) => {
    const response = await api.post('/auth/login', params)

    setAuthTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
    })
}

export const logout = async () => await clearAuthTokens()

if (await isLoggedIn()) {
    // assume we are logged in because we have a refresh token
}

// Get access to tokens
export const accessToken = await getAccessToken()
export const refreshToken = await getRefreshToken()