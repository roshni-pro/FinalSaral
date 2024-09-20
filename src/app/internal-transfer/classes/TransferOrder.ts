export class TransferOrder {

    StockId: number;
    Itemname: any;
    RequestFromWarehouseId: number;
    RequestToWarehouseId: number;
    Noofpics: number;


    constructor(item?) {
        this.StockId = item && item.StockId ? item.StockId : null;
        this.Itemname = item && item.Itemname ? item.Itemname : '';
        this.RequestFromWarehouseId = item && item.RequestFromWarehouseId ? item.RequestFromWarehouseId : null;
        this.RequestToWarehouseId = item && item.RequestToWarehouseId ? item.RequestToWarehouseId : null;
        this.Noofpics = item && item.Noofpics ? item.Noofpics : null;

    }
}