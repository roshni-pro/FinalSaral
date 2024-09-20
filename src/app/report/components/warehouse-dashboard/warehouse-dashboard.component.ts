import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';

@Component({
  selector: 'app-warehouse-dashboard',
  templateUrl: './warehouse-dashboard.component.html',
  styleUrls: ['./warehouse-dashboard.component.scss']
})
export class WarehouseDashboardComponent implements OnInit {
  warehouseList : any;
  wHdashboard : any;
  tempData : any;
  Warehouseid : any;
  dashboardData : any;
  salesPersonList : any;
  dBoyPeronList : any;
  role : string;
  constructor(private warehouseService : WarehouseService) { this.wHdashboard ={}; }

  ngOnInit() {
    this.wHdashboard.selectedWarehouse = null;
    this.wHdashboard.CustomerType = null;
    this.Warehouseid = localStorage.getItem('Warehouseid');
    if(this.Warehouseid != '0'){
      this.wHdashboard.selectedWarehouse = Number.parseInt(this.Warehouseid);
      this.getData();
      }
    this.role = localStorage.getItem('role');
    var RoleList = this.role.split(',');
    for (var i in RoleList) {
      if (RoleList[i] == 'HQ Master login') {
        if(this.Warehouseid == '0'){
        this.wHdashboard.selectedWarehouse = null;
        }
      }
      else {
        
      }
    }
    debugger;
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      // var whList = result.filter(x=>x.WarehouseId == this.Warehouseid);
      this.warehouseList = result;
      // this.wHdashboard.selectedWarehouse = Number.parseInt('this.Warehouseid');
      // debugger;
    })
    console.log('Warehouseid is : ',this.Warehouseid);
    // this.tempData = [{
    //   SalesPerson : 'Vaibhav Johri',
    //   Cancellation : 20,
    //   CancelOrders : 500,
    //   CancellationAmt : 500000,
    //   WarningHit : 'Yes',
    //   num : 1
    // },
    // {
    //   SalesPerson : 'Vaibhav Johari',
    //   Cancellation : 18,
    //   CancelOrders : 480,
    //   CancellationAmt : 400000,
    //   WarningHit : 'Yes',
    //   num : 1
    // }]
  }
  getData(){
    this.dashboardData=null;
    this.salesPersonList=null;
    this.dBoyPeronList=null;
    this.warehouseService.warehouseDashboardById(this.wHdashboard.selectedWarehouse).subscribe(x=>{
      debugger;
      this.dashboardData = x;
      console.log('wHDashboard Data',x);
        this.warehouseService.warehouseSaleManReport(this.wHdashboard.selectedWarehouse).subscribe(salesReport=>{
          console.log('salesReport Data',salesReport);
          this.salesPersonList = salesReport;
            this.warehouseService.warehouseDboyReport(this.wHdashboard.selectedWarehouse).subscribe(dboyReport=>{
              console.log('dboyReport Data',dboyReport);
              this.dBoyPeronList = dboyReport;
            })
        })
     
    })
  }
}
