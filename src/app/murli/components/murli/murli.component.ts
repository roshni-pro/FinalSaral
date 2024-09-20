import { Component, OnInit, Input } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MurliService } from 'app/shared/services/murli.service';
import { CityService } from 'app/shared/services/city.service';

@Component({
  selector: 'app-murli',
  templateUrl: './murli.component.html',
  styleUrls: ['./murli.component.scss']
})
export class MurliComponent implements OnInit {

  constructor(private messageService : MessageService,private WarehouseService:WarehouseService,private cityService:CityService,private murliService: MurliService,private router : Router, private modalService: NgbModal
    ) { }

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
    { field: 'WarehouseId', header: 'Warehouse Id' },
    { field: 'WarehouseName', header: 'Warehouse Name' },
    { field: 'HindiTopItem', header: 'Text' },
    { field:'CreatedDate', header: 'Created Date' },
    { field:'Mp3url', header: 'Audio' },
    ];
   ngOnInit() {

      this.isDetails = false;
       this.cols = [
         // { header: 'Edit' },
         { field: 'WarehouseId', header: 'Warehouse Id' },
         { field: 'WarehouseName', header: 'Warehouse Name' },
         { field: 'HindiTopItem', header: 'Text' },
         { field:'FromDate', header: 'From Date' },
         { field:'ToDate', header: 'To Date' },
         { field:'Mp3url', header: 'Audio' },
    
        ];
   
  this.murliService.GetAllMurliTopItem().subscribe(result=>{
    
    console.log("warehouselistdata",result);

   this.warehouseItemList=result;
   
   });
   this.cityService.GetAllCity().subscribe(result => {
    this.cityList = result;
    console.log('this.cityList: ', this.cityList);
    this.cityId = this.cityList[0].Cityid;
    this.onCityChangeBasedWarehouse( this.cityId );
    
  });
    
  }

  onCityChangeBasedWarehouse(cityId){
  this.WarehouseService.GetAllCityId(this.cityId).subscribe(result => {
    
    this.warehouseList = result;
    this.WarehouseId = this.warehouseList[0].WarehouseId;
    console.log('this.warehouseList :', result);
     });
  }

  warehouseSave()
  { 
    this.murliService.AddMurliWarehouse(this.WarehouseId).subscribe(result=>{
      console.log("warehouselistdata",result);
  
      this.messageService.add({severity:'success', summary: result, detail:''});
      this.ngOnInit();
     
    });
     

  }

  add(rowdata)
  { this.WarehouseId=rowdata.WarehouseId;
      this.router.navigateByUrl("layout/murli/murliwarehousedetails/"  + this.WarehouseId);
  }

  }

