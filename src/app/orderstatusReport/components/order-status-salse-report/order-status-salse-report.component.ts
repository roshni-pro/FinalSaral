import { Component, OnInit } from '@angular/core';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { OrderSalseReportService } from 'app/shared/services/order-salse-report.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { HeatmapServiceService } from 'app/shared/services/heatmap-service.service';
import { ExportService } from 'app/shared/services/export.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-order-status-salse-report',
  templateUrl: './order-status-salse-report.component.html',
  styleUrls: ['./order-status-salse-report.component.scss']
})
export class OrderStatusSalseReportComponent implements OnInit {
  clusterList: any;
  warehouseList: any;
  orderStatusReport: any;
  data: any;
  cols: any;
  showInTransit: boolean = true;
  isReport: boolean = false;
  SelectedWarehouse: any;
  SelectedCluster: any;
  constructor(private heatmapservice: HeatmapServiceService,
    private messageService: MessageService,
    private pickerService: PickerService,
    private orderStatusReportService: OrderSalseReportService,
    private exportServiceService: ExportServiceService,
    private loaderService: LoaderService) { this.data = {}; this.clusterList = []; this.orderStatusReport = []; }

  ngOnInit() {
    this.data = {
      Warehouseid: [],
      Clusterid: [],
      StartDate: null,
      EndDate: null
    }
    this.OnShowHeader()

    this.pickerService.GetAllWarehouseNew().subscribe(result => {
      this.warehouseList = result;
    })
  }

  // onWarehouseChange(id){
  //   this.pickerService.GetAllCluster(id).subscribe(result=>{
  //     this.clusterList = result;
  //     console.log(this.clusterList)
  //   })
  //}

  Export() {
    if (this.orderStatusReport.length > 0) {
      
      this.loaderService.loading(true)
      this.exportServiceService.exportAsExcelFile(this.orderStatusReport, "OrderStatusSalseReport")
      this.loaderService.loading(false)

    } else {
      this.messageService.add({ severity: 'error', summary: "Please Fill all fields ", detail: '' });

    }
  }
  search(data) {
    this.loaderService.loading(true)
    console.log(this.data);
    if (this.data.Warehouseid.length > 0 && this.data.Clusterid.length > 0 && this.data.EndDate) {
      this.orderStatusReport = [];

      this.data.StartDate = moment(new Date()).format("YYYY/MM/DD");
      // this.data.StartDate = moment(this.data.EndDate).format("YYYY/MM/DD");
      this.orderStatusReportService.GetOrderStatusReport(this.data).subscribe(result => {
        this.loaderService.loading(false)
        console.log(result);
        this.isReport = true;
        this.orderStatusReport = result;

        if (this.orderStatusReport.length > 0) {
          this.isReport = true;
        } else {
          this.isReport = false;
          this.loaderService.loading(false)

          this.messageService.add({ severity: 'error', summary: "No Data Found ", detail: '' });
          //this.orderStatusReport = [];
        }
      })
    } else {
      this.loaderService.loading(false)

      this.messageService.add({ severity: 'error', summary: "Please Fill all fields ", detail: '' });
    }

  }

  onSelectedWarehouseChange() {

    console.log(this.SelectedWarehouse);
    let warehouseList = this.SelectedWarehouse.map(x => x.value)
  }

  OnShowHeader() {
    
    this.showInTransit = this.showInTransit ? false : true;
    if (this.showInTransit) {

      this.cols = [
        { field: 'WarehouseName', header: 'Warehouse Name' },
        { field: 'ClusterName', header: 'Cluster Name' },
        { field: 'AgentName', header: 'Agent Name' },
        { field: 'PendingCount', header: 'Pending Count' },
        { field: 'PendingValue', header: 'Pending Value' },
        { field: 'ReadytoDispatchCount', header: 'Ready to Dispatch Count' },
        { field: 'ReadytoDispatchValue', header: 'Ready to Dispatch Value' },
        { field: 'InTransitCount', header: 'InTransit Count' },
        { field: 'InTransitValue', header: 'InTransit Value' },
        { field: 'ShippedCount', header: 'Shipped Count' },
        { field: 'ShippedValue', header: 'Shipped Value' },
        { field: 'IssuedCount', header: 'Issued Count' },
        { field: 'IssuedValue', header: 'Issued Value' },
        { field: 'DeliveryRedispatchCount', header: 'Delivery Re-dispatch Count' },
        { field: 'DeliveryRedispatchValue', header: 'Delivery Re-dispatch Value' },
        { field: 'DeliveredCount', header: 'Delivered Count' },
        { field: 'DeliveredValue', header: 'Delivered Value' },

      ]

    }
    else {
      this.cols = [
        { field: 'WarehouseName', header: 'Warehouse Name' },
        { field: 'ClusterName', header: 'Cluster Name' },
        { field: 'AgentName', header: 'Agent Name' },
        { field: 'PendingCount', header: 'Pending Count' },
        { field: 'PendingValue', header: 'Pending Value' },
        { field: 'ReadytoDispatchCount', header: 'Ready to Dispatch Count' },
        { field: 'ReadytoDispatchValue', header: 'Ready to Dispatch Value' },
        { field: 'InTransitCount', header: 'InTransit Count' },
        { field: 'InTransitValue', header: 'InTransit Value' },
        { field: 'DeliveredCount', header: 'Delivered Count' },
        { field: 'DeliveredValue', header: 'Delivered Value' },
      ]
    }

  }

  onSelectWarehouseList() {
    console.log("this.SelectedWarehouse");
    console.log(this.SelectedWarehouse);
    let warehouseList = this.SelectedWarehouse.map(x => x.value);
    this.data.Warehouseid = warehouseList;
    this.heatmapservice.Cluster(warehouseList).subscribe(result => {
      this.clusterList = result;
      console.log('this.ClusterList:', this.clusterList);
    })

  }

  onSelectedClusterChange() {
    console.log(this.SelectedCluster);
    this.data.Clusterid = this.SelectedCluster.map(x => x.ClusterId);
  }
}
