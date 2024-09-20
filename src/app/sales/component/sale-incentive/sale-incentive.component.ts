import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleIncentiveService } from 'app/shared/services/sale-incentive.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { environment } from 'environments/environment';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-sale-incentive',
  templateUrl: './sale-incentive.component.html',
  styleUrls: ['./sale-incentive.component.scss']
})
export class SaleIncentiveComponent implements OnInit {
  searchModel: any;
  allcity: any;
  warehouselist: any;
  excutiveList: any;
  selectedExecutiveName = [];
  PurchaseOrderData: any;
  Alllistdata: any;
  Monthlyheader: any[] = [];
  blocked:boolean=false;
  isInvalid:boolean=false;
  constructor(private router: Router, 
    private warehouseService: WarehouseService,
     private saleIncentiveService: SaleIncentiveService,
     private messageService: MessageService,private confirmationService:ConfirmationService,
     private exportService: ExportServiceService
     ) { this.searchModel = {}; this.PurchaseOrderData = {}; }

  ngOnInit() {
    this.searchModel.Month = moment().toDate();
    this.searchModel.ExecutiveId = '';
    this.searchModel.WarehouseId = '';
    this.searchModel.cityId = '';
    this.getCitys();
  }
  addIncentive() {
    this.router.navigateByUrl("layout/sale/addsaleIncentive")
  }
  async getCitys() {
    this.allcity = await this.warehouseService.GetActiveWarehousescitys().toPromise();
  }
  async onChange(cityid) {
    this.warehouselist = await this.warehouseService.GetWarehouseByCity(cityid).toPromise();
  }
  async onChangeWareouse(WarehouseId) {
    this.excutiveList = [];
    this.excutiveList = await this.saleIncentiveService.GetExecutiveList(WarehouseId).toPromise();
    this.selectedExecutiveName = this.excutiveList;
  }
  Search(searchModel,modalForm) {
    debugger;
    if (modalForm.form.status == "VALID") {
    this.blocked = true;
    let ExecutiveIdsList = this.selectedExecutiveName.map(function (elem) {
      return elem.ExecutiveId ? elem.ExecutiveId : null;
    });
    var dataTopost = {
      ExecutiveIds: ExecutiveIdsList,
      warehouseId: searchModel.WarehouseId,
      month: searchModel.Month
    }
    this.saleIncentiveService.GetSalesPersonCommissionList(dataTopost).subscribe(result => {
      this.Alllistdata = result;
      this.blocked = false;
      console.log('Alllistdata', this.Alllistdata);

      //console.log('columnList',this.columnList);
    });
  }else{
    this.isInvalid = true;
    this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    this.blocked=false;
  }
  }
  openlist(h) {
    debugger;
    h.IsSelected = !h.IsSelected; 
  }
  export(searchModel,modalForm) {
    debugger;
    this.blocked=true;
    if (modalForm.form.status == "VALID") {
    this.blocked = true;
    let ExecutiveIdsList = this.selectedExecutiveName.map(function (elem) {
      return elem.ExecutiveId ? elem.ExecutiveId : null;
    });
    var dataTopost = {
      ExecutiveIds: ExecutiveIdsList,
      warehouseId: searchModel.WarehouseId,
      month: searchModel.Month
    }
    this.saleIncentiveService.Export(dataTopost).subscribe(result => {
      debugger;
      this.blocked=false;
    if (result.length>0) {
      this.blocked=false;
      this.exportService.exportAsExcelFile(result, 'SaleIncentiveExport');
    }
    else{
      this.blocked=false;
      this.messageService.add({ severity: 'error', summary: 'No data found!!', detail: '' });
    }
  });
 }else{
  this.isInvalid = true;
  this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
  this.blocked=false;
 }
  }
  delete(h,row) {
    debugger;
    this.blocked=true;
    h.IsSelected = !h.IsSelected; 
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform delete this action?',
      accept: () => {
    this.saleIncentiveService.DeleteEventbyExecutive(row.Id).subscribe(result => {
      if(result){
        this.blocked = false;
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });   
        }, 700);
        this.refresh(this.searchModel);
       // this.router.navigateByUrl("layout/sale/saleIncentive");
      }else{
        this.blocked = false;
        setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Data Not Deleted!', detail: '' }); 
      }, 700);   
      }
      this.blocked = false;
    });
  }
});
this.blocked = false;
   }
   stop(h,row) {
     debugger;
    this.blocked=true;
    h.IsSelected = !h.IsSelected; 
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform Stop this action?',
      accept: () => {
    this.saleIncentiveService.StopEventbyExecutive(row.Id).subscribe(result => {
      if(result){
       this.blocked = false;
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Stop Successfully!', detail: '' });   
        }, 700);
        this.refresh(this.searchModel);
       // this.router.navigateByUrl("layout/sale/saleIncentive");
      }else{
        this.blocked = false;
        setTimeout(() => {
        this.messageService.add({ severity: 'error', summary: 'Data Not Stoped!', detail: '' }); 
      }, 700);   
      }
      
      this.blocked = false;
    });
  }
});
this.blocked = false;
   }
   clear(){
     this.searchModel=[];
     this.selectedExecutiveName=[];
   }
   refresh(searchModel) {
    debugger; 
    this.blocked = true;
    let ExecutiveIdsList = this.selectedExecutiveName.map(function (elem) {
      return elem.ExecutiveId ? elem.ExecutiveId : null;
    });
    var dataTopost = {
      ExecutiveIds: ExecutiveIdsList,
      warehouseId: searchModel.WarehouseId,
      month: searchModel.Month
    }
    this.saleIncentiveService.GetSalesPersonCommissionList(dataTopost).subscribe(result => {
      this.Alllistdata = result;
      this.blocked = false;
      console.log('Alllistdata', this.Alllistdata);
      //console.log('columnList',this.columnList);
    });
  }
}

