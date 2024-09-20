import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { CountryService } from 'app/shared/services/country.service';

import { DepartmentService } from 'app/shared/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
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
})export class DepartmentComponent implements OnInit {
  departmentList:any[];
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
    {field:'DepName', label:'Dep Name'},
    {field:'DepId', label:'Dep Id'},
    {field:'Description', label:'Description'},
    {field:'Deleted', label:'Deleted'},
    ];
//
   // pager: PagerDataV7;
    pageSize: number;    


    constructor(private messageService : MessageService,private department : DepartmentService ,private confirmationService: ConfirmationService,private router : Router, private modalService: NgbModal
      ) { this.isopen === false  }
    
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
        { field: 'DepId', header: 'Department Id'  },
        { field: 'DepName', header: 'Department Name' },
    
        { field: 'Description', header: 'Description' },
       
           
      ];
  
      this.department.GetAllDepartment().subscribe(result => {
        this.departmentList = result;
        console.log(this.departmentList);
       });
      }
  
      addDepartment() {
        this.router.navigateByUrl("layout/admin/department-edit");
      }

      onDelete(ID: number) {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.department.DeleteDepartment(ID).subscribe(result => {
              let ac = this.departmentList.filter(x => x.DepId == ID)[0];
              let index = this.departmentList.indexOf(ac);
              this.departmentList.splice(index, 1); 
             }
             ,(err)=>{            
                let ac = this.departmentList.filter(x => x.Stateid == ID)[0];
                let index = this.departmentList.indexOf(ac);
                this.departmentList.splice(index, 1);
              });
              this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      }
         // }
        });
      }
        
       // alert(people.PeopleID);
      
  
    


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
    
    
    