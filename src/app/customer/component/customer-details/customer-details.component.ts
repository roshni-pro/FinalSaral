import { PeopleService } from "app/shared/services/people.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AgentService } from "app/shared/services/agent.service";
import * as moment from "moment";
import * as FileSaver from "file-saver";
import { CustomerService } from "app/shared/services/customer.service";
import { MessageService } from "primeng/api";
import { environment } from "environments/environment";

@Component({
  selector: "app-customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.scss"],
})
export class CustomerDetailsComponent implements OnInit {
  displayTabs: any[];
  closeResult: string;
  customerOrders: any[];
  customerMobile: any;
  custDoclink: any;
  baseURL: any;
  IsVerified: boolean;
  verify: any;
  SignedPdf: string;
  isdistribution: boolean;
  distributiondt: any;
  isPrimeShow: boolean;
  isPrimeButton: boolean;
  PrimeCustomer: any;
  Otp: any;
  isDropdowActive: boolean;
  isPrimeRenew: boolean;
  isdetails: boolean;
  blocked: boolean;
  @Input() details: any;
  @Input() Mobile: any;

  @Input() activeFields: any[];
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() refreshParent = new EventEmitter();
  @Output() activeStatus = new EventEmitter<any>();
  @Output() deleteSelected = new EventEmitter<any>();
  entity: any;
  entityCOD: any;
  customerRegList: any[];
  cols: any;

  distributionFields: any[];
  constructor(
    private peopleService: PeopleService,
    private modalService: NgbModal,
    public agentService: AgentService,
    private customerservice: CustomerService,
    private messageService: MessageService
  ) {
    this.entity = "Customer";
    this.entityCOD = "CODLimitCustomer";
    this.baseURL = environment.apiURL;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.IsVerified = false;
    this.isdistribution = false;
    //this.details.CreatedDate = moment(this.details.CreatedDate).format('DD/MM/YYYY')
    //  this.agentService.GetAllAgent().subscribe(result=>{
    //    var agent = result.filter(x=> x.AgentCode == this.details.AgentCode);
    //    this.details.Agent =  agent[0].DisplayName;
    //    console.log("test"+this.details.Agent)
    //  })
    this.distributionFields = [
      { field: "FirmName", label: "Firm Name" },
      { field: "TypeOfBusiness", label: "Type Of Business" },
      { field: "Manpower", label: "Man Power" },
      { field: "AdvanceAmount", label: "Gullak" },
      { field: "FranchiseeKKP", label: "FranchiseeKPP" },
      { field: "SourceofFund", label: "Source of Fund" },
      { field: "FoodLicenseNo", label: "FoodLicense No." },
      { field: "GSTNo", label: "GST No" },
      { field: "PANNo", label: "PAN No" },
      { field: "AadharNo", label: "Aadhar No" },
      { field: "WarehouseFacility", label: "Warehouse Facility" },
      { field: "WarehouseSize", label: "Warehouse Size" },
      { field: "DeliveryVehicle", label: "Delivery Vehicle" },
      { field: "DeliveryVehicleNo", label: "Delivery Vehicle No" },
      { field: "IsVerified", label: "Distributor Verified" },
      { field: "Status", label: "Status" },
      { field: "Type", label: "Type" },
      { field: "OtherNo", label: "Other No" },
      { field: "UploadLicensePicture", label: "Upload License Picture" },
      //{ field: 'IsVerified', label: 'Is Verified' },
    ];

    this.cols = [
      { field: "MemberShipName", header: "Fayda" },
      { field: "FeeAmount", header: "Fee Amount" },
      { field: "status", header: "Status" },
      { field: "CreatedDate", header: "Created Date" },
    ];
    // if (this.details.VerifiedBy) {
    //   this.peopleService.GetAll().subscribe(result => {
    //
    //     this.details.VerifiedByName = result.filter(res => res.PeopleID == this.details.VerifiedBy)[0].DisplayName;
    //     this.details.VerifiedByName ? this.activeFields.push({ field: 'VerifiedByName', label: 'Verified By' }) : '';
    //   });
    // }
  }
  distributionDetails() {
    this.blocked = true;
    this.customerservice
      .getdistributionDetails(this.details.CustomerId)
      .subscribe((result) => {
        this.blocked = false;
        if (result != null) {
          this.isdistribution = false;
          this.distributiondt = result;
          this.SignedPdf = this.baseURL + this.distributiondt.SignedPdf;
        } else {
          this.isdistribution = true;
          this.displayTabs[7].bool = false;
          return this.isdistribution;
        }
      });
  }

  CustomerPrimeMemberShipDetails() {
    this.blocked = true;
    this.customerservice
      .GetCustomerPrimeMemberShip(this.details.CustomerId)
      .subscribe((result) => {
        this.blocked = false;
        if (result != null) {
          this.isPrimeShow = false;
          this.PrimeCustomer = result;
          this.isPrimeButton = true;
          this.isPrimeRenew = false;
        } else {
          this.isPrimeShow = true;
          this.displayTabs[8].bool = false;
        }
      });
  }

  AddMemberShip(PrimeCustomer) {
    this.isPrimeButton = false;
    PrimeCustomer.MemberShipId = PrimeCustomer.list.Id;
    this.blocked = true;
    this.customerservice
      .MakeCustomerPrimeMember(PrimeCustomer)
      .subscribe((result) => {
        this.blocked = false;
        if (result) {
          alert("Customer Prime Membership actived successfully.");
          this.CustomerPrimeMemberShipDetails();
        } else {
          alert(
            "Some error occurred during make customer Prime Member. Please try after some time."
          );
          this.isPrimeButton = true;
        }
      });
  }

  RevokMemberShip(customerid) {
    this.isPrimeButton = false;
    this.customerservice.RevokMemberShip(customerid).subscribe((result) => {
      if (result) {
        alert("Customer Prime Membership Revok successfully.");
        this.CustomerPrimeMemberShipDetails();
      } else {
        alert(
          "Some error occurred during revok customer Prime Member. Please try after some time."
        );
        this.isPrimeButton = true;
      }
    });
  }

  RenewMemberShip(customerId) {
    this.isPrimeButton = false;
    this.isPrimeRenew = true;
    this.customerservice
      .GetCustomerPrimeMemberShip(customerId)
      .subscribe((result) => {
        if (result != null) {
          this.isPrimeShow = false;
          this.PrimeCustomer = result;
        } else {
          this.isPrimeShow = true;
          this.displayTabs[8].bool = false;
        }
      });
  }

  changeMembership(membershiplist) {
    membershiplist.FeeAmount = membershiplist.list.FeeAmount;
  }

  changeinputBox() {
    this.isDropdowActive = true;
  }

  getRegDetails() {
    this.blocked = true;
    this.customerservice
      .GetCustomerPrimeRegDetails(this.details.CustomerId)
      .subscribe((result) => {
        this.blocked = false;
        if (result != null) {
          this.isdetails = true;
          this.customerRegList = result;
          for (var i in this.customerRegList) {
            this.customerRegList[i].CreatedDate = this.customerRegList[i]
              .CreatedDate
              ? moment(this.customerRegList[i].CreatedDate).format(
                  "DD/MM/YYYY hh:mm:ss"
                )
              : null;
          }
        } else {
          this.isdetails = false;
          this.displayTabs[8].bool = false;
        }
      });
  }

  ngOnChanges() {
    this.displayTabs = [
      { field: "overview", bool: true },
      { field: "edit-form", bool: false },
      { field: "purchaseTrends", bool: false },
      { field: "topten", bool: false },
      { field: "history", bool: false },
      { field: "hubTransfer", bool: false },
      { field: "CustSMSDocs", bool: false },
      { field: "CustDistSys", bool: false },
      { field: "CustPrimeSys", bool: false },
      { field: "CodLimit", bool: false },
      // {field:'ledger', bool:false},
      // {field:'chats', bool:false},
      // {field:'comments', bool:false},
    ];
    $(".nav .nav-item .nav-link").removeClass("active");
    $("#overview-btn").addClass("active");
    console.log(this.activeFields);
    console.log(this.details);

    if (this.details.VerifiedBy != null) {
      this.peopleService.GetAll().subscribe((result) => {
        this.details.VerifiedByName = result.filter(
          (res) => res.PeopleID == this.details.VerifiedBy
        )[0].DisplayName;
        // this.details.VerifiedByName ? this.activeFields.push({ field: 'VerifiedByName', label: 'Verified By' }) : '';
      });
    } else {
      // this.activeFields.splice(this.activeFields.length - 1, 1);
    }
  }
  activeTabClass: any[] = [
    { tabName: "overviewDisplay", isActive: true },
    { tabName: "editFormDisplay", isActive: false },
    { tabName: "historyDisplay", isActive: false },
    { tabName: "hubTransfere", isActive: false },
    { tabName: "CustSMSDoc", isActive: false },
    { tabName: "CustDistSys", isActive: false },
    { tabName: "DisplayPrimeCustomer", isActive: false },
    { tabName: "CodLimitDisplay", isActive: false },
  ];

  sandUploadlink(details) {
    this.customerservice
      .getCustomersmsMobile(this.details.Mobile)
      .subscribe((result) => {
        this.customerMobile = result;
        this.messageService.add({
          severity: "success",
          summary: "Send Document Link Successfull",
          detail: "",
        });
      });
  }
  customerlink(details) {
    this.customerservice
      .CustomerDocUpload(this.details.CustomerId)
      .subscribe((result) => {
        this.custDoclink = result;
        this.messageService.add({
          severity: "success",
          summary: "Send Customer Call Successfull",
          detail: "",
        });
      });
  }
  switchActive(e, pageSelection) {
    // console.log(e.path);
    // $('.nav-link').removeClass('active');
    if (e.path) {
      let navitem = e.path[2].children;
      for (var i = 0; i < navitem.length; i++) {
        navitem[i].firstChild.className = "nav-link";
      }
      e.path[0].className = "nav-link active";
    }
    this.activeTabClass.forEach((e: any) => {
      if (pageSelection == e.tabName) {
        e.isActive = true;
      } else {
        e.isActive = false;
      }
    });
  }

  switchActive2(e) {
    console.log(e);
    let navitem = e.srcElement.parentElement.children;
    console.log(navitem);
    for (var i = 0; i < navitem.length; i++) {
      navitem[i].className =
        "text-primary bg-grey100 px-3 py-2 m-1 border-primary border-radius-20";
      let id = "#" + navitem[i].title;
      $(id).css("display", "none");
    }
    e.srcElement.className =
      "text-white bg-primary px-3 py-2 m-1 border-radius-20 shadow";
    let id = "#" + e.srcElement.title;
    $(id).css("display", "flex");
  }

  closeOverviewLeft() {
    $("#overview-left").css("display", "none");
    $("#overview-right").removeClass("w-50");
    $("#overview-right").addClass("w-100");
  }

  openOverviewLeft() {
    $("#overview-left").css("display", "flex");
    $("#overview-right").removeClass("w-100");
    $("#overview-right").addClass("w-50");
  }

  switchActive2closeOverviewLeft(e) {
    this.switchActive2(e);
    this.closeOverviewLeft();
  }

  switchActive2openOverviewLeft(e) {
    this.switchActive2(e);
    this.openOverviewLeft();
  }

  closeDetails(isDetails: boolean) {
    this.isdetailsclose.emit(isDetails);
  }

  RefreshParent() {
    this.refreshParent.emit();
  }

  ToggleActivation(supplier) {
    this.activeStatus.emit(supplier);
  }

  onDelete(details) {
    this.deleteSelected.emit(details.CustomerId);
    this.closeDetails(false);
    this.modalService.dismissAll("done");
  }

  getOTP(details) {
    this.customerservice.getOTPbyMobile(details.Mobile).subscribe((result) => {
      if (result != null) {
        this.Otp = result.Otp;
      } else {
        // this.Otp = 0 ;
      }
    });
  }

  hideDisplayTabsContents() {
    for (var i = 0; i < this.displayTabs.length; i++) {
      this.displayTabs[i].bool = false;
    }
  }

  overviewDisplay(e) {
    this.switchActive(e, "overviewDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[0].bool = true;
  }

  editFormDisplay(e) {
    this.switchActive(e, "editFormDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[1].bool = true;
  }

  purchaseTrendsDisplay(e) {
    this.switchActive(e, "purchaseTrendsDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool = true;
  }

  toptenDisplay(e) {
    this.switchActive(e, "toptenDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[3].bool = true;
  }

  historyDisplay(e) {
    this.switchActive(e, "historyDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[4].bool = true;
  }

  hubTransfere(e) {
    this.switchActive(e, "hubTransfere");
    this.hideDisplayTabsContents();
    this.displayTabs[5].bool = true;
  }

  ledgerDisplay(e) {
    this.switchActive(e, "ledgerDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[5].bool = true;
  }

  chatsDisplay(e) {
    this.switchActive(e, "chatsDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[6].bool = true;
  }

  commentsDisplay(e) {
    this.switchActive(e, "commentsDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[6].bool = true;
  }
  CustSMSDoc(e) {
    this.switchActive(e, "CustSMSDoc");
    this.hideDisplayTabsContents();
    this.isdistribution = false;
    this.displayTabs[6].bool = true;
  }
  CustDistSys(e) {
    this.switchActive(e, "CustDistSys");
    this.hideDisplayTabsContents();
    this.displayTabs[7].bool = true;
    this.distributionDetails();
  }
  DisplayPrimeCustomer(e) {
    this.switchActive(e, "DisplayPrimeCustomer");
    this.hideDisplayTabsContents();
    this.isdistribution = false;
    this.isPrimeButton = false;
    this.displayTabs[8].bool = true;
    this.PrimeCustomer = {
      CustomerId: 0,
      IsPrimeCustomer: false,
      FeeAmount: 0,
      StartDate: new Date(),
      EndDate: new Date(),
    };
    this.CustomerPrimeMemberShipDetails();
  }

  codlimitBool: boolean = false;
  CodLimitDisplay(e) {
    this.switchActive(e, "CodLimitDisplay");
    this.hideDisplayTabsContents();
    this.displayTabs[9].bool = true;
    this.showCodLimitHistory();
  }

  updatedistribution(IsVerified) {
    if (IsVerified == true) {
      this.customerservice
        .updatedistributionVerify(this.details.CustomerId)
        .subscribe((result) => {
          this.verify = result;
          if (this.verify == true) {
            this.IsVerified = true;
            this.messageService.add({
              severity: "success",
              summary: "Verify details successfully!",
              detail: "",
            });
          } else {
            this.IsVerified = false;
            this.messageService.add({
              severity: "error",
              summary: "Customer details not Verified!",
              detail: "",
            });
            return this.IsVerified;
          }
        });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Please select Verify details checkbox first!",
        detail: "",
      });
      this.IsVerified = false;
      return this.IsVerified;
    }
  }

  download() {
    const pdfUrl = this.SignedPdf;
    // window.location.href=pdfUrl;
    //window.open(pdfUrl);
    FileSaver.saveAs(pdfUrl, "signeddistributorpdf");
  }

  codhistroyId: any;
  showCodLimitHistory() {
    this.codlimitBool = true;
    this.blocked = true;
    this.customerservice
      .getCodLimitByCustomeId(this.details.CustomerId)
      .subscribe(
        (res) => {
          if (res != null) {
            this.codhistroyId = res;
          } else {
            this.codhistroyId = { Id: 0 };
          }
          this.blocked = false;
        },
        (err) => {
          alert(err.error.ErrorMessage);
          this.blocked = false;
        }
      );
  }

  clearOtp(details) {
    const isConfirmed = confirm("Are you sure you want to clear the OTP?");

    // If the user confirms, proceed with clearing the OTP
    if (isConfirmed) {
      console.log(details);

      this.customerservice.ClearAllOtp(details.Mobile).subscribe((x: any) => {
        console.log(x);
        if (x == true) {
          alert('OTP removed Succesfully');
        }
      });
    } else {
      // User canceled the action
      console.log("OTP clearing action was canceled by the user.");
    }
  }
}

