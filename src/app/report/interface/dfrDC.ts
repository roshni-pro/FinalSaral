export interface DFRInterface
{
    BuyerName : string;
    warehousename : string;
    ItemName : string;
    yesterdaydemand : number;
    olddemand : number;
    Demand : number;
    CurrentStock : number;
    NetDemand : number;
    TotalGrQty : number;
    TotalInternalTransfer : number;
    DFRPercent : number;
    DemandDate : Date;
    status : string;
}