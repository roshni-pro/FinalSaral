export interface vehicleMaster
{
        Id : number;
        FleetType : string;
        VehicleType : string;
        VehicleNo : string;
        Model : string;
        RegistrationNo : string;
        OwnerName : string;
        ChasisNo : string;
        OwnershipType : string;
        InsuranceNo : string;
        VehiclePermit : string;
        PUCNo:any;
        EngineNo : string;
        VehicleWeight : number;
        IsBlocked : boolean;
        PUCValidTill : Date;
        RegistrationImage : string;
        RegistrationImageBack:any;
        InsuranceImage : string;
        PUCimage : string;
        CityId:number;
        InsuranceValidity:Date;
        MakerName:string;
        FleetId:number;
        Warehouseid:number;
        // TripTypeEnum:number;
}