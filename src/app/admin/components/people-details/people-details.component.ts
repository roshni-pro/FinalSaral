import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent implements OnInit {
  displayTabs: any[];
  closeResult: string;
  entity: any;
  RoleList: any;
  selectedRole: any;
  selectedRoleCopy: any;
  @Input() details: any;
  @Input() activeFields: any[];
  @Input() peopleList: any[];
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() refreshParent = new EventEmitter();
  @Output() activeStatus = new EventEmitter<any>();
  @Output() deleteSelected = new EventEmitter<any>();
  HQMasterLogin: any;
  peoplerole: any;
  role: any;
  isShow: any;
  SubCatMappingList: any;
  selectedSubCatMapping: any;
  selectedSubCatMappingCopy: any;

  constructor(private modalService: NgbModal, private pepolePilotService: PepolePilotService, private messageService: MessageService) { this.entity = "People", this.isShow = false; }

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
    // this.pepolePilotService.GetUserRole().subscribe(result=>{
    //   
    //   localStorage.setItem('role',result);
    //   console.log(result);
    this.peoplerole = localStorage.getItem('role');
    var a = this.peoplerole.split(',');
    for (var i in a) {
      if (a[i] == "HQ Master login" || a[i] == "Product management executive") {
        this.isShow = true;
        break
      } else {
        this.isShow = false;
      }
    }
    this.details.OldMobile=this.details.Mobile

  }

  ngOnChanges() {
    this.displayTabs = [{ field: 'overview', bool: true },
    { field: 'edit-form', bool: false },
    { field: 'history', bool: false },
    { field: 'role', bool: false },
    { field: 'IsSubCatMapping', bool: false }
    ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');
    console.log(this.activeFields);
    console.log(this.details);
  }


  activeTabClass: any[] = [
    {tabName:'overviewDisplay',isActive:true},
    {tabName:'editFormDisplay',isActive:false},
    {tabName:'historyDisplay',isActive:false},
    {tabName:'roleDisplay',isActive:false},
    {tabName:'SubCatMappingDisplay',isActive:false}
  ];

  switchActive(e, pageSelection) {
    // console.log(e.path);
    // $('.nav-link').removeClass('active');
    if(e.path){
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

  closeDetails(isDetails: boolean) {
    this.isdetailsclose.emit(isDetails);
    this.details.Mobile = this.details.OldMobile;
  }

  RefreshParent() {
    this.refreshParent.emit();
  }

  ToggleActivation(supplier) {
    this.activeStatus.emit(supplier);
  }

  onDelete(details) {
    this.deleteSelected.emit(details.PeopleID);
    this.closeDetails(false);
    this.modalService.dismissAll('done');
  }


  hideDisplayTabsContents() {
    for (var i = 0; i < this.displayTabs.length; i++) {
      this.displayTabs[i].bool = false;
    }
  }

  overviewDisplay(e) {
    this.switchActive(e, 'overviewDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[0].bool = true;
  }

  editFormDisplay(e) {
    this.switchActive(e, 'editFormDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[1].bool = true;
  }

  depoDisplay(e) {
    this.switchActive(e, 'depoDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool = true;
  }


  historyDisplay(e) {
    this.switchActive(e, 'historyDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool = true;
  }

  roleDisplay(e) {


    this.pepolePilotService.role(this.details.PeopleID).subscribe(result => {
      this.RoleList = result;

      console.log(this.RoleList.HQMasterLogin)

      console.log(this.RoleList)

      this.selectedRole = this.RoleList.filter(x => {
        return x.UserId != null;
      });
      this.selectedRoleCopy = JSON.parse(JSON.stringify(this.selectedRole));
    })
    this.switchActive(e, 'roleDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[3].bool = true;

  }

  SubCatMappingDisplay(e) {

    this.pepolePilotService.SubCatMapping(this.details.PeopleID).subscribe(result => {

      this.SubCatMappingList = result;
      this.selectedSubCatMapping = this.SubCatMappingList.filter(x => {
        return x.PeopleId > 0;
      });
      this.selectedSubCatMappingCopy = JSON.parse(JSON.stringify(this.selectedSubCatMapping));
    })
    this.switchActive(e, 'SubCatMappingDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[4].bool = true;
  }


  onSave() {
    var obj = {
      OldRoles: this.selectedRoleCopy,
      NewRoles: this.selectedRole
    }

    this.pepolePilotService.updateRoles(obj).subscribe(result => {
      // this.messageService.add({ severity: 'success', summary: "SuccessFully Updated", detail: '' });
      if (result != false) {
        this.refreshParent.emit();
      } else {
        this.messageService.add({ severity: 'error', summary: "Please Update People First", detail: '' });
      }
    });
  }
  onCancel() {
    this.isdetailsclose.emit(false);
  }

  SaveSubCatMapping() {

    this.selectedSubCatMapping.forEach(obj => {
      obj.PeopleId = this.details.PeopleID;
    });

    this.pepolePilotService.UpdatePeopleSubCatMap(this.selectedSubCatMapping).subscribe(result => {

      if (result == 'Updated Successfully') {
        this.messageService.add({ severity: 'success', summary: "Updated Successfully", detail: '' });
        this.refreshParent.emit();
      }
      else {
        this.messageService.add({ severity: 'error', summary: result, detail: '' });
      }
    });
  }

}
