export interface CustomTrip {
    TripNumber: number;
    VehicleMasterId: number;
    // ClusterId: number;
    AgentId: number | null;
    WarehouseId: number;
    TripType: number;
    CustomerId: number;
    TripDate : string;
}
