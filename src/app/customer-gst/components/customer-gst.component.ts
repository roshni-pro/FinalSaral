import { Component, OnInit } from '@angular/core';
import { CustomerGstService } from 'app/shared/services/customer-gst.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CustomerGst } from 'app/shared/interface/customer-gst';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from 'environments/environment';
import { log } from 'console';
@Component({
  selector: 'app-customer-gst',
  templateUrl: './customer-gst.component.html',
  styleUrls: ['./customer-gst.component.scss']
})
export class CustomerGstComponent implements OnInit {
  data: any;
  warehouses: any;
  GstList: any[];
  totalRecords: number;
  CustomerGst: CustomerGst;
  total_count: number;
  Skcode: string;
  Warehouseid: number;
  isOpenPopup: boolean;
  selectedRowDetails: any;
  DetailList: any;
  GSTVerifiedRequestId: any;
  Status: any;
  custData: any;
  baseURL:any;
  Citycode: any;
  selectedWarehouseId:any
  selectedSkcode:any
  constructor(private custgstService: CustomerGstService) { this.data = {}; this.baseURL = environment.apiURL; }

  ngOnInit() {
    this.isOpenPopup = false;

    this.CustomerGst = {
      Skcode: null,
      WarehouseId: null,
      Skip: 0,
      Take: 10,

    }


    this.custgstService.WarehouseGetByID().subscribe(result => {
      this.warehouses = result;
    })



    this.custgstService.GetGstList(this.CustomerGst).subscribe(result => {
      
      this.GstList = result.GSTCustomersAll;
      console.log(' this.GstList', this.GstList);
      this.totalRecords = result.total_count;

    })
  }

  OnClick(id) {
    if(id)
    {
    this.selectedWarehouseId=id.selectedOption.value.WarehouseId
    }
    this.CustomerGst = {
      Skcode: this.data.Skcode,
      WarehouseId: this.selectedWarehouseId,
      Skip: 0,
      Take: 10,

    }

    this.custgstService.GetGstList(this.CustomerGst).subscribe(result => {
      this.GstList = result.GSTCustomersAll;
      console.log('this.GstList::', this.GstList);
      this.totalRecords = result.total_count;

    })
  }
  openDetails(d, e) {
    console.log('d::', d);
    this.isOpenPopup = true;
    this.GSTVerifiedRequestId = d.GSTVerifiedRequestId;
    this.custgstService.GetDetailList(this.GSTVerifiedRequestId).subscribe(result => {
      this.DetailList = result;
      console.log('DetailList:', this.DetailList);
    })
  }

  Status1(Status) {
    this.Status = this.Status;

  }

  OnSave(Status) {
    
    
    this.custData = {};
    this.custData.GSTVerifiedRequestId = this.GSTVerifiedRequestId//this.DetailList.GSTVerifiedRequestId;
    this.custData.CustomerId = this.DetailList.CustomerId;
    this.custData.status = Status;
    this.custData.GSTNo = this.DetailList.GSTNo;
    this.custData.GSTImage=this.DetailList.GSTImage;
    this.custData.PANNo = this.DetailList.GSTNo.slice(2,12);    
    this.custgstService.PostStatus(this.custData).subscribe(result => {
      if(this.DetailList.Status=="")
      
      this.GstList = result.GSTCustomersAll;
      console.log('this.GstList::', this.GstList);
      window.location.reload();
      this.totalRecords = result.total_count;

    })
  }

  load(event) {
    
    this.CustomerGst.Skip = event.first;
    this.CustomerGst.Take = event.rows;

    this.custgstService.GetGstList(this.CustomerGst).subscribe(result => {
      this.GstList = result.GSTCustomersAll;
      console.log('this.GstList::', this.GstList);
      this.totalRecords = result.total_count;

    })
  }

}
