import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { VehiclesService } from 'app/shared/services/vehicles.service';
import { DeliveryBoyService } from 'app/shared/services/delivery-boy.service';


@Component({
  selector: 'app-delivery-boy',
  templateUrl: './delivery-boy.component.html',
  styleUrls: ['./delivery-boy.component.scss']
})
export class DeliveryBoyComponent implements OnInit {
  vehicleList: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [
    { field: 'DisplayName', label: 'Delivery Boy Name' },
    { field: 'VehicleNumber', label: 'Vehicle Number' },
    { field: 'Mobile', label: 'Mobile No.' },
    { field: 'Password', label: 'Password' },
    { field: 'Permissions', label: 'Permissions' },
    { field: 'city', label: 'City' },
    { field: 'state', label: 'State' },
    { field: 'Active', label: 'Is Active' },
  ];
  closeResult: string;
  isopen: boolean;
  cols: any[];
  constructor(private modalService: NgbModal, private vehicleService: VehiclesService, private router: Router, private deliveryBoyService: DeliveryBoyService, private confirmationService: ConfirmationService) { }
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
      { field: 'PeopleFirstName', header: 'First Name' },
      { field: 'PeopleLastName', header: 'Last Number' },
      { field: 'Mobile', header: 'Mobile Number' },
      { field: 'VehicleName', header: 'Vehicle Name' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'Active', header: 'Is Active' },
    ];

    this.deliveryBoyService.GetAllDeliveryBoy().subscribe(result => {
      this.vehicleList = result;
      for (var i in this.vehicleList) {
        this.vehicleList[i].CreatedDate = this.vehicleList[i].CreatedDate ? moment(this.vehicleList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log(this.vehicleList);
    });
  }

  addVehicle() {
    this.router.navigateByUrl("/layout/delivery/delivery-boy/add");
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
  }
  //  onDelete(t){
  //     this.vehicleService.DeleteVehicle(t).subscribe(result=>{
  //       this.modalService.dismissAll("done");
  //       this.ngOnInit();
  //     })
  //  }
  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deliveryBoyService.DeleteDeliveryBoy(ID).subscribe(result => {
          let ac = this.vehicleList.filter(x => x.PeopleID == ID)[0];
          let index = this.vehicleList.indexOf(ac);
          this.vehicleList.splice(index, 1);
        }, (err) => {

          let ac = this.vehicleList.filter(x => x.VehicleId == ID)[0];
          let index = this.vehicleList.indexOf(ac);
          this.vehicleList.splice(index, 1);
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
