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

@Component({
  selector: 'app-view-cluster',
  templateUrl: './view-cluster.component.html',
  styleUrls: ['./view-cluster.component.scss'],
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
export class ViewClusterComponent implements OnInit {
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
  @Input() CityId: any;
  @Input() WarehouseName: any;
  @Input() ClusterName: any;
  @Input() ClusterId: any;
  @Input() Active: any;
  refreshList: any;
  datacnt: any;
  exportData: any
  exportFilenameDatetime: any;
  myDate = new Date();
  blocked: boolean
  activeFields: any[] = [
    { field: 'ClusterName', label: 'Cluster Name' },
    { field: 'ClusterId', label: 'Cluster Id' },
    { field: 'WarehouseName', label: 'Warehouse Name' },
    { field: 'WarehouseId', label: 'Warehouse Id' },
    { field: 'CreatedDate', label: 'Created Date' },
    { field: 'WorkingCityName', label: 'Working City Name' },
    { field: 'DisplayName', label: 'Agent' },
    { field: 'ExecutiveName', label: 'Executive' },

  ];
  pageSize: number;
  ExportClusterData: any;
  viewAddExecutivePopup: boolean = false;
  salesExecutive = {};
  salesExecutives: any[];
  clusterForExecutiveUpdate: any = {};

  constructor(private messageService: MessageService, private clusterService: ClusterService, private router: Router, private modalService: NgbModal, private cityService: CityService, private exportService: ExportServiceService, private datePipe: DatePipe, private confirmationService: ConfirmationService
    , private executiveService: ExecutiveService
  ) { this.isopen === false }

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
      { field: 'ExecutiveName', header: 'Executive', action: 'true' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'customercount', header: 'Customer Count' },
      { field: 'activecustomercount', header: 'Active Customer Count' },



    ];
    this.blocked = true;
    this.clusterService.GetAllCluster().subscribe(result => {
      
      this.clusterList = result;
      this.clusterList.forEach(x => {
        // this.executiveService.GetActiveSaleExecutivesByClusterId(x.ClusterId)
        // .subscribe(result => {
          
          this.clusterService.getCurrentClusterAgent(x.ClusterId).subscribe(a => {
            
            x.primeExecutive  = a.ExecutiveName ? a.ExecutiveName : '';
            // this.salesExecutive = a.ExecutiveId;
            // this.salesExecutives = result;
            // this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
            // this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
            // this.viewAddExecutivePopup = true;
         // });
        });
      });
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


  }


  Activee(Activevalue) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to InActive this cluster?',
      accept: () => {
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

    this.confirmationService.confirm({
      message: 'Are you sure you want to Active this cluster?',
      accept: () => {
        this.activeValueClusterID = Activevalue.ClusterId;
        this.clusterService.InActiveInactiveClusters(this.activeValueClusterID).subscribe(result => {
          this.List = result;
          this.isDetails = false;
          this.ngOnInit();
        })
      }
    });
  }


  openDetails(d, e) {
    
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }else{
      this.selectedRow = e;
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
      }
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }  
  
  }

  onsearch(CityId, Active) {
    console.log(CityId);
    console.log(Active);


    
    this.clusterService.AddClusterWarehouse(this.CityId, this.Active).subscribe(result => {
      this.clusterList = result;
      this.clusterList.forEach(x => {
        // this.executiveService.GetActiveSaleExecutivesByClusterId(x.ClusterId)
        // .subscribe(result => {
          
          this.clusterService.getCurrentClusterAgent(x.ClusterId).subscribe(a => {
            
            x.primeExecutive  = a.ExecutiveName ? a.ExecutiveName : '';
            // this.salesExecutive = a.ExecutiveId;
            // this.salesExecutives = result;
            // this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
            // this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
            // this.viewAddExecutivePopup = true;
          //});
        });
      });
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


  map(CityId) {
    

    console.log('CityId is ::::', CityId);
    console.log('WarehouseName is ::::', this.WarehouseName);
    console.log('ClusterName is ::::', this.ClusterName);
    console.log('ClusterId is ::::', this.ClusterId);
    if (!CityId) {
      this.messageService.add({ severity: 'error', summary: 'Please Select City First!', detail: '' });
    }
    else {
      this.router.navigateByUrl('layout/warehouse/viewclustercitymap/' + CityId);
    }
  }

  onsearchcity(CityId) {
    this.clusterService.TotalActiveAgent(CityId).subscribe(result => {
      this.clusterList = result;
      this.clusterList.forEach(x => {
        // this.executiveService.GetActiveSaleExecutivesByClusterId(x.ClusterId)
        // .subscribe(result => {
          
          this.clusterService.getCurrentClusterAgent(x.ClusterId).subscribe(a => {
            
            x.primeExecutive  = a.ExecutiveName ? a.ExecutiveName : '';
            // this.salesExecutive = a.ExecutiveId;
            // this.salesExecutives = result;
            // this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
            // this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
            // this.viewAddExecutivePopup = true;
          //});
        });
      });
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



  // exportFullCluster() {
  //   this.clusterService.exportFullCluster(this.CityId).subscribe(result => {
  //     this.exportData = result;

  //   })
  // }


  ExportDataCluster(Data) {
    
    this.ClusterId = Data.ClusterId;
    this.clusterService.GetClusterExportData(this.ClusterId).subscribe(result => {
      this.ExportClusterData = result;
      let exportdata=[];
      this.ExportClusterData.forEach(element => {
        exportdata.push({
          CustomerId:element.CustomerId,
          ExecutiveId:element.ExecutiveId,
          BeatNumber:element.BeatNumber,
          Day:element.Day,
          ExecutiveName: element.ExecutiveName,       
          Skcode:element.Skcode,
          ShopName:element.ShopName,
          Warehouseid:element.Warehouseid,
          MobileSecond:element.MobileSecond,
          WarehouseName:element.WarehouseName,
          //Name:element.Name,
          Password:element.Password,
          Description:element.Description,
          CustomerType:element.CustomerType,
          BillingAddress:element.BillingAddress,
          TypeOfBuissness:element.TypeOfBuissness,
          ShippingAddress:element.ShippingAddress,
          LandMark:element.LandMark,
          Country:element.Country,
          State:element.State,
          Cityid:element.Cityid,
          City:element.City,
          ZipCode:element.ZipCode,
          ShippingCity:element.ShippingCity,
          BillingState:element.BillingState,
          BillingCity:element.BillingCity,
          BillingZipCode:element.BillingZipCode,
          BAGPSCoordinates:element.BAGPSCoordinates,
          SAGPSCoordinates:element.SAGPSCoordinates,
          RefNo:element.RefNo,
          FSAAI:element.FSAAI,
          Type:element.Type,
          OfficePhone:element.OfficePhone,
          Emailid:element.Emailid,
          Familymember:element.Familymember,
          CreatedBy:element.CreatedBy,
          LastModifiedBy:element.LastModifiedBy,
          CreatedDate:element.CreatedDate,
          UpdatedDate:element.UpdatedDate,
          imei:element.imei,
          MonthlyTurnOver:element.MonthlyTurnOver,
          SizeOfShop:element.SizeOfShop,
          ClusterId:element.ClusterId,
          ClusterName:element.ClusterName,
          Deleted:element.Deleted,
          Active:element.Active,
          lat:element.lat,
          lg:element.lg,
          DivisionId:element.DivisionId,
          fcmId:element.fcmId,
          BranchName:element.BranchName,
          IfscCode:element.IfscCode,
          AadharNo:element.AadharNo,
          PanNo:element.PanNo,
          ResidenceAddressProof:element.ResidenceAddressProof,
          DOB:element.DOB,
          AnniversaryDate:element.AnniversaryDate,
          WhatsappNumber:element.WhatsappNumber,
          UploadRegistration:element.UploadRegistration,
          UploadProfilePichure:element.UploadProfilePichure,
          UploadLicensePicture:element.UploadLicensePicture,
          UploadGSTPicture:element.UploadGSTPicture,
          LicenseNumber:element.LicenseNumber,
          Shopimage:element.Shopimage,
          CustomerAppType:element.CustomerAppType,
          IsSignup:element.IsSignup,
          IsCityVerified:element.IsCityVerified,
          UdharLimit:element.UdharLimit,
          UdharLimitRemaining:element.UdharLimitRemaining,
          IsKPP:element.IsKPP,
          KPPWarehouseId:element.KPPWarehouseId,
          CurrentAPKversion:element.CurrentAPKversion,
          PhoneOSversion:element.PhoneOSversion,
          UserDeviceName:element.UserDeviceName,
          CustomerVerify:element.CustomerVerify,
          StatusSubType:element.StatusSubType,
          GroupName:element.GroupName,
          GroupDescription:element.GroupDescription,
          ShippingAddress1:element.ShippingAddress1,
          BillingAddress1:element.BillingAddress1,
          GrabbedBy:element.GrabbedBy,
          VerifiedBy:element.VerifiedBy,
          VerifiedDate:element.VerifiedDate,
          ordercount:element.ordercount,
          level:element.level,
          AreaName:element.AreaName,
          Decription:element.Decription,
          IsResetPasswordOnLogin:element.IsResetPasswordOnLogin,
          IsChequeAccepted:element.IsChequeAccepted,
          ChequeLimit:element.ChequeLimit,
          IsFranchise:element.IsFranchise,
          FranchiseApprovedby:element.FranchiseApprovedby,
          FranchiseApprovedDate:element.FranchiseApprovedDate,
          IsFinBox:element.IsFinBox,
          NameOnGST:element.NameOnGST,
          IsContactsRead:element.IsContactsRead,
          CurrentFinBoxActivity:element.CurrentFinBoxActivity,
          IsFinBoxCreditLine:element.IsFinBoxCreditLine,
          CurrentCreditLineActivity:element.CurrentCreditLineActivity,
        });
      });
      this.exportService.exportAsExcelFile(exportdata, 'ExportClusterData');
    })
  }

  getAllExecutives(row) {
    
    this.executiveService.GetActiveSaleExecutivesByClusterId(row.WarehouseId)
      .subscribe(result => {
        this.salesExecutives = result;
        this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
        this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
        this.viewAddExecutivePopup = true;
      });
  }


  addExecutive() {
    let executive = null;
    executive = this.salesExecutive;
    executive.clusterId = this.clusterForExecutiveUpdate.ClusterId;
    this.clusterService.setSalesExecutiveToCluster(executive).subscribe(result => {
      
      this.salesExecutive = {};
      this.viewAddExecutivePopup = false;
      setTimeout(() => {
        this.messageService.add({ severity: 'success', summary: 'Sales executive ' + executive.executiveName + ' for cluster : ' + this.clusterForExecutiveUpdate.ClusterName, detail: '' });
        setTimeout(() => {
          this.ngOnInit()
        }, 1000);
      }, 2000);
    })

  }


}



