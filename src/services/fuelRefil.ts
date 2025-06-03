import { api } from './API';

export const createFuelRefill = async (fuelRefillData: any, vehicleId: string, stationId: string) => {
    const response = await api.post(`/vehicle/fuel-refill/new-fuel-refill/${vehicleId}/${stationId}`, fuelRefillData);
    return response.data;
}

export const listFuelRefills = async (vehicleId: string, page = 0, size = 10) => {
    const response = await api.get(`/vehicle/fuel-refill/list-all-fuel-refill`);
    return response.data;
}

export const findFuelRefillById = async (id: string) => {
    const response = await api.get(`/vehicle/fuel-refill/find-by-id-fuel-refill/${id}`);
    return response.data;
};

export const listByVehicleAndDate = async () => {
    const response = await api.get(`/vehicle/fuel-refill/by-vehicle-and-date`);
    return response.data;
};

export const updateFuelRefill = async (id: string, vehicleId: string, fuelRefillData: any) => {
    const response = await api.put(`/vehicle/fuel-refill/update-fuel-refill/${id}/${vehicleId}`, fuelRefillData);
    return response.data;
};

export const deleteFuelRefill = async (id: string) => {
    const response = await api.delete(`/vehicle/fuel-refill/delete-fuel-refill/${id}`);
    return response.data;
}