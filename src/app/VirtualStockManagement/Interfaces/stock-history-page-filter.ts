
export interface StockHistoryPageFilter {
    Skip: number | null;
    Take: number | null;
    StockType: string;
    ItemMultiMRPId: number | null;
    WarehouseId: number | null;
    RefStockType: string;
    UserId: number | null;
}

export interface StockHistoryPageContent {
    CreatedDateString: string;
    EntityType: string;
    EntityId: number | null;
    InOutQty: number | null;
    WarehouseName: string;
    ItemName: string;
    UOM: string;
    ItemNumber: number | null;
    Reason: string;
    Email: string;
    RefStockCode: string;
}


export interface StockHistoryList {
    TotalRecords: number;
    PageList: StockHistoryPageContent[];
    StockHistoryData : any;
}
export interface ExportStockHistoryList {
    PageList: StockHistoryPageContent[];
    StockHistoryData : any;
}