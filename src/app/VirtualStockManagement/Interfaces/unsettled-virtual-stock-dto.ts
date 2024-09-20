export interface UnsettledVirtualStockDTO
    {
        GroupId: number;
        TransactionId: string;
        RemainingQty: number;
        CreatedByEmails: string;
        StockType: string;
        Reason: string;
        
        // client side properties
        FromStock?: string;
        ToStock?: string;
        ClientQty?: number;
        IsChecked?:boolean;
        VirtualStockIds?:any;
    }