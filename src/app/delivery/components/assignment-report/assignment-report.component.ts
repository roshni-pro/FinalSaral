import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryAssignmentService } from 'app/shared/services/delivery-assignment.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';
@Component({
  selector: 'app-assignment-report',
  templateUrl: './assignment-report.component.html',
  styleUrls: ['./assignment-report.component.scss']
})
export class AssignmentReportComponent implements OnInit {
  serachData;
  blocked: boolean = false;
  WarehouseList;
  end;
  startDateSearch;
  searchdta;

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private deliveryServices: DeliveryAssignmentService,
    public exportService: ExportServiceService,
  ) {
    this.serachData = {};
  }

  ngOnInit() {
    this.getAllWarehouseList();
  }

  getAllWarehouseList() { // get all wherehouse list for top search dropdown
    this.blocked = true;
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.blocked = false;
      this.WarehouseList = result;
    })
  }

  endDateVal(e) {
    this.end = e.toLocaleString('en-US')
  }

  startDateUpdate(e) {
    this.startDateSearch = e.toLocaleString('en-US')
  }

  ExportAssignmentReport() {
    console.log(this.serachData.wherehouseId);

    if (!this.serachData.wherehouseId && (this.serachData.wherehouseId == '' || this.serachData.wherehouseId == undefined)) {
      alert("Please select atleast 1 Warehouse");
      return;
    }
    let whids = this.serachData.wherehouseId.map(a => a.WarehouseId);
    if ((!this.startDateSearch && (this.startDateSearch == '' || this.startDateSearch == undefined))) {
      alert("Please select start date");
      return;
    }
    if ((!this.end  && (this.end == '' || this.end ==  undefined))) {
      alert("Please select end date");
      return;
    }
    let DateFrom = this.startDateSearch.toLocaleString();
    let DateTo = this.end.toLocaleString();
    let url = '?warehouseId=' + whids.toString() + "&start=" + DateFrom + "&end=" + DateTo;
    this.blocked = true;
    this.deliveryServices.ExportAssignment(url, whids).subscribe(data => {
      this.blocked = false;
      this.exportService.exportAsExcelFile(data, 'AssignmentReport');
    });
  }

  searchdata = function () {
    var start = "";
    var end = "";

    if (!this.serachData.wherehouseId && (this.serachData.wherehouseId == '' || this.serachData.wherehouseId == undefined)) {
      alert("Please select atleast 1 Warehouse");
      return;
    }
    let whids = this.serachData.wherehouseId.map(a => a.WarehouseId);
    let url
    console.log(this.startDateSearch, this.end, 'ddd');

    if ((this.startDateSearch == '' || this.startDateSearch == undefined) && (this.end == '' || this.end == undefined)) {
      url = '?warehouseId=' + whids.toString();
    }
    else {
      start = moment(this.startDateSearch).format('MM/DD/YYYY 12:00') +' '+'AM';
      end = moment(this.end).format('MM/DD/YYYY 11:59') +' '+'PM';
      url = '?warehouseId=' + whids.toString() + "&start=" + start + "&end=" + end;
    }
    this.blocked = true;
    this.deliveryServices.searchAllDataWithoutDate(url, whids).subscribe(results => {
      this.blocked = false;
      this.searchdta = results;
      console.log(this.searchdta);

    });

  }

  ExportAll(data) {
    if (!data && data == undefined) {
      alert("Please First Click On Search Button");
      return;
    } else {
      this.exportService.exportAsExcelFile(data, 'ExportReport');
    }
  }

  Export(data) {
    if (!data && data == undefined) {
      alert("Please First Click On Search Button");
      return;
    } else {
      this.exportService.exportAsExcelFile(data, 'ExportReport');
    }
  };

}
