export interface IrOutstandingPaginator
{
    WarehouseId: number | null;
    Search: string;
    StartDate: Date | string | null;
    EndDate: Date | string | null;
    SkipCount: number;
    Take: number;
    IRStatus?: string;
    IsGetFutureOutstandingAlso?: boolean;
}