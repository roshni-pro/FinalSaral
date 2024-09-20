import { Component, OnInit } from '@angular/core';
import { OpreportsService } from 'app/opreports/services/opreports.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-order-process-report',
  templateUrl: './order-process-report.component.html',
  styleUrls: ['./order-process-report.component.scss']
})
export class OrderProcessReportComponent implements OnInit {

  // variables
  cities: any[] = []; // temp var
  allWarehouses: any[] = [];
  selectedWarehouse: any;
  OPReports: any[] = [];
  isReportsAvailable: boolean = false;

  AllDataExport: any;
  FailedOrderExport: any;
  PaymentPendingOrderExport: any;
  PendingOrderExport: any;
  ReadyToPickExport: any;
  ReadytodispatchOrderExport: any;
  IssuedOrderExport: any;
  ShippedOrderExport: any;
  DeliveryCancelledOrderExport: any;
  DeliveredRedispatchedOrderExport: any;
  DeliveredOrderExport: any;

  constructor(private apiService: OpreportsService, private exportService: ExportServiceService) {
    // temp
  }

  ngOnInit() {
    this.apiService.getAllActiveWarehouse().subscribe(
      (res) => {
        console.log(res);
        if (res.length > 0) {
          this.allWarehouses = res;
        } else {
          alert("Error - No warehouse Found")
        }
      },
      (err) => { console.log(err); }
    );
  }

  searchByWarehouses() {
    if (this.selectedWarehouse == undefined) {
      alert("please select a warehouse");
    } else if (this.selectedWarehouse.length == 0) {
      alert("please select a warehouse")
    } else {
      let warehouseIDs: any[] = [];
      this.selectedWarehouse.forEach(element => {
        warehouseIDs.push(element.WarehouseId)
      });
      this.getOPReportsByWarehouseID(warehouseIDs);
      // console.log("warehouseIDs final -", warehouseIDs);
    }
  }

  getOPReportsByWarehouseID(warehouseIDs) {
    this.apiService.getOrederProcessReport(warehouseIDs).subscribe(
      (res: any) => {
        console.log(res);
        this.OPReports = res;
        this.AllDataExport = res.ExportAll;
        this.FailedOrderExport = res.FailedOrderDetail;
        this.PaymentPendingOrderExport = res.PaymentPendingOrderDetail;
        this.PendingOrderExport = res.PendingOrderDetail;
        this.ReadyToPickExport = res.ReadyToPickDetail;
        this.ReadytodispatchOrderExport = res.ReadytodispatchOrderDetail;
        this.IssuedOrderExport = res.IssuedOrderDetail;
        this.ShippedOrderExport = res.ShippedOrderDetail;
        this.DeliveryCancelledOrderExport = res.DeliveryCancelledOrderDetail;
        this.DeliveredRedispatchedOrderExport = res.DeliveredRedispatchedOrderDetail;
        this.DeliveredOrderExport = res.DeliveredOrderDetail;

        this.isReportsAvailable = true;
        //alert("get data")
      },
      (err) => {
        console.log(err);
        this.isReportsAvailable = false;
      }
    );
  }

  exportAll() {
    console.log("exporting");
  }

  export(type) {
    console.log(type);
    switch (type) {
      case "exportALL":
        this.exportService.exportAsExcelFile(this.AllDataExport, 'ALL Export Data');
        break;
      case "Failed":
        this.exportService.exportAsExcelFile(this.FailedOrderExport, 'FailedOrders');
        break;
      case "PaymentPending":
        this.exportService.exportAsExcelFile(this.PaymentPendingOrderExport, 'PaymentPending');
        break;
      case "Pending":
        this.exportService.exportAsExcelFile(this.PendingOrderExport, 'Pending');
        break;
      case "ReadyToPick":
        this.exportService.exportAsExcelFile(this.ReadyToPickExport, 'ReadyToPick');
        break;
      case "ReadyToDispatch":
        this.exportService.exportAsExcelFile(this.ReadytodispatchOrderExport, 'ReadyToDispatch');
        break;
      case "Issued":
        this.exportService.exportAsExcelFile(this.IssuedOrderExport, 'Issued');
        break;
      case "Shipped":
        this.exportService.exportAsExcelFile(this.ShippedOrderExport, 'Shipped');
        break;
      case "DeliveryCancelled":
        this.exportService.exportAsExcelFile(this.DeliveryCancelledOrderExport, 'DeliveryCancelled');
        break;
      case "DeliveredRe-Dispatch":
        this.exportService.exportAsExcelFile(this.DeliveredRedispatchedOrderExport, 'DeliveredRe-Dispatch');
        break;
      case "Delivered":
        this.exportService.exportAsExcelFile(this.DeliveredOrderExport, 'Delivered');
        break;
      default:
        alert("Please Try Again")
    }
  }

}
