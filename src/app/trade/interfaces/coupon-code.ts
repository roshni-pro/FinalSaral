export interface CouponCodes 
{
    Id: string;
    CouponCode: string;
    ExpiryDate: Date | string | null;  
    CouponAmount: number | null;  
    CouponPercent: number | null;
    IsPercent: boolean;
    MinOrderAmount: number | null;  
    IsPromotion: boolean;  
    SellerId: number | null;     
    AvailableToBuyers: number[]; 
    AppliedByBuyers: number[];   
    IsActive?: boolean;

    //client side properties
    IsEditable: boolean;
    Status?: string;
}