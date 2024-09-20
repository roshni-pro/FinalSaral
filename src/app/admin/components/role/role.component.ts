import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import { RoleService } from 'app/shared/services/role.service';
import { Observable } from 'rxjs';
import { AnyARecord } from 'dns';
import {DialogModule} from 'primeng/dialog';
import * as moment from 'moment'; 
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleService } from 'app/shared/services/role.service';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
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
export class RoleComponent implements OnInit {
  
  cols:any[];
  isDetails : boolean;
  selectedRowDetails: any;
  selectedRow : any;
  RoleId:any;
  roleList:any;
  data:any;
  id:any;
  closeResult: string;
  display: boolean = false;
  constructor(  private messageService : MessageService,private modalService: NgbModal, private confirmationService: ConfirmationService, private router: Router, private role: RoleService) { this.isDetails = false }
  // private role:RoleService,
  activeFields : any[] = [{field:'RoleTitle', label:'Role Title'},{field: 'CreatedDate', label:'CreatedDate'}];
 
 
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
      
      {field: 'RoleTitle', header: 'RoleTitle'},
      {field: 'CreatedDate' ,header:'CreatedDate'},
    
    ];
    this.role.GetAllRoles().subscribe(result => {
      this.roleList = result;

  })
  }
  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.role.DeleteRole(ID).subscribe(result => {
          let ac = this.roleList.filter(x => x.RoleId == ID)[0];
          let index = this.roleList.indexOf(ac);
          this.roleList.splice(index, 1);
          this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
        });
        this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      }
    });
  
  }

  addnewroles() {
    this.router.navigateByUrl("layout/admin/role-add")
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
    if (this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
    }
  
}
