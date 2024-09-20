export interface LedgerEntryViewModel {
    ID: number; 
    Date: Date; 
    Particulars: string; 
    LagerID: number; 
    VouchersTypeID: number; 
    VouchersNo: number; 
    Debit: number; 
    Credit: number;
    ObjectID : number;
    ObjectType: string; 
    AffectedLadgerID: number; 
    Active: boolean; 
    CreatedBy: number; 
    CreatedDate: Date; 
    UpdatedBy: number; 
    UpdatedDate: Date;
    RefNo? : string; 
}
