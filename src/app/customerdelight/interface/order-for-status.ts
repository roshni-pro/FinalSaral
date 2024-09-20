export interface OrderForStatus{
    OrderId : number;
    Status : string;
    CDComment : string;
    Id : number;
}
export interface OrderConcernCount{
    keyword : string;
    Status : string;
    selectedMonth :Date;
    skip :number;
    take :number;
    WarehouseIds : number[];
    StartDate : Date;
    EndDate : Date;
}
export interface OrderConcernMasterDc{
    Id : number;
    IsActive : boolean;
    Description : string;
}