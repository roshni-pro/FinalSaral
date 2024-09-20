import { Component, OnInit } from '@angular/core';
import { SearchClearanceStockDc, UpdateClearanceStockDc } from 'app/current-stock/interface/clearance-live-item-list-dc';
import { ClearanceItemService } from 'app/current-stock/services/clearance-item.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-transfer-clearance-stock-to-clearance-live-items',
  templateUrl: './transfer-clearance-stock-to-clearance-live-items.component.html',
  styleUrls: ['./transfer-clearance-stock-to-clearance-live-items.component.scss']
})
export class TransferClearanceStockToClearanceLiveItemsComponent implements OnInit {
  GroupList: any
  ApplyType: string = null
  display: boolean = false;
  IsOffer: boolean = false;
  selectedFilter: any;
  selectedGroupCode: any
  warehouseList: any;
  blocked: boolean = false;
  selectedList: any=[];
  isChecked: boolean;
  isAllSelected: boolean = false;
  searchClearanceStockDc: SearchClearanceStockDc;
  clearanceStockItemList: any;
  updateClearanceStockDc: UpdateClearanceStockDc[];

  constructor(private clearanceItemService: ClearanceItemService,
    private wareService: WarehouseService,
    private confirmationService: ConfirmationService,
    private exportService: ExportServiceService,
    private messageService: MessageService,
    private loaderService: LoaderService) { this.selectedFilter = {}; }

  ngOnInit() {
    this.selectedFilter.shelfLifeType = null;
    this.getWarehouse();
    this.getGroup();
  }
 
  getWarehouse() {
    this.blocked = true;
    this.wareService.GetAllWarehouse().subscribe((res) => {
        this.warehouseList = res;
      });
      this.blocked = false;
  }
  getGroup() {
    this.blocked=true;
    this.clearanceItemService.getGroupList().subscribe(res => {
      this.GroupList = res;
    })
    this.blocked=false;
  }
  skip:number=0;
  take:number=10
  totalRecords:number
  load(event) {
    this.take = event.rows;
    this.skip = event.first;  
    if(this.selectedFilter.selWarehouse.WarehouseId)this.onSearch()  
  }
  onSearch() 
  {
    this.selectedList=[];
    this.clearanceStockItemList=[];
    if (this.selectedFilter.selWarehouse && this.selectedFilter.selWarehouse.WarehouseId > 0) 
    {
      this.searchClearanceStockDc = {
        keyword: this.selectedFilter && this.selectedFilter.searchKey ? this.selectedFilter.searchKey : '',
        Skip: this.skip,
        take: this.take,
        WarehouseId: this.selectedFilter && this.selectedFilter.selWarehouse ? this.selectedFilter.selWarehouse.WarehouseId : null,
      }
      this.blocked = true;
      this.clearanceItemService.getClearanceStockList(this.searchClearanceStockDc).subscribe((x:any) => {
        //console.log("res",x); 
        this.totalRecords=x.TotalRecords
        x.ClearanceStockListDc.forEach(element => {
          element.alreadyMoved=element.TotalQty
          element.TotalQty=element.alreadyMoved==0?element.AvailableQty:''
          // element.TotalQty=null
          element.ClPrice=element.UnitPrice;
          if (element.DefaultUnitPrice > 0) {
            element.PromoCost = element.DefaultUnitPrice - element.ClPrice;
          }



//  offer code comment
          // if(element.DiscountType=='Percentage'){
          //   element.isOfferActive=true;
          // }
          // else{
          //   element.isOfferActive=false;
          // }
//  offer code comment

          element.UnitPrice=element.DefaultUnitPrice

//  offer code comment          
          // if(element.OfferActive==true){
          //   element.IsOfferGenerated=true;
          // }
          // else{
          //   element.IsOfferGenerated=false;
          // }
//  offer code comment


          element.checked = false;
          if (element.AvailableQty < 0) {
            element.isActive = false
          }
          else {
            element.isActive = true
          }

          if(element.GroupName==null){
            element.GroupName='Warehouse'
;          }
        });
        this.clearanceStockItemList = x.ClearanceStockListDc;
        console.log(this.clearanceStockItemList );
        
        if (this.clearanceStockItemList.length == 0) {
          // this.messageService.add({ severity: 'error', summary: 'Data not found !!!', detail: '' });
          alert( 'Data not found !!!');
        }
      })
      this.blocked = false;
    }
    else {
      // this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse first !!!', detail: '' });
      alert( 'Please Select Warehouse first !!!');
      this.blocked = false;
    }

  }
  onRefresh() {
    this.selectedList=[];
    this.selectedFilter = [];
    this.clearanceStockItemList = [];
  }



  onExport() {
    let data:[]
    const payload={
      "Skip":0,
      "take":10,
      "keyword":this.selectedFilter?this.selectedFilter.searchKey:'',
      "WarehouseId":this.selectedFilter?this.selectedFilter.selWarehouse.WarehouseId:null,
      "IsExport":1
    }
    this.loaderService.loading(true);
    this.clearanceItemService.getExportData(payload).subscribe((res:any)=>{
      if(res && res.ClearanceStockListDc){
        let data=[]
        res.ClearanceStockListDc.forEach(e=>{
          let payload={

            Id:e.Id,
            WarehouseId:e.WarehouseId,
            "WarehouseName":e.WarehouseName,
            "Live Qty":e.TotalQty,
            "Remaining Qty":e.AvailableQty,
            "Cl Price":e.UnitPrice,
            "itemname":e.itemname,
            "GroupName":e.GroupName,
            "LiveRemainingStockQty":e.LiveRemainingStockQty,
            "ExpiryDate":e.ExpiryDate,
            "MFGDate":e.MFGDate,
            "BatchCode":e.BatchCode,
            "ShelfLifeDaysLeft":e.RemainShelfLifedays,
            "ShelfLifeLeft":e.ShelfLifeLeft,
            "ItemMultiMRPId":e.ItemMultiMRPId,
            "OfferActive":e.OfferActive,
            "StockType":e.StockType,
            "ClearanceStockBatchMasterId":e.ClearanceStockBatchMasterId,
            "ABCClassification":e.ABCClassification,
            "PromoCost":e.PromoCost,
            "BatchMasterId":e.BatchMasterId,
            "Discount Type":e.DiscountType,
            "Discount":e.Discount,
            "ItemId":e.ItemId,
            "Cityid":e.Cityid
          }
          data.push(payload)
        })
        console.log(res.ClearanceStockListDc);
        
        this.exportService.exportAsExcelFile(data, "clearanceStockItemList");
        this.loaderService.loading(false);
      }
    })
  }


  AllExport()
  {

    this.getWarehouse();
    let WarehouseId =[]
    if( this.warehouseList!=undefined){
      this.warehouseList.forEach(element => {
      WarehouseId.push(element.WarehouseId)
    });}
    const payload={
      
      "WarehouseIds":WarehouseId
    }
    this.loaderService.loading(true);
    this.clearanceItemService.ClearanceLiveItemsAllExport(payload).subscribe((res:any)=>{
      if(res )
      {
        let data=[]
        res.forEach(e=>{
          let payload={

            Id:e.Id,
            WarehouseId:e.WarehouseId,
            "WarehouseName":e.WarehouseName,
            "Live Qty":e.TotalQty,
            "Remaining Qty":e.AvailableQty,
            "Cl Price":e.UnitPrice,
            "itemname":e.itemname,
            "GroupName":e.GroupName,
            "LiveRemainingStockQty":e.LiveRemainingStockQty,
            "ExpiryDate":e.ExpiryDate,
            "MFGDate":e.MFGDate,
            "BatchCode":e.BatchCode,
            "ShelfLifeDaysLeft":e.RemainShelfLifedays,
            "ShelfLifeLeft":e.ShelfLifeLeft,
            "ItemMultiMRPId":e.ItemMultiMRPId,
            "OfferActive":e.OfferActive,
            "StockType":e.StockType,
            "ClearanceStockBatchMasterId":e.ClearanceStockBatchMasterId,
            "ABCClassification":e.ABCClassification,
            "PromoCost":e.PromoCost,
            "BatchMasterId":e.BatchMasterId,
            "Discount Type":e.DiscountType,
            "Discount":e.Discount,
            "ItemId":e.ItemId,
            "Cityid":e.Cityid
          }
          data.push(payload)
        })
       
        this.exportService.exportAsExcelFile(data, "ALLClearanceStockItemList");
        this.loaderService.loading(false);
      }
    })
  }


  onAddQty(rowData,e?) {
    //debugger
    if(rowData.AvailableQty<=0 && e=='Total'){ 
      // this.messageService.add({ severity: 'error', summary: 'No Available Qty!!!', detail: '' });
      alert(  'No Available Qty!!!');
    }
    else if(rowData.TotalQty > rowData.AvailableQty){
      // this.messageService.add({ severity: 'error', summary: 'Not more than Available!!!', detail: '' });
      alert( 'Not more than Available!!!');
    }
    else if (rowData.DiscountType == 'Value') {
      if(rowData.DiscountType == 'Value' &&  rowData.Discount >=  Math.round(rowData.UnitPrice)){
        // this.messageService.add({ severity: 'error', summary: 'Discount cant be greater or equal to unit price !!!', detail: '' });
        alert(  'Discount cant be greater or equal to unit price !!!');
      }
      else{
        rowData.ClPrice = rowData.UnitPrice - rowData.Discount;
        rowData.MoveQty=rowData.TotalQty
      }
    } 
    else if (rowData.DiscountType == 'Percentage') {
      if(rowData.DiscountType == 'Percentage' && rowData.Discount >=100 ){
        // this.messageService.add({ severity: 'error', summary: 'Discount cant be greater or equal to 100 !!!', detail: '' });
        alert( 'Discount cant be greater or equal to 100 !!!');
      }
      else{
        var disc = (rowData.UnitPrice * rowData.Discount) / 100;
        rowData.ClPrice = rowData.UnitPrice - disc;
        rowData.MoveQty=rowData.TotalQty
      }
    }
  }
  onUpdate() {

    //debugger
    
    this.updateClearanceStockDc = [];
    this.count=0
    this.selectedList.forEach(rowData => {
    
      if((rowData.AvailableQty==0 && rowData.TotalQty>0) &&  (rowData.AvailableQty !=0 && rowData.alreadyMoved<=0)){
        this.count++;
      }
      else{
        this.onAddQty(rowData);
        let obj = {
          WarehouseId: this.selectedFilter.selWarehouse.WarehouseId,
          ItemMultiMRPId: rowData.ItemMultiMRPId,
          Id: rowData.Id,
          TotalQty: rowData.MoveQty ,
          AvailableQty: rowData.MoveQty ,
          UnitPrice: rowData.UnitPrice,
          BatchCode: rowData.BatchCode,
          StockType: rowData.StockType,
          ClearanceStockBatchMasterId: rowData.ClearanceStockBatchMasterId,
          GroupId: rowData.GroupId ? rowData.GroupId : null,
          ApplyType: rowData.ApplyType ? rowData.ApplyType : this.ApplyType,
          IsOfferGenerated:false,
          itemname: rowData.itemname,
          ClPrice: rowData.ClPrice,
          DiscountType: rowData.DiscountType,
          Discount: rowData.Discount,
          PromoCost: null,
          Cityid: rowData.Cityid,
          ClearanceStockId: rowData.ClearanceStockId,
          ItemId: rowData.ItemId
        }
        this.updateClearanceStockDc.push(obj);
      }
    })
    this.blocked = true;
    console.log("this.updateClearanceStockDc",this.updateClearanceStockDc);
    
    if(this.count==0){
      this.clearanceItemService.updateClearanceStockLiveItem(this.updateClearanceStockDc).subscribe((x:any) => {
        if (x.Status == true) {
          // this.messageService.add({ severity: 'success', summary: 'Successfully  Updated!!!', detail: '' });
          alert( 'Successfully  Updated!!!');
          this.onSearch();
          // this.display = false;
          this.blocked = false;
        } else {
          // this.messageService.add({ severity: 'error', summary: x.Message, detail: '' });
          alert(x.Message);
          // this.display = false;
          this.blocked = false;
        }
      })
    }
    else{
      // this.messageService.add({ severity: 'error', summary: 'No Available Qty! ', detail: '' });
      alert('No Available Qty! ');
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  copyData: any
  check(rowData) {
   //debugger
    this.isAllSelected = false;
    // if(rowData.AvailableQty || !rowData.AvailableQty)
    // {
    //   if(rowData.AvailableQty !=0 && rowData.alreadyMoved<=0){
    //     this.messageService.add({ severity: 'error', summary: 'No Available Qty!!!', detail: '' });
    //     rowData.checked=false;
    //   }
    //   if(rowData.AvailableQty==0){

    //   }
    // }
    
   if(rowData.TotalQty > rowData.AvailableQty  ){
      // this.messageService.add({ severity: 'error', summary: 'Not more than Available!!!', detail: '' });
      alert('Not more than Available!!!');
      rowData.checked=false;
    }
    else if(rowData.DiscountType == 'Percentage' && rowData.Discount >100 ){
      rowData.checked==false
      // this.messageService.add({ severity: 'error', summary: 'Discount cant be greater than 100 !!!', detail: '' });
      alert('Discount cant be greater than 100 !!!');
      rowData.checked=false;
    }
    else  if(rowData.DiscountType == 'Value' &&  rowData.Discount >= Math.round(rowData.UnitPrice)){
      // this.messageService.add({ severity: 'error', summary: 'Discount cant be greater or equal to unit price !!!', detail: '' });
      alert('Discount cant be greater or equal to unit price !!!');
      rowData.checked=false;
    }
   
    else  if(((rowData.TotalQty ==0 ||rowData.TotalQty=="" )  &&  (rowData.DiscountType ==null || rowData.Discount==0))
    ||  (rowData.AvailableQty ==0 && rowData.alreadyMoved<=0 && ( rowData.TotalQty ==0 ||rowData.TotalQty==""))  ){
      // this.messageService.add({ severity: 'error', summary: 'Either totalqty/type or discount null', detail: '' });
      alert('Either totalqty/type or discount null');
      rowData.checked=false;
    } 
    else if(rowData.checked==true && (rowData.TotalQty !=null &&  rowData.DiscountType !=null && rowData.Discount!=0)){
      this.copyData = rowData;
      this.selectedList.push(rowData);
    }
    else{
      this.selectedList.forEach((element: any, index: number)=>{
        if(element.ClearanceStockBatchMasterId==rowData.ClearanceStockBatchMasterId){
              this.selectedList.splice(index, 1);
        }
      })
    }
  }

  count:number=0
  local:boolean
  isOfferActive:boolean;
  enableIsOffer(rowData){
   //debugger
   rowData.IsOfferGenerated=false;
    if(rowData.DiscountType=='Percentage' && rowData.AvailableQty !=0){
      if(rowData.DiscountType=='Percentage' && rowData.IsOfferGenerated==false && rowData.alreadyMoved==0){
        rowData.Discount=rowData.StoreDiscount
      }
      else{
        rowData.Discount=rowData.Discount
      }
      // rowData.isOfferActive=true;
    }
    else if(rowData.AvailableQty ==0){
      rowData.Discount=0
      // this.messageService.add({ severity: 'error', summary: 'Availability Qty None !!!', detail: '' });
      alert('Availability Qty None !!!');
    }
    else{
      rowData.Discount=0
      rowData.isOfferActive=false;
    }
  }
  Submit() {
    this.display=true;
    this.count=0;
    this.local=false;
    // debugger
    if(this.selectedList.length==this.clearanceStockItemList.length){
      this.clearanceStockItemList.forEach(element => {
    //  debugger
        // if (element.ClearanceStockBatchMasterId == this.copyData.ClearanceStockBatchMasterId) {
          if(element.TotalQty =="" && element.alreadyMoved>0 && element.AvailableQty==0){
            element.TotalQty=element.alreadyMoved;
          }
          element.GroupId = this.selectedGroupCode ? this.selectedGroupCode.Id : null,
            element.ApplyType = this.ApplyType
          element.IsOfferGenerated =  false;
         
        // }
      });
      this.clearanceStockItemList.forEach(element => {
    //  debugger
       

        if(((element.TotalQty ==0 ||element.TotalQty=="" ) &&( element.DiscountType ==null || element.Discount==0) ) ||  (element.AvailableQty ==0 && element.alreadyMoved<=0 && ( element.TotalQty ==0 ||element.TotalQty=="")) ){
          this.count++;
        } 
 
        else if( element.ApplyType==null || (element.ApplyType=='Customers' && element.GroupId ==undefined)){
            this.local=true;
        }
        else{
          
        }    

      });
    }
    else{
      this.selectedList.forEach(element => {
        if(element.TotalQty =="" && element.alreadyMoved>0 && element.AvailableQty==0){
          element.TotalQty=element.alreadyMoved;
        }

          element.GroupId = this.selectedGroupCode ? this.selectedGroupCode.Id : null,
            element.ApplyType = this.ApplyType
          element.IsOfferGenerated = false;
      });
      this.selectedList.forEach(element => {
    debugger
        if( ((element.TotalQty ==0 ||element.TotalQty=="" ) &&( element.DiscountType ==null || element.Discount==0) ) ||  (element.AvailableQty ==0 && element.alreadyMoved<=0 && ( element.TotalQty ==0 ||element.TotalQty=="")) ){
          this.count++;
        }
          
        else if( element.ApplyType==null || (element.ApplyType=='Customers' && element.GroupId ==undefined)){
          this.local=true
        }
        else{
          
        }    
      });
    }
    

   
    if(this.count>0){
      //  this.messageService.add({ severity: 'error', summary:'Fill empty fields either MoveQty/discount type/discount', detail: '' });
       alert('Fill empty fields either MoveQty/discount type/discount');
    }
    else if(this.local){
      // this.messageService.add({ severity: 'error', summary:'Select apply type', detail: '' });
      alert('Select apply type');
    }
    else{
      this.IsOffer = true;
      this.display = false;
      this.selectedGroupCode = []
      this.ApplyType = null;
      this.onUpdate();
    }
  }

 
  checks(e) {
    this.selectedList=[];
    this.isAllSelected == false ? true: false;
    this.clearanceStockItemList.forEach(i => {
      if(this.isAllSelected){
        if (i.isActive == false) {
          i.checked = false;
        }
        else{
          i.checked = true;
        }
      }else{
        i.checked = false;
      }
    });

    this.clearanceStockItemList.forEach(element => {
      if (element.isActive == true &&  element.checked == true) {
        
        this.selectedList.push(element)
       }
       else{
       }
    });
  }

}
