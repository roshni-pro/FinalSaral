import { Component, OnInit } from '@angular/core';
import { tatReportInterface } from 'app/shared/interface/TAT/TATReportInterface';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { TatService } from 'app/shared/services/tat.service';
import * as moment from 'moment';
import { element } from 'protractor';

@Component({
  selector: 'app-tat-report-dashboard',
  templateUrl: './tat-report-dashboard.component.html',
  styleUrls: ['./tat-report-dashboard.component.scss']
})
export class TatReportDashboardComponent implements OnInit {

  warehouseId: any;

  spList = [
    { id: "TurnAroundTime", label: "TurnAroundTime" },
    { id: "PendingToReadyToDispatchTAT", label: "PendingToReadyToDispatchTAT" },
    { id: "ReadyToDispatchToShippedTAT", label: "ReadyToDispatchToShippedTAT" },
    { id: "ShippedToDelivertTAT", label: "ShippedToDelivertTAT" },
    { id: "OrderDispatchDashboardTAT", label: "OrderDispatchDashboardTAT" },
    { id: "AssignmentDashboardTwoTAT", label: "AssignmentDashboardTwoTAT" },
    { id: "DeliveryDashboardTAT", label: "DeliveryDashboardTAT" },
    { id: "AssignmentDashboardTAT-ReadyToDispatchToIssued", label: "DeliveryDashboardTAT-ReadyToDispatchToIssued" },
    { id: "AssignmentDashboardTAT-IssuedToShipped", label: "DeliveryDashboardTAT-IssuedToShipped" }
  ];

  warehouseList: any[] = [];
  DboyList: any[];
  startDate: Date;
  endDate: Date;
  TATPayload: tatReportInterface;
  DboyDetails: any;
  tabs: any;
  selectedWarehouseId: any;
  DboyMobile: number;

  // ------------ tab variables ----------------
  isReportAvailable: boolean = false;
  tabHeader: any;
  allTabs: any[] = [];
  ColumnListHeading: any[] = [];
  ColumnListData: any[] = [];
  isDboyAvailabel: boolean = false;

  constructor(private apiService: TatService, private exportService : ExportServiceService) { }

  ngOnInit() {
    this.getWarehouse();
  }

  getWarehouse() {
    this.apiService.warehouse().subscribe(
      (res) => {
        console.log(res);
        this.warehouseList = res;
        this.selectedWarehouseId = res[0];
        // console.log(this.warehouseId);
        this.getDboyList();
      },
      (err) => {
        console.log(err);
        this.warehouseList = [];
      }
    )
  }

  getDboyList() {
    this.warehouseId = this.selectedWarehouseId.WarehouseId;
    // this.warehouseId = finalWarehouseID;
    //  console.log("warehouse ID", finalWarehouseID);

    this.apiService.GetDboyList(this.warehouseId).subscribe(
      (res) => {
        console.log(res);
        this.DboyList = res;
        if(this.DboyList.length>0){
          this.isDboyAvailabel = true;
          this.DboyDetails = this.DboyList[0];
        }else{
          this.isDboyAvailabel = false;
        }
      },
      (err) => {
        console.log(err);
        this.DboyList = [];
      }
    )
  }

  generateRepoart() {
    let startDate = this.startDate ? moment(this.startDate).format('YYYY-MM-DD' + `T08:22:21.357`) : null;
    let endDate = this.endDate ? moment(this.endDate).format('YYYY-MM-DD' + `T08:22:21.357`) : null;
    let DBoyMMobile = this.DboyDetails.Mobile;
    let SPlist: any[] = [];
    if (this.tabs != undefined) {
      if (this.tabs.length > 0) {
        this.tabs.forEach(element => {
          SPlist.push(element.id);
        });
      }
    }
    console.log("tabss", SPlist);
    if(SPlist.length>0){
      this.TATPayload = {
        StartDate: startDate,
        EndDate: endDate,
        WarehouseID: this.warehouseId,
        DboyMobileNo: DBoyMMobile,
        SPList: SPlist
      }
      // console.log(this.TATPayload);
      this.apiService.getTATReport(this.TATPayload).subscribe(
        (res) => {
          this.ColumnListData = [];
          this.ColumnListHeading = [];
          this.isReportAvailable = true;
          console.log(res);
          this.allTabs = res;
          this.allTabs.forEach(element => {
            if (element.DataTable && element.DataTable.length > 0) {
              this.ColumnListHeading.push(Object.keys(element.DataTable[0]));
            } else {
              this.ColumnListHeading.push([]);
            }
          });
          this.allTabs.forEach(element => {
            if (element.DataTable && element.DataTable.length > 0) {
              this.ColumnListData.push(Object.values(element.DataTable));
            } else {
              this.ColumnListData.push([]);
            }
          });
          console.log(this.ColumnListHeading);
          console.log(this.ColumnListData);
        },
        (err) => {
          this.ColumnListData = [];
          this.ColumnListHeading = [];
          console.log(err);
          this.isReportAvailable = false;
          alert("Please Select all valid inputs to generate reports")
        }
      )
    } else{
      alert("please select report(s) to generate")
    }
    
    
  }


  exportSheet(ColumnListData, ReportName) {
    // console.log(ColumnListData);
    this.exportService.exportAsExcelFile(ColumnListData, ReportName);
  }

}
