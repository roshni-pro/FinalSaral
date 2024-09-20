import { Component, OnInit } from '@angular/core';
import { MonthEndService } from 'app/report/services/month-end.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-mtd-sales-report',
  templateUrl: './mtd-sales-report.component.html',
  styleUrls: ['./mtd-sales-report.component.scss']
})
export class MtdSalesReportComponent implements OnInit {
  SalesDataList: any;
  totalMSales: number = 0;
  totalTSales: number = 0;
  totalCityMSale: number = 0;
  totalCityTSale: number = 0;
  totalKPPMSale: number = 0;
  totalKPPTSale: number = 0;
  totalMSafoyaSale: number = 0;
  totalTSafoyaSale: number = 0;
  totalKKMSale: number = 0;
  totalKKTSale: number = 0;
  totalStore1MSale: number = 0;
  totalStore1TSale: number = 0;
  totalStore2MSale: number = 0;
  totalStore2TSale: number = 0;
  totalStore3MSale: number = 0;
  totalStore3TSale: number = 0;

  constructor(private MonthEndServices: MonthEndService, private exportService: ExportServiceService) { }

  ngOnInit() {
    this.MonthEndServices.MTDSalesMonthReport().subscribe(res => {
      if (res.length > 0) {
        this.SalesDataList = res;
        if (this.SalesDataList.length > 0) {
          this.onAddition();
        }
      }
    })
  }
  export() {
    if (this.SalesDataList.length > 0) {
      this.exportService.exportAsExcelFile(this.SalesDataList, 'MTDSalesReport');
    } else {
      alert("No Record Found!!");
    }
  }
  onAddition() {

    this.SalesDataList.forEach(element => {

      if (element.MSale > 0) {
        this.totalMSales = this.totalMSales + element.MSale;
      }
      if (element.TSale > 0) {

        this.totalTSales = this.totalTSales + element.TSale;
      }
      if (element.CityMSale > 0) { this.totalCityMSale = this.totalCityMSale + element.CityMSale; }
      if (element.CityTSale > 0) { this.totalCityTSale = this.totalCityTSale + element.CityTSale; }
      if (element.KPPMSale > 0) { this.totalKPPMSale = this.totalKPPMSale + element.KPPMSale; }
      if (element.KPPTSale > 0) { this.totalKPPTSale = this.totalKPPTSale + element.KPPTSale; }
      if (element.MSafoyaSale > 0) { this.totalMSafoyaSale = this.totalMSafoyaSale + element.MSafoyaSale; }
      if (element.TSafoyaSale > 0) { this.totalTSafoyaSale = this.totalTSafoyaSale + element.TSafoyaSale; }
      if (element.KKMSale > 0) { this.totalKKMSale = this.totalKKMSale + element.KKMSale; }
      if (element.KKTSale > 0) { this.totalKKTSale = this.totalKKTSale + element.KKTSale; }
      if (element.Store1MSale > 0) { this.totalStore1MSale = this.totalStore1MSale + element.Store1MSale; }
      if (element.Store1TSale > 0) { this.totalStore1TSale = this.totalStore1TSale + element.Store1TSale; }
      if (element.Store2MSale > 0) { this.totalStore2MSale = this.totalStore2MSale + element.Store2MSale; }
      if (element.Store2TSale > 0) { this.totalStore2TSale = this.totalStore2TSale + element.Store2TSale; }
      if (element.Store3MSale > 0) { this.totalStore3MSale = this.totalStore3MSale + element.Store3MSale; }
      if (element.Store3TSale > 0) { this.totalStore3TSale = this.totalStore3TSale + element.Store3TSale; }

    });

  }
}
