export interface TradeCommissionDc {

    Id: number;
    City: string;
    CategoryId: number | null;
    StartDate: Date | string;
    EndDate: Date | string;
    IsSeller: boolean;
    IsBuyer: boolean;
    StartRange: number;
    EndRange: number;
    CommissionPercent: number;
    MaxCommissionAmount: number | null;
    CrudType: string;
    IsActive: boolean;
    IsDelete: boolean;
}


export interface TradeCommissionFilters
{
    City: string;
    CategoryId: number | null;
}
