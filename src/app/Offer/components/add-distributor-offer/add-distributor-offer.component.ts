import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Router } from '@angular/router';
import { OfferService } from '../../Service/offer.service';
import { ItemService } from 'app/shared/services/item.service';
import { DistributerOffer, DistributerUpdateDC } from '../interface/offer';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-add-distributor-offer',
  templateUrl: './add-distributor-offer.component.html',
  styleUrls: ['./add-distributor-offer.component.scss']
})
export class AddDistributorOfferComponent implements OnInit {
  WarehouseList:any;
  WarehouseId : any;
  offer : boolean;
  data  :any;
  itempostOffer : boolean;
  itemslaveOffer : boolean;
  barcodeList : any;
  selectedItem: any;
  barcode: any;
  radiobtn : boolean;
  amt : boolean;
  qty : boolean;
  weight : boolean;
  percentage : boolean;
  walletpoint : boolean;
  @Input() Id: any;
  distributerOffer : DistributerOffer;
  distributerUpdateDC : DistributerUpdateDC;
  editMode : boolean;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  ItemId: any;
  ItemName : any;
  Number : any;
  offerlist : any;
  isInvalid : boolean;
  savebtn : boolean;
  itemslaveOfferFormm : any;
  UOM : any;
  itemSavebtn : boolean;
  blocked : boolean;
  btnsave : boolean;
  validForm : boolean;
  validFormQty : boolean;
  validFormAmt : boolean;
  validFormWeight : boolean;
  validFormPer : boolean;
  validFormMin : boolean;
  validFormMax : boolean;
  validFormAmtwp : boolean;
  validFormMinlt : boolean;
  validFormMaxlt : boolean;
  ItemMarkDownOffer : boolean;
  ObjectList: any[];

  constructor(private warehouseService:WarehouseService,private router : Router,private messageService : MessageService
    ,private OfferService : OfferService, private itemservice : ItemService) {this.data = {}; }

  ngOnInit() {
    this.WarehouseId = '';
    this.data.IsActive ='';
    this.data.OfferOn = '';
    this.data.BillDiscountOfferOn = '';
    this.data.WalletType = '';
    this.data.ObjectIds = [];
    this.offer = false;
    this.itempostOffer = false;
    this.itemslaveOffer = false;
    this.ItemMarkDownOffer = false;
    this.radiobtn = false;
    this.amt = false;
    this.qty = false;
    this.weight = false;
    this.percentage = false;
    this.walletpoint = false;
    this.editMode = false;
    this.savebtn = false;
    this.itemSavebtn = false;
    this.blocked = false;
    this.btnsave = false;
    this.validForm = false;
    this.validFormQty = false;
    this.validFormAmt = false;
    this.validFormWeight = false;
    this.validFormPer = false;
    this.validFormMin = false;
    this.validFormMax = false;
    this.validFormAmtwp = false;
    this.validFormMinlt = false;
    this.validFormMaxlt = false;

this.refreshData();    
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      
      this.WarehouseList = result;
    }) 

    if (this.Id) {
      
      this.data = this.Id;
      console.log('data:',this.data);
      this.editMode = true;
      // if(this.data.start != null && this.data.end != null && this.data.WarehouseId != null)
      // {
      //   this.data.start = null;
      //   this.data.end = null;
      //   // this.data.WarehouseId
      // }
      if(this.data.OfferOn == 'ItemPost')
      {
        this.itemslaveOffer = false;
        this.itempostOffer = true;
        if(this.data.FreeOfferType == 'Quantity')
        {
            this.qty = true;
            this.amt = false;
            this.weight = false;
        }
        else  if(this.data.FreeOfferType == 'Weight')
        {
          this.qty = false;
          this.amt = false;
          this.weight = true;
        }
        else if(this.data.FreeOfferType == 'Amount')
        {
          this.qty = false;
          this.amt = true;
          this.weight = false;
        }
      }
      else if(this.data.OfferOn == 'Slab') {
        this.itemslaveOffer = true;
        this.itempostOffer = false;
        if(this.data.BillDiscountOfferOn =='Percentage')
        {
          this.percentage = true;
          this.walletpoint = false;
        }
        else{
          this.percentage = false;
          this.walletpoint = true;
        }
      }
      else if(this.data.OfferOn == 'ItemMarkDown') {
        this.itemslaveOffer = false;
        this.itempostOffer = false;
        this.ItemMarkDownOffer = true;
        // this.data.OfferOn = 'ItemMarkDown';        
      }



    }
  }
  refreshData()
  {
    // this.WarehouseId = '';
    this.data.IsActive ='';
    this.data.OfferOn = '';
    // this.data.BillDiscountOfferOn = '';
    // this.data.WalletType = '';
    // this.offer = false;
    // this.itempostOffer = false;
    // this.itemslaveOffer = false;
    // this.radiobtn = false;
    // this.amt = false;
    // this.qty = false;
    // this.weight = false;
    // this.percentage = false;
    // this.walletpoint = false;
    // this.editMode = false;
    // this.savebtn = false;
    // this.itemSavebtn = false;
    // this.blocked = false;
  }
  onsearch(WarehouseId) {
    this.offer = true;
    if (WarehouseId > 0) {
      this.WarehouseId = WarehouseId
    }
  }
  // offerStatus(WarehouseId,Active)
  // {
    
  // }

  GetApplyDetail(WarehouseId,OfferOn,distributorForm)
  {   
    
    this.ObjectList=[];
       if(OfferOn=="Category")
       {
         
         this.OfferService.getAllCategory().subscribe(result => {          
          this.ObjectList = result;
        }) ;
       }
       else if(OfferOn=="SubCategory")
       {
        
        this.OfferService.getAllSubCategory().subscribe(result => {          
          this.ObjectList = result;
        }) ;
       }
       else if(OfferOn=="Brand")
       {
         
        this.OfferService.getAllBrand().subscribe(result => {         
          this.ObjectList = result;
        }) ;
      }
  }

  offerOn(WarehouseId,OfferOn,distributorForm)
  {
    if(distributorForm.form.status=="VALID")
    {      
      if(OfferOn == 'ItemPost')
      {
        this.itempostOffer = true;
        this.itemslaveOffer = false;
        this.ItemMarkDownOffer= false;
      }
      else if(OfferOn == 'ItemMarkDown')
      {
        this.itempostOffer = false;
        this.itemslaveOffer = false;
        this.ItemMarkDownOffer= true;
      }
      else{
        this.itemslaveOffer = true;
        this.itempostOffer = false;
        this.ItemMarkDownOffer= false;
      }
    }else{
      this.data.OfferOn = 'null';
      if(this.data.start == null)
      {
        this.messageService.add({severity:'error', summary:  'Start Date is Mandatory', detail:''});
      }
      else if(this.data.end == null)
      {
        this.messageService.add({severity:'error', summary:  'End Date is Mandatory', detail:''});
      }
      
      // this.refreshData();
      this.isInvalid = true;
      
    }
  }

  onchangeObject()
  {
    console.log("test:" , this.data.ObjectIds);
  }

  getitembarcode(event,WarehouseId) {
    

    if (event.query.length > 2  ) {
      this.OfferService.getItem(event.query,WarehouseId)
        .subscribe(result => {
          this.barcodeList = result;
        
          console.log('this.barcodeList :', this.barcodeList);
        });
    }

  }

  onmodelChange(ItemId) {
    
    this.radiobtn = true;
    // this.selectedItem = this.selectedItem;
    // this.selectedItem = ItemId;
    console.log(this.selectedItem);
    console.log(this.selectedItem.Barcode);
    console.log(this.selectedItem.itemBaseName);

  }
  onChange(ItemId)
  {
    
    this.barcode = this.selectedItem;
    this.selectedItem = ItemId;
    this.selectedItem.UOM = this.barcode.UOM;
  }
  
  onEventTypeAmount() {
    this.amt = true;
    this.weight = false;
    this.qty = false;
  }
  onEventTypeWeight(selectedItem) {
    
    this.amt = false;
    this.weight = true;
    this.qty = false;
    selectedItem.UOM = selectedItem.UOM;
  }
  onEventTypeQuantity() {
    this.amt = false;
    this.weight = false;
    this.qty = true;
  }
  discountOn(WarehouseId,DiscountOn,data)
  {
    
    if(DiscountOn == 'Percentage')
    {
      this.savebtn = true;
    this.percentage = true;
    this.walletpoint = false;
   
      data.BillAmount = '';
      data.MaxBillAmount = '';
      data.FreeWalletPoint = '';
    }
    else{
      this.savebtn = true;
      this.walletpoint = true;
      this.percentage = false;
      data.DiscountPercentage = '';
      data.BillAmount = '';
      data.MaxBillAmount = '';
    }
  }

  save(data,WarehouseId,selectedItem,itemslaveOfferForm)
  {
    
   if(data.OfferOn != 'ItemMarkDown')
  {
    if(data.BillDiscountOfferOn == 'Percentage')
    {
        if(itemslaveOfferForm.form.status == "VALID")
        {
          if(data.Weight != null)
          {
            data.FreeOfferType = data.Weight;
          }
          else if(data.Amount != null)
          {
            data.FreeOfferType = data.Amount;
          }
          else if(data.Quantity != null)
          {
            data.FreeOfferType = data.Quantity;
          }
          if(data.OfferOn == 'ItemPost')
          {
            this.ItemId = selectedItem.ItemId;
            this.ItemName =  selectedItem.itemname;
            this.Number = selectedItem.Number;
            this.UOM = selectedItem.UOM;
          }      
                  this.distributerOffer ={
                    OfferId : null,
                    Description:data.Description,
                    WarehouseId : WarehouseId,
                    CityId : null,
                    OfferName : data.OfferName,
                    OfferCode : '',  
                    OfferCategory : '',  
                    FreeOfferType : data.FreeOfferType,  
                    OfferOn : data.OfferOn , 
                    MinOrderQuantity : null,
                    NoOffreeQuantity : null,
                    // itemId : selectedItem.ItemId,
                    // itemname : selectedItem.itemname,
                    itemId : this.ItemId,
                    itemname : this.ItemName,
                    FreeItemId : null,
                    start : data.start,
                    end  : data.end,
                    QtyAvaiable : null,
                    QtyConsumed : null,
                    FreeItemName : '',
                    FreeWalletPoint : data.FreeWalletPoint,
                    OfferWithOtherOffer : false,
                    DiscountPercentage : data.DiscountPercentage,
                    BillAmount : data.BillAmount,
                    MaxBillAmount : data.MaxBillAmount,
                    MaxDiscount : data.MaxDiscount,
                    LineItem : null,
                    IsDeleted : false,
                    IsActive : data.IsActive,
                    CreatedDate : null,
                    UpdateDate : null,
                    BillDiscountOfferOn : data.BillDiscountOfferOn,   
                    BillDiscountWallet : data.BillDiscountWallet,
                    OffersaleQty : data.OffersaleQty,
                    BillDiscountType : '',
                    OfferAppType : '',
                    ApplyOn : '',
                    WalletType : data.WalletType,
                    DistributorOfferType : false,
                    ItemNumber : this.Number,
                    UOM : this.UOM
                    
                  }
                  this.blocked = true;
                  
                  this.OfferService.save(this.distributerOffer).subscribe(x=>
                    {
                      
                      this.blocked = false;
                      console.log('x:',x);
                      if(x==true)
                      {
                        this.messageService.add({severity:'success', summary: 'Added Offer Successfully!', detail:''});
                        this.btnsave = true;
                        // this.router.navigateByUrl('layout/DistributerOffer/DistributerOffer');
                      }
                      else if(x==false)
                      {
                        this.messageService.add({severity:'error', summary: 'Already Offer is added in This Item!', detail:''});
                        // this.router.navigateByUrl('layout/DistributerOffer/DistributerOffer');
                      }
                      
                      
                    })
                  console.log('data:',data);
        }
        else{
          this.isInvalid = true;
        }
     }
    if(data.BillDiscountOfferOn == 'Amount')
    {
        if(itemslaveOfferForm.form.status == "VALID")
    {
      if(data.Weight != null)
      {
        data.FreeOfferType = data.Weight;
      }
      else if(data.Amount != null)
      {
        data.FreeOfferType = data.Amount;
      }
      else if(data.Quantity != null)
      {
        data.FreeOfferType = data.Quantity;
      }
      if(data.OfferOn == 'ItemPost')
      {
        this.ItemId = selectedItem.ItemId;
        this.ItemName =  selectedItem.itemname;
        this.Number = selectedItem.Number;
        this.UOM = selectedItem.UOM;
      }      
              this.distributerOffer ={
                OfferId : null,
                Description:data.Description,
                WarehouseId : WarehouseId,
                CityId : null,
                OfferName : data.OfferName,
                OfferCode : '',  
                OfferCategory : '',  
                FreeOfferType : data.FreeOfferType,  
                OfferOn : data.OfferOn , 
                MinOrderQuantity : null,
                NoOffreeQuantity : null,
                // itemId : selectedItem.ItemId,
                // itemname : selectedItem.itemname,
                itemId : this.ItemId,
                itemname : this.ItemName,
                FreeItemId : null,
                start : data.start,
                end  : data.end,
                QtyAvaiable : null,
                QtyConsumed : null,
                FreeItemName : '',
                FreeWalletPoint : data.FreeWalletPoint,
                OfferWithOtherOffer : false,
                DiscountPercentage : data.DiscountPercentage,
                BillAmount : data.BillAmount,
                MaxBillAmount : data.MaxBillAmount,
                MaxDiscount : data.MaxDiscount,
                LineItem : null,
                IsDeleted : false,
                IsActive : data.IsActive,
                CreatedDate : null,
                UpdateDate : null,
                BillDiscountOfferOn : data.BillDiscountOfferOn,   
                BillDiscountWallet : data.BillDiscountWallet,
                OffersaleQty : data.OffersaleQty,
                BillDiscountType : '',
                OfferAppType : '',
                ApplyOn : '',
                WalletType : data.WalletType,
                DistributorOfferType : false,
                ItemNumber : this.Number,
                UOM : this.UOM
              }
              this.blocked = true;
              this.OfferService.save(this.distributerOffer).subscribe(x=>
                {
                  
                  this.blocked = false;
                  console.log('x:',x);
                  if(x==true)
                  {
                    this.messageService.add({severity:'success', summary: 'Added Offer Successfully!', detail:''});
                  this.btnsave = true;
                    // this.router.navigateByUrl('layout/DistributerOffer/DistributerOffer');
                  }
                  else if(x==false)
                  {
                    this.messageService.add({severity:'error', summary: 'Already Offer is added in This Item!', detail:''});
                    // this.router.navigateByUrl('layout/DistributerOffer/DistributerOffer');
                  }
                  
                  
                })
              console.log('data:',data);
    }
    else{
      this.isInvalid = true;
    }
    }
    if(this.savebtn == true && this.itemSavebtn == true)
    {
    // if(itemslaveOfferForm.form.status == "VALID")
    // {
      if(data.Weight != null)
      {
        data.FreeOfferType = data.Weight;
      }
      else if(data.Amount != null)
      {
        data.FreeOfferType = data.Amount;
      }
      else if(data.Quantity != null)
      {
        data.FreeOfferType = data.Quantity;
      }
      if(data.OfferOn == 'ItemPost')
      {
        this.ItemId = selectedItem.ItemId;
        this.ItemName =  selectedItem.itemname;
        this.Number = selectedItem.Number;
        this.UOM = selectedItem.UOM;
      }      
              this.distributerOffer ={
                OfferId : null,
                Description:data.Description,
                WarehouseId : WarehouseId,
                CityId : null,
                OfferName : data.OfferName,
                OfferCode : '',  
                OfferCategory : '',  
                FreeOfferType : data.FreeOfferType,  
                OfferOn : data.OfferOn , 
                MinOrderQuantity : null,
                NoOffreeQuantity : null,
                // itemId : selectedItem.ItemId,
                // itemname : selectedItem.itemname,
                itemId : this.ItemId,
                itemname : this.ItemName,
                FreeItemId : null,
                start : data.start,
                end  : data.end,
                QtyAvaiable : null,
                QtyConsumed : null,
                FreeItemName : '',
                FreeWalletPoint : data.FreeWalletPoint,
                OfferWithOtherOffer : false,
                DiscountPercentage : data.DiscountPercentage,
                BillAmount : data.BillAmount,
                MaxBillAmount : data.MaxBillAmount,
                MaxDiscount : data.MaxDiscount,
                LineItem : null,
                IsDeleted : false,
                IsActive : data.IsActive,
                CreatedDate : null,
                UpdateDate : null,
                BillDiscountOfferOn : data.BillDiscountOfferOn,   
                BillDiscountWallet : data.BillDiscountWallet,
                OffersaleQty : data.OffersaleQty,
                BillDiscountType : '',
                OfferAppType : '',
                ApplyOn : '',
                WalletType : data.WalletType,
                DistributorOfferType : false,
                ItemNumber : this.Number,
                UOM : this.UOM
              }
              this.blocked = true;
              this.OfferService.save(this.distributerOffer).subscribe(x=>
                {
                  
                  this.blocked = false;
                  console.log('x:',x);
                  if(x==true)
                  {
                    this.messageService.add({severity:'success', summary: 'Added Offer Successfully!', detail:''});
                    // this.router.navigateByUrl('layout/DistributerOffer/DistributerOffer');
                    this.btnsave = true;
                  }
                  else if(x==false)
                  {
                    this.messageService.add({severity:'error', summary: 'Already Offer is added in This Item!', detail:''});
                    // this.router.navigateByUrl('layout/DistributerOffer/DistributerOffer');
                  }
                  
                  
                })
              console.log('data:',data);
    // }
    // else{
    //   this.isInvalid = true;
    // }
    }
  }
  else
  {
   
    
    var objId=[]
    data.ObjectIds.forEach(element => {
      objId.push(element.Id);
    });  
    this.distributerOffer ={
      OfferId : null,
      Description:data.Description,
      WarehouseId : WarehouseId,
      CityId : null,
      OfferName : data.OfferName,
      OfferCode : '',  
      OfferCategory : '',  
      FreeOfferType : data.FreeOfferType,  
      OfferOn : data.OfferOn , 
      MinOrderQuantity : null,
      NoOffreeQuantity : null,     
      itemId : this.ItemId,
      itemname : this.ItemName,
      FreeItemId : null,
      start : data.start,
      end  : data.end,
      QtyAvaiable : null,
      QtyConsumed : null,
      FreeItemName : '',
      FreeWalletPoint : data.FreeWalletPoint,
      OfferWithOtherOffer : false,
      DiscountPercentage : data.DiscountPercentage,
      BillAmount : data.BillAmount,
      MaxBillAmount : data.MaxBillAmount,
      MaxDiscount : data.MaxDiscount,
      LineItem : null,
      IsDeleted : false,
      IsActive : data.IsActive,
      CreatedDate : null,
      UpdateDate : null,
      BillDiscountOfferOn : data.BillDiscountOfferOn,   
      BillDiscountWallet : data.BillDiscountWallet,
      OffersaleQty : data.OffersaleQty,
      BillDiscountType : data.BillDiscountType,
      OfferAppType : '',
      ApplyOn : '',
      WalletType : data.WalletType,
      DistributorOfferType : false,
      ItemNumber : this.Number,
      UOM : this.UOM,
      ObjectIds:objId,
      ApplyType:data.ApplyType
    }
    this.blocked = true;
    this.OfferService.save(this.distributerOffer).subscribe(x=>
      {       
        this.blocked = false;       
        if(x==true)
        {
          this.messageService.add({severity:'success', summary: 'Added Offer Successfully!', detail:''});          
          this.btnsave = true;
        }
        else if(x==false)
        {
          this.messageService.add({severity:'error', summary: 'Already Offer is added in This Item!', detail:''});         
        }        
        
      })

  }

  }

  update(data,row)
  {
    
    
    this.distributerUpdateDC ={
      start : data.start,
      end : data.end,
      IsActive : data.IsActive,
      itemId : data.itemId,
      itemname : data.itemname,
      WarehouseId : data.WarehouseId,
      OfferCode : data.OfferCode      
    }
    console.log('distributerUpdateDC:',this.distributerUpdateDC);
    // this.blocked = true;
    this.OfferService.update(this.distributerUpdateDC).subscribe(x=>
      {
        // this.blocked = false;
        console.log('x:',x);
        
        if(x==true)
        {
          this.messageService.add({severity:'success', summary: 'updated Offer Successfully!', detail:''});
          this.btnsave = true;
          // this.router.navigateByUrl('layout/DistributerOffer/DistributerOffer');
          // this.refreshParent.emit(false);
        }
        
      })
    console.log('data:',data);
  }

  onCancel()
  {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/DistributerOffer/DistributerOffer');
  }

  maxDiscount(itempostOfferForm,data)
  {
    
    if(data.MaxDiscount == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.data.MaxDiscount = '';
      this.isInvalid = true;
      this.validForm = true;
    }
    else if(data.MaxDiscount < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.data.MaxDiscount = '';
      this.isInvalid = true;
      this.validForm = true;
    }
    else
    {
    if(data.Amount != null || data.Weight != null || data.Quantity != null)
    {
    if(itempostOfferForm.form.status == "VALID")
    {
      this.savebtn = true;
      this.itemSavebtn = true;
      // this.save(data,this.WarehouseId,this.selectedItem,this.itemslaveOfferFormm)
    }
  }
    else{
      if(data.Amount == null || data.Weight == null || data.Quantity == null)
      {
        this.messageService.add({severity:'error', summary:  'Select Any one Amount or Weight or Quantity', detail:''});
      }
      
      this.isInvalid=true;
    }
  }
    
  }

  amountValidationQty(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormQty = true;
      this.data.OffersaleQty = '';
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormQty = true;
      this.data.OffersaleQty = '';
    }
  }
  amountValidationWeight(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormWeight = true;
      this.data.BillDiscountWallet = '';
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormWeight = true;
      this.data.BillDiscountWallet = '';
    }
  }
  amountValidationAmt(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.data.MaxBillAmount = '';
      this.isInvalid = true;
      this.validFormAmt = true;
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.data.MaxBillAmount = '';
      this.isInvalid = true;
      this.validFormAmt = true;
    }
  }
  itemslaveValidationMin(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormMin = true;
      this.data.BillAmount = '';
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormMin = true;
      this.data.BillAmount = '';
    }
  }
  itemslaveValidationMax(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormMax = true;
      this.data.MaxBillAmount = '';
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormMax = true;
      this.data.MaxBillAmount = '';
    }
  }
  itemslaveValidationPer(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.data.DiscountPercentage = '';
      this.isInvalid = true;
      this.validFormPer = true;
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.data.DiscountPercentage = '';
      this.isInvalid = true;
      this.validFormPer = true;
    }
  }

  itemslaveValidationAtmin(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormMinlt = true;
      this.data.BillAmount = '';
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormMinlt = true;
      this.data.BillAmount = '';
    }
  }
  itemslaveValidationAtmax(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormMaxlt = true;
      this.data.MaxBillAmount = '';
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.isInvalid = true;
      this.validFormMaxlt = true;
      this.data.MaxBillAmount = '';
    }
  }
  itemslaveValidationAt(data)
  {
    
    if(data == 0)
    {
      this.messageService.add({severity:'error', summary:  'Zero Value is not Acceptable', detail:''});
      this.data.FreeWalletPoint = '';
      this.isInvalid = true;
      this.validFormAmtwp = true;
    }
    else if(data < 0 )
    {
      this.messageService.add({severity:'error', summary:  'Negative Value is not Acceptable', detail:''});
      this.data.FreeWalletPoint = '';
      this.isInvalid = true;
      this.validFormAmtwp = true;
    }
  }
  
}
