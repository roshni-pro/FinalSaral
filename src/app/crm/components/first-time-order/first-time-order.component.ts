import { Component, OnInit } from '@angular/core';
import { CrmService } from 'app/crm/services/crm.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-first-time-order',
  templateUrl: './first-time-order.component.html',
  styleUrls: ['./first-time-order.component.scss']
})
export class FirstTimeOrderComponent implements OnInit {

  allCity: any[] = [];
  allWarehouse: any[] = [];
  searchDate: any[];
  warehouseID: number;
  allCustomerDetail: any[] = [];
  startDate: any;
  endDate: any;

  // validation containers
  isNoWarehouse: boolean = true;
  isCustomerListAvailable: boolean = false;

  constructor(private apiService: CrmService, private exportService: ExportServiceService) { }

  ngOnInit() {
    this.getCity();
  }

  getCity() {
    this.apiService.getCity().subscribe(
      (res) => {
        this.allCity = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getWarehouse(val) {
    this.apiService.getWarehouseByCityID(val.target.value).subscribe(
      (res) => {
        if (res.length != 0) {
          this.allWarehouse = res;
          this.warehouseID = res[0].WarehouseId;
          this.isNoWarehouse = false;
        } else {
          this.isNoWarehouse = true;
          this.allWarehouse = [];
          this.warehouseID = null;
        }
      },
      (err) => { console.log(err) }
    )
  }

  getSearchResults() {

    let startDate = this.startDate ? moment(this.startDate).format('YYYY/MM/DD') : null;
    let endDate = this.endDate ? moment(this.endDate).format('YYYY/MM/DD') : null;
    console.log(startDate, endDate, this.warehouseID);

    if (startDate == null) {
      alert("please Select Start Date")
    }else if(endDate == null){
      alert("please Select End Date");
    } else if(this.warehouseID == undefined){
      alert("Please Select a Warehouse");
    }
     else {
      this.apiService.getResultFirstCustomerByDateRange(this.warehouseID, startDate, endDate).subscribe(
        (res) => {
          if (res.length > 0) {
            console.log(res);
            this.allCustomerDetail = res;
            this.isCustomerListAvailable = true;
          } else {
            alert("Customer List is Empty");
            this.allCustomerDetail = [];
            this.isCustomerListAvailable = false;
          }
        },
        (err) => {
          console.log(err);
          this.allCustomerDetail = [];
          this.isCustomerListAvailable = false;
        }
      )
    }
  }

  exportExcel() {
    this.exportService.exportAsExcelFile(this.allCustomerDetail, 'exportData');
  }



}
