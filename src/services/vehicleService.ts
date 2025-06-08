import { api } from '.';

export const createVehicle = async (vehicleData: any, userId: string) => {
  const response = await api.post(`/vehicle/create-vehicle/${userId}`, {
    ...vehicleData,
  });
  return response.data;
};

export const updateVehicle = async (id: string, vehicleData: any) => {
  const response = await api.put(`/vehicle/update-vehicle/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id: string) => {
  const response = await api.delete(`/vehicle/delete-vehicle/${id}`);
  return response.data;
};

export const listVehicles = async (userId: string) => {
  const response = await api.get(`/vehicle/listall-vehicle/${userId}`);
  return response.data;
};

export const findVehicleById = async (id: string) => {
  const response = await api.get(`/vehicle/findbyid-vehicle/${id}`);
  return response.data;
};

export const findVehicleByPlate = async (plate: string) => {
  const response = await api.get(`/vehicle/findbyplate/${plate}`);
  return response.data;
};