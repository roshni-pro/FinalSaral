
export class BrandBuyerDetail {
    Id: number;
    WareHouseId: number;
    BrandId: number;
    AllocatePercent: number;
    WareHouseName : string;
    BrandName : string;

    BuyerId: number;
    BuyerName: string;


    constructor(brandbuyerdetail?: BrandBuyerDetail) {
        this.Id = brandbuyerdetail && brandbuyerdetail.Id ? brandbuyerdetail.Id : 0;
        this.WareHouseId = brandbuyerdetail && brandbuyerdetail.WareHouseId ? brandbuyerdetail.WareHouseId : null;
        this.BrandId = brandbuyerdetail && brandbuyerdetail.BrandId ? brandbuyerdetail.BrandId : null;
        this.AllocatePercent = brandbuyerdetail && brandbuyerdetail.AllocatePercent ? brandbuyerdetail.AllocatePercent : null;
        this.WareHouseName = brandbuyerdetail && brandbuyerdetail.WareHouseName ? brandbuyerdetail.WareHouseName : '';
        this.BrandName = brandbuyerdetail && brandbuyerdetail.BrandName ? brandbuyerdetail.BrandName : '';

        this.BuyerId = brandbuyerdetail && brandbuyerdetail.BuyerId ? brandbuyerdetail.BuyerId : 0;
        this.BuyerName = brandbuyerdetail && brandbuyerdetail.BuyerName ? brandbuyerdetail.BuyerName : '';


    }
}