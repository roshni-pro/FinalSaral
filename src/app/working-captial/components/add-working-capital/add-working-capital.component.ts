import { Component, OnInit } from '@angular/core';
import { RegionService } from 'app/shared/services/region.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { WorkingCapitalService } from 'app/shared/services/working-capital.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
@Component({
  selector: 'app-add-working-capital',
  templateUrl: './add-working-capital.component.html',
  styleUrls: ['./add-working-capital.component.scss']
})

export class AddWorkingCapitalComponent implements OnInit {
  regionList : any;
  selectedWarehouse: any;
  warehouseList : any;
  warehouseids : any;
  isInvalid : boolean;
  data : any
  workingCaptialList : any;
  cols : any;
  maxdays:any;
  mindays : any;
  RegionId:any;
  workingcapital : any;
  warehouseIdsList:any;
  filteredWarehouseids :any;
  filteredRegion:any;
  constructor(private warehouseService : WarehouseService, private regionService: RegionService,private workingCapital : WorkingCapitalService , private messageService : MessageService) { this.isInvalid = false;}
  
  ngOnInit() {
    this.data = {};
    this.workingcapital = null;
    this.mindays =   moment().add(-7,'days').toDate();
    this.maxdays = moment().toDate();
    var warehouseids = localStorage.getItem('warehouseids');
    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }
    this.warehouseService.GetAllWarehouseV1().subscribe(warehouses =>{
      
      console.log(warehouses);
      if(warehouseids){
        this.warehouseIdsList = warehouses.filter(f => warehouseids.includes(f.WarehouseId))
        this.filteredWarehouseids = this.warehouseIdsList.map(x => x.RegionId);
       //
        this.warehouseIdsList = warehouses.filter(f =>  f.RegionId > 0)
       // 
        this.filteredRegion = this.filteredWarehouseids.filter(unique)
      }else{
        this.warehouseIdsList = warehouses;
        this.filteredWarehouseids= warehouses.map(x => x.RegionId);
        //
        this.warehouseIdsList = warehouses.filter(f =>  f.RegionId > 0)
        //
        this.filteredRegion = this.filteredWarehouseids.filter(unique);
        console.log(this.filteredRegion);
      }
      this.regionService.GetAllRegion().subscribe(result => {
        // this.regionList = result;
        this.regionList = result.filter(f => this.filteredRegion.includes(f.RegionId))
        
      });
    });
  }

  onRegionChange(regionId){
    this.warehouseList= this.warehouseIdsList.filter(x=> x.RegionId == regionId);
    this.data.WarehouseId = this.warehouseList[0].WarehouseId
    // this.regionService.getSpecificWarehousesid(regionId).subscribe(result =>{
    //   this.warehouseList = result;
    //   this.data.WarehouseId = result[0].WarehouseId
    // })
}

onSearch(){
  
  console.log(this.data)
 var date = new Date(this.data.StartDate).toDateString();
  this.workingCapital.GetWorkingCapitalById(this.data.WarehouseId , date).subscribe(result=>{
    console.log(result);
    if(result){
      this.workingcapital = result;
    }else{
      this.workingcapital = null
      this.messageService.add({severity:'error', summary: 'No Data Found', detail:''});
    }

  })
}
onSave(){
  
  this.workingCapital.UpdateWorkingCapitalById(this.workingcapital).subscribe(result=>{
    console.log(result);
    this.messageService.add({severity:'Success', summary: 'Successfully Updated', detail:''});
    this.workingcapital = null;
  
  },(err)=>{
    this.messageService.add({severity:'error', summary: 'UnSuccessfully', detail:''});
  })
}
onCancel(){
  this.workingcapital = null;
}
}
