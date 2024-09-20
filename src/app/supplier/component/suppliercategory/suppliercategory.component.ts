import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { transition, animate, state, style, trigger } from '@angular/animations';
import { SupplierCategoryService } from 'app/shared/services/suppliercategory.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-suppliercategory',
  templateUrl: './suppliercategory.component.html',
  styleUrls: ['./suppliercategory.component.scss'],
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
export class SuppliercategoryComponent implements OnInit {
  suppliercategoryList: any[];
  closeResult: string;
  isopen: boolean
  cols: any[];
  cars: any[];
  loading: boolean;
  isLoading: boolean;
  totalRecords: number;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [
    { field: 'CategoryName', label: 'Supplier Category Name' },
    { field: 'SupplierCaegoryId', label: 'Supplier Category Id' },
    { field: 'CompanyId', label: 'CompanyId' },

  ];
  // pager: PagerDataV7;
  pageSize: number;
  constructor(private suppliercategory: SupplierCategoryService, private router: Router, private modalService: NgbModal, private messageService: MessageService,
    private confirmationService: ConfirmationService) { this.isopen === false }
  // constructor(private country : CountryService ,private router : Router ,
  //   private modalService: NgbModal,
  //   private confirmationService: ConfirmationService) { this.isLoading = true }



  //////////////////////////////////

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
      { field: 'SupplierCaegoryId', header: 'Supplier Category Id' },
      { field: 'CategoryName', header: 'Supplier Category Name' },
      { field: 'CompanyId', header: 'Company Id' }

    ];

    this.suppliercategory.GetSupplierCategory().subscribe(result => {
      this.suppliercategoryList = result;
      console.log(this.suppliercategoryList);
    });
  }

  addPeoples() {
    this.router.navigateByUrl("layout/supplier/suppliercategory-edit")
  }


  onDelete(t) {
    console.log('t', t);
    // // this.modalService.dismissAll("done");
    // // this.suppliercategory.DeleteArea(t.SupplierCaegoryId).subscribe(result => {
    // //   //alert("People Deleted");
    // //   this.modalService.dismissAll("done");
    // //   this.ngOnInit();
    // // });
    // alert(people.PeopleID);



    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.suppliercategory.DeleteArea(t.SupplierCaegoryId).subscribe(result => {
          let ldgr = this.suppliercategoryList.filter(x => x.SupplierCaegoryId == t)[0];
          let index = this.suppliercategoryList.indexOf(ldgr);
          this.suppliercategoryList.splice(index, 1);
          this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
        }, (err) => {

          let ac = this.suppliercategoryList.filter(x => x.SupplierCaegoryId == t.SupplierCaegoryId)[0];
          let index = this.suppliercategoryList.indexOf(ac);
          this.suppliercategoryList.splice(index, 1);
        });
        this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
      }
    });


  }


  openDetails(d, e) {
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      if (this.selectedRow.path) {
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if (this.selectedRow.path) {
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


}


