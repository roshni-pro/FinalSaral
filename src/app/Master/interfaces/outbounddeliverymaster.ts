



export interface OutBoundMappingMaster{
    WarehouseId :number ;  
AgentId: number;
ClusterId: number;
Id: number;
// IsActive: boolean;
// IsDeleted: boolean;
OutBoundDeliveryDetails: OutBoundDeliveryDetails[]

   
}

export interface OutBoundDeliveryDetails{
    DboyMasterId: number
    DriverMasterId: number
    Id: number
    // IsActive: boolean
    IsDeleted: boolean;
    // OutBoundDeliveryMappingId: number
    VehicleMasterId: number
}