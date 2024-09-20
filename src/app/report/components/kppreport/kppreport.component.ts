import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { TurnAroundTimeService } from 'app/shared/services/turn-around-time.service';

@Component({
  selector: 'app-kppreport',
  templateUrl: './kppreport.component.html',
  styleUrls: ['./kppreport.component.scss']
})
export class KPPReportComponent implements OnInit {
  warehouseList: any[];
  warehouseId: any;
  blocked: boolean;
  ExportData: any;
  Kppreportexoprt: any[];
  startDate: any;
  endDate: any;
  columns = [];

  constructor(private warehouseService: WarehouseService,private exportServiceService: ExportServiceService, private turuAroundService: TurnAroundTimeService,) {
    this.columns = [
      { field: 'Region', header: 'Region' },
      { field: 'CityName', header: 'CityName' },
      { field: 'WarehouseName', header: 'WarehouseName' },
      { field: 'SkCode', header: 'SkCode' },
      { field: 'Status', header: 'Status' },
      { field: 'KPPName', header: 'KPPName' },
      { field: 'Town', header: 'Town' },
      { field: 'ContactNo', header: 'ContactNo' },
      // { field: 'KKLMTD', header: 'KKLMTD' },
      // { field: 'KKMTD', header: 'KKMTD' },
      // { field: 'KKFTD', header: 'KKFTD' },
      // { field: 'SKLMTD', header: 'SKLMTD' },
      // { field: 'SKMTD', header: 'SKMTD' },
      // { field: 'SKFTD', header: 'SKFTD' },
      // { field: 'TLMTD', header: 'TLMTD' },
      // { field: 'TMTD', header: 'TMTD' },
      // { field: 'TFTD', header: 'TFTD' }
    ];
   }

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
   
      this.turuAroundService.getKppReportExport().subscribe(result => {
        
        console.log("result", result);
        this.blocked = false;
        if (result) {
          
          this.Kppreportexoprt = result;          
        }
        else {
          this.Kppreportexoprt = null;          
          alert("No Data Found");
        }
        console.log(result);
      });    
  }

  ExportReport() {
    if (this.Kppreportexoprt != null) {
      this.exportServiceService.exportAsExcelFile(this.Kppreportexoprt, "Kppreportexoprt");
    }
    else { alert("No data found for export"); }
  }
}