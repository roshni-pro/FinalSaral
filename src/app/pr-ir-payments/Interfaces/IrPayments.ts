export interface PrPayments {
    BankId: number;
    BankName: string;
    RefNo: string;
    TotalAmount: number;
    TotalReaminingAmount: number | null;
    Remark: string;
    PaymentDate: Date | string | null;
    PrList: PrDC[];

}


export interface PrDC {
    Id: number;
    PurchaseOrderId: number | null;
    InvoiceNumber: string;
    InvoiceDate: Date | string | null;
    TotalAmount: number | null;
    IRStatus: string;
    DueDays: number;
    DifInHours: number;
    SupplierCode: string;
    SupplierName: string;
    //client side properties
    IsSelected: boolean;
}

export interface IrPaymentSummaryPaginator
{
    StartDate: Date | string | null;
    EndDate: Date | string | null;
    SkipCount: number;
    Take: number;
}