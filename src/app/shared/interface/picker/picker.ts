
export interface GetItemOrdersList
{
    orderid: number[];
}

export interface GetItemOrdersListV2
{
     orderid : number[];
     peopleId : number;
     ClusterId :number;
     LineItemCutItems : LineItemCutItemDc[];
     dboyid:number;
     MongoObjectid:string
}

export interface LineItemCutItemDc
{
        OrderId : number,
        OrderDetailsId : number;
        Qty : number;
        QtyChangeReason : string;
}
export interface CompletedPickerDispatch
{
    OrderIds : number[];
    pickerId : number;
    DeliveryBoyId  :number;   
}
export interface EditPickerorderQty
{
    PickerId : number;
    orderPickerDetails  : orderPickerDetails[]
}
export interface orderPickerDetails
{
    id : number;
    ItemMultiMrpId : number;
    ItemName : string;
    OrderId : number;
    OrderDetailsId : number;
    Qty : number;
    DispatchedQty : number;
    Comment : string;
}

export interface GetPendingOrderFilterDc
{
    ClusterId: number | null;
    WareHouseID: number;
    ItemPerPage : number;
    PageNo : number;
    TotalRecords : number;
    OrderId? : number;
    CustomerId:number;
    CustomerType:number;
    OrderType:any;
}

export interface PickerRTDOrderDC
{
    PickerId : number;
    Message : string;
    OrderIds : number[];
    DeliveryBoyId  :number; 
    AgentId : number;
    OrderidRedispachedOrder:number[];         
}
export interface MongoPickerMaster{
    OrderId:number;
    WarehouseId:number;
    Status:string;
    PickerOrderStatus:number;
    CreatedDate:Date;
    UpdatedDate:Date;
    ClusterId:number;
    Skcode:string;
    ShopName:string;
    ShippingAddress:string,
    GrossAmount:number,
    CustomerType:number;
    orderDetails  :MongoPickerDetails[];
}
export interface MongoPickerDetails{
    OrderDetailsId:number;
    OrderId:number;
    WarehouseId:number;
    Qty:number;
    ItemMultiMrpId:number;
    itemNumber:string;
    itemname:string;
    IsFreeItem:boolean;
    price:number;
    UnitPrice:number;
    IsDispatchedFreeStock:boolean;
}