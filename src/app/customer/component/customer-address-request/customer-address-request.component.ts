import { Component, OnInit } from '@angular/core';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
import { CustomerAddressRequestVM } from 'app/shared/interface/customer-address-request-vm';
import { CustomerAddressRequestService } from 'app/shared/services/customer-address-request.service';

@Component({
  selector: 'app-customer-address-request',
  templateUrl: './customer-address-request.component.html',
  styleUrls: ['./customer-address-request.component.scss']
})
export class CustomerAddressRequestComponent implements OnInit {

  skip: number = 0;
  take: number = 25;
  cityList: any[];
  warehouseList: any[];
  data: any = {};
  requestList: CustomerAddressRequestVM[];
  totalRecords: number = 100;
  isloading: boolean = false;
  viewSingleRequest: boolean = false;
  constructor(private customerAddressRequestService: CustomerAddressRequestService, private deliveryDashboardService: DeliveryDashboardService) { }

  ngOnInit() {
    this.getCtyList();
  }


  getCtyList() {
    this.deliveryDashboardService.getCityList().subscribe(result => {
      this.cityList = result;
      if (this.cityList && this.cityList.length == 1) {
        this.data.CityId = this.cityList[0].value;
        this.onChangeCity(this.data.CityId);
      }
    })
  }

  onChangeCity(CityId) {
    this.deliveryDashboardService.getWarehoueList(CityId).subscribe(res => {
      this.warehouseList = res;
      if (this.warehouseList && this.warehouseList.length == 1) {
        this.data.warehouseId = this.warehouseList[0].value;
        this.onChangeHub();
      }
    });
  }

  onChangeHub() {
    this.loadData(null);
  }

  loadData(event) {
    console.log('event is', event);
    if (event != null) {
      this.skip = event.first;

    } else {
      this.skip = 0;
    }
    if (this.data.warehouseId) {
      this.customerAddressRequestService.getCustomerAddressRequestList(this.skip, this.take, this.data.warehouseId).subscribe(res => {
        this.requestList = res;
        console.log(res);
      });
    }

  }


  verify(row: CustomerAddressRequestVM) {

    this.viewSingleRequest = true;
  }

  closeSingleRequest(event) {
    console.log('close event is', event);
    this.viewSingleRequest = false;
  }
}
