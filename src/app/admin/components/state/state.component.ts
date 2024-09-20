import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CountryService } from 'app/shared/services/country.service';
import { StateService } from 'app/shared/services/state.service';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
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
export class StateComponent implements OnInit {
  stateList: any[];
  closeResult: string;
  isopen: boolean
  cols: any[];
  cars: any[];
  loading: boolean;
  totalRecords: number;
  selectedRow: any;
  isDetails: boolean;
  Stateid: any;
  ID: any;
  statedetails: any;
  selectedRowDetails: any;
  activeFields: any[] = [

    { field: 'StateName', label: 'State Name' },
    { field: 'GSTNo', label: 'GST code' },
    { field: 'Stateid', label: 'State Id' },
    { field: 'AliasName', label: 'Alias Name' },
    { field: 'active', label: 'Active' },
    { field: 'CompanyId', label: 'Company Id' },
    // { field: 'ZoneId', label: 'Zone id' },
    // { field: 'ZoneName', label: 'Zone Name' },
    { field: 'StateManagerName', label: 'State Manager Name' },
    // { field: 'StateManagerId', label: 'State Manager Id' },
    { field: 'Deleted', label: 'Deleted' },
    { field: 'CreatedDate', label: 'Created Date' },
    { field: 'UpdatedDate', label: 'Updated Date' },
  ];
  // pager: PagerDataV7;
  pageSize: number;

  constructor(private messageService: MessageService, private state: StateService, private router: Router, private modalService: NgbModal, private confirmationService: ConfirmationService) { this.isopen === false }


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
      { field: 'StateName', header: 'State Name' },
      { field: 'AliasName', header: 'Alias Name' },
      //  { field: 'ZoneName', header: 'Zone Name' },

      // { field: 'StateManagerName', header: 'StateManagerName' },

      { field: 'CreatedDate', header: 'Created Date' }

    ];


    this.state.GetAllState().subscribe(result => {
      this.stateList = result;
      for (var i in this.stateList) {
        this.stateList[i].CreatedDate = this.stateList[i].CreatedDate ? moment(this.stateList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log(this.stateList);
    });
  }


  onDelete(ID: number) {
    console.log(ID);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.state.DeleteState(ID).subscribe(result => {
          let ac = this.stateList.filter(x => x.Stateid == ID)[0];
          let index = this.stateList.indexOf(ac);
          this.stateList.splice(index, 1);
        }, (err) => {
          let ac = this.stateList.filter(x => x.Stateid == ID)[0];
          let index = this.stateList.indexOf(ac);
          this.stateList.splice(index, 1);
        });
        this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
      }

    });

  }
  addState() {
    this.router.navigateByUrl("layout/admin/state-list")
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




