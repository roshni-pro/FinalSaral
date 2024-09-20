export interface OrderDC
{
    cityid : number[];
    warehouseid : number[];
    orderid:number;
    skcode:string;
    Status:string;
    startdate:string;
    EndDate:string;
    skip:number;
    take:number;
}

export interface InternalTransfersDC
{
    Warehouseid : number[];
    TransferOrderId : number[]  ;
    InvoiceNumber: string  ;
    Startdate: string ;
    EndDate:string  ;
    skip: number  ;
    take: number ;
}

export interface FailedEwaybillDC
{
    cityid: number[],
    warehouseId: number[],
    ordertype:string,
    orderid: number,
    Startdate:string,
    EndDate:string,
    skip:number,
    take:number   
}

export interface nearlyexpiryDC
{
    "ordertype": string,
    "Warehouseid" : number[],
    "OrderId" : number[],
    "Startdate" : string,
    "EndDate" : string,
    "skip" : number,
    "take" : number
} 