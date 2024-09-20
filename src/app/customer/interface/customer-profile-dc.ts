export interface CustomerProfileDc {
    Skcode : string;
    CustomerId : number;
    CustomerName : string;
    TotalOrder : number;
    LastOrderDate : Date;
    LastCallDate : Date;
    TotalCalls : number;
    TotalVisit : number;
    LastVisitDate : Date;
    AOV : number;
    TOV : number;
    IsPhysicalVisit : boolean;
}
