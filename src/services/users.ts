import { api } from './API';

export const createUser = async (userData: any, id: string) => {
  const response = await api.post(`/user/create-user/${id}`, {
    ...userData,
  });
  return response.data;
};

export const updateUser = async (id: string, userData: any) => {
  console.log('Updating user with ID:', id, 'and data:', userData);
  const response = await api.put(`/users/update/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/delete-user/${id}`);
  return response.data;
};

export const listUsers = async (page = 0, size = 10) => {
  const response = await api.get(`/user/listall-users?page=${page}&size=${size}`);
  return response.data;
};
