export interface PurchaseRequestSettlementFilter {
    SupplierId: number;
    WarehouseId: number;
    Skip: number;
    Take: number;
}

export interface PurchaseRequestSettlementContainer {
    PageList: PurchaseRequestSettlementPage[];
    TotalRecords: number;
}

export interface PurchaseRequestSettlementPage {
    SupplierId: number;
    SupplierName: string;
    SupplierCode: string;
    PurchaseOrderId: number;
    RemainingAmount: number;
    CreationDate?: Date | string;
    PaymentDate?: Date | string;
    PaidAmount: number;
    PurchaseRequestPaymentId: number;
    //client side properties
    AfterSettleRemainingAmount?: number;
}



export interface PurchaseRequestPaymentSettlementDc {
    SupplierId: number;
    PurchaseOrderId: number;
    PurchaseRequestPaymentId: number;
    AfterSettleRemainingAmount: number;
    PaymentList: ChildIrMasterDc[];
}

export interface ChildIrMasterDc {
    IRMasterId: number;
    PayingAmount: number;
}