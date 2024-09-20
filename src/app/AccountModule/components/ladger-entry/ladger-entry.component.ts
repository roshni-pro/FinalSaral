import { Component, OnInit } from '@angular/core';
import { VoucherTypeService } from 'app/shared/services/voucher-type.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LadgerEntryService } from 'app/shared/services/ladger-entry.service';
import * as moment from 'moment';
import { ControlContainer } from '@angular/forms';
import { PagerDataV7 } from 'app/shared/interface/pager-data-v7';
import { ConfirmationService } from 'primeng/api';
import { VoucherService } from 'app/shared/services/voucher.service';
  
@Component({
  selector: 'app-ladger-entry',
  templateUrl: './ladger-entry.component.html',
  styleUrls: ['./ladger-entry.component.scss']
})
export class LadgerEntryComponent implements OnInit {
  voucherTypeList : any;
  ladgerEntryList : any;
  pager: PagerDataV7;
  cols: any[];
  totalRecords: number;
  loading: boolean;
  isLoading: boolean;
  closeResult: string;
  exportToExcel : any;
  selectedRow : any;
  isDetails : boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{field:'Date', label:'Date'},{field:'Particulars', label:'Particulars'},{field:'VouchersNo', label:'VouchersNo'}, {field:'VoucherTypeName', label:'VoucherTypeName'}, {field:'Debit', label:'Debit'},];
  isopen : boolean;
  pageSize: number;
  constructor(private ladgerentry : LadgerEntryService,
    private vouchertype : VoucherTypeService, 
    private router : Router ,  
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private voucherService: VoucherService) { this.exportToExcel = {};this.isopen === false  }
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
    this.isDetails  = false;
    this.cols = [
      // { header: 'Edit' },
      { field: 'ID', header: ' ID'  },
      { field: 'Date', header: ' Date'  },
      { field: 'Particulars', header: 'Particulars' },
      { field: 'VouchersNo', header: 'VoucherNo' },
      { field: 'VoucherTypeName', header: 'VoucherTypeName' },
      { field: 'Debit', header: 'Debit' },
      { field: 'Credit', header: 'Credit' },
    ];

    this.pager = {
      Contains: '',
      ColumnName: 'ID',
      First: 1,
      Last: 10,
      IsAscending: true
    };

    this.ladgerentry.GetAllLadgerEntry().subscribe(result => {
     this.ladgerEntryList = result;
     for(var i in this.ladgerEntryList){
       this.ladgerEntryList[i].Date = this.ladgerEntryList[i].Date ?  moment(this.ladgerEntryList[i].Date).format('DD/MM/YYYY') : null
     }
     console.log(this.ladgerEntryList);
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
    this.ladgerentry.getList(this.pager).subscribe(result => {
      this.ladgerEntryList = result;
      if (this.ladgerEntryList && this.ladgerEntryList.length > 0) {
        this.totalRecords = this.ladgerEntryList[0].MaxRows;
        for (var i in this.ladgerEntryList) {
          this.ladgerEntryList[i].Date = this.ladgerEntryList[i].Date ? moment(this.ladgerEntryList[i].Date).format('DD/MM/YYYY') : null
        }
      }
      console.log(this.ladgerEntryList);
    });
  }
  add(){
    this.router.navigateByUrl("layout/Account/ladgerentry/add")
  }

  // onDelete(ladgerEntry: any) {
  //   console.log(ladgerEntry);
  //   this.ladgerentry.DeleteLadgerEntry(ladgerEntry.ID).subscribe(result => {
  //     //alert("People Deleted");
  //     this.modalService.dismissAll("done");
  //     this.ngOnInit();
  //   });
  // }
  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.ladgerentry.DeleteLadgerEntry(ID).subscribe(result => {
          let ac = this.ladgerEntryList.filter(x => x.ID == ID)[0];
          let index = this.ladgerEntryList.indexOf(ac);
          this.ladgerEntryList.splice(index, 1);
        });
      }
    });
  }

  export(){
    this.exportToExcel.FromDate = moment(this.exportToExcel.FromDate).format('YYYY-MM-DD');
    this.exportToExcel.ToDate = moment(this.exportToExcel.ToDate).format('YYYY-MM-DD');
    this.ladgerentry.ExportLadgerEntry(this.exportToExcel).subscribe(result => {
      alert("dhsdfjh");
    })
    // console.log(this.exportToExcel.FromDate)
   
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
