import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { from } from 'rxjs';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { InventoryapprovalService } from 'app/shared/services/inventoryapproval.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Inventoryapproval } from 'app/shared/interface/inventoryapproval';
import { ExportService } from 'app/shared/services/export.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';

@Component({
  selector: 'app-inventory-cycle-approval-for-wh',
  templateUrl: './inventory-cycle-approval-for-wh.component.html',
  styleUrls: ['./inventory-cycle-approval-for-wh.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class InventoryCycleApprovalForWHComponent implements OnInit {
  Id: any;
  group: any;
  isopen: boolean;
  isInvalid: boolean;
  isDetails: boolean;
  warehouses: any[];
  approvalList: any[];
  inventoryapprovalList: Inventoryapproval[] = [];
  inventorycycle: Inventoryapproval;
  approval: any;
  IsApproved: any;
  IsDeleted: any;
  warehouseId: any;
  selectedWarehouse: number;
  blocked: boolean;
  totalRecords: any;
  PageNo: any;
  ItemPerPage: any;
  ExpansionAprrovalData: any
  // rangeDates: any
  selectedwarehouseIdPOP: number
  rangeDatesPOP1: any
  selectedwarehouseIdPOP1: number
  rangeDatesPOP: any
  ExportId: number
  startD: any
  endD: any
  ExportDataApproved: any[] = []
  startDatee: any
  enddatee: any
  ExportId1: number
  SelectedwarehouseIdPOP1: number
  ExportDataReject: any[] = []
  startDate1: any
  enddate1: any
  displayImage: boolean = false
  ImgPic1: any
  displayImage1: boolean = false
  ImgPic2: any
  selectedstatus: any
  choosenCustomer = [];
  WareHouseIdd: any
  Selecteditem: any
  Array: any[]
  ItemMultiMRPId: number
  ItemData: any
  SelectedWareHousewarehouseId: number
  display: boolean = false;
  display1: boolean = false;
  Displayadd: boolean = false;
  selectedList: any[];
  first: number=0;
  blockedPop:boolean=false;
  keyword :any;
  statusList : any[]=[];
  status : any;
  verifierList : any[] = [];
  isZeroDifference : boolean = false;
  rangeDates: any;
  yearRangeForCalender: string;
  start : any= null;
  end : any = null;
  stList : any[] = [];
  Type : any;
  isHistoryOpen : boolean = false;
  selectedItemRowData : any;
  entity : any;

  constructor(private InventoryapprovalService: InventoryapprovalService
    , private router: Router
    , private modalService: NgbModal
    , private wh: WarehouseService
    , private messageService: MessageService
    , private confirmationService: ConfirmationService
    , private exportserv: ExportServiceService,
    private inveService: InventoryAssignSupervisiorService
    ,private whService : WarehouseService
  ) { this.isopen === false; this.group = {}; this.approval = {}; this.entity='InventCycle'; }

  ngOnInit() {
    this.selectedList = [];
    this.blocked = false;
    this.warehouseId = null;
    this.statusList = [
      {value : 3, label : 'Select Status'},
      {value : 0, label : 'Pending For Verifier'},
      {value : 1, label : 'Verified For Verifier'},
      {value : 2, label : 'Rejected By Verifier'},
      {value : 9, label : 'Auto-Approved By System'},
    ]
    this.stList = [
      // {value : null, label : 'Select Type'},
      {value : false, label : 'Inventory'},
      {value : true, label : 'PV'},
    ]
    this.verifierList = [
      // {value : 0 , label : 'Remarks By Verifier'},
      {value : 1 , label : 'Excess Inventory'},
      {value : 2 , label : 'Short Inventory'},
      {value : 3 , label : 'MRP Interchange Inventory'},
      {value : 4 , label : 'Items Interchange Inventory'},
      {value : 6 , label : 'Batch Code MisMatch'},
      {value : 7 , label : 'Wrong Counting'},
      // {value : 5 , label : 'Others'},
    ]
    this.status = 3;
    this.Type = false;
    this.getWarehouseList();
  }
  onSearch()
  {
    this.isResponse = false;
    this.isZeroDifference = false;
    // if (
    //   this.rangeDates == null ||
    //   this.rangeDates[0] == undefined ||
    //   this.rangeDates[1] == undefined
    // ) {
    //   alert("Select date range!");
    //   return false;
    // }else{
      if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] != undefined)
      {
        this.start = moment(this.rangeDates[0]).format("YYYY-MM-DD");
        this.end = moment(this.rangeDates[1]).format("YYYY-MM-DD");
      }
      else if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] == undefined)
      {
        this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
        return false;
      }
      this.load(event); 
    // }
  }
  getWarehouseList() {
    this.inveService.getWarehouseList().subscribe(result => {
      // this.whService.getWarehouseList().subscribe(result => {
      console.log(this.selectedWarehouse);
      debugger;
      //if(this.selectedWarehouse == undefined){
      this.warehouses = result;
      // }else{
      //  this.warehouses = result.filter((x:any) => x.WarehouseId == this.selectedWarehouse)[0];
      // }
      // 
      console.log(this.warehouses, "warehouses");
    });

  }
  onChangeWarehouse(warehouseId) {
    this.isResponse = false;
    this.selectedList = [];
    this.inventoryapprovalList = []
    this.blocked = true;
    this.selectedWarehouse = warehouseId;
    this.PageNo = 0;
    this.ItemPerPage = 25;
    if( this.rangeDates &&this.rangeDates[0] != undefined && this.rangeDates[1] != undefined)
    {
      this.start = moment(this.rangeDates[0]).format("YYYY-MM-DD");
      this.end = moment(this.rangeDates[1]).format("YYYY-MM-DD");
    }
    else if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] == undefined)
    {
      this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
      return false;
    }
    this.search();

  }
  load(event) {
    if(this.selectedWarehouse)
    {
    this.first = 0;
    this.selectedList = [];
    debugger;
    var Last = event && event.first ? event.first + event.rows : event.rows
    this.ItemPerPage = event && event.rows ? event.rows : 25;
    // this.PageNo = event && event.rows ? Last / event.rows : 0
    this.PageNo = event && event.first ? event.first : 0

   
   
  
    





    if(this.keyword == undefined)
    {
      this.keyword = '';
    }
    this.blocked = true;
    // this.ItemPerPage =10
    // this.PageNo =0
    this.InventoryapprovalService.getapproval(this.selectedWarehouse, this.PageNo, this.ItemPerPage,false,this.keyword,this.status,this.isZeroDifference,this.start,this.end,this.Type).subscribe(result => {
      console.log(result);
      this.warehouseId = this.selectedWarehouse
      this.approvalList = result.GetInventCycledatadto;
      debugger
      // this.approvalList.forEach(x=>
      //   {
      //       x.diff=((x.CurrentInventory+x.RtpCount+x.RtdCount+x.DamagedQty+x.NonSellableQty)-x.InventoryCount);
      //   })
      this.totalRecords = result.total_count;
      if (this.approvalList.length > 0) {
        this.approvalList.forEach(element => {
          element.IsChecked = false;
          debugger;
          if(!(element.VerifierStatus > 0))
          {            
            element.VerifierStatus = null;
          }
          this.blocked = false;
        });
      }
      this.blocked = false;
    })
    this.blocked = false;
  }else{
    // alert('Please Select Warehouse!');
    this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse!', detail: '' });
  }
  }
  search() {
    if (this.warehouseId != null) {
      this.WareHouseIdd = this.warehouseId
    }
    if(this.keyword == undefined)
    {
      this.keyword = '';
    }
    this.blocked = true;
    this.InventoryapprovalService.getapproval(this.WareHouseIdd, this.PageNo, this.ItemPerPage,false,this.keyword,this.status,this.isZeroDifference,this.start,this.end,this.Type).subscribe(result => {
      console.log(result);
      this.approvalList = result.GetInventCycledatadto;
      this.ExpansionAprrovalData = result.GetInventCycledatadto.InventoryCycleItemBatchDcs
      // this.approvalList.forEach(x=>
      //   {
      //       x.diff=((x.CurrentInventory+x.RtpCount+x.RtdCount+x.DamagedQty+x.NonSellableQty)-x.InventoryCount);
      //   })
      this.totalRecords = result.total_count;
      if (this.approvalList.length > 0) {
        this.approvalList.forEach(element => {
          element.IsChecked = false;
          debugger;
          if(!(element.VerifierStatus > 0))
          {            
            element.VerifierStatus = null;
          }
          this.blocked = false;
        });
      }
      this.blocked = false;
    })
  }
  isResponse : boolean = false;
  Save() {
    this.inventoryapprovalList = [];
    if (this.selectedList.length > 0) {
      this.inventoryapprovalList = this.selectedList.map(function (a) {
        return {
          InventoryCycleId: a.Id,
          IsApproval: true,
          IsDeleted: true,
          VerifierStatus : a.VerifierStatus,
          Comment : a.Comment,
          isHQ : false
        };
      });
      console.log(this.inventoryapprovalList);
      //return false;
      this.blocked = true;
      //debugger;
      this.InventoryapprovalService.SaveApprovalData(this.inventoryapprovalList).subscribe(result => {
        this.blocked = false;
        this.IsApproved = result;
        
        console.log(this.IsApproved, "IsApproved");
        if (this.IsApproved) {
          if (this.IsApproved.Status == false) {
            this.isResponse = true;
            this.messageService.add({ severity: 'error', summary: this.IsApproved.msg, detail: '' });
            return false
          }
          if (this.IsApproved.Status == true) {
            this.isResponse = false;
            this.messageService.add({ severity: 'success', summary: this.IsApproved.msg, detail: '' });
            this.load(event);
          }
          this.warehouseId = null;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Not Approved', detail: '' });
          this.blocked = false;
        }
      },
        (err) => {
          alert(err);
          this.blocked = false;
        }
      )
    } else {
      alert('Please Select CheckBox');
      this.blocked = false;
      return false;
    }
  }

  SaveRejected() {
    this.inventoryapprovalList = [];
    if (this.selectedList.length > 0) {
      this.inventoryapprovalList = this.selectedList.map(function (a) {
        return {
          InventoryCycleId: a.Id,
          IsApproval: true,
          IsDeleted: true,
          VerifierStatus : a.VerifierStatus,
          Comment : a.Comment,
          isHQ : false
        };
      });
      this.blocked = true;
      this.InventoryapprovalService.saveRejectedDataForWH(this.inventoryapprovalList).subscribe(result => {
        this.IsDeleted = result;
        if (this.IsDeleted == true) {
          this.messageService.add({ severity: 'success', summary: 'Successfully Rejected!', detail: '' });
          this.isResponse = false;
          this.load(event);
          // this.search();
          this.blocked = false;
          this.warehouseId = null;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Not Rejected', detail: '' });
          this.blocked = false;
        }
      })
    } else {
      alert('Please Select CheckBox');
      this.blocked = false;
      return false;
    }
  }
  // onChange() {
  //   this.selectedList;
  //   const choosen= this.choosenCustomer[this.choosenCustomer.length - 1];   
  //   this.choosenCustomer.length = 0;
  //   this.choosenCustomer.push(choosen);
  // }
  InventoryCheck: boolean = false
  // check(rowIndex) {
  //   this.inventoryapprovalList=[]
  //   this.inventorycycle = {
  //     InventoryCycleId: this.choosenCustomer[0],
  //     IsApproval: true,
  //     IsDeleted: true
  //   }
  //   if (this.choosenCustomer.length>0) {
  //     this.inventoryapprovalList.push(this.inventorycycle)
  //   } else {
  //     let index = this.inventoryapprovalList.indexOf(this.choosenCustomer[0]);
  //     this.inventoryapprovalList.splice(index, 1);
  //   }
  // }
  onCancel() {
    this.isResponse = false;
    this.search();
    this.selectedList = [];
    this.inventoryapprovalList = [];
  }
  isApproveInventCycle : boolean=false;
  onSelectApproved(rowData?) {
    console.log(this.selectedList);
    this.selectedList = this.selectedList.filter(x => (x.Id == rowData.Id));

    console.log("this.selectedList",this.selectedList);
    debugger;
    this.isApproveInventCycle = false;
    if (this.selectedList.length > 0) {
      this.selectedList.forEach(x=>{
        if(x.VerifierStatus > 0)
        {
          if(x.VerifierStatus == 5)
          {
            if(x.Comment && x.Comment.length > 0)
            {

            }else if(x.IsApproval != 1 && x.IsWarehouseApproved == 0 && !x.IsDeleted && x.InventoryCount != x.PastInventory){
            this.isApproveInventCycle = true;
            alert('Please Enter the Comment For ' + x.ItemName + ' ' + x.Id);
            return false;
            }
          }
        }else if(x.IsApproval != 1 && x.IsWarehouseApproved == 0 && !x.IsDeleted && x.InventoryCount != x.PastInventory){
          this.isApproveInventCycle = true;
          alert('Please Select Remarks for ' + x.ItemName + ' ' + x.Id);
          return false;
        }
      })
      if(this.isApproveInventCycle == false)
      {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.isResponse = true;
            this.Save();
          }
        });
      }
    } else {
      alert('Please Select CheckBox');
      this.blocked = false;
      return false;
    }
  }
  onSelectRejected(rowData?) {
    this.selectedList = this.selectedList.filter(x => (x.Id == rowData.Id));
    this.isApproveInventCycle = false;
    if (this.selectedList.length > 0) {
      
      this.selectedList.forEach(x=>{
        if(x.VerifierStatus > 0)
        {
          if(x.VerifierStatus == 5)
          {
            if(x.Comment && x.Comment.length > 0)
            {

            }else{
            this.isApproveInventCycle = true;
            alert('Please Enter the Comment For ' + x.ItemName + ' ' + x.Id);
            return false;
            }
          }
        }else{
          this.isApproveInventCycle = true;
          alert('Please Select Remarks for ' + x.ItemName + ' ' + x.Id);
          return false;
        }
      })
      if(this.isApproveInventCycle == false)
      {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.SaveRejected();
          }
        });
      }
    } else {
      alert('Please Select CheckBox');
      this.blocked = false;
      return false;
    }
  }
  export(ExportId) {
    var FileName = "";
    // if (this.selectedWarehouse == 0) {
    //   alert("Select Warehouse")
    //   return
    // }
    if (ExportId == 1) {
      FileName = "Approve_Inventory"
    }
    if (ExportId == 2) {
      FileName = "Reject_Inventory"
    }
    this.InventoryapprovalService.getExportData(this.selectedWarehouse, ExportId).subscribe(result => {
      this.InventoryapprovalService.exportAsExcelFile(result, FileName);
    });
  }
  showDialog() {
    this.display = true;
    this.selectedwarehouseIdPOP = undefined;
    this.selectedstatus = undefined;
    this.rangeDatesPOP = undefined;
  }
  itemwisedisplay : boolean = false;
  showDialogItemWise() {
    this.itemwisedisplay = true;
    this.selectedwarehouseIdPOP = undefined;
    this.selectedstatus = undefined;
    this.rangeDatesPOP = undefined;
  }
  showDialog1() {
    this.display1 = true
  }
  ShowDialogForAdd() {
    this.Displayadd = true
  }

  exportBtn:boolean=true;
  exportLoader:boolean=false;
  ExportApproved() {
    if (this.selectedwarehouseIdPOP == undefined) {
      alert("Please Select Warehouse")
      return false
    }
    if (this.selectedstatus == undefined) {
      alert("Please Select Status")
      return false
    }
    if (this.rangeDatesPOP == undefined) {
      alert("Please Select Date Range")
      return false
    }
    this.ExportId = this.selectedstatus
    if (this.rangeDatesPOP != null) {
      this.startD = this.rangeDatesPOP[0]
      this.endD = this.rangeDatesPOP[1]
    }
    this.startDatee = this.startD ? moment(this.startD).format('YYYY-MM-DD') : null
    this.enddatee = this.endD ? moment(this.endD).format('YYYY-MM-DD') : null
    var date1 = new Date(this.startDatee);
    var date2 = new Date(this.enddatee);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days > 30 && Difference_In_Days > 31) {
      alert("Cannot select more than 1 month")
    }
    else {
      this.exportBtn=false;
      this.exportLoader=true;
      this.InventoryapprovalService.GetExportApprovedRejectedData(this.selectedwarehouseIdPOP, this.ExportId, this.startDatee, this.enddatee,false).subscribe(
        (res) => {
          this.ExportDataApproved = res
          console.log(this.ExportDataApproved, "ExportDataApproved");
          var result = this.ExportDataApproved.map(function (a) {
            return {
              'WarehouseName': a.WarehouseName,
              'ItemName': a.ItemName,
              'ItemNumber': a.ItemNumber,
              'ItemMultiMRPId': a.ItemMultiMRPId,
              'MRP': a.MRP,
              'APP':a.APP,
              'BatchCode': a.BatchCode,
              'MFGDate': a.MFGDate,
              'ExpiryDate': a.ExpiryDate,
              'batchInventoryCount': a.batchInventoryCount,
              'BatchPastInventory': a.BatchPastInventory,
              'batchRtpCount': a.batchRtpCount,
              'batchDiff': a.batchDiff,
              'batchDamagedQty': a.batchDamagedQty,
              'batchNonSellableQty': a.batchNonSellableQty,
              'InventoryCount': a.InventoryCount,
              'DamagedQty': a.DamagedQty,
              'NonSellableQty': a.NonSellableQty,
              'PastInventory': a.PastInventory,
              'CurrentInventory': a.CurrentInventory,
              'RtdCount': a.RtdCount,
              'RtpCount': a.RtpCount,
              'Diff': a.Diff,
              'CreatedDate': a.CreatedDate,
              'Status': a.Status,
              'UpdatedDate': a.UpdatedDate,
              'Updatedby': a.Updatedby,
            };
          });
          this.exportserv.exportAsExcelFile(result, "ExportData")
          this.exportBtn=true;
          this.exportLoader=false;
        })
    }
  }
  ExportItemWise()
  {
    if (this.selectedwarehouseIdPOP == undefined) {
      alert("Please Select Warehouse")
      return false
    }
    if (this.rangeDatesPOP == undefined) {
      alert("Please Select Date Range")
      return false
    }
    if (this.rangeDatesPOP != null) {
      this.startD = this.rangeDatesPOP[0]
      this.endD = this.rangeDatesPOP[1]
    }
    this.startDatee = this.startD ? moment(this.startD).format('YYYY-MM-DD') : null
    this.enddatee = this.endD ? moment(this.endD).format('YYYY-MM-DD') : null
    var date1 = new Date(this.startDatee);
    var date2 = new Date(this.enddatee);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days > 30 && Difference_In_Days > 31) {
      alert("Cannot select more than 1 month")
    }
    else {
      this.exportBtn=false;
      this.exportLoader=true;
      this.InventoryapprovalService.exportItemWiseInventoryCycle(this.selectedwarehouseIdPOP,false, this.startDatee, this.enddatee,this.selectedstatus,this.Type).subscribe(
        (res) => {
          this.ExportDataApproved = res;
          debugger;
          console.log(this.ExportDataApproved, "ExportDataApproved");
          var result = this.ExportDataApproved.map(function (a) {
            debugger;
            return {
              'Process' : a.IsPV == 1 ? 'PV' : 'Inventory Cycle',
              'WarehouseName': a.WarehouseName,
              'ItemName': a.ItemName,
              'ItemNumber': a.ItemNumber,
              'ItemMultiMRPId': a.ItemMultiMRPId,
              'MRP': a.MRP,
              'InventoryCount': a.InventoryCount,
              'PastInventory': a.PastInventory,
              'CurrentInventory': a.CurrentInventory,
              'RtdCount': a.RtdCount,
              'RtpCount': a.RtpCount,
              'Diff': a.diff,
              'AppDateSuperwiser': a.CreatedDate,
              'Createdby': a.Createdby,
              'Status': a.Status,
              'UpdatedDate': a.UpdatedDate,
              'Updatedby': a.Updatedby,
              'WarehoseApproved': a.WarehoseApproved,
              'WarehouseComment' : a.Comment,
              'HQApproved': a.HQApproved,                            
              'HQComment' : a.HQComment,    
              'APP' : a.APP          
            };
          });
          this.exportserv.exportAsExcelFile(result, "ExportData")
          this.exportBtn=true;
          this.exportLoader=false;
        })
    }
  }
  ShowImg(item) {
    this.displayImage = true
    this.ImgPic1 = item;
  }
  ShowImg1(item) {
    this.displayImage1 = true
    this.ImgPic2 = item;
  }
  warehouseIdAdd: any
  ItemList: any[] = []
  GetItemList(e) {
    console.log(e, "Event");
    this.InventoryapprovalService.SearchitemForInventoryCycle(e.query, this.warehouseIdAdd.WarehouseId).subscribe(res => {
      this.ItemList = res
    })
  }
  AddItems() {
    if (this.warehouseIdAdd == null) {
      alert("Please Select WarehouseName")
      return false
    }
    if (this.Selecteditem == null) {
      alert("Please Select ItemName")
      return false
    }
    if (this.Selecteditem != null) {
      this.ItemMultiMRPId = this.Selecteditem.ItemMultiMRPId
    }
    this.blockedPop = true
    this.InventoryapprovalService.AddItemInInventoryCycle(this.ItemMultiMRPId, this.warehouseIdAdd.WarehouseId).subscribe(res => {
      this.ItemData = res
      alert(this.ItemData.msg)
      this.Selecteditem = null
      // this.warehouseIdAdd = null
    }
    )
    this.blockedPop = false
  }
  Upload(event, uploadCustom) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      var dataFromExcel = jsonData;
      const dataString = JSON.stringify(jsonData);
      let excelData = dataFromExcel.data;
      let arrayData = [];
      excelData.forEach((element, index) => {
        let obj = {
          WarehouseId: element.WarehouseId,
          ItemMultiMrpId: element.ItemMultiMrpId,
        }
        arrayData.push(obj);
      });
      if (arrayData.length == 0) {
        alert("Invalid File")
        return false
      }
      this.blockedPop = true
      this.InventoryapprovalService.UploadItem(arrayData).subscribe(
        res => {
          if (res.Status == true) {
            alert(res.msg);
            // this.letsClear = [];
            this.blockedPop = false
          } else {
            alert(res)
            this.blockedPop = false
            // this.letsClear = []
          }
        },
        err => {
          alert(err.error.ErrorMessage)
          this.blockedPop = false
        }
      )
      arrayData=[]

    }
    reader.readAsBinaryString(file);
  }
  DownLoadSample() {
    this.Array = [
      {
        'WarehouseId': null,
        'ItemMultiMrpId': null
      }
    ]
    this.exportserv.exportAsExcelFile(this.Array, "SampleFile")
  }
  clearData() {
    this.warehouseId = null;
    this.approvalList = [];
    this.totalRecords = 0;
    this.start = null;
    this.end = null;
    this.rangeDates = [];
    this.status = 3;
  }
  onClickZeroDifferenceRecords()
  {
    debugger;
    this.isResponse = false;
    this.isZeroDifference = true;
    // if (
    //   this.rangeDates == null ||
    //   this.rangeDates[0] == undefined ||
    //   this.rangeDates[1] == undefined
    // ) {
    //   alert("Select date range!");
    //   return false;
    // }else{
      if(this.isZeroDifference)
      {
        this.status = 9;
      }
      if( this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] != undefined)
      {
        this.start = moment(this.rangeDates[0]).format("YYYY-MM-DD");
        this.end = moment(this.rangeDates[1]).format("YYYY-MM-DD");
        this.load(event);
      }
      else if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] == undefined)
      {
        this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
        return false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
        return false;
      }
    
    // }
  }
  isOpenHistoryPopup : boolean = false;
  inventCylceBatchHistoryList : any;
  isOpenInventCycleHistoryPopup: boolean = false;
  inventCylceHistoryList : any;
  onClickHistory(batchData)
  {
    this.isOpenHistoryPopup = true;
    this.blocked = true;
    this.InventoryapprovalService.getInventCycleBatchHistory(batchData.BatchMasterId).subscribe(x=>{
      this.blocked = false;
      this.inventCylceBatchHistoryList = x;
    })
  }
  onClickInventCycleHistory(rowData)
  {
    this.isOpenInventCycleHistoryPopup = true;
    this.blocked = true;
    this.InventoryapprovalService.getInventoryCycleHistory(rowData.Id).subscribe(x=>{
      this.blocked = false;
      this.inventCylceHistoryList = x;
    }) 
  }
  isSearch : boolean = false;
  statisticsdata : any;
  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if(this.selectedWarehouse)
      {
        // if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] != undefined)
        // {
        //     this.start = moment(this.rangeDates[0]).format("YYYY-MM-DD");
        //     this.end = moment(this.rangeDates[1]).format("YYYY-MM-DD");
          this.isSearch = true;
          this.InventoryapprovalService.getInventoryCycleStatistics(this.selectedWarehouse,false,this.start,this.end,this.Type).subscribe(result => {
            debugger;
            this.statisticsdata= result;
          });
        // }else if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] == undefined)
        // {
        //   this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
        //   return false;
        // }else{
        //   this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
        //   return false; 
        // }
      }else{
        this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse First!', detail: '' });
      }
    }
  }
  onExportZeroDifference()
  {
    debugger;
    this.isResponse = false;
    this.isZeroDifference = true;
    if(this.isZeroDifference)
    {
      this.status = 9;
    }
      if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] != undefined)
      {
        this.start = moment(this.rangeDates[0]).format("YYYY-MM-DD");
        this.end = moment(this.rangeDates[1]).format("YYYY-MM-DD");
          if(this.selectedWarehouse)
          {
          this.first = 0;
          this.selectedList = [];
          this.ItemPerPage =  25;
          this.PageNo = 0
          if(this.keyword == undefined)
          {
            this.keyword = '';
          }
          debugger;
          this.blocked = true;
          this.InventoryapprovalService.getInventoryZeroDifference(this.selectedWarehouse, this.PageNo, this.ItemPerPage,false,this.keyword,this.status,this.isZeroDifference,this.start,this.end,this.Type).subscribe(result => {
            console.log(result);
            this.warehouseId = this.selectedWarehouse;
            if(result != null && result.GetInventCycleZeroDifferencedata.length > 0)
            {
              this.exportserv.exportAsExcelFile(result.GetInventCycleZeroDifferencedata, "ExportZeroDifferenceData") 
            }else{
              this.messageService.add({ severity: 'error', summary: 'Data Not Found!', detail: '' });
            }            
            this.blocked = false;
          })
          this.blocked = false;
          }else{
            this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse!', detail: '' });
          }
      }
      else if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] == undefined)
      {
        this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
        return false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
        return false; 
      }
  }
  onClickInventoryItemWiseHistory(rowData)
  {
    this.selectedItemRowData = rowData;
    this.isHistoryOpen = true;
  }
}
