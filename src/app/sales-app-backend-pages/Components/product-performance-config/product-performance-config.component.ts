import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-performance-config',
  templateUrl: './product-performance-config.component.html',
  styleUrls: ['./product-performance-config.component.scss']
})
export class ProductPerformanceConfigComponent implements OnInit {

  constructor(private warehouseService: WarehouseService,private SalesAppServiceService: SalesAppServiceService, 
    public datepipe: DatePipe,private confirmationService: ConfirmationService, private messageService: MessageService,
    private exportserv:ExportServiceService) {
    this.DateList();
   }

  selectedWarehouses:any
  warehouseList: any[];
  IsAnytime:any;
  FromDate: any[] = [];
  ToDate: any[] = [];
  ToDate1:any
  FromDate1:any
  TodateList:any
  FromDate2:any
  IsAnytimeBuyer:any
  ToDate2:any
  TodateList1:any
  list:any
  blocked:any
  storeList:any
  selectedstore:any
  ngOnInit() {
    // this.warehouseService.GetAllWarehouse().subscribe(result => {
    //   this.warehouseList = result;
    // });
    this.search()
  }

  getAllStores(){
    this.SalesAppServiceService.GetStoreList().subscribe(result => {
      this.storeList = result;
      //console.log(this.storeList)
    });
  }

  DateList() {
    var date = new Date();
    var lastDay = this.datepipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0),'dd');
    for (var i = 1; i <= parseInt(lastDay); i++) {
      var obj = {
        "id": i,
        "name": i
      }
      this.FromDate.push(obj);
    }
    this.ToDate = this.FromDate;
    console.log("this.FromDate", this.FromDate);
  }
  OnToggleChange(Obj:any,type)
  { debugger
    if(confirm("Do you want to proceed to "+(Obj==true?'Enable':'Disable')+" Anytime ?")){
      this.save(type);
    }
    //if(Obj){
      // if(type=='sales')
      // {
      //   this.FromDate1 = null,
      //   this.ToDate1  = null,
      //   this.TodateList = []
      // }
      // else{
      //   this.FromDate2 = null,
      //   this.ToDate2  = null,
      //   this.TodateList1 = []
      // }
    //}
  }
  DateChange(FromDate:any,type) {debugger
      if(type=='sales')
      {
        this.ToDate1  = null,
        this.TodateList = this.FromDate.filter((y)=>{
          if(y.id>=FromDate.id)
          {
            return {
              "id": y.id,
              "name": y.name
            }
          }
        });
      }else{
        this.ToDate2  = null,
        this.TodateList1 = this.FromDate.filter((y)=>{
          if(y.id>=FromDate.id)
          {
            return {
              "id": y.id,
              "name": y.name
            }
          }
        });
      }
  }
  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail:msg});
  }
  onSearchWareHouseId(warehouse){
    debugger
    console.log(warehouse.WarehouseId);
    this.FromDate1 = null
    this.ToDate1  = null
    this.TodateList = []
    this.FromDate2 = null
    this.ToDate2  = null
    this.TodateList1 = [];
  }
  save(type){
    debugger
    //if(this.selectedWarehouses==undefined) this.showError("select warehouse first");
      if((this.FromDate1==undefined ||(this.FromDate1.id==0&&this.FromDate1.name==0 ) ) && type=='sales' && this.IsAnytime==false ) this.showError("select From date first");
      else if((this.ToDate1==undefined||(this.ToDate1.id==0&&this.ToDate1.name==0 ) )  && type=='sales' && this.IsAnytime==false ) this.showError("select To date first");
      else if((this.FromDate2==undefined||(this.FromDate2.id==0&&this.FromDate2.name==0 ) ) && type=='buyer'  && this.IsAnytimeBuyer==false) this.showError("select From date first");
      else if((this.ToDate2==undefined||(this.ToDate2.id==0&&this.ToDate2.name==0 ) ) && type=='buyer'  && this.IsAnytimeBuyer==false) this.showError("select To date first");
      else{
        var id =0,id2=0
        if(this.list!=undefined){
          this.list.forEach(element => {
            element.IsSalesForecast?id=element.Id:id2=element.Id;
          })
        }
        var SBForcastConfigDC={
          Id:type=='sales'? id: id2,
          //WarehouseId:this.selectedWarehouses.WarehouseId,
          FromDay:type=='sales'?(this.FromDate1==null?0:this.FromDate1.id):(this.FromDate2==null?0:this.FromDate2.id),
          ToDay:type=='sales'?(this.ToDate1==null?0:this.ToDate1.id):(this.ToDate2==null?0:this.ToDate2.id),
          IsAnytime:type=='sales'?this.IsAnytime:this.IsAnytimeBuyer,
          IsSalesForecast:type=='sales'?true:false
        }
        this.blocked=true
        this.SalesAppServiceService.InsertSBForcastConfig(SBForcastConfigDC).subscribe((res:any)=>{
          this.blocked=false
          if(res.Status==true){  this.showSuccessfull("saved")}
          else this.showError("Data Not Found");
        },(error:any)=>{
          this.showError(error);
        })
      
    }
  }

  search(){
    debugger;
    //if(this.selectedWarehouses==undefined) this.showError("select warehouse first");
    
      this.blocked=true
      this.SalesAppServiceService.GetConfigDatabyWid().subscribe((res:any)=>{
        this.blocked=false
        if(res.Status==true) {
          this.list=res.Data;
          console.log(this.list);
          this.list.forEach(element => {
            if(element.IsSalesForecast){
              this.FromDate1 ={
                "id": element.FromDay,
                "name": element.FromDay
              }
              this.ToDate1 ={
                "id": element.ToDay,
                "name": element.ToDay
              }
              this.TodateList = this.FromDate.filter((y)=>{
                if(y.id>=this.FromDate1.id)
                {
                  return {
                    "id": y.id,
                    "name": y.name
                  }
                }
              });
              this.IsAnytime=element.IsAnytime;
            }
            else{
              this.FromDate2 ={
                "id": element.FromDay,
                "name": element.FromDay
              }
              this.ToDate2 ={
                "id": element.ToDay,
                "name": element.ToDay
              }
              this.TodateList1 = this.FromDate.filter((y)=>{
                if(y.id>=this.FromDate2.id)
                {
                  return {
                    "id": y.id,
                    "name": y.name
                  }
                }
              });
              this.IsAnytimeBuyer=element.IsAnytime;
            }
          });
        }
        else{ 
          this.showError("Data Not Found");
          this.FromDate1 = null
          this.ToDate1  = null
          this.TodateList = []
          this.FromDate2 = null
          this.ToDate2  = null
          this.TodateList1 = []
        };
      },(error:any)=>{
        this.showError(error);
      })
    
  }
  DawnloadSampleFile(){
    debugger
    this.blocked=true
    this.SalesAppServiceService.dawnloadNewProductFile().subscribe((res:any)=>{
      this.blocked=false
      console.log(res)
      var exportRes=res.map(r=>{
        return {
          "ItemNumber":r.ItemNumber,
          "ItemMultiMRPId":r.ItemMultiMRPId,
          "MinQty":r.MinQty,
          "MaxQty":r.MaxQty,
          "Warehouse":r.Warehouse,
          "Store":r.Store,
        }
      })
      this.exportserv.exportAsExcelFile(exportRes,"StoreNewProductSampleFile")
      // if(res=='File Saved Sucessfully'){  this.showSuccessfull(res);
      //   document.getElementById('file-name').textContent='Upload file here';
      //   this.file=undefined;
      // }
      // else this.showError(res);
    },(error:any)=>{
      this.showError(error);
    })
    // if(this.selectedstore==undefined) this.showError("select store first");
      // this.blocked=true
      //   var exportRes=[{
      //     "Item Number":null,
      //     "ItemMultiMRPID":null,
      //     "Min Qty":null,
      //     "Max Qty":null,
      //     "Warehouse":null,
      //     "Store":null
      // }]
      // this.exportserv.exportAsExcelFile(exportRes,`StoreNewProductSampleFile`)
      // this.blocked=false;
    
  }

file:any
hasSelectedFile:any
  openFilePicker() {debugger
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', (event) => {
      const file1 = event.target as HTMLInputElement;
      try {
        let file = new FormData();
        file.append("file", file1.files[0])
        this.file=file;
        const fileName = file1.files[0].name;
        // Display the file name in an HTML element
        const fileNameElement = document.getElementById('file-name');
        fileNameElement.textContent = fileName;
        this.hasSelectedFile = fileNameElement !== null;
        const button = document.getElementById('my-button');
      !this.hasSelectedFile?fileNameElement.textContent='Please select a file.':button.textContent=null

        this.showSuccessfull("file selected");
        //this.processExcelFile(file1.files[0],storeid);
      } catch (error) {
        console.log(error);
      }
    });
    fileInput.click();
  }

  processExcelFile() {
    debugger
    // if(this.selectedWarehouses==undefined) this.showError("select warehouse first");
    // else if(this.selectedstore==undefined) this.showError("select store first");
    if(this.file==undefined){ 
      this.showError("Please select a file");
    !this.hasSelectedFile?document.getElementById('file-name').textContent='Please select a file....':''
    document.getElementById('my-button').textContent=null
    }
    else{
      // var payload = {
      //   WarehouseId:this.selectedWarehouses.WarehouseId,
      //   StoreId:this.selectedstore.Id
      // }
      this.blocked=true
      this.SalesAppServiceService.UploadNewProductFile(this.file).subscribe((res:any)=>{
        this.blocked=false
        if(res=='File Saved Sucessfully'){  this.showSuccessfull(res);
          document.getElementById('file-name').textContent='Upload file here';
          this.file=undefined;
        }
        else alert(res);
      },(error:any)=>{
        this.showError(error);
      })
    }
  }
}
