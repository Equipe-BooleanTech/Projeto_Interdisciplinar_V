import { api } from "./API"

export const listReminders = async (vehicleId: string, userId: string) => {
    const response = await api.get(`/vehicle/${vehicleId}/reminders/list-all-reminders/${userId}`);
    return response.data;
}

export const getReminder = async (vehicleId: string, reminderId: string) => {
    const response = await api.get(`/vehicle/${vehicleId}/reminders/find-by-id-reminder/${reminderId}`);
    return response.data;
}

export const createReminder = async (vehicleId: string, userId: string, reminderData: any) => {
    const response = await api.post(`/vehicle/${vehicleId}/reminders/create-reminder/${userId}`, reminderData);
    return response.data;
}

export const updateReminder = async (vehicleId: string, reminderId: string, reminderData: any) => {
    const response = await api.put(`/vehicle/${vehicleId}/reminders/update-reminder/${reminderId}`, reminderData);
    return response.data;
}

export const deleteReminder = async (vehicleId: string, reminderId: string) => {
    const response = await api.delete(`/vehicle/${vehicleId}/reminders/delete-reminder/${reminderId}`);
    return response.data;
}

export const getRemindersByDateRange = async (
  vehicleId: string, 
  startDate: string, 
  endDate: string,
  page: number = 0,
  size: number = 10
) => {
    const response = await api.get(`/vehicle/${vehicleId}/reminders/list-reminder-by-period`, {
        params: { 
            start: startDate, 
            end: endDate,
            page,
            size
        }
    });
    return response.data;
}

export const checkPendingReminders = async (vehicleId: string) => {
    const response = await api.get(`/vehicle/${vehicleId}/reminders/check-pending`);
    return response.data;
}

export const getAllReminders = async (vehicleId: string, userId: string) => {
    const response = await api.get(`/vehicle/${vehicleId}/reminders/list-all-reminders/${userId}`,
        {
            params: {
                page: 0,
                size: 1000
            }
        }
    );
    return response.data;
}