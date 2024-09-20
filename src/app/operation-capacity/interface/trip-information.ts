
export interface TripInformation {
    TruckStatus: string;
    Assignedto: string;
    VehicleType: string;
    StartTime: Date | string | null;
    NoOfSkCodeLeft: number;
    EstimatedTimetoComplete: number;
    Kmtravelled: number;
    EndTime: Date | string | null;
    ReminingTime: number;
    DistanceLeft: number;
    BreakTimeInSec: number;
    ReportingTime: Date | string | null;
    StartKm: number | null;
    ClosingKm: number | null;
    BreakStartTime: Date | string | null;
    TruckStatusId: number;
    ActualDistanceTraveled: number;
}