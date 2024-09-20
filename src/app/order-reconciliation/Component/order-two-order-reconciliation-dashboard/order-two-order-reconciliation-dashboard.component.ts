import { Component, OnInit } from '@angular/core';
import { OrderReconciliationServiceService } from 'app/order-reconciliation/Service/order-reconciliation-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order-two-order-reconciliation-dashboard',
  templateUrl: './order-two-order-reconciliation-dashboard.component.html',
  styleUrls: ['./order-two-order-reconciliation-dashboard.component.scss']
})
export class OrderTwoOrderReconciliationDashboardComponent implements OnInit {
  cityList: any;
  maxDate = new Date();
  WareHouseList: any[] = [];
  SelectedCity: any[] = [];
  CtyIdd: any[] = [];
  blocked: boolean = false;
  SelectedWarehouse: any[] = []; 
  WarId: any;
  FromDate: any;
  ToDate: any;
  IsToday:boolean=false;
  IsMonth:boolean=false;
  DashboardList:any;
CashVerifiedAmount:any;
CashVerifiedOrder:any;
CashNotVerifiedAmount:any;
CashNotVerifiedOrder:any;
CashPartiallyVerifiedAmount:any;
CashPartiallyVerifiedOrder:any;
ChequeVerifiedAmount:any;
ChequeVerifiedOrder:any;
ChequeNotVerifiedAmount:any;
ChequeNotVerifiedOrder:any;
ChequePartiallyVerifiedAmount:any;
ChequePartiallyVerifiedOrder:any;
DirectUdharVerifiedAmount:any;
DirectUdharVerifiedOrder:any;
DirectUdharNotVerifiedAmount:any;
DirectUdharNotVerifiedOrder:any;
DirectUdharPartiallyVerifiedAmount:any;
DirectUdharPartiallyVerifiedOrder:any;
GullakVerifiedAmount:any;
GullakVerifiedOrder:any;
GullakNotVerifiedAmount:any;
GullakNotVerifiedOrder:any;
GullakPartiallyVerifiedAmount:any;
GullakPartiallyVerifiedOrder:any;
hdfcVerifiedAmount:any;
hdfcVerifiedOrder:any;
hdfcNotVerifiedAmount:any;
hdfcNotVerifiedOrder:any;
hdfcPartiallyVerifiedAmount:any;
hdfcPartiallyVerifiedOrder:any;
RTGS_NEFTVerifiedAmount:any;
RTGS_NEFTVerifiedOrder:any;
RTGS_NEFTNotVerifiedAmount:any;
RTGS_NEFTNotVerifiedOrder:any;
RTGS_NEFTPartiallyVerifiedAmount:any;
RTGS_NEFTPartiallyVerifiedOrder:any;
TotalOrders	:any;
TotalAmount	:any;
TotalVerifiedOrder	:any;
TotalVerifiedAmount:any;	
TotalNotVerifiedOrder:any;	
TotalNotVerifiedAmount:any;	
TotalPartialVerifiedOrder:any;	
TotalPartialVerifiedAmount:any;
UPINotVerifiedAmount:any;
UPINotVerifiedOrder:any;
UPIPartiallyVerifiedAmount:any;
UPIPartiallyVerifiedOrder:any;
UPIVerifiedAmount:any;
UPIVerifiedOrder:any
ExcessAmount:any;
RefundAmount:any

  constructor(private ReconciliationServiec: OrderReconciliationServiceService,private exportService:ExportServiceService) { }

  ngOnInit() {
    this.GetCity()
  }
  GetCity() {
    this.blocked = true;
    this.ReconciliationServiec.getAllCityNew().subscribe((result) => {
      this.blocked = false;
      this.cityList = result;
      this.GetWarehouse()
    });
  }
  GetWarehouse() {

    this.CtyIdd = [];
    if (this.SelectedCity.length > 0 || this.SelectedCity != undefined) {
      this.SelectedCity.forEach((element) => {
        this.CtyIdd.push(element.value);
      });
      this.blocked = true;
      this.ReconciliationServiec
        .GetWarehouseListForTargetV2(this.CtyIdd)
        .subscribe((WareRes) => {
          this.blocked = false;
          this.WareHouseList = WareRes;
        });
    }
  }
  Month()
  {
    this.IsToday=false;
    this.IsMonth=true;
    this.Today();
  }
  Today()
  {
    if (this.SelectedCity == undefined || this.SelectedCity.length == 0) {
      alert("Please Select City");
      return false;
    }
    else if (this.SelectedWarehouse == null || this.SelectedWarehouse == undefined || this.SelectedWarehouse.length == 0) {
      alert("Please Select Warehouse")
      return false;
    }

    this.WarId = [];
    if ((this.SelectedWarehouse.length > 0 || this.SelectedWarehouse != undefined) ) {
      this.SelectedWarehouse.forEach((element) => {
        this.WarId.push(element.value);
      })
      const payload = {
        "warehouseId": this.WarId,
        "StartDate": null,
        "EndDate":  null,
        "IsMonth": this.IsMonth,
        "IsToday": this.IsToday,
      }
      this.blocked = true;
      this.ReconciliationServiec.getOrderToOrderReconciliationDashboard(payload).subscribe(res => {
        this.DashboardList=res;
        console.log(this.DashboardList,"DashboardList");
        
        this.CashVerifiedAmount=this.DashboardList.CashVerifiedAmount;
        this.CashVerifiedOrder=this.DashboardList.CashVerifiedOrder;
        this.CashNotVerifiedAmount=this.DashboardList.CashNotVerifiedAmount;
        this.CashNotVerifiedOrder=this.DashboardList.CashNotVerifiedOrder;
        this.CashPartiallyVerifiedAmount=this.DashboardList.CashPartiallyVerifiedAmount;
        this.CashPartiallyVerifiedOrder=this.DashboardList.CashPartiallyVerifiedOrder;
        this.ChequeVerifiedAmount=this.DashboardList.ChequeVerifiedAmount;
        this.ChequeVerifiedOrder=this.DashboardList.ChequeVerifiedOrder;
        this.ChequeNotVerifiedAmount=this.DashboardList.ChequeNotVerifiedAmount;
        this.ChequeNotVerifiedOrder=this.DashboardList.ChequeNotVerifiedOrder;
        this.ChequePartiallyVerifiedAmount=this.DashboardList.ChequePartiallyVerifiedAmount;
        this.ChequePartiallyVerifiedOrder=this.DashboardList.ChequePartiallyVerifiedOrder;
        this.DirectUdharVerifiedAmount=this.DashboardList.DirectUdharVerifiedAmount;
        this.DirectUdharVerifiedOrder=this.DashboardList.DirectUdharVerifiedOrder;
        this.DirectUdharNotVerifiedAmount=this.DashboardList.DirectUdharNotVerifiedAmount;
        this.DirectUdharNotVerifiedOrder=this.DashboardList.DirectUdharNotVerifiedOrder;
        this.DirectUdharPartiallyVerifiedAmount=this.DashboardList.DirectUdharPartiallyVerifiedAmount;
        this.DirectUdharPartiallyVerifiedOrder=this.DashboardList.DirectUdharPartiallyVerifiedOrder;
        this.GullakVerifiedAmount=this.DashboardList.GullakVerifiedAmount;
        this.GullakVerifiedOrder=this.DashboardList.GullakVerifiedOrder;
        this.GullakNotVerifiedAmount=this.DashboardList.GullakNotVerifiedAmount;
        this.GullakNotVerifiedOrder=this.DashboardList.GullakNotVerifiedOrder;
        this.GullakPartiallyVerifiedAmount=this.DashboardList.GullakPartiallyVerifiedAmount;
        this.GullakPartiallyVerifiedOrder=this.DashboardList.GullakPartiallyVerifiedOrder;
        this.hdfcVerifiedAmount=this.DashboardList.hdfcVerifiedAmount;
        this.hdfcVerifiedOrder=this.DashboardList.hdfcVerifiedOrder;
        this.UPINotVerifiedAmount=this.DashboardList.UPINotVerifiedAmount;
        this.UPINotVerifiedOrder=this.DashboardList.UPINotVerifiedOrder;
        this.UPIPartiallyVerifiedAmount=this.DashboardList.UPIPartiallyVerifiedAmount;
        this.UPIPartiallyVerifiedOrder=this.DashboardList.UPIPartiallyVerifiedOrder;
        this.UPIVerifiedAmount=this.DashboardList.UPIVerifiedAmount;
        this.UPIVerifiedOrder=this.DashboardList.UPIVerifiedOrder;
        this.hdfcNotVerifiedAmount=this.DashboardList.hdfcNotVerifiedAmount;
        this.hdfcNotVerifiedOrder=this.DashboardList.hdfcNotVerifiedOrder;
        this.hdfcPartiallyVerifiedAmount=this.DashboardList.hdfcPartiallyVerifiedAmount;
        this.hdfcPartiallyVerifiedOrder=this.DashboardList.hdfcPartiallyVerifiedOrder;
        this.RTGS_NEFTVerifiedAmount=this.DashboardList.RTGS_NEFTVerifiedAmount;
        this.RTGS_NEFTVerifiedOrder=this.DashboardList.RTGS_NEFTVerifiedOrder;
        this.RTGS_NEFTNotVerifiedAmount=this.DashboardList.RTGS_NEFTNotVerifiedAmount;
        this.RTGS_NEFTNotVerifiedOrder=this.DashboardList.RTGS_NEFTNotVerifiedOrder;
        this.RTGS_NEFTPartiallyVerifiedAmount=this.DashboardList.RTGS_NEFTPartiallyVerifiedAmount;
        this.RTGS_NEFTPartiallyVerifiedOrder=this.DashboardList.RTGS_NEFTPartiallyVerifiedOrder;
        this.TotalOrders	=this.DashboardList.TotalOrders;
        this.TotalAmount	=this.DashboardList.TotalAmount;
        this.TotalVerifiedOrder	=this.DashboardList.TotalVerifiedOrder;
        this.TotalVerifiedAmount	=this.DashboardList.TotalVerifiedAmount;
        this.TotalNotVerifiedOrder	=this.DashboardList.TotalNotVerifiedOrder;
        this.TotalNotVerifiedAmount=this.DashboardList.TotalNotVerifiedAmount	;
        this.TotalPartialVerifiedOrder=this.DashboardList.TotalPartialVerifiedOrder	;
        this.TotalPartialVerifiedAmount=this.DashboardList.TotalPartialVerifiedAmount;
        this.ExcessAmount=this.DashboardList.ExcessAmount;
        this.RefundAmount=this.DashboardList.RefundAmount;
        this.blocked = false;
      })
    }
  }
 
  onSearch() {
    this.IsToday= false;
    this.IsMonth=false;
    if (this.SelectedCity == undefined || this.SelectedCity.length == 0) {
      alert("Please Select City");
      return false;
    }
    else if (this.SelectedWarehouse == null || this.SelectedWarehouse == undefined || this.SelectedWarehouse.length == 0) {
      alert("Please Select Warehouse")
      return false;
    }
    else if (this.FromDate == undefined ) {
      alert("please select StartDate");
      return false;
    } else if (this.ToDate == undefined) {
      alert("please select EndDate");
      return false;
    }

    this.WarId = [];
    if ((this.SelectedWarehouse.length > 0 || this.SelectedWarehouse != undefined) ) {
      this.SelectedWarehouse.forEach((element) => {
        this.WarId.push(element.value);
      })
      const payload = {
        "warehouseId": this.WarId,
        "StartDate":  this.FromDate ? moment(this.FromDate).format("YYYY-MM-DD "): null,
        "EndDate": this.ToDate ? moment(this.ToDate).format("YYYY-MM-DD") : null,
        "IsMonth": this.IsMonth,
        "IsToday": this.IsToday,
      }
      this.blocked = true;
      this.ReconciliationServiec.getOrderToOrderReconciliationDashboard(payload).subscribe(res => {
        this.DashboardList=res;
        console.log(this.DashboardList,"DashboardList");
        
        this.CashVerifiedAmount=this.DashboardList.CashVerifiedAmount;
        this.CashVerifiedOrder=this.DashboardList.CashVerifiedOrder;
        this.CashNotVerifiedAmount=this.DashboardList.CashNotVerifiedAmount;
        this.CashNotVerifiedOrder=this.DashboardList.CashNotVerifiedOrder;
        this.CashPartiallyVerifiedAmount=this.DashboardList.CashPartiallyVerifiedAmount;
        this.CashPartiallyVerifiedOrder=this.DashboardList.CashPartiallyVerifiedOrder;
        this.ChequeVerifiedAmount=this.DashboardList.ChequeVerifiedAmount;
        this.ChequeVerifiedOrder=this.DashboardList.ChequeVerifiedOrder;
        this.ChequeNotVerifiedAmount=this.DashboardList.ChequeNotVerifiedAmount;
        this.ChequeNotVerifiedOrder=this.DashboardList.ChequeNotVerifiedOrder;
        this.ChequePartiallyVerifiedAmount=this.DashboardList.ChequePartiallyVerifiedAmount;
        this.ChequePartiallyVerifiedOrder=this.DashboardList.ChequePartiallyVerifiedOrder;
        this.DirectUdharVerifiedAmount=this.DashboardList.DirectUdharVerifiedAmount;
        this.DirectUdharVerifiedOrder=this.DashboardList.DirectUdharVerifiedOrder;
        this.DirectUdharNotVerifiedAmount=this.DashboardList.DirectUdharNotVerifiedAmount;
        this.DirectUdharNotVerifiedOrder=this.DashboardList.DirectUdharNotVerifiedOrder;
        this.DirectUdharPartiallyVerifiedAmount=this.DashboardList.DirectUdharPartiallyVerifiedAmount;
        this.DirectUdharPartiallyVerifiedOrder=this.DashboardList.DirectUdharPartiallyVerifiedOrder;
        this.GullakVerifiedAmount=this.DashboardList.GullakVerifiedAmount;
        this.GullakVerifiedOrder=this.DashboardList.GullakVerifiedOrder;
        this.GullakNotVerifiedAmount=this.DashboardList.GullakNotVerifiedAmount;
        this.GullakNotVerifiedOrder=this.DashboardList.GullakNotVerifiedOrder;
        this.GullakPartiallyVerifiedAmount=this.DashboardList.GullakPartiallyVerifiedAmount;
        this.GullakPartiallyVerifiedOrder=this.DashboardList.GullakPartiallyVerifiedOrder;
        this.hdfcVerifiedAmount=this.DashboardList.hdfcVerifiedAmount;
        this.hdfcVerifiedOrder=this.DashboardList.hdfcVerifiedOrder;
        this.UPINotVerifiedAmount=this.DashboardList.UPINotVerifiedAmount;
        this.UPINotVerifiedOrder=this.DashboardList.UPINotVerifiedOrder;
        this.UPIPartiallyVerifiedAmount=this.DashboardList.UPIPartiallyVerifiedAmount;
        this.UPIPartiallyVerifiedOrder=this.DashboardList.UPIPartiallyVerifiedOrder;
        this.UPIVerifiedAmount=this.DashboardList.UPIVerifiedAmount;
        this.UPIVerifiedOrder=this.DashboardList.UPIVerifiedOrder;
        this.hdfcNotVerifiedAmount=this.DashboardList.hdfcNotVerifiedAmount;
        this.hdfcNotVerifiedOrder=this.DashboardList.hdfcNotVerifiedOrder;
        this.hdfcPartiallyVerifiedAmount=this.DashboardList.hdfcPartiallyVerifiedAmount;
        this.hdfcPartiallyVerifiedOrder=this.DashboardList.hdfcPartiallyVerifiedOrder;
        this.RTGS_NEFTVerifiedAmount=this.DashboardList.RTGS_NEFTVerifiedAmount;
        this.RTGS_NEFTVerifiedOrder=this.DashboardList.RTGS_NEFTVerifiedOrder;
        this.RTGS_NEFTNotVerifiedAmount=this.DashboardList.RTGS_NEFTNotVerifiedAmount;
        this.RTGS_NEFTNotVerifiedOrder=this.DashboardList.RTGS_NEFTNotVerifiedOrder;
        this.RTGS_NEFTPartiallyVerifiedAmount=this.DashboardList.RTGS_NEFTPartiallyVerifiedAmount;
        this.RTGS_NEFTPartiallyVerifiedOrder=this.DashboardList.RTGS_NEFTPartiallyVerifiedOrder;
        this.TotalOrders	=this.DashboardList.TotalOrders;
        this.TotalAmount	=this.DashboardList.TotalAmount;
        this.TotalVerifiedOrder	=this.DashboardList.TotalVerifiedOrder;
        this.TotalVerifiedAmount	=this.DashboardList.TotalVerifiedAmount;
        this.TotalNotVerifiedOrder	=this.DashboardList.TotalNotVerifiedOrder;
        this.TotalNotVerifiedAmount=this.DashboardList.TotalNotVerifiedAmount	;
        this.TotalPartialVerifiedOrder=this.DashboardList.TotalPartialVerifiedOrder	;
        this.TotalPartialVerifiedAmount=this.DashboardList.TotalPartialVerifiedAmount;
        this.ExcessAmount=this.DashboardList.ExcessAmount;
        this.RefundAmount=this.DashboardList.RefundAmount;
        this.blocked = false;
      })
    }
  }
  export(){
    if (this.SelectedCity == undefined || this.SelectedCity.length == 0) {
      alert("Please Select City");
      return false;
    }
    else if (this.SelectedWarehouse == null || this.SelectedWarehouse == undefined || this.SelectedWarehouse.length == 0) {
      alert("Please Select Warehouse")
      return false;
    }
    else if (this.FromDate == undefined ) {
      alert("please select StartDate");
      return false;
    } else if (this.ToDate == undefined) {
      alert("please select EndDate");
      return false;
    }
    this.WarId = [];
    if ((this.SelectedWarehouse.length > 0 || this.SelectedWarehouse != undefined) ) {
      this.SelectedWarehouse.forEach((element) => {
        this.WarId.push(element.value);
      })
      const payload = {
        "warehouseId": this.WarId,
        "StartDate":  this.FromDate ? moment(this.FromDate).format("YYYY-MM-DD "): null,
        "EndDate": this.ToDate ? moment(this.ToDate).format("YYYY-MM-DD") : null,
        "IsMonth": this.IsMonth,
        "IsToday": this.IsToday,
      }
      this.blocked = true;
      this.ReconciliationServiec.ExportorderReconcilationDashboard(payload).subscribe(res => {
        this.blocked=false;
        if(res.Status){
          // console.log(res.data);
          this.exportService.exportAsExcelFile(res.data, 'OrderReconcillationData');
        }
        else{
          alert(res.Message)
        }
      })
    }
  }
  EndDate:any;
  StartDate:any;
  MisToBank()
  {
  
    if (this.FromDate == undefined ) {
      alert("please select StartDate");
      return false;
    } else if (this.ToDate == undefined) {
      alert("please select EndDate");
      return false;
    }
    if ((this.FromDate != undefined && this.ToDate != undefined) ) {
      this.StartDate=  this.FromDate ? moment(this.FromDate).format("YYYY-MM-DD "): "",
      this.EndDate= this.ToDate ? moment(this.ToDate).format("YYYY-MM-DD") : ""
      // const payload = {
      //   "FromDate":  this.FromDate ? moment(this.FromDate).format("YYYY-MM-DD "): null,
      //   "ToDate": this.ToDate ? moment(this.ToDate).format("YYYY-MM-DD") : null,
      // }
      this.blocked = true;
      this.ReconciliationServiec.GetMistobank(this.StartDate,this.EndDate).subscribe(res => {
        this.blocked=false;
        if(res.length>0){
          this.exportService.exportAsExcelFile(res, 'ExportMisToBank');
          console.log(res);
          
        }
        else{
          alert("No Data Found")
        }
      })
    }
  }
}
