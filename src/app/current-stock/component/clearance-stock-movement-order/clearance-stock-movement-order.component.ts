import { Component, OnInit } from '@angular/core';
import { ClearanceStockMovementOrderService } from 'app/current-stock/services/clearance-stock-movement-order.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { LoaderService } from 'app/shared/services/loader.service';

import * as moment from "moment";
import { findIndex } from 'rxjs/operators';
@Component({
  selector: 'app-clearance-stock-movement-order',
  templateUrl: './clearance-stock-movement-order.component.html',
  styleUrls: ['./clearance-stock-movement-order.component.scss']
})
export class ClearanceStockMovementOrderComponent implements OnInit {
  displayBasic: boolean = false;
  showBtn :boolean=false
  isLoading: boolean = false;
  Warehouselist: any[]
  EditDialog: boolean = false;
  ItemList: any
  BatchList: any
  PopupData: any
  TableList: any = []
  OrderList: any;
  Quantity: number
  Id: number
  availableData: any
  IsAvailable: boolean = false;
  skip: number
  take: number
  selectedtype: any
  BuyerList: any;
  SelectedBuyer: any;
  Selected: any
  key: any
  OpenHistory: boolean = false;
  first: number = 0
  totalRecords: number
  openPrint: boolean = false;
  OrderTypes: any = [
    {
      "TypeName": "",
      "TypeValue": ""
    }
  ]
  addTypes: any
  StatusTypes: any = [{
    "StatusName": "",
    "StatusValue": ""
  }]
  type: any
  orders: any = {
    "WarehouseName": 0,
    "Status": '',
    "Id": 0,
    "CreatedDate": '',
    "Amount": ''
  }
  WarehouseId: number;
  Ordertype: string = null;
  disableField: boolean = false;
  selectedItem: any
  selectedCode: any
  StockBatchMasterId: any
  status: any
  rangeDates: any
  FromDate: string = null
  ToDate: string = null
  entity: any
  states: any
  Keyword: any = null;
  tempOrderData: any;
  Types: any;
  StatTypes: any;
  Comments: any = '';
  SelectedId: any;
  Idd: number
  WareHouse: any
  Stats: any = [{
    "StatusName": "",
    "StatusValue": ""
  }]
  Requestdate: any
  Amount: number
  Stattype: any;
  exportType: boolean = false;
  addWarehouselist:any;
  constructor(
    private _service: ClearanceStockMovementOrderService,
    private _msg: MessageService,
    private _exp: ExportServiceService,
    private _confirm: ConfirmationService,
    private loaderService: LoaderService
  ) {



    // this.isLoading=false
    this.entity = 'ClearanceNonSaleableMovementOrder';

    this.OrderTypes = [
      {
        TypeName: "All", TypeValue: null
      },
      {
        TypeName: "Current stock to clearance", TypeValue: 'CurrentToClearance'
      },
      {
        TypeName: "Clearance to Current stock", TypeValue: 'ClearanceToCurrent'
      },
      // {
      //   TypeName:"Current stock to Non Sellable",TypeValue:'CurrentToNonSellable'
      // },
      // {
      //   TypeName:"Non Sellable to Current stock",TypeValue:'NonSellableToCurrent'
      // }
    ]
    this.addTypes = [
      {
        TypeName: "Current stock to clearance", TypeValue: 'CurrentToClearance'
      },
      {
        TypeName: "Clearance to Current stock", TypeValue: 'ClearanceToCurrent'
      },
      // {
      //   TypeName:"Current stock to Non Sellable",TypeValue:'CurrentToNonSellable'
      // },
      // {
      //   TypeName:"Non Sellable to Current stock",TypeValue:'NonSellableToCurrent'
      // }
    ]


    this.StatusTypes = [
      {
        StatusName: "Pending", StatusValue: "Pending"
      },
      {
        StatusName: "Approved", StatusValue: "Approved"
      },
      {
        StatusName: "Physically Moved", StatusValue: "Physically Moved"
      },
      {
        StatusName: "Rejected", StatusValue: "Rejected"
      },
    ]
    this.type = [
      {
        StatusName: "Moved", StatusValue: "Moved"
      },
      {
        StatusName: "Rejected", StatusValue: "Rejected"
      }
    ]
  }

  ngOnInit() {
    // this.getbuyerList();
    this.getWarehouse();
    this.getAddWarehouselist();
  }

  getAddWarehouselist(){
    this.loaderService.loading(true);
    this._service.getAddWarehouseList().subscribe(res => {
      this.addWarehouselist = res;
      console.log(this.addWarehouselist);
      
      this.loaderService.loading(false);
    })
  }

  getWarehouse() {
    this.loaderService.loading(true);
    this._service.getWarehouseCommon().subscribe(res => {
      this.Warehouselist = res;
      this.loaderService.loading(false);
    })
  }

  getId(Id,e?) {
    this.selectedtype = [];
    this.SelectedBuyer = [];
    this.OrderList = [];
    this.skip = 0
    // this.take=10;
    this.totalRecords = 0
    if(e){
      this.WarehouseId = e=='Id'?Id.value:Id.WarehouseId
    }
    else{
      this.WarehouseId = Id.value
    }

  }
  getDates() {
    this.FromDate = moment(this.rangeDates[0]).format('YYYY-MM-DD');
    this.ToDate = moment(this.rangeDates[1]).format('YYYY-MM-DD');
  }
  getTypes(types) {
    this.Ordertype = types.TypeValue;
  }
  getStatus(states) {
    this.status = states.StatusValue;
  }
  getstates(stats) {
    this.states = stats;
    console.log(this.states);
  }
  AddNew() {
    this.Cancel();
    this.TableList = [];
    this.Selected = ''
    this.selectedtype = ''
    this.ItemList = []
    this.key = ''
    this.Quantity = 0
    this.displayBasic = true;
  }

  statusLabel: any;
  OpenDialog(Ord, Id?, Label?) {
    // debugger
    this.EditDialog=false;
    this.Stattype=[];
    this.Comments='';
    this.Stats = [];
    this.Comments = null;
    this.Stattype = null;
    this.PopupData = [];
    this.tempOrderData = Ord;
    this.Idd = Ord.Id ? Ord.Id : Id;
    this.WareHouse = Ord.WarehouseName ? Ord.WarehouseName : this.SelectedId;
    this.Stats.StatusName = Ord.Status ? Ord.Status : Label;
    this.Stats.statusValue = Ord.Status ? Ord.Status : Label;
    this.statusLabel = this.Stats.StatusName;
    this.Requestdate = moment(Ord.CreatedDate).toLocaleString()
    this.Amount = Ord.Amount ? Ord.Amount.toFixed(2) : this.Amount
    this.EditDialog = true;
    this.loaderService.loading(true);
    this._service.getCleNonSaleableMovementOrderDetails(this.Idd).subscribe(res => {

      res.forEach((e: any) => {
        if (e && e.GetCleNonSaleableMovementOrderDetailsDCs && e.GetCleNonSaleableMovementOrderDetailsDCs.length > 0) {
          e.GetCleNonSaleableMovementOrderDetailsDCs.forEach(ele => {
            ele.checked = true;
            ele.qty = ele.Quantity;
          })
        }
      })
      this.loaderService.loading(false);
      this.PopupData = res;
      console.log("this.PopupData", this.PopupData);
    })
    console.log("this.WareHouse",this.WareHouse)
    this.WareHouse = this.Warehouselist.find(
      (y) =>
       y.label.substr(y.label.indexOf('(')+2 ,y.label.indexOf(' )')-y.label.indexOf('(')-2) === this.WareHouse
    );
    this.Stats = this.StatusTypes.find(
      (y) => y.StatusName === this.Stats.StatusName
    )

  }
  showError(msg) {
    this._msg.add({ severity: 'error', summary: 'Error', detail: msg });
  }
  showSuccess(msg) {
    this._msg.add({ severity: 'success', summary: 'Success', detail: msg });
  }


  searchItems(key) {
    this.ItemList = []
    this.selectedItem = [];
    this.selectedCode = undefined;
    this.Quantity = null;
    this.loaderService.loading(true);
    this._service.getSearchItemsById(this.WarehouseId, this.Ordertype, key).subscribe(res => {

      if (res.length > 0) {
        res.forEach(e => {
          e.nameMrp = e.ItemName + ' ' + '(ItemMultiMrpId ' + e.ItemMultiMRPId + ' )'
        })
        this.ItemList = res
        console.log("this.ItemList", res);
        this.loaderService.loading(false);
        this.disableField = true;

      }
      else {
        this.loaderService.loading(false);
        this.showError("Try different keyword");
        this.disableField = false;
      }
    })
    this.ItemList.unshift();

  }

  getBatch(body) {

    this.selectedItem = body
    if (body.ItemMultiMRPId != null || body.ItemMultiMRPId != '') {
      this.BatchList = []
      this.loaderService.loading(true);
      this._service.getBatchCodeByMrp(body.ItemMultiMRPId, this.WarehouseId, this.Ordertype).subscribe(res => {
        if (res.length > 0) {
          this.BatchList = res;
          this.loaderService.loading(false);
        }
        else {
          this.showError("Try again later !");
          this.loaderService.loading(false);
        }
      })

    }
  }


  getCode(code) {
    this.selectedCode = code;
  }


  load(event) {
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    if (this.WarehouseId != null || this.WarehouseId != undefined) {
      this.getList();
    }
  }

  loader(event) {
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    this.Available();
  }

  payload: any;
  getList() {
    //debugger
    
    this.OrderList = []
    if (this.rangeDates != null || this.rangeDates != undefined) {
      if (this.rangeDates.length > 0) {
        this.getDates()
      }
      if((this.FromDate && (!this.ToDate || this.ToDate=="Invalid date")) || ((!this.FromDate || this.FromDate =="Invalid date") && this.ToDate) ){
        alert("Select both date! ");
        this.rangeDates=null;this.FromDate='';this.ToDate='';
      }
    }

   
     if (this.WarehouseId != null) {
      this.Ordertype = null;
      this.payload = {
        "Warehouseid": this.WarehouseId,
        "OrderType": this.Types ? this.Types.TypeValue : this.Ordertype,
        "Status": this.status,
        "FromDate": this.FromDate,
        "ToDate": this.ToDate,
        "keyword": this.Keyword ? this.Keyword : null,
        "skip": this.skip,
        "take": this.take,
      }
      this.showBtn=true
      // this.isLoading=true;
      this.loaderService.loading(true);

      this._service.getClearanceStockMovementOrderList(this.payload).subscribe((res: any) => {
        this.OrderList = res.GetClearanceStockMovementOrder
        this.totalRecords = res.TotalRecords
        this.loaderService.loading(false);
        // this.isLoading=false;
        if (this.OrderList && this.OrderList.length == 0) {
          this.showError("Data not Found!");
          this.showBtn=false
        }
      })
    }
    else {
      this.showError("Select Warehouse!");
    }
  }


  Add() {
    if (this.Quantity == null || this.selectedCode == undefined || this.selectedItem == undefined) {
      this.showError("Either missing Quantity/ItemName or Batchcode !!!!")
    }
    else if (this.Quantity > this.selectedCode.Quantity) {
      this.showError(" Can't add .should be less than available qty!!!!")
    }
    else if (this.selectedCode.UnitPrice == 0) {
      this.showError(" Can't add.Its unit price is 0!!!!")
    }
    else if (this.Quantity <= 0 || (this.Quantity - Math.floor(this.Quantity)) !== 0) {
      this.showError("Quantity Can't be  0/less/in decimal!!!!")
    }
    else {
      let payload = [{
        "Id": this.selectedCode.Id,
        "OrderType": this.Ordertype,
        "Warehouseid": this.WarehouseId,
        "BatchCode": this.selectedCode.BatchCode,
        "ItemNo": this.selectedCode.ItemNumber,
        "ItemName": this.selectedItem.ItemName,
        "ItemMultiMRPId": this.selectedItem.ItemMultiMRPId,
        "UnitPrice": this.selectedCode.UnitPrice,
        "Quantity": this.Quantity,
        "StockBatchMasterId": this.selectedCode.StockBatchMasterId,
        "StoreId": this.selectedItem.StoreId
      }]
      console.log(payload);


      let count = 0
      let no = 0
      payload.forEach(e => {
        if (e.Quantity == null) {
          count++;
        }
      })

      this.TableList.forEach(e => {
        payload.forEach(y => {
          if (e.StockBatchMasterId == y.StockBatchMasterId) {
            no++;
          }
        })
      })
      if (count == 0 && no == 0) {
        this.showSuccess("Items added")
        payload.forEach((x) => {
          this.TableList.push(x)
        })
      }
      else if (no != 0 && count == 0) {
        this.showError("Add different product")
      }
      else {
        this.showError("Add quantity")
      }
    }
  }

  DeleteItem(List) {
    let ac = this.TableList.filter(x => x.ItemNo == List.ItemNo)[0];
    let index = this.TableList.indexOf(ac);
    this.TableList.splice(index, 1);
  }

  postData: any
  SaveItem() {
    let count = 0
    this.postData = []
    this.ItemList.forEach(e => {
      e.GetClearanceOrderItemDetailDCs.forEach(el => {
        if (el.Checked == true) {
          if (e.UnitPrice > 0 && el.quantity != 0 && el.quantity != null && (el.quantity == el.AvailableQuantity || el.quantity < el.AvailableQuantity)) {
            el.UnitPrice = e.UnitPrice,
              el.BuyerId = this.SelectedBuyer.BuyerId,
              el.Warehouseid = this.Selected.WarehouseId,
              el.OrderType = this.selectedtype.TypeValue
            this.postData.push(el);
          }
          else {
            count++;
            if(e.UnitPrice == 0){
              this.showError(el.BatchCode + ",'s unit price is zero!")
            }
            else{
              this.showError(el.BatchCode + ",'s qty should less than available qty!")
            }
          }
        }
      })
    })
    if (this.postData && this.postData.length == 0 && count == 0) {
      alert("First select data!");
      return false;
    }
    if (count == 0) {
      console.log(this.postData);
      this.loaderService.loading(true);

      this._service.addClearanceNonSellableOrder(this.postData).subscribe((res: any) => {

        if (res.Status == false) {
          this.loaderService.loading(false);
          alert(res.Message);
          // this.Cancel();
        }
        else if (res.Status == true) {
          alert(res.Message);
          this.showSuccess(res.Message);
          this.loaderService.loading(false);
          this.Cancel();
        }
        else {
          this.loaderService.loading(false);
          this.WarehouseId = this.SelectedId ? this.SelectedId.WarehouseId : this.WarehouseId;
          this.getList();
          this.displayBasic = false;
          this.Cancel();
        }

      })
    }
    else {
      // this.showError("List contains null unitprice or quantity!");
    }
    // this.Cancel();

    // this.isLoading=false;
  }

  // IsEditQuantity:boolean=false
  // IsQuantity:any
  // NewQuantity:number

  // Editquantity(Items){
  //   this.IsQuantity=Items
  //   this.NewQuantity=this.IsQuantity.Quantity
  //   this.IsEditQuantity=true;
  // }


  // SpliceId:any=[];
  openEdit:boolean=false;
  AlterQuantity(Id, order, confirm?) {
    // debugger
    if (order.qty > order.OrderQuantity && order.AvailableQuantity !=0) {
      alert("qty should be less than ordered qty!");
      this.OpenDialog(order, Id, this.statusLabel);
    }
    else if(order.AvailableQuantity==0 && order.qty!=0){
      alert("Batch qty is 0!");
      this.OpenDialog(order, Id, this.statusLabel);
    }

    else if (order.qty == null || (order.qty != 0 && order.qty < 0)) {
      alert("Can't be negative!");
      this.OpenDialog(order, Id, this.statusLabel);
      // order.Detailid=this.detailId
      this.qty=order.qty
    }
    else if(!this.qty || !this.detailId ){
      alert("First edit qty!");
      this.OpenDialog(order, Id, this.statusLabel);
    }
    else {
      let msg = '';
     if(this.qty && this.qty!=order.qty){
      order.qty=this.qty;
    }
      order.Detailid=this.detailId
      this.openEdit=true;
      if (confirm == "CnfTrue") {
        this.loaderService.loading(true);
        this._service.updateCleNonSaleableMovementOrderQuantity(Id, order.qty, order.Detailid).subscribe((res: any) => {
          if (res.Status == true) {
            this.openEdit=false;
            this.showSuccess("Successfully edited");
            // this.SpliceId.push(order.Detailid);
            this.OpenDialog(order, Id, this.statusLabel);
            this.loaderService.loading(false);
          }
          else {
            this.openEdit=false;
            this.OpenDialog(order, Id, this.statusLabel);
            this.showError(res.Message);
            this.loaderService.loading(false);
          }
        })
      } 
      else if(confirm == "CnfFalse"){
        this.openEdit=false;
        this.qty=undefined
        this.OpenDialog(order, Id, this.statusLabel);
        // this.showError(res.Message);
      }else{
        // if(!confirm){
        //   this.qty=undefined
        // }

      }
      // });


      // this.IsEditQuantity=false;
      // this.EditDialog = false;
    }
  }

  // confirm1(Id, order) {
  //   this.OpenDialog(order, Id, this.statusLabel);
  // }

  qty:number;
  detailId:number;
  changeQty(event,order){
    this.qty=0;
    this.qty=event
    this.detailId=order.Detailid
    order.qty=event
  }

  getHistory(Id) {
    this.Id = Id;
    this.OpenHistory = true
  }

  historyHide: boolean = false;
  isPrint: boolean = false;
  PrintData: any
  printId: number
  printWareHouse: string
  printStats: string
  printRequestdate: string
  printAmount: number
  Print(Ord) {
    this.payload = []
    let id = Ord.Id
    this.printId = Ord.Id,
      this.printWareHouse = Ord.WarehouseName,
      this.printStats = Ord.Status,
      this.printRequestdate = moment(Ord.CreatedDate).format('YYYY-MM-DD'),
      this.printAmount = Ord.Amount
    this.loaderService.loading(true);
    this._service.getCleNonSaleableMovementOrderDetails(id).subscribe(res => {
      res.forEach(e => {
        e.GetCleNonSaleableMovementOrderDetailsDCs.forEach(el => {
          const payload = {
            "ItemNumber": e.ItemNumbr,
            "itemname": e.itemname,
            "ItemMultiMRPId": e.ItemMultiMRPId,
            "BatchCode": el.BatchCode,
            "MFGDate": el.MFGDate,
            "ExpiryDate": el.ExpiryDate,
            "OrderQuantity": el.OrderQuantity,
            "Quantity": el.Quantity,
            "BatchQuantity": el.AvailableQuantity,
            "ShelfLife": el.CurrentShelfLife,
            "UnitPrice": e.UnitPrice,
            "MRP": e.MRP,
            "Amount": e.Amount
          }
          this.payload.push(payload);
        })
      })
      this.PrintData = this.payload;
      this.loaderService.loading(false);
      console.log("this.PrintData", this.PrintData);
    })
    this.isPrint = true;
    this.historyHide = true;
  }

  //orderid:number
  // EditData(comments){
  //   let count=0;
  //   this.payload=[];
  //   // this.PopupData.forEach(e=>{
  //   //   if(e.Quantity>e.BatchQuantity){
  //   //     count++;
  //   //   }
  //   // })
  //   debugger
  //   if( this.Stattype=='Rejected' && this.Comments==''){
  //     this.showError("Add comment!")
  //   }
  //   else if(this.Stattype==undefined){
  //     this.showError("Select status!")
  //   }
  //   else if((this.Idd!=null && this.states != undefined)|| comments !=null && count==0){
  //     // this.isLoading=true
  //     this.PopupData.forEach(ele=>{
  //       ele.GetCleNonSaleableMovementOrderDetailsDCs.forEach(e=>{
  //         // this.SpliceId.forEach(Id=>{
  //           // if(Id==e.Detailid){
  //             const payload={
  //               "Id":ele.ClearanceStockMovementOrderMasterId, //e.Detailid
  //               "Status":this.states,
  //               "comment":comments,
  //               "Quantity":e.Quantity
  //             }
  //             this.payload.push(payload)
  //           // }
  //         // })

  //       })
  //     })


  //     this.loaderService.loading(true);
  //     this._service.updateClearanceNonOrderStatus(this.payload).subscribe(res=>
  //       {
  //         // this.isLoading=false
  //         alert(res.Message);
  //         this.loaderService.loading(false);
  //         this.getList();
  //       })
  //       this.showSuccess("Edited successfully")
  //       this.EditDialog=false;
  //   }
  //   else if(count>0){
  //    this.showError("Qty greater than batch qty!");
  //   }
  //   else{
  //    this.showError("Add status & comments");
  //   }  
  // }

  openConfirm:boolean=false;
  EditData(comments,confirm?) {
    let count = 0;
   debugger
    console.log(this.PopupData);
    if(confirm!= "CnfTrue" && confirm != "CnfFalse"){
      this.PopupData.forEach(y=>{
        y.GetCleNonSaleableMovementOrderDetailsDCs.forEach(x=>{
          if(x.AvailableQuantity < x.Quantity){
            count++;
          }
        })
      })
    }
   
    
    if (this.Stattype == 'Rejected' && this.Comments == '') {
      this.showError("Add comment!")
    }

    else if (this.Stattype == undefined) {
      this.showError("Select status!")
    }

    if (((this.Idd != null && this.states != undefined) || comments != null ) && (count == 0 || confirm == "CnfTrue")) {
      this.isLoading=true
      this.loaderService.loading(true);
      this._service.updateClearanceNonOrderStatus(this.Idd, this.states, comments).subscribe((res: any) => {
        // this.isLoading=false
         debugger
        if (res.Status == true) {
          alert(res.Message);
          this.getList();
          this.loaderService.loading(false);
          this.EditDialog = false;
        }
        else {
          if(res.Status==false && res.Message =='Zero Qty Orders cant be approved, please choose Reject option.'){
            
            this.loaderService.loading(false);
            // this.showError(res.Message);
            alert(res.Message);
            // this.EditDialog = true;
          }
          else{
            this.showError(res.Message);
            this.loaderService.loading(false);
            // this.EditDialog = false;
          }
        
        }
      })
      // this.showSuccess("Edited successfully")
      
    }

    else if (confirm == "CnfFalse") {
      this.openConfirm=false;
    }

    else if (count > 0) {
      this.openConfirm=true;
    }

    else {
      this.showError("Add status & comments");
    }
  }


  total: number
  Available() {
    this.availableData = []
    if (this.WarehouseId != null) {
      // this.isLoading=true;
      this.loaderService.loading(true);
      this._service.AvailableItemForClNSOrders(this.WarehouseId, this.skip, this.take).subscribe((res: any) => {

        if (res.AvailableItemForClNSOrderDC && res.AvailableItemForClNSOrderDC.length > 0) {
          this.availableData = res.AvailableItemForClNSOrderDC;
          this.total = res.TotalRecords
          // this.isLoading=false;
          this.loaderService.loading(false);
        }
        else {
          this.showError("try again later!");
        }
        // this.isLoading=false;
        this.loaderService.loading(false);
      })
      this.IsAvailable = true;
    }
    else {
      this.showError("Select Warehouse!!")
    }
  }

  getAll() {
    this.skip = 0;
    this.take = this.total
    this.Available()
  }

  getbuyerList() {
    // this.isLoading=true;
    this.loaderService.loading(true);
    this._service.getBuyerList(this.Selected.WarehouseId, this.selectedtype.TypeValue).subscribe(res => {
      this.BuyerList = res;
      // this.isLoading=false;
      this.loaderService.loading(false);
      console.log(this.BuyerList);
    })
  }

  getItembyBuyer() {
    console.log(this.Selected);
    // this.isLoading=true;
    this.loaderService.loading(true);
    this._service.getItemsbyBuyer(this.SelectedBuyer.BuyerId, this.Selected.WarehouseId, this.selectedtype.TypeValue).subscribe(res => {
      res.forEach(e => {
        e.GetClearanceOrderItemDetailDCs.forEach(ele => {
          ele.Checked = true;
          ele.quantity = ele.AvailableQuantity;
        })
      })
      this.ItemList = res;
      // this.isLoading=false;
      this.loaderService.loading(false);
      console.log("this.ItemList", this.ItemList);
    })
  }


  Export() {
    debugger
    // if (this.rangeDates != null || this.rangeDates != undefined) {
    //   if (this.rangeDates.length > 0) {
    //     this.getDates()
    //   }
    // }

    if(this.rangeDates==null || this.rangeDates==undefined)
    {
      alert("please select date range")
      return false
    }
    if(this.rangeDates[0]==null || this.rangeDates[1]==null)
    {
      alert("Select both date! ");
      return false
    }
 
      // if((this.FromDate && (!this.ToDate || this.ToDate=="Invalid date")) || ((!this.FromDate || this.FromDate =="Invalid date") && this.ToDate) ){
      //   alert("Select both date! ");
      //   this.rangeDates=null;this.FromDate='';this.ToDate='';
      // }
    

    // this.isLoading=true;
    this.loaderService.loading(true);
    const payload={
      "Warehouseid":this.WarehouseId ,
      "OrderType": this.Ordertype,
      "Status":this.status,
      "keyword":this.Keyword,
      "skip":0,
      "take":10,
      "FromDate": this.FromDate?this.FromDate:null,
      "ToDate":this.ToDate?this.ToDate:null,
      "IsExport":1
    }
    this._service.getExportdata(payload).subscribe((res:any)=>{
      if(res && res.GetClearanceStockMovementOrder){
        this._exp.exportAsExcelFile(res.GetClearanceStockMovementOrder, "ClearanceStockMovementOrderList");
        this.showBtn=false
      }
    })
    // this.isLoading=false;  
    this.loaderService.loading(false);
  }

  exportfile(str) {
    this.skip = 0;
    this.take = 1000;
    // this.isLoading=true;
    this.loaderService.loading(true);
    this._service.AvailableItemForClNSOrders(this.WarehouseId, this.skip, this.take).subscribe((res: any) => {
      if (res.AvailableItemForClNSOrderDC && res.AvailableItemForClNSOrderDC.length > 0) {
        if (str == 'Clearance') {
          res.AvailableItemForClNSOrderDC = res.AvailableItemForClNSOrderDC.filter(x => {
            if (x.StockType == 'CL') return x;
          })
          this._exp.exportAsExcelFile(res.AvailableItemForClNSOrderDC, "ClearanceItemList");
          // this.isLoading=false;
          this.loaderService.loading(false);

        }
        else {
          res.AvailableItemForClNSOrderDC = res.AvailableItemForClNSOrderDC.filter(x => {
            if (x.StockType == 'N') return x;
          })
          this._exp.exportAsExcelFile(res.AvailableItemForClNSOrderDC, "NonSellableItemList");
          // this.isLoading=false;
          this.loaderService.loading(false);

        }
      }
      else {
        // this.isLoading=false;
        this.loaderService.loading(false);
        this.showError("try again later!");
      }
    })
  }

  Refresh() {
    this.showBtn=false
    this.SelectedId = []
    this.Types = [];
    this.StatTypes = []
    this.totalRecords = 0;
    this.status = undefined
    this.rangeDates = undefined
    this.FromDate = null
    this.ToDate = null
    this.Keyword = null
    this.OrderList = []
    this.WarehouseId = null;
  }

  Cancel() {
    this.TableList = [];
    this.Selected = ''
    this.selectedtype = ''
    this.ItemList = []
    this.key = ''
    this.Quantity = 0
    this.disableField = false;
    this.displayBasic = false;
    this.SelectedBuyer = [];
    this.BuyerList = [];
  }



}