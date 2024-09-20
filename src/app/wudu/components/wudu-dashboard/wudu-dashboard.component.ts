import { Component, OnInit } from '@angular/core';
import { WuduService } from 'app/shared/services/wudu/wudu.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-wudu-dashboard',
  templateUrl: './wudu-dashboard.component.html',
  styleUrls: ['./wudu-dashboard.component.scss']
})
export class WuduDashboardComponent implements OnInit {
  wuduloginCount:any;
  blocked:boolean;
  totalwuduCustomer:any;
  WuduCustomerToday:any;
  istodayCust:boolean;
  WUDUCustomers:any[];
  constructor(private wuduService:WuduService, private exportService: ExportServiceService) { }

  ngOnInit() {
    this.blocked = true;
    this.istodayCust=false;
    this.wuduService.GetloginCustomers().subscribe(result => {
      this.blocked = false;
      this.wuduloginCount=result;
      this.totalwuduCustomer= this.wuduloginCount.TotalwuduCustomer;
      this.WuduCustomerToday=this.wuduloginCount.wuduCustomerToday;
    })
  }

  exportWUDUCust()
  {
    this.blocked = true;
    this.exportService.exportAsExcelFile(this.WUDUCustomers, 'WUDUCustomer');
    this.blocked = false; 
  }

  TodayCust(event)
  {
    if (event == 1) {
      this.istodayCust=false;   
    }
    else{    
      this.istodayCust=true;
    }
   
  }
}
