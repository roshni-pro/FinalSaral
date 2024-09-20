export interface TripOrderDetail {
    TripPlannerConfirmedOrderId: number;
    OrderId: number;
    OrderAmount: number;
    WeightInKg: number;
    OrderDate: Date | string;
    UnloadTimeInMins: number;
    OrderStatus: string;
    IsManuallyAdded: boolean;
}