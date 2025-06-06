export enum ReminderType {
    GENERAL = 'Geral',
    MAINTENANCE = 'Manutenção',
    TAX = 'Imposto / Seguro',
}

export enum ReminderStatus {
    PENDING = 'Pendente',
    COMPLETED = 'Completo',
    OVERDUE = 'Atrasado'
}

export interface ReminderDTO {
    id: string;
    vehicleId: string;
    userId: string;
    title: string;
    description?: string;
    type: ReminderType;
    dueDate: Date;
    antecedenceDays?: number;
    status: ReminderStatus;
    isRecurring: boolean;
}

export interface ReminderProps {
    reminderRecords: ReminderDTO[];
    onAddReminder: () => void;
    isLoading?: boolean;
}