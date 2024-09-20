import { Component, OnInit } from '@angular/core';
import { VoucherTypeService } from 'app/shared/services/voucher-type.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PagerDataV7 } from 'app/shared/interface/pager-data-v7';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['./voucher-type.component.scss']
})
export class VoucherTypeComponent implements OnInit {

  voucherTypeList: any;
  accountTypeList: any;
  cars: any[];
  loading: boolean;
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
  pageSize: number;
  constructor(private vouchertype: VoucherTypeService,
    private router: Router,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService) { this.isLoading = true; this.isopen === false }
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
    ];

    this.pager = {
      Contains: '',
      ColumnName: 'ID',
      First: 1,
      Last: 10,
      IsAscending: true
    };

    this.vouchertype.GetAllVoucherType().subscribe(result => {
      this.voucherTypeList = result;
      console.log(this.voucherTypeList);
    });

    // this.accounttype.GetAllAccountType().subscribe(result => {
    //   this.accountTypeList = result;
    //   console.log(this.accountTypeList);
    //  });
  }


  load(event) {
    console.log('event: ', event);
    this.pager.First = (event.first == 0 || event.first) ? event.first + 1 : this.pager.First;
    this.pager.Last = event.rows ? event.first + event.rows : this.pager.Last;
    this.pager.ColumnName = event.sortField ? event.sortField : this.pager.ColumnName;
    this.pager.IsAscending = event.sortOrder == 1 ? true : false;
    this.isLoading = true;
    // this.vouchertype.getList(this.pager).subscribe(result => {
    // this.vouchertype.GetAllVoucherType(this.pager).subscribe(result => {
    this.vouchertype.GetAllVoucherType().subscribe(result => {
      this.voucherTypeList = result;
      if (this.voucherTypeList && this.voucherTypeList.length > 0) {
        this.totalRecords = this.voucherTypeList[0].MaxRows;
        console.log('this.ladgerList : ', this.voucherTypeList);
      }

      this.isLoading = false;
    });
  }
  add() {
    this.router.navigateByUrl("layout/Account/vouchertype/add")
    // this.router.navigateByUrl("layout/Account/vouchertype/Save")
  }
  // onDelete(vouchertype: any) {
  //   console.log(vouchertype);
  //   this.vouchertype.DeleteVoucherType(vouchertype.ID).subscribe(result => {
  //     //alert("People Deleted");
  //     this.modalService.dismissAll("done");
  //     this.ngOnInit();
  //   });
  // }
  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.vouchertype.DeleteVoucherType(ID).subscribe(result => {
          let ac = this.voucherTypeList.filter(x => x.ID == ID)[0];
          let index = this.voucherTypeList.indexOf(ac);
          this.voucherTypeList.splice(index, 1);
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