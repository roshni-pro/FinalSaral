import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { dateSelectionJoinTransformer } from '@fullcalendar/core';
import { PscostService } from 'app/report/services/pscost.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { log } from 'console';
//import { isFirstDayOfMonth } from 'date-fns';
import * as moment from 'moment';

@Component({
  selector: 'app-pscost',
  templateUrl: './pscost.component.html',
  styleUrls: ['./pscost.component.scss']
})
export class PscostComponent implements OnInit {
  first: number = 0
  first1: number = 0
  constructor(private Serv: PscostService, private ExportServ: ExportServiceService) { }

  ngOnInit() {
    this.GetWareHouse()

  }
  Skip1:number=1
  Take1:number=10
  warehouses: any[] = []
  //result:any
  TotalRecord: any;
  Skip:number=1
  Take:number=10
  warehouseIdarr: any[] = []
  rangeDates: any
  startDate: any=null
  enddate: any=null
  statusvalue: number
  selectedtransferorderId: number
  SelectedStatus: any
  pscostreportdata: any[] = []
  SelectedWarehouse: any[]
  supplyer: any = null
  selectedTransferOrderId: number
  InternalTransferData: any[] = []
  statuswarehouse: boolean = true
  ErrorMSg: string
  POID: boolean = true
  InternalTransfer: boolean = false;
  blocked:boolean=false;
  OnSearchInternalTransfer:boolean=false
  OnSearchPOID:boolean=false
  TotalRecordd:any
  //first:number=0
  data: any[] = [

    {
      'name': 'PO ID',
      'value': 1
    },
    {
      'name': 'Internal Transfer',
      'value': 2
    }
  ]

  GetWareHouse() {
    this.Serv.getWarehouses().subscribe(res => {
      this.warehouses = res

    })

  }
  loadpoId(event)
  {
    debugger
    var Last = event.first ? event.first + event.rows : 10
    this.Skip1 = Last / event.rows 
    this.Take1 =   event.rows
    
    const payload = {
      Warehouseid: this.warehouseIdarr,
      StartDate: this.startDate,
      EndDate: this.enddate,
      supplyer: this.supplyer,
      skip:this.Skip1,
      take:this.Take1
    }
    this.blocked=true;
    this.Serv.getPSCostPO(payload).subscribe(res => {
      debugger
      //this.pscostreportdata=res
      if (res.length == 0) {
        this.blocked=false;
        alert("No Record Found")
        // this.pscostreportdata = res
        return false
      } else {
        this.blocked=false;
        // this.first = 0;
        this.pscostreportdata = res
        this.TotalRecordd=res[0].TotalRecords
        console.log(this.pscostreportdata,"pscostreportdata")
      }

    })

  }
  load(event) {
    debugger
    console.log("--------------------------------------")
    console.log(event,"Event");
    // this.OnSearchInternalTransfer=true
    var Last = event.first ? event.first + event.rows : 10
    this.Skip = Last / event.rows 
    this.Take =   event.rows

    const payload = {
      Warehouseid: this.warehouseIdarr,
      StartDate: this.startDate,
      EndDate: this.enddate,
      TransferId: this.selectedTransferOrderId,
      skip:this.Skip,
      take:this.Take,
      
    }
    this.blocked=true;
    this.Serv.getPSCostInternal(payload).subscribe(res => {
      console.log(res);
      if (res.length == 0) {
        this.blocked=false;
        alert("No Record Found")
        // this.InternalTransferData = res
        return false
      }
      else {
        this.blocked=false;
        this.first1 = 0;
        this.InternalTransferData = res
        this.TotalRecord = res[0].TotalRecords;
      }
     
    })
  }

  GetInputBox() {
    if (this.SelectedStatus.value == 1) {
      this.POID = true
      this.InternalTransfer = false
      this.OnSearchInternalTransfer=false
    }
    else if (this.SelectedStatus.value == 2)
      (
        this.InternalTransfer = true,
        this.POID = false,
        this.OnSearchPOID=false
      )
  }
  GetInputWarehouse() {
    this.warehouseIdarr = []
    if (this.SelectedWarehouse != null) {
      this.SelectedWarehouse.forEach(element => {
        this.warehouseIdarr.push(element.WarehouseId)
      });
      // this.warehouseIdarr.push(this.SelectedWarehouse.WarehouseId)
    
    }
    this.statuswarehouse = false
   // this.warehouseIdarr=[]
  }
  GetPsCostData() {
    debugger
    this.pscostreportdata = null;
    if (this.SelectedWarehouse == undefined) {
      alert("Please Select Warehouse")
      return false
    }
    if (this.SelectedStatus == null) {

      alert("Please Select Type")
      return false
    }

    if (this.POID == true && this.InternalTransfer == false) {
      // this.warehouseIdarr=[]
      this.OnSearchPOID=true
      console.log(parseInt(this.supplyer));
      if (this.supplyer == "") {
        this.supplyer = null
      }
      if (this.SelectedStatus != null) {
        this.statusvalue = this.SelectedStatus.value
      }
      if (this.supplyer != null) {
        console.log(this.supplyer, "SelectedPOID Ans Supplier")
      }
      if (this.rangeDates != null) {
        this.startDate = this.rangeDates[0] ? moment(this.rangeDates[0]).format('YYYY-MM-DD') : null
        this.enddate = this.rangeDates[1] ? moment(this.rangeDates[1]).format('YYYY-MM-DD') : null
      }
      const payload = {
        Warehouseid: this.warehouseIdarr,
        StartDate: this.startDate,
        EndDate: this.enddate,
        supplyer: this.supplyer,
        skip:1,
        take:10
      }
      this.blocked=true;
      this.Serv.getPSCostPO(payload).subscribe(res => {
        debugger
        //this.pscostreportdata=res
        console.log(this.pscostreportdata, "PSCost Data via POID");
        if (res.length == 0) {
          this.blocked=false;
          alert("No Record Found")
         
          return false
        } else {
          this.blocked=false;
          this.first = 0;
          this.pscostreportdata = res
          this.pscostreportdata = res
          this.TotalRecordd=res[0].TotalRecords
        }

      })
    }

    this.supplyer =null
    if (this.InternalTransfer == true && this.POID == false) {
      this.OnSearchInternalTransfer=true
      this.selectedTransferOrderId

      if (this.SelectedStatus != null) {
        this.statusvalue = this.SelectedStatus.value
      }
      if (this.SelectedWarehouse != null) {
        // this.warehouseIdarr = this.SelectedWarehouse.WarehouseId
      this.warehouseIdarr=[]
      this.SelectedWarehouse.forEach(element => {
          this.warehouseIdarr.push(element.WarehouseId)
        });
      }
      
      if (this.selectedTransferOrderId == null || this.selectedTransferOrderId == undefined) {
        this.selectedTransferOrderId = 0
      }
      if (this.rangeDates != null) {
        this.startDate = this.rangeDates[0]
        this.enddate = this.rangeDates[1]
        // let date = this.selectDate ? moment(this.selectDate).format('YYYY-MM-DD') : null

      }
      let sstartDate = this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : null
      let eenddate = this.enddate ? moment(this.enddate).format('YYYY-MM-DD') : null



      console.log(sstartDate, "StartDate");
      console.log(eenddate, "EndDate");
      const payload = {
        Warehouseid: this.warehouseIdarr,
        StartDate: this.startDate,
        EndDate: this.enddate,
        TransferId: this.selectedTransferOrderId,
        skip:1,
        take:10,
        
      }
      
      this.blocked=true;
      this.Serv.getPSCostInternal(payload).subscribe(res => {
        console.log(res);
      
        if (res.length == 0) {
          this.blocked=false;
          alert("No Record Found")
          // this.InternalTransferData = res
          return false
        }
        else {
          this.blocked=false;
          this.first1 = 0;
          this.InternalTransferData = res
          this.TotalRecord = res[0].TotalRecords;
        }
      
      })



      this.selectedTransferOrderId = null // changes

    }
  }
  ExportData() {
    if (this.POID == true && this.InternalTransfer == false) {
      var result = this.pscostreportdata.map(function (a) {
        return {
          'itemnumber': a.itemnumber,
          'ItemMultiMRPId': a.ItemMultiMRPId,
          'Itemname': a.Itemname,
          'InvoiceNumbers': a.InvoiceNumbers,
          'PurchaseOrderId': a.PurchaseOrderId,
          'WarehouseName': a.WarehouseName,
          'BuyerName': a.BuyerName,
          'SupplierName': a.SupplierName,
          'Status': a.Status,
          'CategoryName': a.CategoryName,
          'SubcategoryName': a.SubcategoryName,
          'SubsubcategoryName': a.SubsubcategoryName,
          'PORate': a.PORate,
          'IRTotalQty': a.IRTotalQty,
          'IRWeightAvgPrice': a.IRWeightAvgPrice,
          'IrAmount': a.IrAmount,
          'WeightPOFreightCharges': a.WeightPOFreightCharges,
          'FrieghtPerPC': a.FrieghtPerPC,
          'Landed_Price': a.Landed_Price,
        };
      });
      this.ExportServ.exportAsExcelFile(result, "PSCostReportData")
    }
    if (this.InternalTransfer == true && this.POID == false) {
      var result1 = this.InternalTransferData.map(function (a) {
        return {
          'ItemNumber': a.ItemNumber,
          'ItemMultiMRPId': a.ItemMultiMRPId,
          'ItemName': a.ItemName,
          'InternalTransferDetails': a.TransferOrderId,
          'Fromwarehouse': a.Fromwarehouse,
          'ToWarehouse': a.ToWarehouse,
          'Status': a.Status,
          'CategoryName': a.CategoryName,
          'SubcategoryName': a.SubcategoryName,
          'SubsubcategoryName': a.SubsubcategoryName,
          'ItemRatePerPc': a.ItemRatePerPc,
          'TotalQuantity': a.TotalQuantity,
          'Amount': a.Amount,
          'WeightPoFreightCharge': a.WeightPoFreightCharge,
          'FreightPerPc': a.FreightPerPc,
          'LandedPricePerPc': a.LandedPricePerPc,
        };
      });
      //this.ExportServ.exportAsExcelFile(this.InternalTransferData,"InternalTransferData")
      this.ExportServ.exportAsExcelFile(result1, "InternalTransferData")
    }
  }
  clear() {
    this.SelectedWarehouse = null
    this.rangeDates = null
    this.supplyer = null
    this.selectedTransferOrderId = null
    this.InternalTransferData = []
    this.pscostreportdata = []
    this.statuswarehouse = true
    this.startDate=null
    this.enddate=null

    //  this.searchResult()
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      alert("Enter Valid Transfer ID")
      return false;
    }
    return true;

  }

  //http://localhost:26265/api/PurchaseOrderMaster/PSCostPO?Warehouseid=1&StartDate=&EndDate&supplyer=&Poid=0
}