import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';

import { ConfirmationService } from 'primeng/api';
import { SkillService } from 'app/shared/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
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
export class SkillComponent implements OnInit {
  skillList:any[];
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
    {field:'Name', label:'Skill Name'},
    {field:'SkillId', label:'Skill Id'},
    // {field:'aliasName', label:'Alias Name' },
    // {field:'CreatedDate', label:'Created Date'},
    // {field:'UpdatedDate', label:'Updated Date'},
    // { field: 'active', label: 'Active' },
  ];
   // pager: PagerDataV7;
    pageSize: number;
    constructor( private messageService : MessageService,private skill : SkillService,private confirmationService: ConfirmationService, private router : Router, private modalService: NgbModal) { this.isopen === false  }
    


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
        { field: 'SkillId', header: 'Skill Id'  },
        { field: 'Name', header: 'Skill Name' },
        // { field: 'aliasName', header: 'Alias Name' },
        // { field: 'CreatedDate', header: 'Created Date' },        
        // { field: 'UpdatedDate', header: 'Updated Date' },       
        // { field: 'active', header: 'Active' },
           
      ];
  
      this.skill.GetAllSkill().subscribe(result => {
        this.skillList = result;
        console.log(this.skillList);
       });
      }
  
      addSkill() {
        this.router.navigateByUrl("layout/admin/skill-edit");
      }
     
       
       
     
     
  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.skill.DeleteSkill(ID).subscribe(result => {
          let ac = this.skillList.filter(x => x.ID == ID)[0];
          let index = this.skillList.indexOf(ac);
          this.skillList.splice(index, 1);
        },(err)=>{            
          let ac = this.skillList.filter(x => x.Stateid == ID)[0];
          let index = this.skillList.indexOf(ac);
          this.skillList.splice(index, 1);
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





     

