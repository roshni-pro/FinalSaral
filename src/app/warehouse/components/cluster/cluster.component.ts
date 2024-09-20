import { ExecutiveService } from './../../../executive-assignment/Services/executive.service';
import { Component, OnInit, Input } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { ConfirmationService } from 'primeng/api';
import { ClusterService } from 'app/shared/services/cluster.service';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { DatePipe } from '@angular/common';
import { WarehouseService } from 'app/shared/services/warehouse.service';


@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss'],
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
  providers: [DatePipe]
})
export class ClusterComponent implements OnInit {
  clusterList: any[];
  closeResult: string;
  isopen: boolean
  cols: any[];
  cars: any[];
  loading: boolean;
  isLoading: boolean;
  totalRecords: number;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  cities: any;
  activeValue: any;
  activeValueClusterID: any;
  customerCount: number;
  activecount: number;
  activeagent: number;
  List: any;
  WarehouseId: any;
  selectedQue: any;
  isOpenPopup: boolean;
  isFormInvalid: boolean;
  isdisabled: boolean;
  warehouseList: any[];
  Clusters: any[];
  @Input() CityId: any;
  @Input() WarehouseName: any;
  @Input() ClusterName: any;
  @Input() ClusterId: any;


  @Input() Active: any;
  refreshList: any;
  datacnt: any;
  exportData: any
  ExportClusterData: any[];
  exportFilenameDatetime: any;
  myDate = new Date();
  blocked: boolean
  activeFields: any[] = [
    { field: 'ClusterName', label: 'Cluster Name' },
    { field: 'ClusterId', label: 'Cluster Id' },
    { field: 'WarehouseName', label: 'Warehouse Name' },
    { field: 'WarehouseId', label: 'Warehouse Id' },
    { field: 'CreatedDate', label: 'Created Date' },
    // { field: 'UpdatedDate', label: 'Updated Date' },
    // {field:'Address', label:'Address'},
    // {field:'Phone', label:'Phone'},
    // { field: 'WarehouseName', label: 'WarehouseName' },
    // // {field:'Deleted', label:'Deleted'},
    // { field: 'CityId', label: 'City Id' },
    // { field: 'CityName', label: 'City Name' },
    { field: 'WorkingCityName', label: 'Working City Name' },
    { field: 'DisplayName', label: 'Agent Name' },
    // { field: 'ExecutiveName', label: 'Executive' },

    // { field: 'DefaultLatitude', label: ' Default Latitude' },
    // { field: 'DefaultLongitude', label: 'Default Longitude' },
    // {field:'AgentCode', label:'Agent Code'},
    // {field:'ClusterManagerName', label:'Cluster Manager Name'},
    // {field:'ClusterManagerId', label:'Cluster Manager Id'},


  ];
  // pager: PagerDataV7;
  pageSize: number;
  exportcluster: any[];
  salesExecutives: any[] = [];

  constructor(private executiveService: ExecutiveService, private messageService: MessageService, private clusterService: ClusterService, private warehouseService: WarehouseService, private router: Router, private modalService: NgbModal, private cityService: CityService, private exportService: ExportServiceService, private datePipe: DatePipe, private confirmationService: ConfirmationService) {
    this.isopen === false;
    this.ExportClusterData = [];
  }

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
    console.log("Active is ::", this.Active);
    console.log("Active activeValue is ::", this.activeValue);
    console.log('CityId :::', this.CityId);
    this.CityId = "";
    this.Active = "";
    this.isDetails = false;

    this.cols = [
      // { header: 'Edit' },
      { field: 'ClusterId', header: 'Cluster Id' },
      { field: 'ClusterName', header: 'Cluster Name' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'WorkingCityName', header: 'Working City Name' },
      { field: 'DisplayName', header: 'Add Agent' },
      // { field: 'ExecutiveName', header: 'Executive', action: 'true' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'customercount', header: 'Customer Count' },
      { field: 'activecustomercount', header: 'Active Customer Count' },
      // { field: 'ExecutiveName', header: 'Executive' },

      // { field: 'ExecutiveName', header: 'Executive Name' },
      // { field: 'dboyname', header: 'dboyname' },


      // { field: 'active', header: 'Active' },
      // {field:'ClusterManagerName', header:'Cluster Manager Name'},    
      // {field:'UpdatedDate', header:'Updated Date'},


    ];
    this.blocked = true;
    this.clusterService.GetAllCluster().subscribe(result => {

      this.clusterList = result;
      // this.clusterList.forEach(x => {
      //   this.executiveService.GetActiveSaleExecutivesByClusterId(x.ClusterId)
      //   .subscribe(result => {

      //     this.clusterService.getCurrentClusterAgent(x.ClusterId).subscribe(a => {
      //       
      //       x.primeExecutive  = a.ExecutiveName ? a.ExecutiveName : '';
      //       // this.salesExecutive = a.ExecutiveId;
      //       // this.salesExecutives = result;
      //       // this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
      //       // this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
      //       // this.viewAddExecutivePopup = true;
      //     });
      //   });
      // });

      this.exportcluster = result;
      console.log('clusterListclusterList: ', result);
      this.blocked = false;
      for (var i in this.clusterList) {
        this.clusterList[i].CreatedDate = this.clusterList[i].CreatedDate ? moment(this.clusterList[i].CreatedDate).format('DD/MM/YYYY') : null
        this.clusterList[i].UpdatedDate = this.clusterList[i].UpdatedDate ? moment(this.clusterList[i].UpdatedDate).format('DD/MM/YYYY') : null
      }
    });

    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
      for (var i in this.cities) {
        this.cities[i].CreatedDate = this.cities[i].CreatedDate ? moment(this.cities[i].CreatedDate).format('DD/MM/YYYY') : null

      }
    });


    // this.clusterService.GetActiveCount(this.CityId).subscribe(result => {
    //   this.datacnt.activecust = result.activecust;
    // })

  }
  //Todays change 18 Oct GetList()
  // GetList(){
  //   
  //   this.blocked = true;
  //   this.clusterService.GetAllCluster().subscribe(result => {
  //     this.clusterList = result;
  //     this.blocked = false;
  //     for (var i in this.clusterList) {
  //       this.clusterList[i].CreatedDate = this.clusterList[i].CreatedDate ? moment(this.clusterList[i].CreatedDate).format('DD/MM/YYYY') : null
  //       this.clusterList[i].UpdatedDate = this.clusterList[i].UpdatedDate ? moment(this.clusterList[i].UpdatedDate).format('DD/MM/YYYY') : null
  //     }
  //     console.log(this.clusterList);
  //   });
  // }


  Activee(Activevalue) {

    // if(confirm("Are you sure that you want to Inactive Cluster")) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to InActive this cluster?',
      accept: () => {
        // if (confirm("Sure You want to Inactive Cluster")) {
        this.activeValueClusterID = Activevalue.ClusterId;
        this.clusterService.ActiveInactiveClusters(this.activeValueClusterID).subscribe(result => {
          this.List = result;
          this.isDetails = false;
          this.ngOnInit();
        })
      }
    });
  }


  InActive(Activevalue) {

    // if(confirm("Are you sure that you want to Inactive Cluster")) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Active this cluster?',
      accept: () => {
        // if (confirm("Sure You want to Inactive Cluster")) {
        this.activeValueClusterID = Activevalue.ClusterId;
        this.clusterService.InActiveInactiveClusters(this.activeValueClusterID).subscribe(result => {
          this.List = result;
          this.isDetails = false;
          this.ngOnInit();
        })
      }
    });
  }

  refreshclustercustomer(CityId) {
    console.log('CityId :::', this.CityId);
    if (!CityId) {
      this.messageService.add({ severity: 'error', summary: 'Please Select City First!', detail: '' });
    }
    else {
      this.router.navigateByUrl('layout/warehouse/refreshclustercustomer/' + CityId);
    }
    //this.router.navigateByUrl('layout/warehouse/refreshclustercustomer');
  }

  // refreshclustercustomer(CityId){
  //   console.log('CityId :::', this.CityId);
  //   this.confirmationService.confirm({
  //     message: 'Are you sure Order is Delivered?',
  //     accept: () => {
  //     this.clusterService.RefereshCityCluster(CityId).subscribe(result => {
  //       this.refreshList = result;
  //       console.log('refreshList :::', this.refreshList);
  //       //this.messageService.add({ severity: 'error', summary: 'Some error occurred during referesh cluster!', detail: '' });
  //     })
  //     this.messageService.add({ severity: 'error', summary: 'Some error occurred during referesh cluster!', detail: '' });
  //   }
  //   });
  //   // console.log('CityId :::', this.CityId);
  //   // this.confirmationService.confirm({
  //   //   message: 'Are you sure Order is Delivered?',
  //   // });
  //   alert('Are You Sure Customer-Agent & Executive Mapping Is Done?');
  // }

  // status(Activevalue){
  //   
  //   if(this.status == null){
  //     this.ngOnInit();
  //   }else if(this.status==this.Active){
  //     this.activeValueClusterID = Activevalue.ClusterId;
  //     this.clusterService.InActiveInactiveClusters(this.activeValueClusterID).subscribe(result => {
  //       this.List = result;
  //       this.isDetails = false;
  //       this.ngOnInit();
  //       console.log('this.Activelist ::::', this.List);
  //     })
  //   }else{
  //     this.activeValueClusterID = Activevalue.ClusterId;
  //     this.clusterService.ActiveInactiveClusters(this.activeValueClusterID).subscribe(result => {
  //       this.List = result;
  //       console.log('this.InActivelist ::::', this.List);
  //       this.isDetails = false;
  //       this.ngOnInit();
  //     })
  //   }

  // }


  addCluster() {
    this.router.navigateByUrl("layout/warehouse/cluster-edit")
  }

  //Open update Customer Cluster
  updatecustomerCluster() {
    this.CityId = "";
    this.WarehouseId = "";
    this.ClusterId = "";
    this.isdisabled = true;
    this.selectedQue = this.clusterList;
    this.isOpenPopup = true;
  }

  //get Warehouse According to city
  getWarehouselist(CityId) {
    this.warehouseService.GetAllCityId(CityId).subscribe(result => {
      this.warehouseList = result;
    })
  }

  //get Cluster by Warehouse
  getClusterlist(WID) {
    this.clusterService.getClusterBywarehouse(WID).subscribe(result => {
      this.isdisabled = false;
      this.Clusters = result;
    })
  }

  updateCustomerClust(form) {
    if (form.invalid) {
      this.isFormInvalid = true;
      return;
    }
    else {
      this.isFormInvalid = false;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to update Customer Cluster?',
        header: 'Update Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.blocked = true;
          this.clusterService.updatecustomerCluster(form.value.cluster, form.value.isUpdateExec).subscribe(result => {
            this.blocked = false;
            this.isOpenPopup = false;
            if (result) {
              this.messageService.add({ severity: 'success', summary: 'update', detail: 'Customer Update Successfully!!' });
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'update', detail: 'Some issue occured.please,check details!' });
            }

          });
        }
      });
    }

  }

  onDelete(cluster: any) {
    console.log('cluster', cluster);
    this.modalService.dismissAll("done");
    this.clusterService.DeleteCluster(cluster.ClusterId).subscribe(result => {
      //alert("People Deleted");
      this.modalService.dismissAll("done");
      this.ngOnInit();
    });
    // alert(people.PeopleID);

  }


  openDetails(d, e) {
    debugger
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      if (this.selectedRow.path) {
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    } else {
      this.selectedRow = e;
      if (this.selectedRow.path) {
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
      }
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

  onsearch(CityId, Active) {
    console.log(CityId);
    console.log(Active);



    this.clusterService.AddClusterWarehouse(this.CityId, this.Active).subscribe(result => {
      this.clusterList = result;
      // this.clusterList.forEach(x => {
      //   this.executiveService.GetActiveSaleExecutivesByClusterId(x.ClusterId)
      //   .subscribe(result => {
      //     this.clusterService.getCurrentClusterAgent(x.ClusterId).subscribe(a => {
      //       
      //       x.primeExecutive  = a.ExecutiveName ? a.ExecutiveName : '';
      //       // this.salesExecutive = a.ExecutiveId;
      //       // this.salesExecutives = result;
      //       // this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
      //       // this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
      //       // this.viewAddExecutivePopup = true;
      //     });
      //   });
      // });
      this.exportcluster = result;
      for (var i in this.clusterList) {
        this.clusterList[i].CreatedDate = this.clusterList[i].CreatedDate ? moment(this.clusterList[i].CreatedDate).format('DD/MM/YYYY') : null

      }

      console.log(result);
    })

    this.GetcustCount();
    this.GetActiveCount();
    this.GetagentCount();
    //this.map(this.CityId);

    this.exportFilenameDatetime = "Cluster :" + this.datePipe.transform(this.myDate, 'dd/MM/yyyy h:mm:ss a');
  }

  // onsearch(CityId) {
  //   this.clusterService.AddClusterWarehouse(CityId).subscribe(result => {
  //     this.clusterList = result;
  //     for (var i in this.clusterList) {
  //       this.clusterList[i].CreatedDate = this.clusterList[i].CreatedDate ? moment(this.clusterList[i].CreatedDate).format('DD/MM/YYYY') : null

  //     }

  //     console.log(result);
  //   })

  //   this.GetcustCount();
  //   this.GetActiveCount();
  //   this.GetagentCount();
  //   //this.map(this.CityId);

  //   this.exportFilenameDatetime = "Cluster :" + this.datePipe.transform(this.myDate, 'dd/MM/yyyy h:mm:ss a');
  // }

  map(CityId) {
    //map(CityId) {    

    // this.clusterService.GetMap(this.CityId).subscribe(result => {
    //   
    //  // this.clusterService.GetMap(searchdata).subscribe(result => {
    //   this.clusterList = result;
    //   console.log('GetMap',result);
    // })
    // WarehouseName : this.WarehouseName;
    // ClusterName : this.ClusterName;
    // ClusterId : this.ClusterId;

    console.log('CityId is ::::', CityId);
    console.log('WarehouseName is ::::', this.WarehouseName);
    console.log('ClusterName is ::::', this.ClusterName);
    console.log('ClusterId is ::::', this.ClusterId);
    if (!CityId) {
      this.messageService.add({ severity: 'error', summary: 'Please Select City First!', detail: '' });
    }
    else {
      this.router.navigateByUrl('layout/warehouse/clustercitymap/' + CityId);
    }
  }

  // onsearchcity(searchdata) {
  onsearchcity(CityId) {

    // this.clusterService.TotalActiveAgent(this.CityId).subscribe(result => {
    this.clusterService.TotalActiveAgent(CityId).subscribe(result => {
      this.clusterList = result;
      // this.clusterList.forEach(x => {
      //   this.executiveService.GetActiveSaleExecutivesByClusterId(x.ClusterId)
      //   .subscribe(result => {
      //     this.clusterService.getCurrentClusterAgent(x.ClusterId).subscribe(a => {
      //       
      //       x.primeExecutive  = a.ExecutiveName ? a.ExecutiveName : '';
      //       // this.salesExecutive = a.ExecutiveId;
      //       // this.salesExecutives = result;
      //       // this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
      //       // this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
      //       // this.viewAddExecutivePopup = true;
      //     });
      //   });
      // });
      this.exportcluster = result;
      console.log(result);
    })


  }

  private GetcustCount() {
    this.clusterService.GetcustCount(this.CityId).subscribe(result => {
      console.log('city is: ', result);
      if (result && result.length > 0) {
        this.customerCount = result[0].custcount;
      }

    });
  }

  private GetActiveCount() {
    this.clusterService.GetActiveCount(this.CityId).subscribe(result => {
      console.log('activecount is : ', result);
      if (result && result.length > 0) {
        this.activecount = result[0].activecust;
      }
    })
  }

  private GetagentCount() {
    this.clusterService.GetagentCount(this.CityId).subscribe(result => {
      console.log('Agent is : ', result);
      if (result && result.length > 0) {
        this.activeagent = result[0].cntagent;
      }
    })
  }



  exportFullCluster() {
    this.clusterService.exportFullCluster(this.CityId).subscribe(result => {
      this.exportData = result;
      this.exportService.exportAsExcelFile(this.exportData, 'cust');
      // this.dataTableComponent.value = this.exportData;
      // this.dataTableComponent.exportCSV()
      //  this.dataTableComponent.reset();
    })
  }

  ExportDataCluster(Data) {
    this.ClusterId = Data.ClusterId;
    this.clusterService.GetClusterExportData(this.ClusterId).subscribe(result => {
      for (var i in result) {
        let obj = {
          AadharNo: result[i].AadharNo,
          AccountNumber: result[i].AccountNumber,
          Active: result[i].Active,
          AgentCode: result[i].AgentCode,
          Agents: result[i].Agents,
          AnniversaryDate: result[i].AnniversaryDate,
          AreaName: result[i].AreaName,
          Areaid: result[i].Areaid,
          BAGPSCoordinates: result[i].BAGPSCoordinates,
          BankName: result[i].BankName,
          BeatNumber: result[i].BeatNumber,
          BillingAddress: result[i].BillingAddress,
          BillingAddress1: result[i].BillingAddress1,
          BranchName: result[i].BranchName,
          BrandIds: result[i].BrandIds,
          ChequeLimit: result[i].ChequeLimit,
          City: result[i].City,
          Cityid: result[i].Cityid,
          ClusterId: result[i].ClusterId,
          ClusterName: result[i].ClusterName,
          ColourCode: result[i].ColourCode,
          CompanyId: result[i].CompanyId,
          Country: result[i].Country,
          CreatedBy: result[i].CreatedBy,
          CreatedDate: result[i].CreatedDate,
          CurrentAPKversion: result[i].CurrentAPKversion,
          CustSupplierid: result[i].CustSupplierid,
          CustSuppliers: result[i].CustSuppliers,
          CustomerAppType: result[i].CustomerAppType,
          CustomerAppTypes: result[i].CustomerAppTypes,
          CustomerCategoryId: result[i].CustomerCategoryId,
          CustomerCategoryName: result[i].CustomerCategoryName,
          CustomerId: result[i].CustomerId,
          CustomerLevel: result[i].CustomerLevel,
          CustomerRating: result[i].CustomerRating,
          CustomerRatingCommnets: result[i].CustomerRatingCommnets,
          CustomerType: result[i].CustomerType,
          CustomerVerify: result[i].CustomerVerify,
          DOB: result[i].DOB,
          Day: result[i].Day,
          Decription: result[i].Decription,
          Deleted: result[i].Deleted,
          Description: result[i].Description,
          DivisionId: result[i].DivisionId,
          Emailid: result[i].Emailid,
          Exception: result[i].Exception,
          // ExecutiveId: result[i].ExecutiveId,
          // ExecutiveName: result[i].ExecutiveName,
          FSAAI: result[i].FSAAI,
          Familymember: result[i].Familymember,
          FirstTimeRegOTPCode: result[i].FirstTimeRegOTPCode,
          GUID: result[i].GUID,
          GrabbedBy: result[i].GrabbedBy,
          GroupDescription: result[i].GroupDescription,
          GroupName: result[i].GroupName,
          GroupNotification: result[i].GroupNotification,
          IfscCode: result[i].IfscCode,
          InRegion: result[i].InRegionDOB,
          IsChequeAccepted: result[i].IsChequeAccepted,
          IsCityVerified: result[i].IsCityVerified,
          IsHide: result[i].IsHide,
          IsKPP: result[i].IsKPP,
          IsPrimeCustomer: result[i].IsPrimeCustomer,
          IsReferral: result[i].IsReferral,
          IsResetPasswordOnLogin: result[i].IsResetPasswordOnLogin,
          IsSignup: result[i].IsSignup,
          KPPWarehouseId: result[i].KPPWarehouseId,
          LandMark: result[i].LandMark,
          LastModifiedBy: result[i].LastModifiedBy,
          LicenseNumber: result[i].LicenseNumber,
          Mobile: result[i].Mobile,
          MobileSecond: result[i].MobileSecond,
          MonthlyTurnOver: result[i].MonthlyTurnOver,
          Name: result[i].Name,
          Notifications: result[i].Notifications,
          OfficePhone: result[i].OfficePhone,
          PanNo: result[i].PanNo,
          Password: result[i].Password,
          PhoneOSversion: result[i].PhoneOSversion,
          Rating: result[i].Rating,
          RazorpayCustomerId: result[i].RazorpayCustomerId,
          RefNo: result[i].RefNo,
          ReferralSkCode: result[i].ReferralSkCode,
          RegisteredApk: result[i].RegisteredApk,
          ResidenceAddressProof: result[i].ResidenceAddressProof,
          Rewardspoints: result[i].Rewardspoints,
          SAGPSCoordinates: result[i].SAGPSCoordinates,
          ShippingAddress: result[i].ShippingAddress,
          ShippingAddress1: result[i].ShippingAddress1,
          ShopName: result[i].ShopName,
          Shopimage: result[i].Shopimage,
          SizeOfShop: result[i].SizeOfShop,
          Skcode: result[i].Skcode,
          State: result[i].State,
          StatusSubType: result[i].StatusSubType,
          Type: result[i].Type,
          TypeOfBuissness: result[i].TypeOfBuissness,
          UdharLimit: result[i].UdharLimit,
          UdharLimitRemaining: result[i].UdharLimitRemaining,
          UpdatedDate: result[i].UpdatedDate,
          UploadGSTPicture: result[i].UploadGSTPicture,
          UploadLicensePicture: result[i].UploadLicensePicture,
          UploadProfilePichure: result[i].UploadProfilePichure,
          UploadRegistration: result[i].UploadRegistration,
          UserDeviceName: result[i].UserDeviceName,
          VerifiedBy: result[i].VerifiedBy,
          VerifiedDate: result[i].VerifiedDate,
          WarehouseName: result[i].WarehouseName,
          Warehouseid: result[i].Warehouseid,
          WhatsappNumber: result[i].WhatsappNumber,
          ZipCode: result[i].ZipCode,
          check: result[i].check,
          deviceId: result[i].deviceId,
          fcmId: result[i].fcmId,
          imei: result[i].imei,
          inTally: result[i].inTally,
          lat: result[i].lat,
          level: result[i].level,
          lg: result[i].lg,
          ordercount: result[i].ordercount,
          thisRAppordercount: result[i].thisRAppordercount,
          thisSAppordercount: result[i].thisSAppordercount,
          thisordercount: result[i].thisordercount,
          thisordercountCancelled: result[i].thisordercountCancelled,
          thisordercountRedispatch: result[i].thisordercountRedispatch,
          thisordercountdelivered: result[i].thisordercountdelivered,
          thisordercountpending: result[i].thisordercountpending,
          thisordervalue: result[i].thisordervalue,
          userid: result[i].userid,
        }
        this.ExportClusterData.push(obj);
      }
      this.ExportClusterData;
      this.exportService.exportAsExcelFile(this.ExportClusterData, 'ExportClusterData');
    })
  }

  ExportCluster() {
    this.exportService.exportAsExcelFile(this.exportcluster, 'exportcluster');
  }

  getExecutiveName(rowdata) {

    return undefined
  }

  getAllExecutives(row) {


  }

  ClearCache() {

    this.blocked = true;
    this.clusterService.ClearStoreExecutiveCacheKey().subscribe(result => {
      this.clearcashe = result;
      this.blocked = false;
      console.log(result);
    })
  }
  clearcashe: any
  exportExecutiveMapping: any
  ExportExecutiveMapping() {
    this.blocked = true;
    this.clusterService.ExportExecutiveMapping().subscribe((result: any) => {
      console.log(result);
      if (result.Status == true) {
        this.exportExecutiveMapping = result.Data;
        this.blocked = false;
      } else {
        alert(result.Message);
        this.blocked = false;
      }


      this.blocked = false;
      this.exportService.exportAsExcelFile(this.exportExecutiveMapping, 'exportExecutiveMapping');

    })
  }

}



