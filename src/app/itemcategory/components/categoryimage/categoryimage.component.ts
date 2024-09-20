import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BaseCategoryService } from 'app/shared/services/base-category.service';
import { LOADIPHLPAPI } from 'dns';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-categoryimage',
  templateUrl: './categoryimage.component.html',
  styleUrls: ['./categoryimage.component.scss']
})
export class CategoryimageComponent implements OnInit {

  baseCategoryList: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{ field: 'BaseCategoryName', label: 'Base Category Name' },
  { field: 'CreatedDate', label: 'Created Date' },
  { field: 'Code', label: 'Base Category Code' },
  { field: 'LogoUrl', label: 'Category Image' },
  { field: 'UpdatedDate', label: 'Updated Date' }, { field: 'IsActive', label: 'Active Status' },];
  closeResult: string;
  isopen: boolean;
  cols: any[];
  isCategoryEdit: boolean = false;
  constructor(private messageService: MessageService, private loaderService: LoaderService, private modalService: NgbModal, private baseCategoryService: BaseCategoryService, private router: Router, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.isDetails = false;
    this.cols = [
      //{ header: 'Edit' },
      //  {field: 'CategoryId', header: 'S.No.'},
      { field: 'CategoryName', header: 'Category' },
      { field: 'CategoryImg', header: 'Category Image' },
      { field: 'IsActive', header: 'Is Active' },
      { field: 'Action', header: 'Action' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'AppType', header: 'AppType' },
    ];
    this.loaderService.loading(true);
    this.baseCategoryService.getCategoryImage().subscribe(result => {
      this.baseCategoryList = result;
      this.loaderService.loading(false);
      console.log(this.baseCategoryList, 'this.baseCategoryList');

      for (var i in this.baseCategoryList) {
        this.baseCategoryList[i].CreatedDate = this.baseCategoryList[i].CreatedDate ? moment(this.baseCategoryList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log('this.baseCategory:', this.baseCategoryList);
    });
  }
  //
  addCategory() {
    this.router.navigateByUrl("/layout/item-category/addCategoryimage");
  }
  // removeCategory(t: any) {
  //   console.log('t', t);  
  //  this.confirmationService.confirm({
  //   message: 'Are you sure that you want to perform this action?',
  //   accept: () => {
  //     debugger;
  //     this.baseCategoryService.RemoveCategoryImage(t.CategoryId).subscribe(result => {
  //       this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
  //       window.location.reload();
  //     });

  //   }
  // });

  // }
  removeCategory(t: any) {
    debugger;
    console.log('t', t);
    this.modalService.dismissAll("done");
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        debugger;
        this.baseCategoryService.RemoveCategoryImage(t.CategoryImageId).subscribe(result => {
          let ac = this.baseCategoryList.filter(x => x.CategoryImageId == t)[0];
          let index = this.baseCategoryList.indexOf(ac);
          this.baseCategoryList.splice(index, 1);

        });
        alert("Deleted Successfully");
        this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
        window.location.reload();
      }
    });

  }


  openDetails(d, e) {
    this.selectedRowDetails = d;
    this.isCategoryEdit = true;
    this.isDetails = true;
    console.log('this.isDetails', this.isDetails);

  }
  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }
  close() {
    this.isCategoryEdit = false;
  }
}
