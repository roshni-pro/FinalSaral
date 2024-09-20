import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { SupplierCategoryService } from 'app/shared/services/suppliercategory.service';
import { CityService } from 'app/shared/services/city.service';
import { StateService } from 'app/shared/services/state.service';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
import { ManualSalesService } from 'app/shared/services/manual-sales.service';
import { ToastrComponentlessModule } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-add-manual-sales-order',
  templateUrl: './add-manual-sales-order.component.html',
  styleUrls: ['./add-manual-sales-order.component.scss'],
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


export class AddManualSalesOrderComponent {
  finalsupplier: any;
  @Input() id: any;
  @Input() buyerList: any
  @Output() refreshParent = new EventEmitter<boolean>();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  closeResult: string;
  NewOrder: any;
  NewOrderDetailsView: any[];
  cols: any;
  newOrderDetails: any;
  totalamount: any[];
  finalamount: any;
  Number: any;
  msoDC: any;
  blocked: boolean;
  isInvalid: boolean;
  constructor(private messageService: MessageService, private manualSalesService: ManualSalesService, private modalService: NgbModal, private router: Router) {
    this.NewOrder = {};
    this.newOrderDetails = {};
    this.NewOrderDetailsView = [];
    this.msoDC = {
      manualSalesDetails: []
    };

  }
  display: boolean = false;
  displayCheckbox: boolean;


  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

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

    this.blocked=true;

    this.cols = [
      { field: 'ItemName', header: 'Item Name' },
      { field: 'UnitPrice', header: 'Unit Price' },
      { field: 'Qty', header: 'Quantity' },
      { field: 'TotalWithOutTaxAmount', header: 'TotalWithoutTaxAmount' },
      { field: 'Percentage', header: 'Percentage %' },
      { field: 'TotalAmount', header: 'Total Amount' }



    ];
    this.blocked=false;



  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  AddItemsTolist(testFormV1: any) {
    

    this.blocked=true;
    if (testFormV1.form.status == "VALID") {

      if (this.newOrderDetails.Qty > 0 && this.newOrderDetails.UnitPrice > 0 && this.newOrderDetails.Percentage >= 0) {

        this.newOrderDetails.TotalWithOutTaxAmount = this.newOrderDetails.Qty * this.newOrderDetails.UnitPrice;
        this.Number = (this.newOrderDetails.Percentage * this.newOrderDetails.TotalWithOutTaxAmount) / 100;
        this.newOrderDetails.TotalAmount = this.newOrderDetails.TotalWithOutTaxAmount + this.Number;
        this.NewOrderDetailsView.push(this.newOrderDetails)
        this.finalamount = 0
        this.NewOrderDetailsView.forEach(element => {
          console.log(element)
          this.finalamount = this.finalamount + element.TotalAmount;
        });
        console.log(this.newOrderDetails.completeAmount);
        console.log(this.NewOrderDetailsView);

        console.log(" this.finalamount", this.finalamount)
        this.newOrderDetails = {};


      } else {

        this.newOrderDetails = {};
        this.messageService.add({ severity: 'error', summary: 'No negative values', detail: '' });



      }



    } else {
      this.newOrderDetails = {};

      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields! ', detail: '' });



    }

    this.blocked=false;

  }



  onSave(testForm: any) {

    this.blocked=true;
    
    if (testForm.form.status == "VALID") {

      if (this.NewOrderDetailsView.length > 0) {

        this.NewOrder.TotalOrderAmount = this.finalamount
        this.msoDC = this.NewOrder;
        this.msoDC.manualSalesDetails = this.NewOrderDetailsView;

        console.log("order details", this.NewOrder);
        console.log("order item list", this.NewOrderDetailsView);
        console.log("Final Send", this.msoDC);
        this.manualSalesService.PostOrder(this.msoDC).subscribe(res => {
          console.log("res", res);
          if(res="done")
{
alert("Save Succesfully");

}


          this.blocked=false;
          this.messageService.add({ severity: 'Success', summary: 'Order added ', detail: '' });
          this.router.navigateByUrl('/layout/manualSales/manual-sales-orders');
          
        })
      } else {
        this.blocked=false;
        this.isInvalid = true;
        this.messageService.add({ severity: 'error', summary: 'Please add atlest one item ', detail: '' });
      }
    } else {
      this.blocked=false;
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }




  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/manualSales/manual-sales-orders')
  }

}


