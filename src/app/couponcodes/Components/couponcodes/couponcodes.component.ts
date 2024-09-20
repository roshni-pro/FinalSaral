import { MessageService } from 'primeng/api';
import { CouponcodesService } from './../../Services/couponcodes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { filterCouponCodes } from 'app/couponcodes/Interfaces/filterCouponCodes';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-couponcodes',
  templateUrl: './couponcodes.component.html',
  styleUrls: ['./couponcodes.component.scss']
})
export class CouponcodesComponent implements OnInit {
  @ViewChild("dt", { static: false }) public dt: Table;
  couponCodes = [];
  filtercouponcodes: filterCouponCodes;
  blocked: boolean;
  TotalRecords: any;
  columns = [
    { header: 'Coupon Code', field: 'CouponCode' },
    { header: 'Coupon Amount', field: 'CouponAmount' },
    { header: 'Min Order Amount', field: 'MinOrderAmount' },
    { header: 'Created Date', field: 'CreatedDate' },
    { header: 'Expiry Date', field: 'ExpiryDate' },

  ]
  buyerDetails = [];
  heading: string;
  displayBuyerDetails: boolean = false;
  isUploadedCoupon: boolean;

  constructor(private couponcodesservice: CouponcodesService, private messageService: MessageService) { }

  ngOnInit() {
    this.initialize();
    this.GetCouponCodeDetails();
  }

  initialize() {

    this.filtercouponcodes = {
      skip: 0,
      take: 10,
      SearchString: '',
      StartDate: null,
      EndDate: null,
    }

  }

  GetCouponCodeDetails() {
    this.blocked = true;
    // if(this.filtercouponcodes.StartDate < this.filtercouponcodes.EndDate){ // date condition
    if (this.filtercouponcodes.StartDate && this.filtercouponcodes.EndDate && this.filtercouponcodes.StartDate > this.filtercouponcodes.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start Date should be less than End Date !!', detail: '' });
      this.blocked = false;
    }
    else {
      this.couponcodesservice.GetCouponCodeDetails(this.filtercouponcodes).subscribe(result => {
        this.blocked = false;
        this.couponCodes = result.CouponCodesList;
        this.TotalRecords = result.TotalRecords;
        console.log('this.couponCodes :', this.couponCodes);
      }, error => {
        this.blocked = false;
        // this.messageService.add({ severity: 'error', summary: 'No Orders Found !!', detail: '' });
      });
    }

  }

  load(event) {

    this.filtercouponcodes.skip = event.first;
    this.filtercouponcodes.take = event.rows;
    if (this.filtercouponcodes.StartDate && this.filtercouponcodes.EndDate && this.filtercouponcodes.StartDate > this.filtercouponcodes.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start Date should be less than End Date !!', detail: '' });
    }
    else {
      this.GetCouponCodeDetails();
    }

  }

  getAssignedList(idList, type) {
    
    if (idList) {
      this.couponcodesservice.GetBuyerDetailsByBuyerIds(idList).subscribe(result => {
        
        this.blocked = false;
        this.displayBuyerDetails = true;
        this.buyerDetails = result;
        if (type == 'AvailableToBuyers') {
          this.heading = 'Available To Buyers';
        }
        else {
          this.heading = 'Applied By Buyers';
        }
        console.log('this.buyerDetails :', this.buyerDetails);
      }, error => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });

    }
  }

  uploadCoupon() {
    this.isUploadedCoupon = true;

  }

  closeUploadingCouponDialog() {
    this.isUploadedCoupon = false;
  }



}
