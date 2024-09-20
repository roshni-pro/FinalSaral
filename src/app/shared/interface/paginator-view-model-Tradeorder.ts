export interface PaginatorViewModelTradeorder {
    Skip: number;
    Take: number;
    Name: string;
    skcode : string;
    orderNo: string;
    OrderStatus: string;
    itemName: string;
    cityid : number  | null;
    categoryid: number | null;
    startdate: Date | string | null;
    enddate: Date | string | null;

}
