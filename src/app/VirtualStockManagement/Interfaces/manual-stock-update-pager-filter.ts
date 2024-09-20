export interface ManualStockUpdatePagerFilter
{
    Skip: number;
    Take: number;
    WarehouseId: number | null;
    ItemMultiMRPId: number | null;
    Keyword: string;
}