export interface ClearanceLiveItemListDc {
    WarehouseId : number;
    WarehouseName : string;
    Id : number;
    TotalQty : number;
    AvailableQty : number;
    UnitPrice : number;
    itemname : string;
    IsActive : boolean;
    CreatedDate : Date;
    ExpiryDate : Date;
    MFGDate : Date;
    BatchCode : string;
    ShelfLifeLeft : number;
}

export interface ExportClearanceLiveItemFilterDc
{
    WarehouseId : number;
    keyword : string;

}

export interface SearchClearanceLiveItemDc
{

    Skip : number;
    take : number;
    keyword : string;
    WarehouseId : number;
    CategoryId : number;

}

export interface SearchClearanceStockDc
{

    Skip : number;
    take : number;
    keyword : string;
    WarehouseId : number;

}

export interface UpdateClearanceStockDc
    {
        WarehouseId : number;
        ItemMultiMRPId : number;
        Id : number;
        TotalQty : number;
        AvailableQty : number;
        UnitPrice : number;
        BatchCode : string;
        StockType : string;
        ClearanceStockBatchMasterId : number;
        ClPrice : number;
        DiscountType : string;
        Discount : number;
        PromoCost : number;
    }