import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from './API';

// 🚗 Criar veículo
export const createVehicle = async (vehicleData: any, userId: {
    plate: string;
    model: string;
    color: string;
    manufacturer: string;
    type: string;
    description: string;
    year: number;
    km: number;
    fuelType: string;
    fuelCapacity: number;
    fuelConsumption: number
}) => {
    const response = await api.post(`/api/vehicle/create-vehicle/${userId}`, vehicleData);
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

// 🔎 Buscar veículo por ID
export const findVehicleById = async (id: string) => {
    const response = await api.get(`/api/vehicle/findbyid-vehicle/${id}`);
    return response.data;
};
