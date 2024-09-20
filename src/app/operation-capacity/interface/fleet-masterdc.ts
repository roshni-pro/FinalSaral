export interface FleetMaster
{
    Id: number;
    FleetType : string;
    Channel : string;
    OperatedBy : string;
    TransportName : string;
    TransportAgentName : string;
    FreightDiscount : number;
    TollAmt : number;
    ContractStart : Date;
    ContractEnd : Date;
    IsActive : boolean;
    IsBlocked : boolean;
    CityId:number;
    Warehouseid:number;
    TransportAgentMobileNo:number;
    fleetMasterDetails : fleetMasterDetails[];
}

export interface fleetMasterDetails
{
    Id: number;
    FleetMasterId : number;
    VehicleType : string;
    NoOfVehicle : string;
    FixedCost : number;
    ExtraKmCharge : number;
    ExtraHrCharge : number;
    WaitingCharge : number;
    VehicleCapacity : number;
    Make : string;
    NonworkingDayAmt : number;
    DistanceContract : number;
    DaysContract : number;
    HrContract : number;

}