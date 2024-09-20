import { Component, OnInit } from '@angular/core';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sales-appdashboard',
  templateUrl: './sales-appdashboard.component.html',
  styleUrls: ['./sales-appdashboard.component.scss']
})
export class SalesAppdashboardComponent implements OnInit {
  masterwarehouseList: any[];
  ExecList: any[];
  filterdata: any;
  selectedExecutive: any;
  SalesDeshboardList: any[];
  blocked: boolean;
  constructor(private _Service: ShoppingCartService, private digitalsaleService: DigitalSaleService, private exportService: ExportServiceService,) {
    this.filterdata = {}
    this.filterdata.WarehouseId = 0;
  }

  ngOnInit() {
    this.getWarehouse();
  }
  getWarehouse() {
    this.blocked = true;

    this._Service.GetAllWarehouse().subscribe(result => {
      this.blocked = false

      this.masterwarehouseList = result;
    });
  }
  OnChange(WhId) {
    this.blocked = true;
    this.selectedExecutive = null;
    this.ExecList = null;
    this.SalesDeshboardList = null;
    this.digitalsaleService.GetSalesExecutive(WhId).subscribe(result => {
      this.blocked = false
      this.ExecList = result;
    });
  }

  Search() {
    if (this.filterdata.WarehouseId == 0 || this.filterdata.WarehouseId == undefined) {
      alert("Please select Warehouse !");
      return;
    }
    if (this.selectedExecutive == 0 || this.selectedExecutive == undefined) {
      alert("Please select Executive !");
      return;
    }
    if (this.filterdata.StartDate == null || this.filterdata.StartDate == undefined) {
      alert("Please select Start Date!");
      return;
    }
    if (this.filterdata.EndDate == null || this.filterdata.EndDate == undefined) {
      alert("Please select End Date!");
      return;
    }
    if (this.filterdata.EndDate != null && this.filterdata.StartDate != null) {
      var date1 = new Date(moment(this.filterdata.startDate).format('MM/DD/YYYY'));
      var date2 = new Date(moment(this.filterdata.endDate).format('MM/DD/YYYY'));
      var Time = date2.getTime() - date1.getTime();
      var Days = Time / (1000 * 3600 * 24); //Diference in Days
      if (Days > 30) {
        alert("Date Range Must Be Below 30 days");
        return;
      }
    }

    let ExecutiveIds = [];
    for (var i in this.selectedExecutive) {
      ExecutiveIds.push(this.selectedExecutive[i].ExecutiveId)
    }
    let obj = {
      WarehouseId: null,
      PeopleIds: null,
      StartDate: null,
      EndDate: null
    }
    obj.PeopleIds = ExecutiveIds;
    obj.WarehouseId = this.filterdata.WarehouseId;
    obj.StartDate = this.filterdata.StartDate;
    obj.EndDate = this.filterdata.EndDate;
    this.SalesDeshboardList = null;
    this.blocked = true;

    this.digitalsaleService.GetSalesDashboardReport(obj).subscribe(result => {
      this.blocked = false;

      if (result && result.length > 0) {
        this.SalesDeshboardList = result;

      } else {
        alert("No record found");
      }
    });
  }
  Export() {
    if (this.filterdata.WarehouseId == 0 || this.filterdata.WarehouseId == undefined) {
      alert("Please select Warehouse !");
      return;
    }
    if (this.selectedExecutive == 0 || this.selectedExecutive == undefined) {
      alert("Please select Executive !");
      return;
    }
    if (this.filterdata.StartDate == null || this.filterdata.StartDate == undefined) {
      alert("Please select Start Date!");
      return;
    }
    if (this.filterdata.EndDate == null || this.filterdata.EndDate == undefined) {
      alert("Please select End Date!");
      return;
    }
    if (this.filterdata.EndDate != null && this.filterdata.StartDate != null) {
      var date1 = new Date(moment(this.filterdata.startDate).format('MM/DD/YYYY'));
      var date2 = new Date(moment(this.filterdata.endDate).format('MM/DD/YYYY'));
      var Time = date2.getTime() - date1.getTime();
      var Days = Time / (1000 * 3600 * 24); //Diference in Days
      if (Days > 30) {
        alert("Date Range Must Be Below 30 days");
        return;
      }
    }

    let ExecutiveIds = [];
    for (var i in this.selectedExecutive) {
      ExecutiveIds.push(this.selectedExecutive[i].ExecutiveId)
    }
    let obj = {
      WarehouseId: null,
      PeopleIds: null,
      StartDate: null,
      EndDate: null
    }
    obj.PeopleIds = ExecutiveIds;
    obj.WarehouseId = this.filterdata.WarehouseId;
    obj.StartDate = this.filterdata.StartDate;
    obj.EndDate = this.filterdata.EndDate;
    this.SalesDeshboardList = null;
    this.blocked = true;

    this.digitalsaleService.GetSalesDashboardReport(obj).subscribe(result => {
      this.blocked = false;

      this.exportService.exportAsExcelFile(result, 'SalesDashboardReport');
    });

  }
  clear() {
    this.filterdata = {};
    this.SalesDeshboardList = null;
    this.selectedExecutive = null;
    this.filterdata.WarehouseId = 0;
  }

  ExportVisit(Data) {
    if (Data) {
      this.exportService.exportAsExcelFile(Data, 'VisitReport');
    }
  }

}
