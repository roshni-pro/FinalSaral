export interface AdddepoMaster {
    dpoid:number;
    Stateid :number,
    StateName :string,
    cityId :number,
    CityName:string,
    DepoName :string,
    GSTin :string,
    DepoCodes :string,
    Address :string,
    Email :string,
    PhoneNumber :string,
    ContactPerson:string,
    FSSAI :string,
    CityPincode :number,
    Bank_Name :string,
    Bank_AC_No :string,
    BankAddress :string,
    Bank_Ifsc :string,
    BankPinCode :number,
    PANCardNo :string,
    OpeningHours :string,
    PRPOStopAfterValue :number,
    GstImage :any[],
    FSSAIImage :any[],
    PanCardImage :any[],
    CancelCheque :any[],
    Status :string,
    SupplierCode :string,
    SupplierName :string,
    SupplierId  :number,
    TINNo:string,
    Phone:string,
    Message:string,
    BankAccountType:string
    PanCardImages:any[];
    CancelCheques:any[];
    FSSAIImages:any[];
    GstImages:any[];
}