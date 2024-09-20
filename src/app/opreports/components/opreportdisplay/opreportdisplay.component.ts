import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ExportService } from 'app/shared/services/export.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { OpreportsService } from './../../services/opreports.service';
import { OrderColorRequest } from './../../interfaces/order-color-request';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-opreportdisplay',
  templateUrl: './opreportdisplay.component.html',
  styleUrls: ['./opreportdisplay.component.scss']
})
export class OpreportdisplayComponent implements OnInit {

  @ViewChild("dt", { static: false }) public dt: Table;
  opreportdata = [];
  ReportType = '';
  filterOPReports: OrderColorRequest;
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

  constructor(private exportService: ExportServiceService, private warehouseService: WarehouseService, private opreportsservice: OpreportsService, private messageService: MessageService) { }

  ngOnInit() {
    this.initialize();
    this.getAllWarehouses();
  }

  initialize() {
    this.filterOPReports = new OrderColorRequest();
  }

  getAllWarehouses() {
    this.warehouseService.GetActiveWarehouses()
      .subscribe(result => {
        this.blocked = false

        this.warehouseList = result;
        this.filterOPReports.WarehouseIds = result;
      });
  }

  GetOPReportDetails() {

    if (this.filterOPReports.ReportType != '' && this.filterOPReports.WarehouseIds.length) {

      this.blocked = true;
      let whouseidobject = this.filterOPReports.WarehouseIds
      this.filterOPReports.WarehouseIds = this.filterOPReports.WarehouseIds.map(function (elem) {
        return elem.WarehouseId ? elem.WarehouseId : elem;
      });

      if (this.filterOPReports.StartDate && this.filterOPReports.EndDate && this.filterOPReports.StartDate > this.filterOPReports.EndDate) {
        this.messageService.add({ severity: 'error', summary: 'Start Date should be less than End Date !!', detail: '' });
        this.blocked = false;
      }
      else {
        this.opreportsservice.getOPReports(this.filterOPReports).subscribe(result => {
     
          setTimeout(() => {
            this.filterOPReports.WarehouseIds = whouseidobject;
          }, 1000);
          console.log("oprepot : ", result);
          this.ReportType = this.filterOPReports.ReportType == 'OrderColorAmount' ? 'Order Color Amount' : (this.filterOPReports.ReportType == 'OrderColorCount' ? 'Order Color Count' : 'Order Color Time');
          this.blocked = false;
          if (!result || !result.length) {
            this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
          }
          this.opreportdata = result;
          this.TotalRecords = result.length;

          if (this.filterOPReports.ReportType == 'OrderColorAmount') 
          {
            this.columns = [
              { header: 'Warehouse Name', field: 'WarehouseName' },
              { header: 'Red Orders', field: 'RedOrderAmount' },
              { header: 'Yellow Orders', field: 'YellowOrderAmount' },
              { header: 'Blue Orders', field: 'BlueOrderAmount' },
              { header: 'White Orders', field: 'WhiteOrderAmount' },
              { header: 'Grand Total', field: 'GrandTotal' },
              { header: 'Red %', field: 'RedOrderPercent' },
              { header: 'Yellow %', field: 'YellowOrderPercent' },
              { header: 'Blue %', field: 'BlueOrderPercent' },
              { header: 'White %', field: 'WhiteOrderPercent' },
            ]
          }
          if (this.filterOPReports.ReportType == 'OrderColorCount') {
            
            this.columns = [
              { header: 'Warehouse Name', field: 'WarehouseName' },
              { header: 'Red Orders', field: 'RedOrderCount' },
              { header: 'Yellow Orders', field: 'YellowOrderCount' },
              { header: 'Blue Orders', field: 'BlueOrderCount' },
              { header: 'White Orders', field: 'WhiteOrderCount' },
              { header: 'Grand Total', field: 'GrandTotal' },
              { header: 'Red %', field: 'RedOrderPercent' },
              { header: 'Yellow %', field: 'YellowOrderPercent' },
              { header: 'Blue %', field: 'BlueOrderPercent' },
              { header: 'White %', field: 'WhiteOrderPercent' },
            ]
          }
          if (this.filterOPReports.ReportType == 'OrderColorTime') {
            this.columns = [
              { header: 'Warehouse Name', field: 'WarehouseName' },
              { header: '100+ Crossed %', field: 'Hour100GreaterOrderPercent' },
              { header: '72-100 Crossed %', field: 'Hour100OrderPercent' },
              { header: '48-72 Crossed %', field: 'Hour72OrderPercent' },
              { header: '24-48 Crossed %', field: 'Hour48OrderPercent' },
              { header: '0-24 Crossed %', field: 'Hour24OrderPercent' },
              { header: 'Grand Total', field: 'GrandTotal' },
              { header: '100+ Crossed ', field: 'Hour100GreaterOrderCount' },
              { header: '72-100 Crossed ', field: 'Hour100OrderCount' },
              { header: '48-72 Crossed ', field: 'Hour72OrderCount' },
              { header: '24-48 Crossed ', field: 'Hour48OrderCount' },
              { header: '0-24 Crossed ', field: 'Hour24OrderCount' },
            ]
          }
          let grandTotalObj: any = {};

          // for initializing

          Object.keys(this.opreportdata[0]).map(function (key, index) {
            grandTotalObj[key] = null
            grandTotalObj.WarehouseName = 'Grand Total';
          });
          this.opreportdata.forEach(prop => {
            
            Object.keys(prop).map(function (key, index) {
              grandTotalObj[key] += prop[key]
              grandTotalObj.WarehouseName = 'Grand Total';
            });
          });
          
          grandTotalObj.Hour100GreaterOrderPercent ? grandTotalObj.Hour100GreaterOrderPercent = Math.round(grandTotalObj.Hour100GreaterOrderPercent / this.opreportdata.length) : '';
          grandTotalObj.Hour100OrderPercent ? grandTotalObj.Hour100OrderPercent = Math.round(grandTotalObj.Hour100OrderPercent / this.opreportdata.length) : '';
          grandTotalObj.Hour72OrderPercent ? grandTotalObj.Hour72OrderPercent = Math.round(grandTotalObj.Hour72OrderPercent / this.opreportdata.length) : '';
          grandTotalObj.Hour48OrderPercent ? grandTotalObj.Hour48OrderPercent = Math.round(grandTotalObj.Hour48OrderPercent / this.opreportdata.length) : '';
          grandTotalObj.Hour24OrderPercent ? grandTotalObj.Hour24OrderPercent = Math.round(grandTotalObj.Hour24OrderPercent / this.opreportdata.length) : '';

          grandTotalObj.BlueOrderPercent ? grandTotalObj.BlueOrderPercent = Math.round(grandTotalObj.BlueOrderPercent / this.opreportdata.length) : '';
          grandTotalObj.RedOrderPercent ? grandTotalObj.RedOrderPercent = Math.round(grandTotalObj.RedOrderPercent / this.opreportdata.length) : '';
          grandTotalObj.WhiteOrderPercent ? grandTotalObj.WhiteOrderPercent = Math.round(grandTotalObj.WhiteOrderPercent / this.opreportdata.length) : '';




          this.opreportdata.push(grandTotalObj);
        }, error => {
          this.blocked = false;
          this.messageService.add({ severity: 'error', summary: 'Some Error has occurred !!', detail: '' });
        });
      }
    }
    else {
      if (this.filterOPReports.ReportType == '')
        this.messageService.add({ severity: 'error', summary: 'Pls select report type !!', detail: '' });

      if (!this.filterOPReports.WarehouseIds.length)
        this.messageService.add({ severity: 'error', summary: 'Pls select warehouse ids !!', detail: '' });

    }
  }


  uploadCoupon() {
    this.isUploadedCoupon = true;

  }

  closeUploadingCouponDialog() {
    this.isUploadedCoupon = false;
  }


  exportToExcel() {

    let opreport = [];
    
    opreport = opreport.concat(this.opreportdata);
    opreport.forEach(obj => {
      
      delete obj.WarehouseId
      if (this.filterOPReports.ReportType == 'OrderColorTime') {
        Object.defineProperty(obj, '100+ Crossed %',
          Object.getOwnPropertyDescriptor(obj, 'Hour100GreaterOrderPercent'));
        delete obj['Hour100GreaterOrderPercent'];

        Object.defineProperty(obj, '72-100 Crossed %',
          Object.getOwnPropertyDescriptor(obj, 'Hour100OrderPercent'));
        delete obj['Hour100OrderPercent'];

        Object.defineProperty(obj, '48-72 Crossed %',
          Object.getOwnPropertyDescriptor(obj, 'Hour72OrderPercent'));
        delete obj['Hour72OrderPercent'];

        Object.defineProperty(obj, '24-48 Crossed %',
          Object.getOwnPropertyDescriptor(obj, 'Hour48OrderPercent'));
        delete obj['Hour48OrderPercent'];

        Object.defineProperty(obj, '0-24 Crossed %',
          Object.getOwnPropertyDescriptor(obj, 'Hour24OrderPercent'));
        delete obj['Hour24OrderPercent'];

        Object.defineProperty(obj, '100+ Crossed ',
          Object.getOwnPropertyDescriptor(obj, 'Hour100GreaterOrderCount'));
        delete obj['Hour100GreaterOrderCount'];

        Object.defineProperty(obj, '72-100 Crossed ',
          Object.getOwnPropertyDescriptor(obj, 'Hour100OrderCount'));
        delete obj['Hour100OrderCount'];

        Object.defineProperty(obj, '48-72 Crossed ',
          Object.getOwnPropertyDescriptor(obj, 'Hour72OrderCount'));
        delete obj['Hour72OrderCount'];

        Object.defineProperty(obj, '24-48 Crossed ',
          Object.getOwnPropertyDescriptor(obj, 'Hour48OrderCount'));
        delete obj['Hour48OrderCount'];

        Object.defineProperty(obj, '0-24 Crossed  ',
          Object.getOwnPropertyDescriptor(obj, 'Hour24OrderCount'));
        delete obj['Hour24OrderCount'];

        // obj['Hour100GreaterOrderPercent'] ? obj['Hour100GreaterOrderPercent'] = obj['100+ Crossed %'] : '';
        //obj['Hour100OrderPercent'] ? obj['Hour100OrderPercent'] = obj['72-100 Crossed %'] : '';
        // obj['Hour72OrderPercent'] ? obj['Hour72OrderPercent'] = obj['48-72 Crossed %'] : '';
        //obj['Hour48OrderPercent'] ? obj['Hour48OrderPercent'] = obj['24-48 Crossed %'] : '';
        // obj['Hour24OrderPercent'] ? obj['Hour24OrderPercent'] = obj['0-24 Crossed %'] : '';
        // obj['Hour100GreaterOrderCount'] ? obj['Hour100GreaterOrderCount'] = obj['100+ Crossed '] : '';
        // obj['Hour100OrderCount'] ? obj['Hour100OrderCount'] = obj['72-100 Crossed '] : '';
        //  obj['Hour72OrderCount'] ? obj['Hour72OrderCount'] = obj['48-72 Crossed '] : '';
        // obj['Hour48OrderCount'] ? obj['Hour48OrderCount'] = obj['24-48 Crossed '] : '';
        // obj['Hour24OrderCount'] ? obj['Hour24OrderCount'] = obj['0-24 Crossed '] : '';
        // obj['Hour48OrderCount'] ? obj['Hour48OrderCount'] = obj['24-48 Crossed '] : '';
        setTimeout(() => {
          this.GetOPReportDetails();
        }, 500);
      }
    });



    opreport.push(opreport[opreport.length - 1]);
    opreport[opreport.length - 2] = {};

    this.exportAsExcelFile(opreport, this.filterOPReports.ReportType);

  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    let wscols = [
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    worksheet['!cols'] = wscols;
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });


    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

  Export()
  {
    debugger
    if (this.filterOPReports.ReportType != '' && this.filterOPReports.WarehouseIds.length) {

      this.blocked = true;
      let whouseidobject = this.filterOPReports.WarehouseIds
      this.filterOPReports.WarehouseIds = this.filterOPReports.WarehouseIds.map(function (elem) {
        return elem.WarehouseId ? elem.WarehouseId : elem;
      });

      if (this.filterOPReports.StartDate && this.filterOPReports.EndDate && this.filterOPReports.StartDate > this.filterOPReports.EndDate) {
        this.messageService.add({ severity: 'error', summary: 'Start Date should be less than End Date !!', detail: '' });
        this.blocked = false;
      }
      else {
        debugger
        this.opreportsservice.ExportOPReports(this.filterOPReports).subscribe(result => {
            if(result.Status == true && result.Data != null && result.Data !=undefined)
            {
              alert(result.Message)
              window.open(result.Data);
              this.blocked = false;
            }
            else{
              alert(result.Message);
            }
        }
        )}
      }    
  }

  checkNan(val) {
    
    return true;
  }

}
