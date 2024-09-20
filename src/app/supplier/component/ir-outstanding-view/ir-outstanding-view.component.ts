import { Component, OnInit } from '@angular/core';
import { IrOutstandingDC } from 'app/shared/interface/supplier/ir-outstanding-dc';
import { IrOutstandingListDC } from 'app/shared/interface/supplier/ir-outstanding-list-dc';
import { IrService } from 'app/shared/services/supplier/ir.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { IrOutstandingPaginator } from 'app/shared/interface/supplier/ir-outstanding-paginator';
import { LazyLoadEvent } from 'primeng/api';
import { SupplierService } from 'app/shared/services/supplier.service';
import { IrOutstandingViewPaginator } from 'app/shared/interface/supplier/ir-outstanding-view-paginator';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'

@Component({
  selector: 'app-ir-outstanding-view',
  templateUrl: './ir-outstanding-view.component.html',
  styleUrls: ['./ir-outstanding-view.component.scss']
})

  export class IrOutstandingViewComponent implements OnInit {
    paginator: IrOutstandingViewPaginator;
    irOutstandingList: IrOutstandingListDC;
    list: IrOutstandingDC[];
    totalCount: number;
    warehouseList: any[];
    buyerList:any[];
    isLoading: boolean;
    isOpenPopup: boolean;
    isValidated: boolean;
    yearRangeForCalender:string;
    constructor(private irService: IrService
      , private warehouseService: WarehouseService
      , private supplierSerivce:SupplierService
      ) { }
  
    ngOnInit() {
     this.yearRangeForCalender = '2016:';
    this.yearRangeForCalender += (new Date()).getFullYear();
    
      this.isLoading = false;
      this.isValidated = false;
      this.supplierSerivce.GetBuyer().subscribe(x => {
        this.buyerList = x;
        console.log('BuyerList: ', this.buyerList);
      });
      this.warehouseService.GetWarehouses().subscribe(x => {
        this.warehouseList = x;
      });
      this.initializePaginator();
  
    }
  
    initializePaginator() {
      this.paginator = {
        WarehouseId: null,
        Search: null,
        EndDate: null,
        StartDate: null,
        SkipCount: 0,
        Take: 20,
        Status:null,
        BuyerId:null
      };
    }
  
    loadLazy(event: LazyLoadEvent) {
      setTimeout(() => {
        if (this.paginator) {
          this.paginator.SkipCount = event.first;
          this.paginator.Take = event.rows;
          this.getData();
        }
      }, 100);
    }
  
    filter() {
      this.paginator.SkipCount = 0;
      this.paginator.Take = 20;
      this.getData();
    }
  

  
 
 

    private getData() {
      
      this.isLoading = true;
      this.irService.getIrOutstandingViewList(this.paginator).subscribe(x => {
        this.irOutstandingList = x;
        this.isLoading = false;
        this.list = this.irOutstandingList.IrOutstandingList;
        this.delyadCount();
      
        console.log('List: ', this.list);
        this.totalCount = this.irOutstandingList.Count;
       
      }, error => {
        this.isLoading = false;
      });
    }
  
  private delyadCount(){


    this.list.forEach(element => {
     //for grn
      if(element.GRNDate!=null){
       if((element.DifInHoursForGRN / 24)>=1){
        element.DifInHoursForGRN= (element.DifInHoursForGRN / 24)-(element.DueDays);
       }else{

        element.DifInHoursForGRN= 0-(element.DueDays);
       }
      let grndate= new Date(element.GRNDate);
      grndate.setDate(grndate.getDate() + element.DueDays);
      element.GRNDate= grndate;
      }else{
        element.DifInHoursForGRN=null;

      }
      //end GRN

      // Start Approved IR
      if(element.IRStatus=='Approved from Buyer side'){
        if(element.IRApprovedDate!=null){
          
         
      let duedate= new Date(element.IRApprovedDate);
      duedate.setDate(duedate.getDate() + element.DueDays);
      element.IRApprovedDate= duedate;
     if((element.DifInHoursForApproval / 24)>=1){
      element.DifInHoursForApproval= (element.DifInHoursForApproval / 24)-(element.DueDays);
      }else{
        element.DifInHoursForApproval= 0-(element.DueDays);

      }
      
    }
      }
      //end Approved IR

      //Start Invoice IR
      let invoiceduedate= new Date(element.InvoiceDate);
      invoiceduedate.setDate(invoiceduedate.getDate() + element.DueDays);
      element.InvoiceDateToShow= invoiceduedate;
       if((element.DifInHours / 24)>=1){
        element.DifInHours= (element.DifInHours / 24)-(element.DueDays);
       }else{
          element.DifInHours= 0-(element.DueDays);
       }
     
      //end Invoide IR

     });
  }
  

  
  }