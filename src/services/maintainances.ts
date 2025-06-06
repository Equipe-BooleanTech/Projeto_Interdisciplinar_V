import { api } from "./API"

export const getMaintainances = async (vehicleId: string) => {
    const response = await api.get(`/vehicles/${vehicleId}/maintenances/list-all-maintenances`)
    return response.data;
}

export const getMaintainance = async (vehicleId: string, maintainanceId: string) => {
    const response = await api.get(`/vehicles/${vehicleId}/maintenances/find-by-id-maintenance/${maintainanceId}`)
    return response.data;
}

export const createMaintainance = async (vehicleId: string, maintainanceData: any) => {
    const response = await api.post(`/vehicles/${vehicleId}/maintenances/create-maitenance`, maintainanceData)
    return response.data;
}

export const updateMaintainance = async (vehicleId: string, maintainanceId: string, maintainanceData: any) => {
    const response = await api.put(`/vehicles/${vehicleId}/maintenances/update-maintenance/${maintainanceId}`, maintainanceData)
    return response.data;
}

export const deleteMaintainance = async (vehicleId: string, maintainanceId: string) => {
    const response = await api.delete(`/vehicles/${vehicleId}/maintenances/delete-maintenance/${maintainanceId}`)
    return response.data;
}