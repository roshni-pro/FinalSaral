export interface TripSummary {
    EstimatedTotalTimeInMin: number;
    EstimatedTraveledTimeInMin: number;
    EstimatedTimeLeftInMin: number;
    TripStartTime: Date | string | null;
    TripEndTime: Date | string | null;
    EstimatedTotalDistance: number | null;
    EstimatedDistanceLeft: number | null;
    EstimatedTraveledDistance: number | null;
    IsFreezed: boolean;
    CurrentStatus: string;
    ReportingTime: Date | string | null;
    ActualTotalTime: number;
    ActualTraveledTime: number;
    ActualTotalDistanceinKm: number;
    IsPickerGenerated: boolean| null;
    PickerMasterId: number | null;
    IsPickerRequired: boolean| null;
}
