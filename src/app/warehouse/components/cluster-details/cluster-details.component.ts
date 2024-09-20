import { MessageService, ConfirmationService } from 'primeng/api';
import { ExecutiveService } from './../../../executive-assignment/Services/executive.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CityService } from 'app/shared/services/city.service';
import { ClusterService } from 'app/shared/services/cluster.service';
import { ClusterStoreExecutiveDc } from './cluster-store-executive-dc';
import { CustomerService } from 'app/shared/services/customer.service';
@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.scss']
})
export class ClusterDetailsComponent implements OnInit {
  displayTabs: any[];
  showDialog: boolean;
  closeResult: string;
  blocked = false;
  @Input() details: any;
  @Input() activeFields: any[];

  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() refreshParent = new EventEmitter();
  @Output() activeStatus = new EventEmitter<any>();
  @Output() deleteSelected = new EventEmitter<any>();
  cityList: any;
  activeValueClusterID: any;
  isDetails: boolean;
  List: any;
  viewAddExecutivePopup: boolean = false;
  salesExecutive = null;
  salesExecutives: any[];
  StoreList: any[];
  clusterForExecutiveUpdate: any = {};
  selected: boolean = true;
  ClusterStoreExecutiveList: any[];
  MappedClusterExecutiveList: any[];
  cols: any[];
  isShow:boolean=false
  constructor(private router: Router, private modalService: NgbModal, private city: CityService, private clusterService: ClusterService
    , private executiveService: ExecutiveService, private confirmationService: ConfirmationService, private messageService: MessageService,
  private customerservice:CustomerService) {

  }

  open(content) {
debugger
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.getAllExecutives(this.details)
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
    this.showDialog = true;
    console.log('details:', this.details.WarehouseId);

    this.city.GetAllCity().subscribe(result => {
      this.cityList = result;
    })
    this.cols = [
      { field: 'StoreName', header: 'Store Name' },
      { field: 'ExecutiveName', header: 'Executive Name' }
    ];
    this.CustomerChannelTypeList();
  }

  ngOnChanges() {
    this.displayTabs = [{ field: 'overview', bool: true },

    { field: 'edit-form', bool: false },
    { field: 'history', bool: false },
    { field: 'depoedit', bool: false },
    { field: 'depo', bool: false },
    { field: 'depo1', bool: false },
    { field: 'depo2', bool: false },
    { field: 'depo3', bool: false },
    { field: 'assignexecutive', bool: false },

    ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');
    console.log(this.activeFields);
    console.log(this.details);


  }
  activeTabClass: any[] = [
    {tabName:'overviewDisplay',isActive:true},
    {tabName:'editinfo',isActive:false},
    {tabName:'CitydisplayTabs',isActive:false},
    {tabName:'Vehicle',isActive:false},
    {tabName:'Agent',isActive:false},
    {tabName:'map',isActive:false},
    {tabName:'Executive',isActive:false},
  ];


  switchActive(e,pageSelection) {
    // console.log(e.path);
    // $('.nav-link').removeClass('active');

    if (e.path) {
      let navitem = e.path[2].children;
      for (var i = 0; i < navitem.length; i++) {
        navitem[i].firstChild.className = "nav-link";
      }
      e.path[0].className = "nav-link active";
    }
    this.activeTabClass.forEach((e: any)=>{
      if(pageSelection == e.tabName){
        e.isActive = true;
      }else{
        e.isActive = false;
      }
    })
  }


  Agent(e) {
    // console.log(e.path);
    // this.router.navigateByUrl("layout/warehouse/addagent");
    this.switchActive(e,'Agent');
    this.hideDisplayTabsContents();
    this.displayTabs[6].bool = true;
  }


  Executive(e) {

    this.clusterForExecutiveUpdate = this.details && this.details.ClusterId ? this.details : '';
    this.getAllExecutives(this.clusterForExecutiveUpdate);
    // console.log(e.path);
    // this.router.navigateByUrl("layout/warehouse/addagent");
    this.switchActive(e,'Executive');
    this.hideDisplayTabsContents();
    this.displayTabs[8].bool = true;
  }


  City(e) {
    // console.log(e.path);
    this.router.navigateByUrl("layout/warehouse/addcity");
  }

  Vehicle(e) {
    // console.log(e.path);
    // this.router.navigateByUrl("layout/warehouse/addvehicle");
    this.switchActive(e,'Vehicle');
    this.hideDisplayTabsContents();
    this.displayTabs[5].bool = true;
  }

  map(e) {
    // console.log(e.path);
    //this.router.navigateByUrl("layout/warehouse/clustermap");
    this.switchActive(e,'map');
    this.hideDisplayTabsContents();
    this.displayTabs[7].bool = true;
  }
  tmap(e) {
    // console.log(e.path);
    this.router.navigateByUrl("layout/warehouse/clustermap");
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
    this.deleteSelected.emit(details);
    this.closeDetails(false);
    this.modalService.dismissAll('done');
  }


  hideDisplayTabsContents() {
    for (var i = 0; i < this.displayTabs.length; i++) {
      this.displayTabs[i].bool = false;
    }
  }

  overviewDisplay(e) {
    this.switchActive(e,'overviewDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[0].bool = true;
  }

  editFormDisplay(e) {
    this.switchActive(e,'editFormDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[1].bool = true;
  }

  depoDisplay(e) {
    this.switchActive(e,'depoDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool = true;
  }

  CitydisplayTabs(e) {
    this.switchActive(e,'CitydisplayTabs');
    this.hideDisplayTabsContents();
    this.displayTabs[4].bool = true;
  }

  editinfo(e) {
    console.log('this.detailss:', this.details);
    console.log('this.cityList:', this.cityList);
    this.switchActive(e,'editinfo');
    this.hideDisplayTabsContents();
    this.displayTabs[3].bool = true;
  }



  getAllExecutives(row) {
debugger;
    // this.executiveService.GetActiveSaleExecutivesByClusterId(row.ClusterId)
    //   .subscribe(result => {
    //   this.clusterService.getCurrentClusterAgent(row.ClusterId).subscribe(x => {
    //       
    //       row.primeExecutive = x.ExecutiveName ? x.ExecutiveName : '';

    //       this.salesExecutive = x.ExecutiveId;
    //       this.salesExecutives = result;
    //       this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
    //       this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
    //       this.viewAddExecutivePopup = true;
    //     });
    //   });
    this.getStores()

    this.GetClusterStoreExecutive(row.WarehouseId);
    this.GetMappedClusterExecutiveList(row.ClusterId);
   // this.digiExe(this.ChannelMasterId)
  }
  ChannelMasterId:any




  // Get All Store
  wareId:any
  getStores() {

    this.StoreList = [];
    this.executiveService.GetAllStore().subscribe(result => {
      if (result.length > 0) {
        this.StoreList = result;
      }
    });
  }
  // Get All ClusterId Store excutive
  GetClusterStoreExecutive(WarehouseId) {
    this.ClusterStoreExecutiveList = [];
    // this.blocked = true;
    this.wareId=WarehouseId
    this.clusterService.GetClusterStoreExecutive(WarehouseId).subscribe(result => {
      if (result.length > 0) {
        // this.blocked = false;

        //this.ClusterStoreExecutiveList = result;
      

      }
      else {
        this.blocked = false;
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "No record found"
        });
      }
    });
  }

  // Get All Mapped ClusterId Store excutive
  GetMappedClusterExecutiveList(ClusterId) {
    this.MappedClusterExecutiveList = [];
    // this.blocked = true;

    this.clusterService.GetMappedClusterExecutiveList(ClusterId).subscribe(result => {
      if (result.length > 0) {
        // this.blocked = false;
        this.MappedClusterExecutiveList = result;
        console.log(this.MappedClusterExecutiveList,'this.MappedClusterExecutiveList');
        
      }
      else {
        this.blocked = false;
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "No record found"
        });
      }
    });
  }


  Add(StoreId, ExecutiveId, ClusterId,ChannelMasterId) {
    if (StoreId > 0 && ExecutiveId > 0 && ClusterId > 0 && ChannelMasterId > 0) {
      let PostData: ClusterStoreExecutiveDc = {
        Id: 0,
        ClusterId: ClusterId,
        StoreId: StoreId,
        ExecutiveId: ExecutiveId,
        ClusterName: null,
        ExecutiveName: null,
        StoreName: null,
        isEditing: null,
        IsDeleted: false,
        ChannelMasterId:ChannelMasterId
      };
      this.clusterService.InsertStoreMapped(PostData).subscribe(result => {

        console.log(result)
        if (result.Status) {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Added Successfully"
          });
          this.GetMappedClusterExecutiveList(ClusterId);
        }
        else {

          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: result.msg
          });

        }
        // if (result == "Added Successfully") {
        //   this.closeDetails(false);
        // }
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong"
      });
    }
  }


  onRowEditSave(product: ClusterStoreExecutiveDc) {debugger
    

    let PostData: ClusterStoreExecutiveDc = {
      Id: product.Id,
      ClusterId: product.ClusterId,
      StoreId: product.StoreId,
      ExecutiveId: product.ExecutiveId,
      ClusterName: null,
      ExecutiveName: null,
      StoreName: null,
      isEditing: null,
      IsDeleted: false,
      ChannelMasterId: product.ChannelMasterId,
    };
    if (PostData.StoreId > 0 && PostData.ExecutiveId > 0 && PostData.ClusterId > 0 && PostData.Id > 0) {
      this.clusterService.UpdateStoreMapped(PostData).subscribe(result => {
        if(result.Status){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: result.msg
          });
          product.isEditing = false;
          product.ExecutiveName = this.ClusterrowExecutiveList.filter(x => { return x.ExecutiveId == product.ExecutiveId })[0].ExecutiveName;

        }else{
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: result.msg
          });
        }
        
        //product.isEditing = false;
        this.GetMappedClusterExecutiveList(product.ClusterId);
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong"
      });
    }
    this.isShow=false
  }
  onRowEditCancel(product: ClusterStoreExecutiveDc, index: number) {
    product.isEditing = false;
    this.isShow=false
  }
  onRowEditDelete(product: ClusterStoreExecutiveDc) {

    if (product.Id > 0 && product.IsDeleted) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.clusterService.DeleteStoreMapped(product.Id).subscribe(result => {

            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: result
            });
            this.GetMappedClusterExecutiveList(product.ClusterId);
          });
          let index = this.ClusterStoreExecutiveList.indexOf(product);
          if (index >= 0) {
            this.ClusterStoreExecutiveList.splice(index, 1);
          }
        }
      });
    }
    else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong"
      });
    }
    this.isShow=false;
  }
  // addExecutive() {
  //   let executive = null;
  //   
  //   executive = this.salesExecutives.filter(x => x.PeopleID == this.salesExecutive)[0];

  //   if (executive) {

  //     executive.clusterId = this.clusterForExecutiveUpdate.ClusterId;
  //     this.selected = true;
  //     this.blocked = true;

  //     this.confirmationService2.confirm({
  //       message: 'Do you want to assign same executive to Customers of this Cluster also ??',
  //       accept: () => {
  //         
  //         executive.updateAllCustomersExecutives = true;
  //         // this.selected = false;
  //         this.clusterService.setSalesExecutiveToCluster(executive).subscribe(result => {
  //           
  //           this.salesExecutive = {};
  //           this.viewAddExecutivePopup = false;
  //           setTimeout(() => {
  //             
  //             this.messageService.add({ severity: 'success', summary: 'Sales executive ' + executive.DisplayName + ' for cluster : ' + this.clusterForExecutiveUpdate.ClusterName, detail: '' });
  //             setTimeout(() => {
  //               this.clusterForExecutiveUpdate = this.details && this.details.ClusterId ? this.details : '';
  //               this.getAllExecutives(this.clusterForExecutiveUpdate);
  //               this.blocked = false;
  //             }, 1000);
  //           }, 2000);

  //         })
  //       },
  //       reject: () => {
  //         
  //         executive.updateAllCustomersExecutives = false;
  //         this.clusterService.setSalesExecutiveToCluster(executive).subscribe(result => {
  //           
  //           this.salesExecutive = {};
  //           // this.selected = false;
  //           this.viewAddExecutivePopup = false;
  //           setTimeout(() => {
  //             
  //             this.messageService.add({ severity: 'success', summary: 'Sales executive ' + executive.DisplayName + ' for cluster : ' + this.clusterForExecutiveUpdate.ClusterName, detail: '' });
  //             setTimeout(() => {
  //               this.clusterForExecutiveUpdate = this.details && this.details.ClusterId ? this.details : '';
  //               this.getAllExecutives(this.clusterForExecutiveUpdate);
  //               this.blocked = false;
  //             }, 1000);
  //           }, 2000);

  //         })
  //       }
  //     });
  //     

  //   }
  //   else {
  //     this.selected = false;
  //   }

  // }

  close() {
    alert(1);
  }

  ChannelTypeList:any
  CustomerChannelTypeList(){
    this.customerservice.CustomerChannelTypeList().subscribe(res=>{
      console.log(res);      
      this.ChannelTypeList=res;
    })
  }

  digiExe(ChannelMasterId){debugger;
    this.customerservice.ClusterExecutiveByWarehouseIdandChannelId(this.wareId,ChannelMasterId).subscribe(result => {
      if (result.length > 0) {
        this.ClusterStoreExecutiveList = result;  
        console.log(this.ClusterStoreExecutiveList);
        }else{
          this.ClusterStoreExecutiveList=[];
        }
      })
    }
    ClusterrowExecutiveList:any=[]
    rowExecutiveList(ChannelMasterId){
      this.customerservice.ClusterExecutiveByWarehouseIdandChannelId(this.wareId,ChannelMasterId).subscribe(result => {
        if (result.length > 0) {
          this.ClusterrowExecutiveList = result;  
          this.isShow=true;
          console.log(this.ClusterrowExecutiveList);
          }
        })
      }
    
}
