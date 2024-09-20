import { DatePipe } from '@angular/common';

import { BuyerService } from 'app/shared/services/buyer.service';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import { OrderColorRequest } from 'app/opreports/interfaces/order-color-request';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { OpreportsService } from 'app/opreports/services/opreports.service';
import { MessageService } from 'primeng/api';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-podashboard',
  templateUrl: './podashboard.component.html',
  styleUrls: ['./podashboard.component.scss'],
  providers: [
    DatePipe
  ]
})
export class PODashboardComponent implements OnInit {

  statusArray = ['Approved',
    'CN Partial Received',
    'Partial Received',
    'PR Send for Approval',
    'Self Approved',
    'UN Partial Received',
    'UN Received']
  @ViewChild("dt", { static: false }) public dt: Table;
  dashboarddata: any;
  ReportType = '';

  blocked: boolean;
  TotalRecords: any;
  columns = [];


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
  filterdashboardsearch = {
    WarehouseId: null,
    StartDate: null,
    EndDate: null,
    SupplierId: null,
    BuyerId: 0
  };
  sellerlist: any[];
  sellermaster = [];
  warehouseidslist = [];
  SupplierIdslist = []; buyersList: any[];


  constructor(private datePipe: DatePipe, private buyerservice: BuyerService, private podashboardserviceService: PodashboardserviceService, private orderassignmentservice: OrderAssignmentsService, private supplierservice: SupplierService, private exportService: ExportServiceService, private warehouseService: WarehouseService, private opreportsservice: OpreportsService, private messageService: MessageService) { }

  ngOnInit() {
    this.initialize();
    this.getAllWarehouses();
    this.getAllSuppliers();
    this.getAllBuyers();

  }

  initialize() {
    this.filterdashboardsearch = {
      WarehouseId: null,
      StartDate: null,
      EndDate: null,
      SupplierId: null,
      BuyerId: 0
    };
    this.getAllWarehouses()
  }

  getAllWarehouses() {
    this.blocked = true;
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.blocked = false;
        this.warehouseList = result;
        this.filterdashboardsearch.WarehouseId = result;
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

    // this.supplierservice.GetSupplierData()
    this.podashboardserviceService.getSuppliers()
      .subscribe(result => {
        this.blocked = false
        this.sellerlist = result;
        this.sellermaster = result;
      });
  }

  GetPODashboardData() {

    this.warehouseidslist = [];
    let resetwarehouseids = this.filterdashboardsearch.WarehouseId;
    // let resetsupplierids = this.filterdashboardsearch.SupplierId;
    this.filterdashboardsearch.WarehouseId && this.filterdashboardsearch.WarehouseId.length ?
      this.filterdashboardsearch.WarehouseId.forEach(element => {
        element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
      }) : '';

    let emptyWhList = this.warehouseList;

    !this.filterdashboardsearch.WarehouseId.length ?
      emptyWhList.forEach(element => {
        element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
      }) : '';

    let SupplierId = this.filterdashboardsearch.SupplierId;
    this.filterdashboardsearch.SupplierId = []

    if (SupplierId && SupplierId != null) {
      this.filterdashboardsearch.SupplierId.push(SupplierId.toString());
    }

    if (this.filterdashboardsearch && this.filterdashboardsearch.BuyerId) {
      this.filterdashboardsearch.BuyerId = Number(this.filterdashboardsearch.BuyerId);
    }
    this.filterdashboardsearch.WarehouseId = this.warehouseidslist;
    // this.filterdashboardsearch.SupplierId = this.SupplierIdslist;

    let StartDate = this.filterdashboardsearch.StartDate ? this.filterdashboardsearch.StartDate : '';
    let EndDate = this.filterdashboardsearch.EndDate ? this.filterdashboardsearch.EndDate : '';


    this.filterdashboardsearch.StartDate ? this.filterdashboardsearch.StartDate = this.datePipe.transform(this.filterdashboardsearch.StartDate, "dd/MM/yyyy") : '';
    this.filterdashboardsearch.EndDate ? this.filterdashboardsearch.EndDate = this.datePipe.transform(this.filterdashboardsearch.EndDate, "dd/MM/yyyy") : '';
    // this.filterdashboardsearch.StartDate ? this.filterdashboardsearch.StartDate.setDate(this.filterdashboardsearch.StartDate.getDate() + 1) : '';
    // this.filterdashboardsearch.EndDate ? this.filterdashboardsearch.EndDate.setDate(this.filterdashboardsearch.EndDate.getDate() + 1) : '';
    this.blocked = true;
    this.podashboardserviceService.getDashboardData(this.filterdashboardsearch).subscribe(result => {
      console.log('po dashboard data:', result);
      // this.blocked = false;
      setTimeout(() => {
        this.filterdashboardsearch.WarehouseId = resetwarehouseids;
        // this.filterdashboardsearch.SupplierId = resetsupplierids;
        this.warehouseidslist = [];
        this.blocked = false;
        this.filterdashboardsearch.StartDate = StartDate;
        this.filterdashboardsearch.EndDate = EndDate
        // this.SupplierIdslist = [];
      }, 2000);
      if (!result) {
        this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
      }
      this.dashboarddata = result;



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
    }
  }

  setSeller(event) {
    this.filterdashboardsearch.SupplierId = event.SupplierId;
  }

  exportToExcel(statusstring,ExcelName) {
    this.blocked=true;


    // let statusarray = status.split(',');
    // let statusString = "";
    // let statusstringEnd = '"'
    // statusarray.forEach(element => {
    //   if (statusarray[statusarray.length - 1] != element) {
    //     statusString += "'" + element + "' ,";
    //   }
    //   else {
    //     statusString += "'" + element + "'"
    //   }
    // });
    // let Status = statusString;
    // Status = status
   
    
    if (this.filterdashboardsearch.WarehouseId) {

      this.warehouseidslist = [];
      let resetwarehouseids = this.filterdashboardsearch.WarehouseId;
      // let resetsupplierids = this.filterdashboardsearch.SupplierId;
      this.filterdashboardsearch.WarehouseId && this.filterdashboardsearch.WarehouseId.length ?
        this.filterdashboardsearch.WarehouseId.forEach(element => {
          element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
        }) : '';

      let emptyWhList = this.warehouseList;

      !this.filterdashboardsearch.WarehouseId.length ?
        emptyWhList.forEach(element => {
          element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
        }) : '';

      let SupplierId = this.filterdashboardsearch.SupplierId;
      this.filterdashboardsearch.SupplierId = []

      if (SupplierId && SupplierId != null) {
        this.filterdashboardsearch.SupplierId.push(SupplierId.toString());
      }

      if (this.filterdashboardsearch && this.filterdashboardsearch.BuyerId) {
        this.filterdashboardsearch.BuyerId = Number(this.filterdashboardsearch.BuyerId);
      }
      // this.filterdashboardsearch.WarehouseId = this.warehouseidslist;
      // this.filterdashboardsearch.SupplierId = this.SupplierIdslist;

      let StartDate = this.filterdashboardsearch.StartDate ? this.filterdashboardsearch.StartDate : '';
      let EndDate = this.filterdashboardsearch.EndDate ? this.filterdashboardsearch.EndDate : '';


      this.filterdashboardsearch.StartDate ? this.filterdashboardsearch.StartDate = this.datePipe.transform(this.filterdashboardsearch.StartDate, "dd/MM/yyyy") : '';
      this.filterdashboardsearch.EndDate ? this.filterdashboardsearch.EndDate = this.datePipe.transform(this.filterdashboardsearch.EndDate, "dd/MM/yyyy") : '';

      let filterdashboardsearch = null;
      filterdashboardsearch = this.filterdashboardsearch;
      filterdashboardsearch.Status = statusstring






      
      filterdashboardsearch.WarehouseId = this.warehouseidslist;

      this.podashboardserviceService.GetPoDahboardExport(filterdashboardsearch).subscribe(result => {
        setTimeout(() => {
          this.filterdashboardsearch.WarehouseId = resetwarehouseids;
          // this.filterdashboardsearch.SupplierId = resetsupplierids;
          this.warehouseidslist = [];
          this.blocked = false;


          this.filterdashboardsearch.StartDate = StartDate;
          this.filterdashboardsearch.EndDate = EndDate
          // this.SupplierIdslist = [];
        }, 2000);
        // if (!result) {
        //   this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
        // }
        // this.dashboarddata = result;
        let wscols = [
          { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
          { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
          { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
          { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
        ]; //column width defined here

        if (result && result.length) {

          let exportList = []

          let obj = {};



          result.forEach(element => {

            obj = {};
            obj['PO Number'] = element.PurchaseOrderId && element.PurchaseOrderId != 'NULL' ? element.PurchaseOrderId : '-';
            obj['SupplierName'] = element.SupplierName && element.SupplierName != 'NULL' ? element.SupplierName : '-';
            obj['Hub'] = element.HubName && element.HubName != 'NULL' ? element.HubName : '-';
            obj['Depo'] = element.DepoName && element.DepoName != 'NULL' ? element.DepoName : '-';
            obj['Po Creation Date and Time Stamp'] = element.PoCreationDate && element.PoCreationDate != 'NULL' ? element.PoCreationDate : '-';
            obj['Created By'] = element.PoCreatedBy && element.PoCreatedBy != 'NULL' ? element.PoCreatedBy : '-';
            obj['Approved By'] = element.PoApprovedBy && element.PoApprovedBy != 'NULL' ? element.PoApprovedBy : '-';
            obj['PO Amount'] = element.POAmount && element.POAmount != 'NULL' ? element.POAmount : '-';
            obj['PO Status'] = element.POStatus && element.POStatus != 'NULL' ? element.POStatus : '-';
            obj['Payment Status'] = element.PaymentStatus && element.PaymentStatus != 'NULL' ? element.PaymentStatus : '-';

            obj['Payment Terms'] = element.PaymentTerms && element.PaymentTerms != 'NULL' ? element.PaymentTerms : '-';
            obj['PRPaymentType'] = element.PRPaymentType && element.PRPaymentType != 'NULL' ? element.PRPaymentType : '-';

            obj['GR Date'] = element.GRcreatedDate && element.GRcreatedDate != 'NULL' ? element.GRcreatedDate : '-';
            obj['GR Done By'] = element.GRCreatedBy && element.GRCreatedBy != 'NULL' ? element.GRCreatedBy : '-';
            obj['GR Approved By'] = element.GRApprovedBy && element.GRApprovedBy != 'NULL' ? element.GRApprovedBy : '-';
            obj['GRAmount'] = element.GRAmount && element.GRAmount != 'NULL' ? element.GRAmount : '-';

            obj['IR Date'] = element.IRDate && element.IRDate != 'NULL' ? element.IRDate : '-';
            obj['IR Done By'] = element.IRcreatedBy && element.IRcreatedBy != 'NULL' ? element.IRcreatedBy : '-';
            obj['IR Amount'] = element.IRAmount && element.IRAmount != 'NULL' ? element.IRAmount : '-';
            obj['Invoice Number'] = element.InvoiceNumber && element.InvoiceNumber != 'NULL' ? element.InvoiceNumber : '-';
            obj['Debit Note Amount'] = element.DebitAmount && element.DebitAmount != 'NULL' ? element.DebitAmount : '-';
            obj['Debit Note Number'] = element.DebitNumber && element.DebitNumber != 'NULL' ? element.DebitNumber : '-';


            exportList.push(obj);
          });



          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportList);
          worksheet['!cols'] = wscols;
          console.log('worksheet', worksheet);
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, ExcelName);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
        }

      }, error => {
        // this.blocked = false;

        setTimeout(() => {
          this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
          this.filterdashboardsearch.WarehouseId = resetwarehouseids;
          // this.filterdashboardsearch.SupplierId = resetsupplierids;
          this.warehouseidslist = [];
          this.blocked = false;


          this.filterdashboardsearch.StartDate = StartDate;
          this.filterdashboardsearch.EndDate = EndDate
          // this.SupplierIdslist = [];
        }, 2000);
      });
    }
  }

  CreatedexportToExcel(ProcName,ExcelName) {


    this.blocked=true;
   
    if (this.filterdashboardsearch.WarehouseId) {

      this.warehouseidslist = [];
      let resetwarehouseids = this.filterdashboardsearch.WarehouseId;
      // let resetsupplierids = this.filterdashboardsearch.SupplierId;
      this.filterdashboardsearch.WarehouseId && this.filterdashboardsearch.WarehouseId.length ?
        this.filterdashboardsearch.WarehouseId.forEach(element => {
          element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
        }) : '';

      let emptyWhList = this.warehouseList;

      !this.filterdashboardsearch.WarehouseId.length ?
        emptyWhList.forEach(element => {
          element.WarehouseId ? this.warehouseidslist.push(element.WarehouseId.toString()) : '';
        }) : '';

      let SupplierId = this.filterdashboardsearch.SupplierId;
      this.filterdashboardsearch.SupplierId = []

      if (SupplierId && SupplierId != null) {
        this.filterdashboardsearch.SupplierId.push(SupplierId.toString());
      }

      if (this.filterdashboardsearch && this.filterdashboardsearch.BuyerId) {
        this.filterdashboardsearch.BuyerId = Number(this.filterdashboardsearch.BuyerId);
      }
      // this.filterdashboardsearch.WarehouseId = this.warehouseidslist;
      // this.filterdashboardsearch.SupplierId = this.SupplierIdslist;

      let StartDate = this.filterdashboardsearch.StartDate ? this.filterdashboardsearch.StartDate : '';
      let EndDate = this.filterdashboardsearch.EndDate ? this.filterdashboardsearch.EndDate : '';


      this.filterdashboardsearch.StartDate ? this.filterdashboardsearch.StartDate = this.datePipe.transform(this.filterdashboardsearch.StartDate, "dd/MM/yyyy") : '';
      this.filterdashboardsearch.EndDate ? this.filterdashboardsearch.EndDate = this.datePipe.transform(this.filterdashboardsearch.EndDate, "dd/MM/yyyy") : '';

      let filterdashboardsearch = null;
      filterdashboardsearch = this.filterdashboardsearch;
 
      filterdashboardsearch.WarehouseId = this.warehouseidslist;
      filterdashboardsearch.ProcedureName=ProcName;

      this.podashboardserviceService.GetCreatedPoDahboardExport(filterdashboardsearch).subscribe(result => {
        setTimeout(() => {
          this.filterdashboardsearch.WarehouseId = resetwarehouseids;
          // this.filterdashboardsearch.SupplierId = resetsupplierids;
          this.warehouseidslist = [];
          this.blocked = false;


          this.filterdashboardsearch.StartDate = StartDate;
          this.filterdashboardsearch.EndDate = EndDate
          // this.SupplierIdslist = [];
        }, 2000);
        // if (!result) {
        //   this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
        // }
        // this.dashboarddata = result;
        let wscols = [
          { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
          { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
          { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
          { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
        ]; //column width defined here

        if (result && result.length) {

          let exportList = []

          let obj = {};



          result.forEach(element => {

            obj = {};
            obj['PO Number'] = element.PurchaseOrderId && element.PurchaseOrderId != 'NULL' ? element.PurchaseOrderId : '-';
            obj['SupplierName'] = element.SupplierName && element.SupplierName != 'NULL' ? element.SupplierName : '-';
            obj['Hub'] = element.HubName && element.HubName != 'NULL' ? element.HubName : '-';
            obj['Depo'] = element.DepoName && element.DepoName != 'NULL' ? element.DepoName : '-';
            obj['Po Creation Date and Time Stamp'] = element.PoCreationDate && element.PoCreationDate != 'NULL' ? element.PoCreationDate : '-';
            obj['Created By'] = element.PoCreatedBy && element.PoCreatedBy != 'NULL' ? element.PoCreatedBy : '-';
            obj['Approved By'] = element.PoApprovedBy && element.PoApprovedBy != 'NULL' ? element.PoApprovedBy : '-';
            obj['PO Amount'] = element.POAmount && element.POAmount != 'NULL' ? element.POAmount : '-';
            obj['PO Status'] = element.POStatus && element.POStatus != 'NULL' ? element.POStatus : '-';
            obj['Payment Status'] = element.PaymentStatus && element.PaymentStatus != 'NULL' ? element.PaymentStatus : '-';

            obj['Payment Terms'] = element.PaymentTerms && element.PaymentTerms != 'NULL' ? element.PaymentTerms : '-';
            obj['PRPaymentType'] = element.PRPaymentType && element.PRPaymentType != 'NULL' ? element.PRPaymentType : '-';

            obj['GR Date'] = element.GRcreatedDate && element.GRcreatedDate != 'NULL' ? element.GRcreatedDate : '-';
            obj['GR Done By'] = element.GRCreatedBy && element.GRCreatedBy != 'NULL' ? element.GRCreatedBy : '-';
            obj['GR Approved By'] = element.GRApprovedBy && element.GRApprovedBy != 'NULL' ? element.GRApprovedBy : '-';
            obj['GRAmount'] = element.GRAmount && element.GRAmount != 'NULL' ? element.GRAmount : '-';

            obj['IR Date'] = element.IRDate && element.IRDate != 'NULL' ? element.IRDate : '-';
            obj['IR Done By'] = element.IRcreatedBy && element.IRcreatedBy != 'NULL' ? element.IRcreatedBy : '-';
            obj['IR Amount'] = element.IRAmount && element.IRAmount != 'NULL' ? element.IRAmount : '-';
            obj['Invoice Number'] = element.InvoiceNumber && element.InvoiceNumber != 'NULL' ? element.InvoiceNumber : '-';
            obj['Debit Note Amount'] = element.DebitAmount && element.DebitAmount != 'NULL' ? element.DebitAmount : '-';
            obj['Debit Note Number'] = element.DebitNumber && element.DebitNumber != 'NULL' ? element.DebitNumber : '-';


            exportList.push(obj);
          });



          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportList);
          worksheet['!cols'] = wscols;
          console.log('worksheet', worksheet);
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, ExcelName);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
        }

      }, error => {
        // this.blocked = false;

        setTimeout(() => {
          this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
          this.filterdashboardsearch.WarehouseId = resetwarehouseids;
          // this.filterdashboardsearch.SupplierId = resetsupplierids;
          this.warehouseidslist = [];
          this.blocked = false;


          this.filterdashboardsearch.StartDate = StartDate;
          this.filterdashboardsearch.EndDate = EndDate
          // this.SupplierIdslist = [];
        }, 2000);
      });
    }
  }
}
