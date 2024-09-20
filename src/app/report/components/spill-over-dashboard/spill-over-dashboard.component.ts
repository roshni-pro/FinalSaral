import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { RatingService } from 'app/rating/service/rating.service';
import { SpillOverOrderFilter } from 'app/report/interface/spill-over-order-filter';
import { SpillOverOrderService } from 'app/report/services/spill-over-order.service';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-spill-over-dashboard',
  templateUrl: './spill-over-dashboard.component.html',
  styleUrls: ['./spill-over-dashboard.component.scss']
})
export class SpillOverDashboardComponent implements OnInit {
  dataa:any[]
  tableData:any;
  spillOverOrderFilter : SpillOverOrderFilter;
  spillOverOrderList : any;
  spillData : any;  
  SelectedDate: Date[];
  cityList: any[];
  selectedCityList : any[];
  cityIds : any[]=[];
  warehouseList : any[];
  WarehouseIds : any[]=[];
  selectedWarehouseList : any[]=[];
  blocked: boolean = false;
  isInvalid : boolean = false;
  cols: any[];
  completionPercent : number = 0;//20;
  redCount : number = 0;
  greenCount : number = 0;
  maxDateValue: Date;
  totalCount : number = 0;
  constructor(private spillOverOrderService : SpillOverOrderService,private cityService : CityService,
    private ratingService : RatingService, private exportService: ExportServiceService,
    public inventoryforcastserService : InventoryforcastserService) { this.spillData={};}

  ngOnInit() {
    this.maxDateValue = new Date();
    this.cols = [
      { field: 'CityName', header: ' City'  },
      { field: 'WarehouseName', header: ' Warehouse'  },
      { field: 'CreatedDate', header: 'Date' },
      { field: 'avgOrder', header: 'Avg. Count' },
      { field: 'RedCount', header: ' Yesterday Red Count (T-1)'  },
      { field: 'SpillOverinPercentage', header: ' Spill Over % '  }      
    ];
    this.blocked = true;
    this.inventoryforcastserService.getCityList().subscribe(result => {      
      this.blocked = false;
      this.cityList = result;
    })
  }
  onSelectCity(selectedCityList){
    this.cityIds = [];
    this.selectedWarehouseList = [];
    this.spillOverOrderList = null;
    selectedCityList.forEach(element => {
      this.cityIds.push(element.Cityid);
    });
    this.blocked = true;
    this.inventoryforcastserService.getMultiHubList(this.cityIds).subscribe(x=>{
      this.blocked = false;
      this.warehouseList = x;
      //console.log('xxx',x);
    })   
  }

  totalAvgOrder:number=0;
  totalRedCount:number=0;
  percentVal:number=0;
  greenPercent:any=0;
  redPercent:any = 0;
  onSelectHub(selectedWHList,spillOverForm){
    this.totalAvgOrder = 0;
    this.totalRedCount = 0;
debugger;
// this.SelectedDate;
    if (spillOverForm.form.status == "VALID") {
      if(this.SelectedDate && this.SelectedDate.length == 2 && this.SelectedDate[0]!= null && this.SelectedDate[1] != null)
      {
    this.WarehouseIds = [];
    selectedWHList.forEach(element => {
      this.WarehouseIds.push(element.WarehouseId);
    });
    this.spillOverOrderFilter={
      SelectedStartDate : moment(this.SelectedDate[0]).add(1, 'days').startOf('day').subtract(1, 'seconds').toDate(),
      SelectedEndDate : moment(this.SelectedDate[1]).add(1, 'days').startOf('day').subtract(1, 'seconds').toDate(),
       WarehouseIds : this.WarehouseIds
    }
    
    this.blocked = true;
    this.spillOverOrderService.getSpillOverOrdersList(this.spillOverOrderFilter).subscribe(x=>{
      this.spillOverOrderList = x;
      this.redCount = 0;
      this.greenCount = 0;
      this.totalCount = 0;
      let redList = [];
      let greenList = [];
      // this.spillOverOrderList.forEach(ele => {
      //   ele.SpillOverinPercentage = ele.avgOrder / ele.RedCount * 100;
      // });
      this.spillOverOrderList.forEach(element => {
        var averageSpillCount = element.RedCount / element.avgOrder * 100;//element.avgOrder / element.RedCount * 100;
        element.SpillOverinPercentage = Number(averageSpillCount).toFixed(2);
        this.totalCount = this.totalCount + Number.parseFloat(element.SpillOverinPercentage);
       
        this.totalAvgOrder += element.avgOrder;
        this.totalRedCount += element.RedCount;
       
        if(element.SpillOverinPercentage >= 10)
        {
          redList.push(element);
          this.redCount = this.redCount + Number.parseFloat(element.SpillOverinPercentage);          
        }else{
          greenList.push(element);
          this.greenCount = this.greenCount + Number.parseFloat(element.SpillOverinPercentage);          
        }       
      });
      console.log(this.spillOverOrderList);
      
      this.percentVal = (this.totalRedCount/this.totalAvgOrder)*100;
  
        // if(this.percentVal > 0){
        //   if(this.percentVal >= 10){
            this.redPercent = this.percentVal.toFixed(2);
          // }else{
          //   this.greenPercent = 0
          // }

          // if(this.percentVal < 10){
          //   this.greenPercent = this.percentVal.toFixed(2);
          // }else{
          //   this.redPercent = 0;
          // }
      
        // }else{
        //   this.redPercent = 0
        //   this.greenPercent = 0
        // }

      // this.redCount = this.redCount / this.spillOverOrderList.length;
      this.redCount = (this.redCount / this.totalCount)*100;
      this.greenCount = (this.greenCount / this.totalCount)*100;
      // this.redCount = Number.parseFloat(((this.redCount / this.totalCount)*100).toFixed(1));
      // this.greenCount = Number.parseFloat(((this.greenCount / this.totalCount)*100).toFixed(1)  );
      // this.redCount = this.redCount * 100;
      // this.greenCount = this.greenCount * 100;
      // this.greenCount = 100 - this.redCount;
      // if(redList.length > 0){
      //   this.redCount = this.redCount / redList.length;
      // }else{
      //   this.redCount = 0;
      // }
      // if(greenList.length > 0)
      // {
      //   this.greenCount = this.greenCount / greenList.length;
      // }else{
      //   this.greenCount = 0;
      // } 
      // this.completionPercent = this.greenCount > 0 ? this.greenCount : 100;    
      
      
      if(this.redCount > 0 && this.greenCount > 0){
        this.completionPercent = this.redCount > 0 ? this.redCount : 0; 
      }else  if(this.redCount > 0 && this.greenCount == 0){
        this.completionPercent = this.redCount > 0 ? this.redCount : 0; 
      }else  if(this.redCount == 0 && this.greenCount > 0){
        this.completionPercent = this.greenCount > 0 ? this.greenCount : 0; 
      }
      this.blocked = false;
    });
  }else{
    if(this.SelectedDate.length == 2 && this.SelectedDate[0]== null && this.SelectedDate[1] == null)
    {
      alert('Select Start And End Date Range!!');
    }
    else if(this.SelectedDate.length == 2 && this.SelectedDate[0]!= null && this.SelectedDate[1] == null)
    {
      alert('Select End Date Range!!');
    }else{
      alert('Select Start And End Date Range!!');
    }
    
    
  }
  }else{
    this.spillOverOrderList = null;
    this.isInvalid = true;    
  }
  }
  onReset(){
    this.cityIds=[];
    this.selectedCityList = [];
    this.WarehouseIds = [];
    this.selectedWarehouseList = [];
    this.SelectedDate = null;
    this.spillOverOrderList = null;
    this.isInvalid = false;
  }

  async exportRedOrder(spillOverForm,selectedWHList)
  {   
    if (spillOverForm.form.status == "VALID") {
      if(this.SelectedDate && this.SelectedDate.length == 2 && this.SelectedDate[0]!= null && this.SelectedDate[1] != null)      {
        this.WarehouseIds = [];
        selectedWHList.forEach(element => {
          this.WarehouseIds.push(element.WarehouseId);
        });
        this.spillOverOrderFilter={
          SelectedStartDate : moment(this.SelectedDate[0]).add(1, 'days').startOf('day').subtract(1, 'seconds').toDate(),
          SelectedEndDate : moment(this.SelectedDate[1]).add(1, 'days').startOf('day').subtract(1, 'seconds').toDate(),
          WarehouseIds : this.WarehouseIds
        }
      this.dataa = await this.spillOverOrderService.exportSpillOver(this.spillOverOrderFilter).toPromise();
      debugger;
        if(this.dataa!=null && this.dataa.length>0)
        {
          let exportData = [];
          this.dataa.forEach(element => {
          exportData.push({
            CityName : element.CityName,
            OrderId:element.OrderId,
            WarehouseName : element.WarehouseName,
            CreatedDate : element.CreatedDate,
            OrderAmount:element.OrderAmount,
            MultiMrpId : element.MultiMrpId,
            ItemName : element.ItemName,
            ItemNumber : element.ItemNumber,
            OrderEta: element.OrderEta,
            Brand: element.Brand
          })
        });
        this.exportService.exportAsExcelFile(exportData, 'Export');
        }
      }else{
        if(this.SelectedDate.length == 2 && this.SelectedDate[0]== null && this.SelectedDate[1] == null)
        {
          alert('Select Start And End Date Range!!');
        }
        else if(this.SelectedDate.length == 2 && this.SelectedDate[0]!= null && this.SelectedDate[1] == null)
        {
          alert('Select End Date Range!!');
        }else{
          alert('Select Start And End Date Range!!');
        }
      }
      }
      else{
        alert('No data found!');
      }
}

  

  onExport(spillOverForm){    
    if (spillOverForm.form.status == "VALID") {
      if(this.spillOverOrderList.length > 0){
        let exportData = [];
        this.spillOverOrderList.forEach(element => {
        exportData.push({
          CityName : element.CityName,
          WarehouseName : element.WarehouseName,
          CreatedDate : element.CreatedDate,
          avgOrder : element.avgOrder,
          RedCount : element.RedCount,
          SpillOverinPercentage : element.SpillOverinPercentage > 0 ? element.SpillOverinPercentage : 0
        })
      });
        this.exportService.exportAsExcelFile(exportData, 'ExportSpillOverOrderDashboard');
      }else{
        alert('No data found!');
      }
  }else{
    this.isInvalid = true;
  }
  }


}
