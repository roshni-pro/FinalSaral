export interface DistributerOffer
{
    OfferId : number;
    Description:string;
    WarehouseId :number;
    CityId : number;
    OfferName : string;
    OfferCode : string;

    OfferCategory : string;

    FreeOfferType : string  //Offer or FlashDeal

    OfferOn : string  //Item,Category,Brand ,
    MinOrderQuantity : number
    NoOffreeQuantity : number

    itemId : number
    itemname : string
    
    FreeItemId : number;
    start : Date;
    end  : Date;
    QtyAvaiable : number;
    QtyConsumed : number;
    FreeItemName : string;
    FreeWalletPoint : number
    OfferWithOtherOffer : boolean;
    DiscountPercentage : boolean;
    BillAmount : number;
    MaxBillAmount : number
    MaxDiscount : number
    LineItem : number
    IsDeleted : boolean
    IsActive : boolean
    CreatedDate : Date
    UpdateDate : Date
    BillDiscountOfferOn : string   
    BillDiscountWallet : number;
    OffersaleQty : number
    BillDiscountType : string
    OfferAppType : string
    ApplyOn :string
    WalletType : string
    DistributorOfferType : boolean;
    ItemNumber : string;   
    UOM : number;
    ObjectIds?:any[];
    ApplyType?:any;
}

export interface DistributerUpdateDC
{
    start : Date;
    end : Date;
    IsActive : boolean;
    itemId : number;
    itemname : string;
    WarehouseId : number;
    OfferCode : string;
}


export interface CustomerEstimationOffer
{
    OfferId : number;
    CustomerId : number;
    OrderIds : string;
    CalculateDiscountvalue : number;
    ChangeCalculateDiscountValue : number;
    CheakerId : number;
    CheakerDate : Date;
    Status : number;
    OfferDiscount : number;
    Type : string;
    OfferOn : string;
    Comment : string;
    Id : number;
}

export interface UpdateGullakDc
{
    OfferId : number;
    Id : number;
    Type : string;
    Comment : string;
}

export interface offerdistributerDC
{
    warehouseid : number;
    offerOn : string;
    start : Date;
    end : Date;
}