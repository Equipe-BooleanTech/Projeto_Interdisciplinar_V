import { setItemAsync } from "expo-secure-store";
import { api, LoginBody, setRefreshToken, setToken } from "../services";

export const useAuth = () => {
    const login = async (params: LoginBody) => {
        const response = await api.post('/users/login', params);
        const token = response.data.token;
        const userId = response.data.id;

        if (token) {
            await setToken(token);
            await setRefreshToken(response.data.refreshToken);
            await setItemAsync('userId', userId);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return response.data;
    };
    const logout = async () => {
        await api.post('/users/logout');
        delete api.defaults.headers.common['Authorization'];
        return true;
    };

    const register = async (params: any) => {
        const response = await api.post('/users/create-user', params);
        return response.data;
    };

    const resetPassword = async (email: string) => {
        const response = await api.post('/users/reset-password', { email });
        return response.data;
    };

    const changePassword = async (params: any) => {
        const response = await api.post('/users/change-password', params);
        return response.data;
    };

    const getUser = async (userId: string) => {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    };

    return {
        login,
        logout,
        register,
        resetPassword,
        changePassword,
        getUser,
    };

}