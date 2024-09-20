import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { SupplierService } from 'app/shared/services/supplier.service';
import { CityService } from 'app/shared/services/city.service';
import { StateService } from 'app/shared/services/state.service';
import { DepotService } from 'app/shared/services/depot.service';



@Component({
  selector: 'app-depot-form',
  templateUrl: './depot-form.component.html',
  styleUrls: ['./depot-form.component.scss']
})
export class DepotFormComponent implements OnChanges {

  @Input() depotId : any;
  @Input()buyerList : any
  @Output() refreshParent = new EventEmitter<boolean>(); 
  @Output() closeForm = new EventEmitter<boolean>(); 
  isdepoId : boolean;
  selectedDepot: any;
  closeResult: string;
  states: any[];
  cities: any[];

  constructor(private modalService: NgbModal, private depotservice : DepotService, private supplierService: SupplierService,  private cityService: CityService, private stateService: StateService) { 
    this.selectedDepot = {};
  }
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

  ngOnChanges() {
    
    if(this.depotId !=null){
      this.isdepoId = true;
      $('#depotname').prop('disabled', true);
      $('#depotcode').prop('disabled', true);
      this.supplierService.GetDepoData(this.depotId).subscribe(result=> {
        this.selectedDepot = result;
        console.log(this.selectedDepot);
      });
    }else{
      this.isdepoId = false;
      $('#depotname').prop('disabled', false);
      $('#depotcode').prop('disabled', false);
      this.selectedDepot = {};
    }

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
  onclick(depot){
    if(this.selectedDepot != null){
      //put
      this.depotservice.PutDepo(depot).subscribe(result => {
        console.log('UPDATED, Huraah!!');
      });

    }else{
      //post
      this.depotservice.AddDepo(depot).subscribe(result => {
        console.log('ADDED Huraah!!');
      })

    }

    this.closeForm.emit(false);
  }

  onCancel() {
    this.closeForm.emit(false);
  }

}
 