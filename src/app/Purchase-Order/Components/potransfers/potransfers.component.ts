
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from 'app/shared/services/purchase-order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { BuyerService } from 'app/shared/services/buyer.service';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import { OpreportsService } from 'app/opreports/services/opreports.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { PeopleService } from 'app/shared/services/people.service';

@Component({
  selector: 'app-potransfers',
  templateUrl: './potransfers.component.html',
  styleUrls: ['./potransfers.component.scss']
})
export class PotransfersComponent implements OnInit {

  @ViewChild("dt", { static: false }) public dt: Table;
  dashboarddata: any;
  ReportType = '';

  blocked: boolean;
  TotalRecords: any;
  columns = [];

  prRequestList = [];

  reporttypes = [
    { name: 'Order Color Amount', val: 'OrderColorAmount' },
    { name: 'Order Color Count', val: 'OrderColorCount' },
    { name: 'Order Color Time', val: 'OrderColorTime' }
  ];
  fromwarehouseid = null;
  towarehouseid = null;
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
  rejectedhistory: any;
  isOpenPopup: boolean;
  peopleList: any;
  warehouseid: any = null;
  purchaseOrderId: any = "";
  poid: any;


  constructor(private peopleService: PeopleService, private confirmationService: ConfirmationService, private router: Router, private r: ActivatedRoute, private purchaseorderservice: PurchaseOrderService, private buyerservice: BuyerService, private podashboardserviceService: PodashboardserviceService,
    private orderassignmentservice: OrderAssignmentsService, private supplierservice: SupplierService,
    private exportService: ExportServiceService, private warehouseService: WarehouseService, private opreportsservice: OpreportsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAllPeople();
    this.initialize();
    this.getAllWarehouses();
    this.getAllSuppliers();
    // this.getAllBuyers();

  }

  initialize() {
    this.filterreqquestsearch = {
      WarehouseIds: null,
      StartDate: new Date(),
      EndDate: new Date(),
      SupplierIds: null,
      PurchaseOrderId: 0
    };

    this.warehouseid = null;
    this.purchaseOrderId = "";
    this.prRequestList = [];

    this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate() + 1)
    this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate() - 30)

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

  getAllSuppliers() {

    this.blocked = true;
    this.podashboardserviceService.getSuppliers()
      .subscribe(result => {

        this.blocked = false
        this.sellerlist = result;
        this.sellermaster = result;
        this.filterreqquestsearch.SupplierIds = result;
      });
  }

  getPOWithoutGR() {

    if (this.warehouseid != null) {
      this.blocked = true;
      if (this.purchaseOrderId == "") {
        this.purchaseOrderId = 0;
      }
      this.podashboardserviceService.getPOWithoutGR(this.warehouseid, 0, 10, this.purchaseOrderId).subscribe(result => {
        
        this.blocked = false;
        setTimeout(() => {
          if (this.purchaseOrderId == 0) {
            this.purchaseOrderId = "";
          }
        }, 500);

        if (result && result.POData == null) {
          this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
        }
        else {
          this.messageService.add({ severity: 'success', summary: 'Data Get !!', detail: '' });
        }
        this.prRequestList = result.POData;
        this.totalCount = result.netCount;
        // this.page = { skip: 0, take: 10 };
        // this.prRequestList = this.prrequestmaster.filter(wh => this.prrequestmaster.indexOf(wh) >= this.page.skip);
        // this.prRequestList.splice(10, this.prRequestList.length - 10);
      }, error => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse !!', detail: '' });
    }
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
    }
  }

  setSeller(event) {
    this.filterreqquestsearch.SupplierIds = event.SupplierId;
  }

  loadLazy(event) {
    this.page = { skip: event.first, take: event.rows };
    if (this.purchaseOrderId == "") {
      this.purchaseOrderId = 0;
    }
    this.blocked = true;
    this.podashboardserviceService.getPOWithoutGR(this.warehouseid, this.page.skip, this.page.take, this.purchaseOrderId).subscribe(result => {
      this.blocked = false;

      setTimeout(() => {
        if (this.purchaseOrderId == 0) {
          this.purchaseOrderId = "";
        }
      }, 500);
      this.prRequestList = result.POData;
      this.totalCount = result.netCount;
    });
  }

  SendPOForClose(purchaseOrderId) {
    this.confirmationService.confirm({
      message: 'are you sure you want to close purchase order with order-no:' + purchaseOrderId + ' ?',
      accept: () => {
        this.blocked = true;
        this.podashboardserviceService.SendPOForClose(purchaseOrderId).subscribe(result => {
          this.blocked = false;
          this.messageService.add({ severity: 'success', summary: 'Applied Close Request for Po no - ' + purchaseOrderId, detail: '' });
          setTimeout(() => {
            this.getPOWithoutGR();
          }, 3000);
        });
      }
    });
  }

  ViewRejectHistory(purchaseOrderId) {
    
    this.blocked = true;
    this.poid = purchaseOrderId;
    this.podashboardserviceService.getRejectedHistory(purchaseOrderId).subscribe(result => {
      this.isOpenPopup = true;
      this.blocked = false;
      this.rejectedhistory = result;
    });
  }

  gotoapproval() {
    this.router.navigate(["pocloseapproval"], { relativeTo: this.r.parent });
  }

  navToPo(poid) {
     window.open(environment.apiURL + "/#/IRNew?id=" + poid);
  }

  getAllPeople() {
    this.blocked = true;
    this.peopleService.GetAll().subscribe(result => {
      this.blocked = false;
      this.peopleList = result;
    })
  }

  getPeopleName(modifiedBy) {
    let name = this.peopleList.filter(res => res.PeopleID == modifiedBy)[0] ? this.peopleList.filter(res => res.PeopleID == modifiedBy)[0].DisplayName : '-';
    return name ? name : '-'
  }

  setwarehousebycityname() {
    let cityId = this.warehouseList.filter(wh => wh.WarehouseId == this.warehouseid)[0].Cityid;
    return this.warehouseList.filter(wh => wh.Cityid == cityId);
  }

  TransferPOToHub() {
    this.confirmationService.confirm({
      message: 'are you sure you want to transfer purchase order items for po no - ' + this.poid + ' from warehouse: ' + this.getwhousenamebyidformsgservice(this.warehouseid) + ' to warehouse : ' + this.getwhousenamebyidformsgservice(this.towarehouseid),
      accept: () => {
        this.blocked = true;
        
        this.podashboardserviceService.TransferPOToHub(this.warehouseid, this.poid, this.towarehouseid)
          .subscribe(result => {

            this.blocked = false;

            // this.rejectedhistory = false;
            setTimeout(() => {
              if (result == true) {
                this.messageService.add({ severity: 'success', summary: 'Applied transfer for purchase order items for po no - ' +  this.poid +  'from warehouse:' + this.getwhousenamebyidformsgservice(this.warehouseid) + ' to ' + this.getwhousenamebyidformsgservice(this.towarehouseid), detail: '' });
                this.rejectedhistory = false;
                if (this.purchaseOrderId == "") {
                  this.purchaseOrderId = 0;
                }
                this.podashboardserviceService.getPOWithoutGR(this.warehouseid, 0, 10, this.purchaseOrderId).subscribe(result => {

                  setTimeout(() => {
                    if (this.purchaseOrderId == 0) {
                      this.purchaseOrderId = "";
                    }
                  }, 500);
                  this.blocked = false;
                  if (!result) {
                    // this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
                  }
                  else {
                    // this.messageService.add({ severity: 'success', summary: 'Data Get !!', detail: '' });
                  }
                  this.prRequestList = result.POData;
                  this.totalCount = result.netCount;
                  // this.page = { skip: 0, take: 10 };
                  // this.prRequestList = this.prrequestmaster.filter(wh => this.prrequestmaster.indexOf(wh) >= this.page.skip);
                  // this.prRequestList.splice(10, this.prRequestList.length - 10);
                }, error => {
                  this.blocked = false;
                  this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
                });
                this.towarehouseid = null;
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'Items for PO in ' + this.getwhousenamebyidformsgservice(this.warehouseid) + ' do not exist in ' + this.getwhousenamebyidformsgservice(this.towarehouseid), detail: '' });
              }
            }, 1000);
          });
      }
    });
  }

  getwhousenamebyidformsgservice(id) {
    let whname = this.warehouseList.filter(wh => wh.WarehouseId == id)[0].WarehouseName;
    if (whname) {
      return whname;
    }
  }

}


