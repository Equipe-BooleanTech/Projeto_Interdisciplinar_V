export type VehicleManufacturer = {
    codigo: string;
    nome: string;
};

export type VehicleModel = VehicleManufacturer;

export type VehicleYear = VehicleManufacturer;

export type Vehicle = {
    TipoVeiculo: number;
    Valor: string;
    Marca: string;
    Modelo: string;
    AnoModelo: number;
    CodigoFipe: string;
    MesReferencia: string;
    SiglaCombustivel: string;
};