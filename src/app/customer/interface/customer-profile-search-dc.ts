export interface CustomerProfileSearchDC {
    WarehouseId : number | null;
    ClusterId : number[];
    skip : number;
    take : number;
    Keyword : string;
}
