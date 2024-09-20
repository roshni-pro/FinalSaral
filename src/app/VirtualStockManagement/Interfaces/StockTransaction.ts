export class StockTransaction {
    ItemMultiMRPId: number;
    WarehouseId: number;
    SourceStockType: string;
    DestinationStockType: string;
    Qty: number;
    Reason: string;
    StockTransferType: string;

    //new
    BatchCode: string = '';
    MfgDate: any = '';
    ExpDate: any = '';
    fromBatchCodeQty: number;
    toBatchCodeQty: number;

    sStockBatchMasterID: any;
    sBatchMasterID: any;
    dStockBatchMasterID: any;
    dBatchMasterID: any;

    //#region client side property
    StockBatchMasterId?: number | null;
    BatchMasterId?: number | null;
    //#endregion

    constructor(stockTransaction?) {
        this.ItemMultiMRPId = stockTransaction && stockTransaction.ItemMultiMRPId ? stockTransaction.ItemMultiMRPId : 0;
        this.WarehouseId = stockTransaction && stockTransaction.WarehouseId ? stockTransaction.WarehouseId : 0;
        this.SourceStockType = stockTransaction && stockTransaction.SourceStockType ? stockTransaction.SourceStockType : '';
        this.DestinationStockType = stockTransaction && stockTransaction.DestinationStockType ? stockTransaction.DestinationStockType : '';
        this.Qty = stockTransaction && stockTransaction.Qty ? stockTransaction.Qty : 0;
        this.Reason = stockTransaction && stockTransaction.Reason ? stockTransaction.Reason : '';
        this.StockTransferType = stockTransaction && stockTransaction.StockTransferType ? stockTransaction.StockTransferType : '';
    }

}