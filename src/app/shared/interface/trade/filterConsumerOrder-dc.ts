export interface filterConsumerOrderdc {
    skip: number;
    take: number;
    InvoiceNo: number;
    SearchString?: string | null;
    // BuyerMobile: number;
    OrderStatus: string;
    StartDate: Date | null;
    EndDate: Date | null;
    sellerId?: any;
    ClusterId?: number | null;
    CartStatus?: string | null;
    zoneId?: string | null;
    ClusterIdsList?: any | null;


}