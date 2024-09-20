export class RatingMasterDC
{
    Id : number;
    AppType : number; // 1 Sales Man Rating , 2  Delivery Man Rating, 3 Retailer Man Rating
    Rating : number; // 1,2,3,4,5 
    RatingDetails : RatingDetailDC[];
}
export class RatingDetailDC
{
    Id : number;
    Detail : string;
    RatingMasterId : number;
}
export class CustomerRatingFilter{
    WarehouseIds : number[];
    AppType : number;
    Today : Date | null;
    Start : Date | null;
    End : Date | null;
    // OrderId : number | null;
    // Skcode : string | null;
    // Mobile : string | null;
    Take : number;
    Skip : number;
    key : any;
}
export class SalesRatingFilter
{
    SalesIds : number[];
    Today : Date;
    Start : Date;
    End : Date;
    // OrderId : number;
    // Skcode : string;
    // Mobile : string;
    Take : number;
    Skip : number;
    AppType : number;
    key : any;
}
export class DboyRatingFilter
{
    DboyIds : number[];
    Today : Date;
    Start : Date;
    End : Date;
    // OrderId : number;
    // Skcode : string;
    // Mobile : string;
    Take : number;
    Skip : number;
    AppType : number;
    key : any;
}
export class WarehouseIdDC
{
    WarehouseIds : number[];
}
