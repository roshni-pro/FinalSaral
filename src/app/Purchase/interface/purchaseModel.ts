export interface PurchaseModel {

    PurchaseOrderId: Number;
    CompanyId: Number;
    SupplierId: Number;
    SupplierName: string;
    WarehouseId: Number;
    WarehouseName: string;
    Status: boolean;
    TotalAmount: Number;
    CreationDate: Date;
    CreatedBy: string;
    Acitve: boolean;
    Advance_Amt: Number;
    ETotalAmount: Number;
    PoType: string;
    Comment: string;
    CommentApvl: string;
    Commentsystem: string;
    progress: string;
    ApprovedBy: string;
    RejectedBy: string;
    BuyerId: Number;
    BuyerName: string;
    DepoId: Number;
    DepoName: string;
    WarehouseCity: string;
    PoInvoiceNo: string;
    TransactionNumber: string;
    Deleted: boolean;
    Active: boolean;
    SupplierStatus: Number;
}



export class POReturnRequestPager {
    CancelType: string;
    Take: number;
    Skip: number;
    constructor(pager?: POReturnRequestPager) {
        this.CancelType = pager && pager.CancelType ? pager.CancelType : 'IR';
        this.Take = pager && pager.Take ? pager.Take : 10;
        this.Skip = pager && pager.Skip ? pager.Skip : 0;
    }

}