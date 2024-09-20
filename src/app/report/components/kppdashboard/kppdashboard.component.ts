import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TurnAroundTimeService } from 'app/shared/services/turn-around-time.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';

@Component({
  selector: 'app-kppdashboard',
  templateUrl: './kppdashboard.component.html',
  styleUrls: ['./kppdashboard.component.scss']
})
export class KPPDashboardComponent implements OnInit {
  warehouseList: any[];
  warehouseId: any;
  blocked: boolean;
  POCVerification: any;
  ExportData: any;
  startDate: any;
  endDate: any;
  columns: { field: string; header: string; }[];

  constructor(private warehouseService: WarehouseService,private exportServiceService: ExportServiceService, private turuAroundService: TurnAroundTimeService,) {
    this.columns = [
      { field: 'FieldName', header: 'Name' },
      { field: 'LastMonth', header: 'LastMonth' },
      { field: 'ThisMonth', header: 'ThisMonth' },
      { field: 'Yesterday', header: 'Yesterday' },
      { field: 'Today', header: 'Today' },          
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
   
      this.turuAroundService.getKppDashboard().subscribe(result => {
        
        console.log("result", result);
        this.blocked = false;
        if (result) {
          this.POCVerification = result;
          
          //this.ExportData = result.Exportdata;
        }
        else {
          this.POCVerification = null;
          //this.ExportData = null;
          alert("No Data Found");
        }
        console.log(result);
      });    
  }

}
