export interface ScanBarcode {
    Id: number;
    WarehouseId: number;
    ItemNumber:string;
    ItemName:string;
    ExistingEAN:string;
    NewEAN:string;
    ImageUrl:string;
    Status:number;
}
