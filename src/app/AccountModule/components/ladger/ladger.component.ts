import { Component, OnInit, ViewChild } from '@angular/core';
import { LadgerService } from 'app/shared/services/ladger.service';
import { PagerDataV7 } from 'app/shared/interface/pager-data-v7';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountgroupService } from 'app/shared/services/accountgroup.service';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-ladger',
  templateUrl: './ladger.component.html',
  styleUrls: ['./ladger.component.scss'],
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
export class LadgerComponent implements OnInit {
  @ViewChild(Table,{static:false}) dataTableComponent: Table;//PZ
  ladgerList: any[];
  closeResult: string;
  cars: any[];
  loading: boolean;
  pager: PagerDataV7;
  cols: any[];
  totalRecords: number;
  isLoading: boolean;
  accountList: any[];
  exportToExcel : any
  selectedRow : any;
  isDetails : boolean;
  selectedRowDetails: any;
  activeFields: any[] = [
    {field:'Name', label:'Name'},
  {field:'Country', label:'Country'},
  {field:'PAN', label:'PAN'}, 
  {field:'GSTno', label:'GST'}, 
  {field:'Country', label:'Country'},
];
  isopen : boolean;
  pageSize: number;
  constructor(private ladgerService: LadgerService, 
    private router: Router, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService, private modalService: NgbModal) { this.exportToExcel = {}; this.isLoading = true;this.isopen === false}

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
      { field: 'ID', header: 'ID'},
      { field: 'Name', header: 'Name'},
      { field: 'Country', header: 'Country'},
      { field: 'PAN', header: 'PAN' },
      { field: 'GSTno', header: 'GST' }
      // {  header: 'Action' }

      // { field: 'ID', header: 'ID', widthClass: 'wdt-id', isWidthClassApplied: true, isSortable: true },
      // { field: 'Name', header: 'Name', widthClass: '', isWidthClassApplied: false, isSortable: true },
      // { field: 'Country', header: 'Country', widthClass: '', isWidthClassApplied: false, isSortable: true },
      // { field: 'PAN', header: 'PAN', widthClass: '', isWidthClassApplied: false, isSortable: false },
      // { field: 'GSTno', header: 'GST', widthClass: '', isWidthClassApplied: false, isSortable: false }
    ];

    this.pager = {
      Contains: '',
      ColumnName: 'ID',
      First: 1,
      Last: 10,
      IsAscending: true
    };
    this.dataTableComponent.reset();
   
  }

  addLadger() {
    this.router.navigateByUrl("layout/Account/addladger");
  }

  onDelete(ladgerID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.ladgerService.delete(ladgerID).subscribe(result => {
          let ldgr = this.ladgerList.filter(x => x.ID == ladgerID)[0];
          let index = this.ladgerList.indexOf(ldgr);
          this.ladgerList.splice(index, 1);
          this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
        });
      }
    });
  }

  load(event) {
    console.log('event: ', event);
    this.pager.First = (event.first == 0 || event.first) ? event.first + 1 : this.pager.First;
    this.pager.Last = event.rows ? event.first + event.rows : this.pager.Last;
    this.pager.ColumnName = event.sortField ? event.sortField : this.pager.ColumnName;
    this.pager.IsAscending = event.sortOrder == 1 ? true : false;
    this.isLoading = true;
    this.ladgerService.getList(this.pager).subscribe(result => {
      this.ladgerList = result;
      if( this.ladgerList &&  this.ladgerList.length > 0){
        this.totalRecords = this.ladgerList[0].MaxRows;
        console.log('this.ladgerList : ', this.ladgerList);
      }
     
      this.isLoading = false;
    });
  }

  export(){
    this.exportToExcel.FromDate = moment(this.exportToExcel.FromDate).format('YYYY-MM-DD');
    this.exportToExcel.ToDate = moment(this.exportToExcel.ToDate).format('YYYY-MM-DD');
    this.ladgerService.ExportLadger(this.exportToExcel).subscribe(result => {
      
    })
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
