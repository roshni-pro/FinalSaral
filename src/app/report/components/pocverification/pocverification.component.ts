import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { TurnAroundTimeService } from 'app/shared/services/turn-around-time.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocverification',
  templateUrl: './pocverification.component.html',
  styleUrls: ['./pocverification.component.scss']
})
export class PocverificationComponent implements OnInit {
  columns: { field: string; header: string; }[];
  blocked: boolean;
  startDate: any;
  endDate: any;
  POCVerification: any;
  WarehouseId: any;
  warehouseList: any[];
  warehouseId: any;
  ExportData: any;
  ExportSingle: any[];
  overAllPercentage:any;


  constructor(private exportServiceService: ExportServiceService, private turuAroundService: TurnAroundTimeService,
    private router: Router, private warehouseService: WarehouseService, ) { }

  ngOnInit() {
    this.warehouseId=0;
    this.columns = [
      { field: 'ClusterName', header: 'Cluster Name' },
      { field: 'DboyName', header: 'Agent Name (Dboy)' },
      { field: 'PocPercentage', header: 'POC Percent' },
      { field: 'PocAMount', header: 'Total Amount' },
      { field: 'PocCancelAmount', header: 'Cancel Amount' }
    ];

    this.getSpecificWarehouses();
  }


  private async getSpecificWarehouses() {
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result
   //   this.warehouseId = result[0].WarehouseId;
    });


  }

  getData() {
    var startDate = moment(this.startDate).format("YYYY-MM-DD HH:mm:ss")
    var endDate = moment(this.endDate).format("YYYY-MM-DD HH:mm:ss");
    this.POCVerification = null;
    this.ExportData = null;
    var d = new Date();
    var start = new Date(startDate);
    var today = (d.toDateString() === start.toDateString());
    if (!today && this.warehouseId > 0) {
      this.blocked = true;
      this.turuAroundService.getPOCVerification(startDate, endDate, this.warehouseId).subscribe(result => {
        this.blocked = false;
        if (result) {
          this.POCVerification = result.Reportdata;
          this.ExportData = result.Exportdata;
          this.overAllPercentage=result.POCPercentHub;
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
      alert("Please select all feilds.");
    }
  }

  ExportReport() {
    if (this.ExportData != null) {
      this.exportServiceService.exportAsExcelFile(this.ExportData, "POCVerification");
    }
    else { alert("No data found for export"); }
  }

  
  Export(item) {
    this.ExportSingle = this.ExportData.filter(db => db.DboyName == item.DboyName)
    if (this.ExportSingle != null) {
      this.exportServiceService.exportAsExcelFile(this.ExportSingle, "POCVerification" + item.DboyName);
    }
    else { alert("No data found for export"); }
  }

  isToday(someDate) {
    var today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  openpocVerifypage()
{
  this.router.navigateByUrl("layout/report/poc-verify");
}
  

}


