import { TradeCustomerZonePointDc } from './trade-customer-zone-point-dc';

export interface TradeCustomerZoneViewDc
{
    Id: number;
    TradeCustomerId: number;
    ZoneName: string;
    ZoneCenterLatitude: string;
    ZoneCenterLongitude: string;
    PointList: TradeCustomerZonePointDc[];

    //client side properties
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    isChanges?: boolean;
}