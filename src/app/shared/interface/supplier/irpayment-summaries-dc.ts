export interface IRPaymentSummariesDC
{
    Id: number;
    TotalAmount: number | null;
    PaymentDate: Date | string | null;
    IsActive: boolean;
    IsIROutstandingPending:boolean|null;
}