export interface InvForcastInterface {
    AveragePurchasePrice: number;
    BuyingPrice: number;
    CityId: number;
    CityName: string;
    CurrentStock: number;
    FulfillThrow: number;
    Id: number;
    ItemMultiMrpId: number;
    ItemName: string;
    MRP: number;
    MinOrderQty?: any;
    NetStock: number;
    NoOfSet?: any;
    OtherWarehouseDetails?: OtherWarehouseDetails[];
    PRPaymentType: number;
    RequiredQty: number;
    SalesIntent: number;
    SubsubcategoryName: string
    SupplierId: number;
    WarehouseId: number;
    WarehouseName: string;
    YesterdayDemand: number;
    PRId: number;
    PrDate: string;
    DisplayName: string;
    checked: boolean;
    deleteId: boolean;
    ItemForecastDetailId:number;
    OPenQty: any,
    
    //personal variables for tables
    poPurchasePrice?:any ;
    RequiredQtyFinal?:any;
    OtherWarehouseCount?:number;
    SalesIntentQty?:number;
    saveDraftUniqueId?:number;
    DemandInCase?:number;
    FinalQty?:number;
    CatID?:number;
    Categoryid?:number;
    SubCatID?:number;
    SubCategoryId?:number;
    SubSubCatID?:number;
    SubsubCategoryid?:number;
    ItemMultiMRPId?:number;
    moqSupplierList?: any[]
    bussinessType? : string,



    //same variable different Name
    APP?: number,
    Demandcases?: number,
    AllowedQty?: number,
    AllowedQtyOtherHub?: number,
    DepoId?: number,
    prSelectedDepo?: number 
}

export interface OtherWarehouseDetails {
    OtherWarehouseId: number;
    OtherWhDelCancel: number;
    OtherWhDemand: number;
    OtherWhNetDemand: number;
    OtherWhOpenPoQty: number;
    OtherWhStock: number;
    label: '';
    otherWhReqQty:number;
}

// export interface DraftObjPayload {
//     ItemForecastPRRequestForBulkobj: ItemForecastPRRequestForBulkobj[]
// }

export interface ItemForecastPRRequestForBulkobj {
    ItemForecastDetailId :  ItemForecastDetailId | number,
    FulfillThrow : number,
    BuyingPrice : number,
    MinOrderQty : number,
    NoOfSet : number,
    SalesIntentQty : number,
    Demand : number,
    Demandcases : number,
    AllowedQty : number,
    AllowedQtyOtherHub : number,
    FinalQty : number,
    PickerType : string,
    ETADate : string,
    DepoId : number,
    SupplierId : number,
    PRPaymentType : string,
    PeopleID : number,
    FreightCharge : number,
    WarehouseId : number,
    Categoryid : number,
    SubCategoryId : number,
    SubsubCategoryid : number,
    ItemName : string,
    APP : number,
    ItemMultiMRPId : number,
    Id : number,
    bussinessType : string,
    InternalTransferWHId: any,
    OPenQty: any,
    RequiredQty: any,
    YesterdayDemand: any
    
}

export interface ItemForecastDetailId {
    Id: number ,
    Quantity: number
}


export interface ItemForecastPRRequestForSaveobj {
    ItemForecastDetailId :  ItemForecastDetailId | number,
    FulfillThrow : number,
    BuyingPrice : number,
    MinOrderQty : number,
    NoOfSet : number,
    InternalTransferWHId: any
    SalesIntentQty : number,
    Demand : number,
    PickerType : string,
    ETADate : string,
    DepoId : number,
    SupplierId : number,
    PRPaymentType : string,
    PeopleID : number,
    FreightCharge : number,
    Id : number,
    Warehouseid : number,
    AllowedQty : number,
    AllowedQtyOtherHub : number,
    Demandcases : number,
    Itemname : string,
    bussinessType : string, 
    OPenQty: any,
    RequiredQty: any,
    YesterdayDemand: any//,
    SubCategoryId:any,
    SubsubCategoryId:any   ,
    MultiMrpId:any 
}


