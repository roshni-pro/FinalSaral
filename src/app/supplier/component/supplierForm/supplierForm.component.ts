import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { SupplierCategoryService } from 'app/shared/services/suppliercategory.service';
import { CityService } from 'app/shared/services/city.service';
import { StateService } from 'app/shared/services/state.service';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';

declare var $: any;

@Component({
  selector: 'app-supplierForm',
  templateUrl: './supplierForm.component.html',
  styleUrls: ['./supplierForm.component.scss'],
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


export class SupplierFormComponent  {
  finalsupplier: any;
  @Input() id : any;
  @Input()buyerList : any
  @Output() refreshParent = new EventEmitter<boolean>(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  closeResult: string;
  newSupplier : any;
  supplierCategoryList: any[];
  cities: any[];
  states: any[];
isInvalid:any;
  constructor(private messageService: MessageService ,private supplierService: SupplierService, private modalService: NgbModal, private router: Router, private supplierCategoryService: SupplierCategoryService, private cityService: CityService, private stateService: StateService ) { 
    this.newSupplier = {};
  }
  display: boolean = false;
  displayCheckbox : boolean;


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
    this.isInvalid=false;
    if(this.id){
        this.supplierService.GetByID(this.id).subscribe(result=> {
          this.newSupplier = result;
        });
    }

    this.supplierCategoryService.GetSupplierCategory().subscribe(result =>{
      this.supplierCategoryList = result;
      console.log(this.supplierCategoryList);
    });

    this.stateService.GetAllState().subscribe(results => {
      this.states = results;
    });
    
    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
    });
  }
  // saveSupplier(supplier){
  //   this.supplierService.PutSupplier(supplier);
  // }
  onclick(supplier,testForm){
    if(testForm.form.status == "VALID"){
    if(this.id != null){
      //put
      this.supplierService.PutSupplier(supplier).subscribe(result=> {
        this.refreshParent.emit(false);
        console.log(result);
      });

    }else{
      //post
      this.supplierService.PostSupplier(supplier).subscribe(result=> {
        console.log(result);
      })
    }
    this.router.navigateByUrl('layout/supplier/supplier');    
    console.log(supplier);
  }else{
    this.isInvalid = true;
    this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
  }
}

  verificationCheck(){
      if ($('.check:checked').length == $('.check').length) {
          console.log("done");
          this.displayCheckbox = true;
      }else{
        this.displayCheckbox = false;
      };
    //Verification Checkbox Code Ends    
  }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/supplier/supplier')
  }

}


