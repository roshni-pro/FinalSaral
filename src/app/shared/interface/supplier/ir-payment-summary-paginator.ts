export interface IrPaymentSummaryPaginator
{
    StartDate: Date | string | null;
    EndDate: Date | string | null;
    SkipCount: number;
    Take: number;
}