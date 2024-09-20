export interface MakerCheckerDTO 
{
    SupplierCode : string;
    Id : String;
    MongoId : string;
    EntityName : string;
    EntityId : string;
    Operation :string;
    OldJson : string;
    NewJson : String;
    Status : string;
    CheckerComment : string;
    MakerBy : string;
    CheckerBy :string;
    MakerDate : Date;
    CheckerDate : Date;
    DepoCodes : string;
    
}