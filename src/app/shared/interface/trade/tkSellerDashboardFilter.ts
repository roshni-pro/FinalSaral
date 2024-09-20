export interface tkSellerDashboardFilter {
    City: string;
    SellerId: number;
    StartDate: Date | string | null;
    EndDate: Date | string | null;
    Skip:number;
    Take:number;
}
