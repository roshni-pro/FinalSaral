import { Component, OnInit, Input, EventEmitter } from '@angular/core'
import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
// import moment = require('moment');

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  subCategoryList: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [
    { field: 'GroupedCategoryName', label: 'Category Name' }, { field: 'CreatedDate', label: 'Created Date' },
    { field: 'SubcategoryName', label: 'Sub category Name' }, { field: 'Discription', label: 'Discription' },
    { field: 'IsActive', label: 'Active Status' },
    { field: 'StoreTypeName', label: 'Store Type' },
  ];
  closeResult: string;
  isopen: boolean;
  cols: any[];
  getRoleData : any;
  isDigitalSalesLead : boolean = false;
  constructor(private messageService: MessageService, private modalService: NgbModal, private subCategoryService: SubCategoryService, private router: Router, private confirmationService: ConfirmationService) { }
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
//    debugger;
    this.getRoleData = (JSON.parse(localStorage.getItem('tokenData')).rolenames).split(',');
     var digitalSalesLead = 'Digital sales lead';
     var getDigitalSalesleadRoleName = this.getRoleData.find(x => x == digitalSalesLead);
     if(getDigitalSalesleadRoleName == undefined){
      this.isDigitalSalesLead = false;
     }else{
      this.isDigitalSalesLead = true;
     }
    this.isDetails = false;
    this.cols = [
      // { header: 'Edit' },
      { field: 'GroupedCategoryName', header: 'Category Name ' },
      { field: 'SubcategoryName', header: 'Sub category Name' },
      { field: 'LogoUrl', header: 'Image' },
      { field: 'IsActive', header: 'Active' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'Sequence', header: 'Sequence' }

    ];

    this.subCategoryService.GetAllSubCategory().subscribe(result => {
      this.subCategoryList = result;
      debugger;
      for (var i in this.subCategoryList) {
        this.subCategoryList[i].CreatedDate = this.subCategoryList[i].CreatedDate ? moment(this.subCategoryList[i].CreatedDate).format('DD/MM/YYYY') : null;
      }

      console.log('this.subCategory:', this.subCategoryList);
    });
  }

  addSubCategory() {
    // this.router.navigateByUrl("/layout/itemcategory/subcategoryadd");
    this.router.navigateByUrl("/layout/item-category/subcategoryadd");
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
  }
  //  onDelete(t){
  //     this.subCategoryService.DeleteSubCategory(t).subscribe(result=>{
  //       this.modalService.dismissAll("done");
  //       this.ngOnInit();
  //     })
  //  }


  onDelete(t: any) {
    console.log('t', t);
    this.modalService.dismissAll("done");
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.subCategoryService.DeleteSubCategory(t.SubCategoryId).subscribe(result => {
          let ac = this.subCategoryList.filter(x => x.SubCategoryId == t)[0];
          let index = this.subCategoryList.indexOf(ac);
          this.subCategoryList.splice(index, 1);
        });
        this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
      }
    });

  }


  openDetails(d, e) {
    debugger;
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
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  ToggleActivation(subcategory) {
    if (subcategory.Active) {
      subcategory.Active = false;
    } else {
      subcategory.Active = true;
    }
    this.subCategoryService.UpdateSubCategory(subcategory).subscribe(result => {
      this.isDetails = false;
      if(this.subCategoryService.path){
        this.subCategoryService.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
      this.modalService.dismissAll("done");
    });

  }

}

