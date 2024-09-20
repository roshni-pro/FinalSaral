export interface LMDOverAllData {
    HubName: string;
    NumberOfTrips: number;
    ThresholdOrderCount: number;
    UtilizationPercentageOnOrderCount: number;
    ThresholdOrderAmount: number;
    OrderValue: number;
    UtilizationPercentageOnOrderValue: number;
    OverallUtilizationPercentage: number;
    InProcessOrderCount: number;
    InProcessOrderAmount: number;
    DeliverdCount: number;
    ThresholdVSDeliveryPercentageOnOrderCount: number;
    CarriedVSDeliveryPercentageOnOrderCount: number;
    DeliverdValue: number;
    ThresholdVSDeliveryPercentOnOrderValue: number;
    CarriedVSDeliveryPercentageOnOrderValue: number;
    RedispatchCount: number;
    RedispatchValue: number;
    DCCount: number;
    DCValue: number;
    ReattemptCount: number;
    ReattemptValue: number;
    TotalKmExcludingRunningTrip: number;
    OrderCount: number;
}


export interface LMDDashboardInput {
    warehouseId:number[],
    startdate:string,
    enddate:string
}