export interface VehicleDboyDriverDDs {
    Vehicles: VehicleDropDownList[];
    Dboys: DboyDropDownList[];
    Drivers: DriverDropDownList[];
}

export interface VehicleDropDownList {
    VehicleId: number;
    VehicleName: string;
    TripTypeEnum:number;
    IsReplacementVehicleNo:boolean;
    ReplacementVehicleNo:string;
}

export interface DboyDropDownList {
    DboyId: number;
    DboyName: string;
}
export interface DriverDropDownList {
    DriverId: number;
    DriverName: string;
}