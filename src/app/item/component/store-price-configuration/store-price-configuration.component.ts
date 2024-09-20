import { Component, OnInit } from '@angular/core';
import { WarehouseQuadrantCustomerTypeServiceService } from 'app/item/services/warehouse-quadrant-customer-type-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-store-price-configuration',
  templateUrl: './store-price-configuration.component.html',
  styleUrls: ['./store-price-configuration.component.scss']
})
export class StorePriceConfigurationComponent implements OnInit {
  warehouseListData: any;
  isLoading: boolean = false;
  Type: any[]=[];
  WarehouseIds: any;
  SelecteItems: any[] = [];
  typeName: any;
  percentage: number;
  SelecteItem: any;
  WarehouseId: any;
  isShowAddPopup: boolean = false;
  Addselecteditem: any;
  first: number = 0;

  SearchHit: boolean = false;
  lo: boolean = false;
  items: any;
  totalRecords: number=0;
  itemList: any
  selecteditem: any
  allItem: any[];
  itemLists: any
  isShowEditPopup: boolean = false;
  EditWarehouseName: any
  EdititemName: any
  // Editpercentage: any;
  EditTypename: any;
  id: any
  constructor(private warehouseService: WarehouseQuadrantCustomerTypeServiceService,
    private messageService: MessageService, private confirmationService: ConfirmationService,private exportService: ExportServiceService) { }

  ngOnInit() {
    this.warehouseList();
    this.Type = [
      { value: 1, name: 'MRP Minus' },
      { value: 2, name: 'Unit Price Plus' },
    ]

  }



  warehouseList() {

    this.isLoading = true;
    this.warehouseService.GetWarehouse().subscribe(res => {
      if (res.length > 0) {
        this.warehouseListData = res;
        this.isLoading = false;
      } else {
        alert("No Data Found!");
        this.isLoading = false;
      }
    })
  }

  ForSearchHit() {
    this.SearchHit = true;
    this.first = 0;
    this.totalRecords = 0;
  }

  load(event) {
    this.lo = true;
    this.SearchList(event);
  }
 

  SearchList(event) {
    
    if ((this.WarehouseIds == undefined || this.WarehouseIds == null) && (this.lo == false || this.SearchHit == true)) { alert("Please Select Warehouse"); return false; }
    // else if ((this.selecteditem == undefined || this.selecteditem.length == 0)
    //  && (this.lo == false || this.SearchHit == true)) { alert("Please Select Item"); return false; }
    const payload = {
      "WarehouseId":this.WarehouseIds? this.WarehouseIds.value:0,
      "ItemmultimrpId": this.selecteditem?[this.selecteditem.ItemMultiMRPId]:[],
      "Skip": event.first ? event.first : 0,
      "Take": event.rows ? event.rows : 10
    }
    this.isLoading = true;
    this.warehouseService.GetStoreConfig(payload).subscribe((res: any) => {
      if (res.length > 0) {
        this.itemLists = res;
        this.isLoading = false;
        this.totalRecords = res[0].TotalCount;
        console.log(this.totalRecords, "totalRecords");
      } else {
        if (this.SearchHit) alert("No Data Found!");
        this.itemLists = [];
        this.totalRecords=0;
        this.isLoading = false;
      }

    })
  }

  saveAddItem() {
    
    if (this.WarehouseId == undefined || this.WarehouseId == null) { alert("Please Select Warehouse"); return false; }
    else if (this.Addselecteditem == undefined || this.Addselecteditem.length == 0) { alert("Please Select Item"); return false; }
    else if (this.typeName == undefined || this.typeName == null) { alert("Please Select Type"); return false; }
    else if (this.percentage == undefined || this.percentage == null) { alert("Please Select percentage"); return false; }
    else if(this.percentage < 1 || this.percentage >= 100  )
    {
      alert("Please enter a value greater than 0 and less than 100.");
      this.percentage=null
      return false;
    }
    const payload = {
      "WarehouseId": this.WarehouseId.value,
      "ItemmultimrpId": [this.Addselecteditem.ItemMultiMRPId],
      "Type": this.typeName.value,
      "Percentage": this.percentage
    }
    this.isLoading = true;
    this.warehouseService.AddnewStopConfig(payload).subscribe((res: any) => {
      alert(res);
      this.isLoading = false;
      this.isShowAddPopup = false;
      this.WarehouseId = [];
      this.Addselecteditem = [];
      this.typeName = [];
      this.percentage =0;
    })
  }
  // onKeyPres(event: any) {
  //   if ((this.percentage < 1 || this.percentage > 100 ) || event.key == '-' ){
  //     event.preventDefault(); 
  //     this.percentage=undefined;
  //   }
  // }
  // onKeyPress(event: any) {
  //   if ((this.Editpercentage < 1 || this.Editpercentage > 100 ) || event.key == '-' ){
  //     event.preventDefault(); 
  //     this.Editpercentage=undefined;
  //   }
  // }
  

  editPOPUP(data) {
    
    this.EditTypename=[];
    this.id = data.Id
    this.EditWarehouseName = data.WarehouseName;
    this.EdititemName = data.ItemName;
    this.Editpercentage = data.Percentage;
    this.Type.forEach((e:any)=>{
      if(e.name==data.Typename)
      this.EditTypename =e 
    })
    ;
    this.isShowEditPopup = true;

  }
  Editpercentage: number;
  
  saveEditItem() {
    
    if(this.Editpercentage < 1 || this.Editpercentage >= 100  )
    {
      alert("Please enter a value greater than 0 and less than 100.");
      this.Editpercentage=null
      return false;
    }
    this.warehouseService.Editstoreconfig(this.id, this.EditTypename.value, this.Editpercentage).subscribe((res: any) => {
      alert(res)
      this.isShowEditPopup = false
      this.SearchList(null);

    })
  }
  
  cancel() {
    this.WarehouseId = [];
    this.Addselecteditem = [];
    this.typeName = [];
    this.percentage = 0;
  }
  addStore() {
    this.isShowAddPopup = true;
  }


  getitemList(event) {
    if (event.query.length > 2) {
      this.warehouseService.Searchiteminstoreconfig(event.query).subscribe((res: any) => {
        this.itemList = [];
        this.allItem = res
        this.allItem.forEach(ele => {
          this.itemList.push({ 'Itemname': ele.Itemname, 'ItemMultiMRPId': ele.ItemMultiMRPId })
        });

      })
    }
  }


  deleteData(row) {
    this.SearchHit = false;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this concern?',
      accept: () => {
        this.isLoading = true;
        this.warehouseService.Deletestoreconfig(row.Id).subscribe(x => {
          if (x == 'Deleted Successfully') {
            alert(x)
            this.isLoading = false;
            this.SearchList(null)
          } else {
            alert(x)
            this.isLoading = false;
          }
        })
      },
      reject: () => {
      }
    });
  }

  uploadPopUp:boolean=false
  uploaddata()
  {
    this.uploadPopUp=true
  }

  file: File[];
  filepath: File[];
  onUpload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
    }
  }
  filenames:any
  Uploader() {
 
    if(this.WarehouseIds ==undefined || this.WarehouseIds.length==0)
    {
      alert("Please Select Warehouse");
      return false;
    }
    if (this.file == undefined || this.file.length==0) {
      alert("Please upload File");
      return false;
    }
    let formData = new FormData();
    formData.append('file', this.file[0])
 
    this.filenames=this.file[0].name.split('.')
    console.log(this.filenames);
    // if(this.filenames[1]!='xlsx' || this.filenames[1]!='xls')
    // {
    //   alert("File extnsion required .xlsx and .xls");
    //   let fileInput = document.getElementById('myInput') as HTMLInputElement;
    //     fileInput.value = '';
    //   return false;
    // }
    this.isLoading = true;
    this.warehouseService.Uploader(formData,this.WarehouseIds.value).subscribe((result: any) => {
      debugger
      if(result=='Uploaded Successfully')
      {
        this.file = [];
          alert(result);
          this.WarehouseIds=[];
          this.isLoading = false;
          this.uploadPopUp=false
      let fileInput = document.getElementById('myInput') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } else {
      let fileInput = document.getElementById('myInput') as HTMLInputElement;
      this.uploadPopUp = false;
      fileInput.value = '';
    }
    })
  }
  cancell()
  {
   
    this.WarehouseIds=[];
    let fileInput = document.getElementById('myInput') as HTMLInputElement;
    fileInput.value = '';
  }
  DownloadSampleFile(){
    debugger
    this.isLoading = true;
    this.warehouseService.DownloadSampleFile().subscribe((result: any) => {
      if(result!= null){
        debugger
        this.isLoading = false;
        window.open(result);
      }

      
    })
  }
  wid:any;
  exportdata:any;
  ExportStoreConfig(){
    if ((this.WarehouseIds == undefined || this.WarehouseIds == null) && (this.lo == false || this.SearchHit == true)) { 
      alert("Please Select Warehouse"); return false; }

    this.wid= this.WarehouseIds? this.WarehouseIds.value:0  
    if(this.wid>0){
      this.isLoading = true;
      this.warehouseService.ExportStoreConfig(this.wid).subscribe((res: any) => {
        if (res.length > 0) {
          this.exportdata = res;
          this.isLoading = false;
          console.log(this.totalRecords, "totalRecords");
          this.exportService.exportAsExcelFile(this.exportdata, 'StorePriceConfigurationData');
        } else {
          this.isLoading = false;
          alert("No Record Found");
          return false;
        }
  
      })
    }
    else{
      alert("Please Select Warehouse"); return false;
    }

  }

}
