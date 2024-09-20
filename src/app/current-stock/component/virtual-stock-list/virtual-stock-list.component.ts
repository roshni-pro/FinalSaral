import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { VirtualStockPaginator } from 'app/VirtualStockManagement/Interfaces/VirtualStockPaginator';
import { CurrentStockService } from 'app/shared/services/current-stock.service';

@Component({
  selector: 'app-virtual-stock-list',
  templateUrl: './virtual-stock-list.component.html',
  styleUrls: ['./virtual-stock-list.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  providers: [DatePipe]
})
export class VirtualStockListComponent implements OnInit {
  warehouseList: any[];
  WarehouseId : any;
  virtualStockPaginator : VirtualStockPaginator;
  totalRecords : number;
  virtualStockList : any;
  pageSize : number;  
  isSearch: boolean;
  isTable: boolean;
  data: any;
  isInvalid : boolean;  
  blocked : boolean;
  exportRecords:any[];
    constructor(private warehouseService : WarehouseService, private currentStockService : CurrentStockService ,private datePipe: DatePipe, private exportService: ExportServiceService, private messageService : MessageService) { this.data ={};
   }
  
    ngOnInit() {
      this.data.WarehouseId = '';
      this.pageSize = 10;
      this.virtualStockPaginator = {
        WarehouseId : null,
        StartDate : null,
        EndDate : null,
        Take: this.pageSize,
        Skip : 0
      }
      this.getSpecificWarehouses();
    }

  
    private async getSpecificWarehouses() {
        this.warehouseService.GetAllWarehouse().subscribe(result =>{
        this.warehouseList = result;
      });     
      
    }

    toggleSearch() {
      if (this.isSearch == true) {
        this.isSearch = false;
      } else {
        if (this.isTable == true) {
          this.isTable = false;
        }
        this.isSearch = true;
      }
    }
    checkValid(event) {
      if (this.WarehouseId == null || this.WarehouseId == 0 ) {
        this.isInvalid = true;
        return;
      }
      else {
        this.isInvalid = false;
      }
    }
  

    onSearchdata(data)
    {
      if(data.WarehouseId == 0)
      {
        this.checkValid(event);
      }
      this.pageSize = 10;
   
      this.virtualStockPaginator = {
        WarehouseId : data.WarehouseId,
        StartDate : data.StartDate,
        EndDate : data.EndDate,
        Take: this.pageSize,
        Skip : 0
      }
      this.blocked = true;
        this.currentStockService.getVirtuals(this.virtualStockPaginator).subscribe(x=>
          {
            this.blocked = false;
            this.totalRecords = x.TotalRecords;
            this.virtualStockList = x.virtualStockDetailsDCs;
            console.log('getVirtuals:',x);
            }); 
         
     }
     load(event,data) {
      this.virtualStockPaginator.Skip = event.first;
      this.virtualStockPaginator.Take = event.rows;
      this.virtualStockPaginator.WarehouseId = data.WarehouseId;
      this.virtualStockPaginator.StartDate = data.StartDate;
      this.virtualStockPaginator.EndDate = data.EndDate;
      this.blocked = true;
      this.currentStockService.getVirtuals(this.virtualStockPaginator).subscribe(x => {
        console.log('virtualStockDetailsList: ', x);
        this.blocked = false;
        this.totalRecords = x.TotalRecords;
        this.virtualStockList = x.virtualStockDetailsDCs;
      })
    }
 
    export(data){
       
      
    if (data.WarehouseId != null && data.WarehouseId != 0 && data.WarehouseId!=undefined  ) {
      {
      this.pageSize = 10;
      this.virtualStockPaginator = {
        WarehouseId : data.WarehouseId,
        StartDate : data.StartDate,
        EndDate : data.EndDate,
        Take: this.pageSize,
        Skip : 0
       }
      
        this.currentStockService.getVirtualDataForExport(this.virtualStockPaginator).subscribe(x=>
          {
            this.exportRecords = x;
            this.exportService.exportAsExcelFile(this.exportRecords, 'exportvirtual');
            console.log('getVirtuals:',x);
            }); 
      
     
          }
        }else{

          this.isInvalid = true;
        }
    }
  }
  

