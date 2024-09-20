import { Component, OnInit, Input, EventEmitter } from '@angular/core'
import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { TaxGroupService } from 'app/shared/services/tax-group.service';
// import moment = require('moment');

@Component({
  selector: 'app-tax-group',
  templateUrl: './tax-group.component.html',
  styleUrls: ['./tax-group.component.scss']
})
export class TaxGroupComponent implements OnInit {
  taxGroupList : any;
  selectedRow : any;
  isLoading: boolean;
  isDetails : boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{field:'TGrpName', label:'Tax Group Name'},{field:'TGrpAlias', label:'Tax Group Alias Name'},{field:'CreatedDate', label:'Created Date'},{field:'UpdatedDate', label:'Updated Date'},{field:'Active', label:'Active Status'},];
  
  closeResult: string;
  isopen : boolean;
  cols: any[];
  constructor( private modalService: NgbModal,private taxGroupService: TaxGroupService,private router:Router, private messageService: MessageService,
    private confirmationService: ConfirmationService) {   this.isLoading = true; this.isopen === false}
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
      { field: 'TGrpName', header: 'Tax Group Name' },
      { field: 'TGrpAlias', header: 'Tax Group Alias Name' },
      { field: 'TGrpDiscription', header: 'Group Description' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'Active', header: 'Active' },
    ];

    this.taxGroupService.GetAllTaxGroup().subscribe(result=>{
    this.taxGroupList=result;
    for(var i in this.taxGroupList ){
      this.taxGroupList[i].CreatedDate = this.taxGroupList[i].CreatedDate ? moment(this.taxGroupList[i].CreatedDate).format('DD/MM/YYYY') : null
    }
      console.log('this.taxGroup:',this.taxGroupList);
    });
  }

  addTaxGroup(){
    this.router.navigateByUrl("/layout/taxmaster/taxgroup-add");//pz
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
 }
 onDelete(t){
  //  this.taxGroupService.DeleteTaxGroup(t).subscribe(result=>{
  //     this.modalService.dismissAll("done");
  //     this.ngOnInit();
  //   })


    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.taxGroupService.DeleteTaxGroup(t).subscribe(result => {
          let ldgr = this.taxGroupList.filter(x => x.GruopID == t)[0];
          let index = this.taxGroupList.indexOf(ldgr);
          this.taxGroupList.splice(index, 1);
          this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
          
        });
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
  console.log(this.selectedRow);
  this.isDetails = true;
}

isDetailsFalse(isDetails : boolean){
this.isDetails = isDetails;
if(this.selectedRow.path){
  this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
}
}
}
