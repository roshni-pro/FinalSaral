import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceService } from 'app/shared/services/google-place.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { environment } from 'environments/environment';
import { ConfirmationService } from 'primeng/api';
import { DelightService } from '../delight.service';
import { CustomerStatusUpdateDc } from '../interface/customer-status-update-dc';
import { ShippingAddressInput } from '../interface/shipping-address-input';
import { DistanceCalculateHelper } from '../services/distance-calculate-helper';
import { CustomerService } from 'app/shared/services/customer.service';
// import { CustomertrackingdelightService } from '../services/customertrackingdelight.service';

@Component({
  selector: 'app-customertrackingdetail',
  templateUrl: './customertrackingdetail.component.html',
  styleUrls: ['./customertrackingdetail.component.scss']
})
export class CustomertrackingdetailComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() custTracking: boolean;
  @Input() detail: any;
  @Input() CustomerId: any;
  @Input() SelectedStatus: any;

  //show details
  customer: any;
  customerCopy: any;
  blocked: boolean = false
  Nodocument: boolean = false;
  Comment: any;
  newlatlong: any;
  latlong: any;
  //billing
  ischeck: boolean = false;
  shoplatlong: any;
  //city
  showChangeAddress: boolean = false;
  updatedShippingAddress: ShippingAddressInput;

  requestList: any[];
  selectedRequest: number;
  baseURL: any;
  customerStatusUpdateDc: CustomerStatusUpdateDc;


  displayModal: boolean = false;
  entity: string = 'CustomerAddress';

  CustomerVerify: any;

  customerStatusList: any[];

  constructor(private delightService: DelightService
    , private googlePlaceService: GooglePlaceService
    , private loaderService: LoaderService
    , private confirmationService: ConfirmationService
    ,private customerservice:CustomerService) {
    this.baseURL = environment.apiURL;

  }
  ngOnInit() {

    // console.log("details", this.detail);
debugger;
    this.customer = null;
    this.customerCopy = null;    
    //getcustomerdetailbyid
    if (this.CustomerId != 0) {
      this.blocked = true;
      this.delightService.getCustomeDetailbyIdNew(this.CustomerId).subscribe(res => {
        this.customer = res.Customer;
        this.customer.IsDistanceCanUpdate = false;
        debugger;
        // this.customer.TypeOfBuissness = "";
        this.calculateList();
        if (this.customer && this.customer.Shoplat && this.customer.Shoplg) {
          this.calculateDistanceFromShippingAddress();
        }
        this.CustomerVerify = this.customer.CustomerVerify;
        this.requestList = res.RequestList;
        this.calculateDistance();
        console.log('this.requestList: ', this.requestList);
        console.log("customer", this.customer);
        this.newlatlong = res.Newlat + ",   " + res.Newlg;
        this.latlong = res.lat + ",   " + res.lg;
        this.shoplatlong = ((this.customer.Shoplat != null ? this.customer.Shoplat : 0) + ",   " + (this.customer.Shoplg != null ? this.customer.Shoplg : 0));
        //console.log("customerid",this.shoplatlong)
        if (this.customer != null) {
          if (this.customer.Nodocument == true) {
            this.Nodocument = this.customer.Nodocument;
            this.Comment = this.customer.Comment;
          }
        }

        this.customerCopy = JSON.parse(JSON.stringify(this.customer));
        //this.IsChannelDisabled();

      });


      // console.log("Details",this.detail);

    }
    this.CustomerChannelTypeList();

  }

  //back function
  Back() {
    //this.addData = {};
    this.close.emit();

  }

  //fillbilling
  fillbillingdetails() {

    this.ischeck = true;
    //alert(this.ischeck)
  }


  //shipping search



  changeAddress() {
    // debugger;
    this.showChangeAddress = true;
  }


  getUpdatedShippingAddress(event) {
    this.loaderService.loading(true);
    this.updatedShippingAddress = event;
    debugger;
    this.customer.ShippingAddress =
      (this.updatedShippingAddress.AddressLineOne ? this.updatedShippingAddress.AddressLineOne + ', ' : '')
      + (this.updatedShippingAddress.AddressLineTwo ? this.updatedShippingAddress.AddressLineTwo + ', ' : '')
      + this.updatedShippingAddress.AddressText
      + ' ' + this.updatedShippingAddress.ZipCode;
    this.calculateDistance();

    this.updatedShippingAddress.CustomerId = this.CustomerId;
    this.delightService.updateShippingAddress(this.updatedShippingAddress).subscribe(x => {
      console.log(x);
      this.loaderService.loading(false);
      if(x == "can't change due to updated Lat Lng is out of cluster"){
        alert(x);       
        return false;
      }
      
      this.showChangeAddress = false;
      this.ngOnInit();
    })
    console.log('getUpdatedShippingAddress: ', event);
  }

  calculateDistance() {
    if (this.requestList && this.requestList.length > 0) {
      let customerLat = this.customer.lat;
      let customerLng = this.customer.lg;
      if (this.updatedShippingAddress) {
        customerLat = this.updatedShippingAddress.AddressLat;
        customerLng = this.updatedShippingAddress.AddressLng;
      }
      this.requestList.forEach(x => {
        x.Distance = DistanceCalculateHelper.getDistanceFromLatLonInKm(x.Newlat, x.Newlg, customerLat, customerLng);

      })
    }
  }

  isRequestCantProcess(request: any): boolean {

    if (this.customer.CustomerDocumentStatus != 1
      || (this.customer.IsGSTCustomer && request.Distance > .700)
      || (!this.customer.IsGSTCustomer && request.Distance > 2.0)
      || request.Status != 1) {
      return true;
    } else {
      return false;
    }
  }

  verifyDocument() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: async () => {
        this.loaderService.loading(true);
        let distanceInKM = this.requestList.filter(x => { return x.Id == this.selectedRequest })[0].Distance;
        this.delightService.customerVerifyRequest({ Id: this.selectedRequest, distanceInKM }).subscribe(x => {
          this.selectedRequest = null;
          alert(x);
          this.loaderService.loading(false);
          this.ngOnInit();
        });
      }
    });
  }

  onUpdateLatLong() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to update the LatLong?',
      accept: async () => {
        this.loaderService.loading(true);
        this.delightService.virtuallyVerify(this.CustomerId).subscribe(x => {
          if (x == 'request verified successfully') {
            alert(x);
          } else {
            alert(x);
          }
          this.loaderService.loading(false);
          this.ngOnInit();
        });
      }
    });
  }
  isInvalid: boolean = false;
  onUpdateCustomer(customerStatusForm) {
    debugger;
    console.log('customerStatusForm', customerStatusForm);
    console.log('customerStatusForm.control', customerStatusForm.control);
    console.log('status', customerStatusForm.control.status);
    if (customerStatusForm.control.status == "VALID") {
      debugger;
      if (this.customer.BillingAddress != null && this.customer.BillingCity != null && this.customer.BillingState != null && this.customer.BillingZipCode != null) {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to update?',
          accept: async () => {
            this.loaderService.loading(true);
            this.customerStatusUpdateDc = {
              CustomerId: this.CustomerId,
              CustomerDocumentStatus: this.customer.CustomerDocumentStatus,
              CustomerType: this.customer.CustomerType,
              CustomerVerify: this.customer.CustomerVerify,
              IsActive: this.customer.Active,
              ShippingAddressStatus: this.customer.ShippingAddressStatus,
              ShopName: this.customer.ShopName,
              TypeOfBuissness : this.customer.TypeOfBuissness,
            //  ChannelMasterId : this.customer.ChannelMasterId,
            }
            this.delightService.updateCustomerStatus(this.customerStatusUpdateDc).subscribe(x => {debugger;
              if (x == 'Customer Status updated successfully') {
                alert(x);
                this.ngOnInit();
              } else {
                alert(x);
              }
              this.loaderService.loading(false);
              // this.ngOnInit(); 
            });
          }
        });
      } else {
        alert('Please Update Billing Address First!');
      }
    } else {
      this.isInvalid = true;
    }
  }

  isFullOrPartiallyVerified(): boolean {
    // debugger;
    if ((this.customer.CustomerVerify == 'Full Verified' || this.customer.CustomerVerify == 'Partial Verified') && (this.CustomerVerify == 'Full Verified' || this.CustomerVerify == 'Partial Verified')) {
      return true;
    } else {
      return false;
    }
  }

  isGSTVerified: boolean = false;
  onVerifyDocument(isVerified: boolean) {
    if (isVerified == true) {
      this.isGSTVerified = true;
    }
    debugger;
    this.ngOnInit();
  }

  showModalDialog() {
    this.displayModal = true;
  }


  openImage(path) {
    window.open(path);
  }


  isRejectPossible() {
    if (this.requestList && this.requestList.length > 0 && this.requestList.filter(x => { return x.Status == 1 }).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  rejectAllRequest() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject all request?',
      accept: async () => {
        this.loaderService.loading(true);
        this.delightService.rejectAllRequest(this.CustomerId).subscribe(x => {
          this.loaderService.loading(false);
          debugger;
          this.selectedRequest = null;
          alert(x);
          this.ngOnInit();
        });
      }
    });

  }

  calculateDistanceFromShippingAddress() {
    let customerLat = this.customer.lat;
    let customerLng = this.customer.lg;
    let distance = DistanceCalculateHelper.getDistanceFromLatLonInKm(this.customer.Shoplat, this.customer.Shoplg, customerLat, customerLng);
    this.customer.DistanceFromShipping = Math.round(distance * 100) / 100;
    if ((this.customer.IsGSTCustomer && distance < 0.71) || (!this.customer.IsGSTCustomer && distance < 2.0)) {
      this.customer.IsDistanceCanUpdate = true;
    } else {
      this.customer.IsDistanceCanUpdate = false;
    }
  }

  calculateList() {

    this.customerStatusList = [
      { value: 'Not Verified', label: 'Not Verified' },
      { value: 'Full Verified', label: 'Full Verified' },
      { value: 'Temporary Active', label: 'Temporary Active' },
      { value: 'Partial Verified', label: 'Partial Verified' }
    ];
    if (this.customer.CustomerVerify == 'Partial Verified' || this.customer.CustomerVerify == 'Full Verified') {
      this.customerStatusList = this.customerStatusList.filter(x => { return x.value == 'Full Verified' || x.value == 'Partial Verified' });
    }
    if (!this.customer.CustomerDocumentStatus) {
      this.customerStatusList = this.customerStatusList.filter(x => { return x.value != 'Full Verified' && x.value != 'Partial Verified' });
    }
    if (this.customer.CustomerDocumentStatus && this.customer.ShippingAddressStatus != 2) {
      this.customerStatusList = this.customerStatusList.filter(x => { return x.value != 'Full Verified' });
    }
  }

  onCustomerStatusChange() {
    if (this.customer.CustomerVerify == 'Partial Verified' || this.customer.CustomerVerify == 'Full Verified') {
      this.customer.Active = true;
    }
  }

  ChannelTypeList:any
  CustomerChannelTypeList(){
    this.customerservice.CustomerChannelTypeList().subscribe(res=>{
      console.log(res);      
      this.ChannelTypeList=res;
    })
  }
  // IsChannelDisable:boolean=false;
  // IsChannelDisabled(){
  //   if(this.customer.ChannelMasterId == 0) 
  //   {
  //     this.IsChannelDisable= false;
  //   }
  //   else{
  //     this.IsChannelDisable= true;
  //   }
  // }
}


