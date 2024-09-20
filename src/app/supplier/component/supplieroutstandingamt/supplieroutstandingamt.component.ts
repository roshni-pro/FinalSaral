import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
@Component({
  selector: 'app-supplieroutstandingamt',
  templateUrl: './supplieroutstandingamt.component.html',
  styleUrls: ['./supplieroutstandingamt.component.scss']
})
export class SupplieroutstandingamtComponent implements OnInit {

  searchModel: any;
  constructor(private supplierService: SupplierService, private messageService: MessageService) { }
  totalRecordCount: number;
  rowSize: number;
  supplieroutstandingamtList: any[];
  ngOnInit() {
    this.rowSize = 20;
    this.searchModel = {
      Contains: '',
      FromDate: null,
      ToDate: null,
      Skip: 0,
      Take: this.rowSize,
      SupplierID: null
    }

  }


  search(event) {
    if (event) {
      this.searchModel.Skip = event.first;
      this.searchModel.Take = event.rows;
      this.searchModel.FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('MM/DD/YYYY HH:mm:ss') : null
      this.searchModel.ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('MM/DD/YYYY HH:mm:ss') : null
    }

    this.supplierService.getoutstandingdetails(this.searchModel).subscribe(result => {
      
      this.supplieroutstandingamtList = result.OutstandingList;
      this.totalRecordCount = result.TotalRecords;
    });
  }

  searchByFilter() {
    this.searchModel.Skip = 0;
    this.searchModel.Take = this.rowSize;
    this.search(null);
  }

  clear() {
    this.searchModel = {
      Contains: '',
      FromDate: null,
      ToDate: null,
      Skip: 0,
      Take: this.rowSize,
      SupplierID: null
    }
    this.search(null);
  }
}