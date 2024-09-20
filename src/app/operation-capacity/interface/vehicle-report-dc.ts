export interface VehicleReportDC {
    TripDate: Date | string | null; // CreatedDate
    ReportingTime: Date | string | null; // Starttime
    ClosingTime: Date | string | null; //
    HourWorked: string;
    HourWorkedInMins: number;
    StartKm: number | null; //Opening
    ClosingKm: number | null; //Closing
    TotalKm: number | null; //TotalKm
    ExtraTimeInHour: number | null;
}
