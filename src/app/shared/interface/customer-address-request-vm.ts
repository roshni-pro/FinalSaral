export interface CustomerAddressRequestVM {
    RequestId: number;
    Skcode: string;
    CreatedDate: Date;
    CreatedBy: string;
    CustomerLat: number;
    CustomerLng: number;
    NewLat: number;
    NewLng: number;
    BillingAddress: string;
    IsApproved: boolean;
    IsRejected: boolean;
}
