import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TaxMasterService } from 'app/shared/services/tax-master.service';
// import moment = require('moment');

@Component({
  selector: 'app-tax-master',
  templateUrl: './tax-master.component.html',
  styleUrls: ['./tax-master.component.scss'],
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
export class TaxMasterComponent implements OnInit {
  taxMasterList: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{ field: 'TaxName', label: 'Tax Name' }, { field: 'TPercent', label: 'Tax Percentage' }, { field: 'TAlias', label: 'Tax Alias Name' }, { field: 'CreatedDate', label: 'Created Date' }, { field: 'UpdatedDate', label: 'Updated Date' }, { field: 'Active', label: 'Active Status' },];
  closeResult: string;
  isopen: boolean;
  cols: any[];
  constructor(private modalService: NgbModal, private taxMasterService: TaxMasterService, private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService) { }
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
      { field: 'TaxName', header: 'Tax Name' },
      { field: 'TAlias', header: 'Tax Alias Name' },
      { field: 'TPercent', header: 'Tax Percent' },
      { field: 'TDiscription', header: 'Description' },
      { field: 'CreatedDate', header: 'Created Date' },
    ];

    this.taxMasterService.GetAllTaxMaster().subscribe(result => {
      this.taxMasterList = result;
      for (var i in this.taxMasterList) {
        this.taxMasterList[i].CreatedDate = this.taxMasterList[i].CreatedDate ? moment(this.taxMasterList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log('this.taxMaster:', this.taxMasterList);
    });
  }

  addTaxMaster() {
    this.router.navigateByUrl("/layout/taxmaster/add");
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
  }
  onDelete(t: number) {
    // this.taxMasterService.DeleteTaxMaster(t).subscribe(result=>{
    //   this.modalService.dismissAll("done");
    //   this.ngOnInit();
    // })


    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.taxMasterService.DeleteTaxMaster(t).subscribe(result => {
          let ldgr = this.taxMasterList.filter(x => x.TaxID == t)[0];
          let index = this.taxMasterList.indexOf(ldgr);
          this.taxMasterList.splice(index, 1);
          this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
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
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }
}
