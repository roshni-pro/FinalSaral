import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { BuyerService } from 'app/shared/services/buyer.service';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import { OpreportsService } from 'app/opreports/services/opreports.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { PurchaseOrderService } from 'app/shared/services/purchase-order.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-purchase-order-close-approval',
  templateUrl: './purchase-order-close-approval.component.html',
  styleUrls: ['./purchase-order-close-approval.component.scss']
})
export class PurchaseOrderCloseApprovalComponent implements OnInit {

  @ViewChild("dt", { static: false }) public dt: Table;
  dashboarddata: any;
  ReportType = '';
  isOpenPopup = false;
  isOpenPopup1 = false;
  blocked: boolean;
  TotalRecords: any;
  columns = [];
  currentPoForReject = null;
  prRequestList = [];
  selectedList = [];
  reporttypes = [
    { name: 'Order Color Amount', val: 'OrderColorAmount' },
    { name: 'Order Color Count', val: 'OrderColorCount' },
    { name: 'Order Color Time', val: 'OrderColorTime' }
  ];

  buyerDetails = [];
  heading: string;
  displayBuyerDetails: boolean = false;
  isUploadedCoupon: boolean;
  warehouseList: any;

  filterreqquestsearch = {
    WarehouseIds: null,
    StartDate: new Date(),
    EndDate: new Date(),
    SupplierIds: null,
    PurchaseOrderId: 0

  };
  sellerlist: any[];
  sellermaster = [];
  warehouseidslist = [];
  SupplierIdslist = []; buyersList: any[];
  prrequestmaster: any;
  page: { skip: any; take: any; };
  totalCount: any;
  selectedItems = [];
  cols: any;
  rejectedReasion: any;
  loadTime : any;
  constructor(private router: Router, private r: ActivatedRoute, private confirmationService: ConfirmationService, private purchaseorderservice: PurchaseOrderService, private buyerservice: BuyerService, private podashboardserviceService: PodashboardserviceService,
    private orderassignmentservice: OrderAssignmentsService, private supplierservice: SupplierService,
    private exportService: ExportServiceService, private warehouseService: WarehouseService, private opreportsservice: OpreportsService,
    private messageService: MessageService) {
      const d = new Date();
      this.loadTime = new Date();
      let time = d.getTime();
      let currentMin = d.setMinutes(3);
      debugger;
     }

  ngOnInit() {
    debugger
    this.selectedList = [];
    this.initialize();
    this.getAllWarehouses();
    this.getAllSuppliers();
    // this.getAllBuyers();
    this.GetClosePOForApproval();
    this.cols = [
      { field: 'PurchaseOrderId', header: 'PO Number' },
      { field: 'WarehouseName', header: 'WarehouseName' },
      { field: 'SupplierName', header: 'SupplierName' },
      { field: 'BuyerName', header: 'BuyerName' },
      { field: 'CreationDate', header: 'PO Date' },
      { field: 'TotalPOPrice', header: 'PO Amount' },
      { field: 'TotalGRAmount', header: 'GR Amount' },
      { field: 'TotalIrAmount', header: 'IR Amount' },
      { field: 'IsCloseRejected', header: 'Close Rejected' },

    ];
  }


  initialize() {

    this.filterreqquestsearch = {
      WarehouseIds: null,
      StartDate: new Date(),
      EndDate: new Date(),
      SupplierIds: null,
      PurchaseOrderId: 0,

    };
    this.selectedList = null;
    this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate() + 1)
    this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate() - 30)
    this.getAllSuppliers();
    this.getAllWarehouses();
  }

  getAllWarehouses() {
    this.blocked = true;
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.blocked = false

        this.warehouseList = result;
        this.filterreqquestsearch.WarehouseIds = result;
        // 
      });
  }

  getAllBuyers() {
    this.blocked = true;
    this.buyerservice.getbuyer()
      .subscribe(result => {

        this.blocked = false
        this.buyersList = result;
      });
  }

  // GetClosePOForApproval() {
  //   
  //   this.podashboardserviceService.GetClosePOForApproval().subscribe(result => {

  //   });
  // }

  getAllSuppliers() {

    this.blocked = true;
    this.supplierservice.GetSupplierData()
      .subscribe(result => {

        this.blocked = false
        this.sellerlist = result;
        this.sellermaster = result;
        this.filterreqquestsearch.SupplierIds = result;
      });
  }

  GetClosePOForApprovalData() {
    debugger
    if (this.filterreqquestsearch.WarehouseIds == null || this.filterreqquestsearch.WarehouseIds.length == 0) {
      alert("Select WareHouse");
      return;
    }
    //GetClosePOForApprovalFilter
    this.blocked = true;
    this.warehouseidslist = [];
    this.filterreqquestsearch.SupplierIds && this.filterreqquestsearch.SupplierIds.length ?
      this.filterreqquestsearch.SupplierIds.forEach(element => {
        element.SupplierId ? this.SupplierIdslist.push(element.SupplierId.toString()) : '';
      }) : this.sellermaster.forEach(element => {
        element.SupplierId ? this.SupplierIdslist.push(element.SupplierId.toString()) : '';
      });

    this.filterreqquestsearch.WarehouseIds && this.filterreqquestsearch.WarehouseIds.length ?
      this.filterreqquestsearch.WarehouseIds.forEach(element => {
        element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
      }) : '';

    this.filterreqquestsearch.SupplierIds = this.SupplierIdslist;
    this.filterreqquestsearch.WarehouseIds = this.warehouseidslist;

    this.podashboardserviceService.GetClosePOForApproval1(this.filterreqquestsearch).subscribe(result => {
      this.blocked = false;
      if (result.length == 0 || result == null) {
        this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Data Get !!', detail: '' });

      }
      this.prrequestmaster = result;
      this.totalCount = this.prrequestmaster.length;
      this.page = { skip: 0, take: 10 };
      this.prRequestList = this.prrequestmaster.filter(wh => this.prrequestmaster.indexOf(wh) >= this.page.skip);
      this.prRequestList.splice(10, this.prRequestList.length - 10);

      this.filterreqquestsearch.WarehouseIds = this.warehouseList;

    }, error => {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
    });
  }
  GetClosePOForApproval() {
    debugger
    this.blocked = true;
    this.podashboardserviceService.GetClosePOForApproval().subscribe(result => {
      this.blocked = false;
      if (!result) {
        this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Data Get !!', detail: '' });
      }
      this.prrequestmaster = result;
      this.totalCount = result.length;
      this.page = { skip: 0, take: 10 };
      this.prRequestList = this.prrequestmaster.filter(wh => this.prrequestmaster.indexOf(wh) >= this.page.skip);
      this.prRequestList.splice(10, this.prRequestList.length - 10);
      //this.filterreqquestsearch.SupplierIds = this.SupplierIdslist;
      //this.filterreqquestsearch.WarehouseIds = this.warehouseList;
    }, error => {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
    });
  }

  uploadCoupon() {
    this.isUploadedCoupon = true;
  }
  closeUploadingCouponDialog() {
    this.isUploadedCoupon = false;
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }
  checkNan(val) {

    return true;
  }
  getSeLlerList(event) {
    if (event.query.length > 2) {
      this.sellerlist = this.sellermaster.filter(x => x.Name.toString().toLowerCase().includes(event.query.toLowerCase()));


      // this.sellerlist = result;


    }
  }
  setSeller(event) {
    debugger
    this.filterreqquestsearch.SupplierIds = event.SupplierId;
    //this.filterreqquestsearch.WarehouseIds=event.ware
  }
  loadLazy(event) {
    event
    this.page = { skip: event.first, take: event.rows };
    this.prRequestList = this.prrequestmaster.filter(wh => this.prrequestmaster.indexOf(wh) >= this.page.skip);
    this.prRequestList.splice(10, this.prRequestList.length - 10);


  }
  POCloseApprove(po) {
    this.onCheckPageLoadTime();
    if(this.isProcess == true){
      let mes = '';
      mes = po.ApprovedStatus == 1 ? 'Approve Close Request ?' : 'Reject Close Request ?'
      this.confirmationService.confirm({
        message: mes,
        accept: () => {
          let approval = { purchaseOrderId: po.PurchaseOrderId, ApprovedStatus: po.ApprovedStatus, RejectedReasion: po.RejectedReasion };
          this.blocked = true;
          this.podashboardserviceService.POCloseApprove(approval).subscribe(result => {
            debugger
            if (result.Status) {
              this.blocked = false;
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'request successfully' + (po.ApprovedStatus == 1 ? 'Approved' : 'Rejected'), detail: '' });
                this.isOpenPopup = false;
                this.GetClosePOForApproval();
              }, 1500);

              setTimeout(() => {
                this.GetClosePOForApproval();
              }, 3000);
            }
            else {
              this.blocked = false;
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'PO-'+ result.Message +' cannot be closed because GR is in Progress.'});
                this.isOpenPopup = false;
                this.isOpenPopup1 = false;

              }, 1500);
            }
          }, (error) => {
            this.messageService.add({ severity: 'error', summary: 'some error has occured', detail: '' });
          });
        }
      });
    }
  }
  gotorequest() {

    this.router.navigate(["pocloserequests"], { relativeTo: this.r.parent });

  }
  navToPo(poid) {
    window.open(environment.apiURL + "/#/IRNew?id=" + poid);
  }

  onSelection(checkList, approvedStatus, rejectedReasion) {
    debugger
    this.onCheckPageLoadTime();
    if(this.isProcess == true){
    this.selectedList = [];

    if (checkList == null || checkList.length == 0) {
      alert('Please select PO Ids from check box for action');
      this.isOpenPopup1 = false;

      return false;
    }
    if (approvedStatus == 2 && (rejectedReasion == undefined || rejectedReasion == '')) {
      alert('Please fill reject reasion');
      this.isOpenPopup1 = false;
      return false;
    }

    checkList && checkList.length ?
      checkList.forEach(element => {
        element.PurchaseOrderId ? this.selectedList.push(element.PurchaseOrderId.toString()) : '';
      }) : '';
    console.log(this.selectedList);
    let mes = '';
    mes = approvedStatus == 1 ? 'Approve Close Request ?' : 'Reject Close Request ?'
    this.confirmationService.confirm({
      message: mes,
      accept: () => {
        let approval = { purchaseOrderIds: this.selectedList, ApprovedStatus: approvedStatus, RejectedReasion: rejectedReasion };
        this.blocked = true;
        this.podashboardserviceService.POCloseApprove(approval).subscribe(result => {
          debugger
          if (result.Status) {
            this.blocked = false;
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'request successfully' + (approvedStatus == 1 ? 'Approved' : 'Rejected'), detail: '' });
              this.isOpenPopup = false;
              this.isOpenPopup1 = false;
              this.GetClosePOForApproval();
            }, 1500);
            setTimeout(() => {
              this.GetClosePOForApproval();
            }, 3000);
          }
          else {
            this.blocked = false;
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'You cannot close for PO ID - ' + result.Message + ', GRN in Progress' });
              this.isOpenPopup = false;
              this.isOpenPopup1 = false;

            }, 1500);
          }
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'some error has occured', detail: '' });
        });
      }
    });
  }
  }
  currentDateTime : any
  isProcess : boolean = false;
  onCheckPageLoadTime()
  {
    this.currentDateTime = new Date();
    var diffInMS = this.currentDateTime.getMinutes() - this.loadTime.getMinutes();
    if (diffInMS <= 2) {
       this.isProcess = true;
    } else {
      this.isProcess = false;
      alert('Please refresh the page');
      window.location.reload();
    }


    this.loadTime;
    const d = new Date();
    let CurrentMinutes = d.getMinutes();
    let currenttime = d.getTime();
    let currentMin = d.getMinutes();
    let loadMin = this.loadTime.setMinutes(3);
    if(currentMin > loadMin)
    {

    }
  }
}



