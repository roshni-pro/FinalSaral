import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { CallssmsService } from 'app/shared/services/callssms.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { PaginatorCustomerCallSMSRequest } from 'app/shared/interface/paginator-customer-call-smsrequest';
import { CustomerService } from 'app/shared/services/customer.service';


@Component({
  selector: 'app-add-calls-sms',
  templateUrl: './add-calls-sms.component.html',
  styleUrls: ['./add-calls-sms.component.scss']
})
export class AddCallsSmsComponent implements OnInit {
  cityList: any;
  searchModel: any;
  getCustomerCallSMSRequest: any;
  PageList: any[];
  totalRecords: number;
  loading: boolean;
  isLoading: boolean;
  paginator: PaginatorCustomerCallSMSRequest;
  cols: any[];
  pageSize: number;
  warehouseList: any;
  constructor(private CallssmsService: CallssmsService,
    private router: Router,
    private customerservice: CustomerService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private pilotService: PepolePilotService) {

    this.searchModel = {};
  }

  ngOnInit() {
    
    this.loading = true;

    this.cols = [
      { field: 'WarehouseName', header: 'WarehouseName' },
      { field: 'ShopName', header: 'ShopName' },
      { field: 'Skcode', header: 'Skcode' },
      { field: 'Name', header: 'Name' },
      { field: 'City', header: 'City' },
      { field: 'Mobile', header: 'Mobile' },
      { field: 'Active', header: 'Active' },

    ];

    this.pageSize = 12;
    this.paginator = {
      Skip: 0,
      Take: this.pageSize,
      active: true,
      Cityid: null,
      Warehouseid: null
    }
    this.pilotService.City().subscribe(result => {
      this.cityList = result;
      
    })


  }

  search(data) {
    this.loading = true;
    
    console.log("data", data);
    this.paginator.Cityid = data.Cityid;
    this.paginator.Warehouseid = data.Warehouseid;
    this.pilotService.getCustomerCallSMSRequest(this.paginator).subscribe(result => {
      this.PageList = result.CustomerPagerList;
      this.totalRecords = result.Total_count;
      //this.getCustomerCallSMSRequest = result;

    })


    this.loading = false;
  }
  load(event) {

    this.paginator.Skip = event.first;
    this.paginator.Take = event.rows;
    this.search(this.paginator);
  }
  getcityWarehouse(data) {
    this.loading = true;

    this.customerservice.getWareHouseByCity(data).subscribe(result => {
      this.warehouseList = result;
    })
    this.loading = false;

  }

}
