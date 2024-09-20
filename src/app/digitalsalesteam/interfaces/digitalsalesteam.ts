export interface AppBannerRequestDC {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any;
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number
    Type:string
    AppBannerDiscription:string

}

export interface NotificationRequest {
    ImageUrl :string
    StartDate :string
    EndDate :string
    SubCatId :number
    WarehouseIds :any
    Comment :string
    ApprovedDate :string
    IsApproved :boolean
    ApprovedBy :number
    NotificationDescription:string
    Status:string
}

export interface MurliRequest {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number
    MurliDescription:string
}

export interface BrandStoreRequest {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number,
    CategoryId:number
}

export interface FlashDealRequest  {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number
    ItemId:number
    AvailableQty:number
    MaxQty:number
    FlashDealPrice:number
}

// export interface WarehouseIds{
//     WarehouseId:number
// }