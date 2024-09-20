import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CityService } from 'app/shared/services/city.service';
import { ClusterService } from 'app/shared/services/cluster.service';
import { ExecutiveService } from 'app/executive-assignment/Services/executive.service';

@Component({
  selector: 'app-view-cluster-detail',
  templateUrl: './view-cluster-detail.component.html',
  styleUrls: ['./view-cluster-detail.component.scss']
})
export class ViewClusterDetailComponent implements OnInit {
  displayTabs: any[];
  closeResult: string;

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
  constructor(private executiveService: ExecutiveService, private router: Router, private modalService: NgbModal, private city: CityService, private clusterService: ClusterService) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.getAllExecutives(this.details);
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
    console.log('details:', this.details.WarehouseId);
    this.city.GetAllCity().subscribe(result => {
      this.cityList = result;
    })

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

    ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');
    console.log(this.activeFields);
    console.log(this.details);
  }

  activeTabClass: any[] = [
		{tabName:'overviewDisplay',isActive:true},
    // {tabName:'overviewDisplay',isActive:true},
		{tabName:'map',isActive:false},
		{tabName:'editinfo',isActive:false},
    {tabName:'CitydisplayTabs',isActive:true},
		{tabName:'Vehicle',isActive:false},
		{tabName:'Agent',isActive:false},
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

    // this.executiveService.GetActiveSaleExecutivesByClusterId(row.ClusterId)
    //   .subscribe(result => {

    this.clusterService.getCurrentClusterAgent(row.ClusterId).subscribe(x => {

      row.primeExecutive = x.ExecutiveName ? x.ExecutiveName : '';

      // this.salesExecutive = x.ExecutiveId;
      // this.salesExecutives = result;
      // this.clusterForExecutiveUpdate.ClusterId = row.ClusterId;
      // this.clusterForExecutiveUpdate.ClusterName = row.ClusterName;
      // this.viewAddExecutivePopup = true;
    });
    // });
  }
}
