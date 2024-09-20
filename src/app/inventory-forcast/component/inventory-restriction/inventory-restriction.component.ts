import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { StoreService } from 'app/store/services/store.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-inventory-restriction',
  templateUrl: './inventory-restriction.component.html',
  styleUrls: ['./inventory-restriction.component.scss']
})
export class InventoryRestrictionComponent implements OnInit {

  constructor(private warehouseService: WarehouseService, private msg:MessageService, private API_Service: InventoryforcastserService,
    private StoreServicee:StoreService,private exportService: ExportServiceService) {  }
  WareHouseList:any[]=[]
  isSearch:boolean=false
  warehouseid:any
  selectedWareHouse:any
  selectedStore:any
  selectedBrand:any
  allStoreList:any
  exportpopup:boolean=false
  selectedWare:any
  selectedpopupStore:any

  ngOnInit() {
    this.PageNo = 1;
    this.ItemPerPage = 50;
    this.GetAllWarehouses();
    this.GetAllstore();
  }

  GetAllWarehouses()
  {
    this.warehouseService.GetAllWarehouse().subscribe(result=>{
      console.log(result);
      this.WareHouseList=result
    })
  }

  GetAllstore()
  {
    this.StoreServicee.GetStoreList().subscribe((res) => {
      this.allStoreList = res;
    })
  }


  toggleSearch(){
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
  }

  ItemPerPage: any;
  PageNo:any
  load(event)
  {
    // this.skip= event.first;
    // this.take= event.rows;
    if (event) {
      var Last = event.first ? event.first + event.rows : 50
      console.log("Last", Last);
      this.ItemPerPage = event.rows
      this.PageNo = Last / event.rows
      console.log("pagekspdojf",this.ItemPerPage,   this.PageNo );
    }
    this.Search();
  }
  
  SIdd:any[]=[]
  wid:any=[]
  totalcount:any
  restrictData:any
  Search()
  {
    if(this.selectedWareHouse==undefined)
    {
      this.showError("Please Select Warehouese First")
    }
    else if(this.selectedStore==undefined)
    {
      this.showError("Please select Store")
    }
    else{
      console.log(this.selectedStore);
      
      this.SIdd=[]
      this.selectedStore.forEach(x=>
        {
          this.SIdd.push(x.Id)
        })
        
        this.wid.push(this.selectedWareHouse.WarehouseId)
      const payload =
      {
        "warehouseId" : this.wid,
        "Stores" : this.SIdd,
        "SearchKey":this.selectedBrand==undefined ? "" : this.selectedBrand,
        'skip': this.PageNo || 1,
        'take': this.ItemPerPage || 50,
      }
      // {"warehouseId":[1],"Stores":[],"SearchKey":"Y","skip":1,"take":10}
      this.API_Service.InventoryRestrictionGet(payload).subscribe(x=>
        {
          console.log(x);
          this.restrictData=x.InventoryRestrictionList
          this.totalcount=x.TotalRecord
          this.wid=[]
        })
        
    }
    
  }
  updateinventorydaysBrand:any
  updateitem(data)
  {
    // alert(data)
    console.log(data);
    debugger;
    this.API_Service.InventoryRestrictionUpdate(data.ID,data.NoOfInvDays).subscribe(x=>{
      console.log(x);
      if(x.Status==true)
      {
        this.showSuccess(x.msg)
      }
      else{
        this.showError("Try again")
      }
    })
  }

  History(item)
  {
    alert("hsdichj")
  }
  Reset(){
    this.selectedStore=undefined
    this.selectedBrand=undefined
    this.selectedWareHouse=undefined
  }

  uploadpopup:boolean=false
  Uploadpopupbtn()
  {
    this.uploadpopup=true
  }
  DownloadSampleFile()
  {
    let arr = [];
    arr.push({
      'Store_Name':null, 
      ' Category_Name'	:null,
      ' Sub_Category_Name':null,
      ' Brand_Name'	:null,
      'No_Of_Inventory_Days_Name':null,
    })
  this.exportService.exportAsExcelFile(arr,"SampleFile InventoryRestriction")
  }

  // uploadFilebool:boolean=true
  // files:any
  // uploadFile(file) {
  //   this.uploadFilebool=true
  //   console.log(file.files[0])
  //   this.files=file.files[0]
  //   }


  Exportpopupbtn(){
    this.exportpopup=true;
  }
  totalcountt:any
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
      debugger;
      console.log(x);
      this.totalcountt=x.TotalRecord
    })
  }
  Exporttt()
  {
    debugger;
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
          "warehouseId" : this.wid,
          "Stores" : [],
          "SearchKey":"",
          'skip': this.PageNo || 1,
          'take': this.totalcountt
        }
        this.API_Service.InventoryRestrictionGet(exportpayload).subscribe(x=>
          {
            debugger;
            console.log(x);
            this.ExportrestrictData=x.InventoryRestrictionList
            // -------------------------
              this.blocked=false;
              this.r=x
              this.ExportrestrictData=this.r.InventoryRestrictionList
            this.blocked=false;
            var exportData=[];
            for (var i in this.ExportrestrictData) {
              var selectedFields = {
                Store: this.ExportrestrictData[i].Store,
                SubCateName: this.ExportrestrictData[i].SubCateName,
                BrandName:this.ExportrestrictData[i].BrandName,
                CurrentAvgInvDays: this.ExportrestrictData[i].CurrentAvgInvDays,
                NoOfInvDays:this.ExportrestrictData[i].NoOfInvDays,
            }
            exportData.push(selectedFields);
          
            }
            if(this.ExportrestrictData && this.ExportrestrictData.length > 0)
            {
              this.exportService.exportAsExcelFile(exportData,"Export EwayOrder Data")
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
  ExportrestrictData:any
  r:any
  blocked:boolean=false
  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }
  uploadFile(event)
  {
    console.log(event);
    
  }
}
