import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { CountryService } from 'app/shared/services/country.service';
;
import { DesignationService } from 'app/shared/services/designation.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss'],
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
  ]
})
export class DesignationComponent implements OnInit {
  designationList:any[];
  closeResult: string;
    isopen : boolean
    cols: any[];
    cars: any[];
    loading: boolean;
    isLoading: boolean;
    totalRecords: number;
    selectedRow : any;
    isDetails : boolean;
    selectedRowDetails: any;
    activeFields: any[] = [
    {field:'DesignationName', label:'Designation Name'},
    {field:'Designationid', label:'Designation Id'},
    {field:'Description', label:'Description Status'},
    {field:'Level', label:'Level Status'},
    {field:'Deleted', label:'Deleted Status'},
    // {field:'CompanyId', label:'Company Id'},
    {field:'CreatedDate', label:'Created Date'},
    {field:'UpdatedDate', label:'Updated Date'},];
   // pager: PagerDataV7;
    pageSize: number;

    constructor( private messageService : MessageService,private designation : DesignationService, private confirmationService: ConfirmationService,private router : Router, private modalService: NgbModal) { this.isopen === false  }



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
    this.isDetails = false;
    this.cols = [
      // { header: 'Edit' },
      { field: 'DesignationName', header: 'Designation Name'  },
      { field: 'Description', header: 'Description' },  
      { field: 'Level', header: 'Level' },      
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'UpdatedDate', header: 'Updated Date' },
      { field: 'CompanyId', header: 'Company Id' }
      
    ];

    this.designation.GetAllDesignation().subscribe(result => {
      this.designationList = result;
      console.log(this.designationList);
     });
    }

    
  // onDelete(r){
  //    console.log(r);
  // }
  addDesignation() {
   this.router.navigateByUrl("layout/admin/designation-edit")
 }

  
  // add(){
  //   this.router.navigateByUrl("layout/admin/countryservice/add")
  // }

  // onDelete(id: number) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to perform this action?',
  //     accept: () => {
  //       this.country.DeleteCountry(id).subscribe(result => {
  //         let ac = this.countryList.filter(x => x.ID == id)[0];
  //         let index = this.countryList.indexOf(ac);
  //         this.countryList.splice(index, 1);
  //       });
  //     }
  //   });
  // }y

  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.designation.DeleteDesignation(ID).subscribe(result => {
          let ac = this.designationList.filter(x => x.Designationid == ID)[0];
          let index = this.designationList.indexOf(ac);
          this.designationList.splice(index, 1);
        });
        this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      }
    });
    
  }
  

  openDetails(d,e){
    this.selectedRowDetails  = d;
    if(this.selectedRow != undefined){
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    } 
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    // console.log(this.selectedRow);
    this.isDetails = true;
  }
  
  isDetailsFalse(isDetails : boolean){
  this.isDetails = isDetails;
  if(this.selectedRow.path){
    this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
  }
  }


}



