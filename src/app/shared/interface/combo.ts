export interface Combo {
         // ObjectId: number;
         WarehouseId: number;
         WarehouseName: string ;
         ComboName : string; 
         ComboPrice: number ;          
         ComboImage:string; 
          CreatedDate: Date | null;
          UpdatedDate : Date | null;
          IsActive:boolean;
          IsPublish :boolean;
          IsDeleted :boolean;
          TotalComboPrice:number;
          SellQty:number;
          Discount:number;
       // GUID: string; 
        ComboItemlist  : ComboItemlist[]
}

    export interface ComboItemlist {
    
        // ObjectId: number
       ItemId :number;
       ItemImage :string;
         Qty :string; 
       UnitPrice:number; 
         MinOrderQty :string;
        Parcentage :number;
          CreatedDate:Date | null;
        UpdatedDate :Date | null;
        IsActive :boolean;
          IsPublish :boolean;
         IsDeleted :boolean;
          CreatedBy :number;
          UpdatedBy :number;
          LogoUrl:string;
          AfterPercentage:number;
          TotalPriceItem:number;
         // GUID :string;
    }


