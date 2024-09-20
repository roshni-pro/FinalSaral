import { Component, OnInit ,Input, EventEmitter} from '@angular/core'
import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { CategoryService } from 'app/shared/services/category.service';
// import moment = require('moment');

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  CategoryList : any;
  selectedRow : any;
  isDetails : boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{field:'CategoryName', label:'Category Name'},{field:'CreatedDate', label:'Created Date'},{field:'UpdatedDate', label:'Updated Date'},{ field: 'LogoUrl', label: 'Category Image' },{field:'IsActive', label:'Active Status'},];
  closeResult: string;
  isopen : boolean;
  cols: any[];
  constructor(  private messageService : MessageService,private modalService: NgbModal,private CategoryService: CategoryService,private router:Router,private confirmationService: ConfirmationService) { }
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
      
      { field: 'CategoryName', header: 'Category ' },
      { field:'Code', header: ' Category Code' },
      { field: 'IsActive', header: 'Active' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'LogoUrl', header: 'Category Image' },
    ];

    this.CategoryService.GetAllCategory().subscribe(result=>{
    this.CategoryList=result;
    for(var i in this.CategoryList ){
      this.CategoryList[i].CreatedDate = this.CategoryList[i].CreatedDate ? moment(this.CategoryList[i].CreatedDate).format('DD/MM/YYYY') : null
    }
      
    console.log('this.Category:',this.CategoryList);
    });
  }

  addCategory(){
    this.router.navigateByUrl("/layout/item-category/categoryadd");
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
 }
//  onDelete(t){
//     this.CategoryService.DeleteCategory(t).subscribe(result=>{
//       this.modalService.dismissAll("done");
//       this.ngOnInit();
//     })
//   }


onDelete(t: any) {
  console.log('t', t);
  this.modalService.dismissAll("done");    
 this.confirmationService.confirm({
  message: 'Are you sure that you want to perform this action?',
  accept: () => {
    this.CategoryService.DeleteCategory(t.Categoryid).subscribe(result => {
      let ac = this.CategoryList.filter(x => x.Categoryid == t)[0];
      let index = this.CategoryList.indexOf(ac);
      this.CategoryList.splice(index, 1);
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
