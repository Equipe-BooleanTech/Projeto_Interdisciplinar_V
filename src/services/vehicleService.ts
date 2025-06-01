import { api } from './API';

// 🚗 Criar veículo
export const createVehicle = async (vehicleData: any, id: string) => {
  const response = await api.post(`/vehicle/create-vehicle/${id}`, {
    ...vehicleData,
  });
  return response.data;
};

// 🛠 Atualizar veículo
export const updateVehicle = async (id: string, vehicleData: any) => {
  const response = await api.put(`/api/vehicle/update-vehicle/${id}`, vehicleData);
  return response.data;
};

// ❌ Deletar veículo
export const deleteVehicle = async (id: string) => {
  const response = await api.delete(`/api/vehicle/delete-vehicle/${id}`);
  return response.data;
};

// 📋 Listar todos os veículos (com paginação)
export const listVehicles = async (page = 0, size = 10) => {
  const response = await api.get(`/api/vehicle/listall-vehicle?page=${page}&size=${size}`);
  return response.data;
};

// 🔎 Buscar veículo por placa
export const findVehicleByPlate = async (plate: string) => {
  const response = await api.get(`/vehicle/findbyplate/${plate}`);
  return response.data;
}
