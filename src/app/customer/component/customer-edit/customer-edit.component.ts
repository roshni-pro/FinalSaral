import { PeopleService } from 'app/shared/services/people.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'app/shared/services/customer.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { AgentService } from 'app/shared/services/agent.service';
import { MessageService } from 'primeng/api';
import { AnyMxRecord } from 'dns';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { element } from 'protractor';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { DelightService } from 'app/customerdelight/delight.service';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  @Input() details: any;
  @Input() isFirstChange: any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  unedited = false;
  public imagePath;
  UserRole: any;
  people: any;
  file: any;
  trade: any;
  imgURL: any;
  ImageUrl: any;
  isInvalid: any;
  customer: any;
  cityList: any;
  warehouseList: any;
  clusterList: any;
  areaList: any;
  agentList: any;
  CustomerId: any;
  Customerid: any;
  executiveList: any
  baseURL: any;
  fullVarifiedSubType: any
  NotVarifiedSubType: any
  isKppWarehouseList: any;
  mobileNoList: any[];
  invalidgst: boolean;
  BrandList: any[];
  selectedList: any;
  selectedListCopy: any[];
  EditCategory: boolean;
  CustomerType: any;
  GSTData: any;
  GSTdisplay: boolean;
  blocked: boolean;
  IsGstDisturb: boolean;
  IsBillingAddEditable: boolean;
  VATMData: string;
  docList: any;
  skp_kpplist: any;
  verificationList: any;
  selectedVerVal: any;
  expiryDate: any;
  GstExpiryDate: any;
  LicenseExpiryDate: any;
  minDateValue: any;
  validDetails: boolean = false;
  finalRegistrationImage: any;
  finalShopImage: any;
  finalGSTImage: any;
  finalTCSExemptionDeclarationDOC:any;
  bankList: any;
  // OtherBankName:any;
  constructor(private peopleService: PeopleService,
    private _service: DelightService,
    private customerservice: CustomerService,
    private messageService: MessageService,
    private pilotService: PepolePilotService,
    public agentService: AgentService,
    public router: Router,
    private brandService: SubSubCategoryService,) {
    this.customer = {};
    this.baseURL = environment.apiURL;
    this.selectedListCopy = [];
    this.getBankList()
    this.verificationList = [
      { name: 'Verified', code: '1' },
      { name: 'Not-Verified', code: '0' }
    ];
  }

  ngOnInit() {
    this.UserRole = localStorage.getItem('role');

    this.unedited = true;
    this.isInvalid = false;
    this.customer = {};
    this.selectedList = [];
    console.log(this.details);
    debugger;
    this.customer = this.details;
    this.customer.StoreType = this.details.TypeOfBuissness;
    //debugger;



    if (this.customer.UploadRegistration != null || this.customer.UploadRegistration != undefined || this.customer.UploadRegistration) {
      if (this.customer.UploadRegistration.includes("https" || "http")) {
        this.finalRegistrationImage = this.customer.UploadRegistration;
        // alert(this.customer.UploadRegistration)
      }
    }

    if (this.customer.Shopimage != null || this.customer.Shopimage != undefined || this.customer.Shopimage) {
      if (this.customer.Shopimage.includes("https" || "http")) {
        this.finalShopImage = this.customer.Shopimage;
        // alert(this.customer.Shopimage)
      }
    }

    if (this.customer.UploadGSTPicture != null || this.customer.UploadGSTPicture != undefined || this.customer.UploadGSTPicture) {
      if (this.customer.UploadGSTPicture.includes("https" || "http")) {
        this.finalGSTImage = this.customer.UploadGSTPicture;
        // alert(this.customer.UploadGSTPicture)
      }
    }

    if (this.customer.TCSExemptionDeclarationDOC != null || this.customer.TCSExemptionDeclarationDOC != undefined || this.customer.TCSExemptionDeclarationDOC) {
      if (this.customer.TCSExemptionDeclarationDOC.includes("https" || "http")) {
        this.finalTCSExemptionDeclarationDOC = this.customer.TCSExemptionDeclarationDOC;
        // alert(this.customer.UploadGSTPicture)
      }
    }

    console.log("this.customer", this.customer);

    if (this.customer.SKPOwnerId == 0) {
      this.customer.SKPOwnerId = '';
    }
    //debugger
    if (this.customer.BillingState == null) {
      this.customer.BillingState = '';
    }

    if (this.customer.BillingCity == null) {
      this.customer.BillingCity = '';
    }

    if (!this.customer) {

      var valuess = null;
      this.brandService.GetAllBrands(valuess).subscribe(result => {

        this.BrandList = result;
      })
    }
    if (this.customer) {

      this.IsBillingAddEdit(this.customer);

      this.brandService.GetAllBrands(this.customer.CustomerId).subscribe(result => {

        this.BrandList = result;
        this.selectedList = result.filter(x => x.Selected == true);
        var a = [];
        this.selectedList.forEach(element => {
          console.log(element.SubsubCategoryid);
          a.push(element.SubsubCategoryid);
        });
        this.customer.BrandIds = a;
        this.EditCategory = true;
      })
      if (this.customer != null) {
        this.customerservice.GetVATM(this.customer.CustomerId).subscribe(res => {
          this.customer.VATM = res;
        })
      }
      this.customer = this.customer;
    }

    console.log('details of customer are :', this.details);
    if (this.details) {
      this.customer = this.details;
      if (this.customer.DOB) {
        this.customer.DOB = new Date(this.customer.DOB);
      }
      if (this.customer.AnniversaryDate) {
        this.customer.AnniversaryDate = new Date(this.customer.AnniversaryDate);
      }
      if (this.customer.IsChequeAccepted == false) {
        this.customer.ChequeLimit = 0;
      }



      // console.log(this.customer.DOB);
      // this.customer.DOB = moment(this.customer.DOB);
      // this.customer.DOB = this.customer.DOB ? moment(this.customer.DOB).format('DD/MM/YYYY'):null
      // this.customerservice.CustomerGetByID(this.details).subscribe(result => {
      //   this.customer = result;
      //   this.customer.DOB = this.customer.DOB ? new Date(this.customer.DOB) : null;
      //   // this.customer.DataOfJoin = this.customer.DataOfJoin ? new Date(this.customer.DataOfJoin) : null;
      //   // this.customer.EndDate = this.customer.EndDate ? new Date(this.customer.EndDate) : null;
      //   this.customer.AnniversaryDate = this.customer.AnniversaryDate ? new Date(this.customer.AnniversaryDate) : null;
      //   console.log('GetByID: ', this.customer);

      if (this.details.VerifiedBy != null) {
        this.peopleService.GetAll().subscribe(result => {

          this.details.VerifiedByName = result.filter(res => res.PeopleID == this.details.VerifiedBy)[0].DisplayName;
          // this.details.VerifiedByName ? this.activeFields.push({ field: 'VerifiedByName', label: 'Verified By' }) : '';
        });
      }
      else {
        // this.activeFields.splice(11, 1);
      }
      this.customerservice.getWareHouseByCity(this.customer.Cityid).subscribe(result => {
        this.warehouseList = result;
      })
      this.customerservice.getClusterByCity(this.customer.warehouseId).subscribe(result => {
        this.clusterList = result;
      })
      this.customerservice.getAreaByCity(this.customer.Cityid).subscribe(result => {
        this.areaList = result;

        console.log(' this.areaList: ', this.areaList);
      })
      if (this.customer.ClusterId) {
        this.getAgent(this.customer.ClusterId)
      }
      if (this.customer.Warehouseid) {
        this.getCluster(this.customer.Warehouseid)
      }
      // })
    }
    this.pilotService.City().subscribe(result => {
      this.cityList = result;
    })
    var peopleId = localStorage.getItem('userid');
    this.customerservice.GetCustomerDocType(this.customer.Warehouseid, peopleId).subscribe(x => {
      this.docList = x;
      if (this.customer.Type == null) {
        this.customer.TypeId = null;
      } else {
        var docType = this.docList.filter(x => x.DocType == this.customer.Type);
        this.customer.TypeId = docType[0].Id;
      }
    })
    this.pilotService.WarehouseWithKPP().subscribe(result => {
      this.isKppWarehouseList = result.filter(x => x.IsKPP == true);
    })
    if (this.customer.Warehouseid > 0) {
      if (this.customer.CustomerType == "SKP Retailer") {
        this.customerservice.GetSKP_KPP_OwnerList(this.customer.Warehouseid, this.customer.CustomerId).subscribe(result => {
          if (result.status) {
            this.skp_kpplist = result.GetSKP_KPP_OwnerList;
            this.customer.SKPOwnerId = this.skp_kpplist.filter(x => x.CustomerId == this.customer.SKPOwnerId)[0];
          }
        });
      }
    }
    this.fullVarifiedSubType = [

      { atype: 'Printed' },
      { atype: 'Print Pending' },

    ];
    this.NotVarifiedSubType = [
      { stype: 'Testing' },
      { stype: 'No Document' },
      { stype: 'Inform to Upload Document' },
      { stype: 'Wrong Document' },
      { stype: 'Invalid Mobile Number' },
      { stype: 'Mis-Match of Document' },
      { stype: 'Incorrect GST Number' },
      { stype: 'Incorrect License Number' },
      { stype: 'Image Not Clear' },
      { stype: 'Double SK Code' },
      { stype: 'Not a Retailer' },
      { stype: 'Shop Closed' },
      { stype: 'Not Interested' },
      { stype: 'Inactive' },

    ];
    // for gst pattern test
    //this.customer.RefNo = '23AAVCS1981Q1ZE';
    this.GstExpiryDate = this.details.GstExpiryDate ? new Date(this.details.GstExpiryDate) : '';
    this.LicenseExpiryDate = this.details.LicenseExpiryDate ? new Date(this.details.LicenseExpiryDate) : '';
    this.minDateValue = new Date();
    this.showStateList()
    debugger;
    this.CustomerChannelTypeList();

  }

  getBankList() {
    this.blocked = true;
    this.customerservice.getBankList().subscribe(res => {
      console.log(res);
      this.bankList = res.BankNameDc;
      if (this.customer && this.customer.BankName) {
        let check = 0;
        // check=this.bankList.find(x=>{x.BankName==this.customer.BankName})
        // if(this.bankList){
        // //debugger
        res.BankNameDc.forEach(element => {
          if (element.BankName == this.customer.BankName) {
            check++;
          }
          else {

          }
        });
        if (check == 0) {
          this.customer.OtherBankName = this.customer.BankName;
          this.customer.BankName = 'OTHERS';
        }

        //  }


      }
      this.blocked = false;
    })
  }
  onKeydown(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
  IsBillingAddEdit(cust) {

    if (cust.RefNo && cust.RefNo.length == 15) {
      this.IsBillingAddEditable = true;
    }
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  getWarehouse(cityid) {
    this.customerservice.getWareHouseByCity(cityid).subscribe(result => {
      this.warehouseList = result;
    })
    // this.customerservice.getClusterByCity(this.customer.Cityid).subscribe(result=>{
    //   this.clusterList = result;
    // })
    this.customerservice.getAreaByCity(this.customer.Cityid).subscribe(result => {
      this.areaList = result;
    })
  }
  getCluster(wID) {
    this.customerservice.getClusterByCity(wID).subscribe(result => {
      this.clusterList = result;
    })
    this.customerservice.getExecutive(wID).subscribe(result => {
      this.executiveList = result;
    })
  }
  getAgent(cID) {
    this.customerservice.getAgentByCluster(cID).subscribe(result => {
      this.agentList = result;
      console.log("agentlist is:", this.agentList);
    })
  }
  selectedBands() {

    var a = [];
    var b = [];
    var c = []
    console.log("this.selectedCategory", this.selectedList)
    this.selectedList.forEach(element => {
      console.log(element.SubsubCategoryid);
      a.push(element.SubsubCategoryid);
    });
    this.customer.BrandIds = a;
  }


  checkDetails() {
    //  //debugger
    if (this.customer.AccountNumber) {
      // var patt =/^[0-9]{2}(?:[0-9]{9}|-[0-9]{3}-[0-9]{6})$/;
      var min = 5;
      var max = 17;
      if (this.customer.AccountNumber.length <= max && this.customer.AccountNumber.length >= min) {
      }


      else {
        alert('Enter valid Account number!')
        return false;
      }
    }

    if (this.customer.BankName == 'OTHERS' && (this.customer.OtherBankName == '' || this.customer.OtherBankName == undefined || this.customer.OtherBankName == null)) {
      alert('Enter Other bank name!')
      return false;
    }



    if (this.customer.IfscCode) {
      var patt = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
      if (patt.test(this.customer.IfscCode)) {
        return true;
      }
      else
        alert('Enter valid Ifsc code!')
      return false;
    }
  }
AP:Boolean=false
  AutoPanFill(RefNo){
    let pan = RefNo.slice(2,12)
    this.customer.PanNo=pan;
    this.AP=true;
  }
  TcsPopupShow:boolean=false;
  TCSExemption(e,IsTCSExemption){
    
    if(IsTCSExemption)
      {this.customer.IsTCSExemption=true;this.TcsPopupShow=true; }
      else{this.customer.IsTCSExemption=false;this.TcsPopupShow=false;this.customer.TCSExemptionDeclarationDOC=undefined;}
  }
  hide(){
    if(this.customer.TCSExemptionDeclarationDOC==null || this.customer.TCSExemptionDeclarationDOC==undefined){
      this.customer.IsTCSExemption=false;
      this.TcsPopupShow=false;
    }
    // this.customer.IsTCSExemption=false;
  }
  myFiles: string[] = [];

  onUpload(file) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      //debugger;
      this.imgURL = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")
    };
    // this.TcsPopupShow=false;
  }

  UploadTCSExemptionDocument() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
     
      this.customerservice.UploadTCSExemptionDocument(this.details.CustomerId, formData).subscribe(result => {
        console.log(result)
        debugger
        if ( result!="") {
          this.customer.TCSExemptionDeclarationDOC = result;
          this.TcsPopupShow=false;
          this.customer.IsTCSExemption=true;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }
      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
      });
    }
  }
  IsShowTCSDoc:boolean=false
  ShowTCSDoc(){
    this.IsShowTCSDoc=true;
    if (this.customer.TCSExemptionDeclarationDOC != null || this.customer.TCSExemptionDeclarationDOC != undefined || this.customer.TCSExemptionDeclarationDOC) {
        this.finalTCSExemptionDeclarationDOC = this.customer.TCSExemptionDeclarationDOC;      
    }
  }
  ohide(){
    if(this.customer.TCSExemptionDeclarationDOC==null || this.customer.TCSExemptionDeclarationDOC==undefined){
      this.customer.IsTCSExemption=false;
      this.IsShowTCSDoc=false;
    }
  }
  onclick(testForm) {

    console.log("this.customer", this.customer);

    if (this.customer.SKPOwnerId.CustomerId) {
      this.customer.SKPOwnerId = this.customer.SKPOwnerId.CustomerId;
    }
    if (this.IsGstDisturb) {
      alert("Please verify GSTN first or refresh the page if you don't want to save current changes");
      return false;
    }

    // for gst pattern check
    if (!this.customer.RefNo && this.customer.RefNo && this.customer.RefNo.length) {
      if (this.invalidgst == true) {
        this.isInvalid = true;
        testForm.form.status = "INVALID";
      }
      // else {
      //   // this.isInvalid = false;
      //   testForm.form.status = "VALID";

      // }
    }

    // regular code

    if (testForm.form.status == "VALID") {
    
      if (this.customer.BillingAddress && this.customer.ShippingAddress) {
        if (this.customer.TypeId > 0) {
          var docType = this.docList.filter(x => x.Id == this.customer.TypeId);
          this.customer.Type = docType[0].DocType;
        }

        if (this.customer.TypeId == 1) {
          if (this.GstExpiryDate) {
            this.customer.GstExpiryDate = moment(this.GstExpiryDate).format('MM/DD/YYYY')
          } else {
            this.customer.GstExpiryDate = moment(this.expiryDate).format('MM/DD/YYYY')
          }
        } else {
          if (this.LicenseExpiryDate) {
            this.customer.LicenseExpiryDate = moment(this.LicenseExpiryDate).format('MM/DD/YYYY')
          } else {
            this.customer.LicenseExpiryDate = moment(this.expiryDate).format('MM/DD/YYYY')
          }
        }

        if (!this.customer.PanNo && (this.customer.CustomerType == 'RDS' || this.customer.CustomerType == 'SKP Owner' || this.customer.CustomerType == 'KPP')) {
          this.messageService.add({ severity: 'error', summary: 'Please Fill Pan Number!', detail: '' });
          return false;
        }

        if ((this.customer.IsKPP || this.customer.CustomerType == 'RDS' || this.customer.CustomerType == 'SKP Owner') && (!this.customer.AccountNumber || !this.customer.IfscCode || !this.customer.AC_HolderName || !this.customer.BankName)) {
          this.messageService.add({ severity: 'error', summary: 'Please Fill AccountDetails!', detail: '' });
          return false;
        }

        // debugger
        if ((this.customer.IsKPP || this.customer.CustomerType == 'RDS') && (this.customer.AccountNumber && this.customer.IfscCode && this.customer.AC_HolderName && this.customer.BankName && this.customer.BankName != 'OTHERS')
          || (this.customer.BankName == 'OTHERS' && (this.customer.OtherBankName || !this.customer.OtherBankName))) {
          this.validDetails = this.checkDetails();
          if (this.validDetails == true) { }
          else { return false; }
        }

        //debugger;
        if (this.details == null) {
          if (this.customer.BankName == 'OTHERS') { this.customer.BankName = this.customer.OtherBankName; }
          this.customerservice.addCustomer(this.customer).subscribe(result => {
            this.router.navigateByUrl('layout/customer/customer')
            this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
          },
            (err) => {
              this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

            });
        } else {
          this.blocked = true;
          if (this.customer.BankName == 'OTHERS') { this.customer.BankName = this.customer.OtherBankName; }
          this.customerservice.getCustomerMobileNo(this.customer.CustomerId, this.customer.Mobile).subscribe(result => {
            result;

            if (this.customer.Cityid) {
              this.customer.City = this.cityList.filter(city => city.Cityid == this.customer.Cityid)[0].CityName;
            }
            // var records = this.mobileNoList.filter(element => { return element.Mobile == this.customer.Mobile });
            if (result) {

              alert('Mobile No. is already Exist');
              this.blocked = false;

              return
            }
            if (this.customer.Warehouseid != 0) {

              for (var j in this.warehouseList) {
                if (this.customer.Warehouseid == this.warehouseList[j].WarehouseId) {
                  this.customer.WarehouseName = this.warehouseList[j].WarehouseName;
                }
              }
            } else {
              this.customer.WarehouseName = "";
            }
            if (this.customer.ClusterId != 0) {
              for (var k in this.clusterList) {
                if (this.customer.ClusterId == this.clusterList[k].ClusterId) {
                  this.customer.ClusterName = this.clusterList[k].ClusterName;
                }
              }
            } else {
              this.customer.ClusterId = "";
            }
            if (this.customer.ExecutiveId != 0) {

              for (var j in this.executiveList) {
                if (this.customer.ExecutiveId == this.executiveList[j].PeopleID) {
                  this.customer.ExecutiveName = this.executiveList[j].DisplayName;
                }
              }
            } else {
              this.customer.ExecutiveName = "";
            }
            this.blocked = true;

            // this.customer.WarehouseName = this.warehouseList.filter(w => w.WarehouseId == this.customer.Warehouseid)[0].WarehouseName;
            // this.customer.ClusterName = this.clusterList.filter(cl => cl.ClusterId == this.customer.ClusterId)[0].ClusterName;
            // this.customer.ExecutiveName = this.executiveList.filter(ex => ex.PeopleID == this.customer.ExecutiveId)[0] ? this.executiveList.filter(ex => ex.PeopleID == this.customer.ExecutiveId)[0].DisplayName : '';
            if (this.selectedStateName != '') {
              this.customer.BillingState = this.selectedStateName;
            } else {
              this.customer.BillingState;
            }

            if (this.selectedCityName != '') {
              this.customer.BillingCity = this.selectedCityName;
            } else {
              this.customer.BillingCity;
            }

            console.log(this.customer);
            this.customerservice.UpdateCustomer(this.customer).subscribe(result => {
              // console.log(this.details);
              if(result != null && result.IsPanOrGSTExists)
              {
                this.blocked = false;
                this.messageService.add({ severity: 'error', summary: "Pan Number Already Exists in "+ result.PanOrGSTExistsSkCode, detail: '' });
              }
              else
              {
                this.refreshParent.emit();
                this.messageService.add({ severity: 'success', summary: 'Update Successfully!', detail: '' });
                this.blocked = false;
              }
            },
              (err) => {
                this.blocked = false;

                this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

              });
          })
        }


      } else {
        this.messageService.add({ severity: 'error', summary: 'Please Fill Address Fields!', detail: '' });
      }
    } else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }


  }

  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      //debugger;
      this.imgURL = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")
    };
  }

  gstUpload() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.customerservice.gstUpload(this.details.CustomerId, formData).subscribe(result => {
        //debugger;
        console.log(result)
        if (result != "Upload Unsuccessfull") {
          this.customer.UploadGSTPicture = result;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }
  }
  shopUpload() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.customerservice.shopUpload(this.details.CustomerId, formData).subscribe(result => {
        console.log(result)
        if (result != "Upload Unsuccessfull") {
          this.customer.Shopimage = result;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }

  }

  regupload() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.customerservice.regupload(this.details.CustomerId, formData).subscribe(result => {
        console.log(result)
        if (result != "Upload Unsuccessfull") {
          this.customer.UploadRegistration = result;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }

  }


  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/customer/customer')
  }

  onAreaChange() {
    if (this.customer.Areaid) {
      this.customer.AreaName = this.areaList.filter(x => {
        return x.areaId == this.customer.Areaid;
      })[0].AreaName;
    }
  }
  isKppChange(iskpp) {
    if (!iskpp) {
      this.customer.KPPWarehouseId = null;
    }
  }
  isChequeAccepted(IsChequeAccepted) {
    if (!IsChequeAccepted) {
      return this.customer.ChequeLimit;
    }
  }

  change(change) {
    this.isFirstChange = false;
    if (change == "Temporary Active") {
      this.customer.Active = false;
    }
    else if (change == 'Pending For Activation' || change == 'Pending For Submitted') {
      // this.customer.Active = true;
      alert("You can not Update any field for given Status.");
    }
  }

  gstPatternValidator(text) {
    this.IsGstDisturb = true;
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (text.length == 15) {
      if
        (isNaN(text[0]) || isNaN(text[1]) || //1st 2 chars to be numbers only
        !isNaN(text[2]) || !isNaN(text[3]) || !isNaN(text[4]) || !isNaN(text[5]) || !isNaN(text[6]) || // next 5 to be alphabets only
        isNaN(text[7]) || isNaN(text[8]) || isNaN(text[9]) || isNaN(text[10]) ||   // next 4 chars to be numbers only
        !isNaN(text[11]) || // 12th character should be the alphabet
        format.test(text[12]) || format.test(text[14]) || format.test(text[13]) // 13th, 14th & 15th character NOT TO BE special character
      )  // expression complete
      {
        this.invalidgst = true;
        return ""
      }
      else {
        this.invalidgst = false;
        this.IsGstDisturb = true;
        return ""
      }
    }
    else {
      this.invalidgst = true;
      if (!text) {
        this.IsGstDisturb = false;
        this.customer.NameOnGST = "";
        this.customer.BillingCity = "";
        this.customer.BillingState = "";
        this.customer.BillingZipCode = "";
        this.customer.BillingAddress = "";
        this.IsBillingAddEditable = false;

      }
      return ""
    }

  }
  VarifiedCustomerGSTNO(text) {
    if (text.length == 15) {
      this.blocked = true;
      this.customerservice.CheckVarifiedCustomerGSTNO(text).subscribe(result => {
        if (result.Status) {
          this.blocked = false;
          this.AutoPanFill(text);
          this.customer.NameOnGST = result.custverify.Name;
          this.customer.BillingCity = result.custverify.City;
          this.customer.BillingState = result.custverify.State;
          this.customer.BillingZipCode = result.custverify.Zipcode;
          this.customer.BillingAddress = result.custverify.ShippingAddress;
          this.GSTData = result.custverify;
          this.GSTdisplay = true;
          this.IsGstDisturb = false;
          this.IsBillingAddEditable = true;
        } else { this.blocked = false; alert("Invalid  GST/TIN_No/Ref No."); }
      })
    } else { alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE"); }
  }


  IsFranchiseAccept = function ($event, accept) {
    if ($event !== undefined) {
      var checkbox = $event.target;
      if (checkbox.checked) {
        var ok = window.confirm('Are you sure to Accept this?');
        if (ok) {
          this.customer.IsFranchise = true;
        }
        else {
          this.customer.IsFranchise = false;
          checkbox.checked = false;
        }
      }
    }
  };

  changeCustomerType(changeCustomerType) {
    this.skp_kpplist = [];
    this.customer.SKPOwnerId = '';
    if (this.customer.Warehouseid > 0) {
      // if (changeCustomerType == "SKP Retailer") { 
      if (changeCustomerType != "SKP Owner") {
        this.customerservice.GetSKP_KPP_OwnerList(this.customer.Warehouseid, this.customer.CustomerId).subscribe(result => {
          if (result.status) {
            this.skp_kpplist = result.GetSKP_KPP_OwnerList;
          } else {
            this.customer.CustomerType = 'SKP Owner';
            this.messageService.add({ severity: 'error', summary: result.msg, detail: '' });
            return false;
          }
        });
      }
    } else {
      alert("Pls select warehouse!!");
    }
  }

  stateListDropdown: any;
  showStateList() {
    //this.customer.BillingCity='';
    this.customerservice.getStateList().subscribe(res => {
      console.log(res);
      //debugger;
      this.stateListDropdown = res;
      if (this.customer != null && this.customer.BillingCity == null) {
        //this.getSelectedState(this.customer.BillingState);
        this.customer.BillingCity = '';
      } else {
        this.getSelectedState(this.customer.BillingState);
      }
    })
  }

  cityListDropdown: any;
  selectedStateName: any;
  selectedStateID: any;
  getSelectedState(event) {
    this.selectedCityName = '';
    this.selectedStateName = event.target ? event.target.value : this.customer.BillingState;
    var filterState = this.stateListDropdown.filter(x => x.StateName == this.selectedStateName);
    this.selectedStateID = filterState[0].Stateid;
    this.customerservice.getCityListByStateId(this.selectedStateID).subscribe(res => {
      this.cityListDropdown = res;
      var ctyLst = this.cityListDropdown.filter(x => x.CityName == this.customer.BillingCity);
      this.customer.BillingCity = ctyLst.length > 0 ? ctyLst[0].CityName : '';
      // if(this.customer != null && this.customer.BillingCity == null){
      //   this.customer.BillingCity = '';
      // }
    })
  }

  selectedCityName: any;
  selCityId: Number;
  filterCityList: any;
  getSelectedCity(event) {
    this.selectedCityName = event.target.value
    this.filterCityList = this.cityListDropdown.filter(x => x.CityName == this.selectedCityName);
    this.selCityId = this.filterCityList[0].Cityid
  }

  verifiedUploader(data) {
    var customerId = this.details.CustomerId;
    if (data != undefined) {
      var status = data.code;
    }
    this.customerservice.updateVerificationVal(customerId, status).subscribe(res => {
      console.log(res);
      if (res) {
        alert(res);
      }
    })
  }

  //edit billing address
  changeBillingAddressPopup: boolean = false;


  editBillingAdress() {
    this.changeBillingAddressPopup = true;

  }

  editedBillingState: any;
  updateCityList: any = [];
  updatedselectedCity: any;
  getCities() {
    // this.changeBillingCityDialog = true;
    //debugger;
    this.updateCityList = []
    if (this.editedBillingState.Stateid == undefined) {
    } else {
      this._service.Getcity(this.editedBillingState.Stateid).subscribe(
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
    if (this.editedBillingState.StateName == "Select State" || this.updatedselectedCity.CityName == "Select City") {
      alert("please select state then city and press on update")
    } else {
      console.log(this.customer.CustomerId);
      this._service.updateCustomerBillingCity(this.customer.CustomerId, this.editedBillingState.StateName, this.updatedselectedCity.CityName).subscribe(
        res => {
          // this.updateStateList = res;
          // console.log("this.updateStateList", this.updateStateList);
          alert(res);
          window.location.reload();
        }
      );
    }
  }
  ChannelTypeList: any
  CustomerChannelTypeList() {
    debugger;
    this.customerservice.CustomerChannelTypeList().subscribe(res => {
      console.log(res);
      this.ChannelTypeList = res;
    })
  }
  PanDisplay: boolean = false;
  PanData: any;
  invalidPan:boolean=false;
  VarifiedCustomerPanNO(text) {
this.invalidPan=false;
    if (text.length == 10) {
      this.blocked = true;
      this.customerservice.PanVerify(text).subscribe((result: any) => {
        this.blocked = false;
        console.log(result);

        if (result.IsSuccess) {
          this.blocked = false;
          this.PanDisplay = true;


          this.PanData = result;
        } else {
          this.blocked = false;
          this.invalidPan=true
          alert("Invalid  Pan No");
        }
      });
    } else {
      this.invalidPan=true

      alert("Pls enter valid Pan No. For eg. - DEWPB0722O");

    }
  }
}

