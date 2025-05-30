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

export interface VehicleFuelingProps {
    fuelingRecords: FuelRefillSummaryDTO;
    onAddFueling: (vehicleId: string) => void;
    searchQuery: string;
    onSearch: (query: string) => void;
    isLoading?: boolean;
    stationNames: Record<string, string>; 
  }