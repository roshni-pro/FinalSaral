import { filter } from 'rxjs/operators';
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
  selector: 'app-purchase-order-close-request',
  templateUrl: './purchase-order-close-request.component.html',
  styleUrls: ['./purchase-order-close-request.component.scss']
})
export class PurchaseOrderCloseRequestComponent implements OnInit {

  @ViewChild(Table, { static: false }) dt: Table;


  dashboarddata: any;
  ReportType = '';

  blocked: boolean;
  TotalRecords: any;
  columns = [];
  isOpenPopupForAction = false;
  currentPoId = null;
  prRequestList = [];

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
  rejectedhistory: any;
  isOpenPopup: boolean;
  peopleList: any;
  porequestmaster: any;
  totalroles : any;
  isShow : boolean = false;


  constructor(private peopleService: PeopleService, private confirmationService: ConfirmationService, private router: Router, private r: ActivatedRoute, private purchaseorderservice: PurchaseOrderService, private buyerservice: BuyerService, private podashboardserviceService: PodashboardserviceService,
    private orderassignmentservice: OrderAssignmentsService, private supplierservice: SupplierService,
    private exportService: ExportServiceService, private warehouseService: WarehouseService, private opreportsservice: OpreportsService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAllPurchaseOrderRequestForIdi();
    this.getAllPeople();
    this.initialize();
    this.getAllWarehouses();
    this.getAllSuppliers();
    // this.getAllBuyers();
    this.totalroles =localStorage.getItem('role');
    var a = this.totalroles.split(',');
    for (var i in a) {
      if (a[i] == "Logistics Executive") {
        this.isShow = true;
       
        break
      } else {
        this.isShow = false;
      }
    }

  }

  initialize() {
    this.filterreqquestsearch = {
      WarehouseIds: null,
      StartDate: new Date(),
      EndDate: new Date(),
      SupplierIds: null,
      PurchaseOrderId: 0
    };

    this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate() + 1)
    this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate() - 30)
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

  getAllSuppliers() {

    this.blocked = true;
    this.podashboardserviceService.getSuppliers()
      .subscribe(result => {

        this.sellerlist = result;
        this.sellermaster = result;
        // this.filterreqquestsearch.SupplierIds = result;
        this.blocked = false

      });
  }




  GetPODashboardData() {
    this.podashboardserviceService.GetClosePOForApproval().subscribe(ress => {

      this.porequestmaster = ress;

      this.warehouseidslist = [];
      this.SupplierIdslist = [];

      let resetwarehouseids = this.filterreqquestsearch.WarehouseIds;
      let resetsupplierids = this.filterreqquestsearch.SupplierIds;

      this.filterreqquestsearch.WarehouseIds && this.filterreqquestsearch.WarehouseIds.length ?
        this.filterreqquestsearch.WarehouseIds.forEach(element => {
          element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
        }) : '';


      this.filterreqquestsearch.SupplierIds && this.filterreqquestsearch.SupplierIds.length ?
        this.filterreqquestsearch.SupplierIds.forEach(element => {
          element.SupplierId ? this.SupplierIdslist.push(element.SupplierId.toString()) : '';
        }) : this.sellermaster.forEach(element => {
          element.SupplierId ? this.SupplierIdslist.push(element.SupplierId.toString()) : '';
        });

      // if (SupplierId && SupplierId != null) {
      //   this.filterreqquestsearch.SupplierIds.push(SupplierId.toString());
      // }

      // if (this.filterreqquestsearch && this.filterreqquestsearch.BuyerId) {
      //   this.filterreqquestsearch.BuyerId = Number(this.filterreqquestsearch.BuyerId);
      // }


      this.filterreqquestsearch.WarehouseIds = this.warehouseidslist;
      this.filterreqquestsearch.SupplierIds = this.SupplierIdslist;

      // this.filterreqquestsearch.StartDate ? this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate() + 1) : '';

      // this.filterreqquestsearch.EndDate ? this.filterreqquestsearch.EndDate.setDate(this.filterreqquestsearch.EndDate.getDate() + 1) : '';

      this.filterreqquestsearch.StartDate ? this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate()) : '';

      this.filterreqquestsearch.EndDate ? this.filterreqquestsearch.EndDate.setDate(this.filterreqquestsearch.EndDate.getDate()) : '';





      this.blocked = true;

      this.podashboardserviceService.GetPOForClose(this.filterreqquestsearch).subscribe(result => {


        setTimeout(() => {
          this.filterreqquestsearch.WarehouseIds = resetwarehouseids;
          this.filterreqquestsearch.SupplierIds = resetsupplierids;
          this.warehouseidslist = [];
          this.SupplierIdslist = [];
          this.blocked = false;
          this.dt.reset();

        }, 2000);
        if (result && !result.length) {
          this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
        }
        else {
          this.messageService.add({ severity: 'success', summary: 'Data Get !!', detail: '' });

        }

        this.totalCount = result.length;

        result.forEach(element => {

          // element.ApprovalStatus = this.porequestmaster.filter(por => por.PurchaseOrderId == element.PurchaseOrderId && por.ApprovedBy == localStorage.userid)[0] && this.porequestmaster.filter(por => por.PurchaseOrderId == element.PurchaseOrderId && por.ApprovedBy == localStorage.userid)[0].ApprovedStatus ? this.porequestmaster.filter(por => por.PurchaseOrderId == element.PurchaseOrderId && por.ApprovedBy == localStorage.userid)[0].ApprovedStatus : 0;

          let item = this.porequestmaster.filter(por => por.PurchaseOrderId == element.PurchaseOrderId)[0]
          if (item) {

            element.ApprovalStatus = null;


            // if (item.IsCloseRejected) {
            //   element.ApprovalStatus = 0;

            // }
            // else{
            //     element.ApprovalStatus = 0;

            // }
          }
          else {
            element.ApprovalStatus = 0;
          }

          // polist.sort(function (a, b) {
          //   return a.id - b.id;
          // });
        });

        setTimeout(() => {
          this.prrequestmaster = result;


          this.page = { skip: 0, take: 10 };
          this.prRequestList = this.prrequestmaster.filter(wh => this.prrequestmaster.indexOf(wh) >= this.page.skip);
          this.prRequestList.splice(10, this.prRequestList.length - 10);

        }, 1500);

      }, error => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
      });



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

  // getSeLlerList(event) {
  //   if (event.query.length > 2) {
  //     this.sellerlist = this.sellermaster.filter(x => x.Name.toString().toLowerCase().includes(event.query.toLowerCase()));
  //   }
  // }

  setSeller(event) {

    this.filterreqquestsearch.SupplierIds = event.SupplierId;
  }

  getAllPurchaseOrderRequestForIdi() {
    this.podashboardserviceService.GetClosePOForApproval().subscribe(result => {

      this.porequestmaster = result;
    });

  }

  loadLazy(event) {
    event
    this.page = { skip: event.first, take: event.rows };
    this.prRequestList = this.prrequestmaster.filter(wh => this.prrequestmaster.indexOf(wh) >= this.page.skip);
    this.prRequestList.splice(10, this.prRequestList.length - 10);
  }

  SendPOForClose(purchaseOrderId) {

    this.confirmationService.confirm({
      message: 'are you sure you want to close purchase order with order-no:' + purchaseOrderId + ' ?',
      accept: () => {

        let po = this.prRequestList.filter(por => por.PurchaseOrderId == purchaseOrderId)[0];
        po.ApprovalStatus = 3; // for local view
        this.blocked = true;
        this.podashboardserviceService.SendPOForClose(purchaseOrderId).subscribe(result => {
          //if (result) {
            this.blocked = false;
            this.messageService.add({ severity: 'success', summary: 'Applied Close Request for Po Id - ' + purchaseOrderId, detail: '' });
            setTimeout(() => {
              // this.GetPODashboardData();
            }, 3000);
          //}
          // else {
          //   this.blocked = false;
          //   this.messageService.add({ severity: 'success', summary: 'You cannot close, GRN in Progress' });
          //   setTimeout(() => {
          //     // this.GetPODashboardData();
          //   }, 3000);
          // }
        });
      }
    });
  }

  ViewRejectHistory(purchaseOrderId) {
    this.blocked = true;
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

  hover(a) {
    if (a == true) {

      setTimeout(() => {
        this.isOpenPopupForAction = true;
      }, 400);
    }
    else {

      setTimeout(() => {
        this.isOpenPopupForAction = false;
      }, 200);
    }

  }
  exporttoexcel() {
    debugger
    //  this.GetPODashboardData();
    this.warehouseidslist = [];
    this.SupplierIdslist = [];

    let resetwarehouseids = this.filterreqquestsearch.WarehouseIds;
    let resetsupplierids = this.filterreqquestsearch.SupplierIds;

    this.filterreqquestsearch.WarehouseIds && this.filterreqquestsearch.WarehouseIds.length ?
      this.filterreqquestsearch.WarehouseIds.forEach(element => {
        element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
      }) : '';


    this.filterreqquestsearch.SupplierIds && this.filterreqquestsearch.SupplierIds.length ?
      this.filterreqquestsearch.SupplierIds.forEach(element => {
        element.SupplierId ? this.SupplierIdslist.push(element.SupplierId.toString()) : '';
      }) : this.sellermaster.forEach(element => {
        element.SupplierId ? this.SupplierIdslist.push(element.SupplierId.toString()) : '';
      });


    this.filterreqquestsearch.WarehouseIds = this.warehouseidslist;
    this.filterreqquestsearch.SupplierIds = this.SupplierIdslist;


    this.filterreqquestsearch.StartDate ? this.filterreqquestsearch.StartDate.setDate(this.filterreqquestsearch.StartDate.getDate()) : '';

    this.filterreqquestsearch.EndDate ? this.filterreqquestsearch.EndDate.setDate(this.filterreqquestsearch.EndDate.getDate()) : '';



    this.podashboardserviceService.GetPOForClose(this.filterreqquestsearch).subscribe(result => {


      setTimeout(() => {
        this.filterreqquestsearch.WarehouseIds = resetwarehouseids;
        this.filterreqquestsearch.SupplierIds = resetsupplierids;
        this.warehouseidslist = [];
        this.SupplierIdslist = [];
        this.blocked = false;
        this.dt.reset();

      }, 2000);
      if (result && !result.length) {
        this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Data Get !!', detail: '' });

      }

      // this.totalCount = result.length;

      result.forEach(element => {

        // element.ApprovalStatus = this.porequestmaster.filter(por => por.PurchaseOrderId == element.PurchaseOrderId && por.ApprovedBy == localStorage.userid)[0] && this.porequestmaster.filter(por => por.PurchaseOrderId == element.PurchaseOrderId && por.ApprovedBy == localStorage.userid)[0].ApprovedStatus ? this.porequestmaster.filter(por => por.PurchaseOrderId == element.PurchaseOrderId && por.ApprovedBy == localStorage.userid)[0].ApprovedStatus : 0;

        let item = this.porequestmaster.filter(por => por.PurchaseOrderId == element.PurchaseOrderId)[0]
        if (item) {

          element.ApprovalStatus = null;


          // if (item.IsCloseRejected) {
          //   element.ApprovalStatus = 0;

          // }
          // else{
          //     element.ApprovalStatus = 0;

          // }
        }
        else {
          element.ApprovalStatus = 0;
        }
      });

      setTimeout(() => {
        this.prrequestmaster = result;
      }, 1500);

    }, error => {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
    });
    this.exportService.exportAsExcelFile(this.prrequestmaster, 'REQUESTPOCLOSE');
  }
}
