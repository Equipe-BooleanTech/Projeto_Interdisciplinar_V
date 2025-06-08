import { api } from './API';

export const createFuelRefill = async (fuelRefillData: any, vehicleId: string, stationId: string) => {
    console.log('Creating fuel refill with data:', fuelRefillData, 'for vehicle:', vehicleId, 'at station:', stationId);
    const response = await api.post(`/vehicle/fuel-refill/new-fuel-refill/${vehicleId}/${stationId}`, fuelRefillData);
    return response.data;
};

export const updateFuelRefill = async (fuelRefillId: string, vehicleId: string, fuelRefillData: any) => {
    const response = await api.put(`/vehicle/fuel-refill/update-fuel-refill/${fuelRefillId}/${vehicleId}`, fuelRefillData);
    return response.data;
};

export const deleteFuelRefill = async (id: string, vehicleId: string) => {
    const response = await api.delete(`/vehicle/fuel-refill/delete-refill/${id}/${vehicleId}`);
    return response.data;
};

export const listFuelRefills = async (vehicleId: string) => {
    const response = await api.get(`/vehicle/fuel-refill/list-all-fuel-refill/${vehicleId}`);
    return response.data;
};

export const findFuelRefillById = async (id: string) => {
    const response = await api.get(`/vehicle/fuel-refill/find-by-id-fuel-refill/${id}`);
    return response.data;
};

export const listFuelRefillByPeriod = async (vehicleId: string, startDate?: string, endDate?: string) => {
    const response = await api.get(`/vehicle/fuel-refill/list-fuel-refill-by-period/${vehicleId}`, {
        params: { startDate, endDate }
    });
    return response.data;
};

export const listByVehicleAndDate = async (vehicleId: string, startDate?: string, endDate?: string) => {
    const response = await api.get(`/vehicle/fuel-refill/list-fuel-refill-by-period/${vehicleId}`, {
        params: { startDate, endDate }
    });
    return response.data;
};

export const listByVehicleDateFuelType = async (vehicleId: string, startDate?: string, endDate?: string, fuelType?: string) => {
    const response = await api.get(`/vehicle/fuel-refill/list-fuel-refill-by-period/${vehicleId}`, {
        params: { startDate, endDate, fuelType }
    });
    return response.data;
};