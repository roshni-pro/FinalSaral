import { Component, OnInit, Input, EventEmitter } from '@angular/core'
import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { Button } from 'selenium-webdriver';

import { LoaderService } from 'app/shared/services/loader.service';

import { CategoryService } from 'app/shared/services/category.service';
import { truncateSync } from 'fs';

// import moment = require('moment');

@Component({
  selector: 'app-sub-sub-category',
  templateUrl: './sub-sub-category.component.html',
  styleUrls: ['./sub-sub-category.component.scss']
})
export class SubSubCategoryComponent implements OnInit {
  subsubCategoryList: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{ field: 'CategoryAndSubCategory', label: 'Category Name' }, { field: 'SubcategoryName', label: 'Sub Category Name' }, { field: 'SubsubcategoryName', label: 'Sub Sub Category Name' }, { field: 'CreatedDate', label: 'Created Date' }, { field: 'UpdatedDate', label: 'Updated Date' }, { field: 'IsActive', label: 'Active Status' }, { field: 'SubSubCategoryImage', label: 'Sub Sub Category Image' }, { field: 'CommisionPercent', label: 'Commision Percent' },];
  closeResult: string;
  isopen: boolean;
  cols: any[];
  user: any
  ac: boolean;
  isdetails: boolean;
  ssid: any;
  sid: any;
  active: any;
  data = {
    'CategoriesId': [],
    'CategoryName': "",
    'Categoryid': 0,
    'Code': 0,
    'CommisionPercent': 0,
    'CreatedBy': "",
    'CreatedDate': 0,
    'HindiName': "",
    'IsActive': true,
    'LogoUrl': "",
    'SubCategoryId': 0,
    'SubcategoryName': "",
    'SubsubcategoryName': "",
    'Type': "",
    'UpdateBy': "",
    'UpdatedDate': 0,
  }

  constructor(private messageService: MessageService, private categoryService: CategoryService, private loaderService: LoaderService, private modalService: NgbModal, private subsubCategoryService: SubSubCategoryService, private router: Router, private confirmationService: ConfirmationService) { }

  // constructor( private messageService : MessageService, private modalService: NgbModal,private subsubCategoryService: SubSubCategoryService,private router:Router, private confirmationService : ConfirmationService) { }

  categoryList: any;
  itemcategory: any;
  CategorySubCategory: any;
  // constructor( private messageService : MessageService,private categoryService : CategoryService,private modalService: NgbModal,private subsubCategoryService: SubSubCategoryService,private router:Router, private confirmationService : ConfirmationService) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.isDetails = false;
    this.cols = [
      // { header: 'Edit' },
      { field: 'CategoryAndSubCategory', header: 'Category Name ' },
      { field: 'SubcategoryName', header: 'Sub Category Name' },
      { field: 'SubsubcategoryName', header: 'Sub Sub Category Name' },
      { field: 'Code', header: 'Sub Category Code' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'CommisionPercent', header: 'Commision Percent' },
      { field: 'LogoUrl', header: 'Sub Sub Category Image' },
      { field: 'IsActive', header: 'Active' },
      { field: 'Deactivate', header: 'Deactivate' },
      { field: 'Action', header: 'Action' },
    ];
    this.loaderService.loading(true);
    this.categoryService.GetAllCategory().subscribe(result => {
      this.categoryList = result;
      this.loaderService.loading(false);
    });
    this.subsubCategoryService.NewGetAllSubSubCategory().subscribe(result => {
      this.loaderService.loading(false)
      this.subsubCategoryList = result;
      console.log("subsubCategoryListNew ", this.subsubCategoryList);
      for (var i in this.subsubCategoryList) {
        this.subsubCategoryList[i].CreatedDate = this.subsubCategoryList[i].CreatedDate ? moment(this.subsubCategoryList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log('this.subsubCategory:', this.subsubCategoryList);
    });
  }

  addSubSubCategory() {
    this.router.navigateByUrl("/layout/item-category/subsubcategoryadd");
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
  }
  //  onDelete(t){
  //     this.subsubCategoryService.DeleteSubSubCategory(t).subscribe(result=>{
  //       this.modalService.dismissAll("done");
  //       this.ngOnInit();
  //     })
  //  }


  onDelete(t: any) {
    debugger;
    console.log('t', t);
    this.modalService.dismissAll("done");
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.subsubCategoryService.DeleteSubSubCategory(t.SubsubCategoryid).subscribe(result => {
          let ac = this.subsubCategoryList.filter(x => x.SubsubCategoryid == t)[0];
          let index = this.subsubCategoryList.indexOf(ac);
          this.subsubCategoryList.splice(index, 1);
        });
        alert("Delete Successfully");
        this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
        window.location.reload();
      }
    });

  }


  openDetails(d, e) {
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
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

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if (this.selectedRow.path) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  // Activation(subsubcategory){
  //   if(subsubcategory.IsActive){
  //     subsubcategory.IsActive = false;
  //     // this.ac=true;
  //   }else{
  //     // this.ac=false;
  //     subsubcategory.IsActive = true;
  //   }
  //   this.subsubCategoryService.UpdateSubSubCategory(subsubcategory).subscribe(result=> {
  //     this.isDetails = false;
  //     this.subsubCategoryService.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
  //     this.modalService.dismissAll("done");
  //   });

  // }
  Activation(subsubcategory) {
    debugger;
    this.ssid = subsubcategory.SubsubCategoryid;
    this.active = subsubcategory.IsActive;
    console.log('ssid', this.ssid);

    this.sid = subsubcategory.SubCategoryId;
    this.categoryService.selectedCategoryChanged(this.ssid, this.sid).subscribe(result => {
      this.CategorySubCategory = result.filter(x => x.Selected == true);
      debugger;
      subsubcategory.Categoryid = this.CategorySubCategory[0].Id;

      this.categoryService.GetSubCategory(this.CategorySubCategory[0].Id).subscribe(x => {
        debugger;
        this.itemcategory = x
        var filterData = this.itemcategory.filter(x => x.SubCategoryId == subsubcategory.SubCategoryId);
        subsubcategory.SubCategoryMappingId = filterData[0].SubCategoryMappingId;
        this.itemcategory = this.itemcategory.filter(x => x.SubCategoryMappingId == subsubcategory.SubCategoryMappingId);

      })
    });


    this.confirmationService.confirm({
      message: 'Are you sure that you want to Change the action?',

      accept: () => {
        debugger;
        // && this.isdetails==true
        if (subsubcategory.IsActive) {

          var categorys = this.categoryList.filter(x => x.Categoryid == subsubcategory.Categoryid);
          var dataselect = [];

          categorys.forEach(element => {
            var Row = {
              Key: element.Categoryid, Value: element.BaseCategoryId
            };
            dataselect.push(Row);
          });
          if (dataselect.length == 0) {
            alert("Please select atleast one category.");
            return false;
          }
          subsubcategory.Categoryid = categorys[0].Categoryid;
          subsubcategory.CategoryName = categorys[0].CategoryName;
          var itemcategoryobject = this.itemcategory.filter(x => x.SubCategoryMappingId == subsubcategory.SubCategoryMappingId);
          subsubcategory.SubCategoryMappingId = itemcategoryobject[0].SubCategoryMappingId;
          subsubcategory.SubcategoryName = itemcategoryobject[0].SubcategoryName;
          subsubcategory.SubsubCategoryid = subsubcategory.SubsubCategoryid;
          subsubcategory.SubCategoryId = itemcategoryobject[0].SubCategoryId;
          subsubcategory.CommisionPercent = subsubcategory.AgentCommisionPercent;
          subsubcategory.IsActive = false;
          subsubcategory.CategoriesId = dataselect;
          debugger;
          this.subsubCategoryService.UpdateSubSubCategory(subsubcategory).subscribe(result => {
            console.log('result', result);
            debugger;
            this.isDetails = false;
            this.ngOnInit();
            alert("Update Successfully!!");
            // this.subsubCategoryService.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
            this.modalService.dismissAll("done");
          });
          // this.data.IsActive = subsubcategory.IsActive;
          // subsubcategory.active =!subsubcategory.active
          // console.log('active', subsubcategory.active);

        }
        else {
          var categorys = this.categoryList.filter(x => x.Categoryid == subsubcategory.Categoryid);
          var dataselect = [];

          categorys.forEach(element => {
            var Row = {
              Key: element.Categoryid, Value: element.BaseCategoryId
            };
            dataselect.push(Row);
          });
          if (dataselect.length == 0) {
            alert("Please select atleast one category.");
            return false;
          }
          subsubcategory.Categoryid = categorys[0].Categoryid;
          subsubcategory.CategoryName = categorys[0].CategoryName;
          var itemcategoryobject = this.itemcategory.filter(x => x.SubCategoryMappingId == subsubcategory.SubCategoryMappingId);
          subsubcategory.SubCategoryMappingId = itemcategoryobject[0].SubCategoryMappingId;
          subsubcategory.SubcategoryName = itemcategoryobject[0].SubcategoryName;
          subsubcategory.SubsubCategoryid = subsubcategory.SubsubCategoryid;
          subsubcategory.SubCategoryId = itemcategoryobject[0].SubCategoryId;
          subsubcategory.CommisionPercent = subsubcategory.AgentCommisionPercent;
          subsubcategory.IsActive = true;
          subsubcategory.CategoriesId = dataselect;
          debugger;
          this.subsubCategoryService.UpdateSubSubCategory(subsubcategory).subscribe(result => {
            console.log('result', result);
            debugger;
            this.ngOnInit();
            alert("Update Successfully!!");
            this.isDetails = false;
            // this.subsubCategoryService.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
            this.modalService.dismissAll("done");
          });
          // subsubcategory.active =!subsubcategory.active;
          // console.log('Trueactive', subsubcategory.active);

        }
        console.log('subsubcat', subsubcategory);

        // this.subsubCategoryService.UpdateSubSubCategory(this.data).subscribe(result=> {
        //   console.log('result',result);
        //   this.isDetails = false;
        //   this.subsubCategoryService.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
        //   this.modalService.dismissAll("done");
        // });
      }
    });
  }
}

