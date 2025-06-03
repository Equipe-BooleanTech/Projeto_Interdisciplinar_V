import { api } from './API';

export const createGasStation = async (gasStationData: any) => {
    const response = await api.post(`/gasstation/create-gas-station`,gasStationData);
    return response.data;
};

export const listGasStations = async (page = 0, size = 10) => {
    const response = await api.get(`/gasstation/listall-gas-station?page=${page}&size=${size}`);
    return response.data;
}

export const findGasStationById = async (id: string) => {
    const response = await api.get(`/gasstation/findbyid-gas-station/${id}`);
    return response.data;
};

export const updateGasStation = async (id: string, gasStationData: any) => {
    const response = await api.put(`/gasstation/update-gas-station/${id}`, gasStationData);
    return response.data;
};

export const deleteGasStation = async (id: string) => {
    const response = await api.delete(`/gasstation/delete-gas-station/${id}`);
    return response.data;
}
