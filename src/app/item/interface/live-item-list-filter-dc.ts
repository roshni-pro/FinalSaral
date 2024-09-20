export interface LiveItemListFilterDc {
    WarehouseId : number;
    BrandId : number;
    Keyword : string;
    Skip : number;
    Take : number;
}
export interface InsertJitRiskQuantityDc {
    WarehouseId : number;
    ItemMultiMrpId : number;
    RiskQuantity : number;
}
export interface UpdateJITLiveItemDc {
    WarehouseId : number;
    SupplierId : number;
    DepoId : number;
    ItemMultiMrpId : number;
    ItemId : number;
    POPurchasePrice : number;
    PurchasePrice : number;
    RiskPurchasePrice : number;
    Discount : number;
    Margin : number;
    LimitQuantity : number;
    RiskQuantity : number;
    QtyToLive : number;
    UnitPrice : number;
    Active : boolean;
}
export interface UpdateRiskItemDc {
    WarehouseId : number;
    ItemMultiMrpId : number;
    SupplierId : number;
    DepoId : number;
    POPurchasePrice : number;
    PurchasePrice : number;
    RiskPurchasePrice : number;
    LimitQuantity : number;
    RiskQuantity : number;
    QtyToLive : number;
}
export interface OpenMoqFilterDc {
    WarehouseId : number;
    ItemNumber : string;
    ItemMultiMrpId : number;
}
export interface UpdateRiskDc {
    WarehouseId : number;
    ItemMultiMrpId : number;
    RiskPurchasePrice : number;
    RiskQuantity : number;
    RiskType : number;
    // POUpdateRiskDc : POUpdateRiskDc
    // InternalUpdateRiskDc : InternalUpdateRiskDc
}
export interface POUpdateRiskDc {
    WarehouseId : number;
    ItemMultiMrpId : number;
    RiskPurchasePrice : number;
    RiskQuantity : number;
    RiskType : number;
}
export interface InternalUpdateRiskDc {
    WarehouseId : number;
    ItemMultiMrpId : number;
    RiskPurchasePrice : number;
    RiskQuantity : number;
    RiskType : number;
}