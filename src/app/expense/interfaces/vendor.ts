export interface Vendor {
    Id: number|null;
    StateId: number|null;
    AddressOne: string;
    AddressTwo: string;
    VendorType: string;
    Name: string;
    Code: string;
    DepartmentId:number|null;
    WorkingLocationId: number|null;
    WorkingCompanyId: number|null;
    IsTDSApplied: boolean|false;
    ExpenseTDSMasterID:number|null;
    CreatedBy:number|null;
    DepartmentName:string;
    WorkingCompanyName:string;
    WorkingLocationName:string;
    StateName:string;
    ExpenseTDSMasterName:string;
}
