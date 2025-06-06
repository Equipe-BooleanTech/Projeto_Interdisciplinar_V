export enum FuelType {
    GASOLINE = 'GASOLINE',
    DIESEL = 'DIESEL',
    ETHANOL = 'ETHANOL',
    FLEX = 'FLEX'
}

export interface FuelRefillDTO {
    id: string;
    vehicleId: string;
    stationId: string;
    liters: number;
    pricePerLiter: number;
    totalCost: number;
    kmAtRefill: number;
    fuelType: FuelType;
    refillDate: string;
}

export interface FuelRefillSummaryDTO {
    refills: FuelRefillDTO[];
    totalLiters: number;
    totalCost: number;
}

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
    maintainance: MaintainanceDTO;
    onAddMaintainance: (vehicleId: string) => void;
    stationNames: Record<string, string>;
}