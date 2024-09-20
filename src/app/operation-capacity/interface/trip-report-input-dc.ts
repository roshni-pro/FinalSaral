export interface TripReportInputDc {
    WarehouseId: number;
    StartDate: Date | string;
    EndDate: Date | string;
    TripPlannerConfirmMasterId: number | null;
}
