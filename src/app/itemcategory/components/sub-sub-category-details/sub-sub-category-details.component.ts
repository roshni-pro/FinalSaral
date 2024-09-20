import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'app/shared/services/category.service';



@Component({
  selector: 'app-sub-sub-category-details',
  templateUrl: './sub-sub-category-details.component.html',
  styleUrls: ['./sub-sub-category-details.component.scss']
})
export class SubSubCategoryDetailsComponent implements OnInit {

  displayTabs: any[];
  closeResult: string;

@Input() details : any;
@Input() activeFields: any[];

@Output() isdetailsclose = new EventEmitter<boolean>();
@Output() refreshParent = new EventEmitter();
@Output() activeStatus = new EventEmitter<any>();
@Output() deleteSelected = new EventEmitter<any>();
entity : any;
constructor(private modalService: NgbModal,private categoryService:CategoryService) {this.entity= "SubsubCategory";}

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
    {tabName:'historyDisplay',isActive:false},
  ];

  switchActive(e,pageSelection){
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
    debugger;
    this.refreshParent.emit();
  }

  ToggleActivation(subsubcategory){
    this.activeStatus.emit(subsubcategory);
  }

  onDelete(details){
    this.deleteSelected.emit(details);
    this.closeDetails(false);
    this.modalService.dismissAll('done');
  }


  hideDisplayTabsContents(){
    for(var i=0; i<this.displayTabs.length; i++){
      this.displayTabs[i].bool=false;
    }
  }

  overviewDisplay(e){
    this.switchActive(e,'overviewDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[0].bool=true;
  }

  editFormDisplay(e){
    this.switchActive(e,'editFormDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[1].bool=true;
  }

  // depoDisplay(e){
  //   this.switchActive(e);
  //   this.hideDisplayTabsContents();
  //   this.displayTabs[2].bool=true;
  // }

  historyDisplay(e){
    this.switchActive(e,'historyDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool=true;
  }

}
