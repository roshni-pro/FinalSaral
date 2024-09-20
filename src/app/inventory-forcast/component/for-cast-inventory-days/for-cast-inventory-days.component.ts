import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { isThisQuarter } from 'date-fns';
import { ConfirmationService, MessageService } from 'primeng/primeng';
import { StoreService } from 'app/store/services/store.service';
@Component({
  selector: 'app-for-cast-inventory-days',
  templateUrl: './for-cast-inventory-days.component.html',
  styleUrls: ['./for-cast-inventory-days.component.scss']
})
export class ForCastInventoryDaysComponent implements OnInit {
  masterwarehouseList: any[] = [];
  selectedwarehouse: any
  CategoryList: any[] = [];
  selectedCatregory: any[] = [];
  subCatList: any[] = [];
  brandList: any[] = [];
  subcat:[]
  selectedSubCat: any[] = [];
  selectedSubsubCatregory: any[] = [];
  subsubcat:any;
  selectedBrandId: any[];
  ItemPerPage: any;
  PageNo: any;
  listData:any;
  TotalRecord:any;
  sample_file = [];
  blocked:any;
  allStoreList:any
  totalcountt:any
  ExportrestrictData:any
  selectedpopupStore:any
  exportpopup:boolean=false
  wid:any[]=[]
  selectedWare:any
  r:any
  entity : any;
  getRoleData: any;
  regionSourcingRole: any;
  hqMasterRole: any;

  constructor(private warehouseservice: WarehouseService,private API_Service: InventoryforcastserService,private msg:MessageService,private confirmationService: ConfirmationService,
    private StoreServicee:StoreService,  private exportService: ExportServiceService) 
    { this.entity= "ForecastInventoryDay"; }

  ngOnInit() {

    this.getRoleData = (localStorage.getItem('role')).split(',');
    var regionSourcing = 'Region Sourcing lead';
    var HQMaster = 'HQ Master login';    
    this.regionSourcingRole = this.getRoleData.find(x => x == regionSourcing);
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster);

    this.getWarehouse();
    this.GetAllstore();
    this.getCategory();
    this.load(event);

  }

  getWarehouse() {
    this.warehouseservice.GetAllWarehouseWithoutKpp().subscribe(result => {
      this.masterwarehouseList = result;
    });
  }

  getCategory() {
    this.API_Service.getAllCategories().subscribe(result => {
      this.CategoryList = result;
    });
  }

  // getSubCatList(categories) {
  //   this.subCatList = [];
  //   this.brandList = [];
  //   if (categories && categories.length) {
  //     this.subcat = [];
  //     this.subcat = categories.map(function (elem) {
  //       return elem.CategoryId ? elem.CategoryId : elem
  //     });
  //     this.blocked = true;
  //     this.API_Service.getSubCategories(this.subcat).subscribe(result => {
  //       //console.log('subCatList', result);
  //       this.subCatList = result;
  //       this.blocked = false;
  //     });
  //   }
  // }

  // getBrandsnew(subcategories) {
  //   this.brandList = [];
  //   this.selectedSubsubCatregory = [];
  //   if (subcategories && subcategories.length) {
  //     this.subsubcat = [];
  //     this.subsubcat = subcategories.map(function (elem) {
  //       return elem.SubCategoryId ? elem.SubCategoryId : elem
  //     });

  //     const payload = {
  //       categoryId : this.subcat,
  //       subcategoryId : this.subsubcat
  //     }
  //     this.blocked = true;
  //     this.API_Service.getSubSubCatList(payload).subscribe(result => {
  //       //console.log('test', result);
  //       this.brandList = result;
  //       this.blocked = false;
  //     });
  //   }
  // }

  searchResult(){
    if(this.selectedwarehouse==null || this.selectedwarehouse ==undefined )//&& this.selectedwarehouse.length==0
    {
      this.showError("Please Select Warehouse")
      return false;
    }
    if(this.selectedStore==null || this.selectedwarehouse ==undefined)// this.selectedStore.length==0
    {
      this.showError("Please Select Store")
      return false;
    }
    this.load(event);
  }
  updateitem(item)
  {
    // console.log(item,item.InventoryDays ,item.WarehouseId, item.storeid, item.subcatid, item.subsubcatid , item.br,item.cid);
    var NoOfInventoryDays =item.InventoryDays  
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      
      accept: () => {
        // this.blocked=true
        this.API_Service.InventoryDaysRestrictionUpdate(NoOfInventoryDays,item.WarehouseId, item.storeid, item.subcatid, item.subsubcatid, item.Id, item.BrandName,item.cid,item.SafetyDays).subscribe(x=>{
        console.log("x",x);
        alert(x)
        this.SIdd=[]
        this.selectedStore?this.selectedStore.forEach(x=>
        {
          this.SIdd.push(x.Id)
        }):this.SIdd=[]
        if(this.selectedwarehouse) this.selectedWarehouseId.push(this.selectedwarehouse.WarehouseId)
        const payload = {
          warehouseIds:this.selectedwarehouse ? this.selectedWarehouseId : [],
          StoreIds:this.selectedStore ? this.SIdd : [],
          BrandName:this.selectedBrand ? this.selectedBrand : "",
          skip:this.PageNo || 1,
          take:this.ItemPerPage || 10
        }
        // {"warehouseIds":[1],"StoreIds":[1,2,4,3],"BrandName": "Parle's","skip":1,"take":10}
        console.log(payload);
        this.blocked = true;
        this.API_Service.GetItemForecastInventory(payload).subscribe(res => {
          console.log(res);
          this.listData= res.ItemForecastInventoryDaysResponses;
          this.TotalRecord= res.Total_Record;
          this.blocked = false;
          this.selectedWarehouseId=[]
        })
      })     
      },
      reject: () => {
        this.SIdd=[]
        this.selectedStore?this.selectedStore.forEach(x=>
        {
          this.SIdd.push(x.Id)
        }):this.SIdd=[]
        if(this.selectedwarehouse) this.selectedWarehouseId.push(this.selectedwarehouse.WarehouseId)
        const payload = {
          warehouseIds:this.selectedwarehouse ? this.selectedWarehouseId : [],
          StoreIds:this.selectedStore ? this.SIdd : [],
          BrandName:this.selectedBrand ? this.selectedBrand : "",
          skip:this.PageNo || 1,
          take:this.ItemPerPage || 10
        }
        // {"warehouseIds":[1],"StoreIds":[1,2,4,3],"BrandName": "Parle's","skip":1,"take":10}
        console.log(payload);
        this.blocked = true;
        this.API_Service.GetItemForecastInventory(payload).subscribe(res => {
          console.log(res);
          this.listData= res.ItemForecastInventoryDaysResponses;
          this.TotalRecord= res.Total_Record;
          this.blocked = false;
          this.selectedWarehouseId=[]
        })
      }
    });
  }

  Exporttt()
  {
    if(this.selectedWare==undefined)
    {
      this.showError("Please select warehouse")
    }
    else 
    {
      this.wid=[]
      this.selectedWare.forEach(x=>
      {
        this.wid.push(x.WarehouseId)
      })
        const exportpayload =
        {
          "warehouseIds" : this.wid,
          "StoreIds" : [],
          "BrandName":"",
          'skip': this.PageNo || 1,
          'take': this.totalcounttt
        }
        this.blocked=true;
        this.API_Service.GetItemForecastInventory(exportpayload).subscribe(x=>
          {
            console.log(x);
            
            this.r=x
            this.ExportrestrictData=this.r.ItemForecastInventoryDaysResponses
            this.blocked=false;
            var exportData=[];
            for (var i in this.ExportrestrictData) {
              var selectedFields = {
                Store: this.ExportrestrictData[i].StoreName,
                Category:this.ExportrestrictData[i].CateName,
                SubCateName: this.ExportrestrictData[i].SubCateName,
                BrandName:this.ExportrestrictData[i].BrandName,
                CurrentAvgInvDays: this.ExportrestrictData[i].CalculateInventoryDays,
                NoofInventoryDays:this.ExportrestrictData[i].InventoryDays,
            }
            exportData.push(selectedFields);    
            this.blocked=false;      
            }
            if(this.ExportrestrictData && this.ExportrestrictData.length > 0)
            {
              this.exportService.exportAsExcelFile(exportData,"Export RestrictData")
              this.blocked=false;
            }
            else
            {
              this.showError('No Data Found!');
              this.blocked=false;
            }       
          })
// -------------------------  
    }
    console.log(this.selectedpopupStore);    
  }

  Exportpopupbtn(){
    this.exportpopup=true;
  }

  totalcounttt:any
  onchangewareexport()
  {
    this.wid=[]
    this.selectedWare.forEach(x=>
    {
      this.wid.push(x.WarehouseId)
    })
    const payload =
    {
      "warehouseId" : this.wid,
      "Stores" : [],
      "SearchKey":"",
      'skip': this.PageNo || 1,
      'take': this.ItemPerPage || 500,
    }
    // {"warehouseId":[1],"Stores":[],"SearchKey":"Y","skip":1,"take":10}
    this.API_Service.InventoryRestrictionGet(payload).subscribe(x=>
    {
      console.log(x);
      this.totalcounttt=x.TotalRecord
    })
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

  GetAllstore()
  {
    this.StoreServicee.GetStoreList().subscribe((res) => {
      this.allStoreList = res;
    })
  }

  SIdd:any[]=[]
  selectedWarehouseId:any=[];
  load(event){

    if(event != undefined){
      var Last = event.first ? event.first + event.rows : 10
      this.ItemPerPage = event.rows
      this.PageNo = Last / event.rows
    }
    if(this.selectedwarehouse==null || this.selectedwarehouse ==undefined )//&& this.selectedwarehouse.length==0
    {
      //this.showError("Please Select Warehouse")
      return false;
    }
    if(this.selectedStore==null || this.selectedwarehouse ==undefined)// this.selectedStore.length==0
    {
      //this.showError("Please Select Store")
      return false;
    }
    // if (this.selectedSubsubCatregory.length > 0) {
    //   this.selectedBrandId = this.selectedSubsubCatregory.map(function (e) {
    //     return e.BrandId ? e.BrandId : e
    //   })
    // }
    // if(this.selectedwarehouse.length > 0){
    //   this.selectedWarehouseId = this.selectedwarehouse.map(function (e) {
    //     return e.WarehouseId ? e.WarehouseId : e
    //   })
    // }
  
     if(this.selectedwarehouse!=0 && this.selectedStore!=0)
    {
      this.SIdd=[]
      this.selectedStore?this.selectedStore.forEach(x=>
      {
        this.SIdd.push(x.Id)
      }):this.SIdd=[]
      if(this.selectedwarehouse) this.selectedWarehouseId.push(this.selectedwarehouse.WarehouseId)
      const payload = {
        warehouseIds:this.selectedwarehouse ? this.selectedWarehouseId : [],
        StoreIds:this.selectedStore ? this.SIdd : [],
        BrandName:this.selectedBrand ? this.selectedBrand : "",
        skip:this.PageNo || 1,
        take:this.ItemPerPage || 10
      }
      // {"warehouseIds":[1],"StoreIds":[1,2,4,3],"BrandName": "Parle's","skip":1,"take":10}
      console.log(payload);
      this.blocked = true;
      this.API_Service.GetItemForecastInventory(payload).subscribe(res => {
        console.log(res);
        this.listData= res.ItemForecastInventoryDaysResponses;
        this.TotalRecord= res.Total_Record;
        this.blocked = false;
        this.selectedWarehouseId=[]
      })
    }
  }

  selectedItem:any
  isHistoryOpen:boolean=false
  History(item)
  {
    console.log(item);
    this.selectedItem=item
    this.isHistoryOpen=true
  }

  selectedStore:any
  selectedBrand:any
  clear(){
    this.selectedwarehouse = null;
    this.selectedCatregory = null;
    this.selectedSubCat = null;
    this.selectedSubsubCatregory = null;
    this.selectedStore=null;
    this.selectedBrand=null;

    // const payload = {
    //   warehouseIds:[],
    //   StoreIds:[],
    //   BrandName:null,
    //   skip:0,
    //   take:0
    // }
    // this.blocked = true;
    // this.API_Service.GetItemForecastInventory(payload).subscribe(res => {
    //   // console.log(res);
    //   this.listData= res.ItemForecastInventoryDaysResponses;
    //   console.log("this.listData==",this.listData);
      
    //   this.TotalRecord= res.Total_Record;
    //   this.blocked = false;
    // })
  }
  downloaddata:any;

  downloadSample()
  {
    const payload = {
      warehouseIds:[],
      StoreIds:[],
      BrandName:null,
      skip:0,
      take:0
    }
    console.log(payload);
    this.blocked = true;
    debugger;
    this.API_Service.GetItemForecastInventory(payload).subscribe((res:any) => {
      console.log("res===",res);
      const exportArry: any[] = res.ItemForecastInventoryDaysResponses.map((x: any) => ({
        Id:x.Id,
        StoreName:x.StoreName,
        WarehouseName:x.WarehouseName,
        CateName:x.CateName,
        SubCateName:x.SubCateName,
        BrandName:x.BrandName,
        CalculateInventoryDays:x.CalculateInventoryDays,
        InventoryDays:x.InventoryDays,
        SafetyDays:x.SafetyDays
        
            }));
      this.exportService.exportAsExcelFile(exportArry,"ExportFile")
      this.blocked = false;
    })
  }


  onUpload(event, uploadCustom) {
    const files = event.files[0];
    console.log(files);

    let file = new FormData();
    file.append("file", files)

    this.blocked = true;
    this.API_Service.ForecastInventoryDaysRestrictionUploadFile(file).subscribe((res) => {
      console.log(res);
      if(res){
        alert(res)
        window.location.reload();
      }
      //window.location.reload();
      this.blocked = false;     
      
    //   const payload = {
    //     warehouseIds:[],
    //     StoreIds:[],
    //     BrandName:null,
    //     skip:0,
    //     take:0
    //   }
    //   this.blocked = true;
    //   this.API_Service.GetItemForecastInventory(payload).subscribe(res => {
    //     console.log(res);
    //     this.listData= res.ItemForecastInventoryDaysResponses;
    //     this.TotalRecord= res.Total_Record;
    //     this.blocked = false;
    //   })
    // },
    //   (err) => {
    //     console.log(err);
    //     this.blocked = false;
    })
  }
}
