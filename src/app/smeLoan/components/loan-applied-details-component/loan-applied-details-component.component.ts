import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ThrowStmt } from '@angular/compiler';
import { SmeloanService } from 'app/smeLoan/services/smeloan.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-loan-applied-details-component',
  templateUrl: './loan-applied-details-component.component.html',
  styleUrls: ['./loan-applied-details-component.component.scss']
})
export class LoanAppliedDetailsComponentComponent implements OnInit {
  loanData: any;
  initialLoader = true;
  blocked = false;
  selectedWarehouses: any;
  warehouseList: any[];
  customerskCode = '';
  page: { skip: any; take: any; };
  TotalCount: any;

  constructor(private route: ActivatedRoute, private smeloanService: SmeloanService) { }

  ngOnInit() {
    
    this.selectedWarehouses = "";
    this.route.params.subscribe(params => {
      
      this.blocked = false;
      this.initialLoader = false;
      //  params['Id'];
      
      // localStorage.setItem('userToken', params['Id']);
    });
    // this.smeloanService.getLoanAppliedDetails().subscribe(x => {
    //   this.initialLoader = false;
    //   this.loanData = x;
    //   console.log('x', x);
    // });

    this.getAllWarehouses();

  }

  getAllWarehouses() {
    this.initialLoader = true;

    this.smeloanService.GetWarehouses()
      .subscribe(result => {
        

        this.blocked = false
        this.warehouseList = result;
        this.initialLoader = false;

      });
  }

  search() {
    this.page = { skip: 0, take: 10 };
    this.initialLoader = true;
    this.smeloanService.getLoanAppliedDetailsV2(this.selectedWarehouses, this.customerskCode, this.page.skip, this.page.take).subscribe(x => {
      this.initialLoader = false;
      this.TotalCount = x.TotalCount;

      this.loanData = x.SMECustomerLoanList;
      console.log('x', x);
    });
  }

  load(event) {

    this.blocked = true

    if (true) {
      this.page = { skip: event.first, take: event.rows };

      
      this.initialLoader = true;

      this.smeloanService.getLoanAppliedDetailsV2(this.selectedWarehouses, this.customerskCode, this.page.skip, this.page.take).subscribe(x => {
        
        this.loanData = x.SMECustomerLoanList;
        this.TotalCount = x.TotalCount;
        this.initialLoader = false;
        this.blocked = false;
        console.log('x', x);
      });
    }

  }

  Export() {
    
    this.page = { skip: 0, take: 0 };
    this.initialLoader = true;

    this.smeloanService.getLoanAppliedDetailsV2(this.selectedWarehouses, this.customerskCode, this.page.skip, this.page.take).subscribe(x => {
      this.initialLoader = false;
      // this.loanData = x.SMECustomerLoanList;
      let exportList = []

      let obj = {};
      let wscols = [
        { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
      ];
      if (x.SMECustomerLoanList && x.SMECustomerLoanList.length) {
        x.SMECustomerLoanList.forEach(element => {
          obj = {};
          obj[' Sk Code'] = element.SKcode && element.SKcode != 'NULL' ? element.SKcode : '-';
          obj['Customer Name'] = element.CustomerName && element.CustomerName != 'NULL' ? element.CustomerName : '-';
          obj['Warehouse Name'] = element.WarehouseName && element.WarehouseName != 'NULL' ? element.WarehouseName : '-';
          obj['Loan Amount'] = element.LoanAmount && element.LoanAmount != 'NULL' ? element.LoanAmount : '-';
          obj['Status'] = element.Description && element.Description != 'NULL' ? element.Description : '-';
          exportList.push(obj);

        });
      }


      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportList);
      worksheet['!cols'] = wscols;
      console.log('worksheet', worksheet);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'SmeLoanCustomerDetails');

    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }
}
