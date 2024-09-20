import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'app/shared/services/customer.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DelightService } from '../delight.service';
import { TrackingCustomerDocumentDc } from '../interface/tracking-customer-document';
import * as moment from 'moment';
import { CustomerBillingAddressDc } from '../interface/customer-status-update-dc';
import { StateService } from 'app/shared/services/state.service';
import { DistanceCalculateHelper } from '../services/distance-calculate-helper';

@Component({
  selector: 'app-customer-document',
  templateUrl: './customer-document.component.html',
  styleUrls: ['./customer-document.component.scss']
})
export class CustomerDocumentComponent implements OnInit {
  @Input() customerId: number;
  @Input() customerDetail: any;
  @Output() onVerifyDocument: EventEmitter<boolean> = new EventEmitter<boolean>();
  customer: TrackingCustomerDocumentDc;
  customerToView: TrackingCustomerDocumentDc;
  file: any;
  imagePath: any;
  imgURL: any;
  isInvalid: boolean = false;
  gstValue: number = 1;
  baseURL: any;
  isGSTReset: boolean = false;
  isLicenceNoReset: boolean = false;
  selectedDocument: SelectedDoc = SelectedDoc.none;
  GSTData: any;
  GSTdisplay: boolean = false;
  NameOnGST: any;
  isLicenseExpiryDateReset: boolean = false;
  customerBillingAddressDc: CustomerBillingAddressDc;
  isDocumentNotSelected: boolean = false;
  // trackingCustomerDocumentDc: TrackingCustomerDocumentDc;
  // customerDocumentList: any;
  docList: any;
  minDateValue: any;
  isExpiredDate: boolean = false;

  isShowGSTDoc: boolean;
  stateList: any;
  changeBillingCityDialog: boolean = false;
  isshow: boolean = false;
  text: string = "";
  blocked: boolean = false;
  statusforcheck: boolean = false;

  constructor(private activateRoute: ActivatedRoute
    , private _service: DelightService
    , private confirmationService: ConfirmationService
    , private customerservice: CustomerService
    , private messageService: MessageService
    , private loaderService: LoaderService
    , private stateService: StateService) { this.customer = null; this.baseURL = environment.apiURL; }

  ngOnInit() {
    console.log('customerdetail', this.customerDetail);
    console.log("mobile", this.customerDetail.Mobile);
    console.log("gstin", this.customerDetail.GSTno);
    // debugger;

    this.loaderService.loading(true);
    this.stateService.GetAllState().subscribe(result => {
      this.stateList = result;
      if (this.customerDetail != null && this.customerDetail.BillingState != null) {
        var stList = this.stateList.filter(x => x.StateName == this.customerDetail.BillingState);
        if (stList.length > 0) {
          this.onStateChange();
        } else {
          // this.customerDetail.BillingState = '';
          // this.customerDetail.BillingCity = '';
        }
      } else {
        // this.customerDetail.BillingState = '';
        // this.customerDetail.BillingCity = '';
      }
      this.loaderService.loading(true);
      this._service.getTrackingCustomerDocument(this.customerId).subscribe(x => {
        console.log('getdata : ', x);
        this.customer = x;
        if (this.customer.DocumentStatus == 1 && this.customer.IsGSTCustomer || (this.customer.DocumentStatus == 0 && this.customer.GSTNo)) {
          this.selectedDocument = SelectedDoc.gst;
        }
        else {
          this.selectedDocument = SelectedDoc.other;
        }

        this.loaderService.loading(false);
        this.customer.GSTDocTypeId = 1;
        if (this.customer.LicenseExpiryDate) {

          this.customer.LicenseExpiryDate = moment(this.customer.LicenseExpiryDate).toDate();
        }
        if (this.customer.GstExpiryDate) {
          this.customer.GstExpiryDate = moment(this.customer.GstExpiryDate).toDate();
        }
        if (this.customer.DocumentStatus == 1) {
          if (this.customer.IsGSTCustomer) {
            this.selectedDocument = SelectedDoc.gst;
          }
          else {
            this.selectedDocument = SelectedDoc.other;
          }
        }
        //debugger;
        if (this.customer.GSTNo == "" || this.customer.GSTNo == null) {
          this.isGSTReset = true;
        }
        if (this.customer.LicenceNo == "" || this.customer.LicenceNo == null) {
          this.isLicenceNoReset = true;
        }
        if (this.customer.GstExpiryDate != null && (this.customer.GSTImage != null || this.customer.GSTImage != "") && (this.customer.GSTNo != "" || this.customer.GSTNo != null)) {
          this.isGSTValid = true;
        }
        if (this.customer.LicenseExpiryDate != null && this.customer.DocTypeId > 0 && (this.customer.OtherDocumetImage != null || this.customer.OtherDocumetImage != "") && (this.customer.LicenceNo != "" || this.customer.LicenceNo != null)) {
          this.isOtherDocumentValid = true;
        }
        this.customerToView = JSON.parse(JSON.stringify(this.customer));
        // CustomerId: 68556,DocType: null,DocTypeId: 0,DocumentStatus: 0,GSTImage: "",GSTNo: "",GstExpiryDate: null,IsGSTCustomer: false,LicenceNo: "",LicenseExpiryDate: null,OtherDocumetImage: ""
      })
      this.loaderService.loading(true);
      this.customerservice.GetCustomerDocType(0, 0).subscribe(x => {
        let obj = [];
        x.forEach(element => {
          if (element.Id != 1) {
            obj.push(element);
          }
        });
        this.docList = obj;
        this.loaderService.loading(false);
      })
      // alert('customerId: '+ this.customerId);
      const today = new Date();
      const tomorrow = moment().add(1, 'days').toDate();
      // this.minDateValue = tomorrow;
      // this.minDateValue = tomorrow;
      this.minDateValue = moment().month(-5).toDate();
      this.loaderService.loading(false);
    });
  }

  uploadImg(file: File[]) {
    this.file = file;
    debugger;
    if (this.file[0].type != 'image/jpg' && this.file[0].type != 'image/jpeg' && this.file[0].type != "image/png") {
      alert("Browse to upload a valid File with png/jpeg/jpg extension");
      // this.file = [];
      return true;
    } else {
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
  }
  uploadGSTImgResult:any
  uploadGSTImg() {
	debugger
    if (this.file[0].type != 'image/jpg' && this.file[0].type != 'image/jpeg' && this.file[0].type != "image/png") {
      alert("Browse to upload a valid File with png/jpeg/jpg extension");
      // this.file = [];
      return true;
    } else if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.loaderService.loading(true);
      this.customerservice.gstUpload(this.customer.CustomerId, formData).subscribe(result => {
        console.log(result)
        this.loaderService.loading(false);
        debugger;
        this.uploadGSTImgResult=result
        if (result != "Upload Unsuccessfull") {
          if (result.lastIndexOf("https://") == -1 && result.lastIndexOf("http://") == -1) {
            result = this.baseURL + "/UploadedImages/" + result;
            this.customer.GSTImage = result;
          } else {
            this.customer.GSTImage = result;
          }
          alert("Uploaded Successfully");

          // this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          alert("Upload Unsuccessfull");
          // this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        alert("Error");
        // this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }
  }
  OtherDocumetImageRes:any
  uploadOtherDocImg() {
    if (this.file[0].type != 'image/jpg' && this.file[0].type != 'image/jpeg' && this.file[0].type != "image/png") {
      alert("Browse to upload a valid File with png/jpeg/jpg extension");
      this.file = [];
      return true;
    } else if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.loaderService.loading(true);
      this.customerservice.regupload(this.customer.CustomerId, formData).subscribe(result => {
        console.log(result)
        this.loaderService.loading(false);
        this.OtherDocumetImageRes=result;
        if (result != "Upload Unsuccessfull") {
          if (result.lastIndexOf("https://") == -1 && result.lastIndexOf("http://") == -1) {
            result = this.baseURL + "/UploadedImages/" + result;
            this.customer.OtherDocumetImage = result;
          } else {
            this.customer.OtherDocumetImage = result;
          }
          alert("Uploaded Successfully");
          // this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          alert("Upload Unsuccessfull");
          // this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        alert("Error");
        // this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }
  }
  isGSTValid: boolean = false;
  isOtherDocumentValid = false;
  onVerify(testForm, isUpdateGST: boolean) {
    // debugger;
    this.isInvalid = false;
    // var expiryDate = this.onChangeExpiryDate();
    // if(expiryDate > 0){
    if (isUpdateGST && this.customer.GSTNo && this.customer.GSTNo.length == 15 && this.customer.GSTImage && this.customer.GstExpiryDate && this.isGSTReset == false) {
      // if (this.customer.GstExpiryDate == this.minDateValue) {
      //   this.isInvalid = true;
      //   return true;
      // } else {
      this.isGSTValid = true;
      this.confirmationService.confirm({
        message: 'Are you sure you want to continue? If you proceed then you will not be able to change the shipping address or upload the image again.',
        accept: () => {
          this.loaderService.loading(true);
          this._service.isDocumentNotExists(this.customerId, this.customer.GSTNo).subscribe(isNotExists => {

            if (isNotExists) {
              this.customerservice.CheckVarifiedCustomerGSTNO(this.customer.GSTNo).subscribe(x => {
                this.loaderService.loading(false);
                if (x.Status) {
                  this.customer.IsGSTCustomer = true;
                  this.customer.OtherDocumetImage=this.OtherDocumetImageRes
                  this.customer.GSTImage=this.uploadGSTImgResult
                  let customerCopy = JSON.parse(JSON.stringify(this.customer));
                  customerCopy.DocTypeId = 1;
                  this.loaderService.loading(true);
                  this._service.updateTrackingCustomerDocument(customerCopy).subscribe(x => {
                    this.loaderService.loading(false);
                    if (x == "Document Status verified Successfully") {
                      alert('Your Document Updated Successfully!');
                      // this.messageService.add({ severity: 'success', summary: x, detail: '' });
                      this.ngOnInit();
                      this.onVerifyDocument.emit(true);
                    }
                    else {
                      alert(x);
                      this.customer.GSTNo = null;
                      this.isGSTReset = true;
                      // this.messageService.add({ severity: 'error', summary: "Something went wrong!", detail: '' });
                    }
                  })
                } else {
                  alert("Something went wrong!");
                  // this.messageService.add({ severity: 'error', summary: "Something went wrong!", detail: '' });
                }
              })
            } else {
              this.loaderService.loading(false);
              alert('document number is already exists');
            }
          })
        }
      });
      // }
    } else if (!isUpdateGST && this.customer.LicenseExpiryDate && this.customer.LicenceNo && this.customer.OtherDocumetImage && this.isLicenceNoReset == false && this.customer.DocTypeId > 0) {
      // if (this.customer.LicenseExpiryDate == this.minDateValue) {
      //   this.isInvalid = true;
      //   return true;
      // } else {
      this.isOtherDocumentValid = true;
      this.confirmationService.confirm({
        message: 'Are you sure you want to continue? If you proceed then you will not be able to change the shipping address or upload the image again.',
        accept: () => {
          this.loaderService.loading(true);
          this._service.updateTrackingCustomerDocument(this.customer).subscribe(x => {
            this.loaderService.loading(false);
            if (x == "Document Status verified Successfully") {
              alert('Your Document Updated Successfully!');
              // this.messageService.add({ severity: 'success', summary: x, detail: '' });
              this.ngOnInit();
              this.onVerifyDocument.emit(false);
            } else {
              alert(x);
              // this.messageService.add({ severity: 'error', summary: "Something went wrong!", detail: '' });
            }
          })
        }
      })
      // }
    } else {
      this.isInvalid = true;

    }
    // }else{
    //   this.isExpiredDate = true;
    //   // alert('You Cannot Select todays Date because your license is expired today!');
    // }

  }

  VarifiedCustomerGSTNO() {
    if (this.customer.GSTNo != null && this.customer.GSTNo.length == 15) {
      this.loaderService.loading(true);
      this._service.isDocumentNotExists(this.customerId, this.customer.GSTNo).subscribe(isNotExists => {
        if (isNotExists) {
          this.customerservice.CheckVarifiedCustomerGSTNO(this.customer.GSTNo).subscribe(result => {
            console.log('the result is : ', result);
            this.loaderService.loading(false);
            if (result.Status) {
              this.isGSTReset = false;
              this.NameOnGST = result.custverify.Name;
              this.GSTData = result.custverify;
              this.GSTdisplay = true;
              alert("GST Verified Succesfully");
              // this.messageService.add({ severity: 'success', summary: "GST Verified Succesfully", detail: '' });
            } else {
              alert("Invalid  GST/TIN_No/Ref No.");
              // this.messageService.add({ severity: 'error', summary: "Invalid  GST/TIN_No/Ref No.", detail: '' });
            }
          })
        } else {
          this.loaderService.loading(false);
          alert('Document number already exists');
        }
      })
    } else {
      alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE");
      // this.messageService.add({ severity: 'error', summary: "Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE", detail: '' });
    }
  }

  makeDocEditable(docType: string) {
    this.customer = JSON.parse(JSON.stringify(this.customerToView));
    this.makeEditableDate();
    switch (docType) {
      case 'gst':
        this.customer.IsGstEditable = true;
        this.customer.IsOtherDocEditable = false;
        this.isDocumentNotSelected = false;
        // this.selectedDocument = SelectedDoc.gst;
        break;
      case 'other':
        this.customer.IsGstEditable = false;
        this.customer.IsOtherDocEditable = true;
        this.isDocumentNotSelected = false;
        // this.selectedDocument = SelectedDoc.other;
        break;
    }
  }


  cancelEdit(docType: string) {
    this.customer = JSON.parse(JSON.stringify(this.customerToView));
    this.makeEditableDate();
    switch (docType) {
      case 'gst':
        this.isInvalid = false;
        this.customer.IsGstEditable = false;
        // this.selectedDocument = SelectedDoc.gst;
        break;
      case 'other':
        this.isInvalid = false;
        this.customer.IsOtherDocEditable = false;
        // this.selectedDocument = SelectedDoc.other;
        break;
    }
  }
  önClearGST() {
    this.customer.GSTNo = null;
  }
  onClickGSTno() {
    // this.customer.GSTNo = null;
    this.isGSTReset = true;
  }
  onClickLicenceNo() {
    // this.customer.LicenceNo = null;
    this.isLicenceNoReset = true;
  }
  VerifiedCustomerOtherDocumentNO() {
    this._service.isDocumentNotExists(this.customerId, this.customer.LicenceNo).subscribe(isNotExists => {
      if (isNotExists) {
        this.isLicenceNoReset = false;
      } else {
        alert('Documnet number is already exists');
      }
    })

  }

  onSelectDocumentNew() {
    switch (this.selectedDocument) {
      case SelectedDoc.gst:
        break;
      case SelectedDoc.other:
        break;
      default:
        break;
    }

  }


  onSelectDocument(isGstDocument: boolean) {
    if (this.customer.DocumentStatus == 1) {
      return;
    }
    // debugger;
    if (isGstDocument) {
      if (this.customer.GSTNo && this.customer.GstExpiryDate && this.customer.GSTImage) {
        // this.customer.IsGstEditable = true;
        // this.customer.IsOtherDocEditable = false;
        this.selectedDocument = SelectedDoc.gst;
        this.isDocumentNotSelected = false;
      }
      else {
        this.isDocumentNotSelected = true;
        // alert('document cant be selected');
        // this.messageService.add({ severity: 'error', summary: "document cant be selected", detail: '' });
      }
    } else {
      if (this.customer.LicenceNo && this.customer.LicenseExpiryDate && this.customer.OtherDocumetImage) {
        // this.customer.IsGstEditable = false;
        // this.customer.IsOtherDocEditable = true;
        this.selectedDocument = SelectedDoc.other;
        this.isDocumentNotSelected = false;
      }
      else {
        this.isDocumentNotSelected = true;
        // alert('document cant be selected');
        // this.messageService.add({ severity: 'error', summary: "document cant be selected", detail: '' });
      }
    }
  }

  onSubmit() {

    if ((this.selectedDocument == SelectedDoc.gst && this.isGSTValid) || (this.selectedDocument == SelectedDoc.other && this.isOtherDocumentValid)) {
      let isGSTDocument = this.selectedDocument == SelectedDoc.gst ? true : false;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to verify this? If you verify then further changes in shipping address and in upload image cannot be done.',
        accept: () => {
          this.loaderService.loading(true);
          this._service.verifyTrackingCustomerDocument(this.customer.CustomerId, isGSTDocument).subscribe(x => {

            this.loaderService.loading(false);
            console.log('verify data : ', x);
            if (x == 'Document Status verified Successfully') {
              alert(x);
              // this.messageService.add({ severity: 'success', summary: x, detail: '' });
              this.ngOnInit();
              this.onVerifyDocument.emit(true);
            } else {
              alert(x);
            }
          })
        }
      });

    } else {
      if (this.customer.GSTNo == "" || this.customer.GSTNo == null) {
        this.isGSTReset = true;
      }
      if (this.customer.LicenceNo == "" || this.customer.LicenceNo == null) {
        this.isLicenceNoReset = true;
      }
      if (this.selectedDocument == SelectedDoc.gst) {
        this.customer.IsGstEditable = true;
      } else if (this.selectedDocument == SelectedDoc.other) {
        this.customer.IsOtherDocEditable = true;
      } else {
        this.isDocumentNotSelected = true;
      }
      // alert('Select Atelase One Document');
      // this.messageService.add({ severity: 'error', summary: "Select Atelase One Document", detail: ''});
    }

  }

  saveBillingAddress(billingDetailForm) {

    if (billingDetailForm.control.status == "VALID") {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Update Billing Address.',
        accept: () => {
          this.loaderService.loading(true);
          this.customerBillingAddressDc = {
            BillingAddress: this.customerDetail.BillingAddress,
            BillingAddress1: this.customerDetail.BillingAddress1,
            BillingCity: this.customerDetail.BillingCity,
            BillingState: this.customerDetail.BillingState,
            BillingZipCode: this.customerDetail.BillingZipCode,
            CustomerId: this.customerDetail.CustomerId
          }
          this._service.updateCustomerBillingAddress(this.customerBillingAddressDc).subscribe(x => {
            this.loaderService.loading(false);
            if (x == 'Billing address updated successfully') {
              alert(x);
              this.onVerifyDocument.emit(false);
            } else {
              alert(x);
            }
          })

        }
      });
    } else {
      this.isInvalid = true;
    }
  }


  isFullOrPartiallyVerified() {
    if (this.customerDetail.CustomerVerify == 'Full Verified' || this.customerDetail.CustomerVerify == 'Partial Verified') {
      return true;
    } else {
      return false;
    }
  }

  isbillCityExists() {

    // debugger;

    console.log(this.stateList, this.cityList, this.customerDetail);

    if (this.cityList.length > 0) {
      let selectedCity: any = undefined

      // selectedCity = this.cityList.filter(x =>
      //   x.CityName.toUpperCase() == this.customerDetail.BillingCity.toUpperCase()
      // )[0];

      this.cityList.forEach(element => {
        if(element.CityName && this.customerDetail.BillingCity){
          // debugger;
          if(element.CityName.toUpperCase() == this.customerDetail.BillingCity.toUpperCase()){
            debugger;
            this.customerDetail.BillingCity = element.CityName;
            selectedCity = element;
          }
        }
      });

      if (selectedCity != undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }


    // if (this.customerDetail && this.customer) {
    //   console.log(this.customerDetail, this.customer);
    //   if (this.customer.GSTNo == null || this.customer.GSTNo == undefined || this.customer.GSTNo == '') {
    //     return false;
    //   } else {
    //     if (
    //       (this.customerDetail.BillingCity == '' || this.customerDetail.BillingCity == null) &&
    //       (this.customerDetail.BillingState == '' || this.customerDetail.BillingState == null)) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // }

    // return true;




  }

  openImage(event, path) {

    window.open(path);
    event.stopPropagation();
  }

  makeEditableDate() {
    if (this.customer.LicenseExpiryDate) {

      this.customer.LicenseExpiryDate = moment(this.customer.LicenseExpiryDate).toDate();
    }
    if (this.customer.GstExpiryDate) {
      this.customer.GstExpiryDate = moment(this.customer.GstExpiryDate).toDate();
    }
  }
  // onChangeExpiryDate(){
  //   if(this.minDateValue == this.customer.LicenseExpiryDate){
  //     this.isExpiredDate = true;
  //     // alert('You Cannot Select todays Date because your license is expired today!');
  //     return 0;
  //     // this.customer.LicenseExpiryDate = null;
  //   }else{
  //     return 1;
  //   }
  // }
  cityList: any = [];
  onStateChange() {
    //debugger
    // this.customerDetail.BillingCity = null;
    let state = this.customerDetail.BillingState;
    if (this.stateList && this.stateList.length > 0) {
      var id = this.stateList.filter(x => x.StateName == state);
      if (id && id.length > 0) {
        this.loaderService.loading(true);
        this.stateService.StateGetByIDs(id[0].Stateid).subscribe(result => {
          this.cityList = result;
          this.loaderService.loading(false);
          console.log('cityList', this.cityList)
          if (this.customerDetail.BillingCity == null) {
            // this.customerDetail.BillingCity = '';
          }
        })
      } else {
        // this.customerDetail.BillingCity = '';
      }
    }

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }




  updateStateList: any = [];
  updatedselectedState: any;
  changeBillingCity() {

    this.updatedselectedState = undefined;
    this.updatedselectedCity = undefined;

    this.changeBillingCityDialog = true;

    this._service.Getstates().subscribe(
      res => {
        this.updateStateList = res;
        this.updateStateList.unshift({ StateName: "Select State", Stateid: undefined });
        this.updatedselectedState = this.updateStateList[0];
        console.log("this.updateStateList", this.updateStateList);
        this.getCities()
      }
    );
  }


  updateCityList: any = [];
  updatedselectedCity: any;
  getCities() {
    // this.changeBillingCityDialog = true;
    this.updateCityList = []
    if (this.updatedselectedState.Stateid == undefined) {
    } else {
      this._service.Getcity(this.updatedselectedState.Stateid).subscribe(
        res => {
          this.updateCityList = res;
          this.updateCityList.unshift({ CityName: "Select City", Cityid: undefined });
          this.updatedselectedCity = this.updateCityList[0];
          console.log("this.updateCityList", this.updateCityList);
        }
      );
    }

  }

  updateCity() {
    if (this.updatedselectedState.StateName == "Select State" || this.updatedselectedCity.CityName == "Select City") {
      alert("please select state then city and press on update")
    } else {
      this._service.updateCustomerBillingCity(this.customer.CustomerId, this.updatedselectedState.StateName, this.updatedselectedCity.CityName).subscribe(
        res => {
          // this.updateStateList = res;
          // console.log("this.updateStateList", this.updateStateList);
          alert(res)
          window.location.reload();
        }
      );
    }
  }


  contactnumbervaildate() {

    var data = this.customerDetail.Mobile;
    var type = 'Customer';
    var fieldname = 'mobilenumber';
    if (data.length == 10) {
      this.blocked = true;
      this.customerservice.CheckValidationforSupplierCustomer(data, fieldname, type).subscribe(result => {
        this.statusforcheck = result.Status;
        if (result.Status == false) {
          this.blocked = false;
          this.isshow = true;
          this.text = result.Message;
        }
        else {
          this.blocked = false;
          this.isshow = true;
          this.text = result.Message;
        }
      })
    }
    else {

    }
  }

  gstnumbervaildate() {

    var data = this.customerDetail.GSTno;
    var type = 'Customer';
    var fieldname = 'gstnumber';
    if (data.length == 15) {
      this.blocked = true;
      this.customerservice.CheckValidationforSupplierCustomer(data, fieldname, type).subscribe(result => {
        this.statusforcheck = result.Status;
        if (result.Status == false) {
          this.blocked = false;
          this.isshow = true;
          this.text = result.Message;
        }
        else {
          this.blocked = false;
          this.isshow = true;
          this.text = result.Message;
        }
      })
    }
    else {

    }
  }

  ok() {
    this.isshow = false;
    this.text = "";
  }



}

enum SelectedDoc {
  none = 0,
  gst = 1,
  other = 2
}