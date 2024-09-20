import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ReturnReplaceService } from 'app/shared/services/return-replace.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales-return-dashboard',
  templateUrl: './sales-return-dashboard.component.html',
  styleUrls: ['./sales-return-dashboard.component.scss']
})
export class SalesReturnDashboardComponent implements OnInit {
  isOpenHistory : boolean = false;
  returnDashboardList : any[]=[];
  cityList : any;
  warehouseList : any;
  blocked : boolean = false;
  returnHistoryList : any;
  CityId : any;
  SelectedWarehouseId : any;
  orderIdKeyword : number //= 0; 
  constructor(private cityService : CityService,private customerService :CustomerService,
              private returnReplaceService : ReturnReplaceService, private exportserv: ExportServiceService,
              private messageService : MessageService) { }

  async ngOnInit() {
    this.cityList = await this.cityService.getAllCityNew().toPromise();
  }
  onClickHistory(rowData)
  {
    this.returnHistoryList = null;
    this.blocked = true;
    this.returnReplaceService.salesReturnDashboardDetail(rowData.OrderId).subscribe(x=>{
      this.blocked = false;
      if(x.Status)
      {
        debugger;
        this.returnHistoryList = x.Data;
        if(this.returnHistoryList.length > 0)
        {
          this.isOpenHistory = true;
        }else{
          this.messageService.add({ severity: 'error', summary: "", detail: 'Data Not Found!!' }); 
        }
        
      }
    });
  }
  onChangeWarehouse(cityid)
  {
    debugger;
    this.blocked = true;
      this.customerService.getWareHouseByCityNew(cityid).subscribe((x) => {
        this.warehouseList = x;
        this.blocked = false;
        console.log(this.warehouseList ,"cityiddd");
      });
  }
  onSearch()
  {
    // debugger;
    if(this.orderIdKeyword == null)
    {
      this.orderIdKeyword = 0;
    }
    this.blocked = true;
    this.returnReplaceService.salesReturnDashboard(this.SelectedWarehouseId.value,this.orderIdKeyword).subscribe(x=>{
      this.blocked = false;
      this.orderIdKeyword = null;
      if(x.Status)
      {
        this.returnDashboardList = x.Data;
      }
    })
    
  }
  onExport()
  {
    if(this.returnDashboardList.length > 0)
    {
      this.exportserv.exportAsExcelFile(this.returnDashboardList, "ExportData");
    }else{
      this.messageService.add({ severity: 'error', summary: "", detail: 'Data Not Found!!' });
    }
  }

}
