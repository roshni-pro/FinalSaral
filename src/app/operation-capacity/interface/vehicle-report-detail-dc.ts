export interface VehicleReportDetailDC {
    VehicleNo: string;
    Location_StationCode: string;
    ClientName: string;
    Month: string;
    Driver: string;
    ContractHours: number;
    ContractDays: number;
    ContractKMs: number;
    GPSStatus: number;
    ExtraDay: number;
    ExtraKM: number;
    Extrahours: number;
    VehicleType: string;
    TotalKM: number;
    RemainingKM: number;
    ExtraKMCharged: number;
    ExtraHrsCharge: number;
    FixedCost: number;
    ExtraCost: number;
}
