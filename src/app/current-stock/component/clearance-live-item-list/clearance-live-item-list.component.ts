import { Component, OnInit } from '@angular/core';
import { ClearanceLiveItemListDc, ExportClearanceLiveItemFilterDc, SearchClearanceLiveItemDc } from 'app/current-stock/interface/clearance-live-item-list-dc';
import { ClearanceItemService } from 'app/current-stock/services/clearance-item.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-clearance-live-item-list',
  templateUrl: './clearance-live-item-list.component.html',
  styleUrls: ['./clearance-live-item-list.component.scss']
})
export class ClearanceLiveItemListComponent implements OnInit {
  warehouseList : any;
  searchKey : any;
  totalRecords:number
  WarehouseId : any;
  selWarehouse : any;
  searchClearanceLiveItemDc : SearchClearanceLiveItemDc;
  exportClearanceLiveItemFilterDc : ExportClearanceLiveItemFilterDc;
  clearanceLiveItemList : ClearanceLiveItemListDc;
  blocked: boolean = false;
  entity:string=null
  constructor(private clearanceItemService : ClearanceItemService,
              private wareService : WarehouseService,
              private confirmationService: ConfirmationService,
              private exportService: ExportServiceService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.blocked = true;
    this.entity='ClearanceLiveItem';
    this.wareService.GetAllWarehouse().subscribe(
      (res) => {
        this.blocked = false;;
        this.warehouseList = res;
      });
  }
  onSearch(){
    if(this.selWarehouse && this.selWarehouse.WarehouseId > 0)
    {
    this.searchClearanceLiveItemDc = {
      Skip : this.skip?this.skip:0,
      take : this.take?this.take:10,
      keyword : this.searchKey ? this.searchKey : '',
      WarehouseId : this.selWarehouse ? this.selWarehouse.WarehouseId : 0,
      CategoryId : 0
    }
    this.blocked = true;
    this.clearanceItemService.getClearanceLiveItem(this.searchClearanceLiveItemDc).subscribe(x=>{
      // debugger
      this.blocked = false;
  
      x.ClearanceLiveItemLists.forEach(element => {
        if(element.IsActive){
          element.Status = 'Deactivate';
        }else{
          element.Status = 'Activate';
        }
        if(element.OfferActive==true){
          element.offerstatus='Offer Exist'
        }
        else{
          element.offerstatus='No Offer'
        }
      });
      this.clearanceLiveItemList = x.ClearanceLiveItemLists;
      debugger
      console.log("this.clearanceLiveItemList ",this.clearanceLiveItemList );
      this.records=x.TotalRecords;
      this.totalRecords=x.TotalRecords
      console.log(x.TotalRecords);
      
      if(this.totalRecords==0){
        this.messageService.add({ severity: 'error', summary: 'Data not found !!!', detail: '' });
      }
    })
  }else{
    this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse first !!!', detail: '' });
    // alert ("Please Select Warehousefirst !")
  }
  }
  onAction(rowData){
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.blocked = true;
            this.clearanceItemService.activeInactive(rowData.Id, !rowData.IsActive).subscribe(result => {
              this.blocked = false;
              if (result) {                         
                if(rowData.IsActive == true){
                  this.messageService.add({ severity: 'success', summary: 'Your Request is Deactivated Successfully!', detail: '' });         
                }else{
                  this.messageService.add({ severity: 'success', summary: 'Your Request is Activated Successfully!', detail: '' });         
                }
                this.onSearch();                                  
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
              }
            });
          },
          reject: () => {
            rowData.IsActive = !rowData.IsActive;
            // this.messageService.add({ severity: 'error', summary: 'Your Request for IsActive Process is Canceled!', detail: '' });
            this.onSearch(); 
          }
        });
  }
  onRefresh(){
    this.selWarehouse = [];
    this.searchKey = null;
    this.clearanceLiveItemList = null;
  }

  records:number=0;
  onExport(){
    if(this.selWarehouse && this.selWarehouse.WarehouseId > 0)
    {
    // this.exportClearanceLiveItemFilterDc = {
    //   keyword : this.searchKey ? this.searchKey : '',
    //   WarehouseId : this.selWarehouse ? this.selWarehouse.WarehouseId : 0,
    // }
    // this.blocked = true;
    // this.clearanceItemService.getClearanceLiveItemExport(this.exportClearanceLiveItemFilterDc).subscribe(x=>{
    //   this.blocked = false;
    //   if(x.length > 0){
      //   }else{
        //     this.messageService.add({ severity: 'error', summary: 'Data Not Found!!', detail: '' });
        //     // alert("Data Not Found!");
        //   }      
        // })
        
        let data = {
          Skip : 0,
          take : this.records,
          keyword : this.searchKey ? this.searchKey : '',
          WarehouseId : this.selWarehouse ? this.selWarehouse.WarehouseId : 0,
          CategoryId : 0
        }
        this.blocked = true;
        this.clearanceItemService.getClearanceLiveItem(data).subscribe((x:any)=>{
          // debugger
          if(x &&  x.ClearanceLiveItemLists)
              this.exportService.exportAsExcelFile( x.ClearanceLiveItemLists, 'ClearanceLiveItems');;
          this.blocked = false;
    })


  }else{
    this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse first !!!', detail: '' });
    // alert("Please Select Warehousefirst !");
  }
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  Id:number
  IsHistory:boolean=false;
  getHistory(rowData){
    console.log(rowData);
    this.Id=rowData.Id
    this.IsHistory=true
  }

  take:10;
  skip:0;
  first:0
  load(event) {
    debugger
    this.take = event.rows;
    this.skip = event.first;  
    this.onSearch()  
  }
}