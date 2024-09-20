import { Component, OnInit } from "@angular/core";
import { UpiTransactionDetailsServiceService } from "../upi-transaction-details-service.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { ExportServiceService } from "app/shared/services/export-service.service";

@Component({
  selector: "app-mop-wise-collection",
  templateUrl: "./mop-wise-collection.component.html",
  styleUrls: ["./mop-wise-collection.component.scss"],
})
export class MopWiseCollectionComponent implements OnInit {
  constructor(
    private UpiTransactionService: UpiTransactionDetailsServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private exportservice: ExportServiceService
  ) {}
  startDate: any;
  endDate: any;
  payLaterMopWiseData: any;
  payLaterMopWisExporteData: any;
  totalRecords: number = 0;
  isLoading: boolean = false;
  record: boolean = false;

  ngOnInit() {}

  load(event) {
    this.SearchList(event);
  }
  SearchList(event: any) {
    if (this.record) {
      if (this.startDate == null || this.startDate == undefined) {
        alert("Please Select Start Date");
        return false;
      }
      if (this.endDate == null || this.endDate == undefined) {
        alert("Please Select End  Date");
        return false;
      }

    debugger;
    const obj = {
      startdate: this.startDate,
      enddate: this.endDate,
      IsExport: false,
      Skip: event.first ? event.first : 0,
      Take: event.rows ? event.rows : 10,
    };
    this.isLoading = true;
    this.UpiTransactionService.GetMopWisepayLaterData(obj).subscribe((x) => {
      console.log(x);
      this.isLoading = false;
      if (x.length == 0) { 
        alert("No Data Found");
        return false;
      } else {
        this.payLaterMopWiseData = x;
        this.totalRecords = x[0].TotalRecords;
      }
    });    }

  }

  ExportList(event: any) {
    if (this.startDate == null || this.startDate == undefined) {
      alert("Please Select Start Date");
      return false;
    }
    if (this.endDate == null || this.endDate == undefined) {
      alert("Please Select End  Date");
      return false;
    }

    const obj = {
      startdate: this.startDate,
      enddate: this.endDate,
      IsExport: true,
      Skip: event.first ? event.first : 0,
      Take: event.rows ? event.rows : 10,
    };
    this.isLoading = true;

    this.UpiTransactionService.GetMopWisepayLaterData(obj).subscribe((x) => {

      console.log(x);
      if (x.length == 0) {
        alert("No Data Found");
        this.isLoading = false;  
        return false;
      } else {
        this.payLaterMopWisExporteData = x;
        this.exportservice.exportAsExcelFile(
          this.payLaterMopWisExporteData,
          "MOPexportData"
        );
        this.isLoading = false;

      }
    });

    
  }
  onClear() {
    this.startDate = null;
    this.endDate = null;
    this.totalRecords = 0;
    this.payLaterMopWiseData = [];
  }
}
