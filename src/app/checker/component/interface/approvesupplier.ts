export interface ApproverSupplier 
{
    
        id: number,
        supplierId: number,
        status: string,
        comments: string,
        userid: number,
        PaymentTerms : string,
        SupplierType : string
}

export interface ApproverDpot 
{
    
        id: number,
        depoId: number,
        status: string,
        comments: string,
        userid: number,
        activeType:boolean,
        
        
        
}

export interface activeDactivate {
        id: number,
        supplierId: number,
        status: string,
        comments: string,
        userid: number,
        ActiveType:boolean,
}

export interface activeDactivateDpot {
        id: number,
        depoId: number,
        status: string,
        comments: string,
        userid: number,
        ActiveType:boolean,
}