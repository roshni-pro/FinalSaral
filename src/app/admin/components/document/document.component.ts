import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';

import { DocumentService } from 'app/shared/services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
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
export class DocumentComponent implements OnInit {
  docList: any[];
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
  activeFields: any[] = [{ field: 'DocumentName', label: 'Document Name' },
  { field: 'Doc_Point', label: 'Document Point' },
  { field: 'Active', label: 'Active Status' },
  { field: 'CreatedDate', label: 'Created Date' },
  { field: 'UpdatedDate', label: 'Updated Date' },];
  // pager: PagerDataV7;
  pageSize: number;
  constructor(private messageService: MessageService, private document: DocumentService, private router: Router, private modalService: NgbModal, private confirmationService: ConfirmationService) { this.isopen === false }
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
      { field: 'DocumentName', header: 'Document Name' },
      { field: 'Doc_Point', header: 'Document Point' },
      { field: 'Active', header: 'Active' },
      { field: 'CreatedDate', header: 'Created Date' }
    ];

    this.document.GetAllDocument().subscribe(result => {
      this.docList = result;
      console.log(this.docList);
    });
  }

  addDocument() {
    this.router.navigateByUrl("layout/admin/document-edit")
  }


  onDelete(document: any) {
    console.log('document', document);
    this.modalService.dismissAll("done");

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.document.DeleteDocument(document).subscribe(result => {
          let ac = this.docList.filter(x => x.DocumentId == document)[0];
          let index = this.docList.indexOf(ac);
          this.docList.splice(index, 1);
        });
        this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
      }
    });

  }


  openDetails(d, e) {
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
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