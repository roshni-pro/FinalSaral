export class PoCloseFilter {

    PurchaseOrderId: number;
    SupplierId: number;
    WarehouseId: number;

    StartDate: Date;
    EndDate: Date;

    constructor(data?) {
        
        this.PurchaseOrderId = data && data.PurchaseOrderId ? data.PurchaseOrderId : null
        this.SupplierId = data && data.SupplierId ? data.SupplierId : null
        this.WarehouseId = data && data.WarehouseId ? data.WarehouseId : null

        this.StartDate = data && data.StartDate ? data.StartDate : new Date(new Date().setMonth(new Date().getMonth() - 3));
        this.EndDate = data && data.EndDate ? data.EndDate : new Date();

    }

}
