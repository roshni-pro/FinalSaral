import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-type-details',
  templateUrl: './account-type-details.component.html',
  styleUrls: ['./account-type-details.component.scss']
})
export class AccountTypeDetailsComponent implements OnInit {

  displayTabs: any[];
  closeResult: string;

@Input() details : any;
@Input() activeFields: any[];

@Output() isdetailsclose = new EventEmitter<boolean>();
@Output() refreshParent = new EventEmitter();
@Output() activeStatus = new EventEmitter<any>();
@Output() deleteSelected = new EventEmitter<any>();

constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
  }
  
  ngOnChanges(){
    this.displayTabs = [{field:'overview', bool:true},
                        {field:'edit-form', bool:false},
                        {field:'history', bool:false},
                      ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');
    console.log(this.activeFields);
    console.log(this.details);
  }


  activeTabClass: any[] = [
    {tabName:'overviewDisplay',isActive:true},
    {tabName:'editFormDisplay',isActive:false},
    {tabName:'switchActive',isActive:false},
  ];


  switchActive(e, pageSelection){
    // console.log(e.path);
    // $('.nav-link').removeClass('active');
    if(e.path){
      let navitem = e.path[2].children;
      for(var i=0; i<navitem.length; i++){
        navitem[i].firstChild.className = "nav-link";
      }
      e.path[0].className="nav-link active";
    }

    this.activeTabClass.forEach((e: any)=>{
      if(pageSelection == e.tabName){
        e.isActive = true;
      }else{
        e.isActive = false;
      }
    })
  }

  closeDetails(isDetails: boolean){
    this.isdetailsclose.emit(isDetails);
  }

  RefreshParent(){
    this.refreshParent.emit();
  }

  ToggleActivation(supplier){
    this.activeStatus.emit(supplier);
  }

  onDelete(details){
    this.deleteSelected.emit(details.ID);
     this.closeDetails(false);
    // this.modalService.dismissAll('done');
  }


  hideDisplayTabsContents(){
    for(var i=0; i<this.displayTabs.length; i++){
      this.displayTabs[i].bool=false;
    }
  }

  overviewDisplay(e){
    this.switchActive(e, 'overviewDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[0].bool=true;
  }

  editFormDisplay(e){
    this.switchActive(e, 'editFormDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[1].bool=true;
  }

  depoDisplay(e){
    this.switchActive(e, 'depoDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool=true;
  }

}





