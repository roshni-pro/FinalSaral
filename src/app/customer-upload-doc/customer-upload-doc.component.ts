import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { SelectItem, MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { parse } from 'querystring';
import * as CryptoJS from 'crypto-js';
import { parseHttpResponse } from 'selenium-webdriver/http';
@Component({
  selector: 'app-customer-upload-doc',
  templateUrl: './customer-upload-doc.component.html',
  styleUrls: ['./customer-upload-doc.component.scss']
})
export class CustomerUploadDocComponent implements OnInit {
  @Output() refreshParent = new EventEmitter();
  @Input() Mobile: any;
  customerId: any;
  cust: any;
  file: any;
  custDoc: any;
  id: any;
  imagePath: any;
  imgURL: any;
  baseURL: any;
  isSearch: any;
  condition: boolean;
  show: boolean;
  isDetails: any;
  blocked: boolean;
  showV1: boolean;
  GST_: boolean;
  SHOP_: boolean;
  REG_: boolean;
  conditionNew: boolean;
  value: any;
  public destroyed = new Subject<any>();

  constructor(private router: Router, private customerservice: CustomerService, private messageService: MessageService, private route: ActivatedRoute) { this.cust = {}; this.baseURL = environment.apiURL; this.blocked = false; this.value = "" }

  ngOnInit() {
    this.isDetails = false;
    this.conditionNew = true;
    this.onInitialize();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.onInitialize();
    });
  }

  onInitialize() {
    this.Mobile = Number(this.route.snapshot.paramMap.get("Mobile"));
    this.customerservice.getcustMobile(this.Mobile).subscribe(result => {
      console.log('result: ', result);
      this.customerId = result;
      if (this.customerId > 0) {
        this.show = true;
        this.conditionNew = true;
        //alert("Customer login successfully");
      } else {
        alert("Customer Not Found");
        this.show = false;
        this.conditionNew = false;
        this.condition = false;

      }
    })
  }
  // searchnumber(Mobile) {
  //   
  //   this.customerservice.getcustMobile(Mobile).subscribe(result => {
  //     
  //     this.custdataMobile = result;
  //      alert(result);
  //   })
  // }
  upload(file: File[]) {
    ;
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;

    }
    (success) => {
      alert("image uploaded successfully")
    };
  }
  onChange() {

    this.file = null;
    this.imgURL = null;

  }
  uploadDocust(value) {

    this.blocked = true;
    if (value == undefined || value == "") {
      alert("Please select Document");
      this.blocked = false;
      return value;
    }
    if (this.file == undefined) {
      alert("Please select image")
      this.blocked = false;
      return this.file;
    }
    if (value == 1) {
      this.SHOP_ = true;
    }
    else if (value == 2) {
      this.GST_ = true;
    }
    else if (value == 3) {
      this.REG_ = true;
    }
    // if (this.file[0].size > 5000000)  // validation according to file size
    // {
    //   alert("Image size too large");
    //   return true;
    // }
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      console.log('formData', formData);
      this.customerservice.uploadCustDoc(value, this.customerId, formData).subscribe(result => {

        console.log(result)
        this.blocked = false;
        this.messageService.add({ severity: 'success', summary: 'Image Uploaded Successfully!', detail: '' });
        if (result != "" && result != "Upload Unsuccessfull" && result) {
          this.imgURL = this.baseURL + '/UploadedImages/' + result;
          this.file = [];
          alert("Image Uploaded Successfully");
          if (this.SHOP_ || this.GST_ || this.REG_) {
            this.condition = true;
            this.conditionNew = false;
            this.show = true;
          }
          // window.location.reload();         

        } else {
          alert("Please Select Correct Image");
          this.blocked = false;
          location.reload();
        }
      }, (err) => {
        this.blocked = false;
        alert("Image Size Large");
        location.reload();
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
      });
    }
  }
  Back() {
    location.reload();
  }
}
