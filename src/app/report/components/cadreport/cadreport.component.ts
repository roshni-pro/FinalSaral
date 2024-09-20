import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { TurnAroundTimeService } from 'app/shared/services/turn-around-time.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cadreport',
  templateUrl: './cadreport.component.html',
  styleUrls: ['./cadreport.component.scss']
})
export class CADReportComponent implements OnInit {
  blocked: boolean;
  ExportData: any;
  POCVerification: any;
  warehouseList: any[];
  warehouseId: any;
  startDate: any;
  endDate: any;

  constructor(private warehouseService: WarehouseService,private exportServiceService: ExportServiceService, private turuAroundService: TurnAroundTimeService,) { }

  ngOnInit() {
    this.getSpecificWarehouses();
  }

  private async getSpecificWarehouses() {
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result
      this.warehouseId = result[0].WarehouseId;
    });


  }

  getData() {
    
    this.blocked = true;
    var startDate = moment(this.startDate).format("YYYY-MM-DD HH:mm:ss")
    var endDate = moment(this.endDate).format("YYYY-MM-DD HH:mm:ss");
    this.POCVerification = null;
    this.ExportData = null;
    var d = new Date();
    var start = new Date(startDate);
    var today = (d.toDateString() === start.toDateString());
    if (!today) {
      this.turuAroundService.getPOCVerification(startDate, endDate, this.warehouseId).subscribe(result => {
        
        console.log("result", result);
        this.blocked = false;
        if (result) {
          this.POCVerification = result.Reportdata;
          this.ExportData = result.Exportdata;
        }
        else {
          this.POCVerification = null;
          this.ExportData = null;
          alert("No Data Found");
        }
        console.log(result);
      });
    }
    else{
      this.blocked = false;
      alert("Please select date Range");
    }
  }

  ExportReport() {
    if (this.ExportData != null) {
      this.exportServiceService.exportAsExcelFile(this.ExportData, "POCVerification");
    }
    else { alert("No data found for export"); }
  }

}
