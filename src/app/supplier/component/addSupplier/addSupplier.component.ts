import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SupplierService } from 'app/shared/services/supplier.service';
import { SupplierFormComponent } from 'app/supplier/component/supplierForm/supplierForm.component';
import {DialogModule} from 'primeng/dialog';
import * as moment from 'moment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare var $: any;

@Component({
  selector: 'app-addSupplier',
  templateUrl: './addSupplier.component.html',
  styleUrls: ['./addSupplier.component.scss'],
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


export class AddSupplierComponent implements OnInit {
  supplierList: any[];
  cols: any[];
  closeResult: string;

  constructor(private supplierService: SupplierService, private modalService: NgbModal) { }
  display: boolean = false;


  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

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
    
  }

  onDelete(people: any) {
    console.log('people', people);
    this.modalService.dismissAll("done");
  }

}


