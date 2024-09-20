export interface IrOutstandingViewPaginator {
    WarehouseId: number | null;
    Search: string;
    StartDate: Date | string | null;
    EndDate: Date | string | null;
    SkipCount: number;
    Take: number;
    Status:string;
    BuyerId:number | null;
}
