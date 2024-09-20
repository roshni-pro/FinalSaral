import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PeopleService } from 'app/shared/services/people.service';
import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { EntityHistoryService } from 'app/shared/services/entity-history.service';

// import moment = require('moment');

// export class NgbdModalContent {
//   @Input() name;
//   constructor(public activeModal: NgbActiveModal) { }
// }
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
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
export class PeopleComponent implements OnInit {
  peopleList:any;
  expandedRows : {} = {};
  @Input() expand : {};
  closeResult: string;
  isopen : boolean;
  cols: any[];
  cars: any[];
  loading: boolean;
  selectedRow : any;
  isDetails : boolean;
  selectedRowDetails: any;
  isInvalid:boolean;
  DeleteComment:string;
  ItemPerPage: any;
  PageNo: any;
  totalRecords: number;
  keyword:any;
  activeFields: any[] = [
    // {field:'PeopleID', label:'Country Name'},
    { field: 'PeopleFirstName', label: 'First Name' },
    { field: 'Empcode', label: 'Employee_Code' },
    // { field: 'PeopleID', label: 'People ID' },
    // { field: 'CompanyId', label: 'Company ID' },
    // { field: 'WarehouseId', label: 'Warehouse Id' },
    { field: 'PeopleLastName', label: 'Last Name' },
    { field: 'Department', label: 'Department' },
    // { field: 'Permissions', label: 'Permissions' },
    { field: 'CreatedDate', label: 'Created Date' },
    { field: 'Mobile', label: 'Mobile' },
    { field: 'DataOfJoin', label: 'Data Of Join' },
    { field: 'DOB', label: 'DOB' },
    { field: 'Status', label: 'Status' },
    { field: 'Email', label: 'Email' },
    { field: 'DisplayName', label: 'DisplayName' },
    // { field: 'Country', label: 'Country' },
    // { field: 'Stateid', label: 'Stateid' },
    // { field: 'state', label: 'state' },
    // { field: 'Cityid', label: 'Cityid' },
    // { field: 'city', label: 'city' },
    // { field: 'BillableRate', label: 'BillableRate' },
    // { field: 'RoleId', label: 'RoleId' },
    // { field: 'CostRate', label: 'CostRate' },
    // { field: 'SUPPLIERCODES', label: 'SUPPLIERCODES' },
    { field: 'Type', label: 'Type' },
    // { field: 'ImageUrl', label: 'ImageUrl' },
    { field: 'Approved', label: 'Approved' },
    // { field: 'VehicleName', label: 'VehicleName' },
    // { field: 'VehicleCapacity', label: 'VehicleCapacity' },
    { field: 'Desgination', label: 'Desgination' },
    { field: 'Active', label: 'Active/Inactive' },

  ];
 // pager: PagerDataV7;
  pageSize: number;
  blocked:boolean=false;
  // @Input() close: EventEmitter<any> = new EventEmitter();

  constructor(private messageService : MessageService, private peopleService:PeopleService, private confirmationService: ConfirmationService, private toast:ToastrService,
    private entityHistoryService:EntityHistoryService,private router:Router , private modalService: NgbModal) { this.isopen === false }

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
  check:boolean
  ngOnInit() {
debugger;
    this.getRoleData = (localStorage.getItem('role')).split(',');
    this.checkPagePermissions(this.getRoleData);
   
    if(this.isDetails == true){
      this.messageService.add({ severity: 'success', summary: "SuccessFully Updated", detail: '' });
      this.isDetails = false;
    }
  
    this.cols = [
      // { header: 'Edit' },
      // { field: 'PeopleID', header: 'People ID' },
      // { field: 'CompanyId', header: 'Company ID' },
      // { field: 'WarehouseId', header: 'WarehouseId' },
      { field: 'PeopleFirstName', header: 'FirstName' },
      { field: 'Empcode', header: 'Employee_Code' },
      { field: 'PeopleLastName', header: 'LastName' },
      { field: 'Department', header: 'Department' },
      { field: 'Permissions', header: 'Permissions' },
      { field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'Mobile', header: 'Mobile' },
      { field: 'DataOfJoin', header: 'Data Of Join' },
      { field: 'DOB', header: 'DOB' },
      { field: 'Status', header: 'Status' },
      // {  header: 'Action' }
    ];
    // this.pageSize = 20;

    // var peopleFromLocalStorage = localStorage.getItem('People-List')
    // console.log(peopleFromLocalStorage);
    
    
  
  }
  load(event) {
    debugger
    var Last = event.first ? event.first + event.rows : 20
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows
    this.blocked=true;
    this.peopleService.GetPeopleAll(this.PageNo,this.ItemPerPage).subscribe(result=>{
      this.peopleList=result.person;
      this.totalRecords=result.TotalCount
      for(var i in this.peopleList){
        this.peopleList[i].CreatedDate = this.peopleList[i].CreatedDate ? moment(this.peopleList[i].CreatedDate).format('DD/MM/YYYY') : null
        this.peopleList[i].DataOfJoin = this.peopleList[i].DataOfJoin ? moment(this.peopleList[i].DataOfJoin).format('MM/DD/YYYY') : null
        this.peopleList[i].DataOfMarriage = this.peopleList[i].DataOfMarriage ? moment(this.peopleList[i].DataOfMarriage).format('MM/DD/YYYY') : null
        this.peopleList[i].DOB = this.peopleList[i].DOB ? moment(this.peopleList[i].DOB).format('MM/DD/YYYY') : null
      }
      this.blocked=false;
    });
  }
SearchByKey(){
  if(this.keyword==undefined || this.keyword==null){
    alert("Enter Keyword");
  return;
  }
  this.blocked=true;
  this.peopleService.GetPeopleByKey(this.keyword).subscribe(result=>{
    this.peopleList=result;
    //this.totalRecords=result.TotalCount
    for(var i in this.peopleList){
      this.peopleList[i].CreatedDate = this.peopleList[i].CreatedDate ? moment(this.peopleList[i].CreatedDate).format('DD/MM/YYYY') : null
      this.peopleList[i].DataOfJoin = this.peopleList[i].DataOfJoin ? moment(this.peopleList[i].DataOfJoin).format('MM/DD/YYYY') : null
      this.peopleList[i].DataOfMarriage = this.peopleList[i].DataOfMarriage ? moment(this.peopleList[i].DataOfMarriage).format('MM/DD/YYYY') : null
      this.peopleList[i].DOB = this.peopleList[i].DOB ? moment(this.peopleList[i].DOB).format('MM/DD/YYYY') : null
      this.totalRecords=0;
    }
    this.blocked=false;
  });
}
Refresh(){
  this.blocked=true;
  this.keyword=null;
  this.PageNo=1,this.ItemPerPage=20;
  this.peopleService.GetPeopleAll(this.PageNo,this.ItemPerPage).subscribe(result=>{
    this.peopleList=result.person;
    this.totalRecords=result.TotalCount
    for(var i in this.peopleList){
      this.peopleList[i].CreatedDate = this.peopleList[i].CreatedDate ? moment(this.peopleList[i].CreatedDate).format('DD/MM/YYYY') : null
      this.peopleList[i].DataOfJoin = this.peopleList[i].DataOfJoin ? moment(this.peopleList[i].DataOfJoin).format('MM/DD/YYYY') : null
      this.peopleList[i].DataOfMarriage = this.peopleList[i].DataOfMarriage ? moment(this.peopleList[i].DataOfMarriage).format('MM/DD/YYYY') : null
      this.peopleList[i].DOB = this.peopleList[i].DOB ? moment(this.peopleList[i].DOB).format('MM/DD/YYYY') : null
    }
    this.blocked=false;
  });
}
Clear(){
  this.keyword=null;
}
  addPeoples(){
    this.router.navigateByUrl("layout/admin/AddPeople");
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
 }
  tryr:boolean=false
 onDelete(ID: number) {
  this.tryr=true
  this.confirmationService.confirm({
    message: 'Are you sure that you want to perform this action?',
    accept: () => {  
     
       if (this.DeleteComment != null) {
   
      console.log(this.DeleteComment)
    // if(this.DeleteComment!==null)
    // {
      this.peopleService.DeletePeople(ID,this.DeleteComment).subscribe(result => {
        let ac = this.peopleList.filter(x => x.PeopleID == ID)[0];
        let index = this.peopleList.indexOf(ac);
        this.peopleList.splice(index, 1);
      },(err)=>{
        let ac = this.peopleList.filter(x => x.PeopleID == ID)[0];
        let index = this.peopleList.indexOf(ac);
        this.peopleList.splice(index, 1);
      }
      );
    }else{
      this.isInvalid = true;
    }
    
    // }//else {
    //   this.toast.show("please write comment")
    // }
    }
  });
}

 

  openDetails(d,e){
    this.selectedRowDetails  = d;
    console.log(this.selectedRowDetails);
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
  this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
  }
  getRoleData: any
  Permission:boolean=false
  checkPagePermissions(roles)
  {
    debugger;
 

  }


}




