export interface IrOutstandingDC
{
    Id: number;
    PurchaseOrderId: number | null;
    InvoiceNumber: string;
    InvoiceDate:  string | null;
    IRApprovedDate: Date | string | null;
    GRNDate:Date| null;
    TotalAmount: number | null;
    IRStatus: string;
    DueDays: number;
    DifInHours: number;
    DifInHoursForApproval: number;
    SupplierCode: string;
    SupplierName: string;
    DifInHoursForGRN:number;
    InvoiceDateToShow: Date;
    //client side properties
    IsSelected: boolean;
    TDSAmount:number;
    PaidAmount:number;
}