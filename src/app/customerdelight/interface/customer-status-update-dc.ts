export interface CustomerStatusUpdateDc {
    CustomerId : number;
    CustomerVerify : string;
    CustomerType : string;
    IsActive : boolean;
    CustomerDocumentStatus : number;
    ShippingAddressStatus : number;
    ShopName: string;
    TypeOfBuissness : string;
    // ChannelMasterId:string
}
export interface CustomerBillingAddressDc{
    CustomerId : number;
    BillingAddress1 : string;
    BillingAddress : string;
    BillingState : string;
    BillingZipCode : string;
    BillingCity : string;
}