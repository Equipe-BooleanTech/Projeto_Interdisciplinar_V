import { api } from './API';

export const getCostsData = async (vehicleId: string, startDate: Date, endDate: Date) => {
    console.log(vehicleId);
    console.log('startDate', startDate.toISOString());
    console.log('endDate', endDate.toISOString());
    const response = await api.get(`/vehicle/expenses/${vehicleId}`, {
        params: {
            startDate,
            endDate,
        },
    });
    console.log('getCostsData', response.data);
    console.log('request params', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    });
    return response.data;
};
export const getExpensesByFuelType = async (vehicleId: string) => {
    const response = await api.get(`/vehicle/expenses/${vehicleId}/by-fuel-type`);
    return response.data;
};

export const getExpensesByReminderType = async (vehicleId: string) => {
    const response = await api.get(`/vehicle/expenses/${vehicleId}/by-reminder-type`);
    return response.data;
};