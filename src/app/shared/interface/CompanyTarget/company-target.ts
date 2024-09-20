export interface SubCatTarget 
{
    Id: number;
    CityId: number;
    SubCatId: number;
    StartDate: Date | string;
    EndDate: Date | string;
    subCatTargetBrands: SubCatTargetBrand[];
    IsCustomerSpacific:boolean;
}

export interface SubCatTargetBrand  
{
    Id: number;
    BrandIds: string;     
    SubCatTargetDetails: SubCatTargetDetail[];
}

export interface SubCatTargetDetail
{
    Id: number;
    SlabLowerLimit: number;
    SlabUpperLimit: number;
    ValueBy: string;
    TargetbyValue: number;
    MinTargetValue: number;
    NoOfLineItem: number;
    Type: string; //WalletPoint/FreeItem/DreamItem
    WalletValue: number;    
    SubCatTargetLevelBrands: SubCatTargetLevelBrand[];
    SubCatTargetLevelItems: SubCatTargetLevelItem[];
    SubCatTargetLevelFreeItems: SubCatTargetLevelFreeItem[];
}

export interface SubCatTargetLevelBrand
{
    Id: number;
    BrandId: number;
    BrandName:string;
    ValueType: string;
    Value: number;    
}

export interface SubCatTargetLevelItem
{
    Id: number;
    ItemName:string;
    SellingSku: string;
    ValueType: string;
    Value: number;
}

export interface SubCatTargetLevelFreeItem
{
    Id: number;
    ItemName:string;
    SellingSku: string;
    RewardItemId: number | null; //Dream Item 
    Qty: number; //Dream Item 
}