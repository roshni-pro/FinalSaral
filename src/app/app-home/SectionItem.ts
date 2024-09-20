export class SectionItem {
    SectionItemID: Number;
    CreatedDate: Date;
    UpdatedDate: Date;
    BannerActivity:string;
    BannerName: string;
    BannerImage: string;
    TileName: string;
    TileImage: string;
    RedirectionUrl: string;
    RedirectionType: string;
    RedirectionID: Number;
    BaseCategoryId: Number;
    CategoryId: Number;
    SubCategoryId: Number;
    SubsubCategoryId: Number;
    ItemId: Number;
    ImageLevel: Number;
    HasOffer: boolean;
    OfferStartTime: Date;
    OfferEndTime: Date;
    Deleted: boolean;
    Expired: boolean;
    Active: boolean;
    IsFlashDeal: boolean;
    FlashDealQtyAvaiable: any;
    FlashDealMaxQtyPersonCanTake: Number;
    FlashDealSpecialPrice: Number;
    MOQ: Number;
    UnitPrice: Number;
    PurchasePrice: Number;
    SellingSku: Number;
    FlashdealRemainingQty: Number;
    TileSectionBackgroundImage: string;
    DynamicHeaderImage: string;
    IsTileSlider: boolean;

    constructor(data?: SectionItem) {
        
        data && data.SectionItemID ? this.SectionItemID = data.SectionItemID : 0;
        data && data.CreatedDate ? this.CreatedDate = data.CreatedDate : new Date();
        data && data.UpdatedDate ? this.UpdatedDate = data.UpdatedDate : new Date();
        data && data.BannerName ? this.BannerName = data.BannerName : '';
        data && data.BannerActivity ? this.BannerActivity = data.BannerActivity : '';
        data && data.BannerImage ? this.BannerImage = data.BannerImage : '';
        data && data.TileName ? this.TileName = data.TileName : '';
        data && data.TileImage ? this.TileImage = data.TileImage : '';
        data && data.RedirectionUrl ? this.RedirectionUrl = data.RedirectionUrl : '';
        data && data.RedirectionType ? this.RedirectionType = data.RedirectionType : '';
        data && data.RedirectionID ? this.RedirectionID = data.RedirectionID : null;
        data && data.BaseCategoryId ? this.BaseCategoryId = data.BaseCategoryId : null;
        data && data.CategoryId ? this.CategoryId = data.CategoryId : null;
        data && data.SubCategoryId ? this.SubCategoryId = data.SubCategoryId : null;
        data && data.SubsubCategoryId ? this.SubsubCategoryId = data.SubsubCategoryId : null;
        data && data.ItemId ? this.ItemId = data.ItemId : null;
        data && data.ImageLevel ? this.ImageLevel = data.ImageLevel : null;
        data && data.HasOffer ? this.HasOffer = data.HasOffer : false;
        data && data.OfferStartTime ? this.OfferStartTime = data.OfferStartTime : new Date();
        data && data.OfferEndTime ? this.OfferEndTime = data.OfferEndTime : new Date();
        data && data.Deleted ? this.Deleted = data.Deleted : false;
        data && data.Expired ? this.Expired = data.Expired : false;
        data && data.Active ? this.Active = data.Active : false;
        data && data.IsFlashDeal ? this.IsFlashDeal = data.IsFlashDeal : false;
        data && data.FlashDealQtyAvaiable ? this.FlashDealQtyAvaiable = data.FlashDealQtyAvaiable : 0;
        data && data.FlashDealMaxQtyPersonCanTake ? this.FlashDealMaxQtyPersonCanTake = data.FlashDealMaxQtyPersonCanTake : 0;
        data && data.FlashDealSpecialPrice ? this.FlashDealSpecialPrice = data.FlashDealSpecialPrice : 0;
        data && data.MOQ ? this.MOQ = data.MOQ : 0;
        data && data.UnitPrice ? this.UnitPrice = data.UnitPrice : 0;
        data && data.PurchasePrice ? this.PurchasePrice = data.PurchasePrice : 0;
        data && data.SellingSku ? this.SellingSku = data.SellingSku : null;
        data && data.FlashdealRemainingQty ? this.FlashdealRemainingQty = data.FlashdealRemainingQty : null;
        data && data.TileSectionBackgroundImage ? this.TileSectionBackgroundImage = data.TileSectionBackgroundImage : this.TileSectionBackgroundImage = '';
        data && data.IsTileSlider ? this.IsTileSlider = data.IsTileSlider : this.IsTileSlider = false;
        data && data.DynamicHeaderImage ? this.DynamicHeaderImage = data.DynamicHeaderImage : this.DynamicHeaderImage = null;
    }

}