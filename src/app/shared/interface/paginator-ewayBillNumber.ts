export interface paginatorEwayBillNumber {
    Skip: number;
    Take: number;
    Cityid : number;
    Warehouseid:number;
    SkCode:string;
    orderId: number;
    active:true;
    status:string;
    FromDate?: Date;
    ToDate?: Date;

}