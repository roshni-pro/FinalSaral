import { TripInformation } from "./trip-information";
import { TripTouchPoint } from "./trip-touch-point";

export interface TripTouchPointInformation {
    tripInformation: TripInformation;
    TripTouchPointList: TripTouchPoint[];
}