export interface MaintainanceDTO {
    id: string;
    vehicleId: string;
    date: string;
    odometer: number;
    type: string;
    description: string;
    cost: number;
    workshopName: string;
    nextDueDate?: string;
    nextDueOdometer?: number;
}

export interface MaintainanceSummaryDTO {
    maintainances: MaintainanceDTO[];
    totalCost: number;
    totalCount: number;
    nextDueMaintainance?: MaintainanceDTO;
}

export interface MaintainanceProps {
    maintainanceRecords: MaintainanceDTO[];
    onAddMaintainance: (vehicleId: string) => void;
    isLoading?: boolean;
}