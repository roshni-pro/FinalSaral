import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountclassificationService } from 'app/shared/services/accountclassification.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PagerDataV7 } from 'app/shared/interface/pager-data-v7';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-accountclassification',
  templateUrl: './accountclassification.component.html',
  styleUrls: ['./accountclassification.component.scss'],
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
export class AccountclassificationComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  classificationList: any;
  pager: PagerDataV7;
  cols: any[];
  totalRecords: number;
  isLoading: boolean;
  closeResult: string;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{ field: 'Name', label: 'Name' }, { field: 'Description', label: 'Description' },];
  isopen: boolean;

  constructor(private accountclassification: AccountclassificationService,
    private router: Router,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService) { this.isLoading = true }
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
    this.isDetails = false
    this.cols = [
      // { header: 'Edit' },
      { field: 'ID', header: ' ID' },
      { field: 'Name', header: ' Name' },
      { field: 'Description', header: 'Description' },
    ];

    this.pager = {
      Contains: '',
      ColumnName: 'ID',
      First: 1,
      Last: 10,
      IsAscending: true
    };

    this.dataTableComponent.reset();
    // this.accountclassification.GetAccountClassification().subscribe(result => {
    //  this.classificationList = result;
    //  console.log(this.classificationList);
    // });

  }

  load(event) {

    this.isDetails = false;
    console.log('event: ', event);
    this.pager.First = (event.first == 0 || event.first) ? event.first + 1 : this.pager.First;
    this.pager.Last = event.rows ? event.first + event.rows : this.pager.Last;
    this.pager.ColumnName = event.sortField ? event.sortField : this.pager.ColumnName;
    this.pager.IsAscending = event.sortOrder == 1 ? true : false;
    this.isLoading = true;
    this.accountclassification.getList(this.pager).subscribe(result => {
      this.classificationList = result;
      if (this.classificationList && this.classificationList.length > 0) {
        this.totalRecords = this.classificationList[0].MaxRows;
        console.log('this.ladgerList : ', this.classificationList);
      }

      this.isLoading = false;
    });

  }


  add() {
    this.router.navigateByUrl("layout/Account/accountclassificatiion/add")
  }


  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.accountclassification.DeleteClassification(ID).subscribe(result => {
          let ac = this.classificationList.filter(x => x.ID == ID)[0];
          let index = this.classificationList.indexOf(ac);
          this.classificationList.splice(index, 1);
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

