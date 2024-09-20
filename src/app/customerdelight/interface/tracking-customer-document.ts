export interface TrackingCustomerDocument {
    GSTNo:string;
    GSTImage: string;
    LicenceNo: string;
    OtherDocumetImage : string;
    IsGSTCustomer: boolean;
    DocumentStatus: number;
}
export interface TrackingCustomerDocumentDc{
    CustomerId : number;
    GSTNo : string;
    GSTImage : string;
    LicenceNo : string;
    OtherDocumetImage : string;
    IsGSTCustomer : boolean;
    DocumentStatus : number;
    LicenseExpiryDate : Date;
    GstExpiryDate : Date;
    DocTypeId : number;
    DocType : string;
 
    ///client side property
    GSTDocTypeId: number;
    IsGstEditable: boolean;
    IsOtherDocEditable: boolean;
}
