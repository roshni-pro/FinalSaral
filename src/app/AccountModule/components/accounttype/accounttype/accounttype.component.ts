import { Component, OnInit, ViewChild } from '@angular/core';
import { AccounttypeService } from 'app/shared/services/accounttype.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountclassificationService } from 'app/shared/services/accountclassification.service';
import { PagerDataV7 } from 'app/shared/interface/pager-data-v7';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-accounttype',
  templateUrl: './accounttype.component.html',
  styleUrls: ['./accounttype.component.scss']
})
export class AccounttypeComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  accountTypeList: any;
  accountClassificationList: any
  pager: PagerDataV7;
  cols: any[];
  totalRecords: number;
  isLoading: boolean;
  closeResult: string;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{ field: 'Name', label: 'Name' }, { field: 'AccountClassificationName', label: 'Account Classification Name' },];
  isopen: boolean;
  constructor(private accounttype: AccounttypeService, private accountclassification: AccountclassificationService, private router: Router, private modalService: NgbModal, private confirmationService: ConfirmationService) { this.isLoading = true }
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
      { field: 'ID', header: ' ID' },
      { field: 'Name', header: ' Name' },
      { field: 'AccountClassificationName', header: 'Account Classification Name' },
    ];


    this.pager = {
      Contains: '',
      ColumnName: 'ID',
      First: 1,
      Last: 10,
      IsAscending: true
    };

    // this.accounttype.GetAllAccountType().subscribe(result => {
    //  this.accountTypeList = result;
    //  console.log(this.accountTypeList);
    // });

    this.accountclassification.GetAccountClassification().subscribe(result => {
      this.accountClassificationList = result;
      console.log(this.accountClassificationList);
    });

    this.dataTableComponent.reset();
  }


  load(event) {
    console.log('event: ', event);
    this.pager.First = (event.first == 0 || event.first) ? event.first + 1 : this.pager.First;
    this.pager.Last = event.rows ? event.first + event.rows : this.pager.Last;
    this.pager.ColumnName = event.sortField ? event.sortField : this.pager.ColumnName;
    this.pager.IsAscending = event.sortOrder == 1 ? true : false;
    this.isLoading = true;
    this.accounttype.getList(this.pager).subscribe(result => {
      this.accountTypeList = result;
      if (this.accountTypeList && this.accountTypeList.length > 0) {
        this.totalRecords = this.accountTypeList[0].MaxRows;
        console.log('this.ladgerList : ', this.accountTypeList);
      }
      this.isLoading = false;
    })
  }
  add() {
    this.router.navigateByUrl("layout/Account/accounttype/add")
  }
  // onDelete(accounttype: any) {
  //   console.log(accounttype);
  //   this.accounttype.DeleteAccountType(accounttype.ID).subscribe(result => {
  //     //alert("People Deleted");
  //     this.modalService.dismissAll("done");
  //     this.ngOnInit();
  //   });
  // }
  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.accounttype.DeleteAccountType(ID).subscribe(result => {
          let ac = this.accountTypeList.filter(x => x.ID == ID)[0];
          let index = this.accountTypeList.indexOf(ac);
          this.accountTypeList.splice(index, 1);
        });
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
}

