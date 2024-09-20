export interface TripPlannerConfirmedOrderVM {
    OrderId: number;
    CustomerName: string;
    ShippingAddress: string;
    Amount: number;
    TimeInMins: number;
    DistanceInMeter: number;
    TripPlannerConfirmedOrderId: number;
    IsActive: boolean;
    IsActiveOld: boolean;
    IsManuallyAdded: boolean;
    Skcode: string;
    Mobile: string;
    TripPlannerConfirmedDetailId: number;
    ReDispatchCount: string;
    ShopName: string;
    WeightInKg: number;
    OrderDate: Date|null;
    Status: string;
    IsNewPickerOrder:boolean;
    PrioritizedDate:Date|null;
}
