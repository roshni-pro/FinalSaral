import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { MessageService } from 'primeng/api';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { StoreService } from 'app/store/services/store.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConfirmationService } from 'primeng/api'
import { element } from 'protractor';
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  constructor(private customerService: CustomerService, private cityService: CityService, private _Service: SalesAppServiceService,
    private messageService: MessageService, private storeservice: StoreService, private confirmationService: ConfirmationService ,private router: Router) { }
    Datafilter: any;
    CityId: any;
    cityList: any[];
    masterwarehouseList: any[];
    masterStoreList: any[];
    ItemList: [];
    ItemListShow:any[]=[];
    ItemListObj:any={};
    AddItemList: any[] = [];
    Searchby: any;
    item: any
    itemName: any
    display: boolean
    itemdata: any
    cols: any[];
    index = 0;
    copyitem: boolean = false
    data: any
    DatafilterWareHouse: any;
    DatafilterStore: any;
    ActiveStatus:string
    showList:boolean=false
    showData:boolean=false
  ngOnInit() {
    this.cityService.GetAllCity().subscribe(result => {
      this.cityList = result;
  })
  }
  GetWareHouse() {
    this.customerService.getWareHouseByCity(this.CityId.Cityid).subscribe(x => {
      this.masterwarehouseList = x
    })
  }
  getItemList(event)
  {
     this._Service.GetItemNamePromotions(this.DatafilterWareHouse.WareHouseId,event.query)
       .subscribe(result => {
         this.ItemList = result;
         if (this.ItemList == null || this.ItemList == undefined || this.ItemList.length == 0) {
           this.showError("No Item Found");
         }
       });
   }
   showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });

  }
  GetItemList()
  {
    this._Service.getItemPromotionList(this.DatafilterWareHouse.WareHouseId).subscribe(res=>
      {
        if(res.Data!=null)
        {
          this.ItemListShow=res.Data      
          console.log(this.ItemListShow,"ItemListShow");
               
           this.showList=true
        // this.ItemListShow.forEach(res=>
        //   {
        //     if(res.IsActive==true)
        //     {
        //       res.ActiveStatus='Active'
        //     }
        //     else
        //     {
        //       res.ActiveStatus='InActive'
        //     }
        //   })
        }
      }
   )
  }
  confirm1(rowData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Remove(rowData);
      },
      reject: () => {
        this.showError('You have cancelled');
      }
    });
  }
  Remove(rowData) {
    if(rowData.Id==null)
    {
       this.ItemListShow=this.ItemListShow.filter(x=>x.Id!=null)
    }
    else
    {
    this._Service.RemoveNew(rowData.Id).subscribe(res => {
      this.showSuccessfull("Item Deleted");
      //this.GetItemList();
      this.ItemListShow=this.ItemListShow.filter(x=>x.Id!=rowData.Id);
    })
  }
  }
 
  AddItems() {  
    
    this.ItemListShow.forEach((element:any,index) => {
      element.Sequence= index + 1;
    });
    this._Service.AddItemListPromotions(this.ItemListShow).subscribe(res => {
      if(res!=null)
      {
        this.showSuccessfull("Updated List");
        this.GetItemList()
      }
    })
  }
  back()
  {
    this.router.navigateByUrl("layout/salesApp/productCatalogeMainComponent") 
  }

  onSelectItemPromotion(obj :any) {
    this.data = {
      ItemNumber: obj.ItemNumber,
      ItemName: obj.ItemName,
      SellingPrice: obj.SellingPrice,
      Margin: obj.Margin,
      WarehouseId: obj.WarehouseId,
      SequenceNo: 1,
      Id:null,
      IsActive:obj.IsActive,
      ActiveStatus:obj.ActiveStatus,
      IsPromotional:true,
      StoreId:obj.StoreId,
      StoreName:obj.StoreName,
      Sequence:0
    };
    this.ItemListShow.forEach(x=>
      {
        if(x.ItemNumber==this.data.ItemNumber)
        {
        this.showData=true
        }
      })
    if (this.ItemListShow.length > 0) {
      var fldata = this.ItemListShow.filter(x => {
        if (x.ItemId == obj.ItemId || x.ItemId == obj.ItemId) { this.showError("Item already exists"); }
      }
      );
      if (fldata.length != 0) {
        this.showError("item already added");
        this.Searchby = "";
        this.copyitem = true
      } else {
        if(!this.showData)
        {
          this.ItemListShow.unshift(this.data)
          // this.AddDetails(Warehouse.WarehouseId);
          this.Searchby = "";
          this.copyitem = false
        }
        else
        {
          this.showData=false
          this.showError("Item Already Exist")
        }
        
      }
    }
    else {
      if (this.ItemListShow.length >= 20) { this.showError("Max limit 20"); }
      else { 
        if(fldata != undefined){
          this.showError("item already added");
          this.Searchby = "";
          this.copyitem = true  
        }else{
          this.ItemListShow.unshift(this.data)
          // this.AddDetails(Warehouse.WarehouseId);
          this.Searchby = "";
          this.copyitem = false
        }
      }
    }
  }
  }


