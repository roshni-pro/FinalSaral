import { Component, OnInit, Input } from '@angular/core';
import { MurliService } from 'app/shared/services/murli.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-murli-warehouse-details',
  templateUrl: './murli-warehouse-details.component.html',
  styleUrls: ['./murli-warehouse-details.component.scss']
})
export class MurliWarehouseDetailsComponent implements OnInit {

  constructor(private murliService: MurliService,private router : Router,private route: ActivatedRoute) { }

  @Input() WarehouseId: number; 
  closeResult: string;
  isopen : boolean
  cols2: any[];
  loading: boolean;
  totalRecords: number;
  pageSize: number;
  selectedRow : any;
 
selectedRowDetails: any;
warehouseItemList : any;
warehouseList : any;
cols: any[];
colmp3:any[];
cityList:any[];
isDetails:boolean;
cityId:any;
activeFields: any[] = [
  // { header: 'Edit' },
  { field: 'Id', header: 'Id' },
  { field: 'WarehouseName', header: 'Warehouse Name' },
  { field: 'HindiTopItem', header: 'Text' },
  { field:'FromDate', header: 'From Date' },
  { field:'ToDate', header: 'To Date' },
  { field:'Mp3url', header: 'Audio' },
  ];
 ngOnInit() {


 this.WarehouseId = Number(this.route.snapshot.paramMap.get("WarehouseId"));
    this.isDetails = false;
     this.cols = [
       // { header: 'Edit' },
       { field: 'Id', header: 'Id' },
       { field: 'WarehouseName', header: 'Warehouse Name' },
       { field: 'HindiTopItem', header: 'Text' },
       { field:'FromDate', header: 'From Date' },
       { field:'ToDate', header: 'To Date' },
       { field:'Mp3url', header: 'Audio' },
  
      ];
 
this.murliService.GetAllMurliqWarehouseTopItem(this.WarehouseId).subscribe(result=>{
  console.log("warehouselistdata",result);
  this.warehouseItemList=result;
 
 });

  
}
isactiveitem(data){
  
if(data.IsActive==true){
  this.murliService.IsActiveItemWarehouseDetails(data.Id,this.WarehouseId).subscribe(result=>{
    console.log("warehouselistdata",result);
    this.warehouseItemList=result;
  });
}
}
add()
{ 
   this.router.navigateByUrl("layout/murli/murliitemdetails/"  + this.WarehouseId);
}
back(){

  this.router.navigateByUrl("/layout/murli/murli");
}
remove(data){
  
  this.murliService.RemoveItemWarehouseDetails(data.Id,this.WarehouseId).subscribe(result=>{
    console.log("warehouselistdata",result);
    this.warehouseItemList=result;
  });

}
}
