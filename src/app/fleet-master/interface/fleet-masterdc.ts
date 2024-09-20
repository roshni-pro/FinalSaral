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
    AadharImagePath:string;
    PanNo:string;
    AadharNo:number;
    PanImagePath:string;
    Warehouseid:number;
    TransportAgentMobileNo:number;
    GSTIN:string;
    Address:string;
    TransporterCityId :number;
    TransporterStateId :number;
    AgreementPath:any;
    MSMECertificatePath:any;
    IsMSME:boolean;
    fleetMasterDetails : fleetMasterDetails[];
    fleetMasterAccountDetailDc:fleetMasterAccountDetails[];
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

export interface fleetMasterAccountDetails
{
    Id: number;
    FleetMasterId : number;
    AccountNo : string;
    IFSCcode : string;
    BranchName : string;
    BankName : string;
    HolderName : string;
    
    CancelledChequePath:any;

}