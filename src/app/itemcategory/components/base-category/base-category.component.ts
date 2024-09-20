import { Component, OnInit,Input, EventEmitter, DebugNode } from '@angular/core'
import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { BaseCategoryService } from 'app/shared/services/base-category.service';
import { LoaderService } from 'app/shared/services/loader.service';
// import moment = require('moment');

@Component({
  selector: 'app-base-category',
  templateUrl: './base-category.component.html',
  styleUrls: ['./base-category.component.scss']
})
export class BaseCategoryComponent implements OnInit {
  baseCategoryList : any;
  selectedRow : any;
  isDetails : boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{field:'BaseCategoryName', label:'Base Category Name'},
  {field:'CreatedDate', label:'Created Date'},
  { field:'Code', label: 'Base Category Code' },
  { field: 'LogoUrl', label: 'Category Image' },
  {field:'UpdatedDate', label:'Updated Date'},{field:'IsActive', label:'Active Status'},];
  closeResult: string;
  isopen : boolean;
  cols: any[];
  constructor(  private messageService : MessageService,private loaderService: LoaderService,private modalService: NgbModal,private baseCategoryService: BaseCategoryService,private router:Router,private confirmationService: ConfirmationService) { }
 
  ngOnInit() {
    this.isDetails = false;
    this.cols = [
     //{ header: 'Edit' },
      { field: 'BaseCategoryName', header: 'Base Category Name' },
      { field: 'HindiName', header: 'Hindi Name' },
      { field:'Code', header: 'Base Category Code' },
      { field: 'IsActive', header: 'Active' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'LogoUrl', header: 'Category Image' },
      { field: 'Action', header: 'Action' },     
    ];
    this.getListCate();
  }
//
  addBaseCategory(){
    this.router.navigateByUrl("/layout/item-category/basecategoryadd");

  }

  getListCate() {
    this.loaderService.loading(true);
    this.baseCategoryService.getAllBaseCategoryList().subscribe(result=>{
      this.baseCategoryList=result;
      this.loaderService.loading(false);
      console.log(this.baseCategoryList, 'this.baseCategoryList');
      
      for(var i in this.baseCategoryList ){
        this.baseCategoryList[i].CreatedDate = this.baseCategoryList[i].CreatedDate ? moment(this.baseCategoryList[i].CreatedDate).format('DD/MM/YYYY') : null
      }      
      console.log('this.baseCategory:',this.baseCategoryList);
      });
  }
  // onDelete(t: any) {
  //   debugger;
  //   console.log('t', t);
  //   this.modalService.dismissAll("done");    
  //  this.confirmationService.confirm({
  //   message: 'Are you sure that you want to perform this action?',
  //   accept: () => {
  //     this.baseCategoryService.DeleteBaseCategory(t.BaseCategoryId).subscribe(result => {
  //       // let ac = this.baseCategoryList.filter(x => x.BaseCategoryId == t)[0];
  //       // let index = this.baseCategoryList.indexOf(ac);
  //       // this.baseCategoryList.splice(index, 1);
  //       this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
  //       window.location.reload();
  //     });
      
  //   }
  // });

  // }

  removeCategory(t: any) {
    debugger;
    console.log('t', t);  
   this.confirmationService.confirm({
    message: 'Are you sure that you want to perform this action?',
    accept: () => {
      debugger;
      this.baseCategoryService.RemoveBaseCategory(t.BaseCategoryId).subscribe(result => {
 
        console.log('result',result);
        // if(result){
       // this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
        this.getListCate();
        // }
        // window.location.reload();
      });
      alert("Remove Successfully");
      this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      window.location.reload(); 
    }
  });
  // this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
  }


   openDetails(d,e){

    this.selectedRowDetails  = d;
    console.log('d',d);
    this.isDetails = true;
    // if(this.selectedRow != undefined){
    //   this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    // } 
    // this.selectedRow = e;
    // this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    // console.log(this.selectedRow);
    // this.isDetails = true;
  }
  
  isDetailsFalse(isDetails : boolean){
  this.isDetails = isDetails;
  if(this.selectedRow.path){
    this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
  }
 }
}

