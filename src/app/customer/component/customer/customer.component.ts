import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { threadId } from 'worker_threads';
import { PeopleService } from 'app/shared/services/people.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  providers: [MessageService, ConfirmationService]
})
export class CustomerComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  customerList: any[];
  closeResult: string;
  isopen: boolean
  cols: any[];
  cols2: any[];
  loading: boolean;
  totalRecords: number;
  // pager: PagerDataV7;
  pageSize: number;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  inputModel: any
  searchKey: string;
  searchModel: any;
  customertype: any;
  cityList: any
  isSearch: boolean = false;
  isMissingDetails: any;
  totalCustomerData: any;
  exportData: any
  isResultFalse: boolean;
  blocked: boolean;
  selectedLevel: any[];
  IsKPP: boolean;
  activeFields: any[] = [
    { field: 'Name', label: 'Customer Name' },
    { field: 'ShopName', label: 'Shop Name' },
    { field: 'Mobile', label: 'Mobile' },
    { field: 'Skcode', label: 'SKcode' },
    { field: 'CreatedDate', label: 'Created Date ' },
    { field: 'City', label: 'City' },
    // { field: 'AreaName', label: 'Area' },
    { field: 'WarehouseName', label: 'WarehouseName' },
    { field: 'ClusterName', label: 'Cluster Name' },
    // { field: 'ExecutiveName', label: 'Executive Name' },
    { field: 'CustomerVerify', label: 'Verified Status' },
    { field: 'CustomerType', label: 'Customer Type ' },
    { field: 'StatusSubType', label: 'Sub Type Status ' },
    { field: 'VerifiedByName', label: 'Verified By' },
    { field: 'VerifiedDate', label: 'VerifiedDate' },
    { field: 'IsFranchise', label: 'IsFranchise' }
    // { field: 'FranchiseApprovedDate', label: 'Franchise Approved' }
    // { field: 'Agent', label: 'Agent ' },
    // { field: 'lat', label: 'Latitude' },
    // { field: 'lg', label: 'Longitude' }
  ];
  LevelColor: any[];
  LevelName: any[];
  people: any;
  grabbedId: number;
  Grabbedname: any;
  constructor(private customer: CustomerService, private exportService: ExportServiceService, private pilotService: PepolePilotService, private peopleService: PeopleService, private router: Router, private modalService: NgbModal, private messageService: MessageService,
    private confirmationService: ConfirmationService, private customerservice: CustomerService) { this.inputModel = {}; this.searchModel = {}; }



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit() {
    this.searchModel.IsKPP = false;
    this.searchModel.CustomerAppType = 0;
    this.isDetails = false;
    // this.peopleService.GetAll().subscribe(result => {
    //   this.people = result;
    // });
    this.cols = [
      { field: 'Name', header: 'Customer Name' },
      { field: 'ShopName', header: 'Shop Name' },
      { field: 'Skcode', header: 'SKcode' },
      { field: 'CRMTags', header: 'CRMTags' },
      { field: 'City', header: 'City' },
      { field: 'WarehouseName', header: 'WarehouseName' },
      { field: 'Mobile', header: 'Mobile' },
      // { header: 'Edit' },

      // { field: 'DataOfJoin', header: 'Status' },
      // {  header: 'Action' }
    ];
    // this.customer.GetAllCustomer().subscribe(result => {
    //  this.customerList = result;
    //  console.log(this.customerList);
    // });
    this.pilotService.City().subscribe(result => {
      this.cityList = result;
    })


    this.dataTableComponent.reset();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }

  // referesh() {
  //   this.isDetails = false;
  //   this.dataTableComponent.reset();
  // }
  load(event) {
    // this.loading = true;
    debugger;
    this.inputModel.First = event.first;//(event.first == 0 || event.first) ? event.first  : 0;
    this.inputModel.Last = event.rows ? event.first + event.rows : 20;
    this.inputModel.Contains = this.searchKey ? this.searchKey : null;
    this.inputModel.ColumnName = event.sortField ? event.sortField : 'CreatedDate';
    this.inputModel.IsAscending = event.sortOrder == 1 ? true : false;
    var page = this.inputModel.Last / event.rows
    console.log(page)
    if (this.isSearch == true) {
      var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
      var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
      //   searchModel.Warehouseid,searchModel.ClusterId
      var wid = this.searchModel.Warehouseid == "" ? undefined : this.searchModel.Warehouseid
      var clid = this.searchModel.clusterId == "" ? undefined : this.searchModel.clusterId
      this.blocked = true;
      debugger;
      this.customer.GetCustomerService(this.searchModel.skcode, ToDate, FromDate, this.searchModel.mobile, this.searchModel.cityId, this.inputModel, this.searchModel.LevelName, this.searchModel.IsKPP, this.searchModel.CustomerAppType, wid, clid).subscribe(res => {
        console.log(res, 'ýyyyyy');
        this.blocked = false;
        this.totalRecords = res.TotalRecords;
        if (this.totalRecords > 0) {
          this.customerList = res.CustomerPagerList;
          this.customerList[0].CreatedDate = new Date(res.CustomerPagerList[0].CreatedDate);
          // this.loading = false;

          if (this.customerList.length < 1) {
            this.isResultFalse = true;
          } else {
            this.messageService.add({ severity: 'success', summary: 'Search Successfull', detail: '' });
            this.isResultFalse = false
          }
        }
        else {
          this.customerList = res.CustomerPagerList;
          this.isResultFalse = true;
          this.messageService.add({ severity: 'error', summary: 'Please enter right details!', detail: '' });
        }


        // this.searchModel.FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate):null
        // this.searchModel.ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate) : null
      });

    }
    else if (this.isMissingDetails == true) {
      this.customer.GetMissingCustomers(this.inputModel).subscribe(res => {
        this.totalRecords = res.TotalRecords;
        this.customerList = res.CustomerPagerList;
        // this.loading = false;
        this.blocked = false;
        if (this.customerList.length < 1) {
          this.isResultFalse = true;
        } else {
          this.messageService.add({ severity: 'success', summary: 'All Missing Details Customers', detail: '' });
          this.isResultFalse = false
        }
      })
    }
    else {
      this.customer.getCustomerPagerList(this.inputModel).subscribe(result => {
        this.totalRecords = result.TotalRecords;
        this.customerList = result.CustomerPagerList;
        console.log("this.customerList" + this.customerList);
        // this.loading = false;
        this.blocked = false;
        if (this.customerList.length < 1) {
          this.isResultFalse = true;
        } else {
          this.messageService.add({ severity: 'success', summary: 'All Customers', detail: '' });
          this.isResultFalse = false
        }
      });
    }

    this.customer.getCustomerlevelcolor().subscribe(result => {
      //console.log("levelcolor", result);
      this.LevelColor = result;
    });

  }

  onDelete(id) {
    // this.modalService.dismissAll("done");
    this.isDetails = false;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.customer.DeleteCustomer(id).subscribe(result => {
          let ldgr = this.customerList.filter(x => x.CustomerId == id)[0];
          let index = this.customerList.indexOf(ldgr);
          this.customerList.splice(index, 1);
          this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
        });
      }
    });

  }
  addPeoples() {
    this.router.navigateByUrl("layout/customer/customer-edit")
  }

  openDetails(d, e) {
    this.selectedRowDetails = d;
    debugger;
    if (this.selectedRowDetails.CustomerAppType > 0) {
      if (this.selectedRowDetails.CustomerAppType == 1) {
        this.selectedRowDetails.CustomerAppTypes = "Sk Retailer";
      }
      else if (this.selectedRowDetails.CustomerAppType == 2) {
        this.selectedRowDetails.CustomerAppTypes = "Trade Customer";
      }
      else if (this.selectedRowDetails.CustomerAppType == 3) {
        this.selectedRowDetails.CustomerAppTypes = "Zaruri Customer";
      }
      else {
        this.selectedRowDetails.CustomerAppTypes = "Distributor Customer";
      }
    }
    // this.peopleService.GetAll().subscribe(result => {
    //   this.people = result;

    //   for (var i in this.people) {
    //     if (d.GrabbedBy == this.people[i].PeopleID) {
    //       d.grabbedByName = this.people[i].DisplayName;
    //       console.log(' GrabbedBy :', d.GrabbedBy);
    //     }
    //   }
    //   d.VerifiedByName = result.filter(res => res.PeopleID == d.VerifiedBy)[0].DisplayName;
    // });
    if (this.selectedRow != undefined) {
      if (this.selectedRow.path) {
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;

    if (this.selectedRow.path) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if (this.selectedRow.path) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  search(data) {
    debugger;
    console.log("data", data)
    this.isDetails = false;
    if ((this.searchModel.FromDate || this.searchModel.ToDate) && (!this.searchModel.cityId)) {
      this.messageService.add({ severity: 'error', summary: 'Please Select City', detail: '' });
    }
    else if (this.searchModel.cityId || this.searchModel.warehouseId || this.searchModel.clusterId || this.searchModel.skcode || this.searchModel.mobile ||
      this.searchModel.LevelName || this.searchModel.IsKPP == true || this.searchModel.CustomerAppType > 0) {
      this.isSearch = true
      this.dataTableComponent.reset();

    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Enter Details', detail: '' });
    }
    // this.customer.GetCustomerService(data.skcode,data.ToDate,data.FromDate,data.mobile,data.cityId).subscribe(res=>{
    //   this.customerList = res
    // })
  }
  allCustomer() {
    this.isDetails = false;
    this.searchModel = {};
    this.isMissingDetails = false;
    this.isSearch = false;
    this.dataTableComponent.reset();

  }
  clear() {
    this.isDetails = false;
    this.searchModel = {};
    this.isMissingDetails = false;
    this.isSearch = false;
    this.dataTableComponent.reset();
    this.customertype = {};
    this.warehouseList = [];
    this.clusterList = [];
  }

  missingDetails() {
    this.isDetails = false;
    this.isMissingDetails = true;
    this.isSearch = false;
    this.dataTableComponent.reset();

  }

  exportFullCustomer() {
    debugger
    this.blocked = true;
    this.customer.exportFullCustomer().subscribe(result => {
      this.blocked = false;
      this.exportData = result;
      // this.exportData.forEach(element => {
      //   
      //   if (element.VerifiedBy != null) {
      //     
      //     element.VerifiedBy = this.people.filter(res => res.PeopleID == element.VerifiedBy)[0].DisplayName;
      //   }
      // });

      this.exportService.exportAsExcelFile(this.exportData, 'cust');
      // this.dataTableComponent.value = this.exportData;
      // this.dataTableComponent.exportCSV()
      //  this.dataTableComponent.reset();
    })
  }

  exportCustomer() {
    this.blocked = true;
    let exportdata = [];
    this.customerList.forEach(element => {
      // if (element.VerifiedBy != null) {
      //   element.VerifiedBy = this.people.filter(res => res.PeopleID == element.VerifiedBy)[0] ? this.people.filter(res => res.PeopleID == element.VerifiedBy)[0].DisplayName : element.VerifiedBy;
      // }
      exportdata.push({
        CustomerId: element.CustomerId,
        ExecutiveId: element.ExecutiveId,
        BeatNumber: element.BeatNumber,
        Day: element.Day,
        ExecutiveName: element.ExecutiveName,
        Skcode: element.Skcode,
        CRMTags: element.CRMTags ? element.CRMTags : '',
        ShopName: element.ShopName,
        Warehouseid: element.Warehouseid,
        MobileSecond: element.MobileSecond,
        WarehouseName: element.WarehouseName,
        //Name:element.Name,
        Password: element.Password,
        Description: element.Description,
        CustomerType: element.CustomerType,
        BillingAddress: element.BillingAddress,
        TypeOfBuissness: element.TypeOfBuissness,
        ShippingAddress: element.ShippingAddress,
        LandMark: element.LandMark,
        Country: element.Country,
        State: element.State,
        Cityid: element.Cityid,
        City: element.City,
        ZipCode: element.ZipCode,
        ShippingCity: element.ShippingCity,
        BillingState: element.BillingState,
        BillingCity: element.BillingCity,
        BillingZipCode: element.BillingZipCode,
        BAGPSCoordinates: element.BAGPSCoordinates,
        SAGPSCoordinates: element.SAGPSCoordinates,
        RefNo: element.RefNo,
        FSAAI: element.FSAAI,
        Type: element.Type,
        OfficePhone: element.OfficePhone,
        Emailid: element.Emailid,
        Familymember: element.Familymember,
        CreatedBy: element.CreatedBy,
        LastModifiedBy: element.LastModifiedBy,
        CreatedDate: element.CreatedDate,
        UpdatedDate: element.UpdatedDate,
        imei: element.imei,
        MonthlyTurnOver: element.MonthlyTurnOver,
        SizeOfShop: element.SizeOfShop,
        ClusterId: element.ClusterId,
        ClusterName: element.ClusterName,
        Deleted: element.Deleted,
        Active: element.Active,
        lat: element.lat,
        lg: element.lg,
        DivisionId: element.DivisionId,
        fcmId: element.fcmId,
        BranchName: element.BranchName,
        IfscCode: element.IfscCode,
        AadharNo: element.AadharNo,
        PanNo: element.PanNo,
        ResidenceAddressProof: element.ResidenceAddressProof,
        DOB: element.DOB,
        AnniversaryDate: element.AnniversaryDate,
        WhatsappNumber: element.WhatsappNumber,
        UploadRegistration: element.UploadRegistration,
        UploadProfilePichure: element.UploadProfilePichure,
        UploadLicensePicture: element.UploadLicensePicture,
        UploadGSTPicture: element.UploadGSTPicture,
        LicenseNumber: element.LicenseNumber,
        Shopimage: element.Shopimage,
        CustomerAppType: element.CustomerAppType,
        IsSignup: element.IsSignup,
        IsCityVerified: element.IsCityVerified,
        UdharLimit: element.UdharLimit,
        UdharLimitRemaining: element.UdharLimitRemaining,
        IsKPP: element.IsKPP,
        KPPWarehouseId: element.KPPWarehouseId,
        CurrentAPKversion: element.CurrentAPKversion,
        PhoneOSversion: element.PhoneOSversion,
        UserDeviceName: element.UserDeviceName,
        CustomerVerify: element.CustomerVerify,
        StatusSubType: element.StatusSubType,
        GroupName: element.GroupName,
        GroupDescription: element.GroupDescription,
        ShippingAddress1: element.ShippingAddress1,
        BillingAddress1: element.BillingAddress1,
        GrabbedBy: element.GrabbedBy,
        VerifiedBy: element.VerifiedBy,
        VerifiedDate: element.VerifiedDate,
        ordercount: element.ordercount,
        level: element.level,
        AreaName: element.AreaName,
        Decription: element.Decription,
        IsResetPasswordOnLogin: element.IsResetPasswordOnLogin,
        IsChequeAccepted: element.IsChequeAccepted,
        ChequeLimit: element.ChequeLimit,
        IsFranchise: element.IsFranchise,
        FranchiseApprovedby: element.FranchiseApprovedby,
        FranchiseApprovedDate: element.FranchiseApprovedDate,
        IsFinBox: element.IsFinBox,
        NameOnGST: element.NameOnGST,
        IsContactsRead: element.IsContactsRead,
        CurrentFinBoxActivity: element.CurrentFinBoxActivity,
        IsFinBoxCreditLine: element.IsFinBoxCreditLine,
        CurrentCreditLineActivity: element.CurrentCreditLineActivity,
        // Channel: element.ChannelType,
      });
    });
    this.blocked = false;
    this.exportService.exportAsExcelFile(exportdata, 'cust');
  }
  exportDateBased() {
    this.exportData = {};
    if (this.searchModel.cityId) {
      if (this.searchModel.FromDate && this.searchModel.ToDate) {
        this.blocked = true;
        var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
        var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
        this.customer.exportDateBased(this.searchModel.skcode, ToDate, FromDate, this.searchModel.mobile, this.searchModel.cityId).subscribe(result => {
          this.blocked = false;
          if (result != null) {
            this.exportData = result;
            this.exportService.exportAsExcelFile(this.exportData, 'DateWiseCustomer');
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'No Record found!', detail: '' });
          }

        })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Please Enter Date Range!', detail: '' });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Select City!', detail: '' });
    }
  }

  exportMissing() {
    this.exportData = {};
    this.blocked = true;
    this.customer.exportMissing().subscribe(result => {
      // result.forEach(element => {
      //   if (element.VerifiedBy != null) {
      //     element.VerifiedBy = this.people.filter(res => res.PeopleID == element.VerifiedBy)[0].DisplayName;
      //   }
      // });
      this.exportData = result;
      // this.exportData.forEach(element => {
      //   if (element.VerifiedBy != null) {
      //     element.VerifiedBy = this.people.filter(res => res.PeopleID == element.VerifiedBy)[0].DisplayName;
      //   }
      // });
      this.blocked = false;
      this.exportService.exportAsExcelFile(this.exportData, 'MIssing_cust');
    })
  }

  // exportTOExcel(json: any[], excelFileName: string){
  //     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //     console.log('worksheet',worksheet);
  //     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  //     this.saveAsExcelFile(excelBuffer, excelFileName);
  //   }

  //  saveAsExcelFile(buffer: any, fileName: string): void {
  //     const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE
  //     });
  //     FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  //   }
  getFilterdata(data) {

    this.inputModel.data = data;
    this.customer.GetFilterCustomerData(this.inputModel).subscribe(res => {

      this.totalRecords = res.TotalRecords;
      this.customerList = res.CustomerPagerList;

    });
  }

  warehouseList: any;
  areaList: any;
  // getWarehousee(cityid) {
  //   debugger;
  //   this.warehouseList=[]
  //   this.clusterList=[]
  //   this.customerservice.getWareHouseByCity(cityid).subscribe(result => {
  //     this.warehouseList = result;
  //   })
  // }

  CiDD: any
  getWarehouse(CiDD) {
    debugger;
    this.warehouseList = []
    this.clusterList = []
    this.searchModel.cityId = CiDD.Cityid
    this.searchModel.Warehouseid = undefined
    this.searchModel.clusterId = undefined
    this.WareIDD = undefined
    this.CustIDD = undefined
    this.customerservice.getWareHouseByCity(CiDD.Cityid).subscribe(result => {
      this.warehouseList = result;
    })
  }

  clusterList: any;
  WareIDD: any
  getCluster(WareIDD) {
    debugger;
    this.clusterList = []
    this.CustIDD = undefined
    this.searchModel.Warehouseid = WareIDD.WareHouseId
    debugger;
    this.searchModel.clusterId = undefined
    this.customerservice.getClusterByCity(WareIDD.WareHouseId).subscribe(result => {
      this.clusterList = result;
    })
  }
  CustIDD: any
  Check(CustIDD) {
    debugger;
    console.log(CustIDD.ClusterId);
    this.searchModel.clusterId = CustIDD.ClusterId
  }

  // onUpload(event) {
  //   const files = event.files[0];
  //   console.log(files);
  //   let file = new FormData();
  //   file.append("file", files)
  //   this.blocked=true;
  //   this.customerservice.UploadCustomerChannelTypeFile(file).subscribe(
  //     res => {
  //       this.blocked=false;
  //       console.log(res)
  //       if (res.Status == false) {
  //         alert(res.msg);
  //         this.displaypop=false;
  //       } else {
  //         alert(res);this.displaypop=false;
  //       }
  //     },
  //     err => {
  //       alert(err.error.ErrorMessage);this.displaypop=false;
  //     })
  // }
  // displaypop:boolean=false
  //   popupchannel()
  //   {
  //     this.displaypop=true;
  //   }
  DownLoadSampleFile() {
    let arr = [];
    arr.push({
      'SKCode': null,
      'ChannelType': null,
    })
    this.exportService.exportAsExcelFile(arr, "Sample Channel File")
  }

}
