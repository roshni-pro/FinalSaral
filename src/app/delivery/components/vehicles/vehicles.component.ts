import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { VehiclesService } from 'app/shared/services/vehicles.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicleList: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [
    { field: 'VehicleName', label: 'Vehicle Name' },
    { field: 'VehicleNumber', label: 'Vehicle Number' },
    { field: 'Capacity', label: 'Vehicle Capacity' },
    { field: 'OwnerName', label: 'Owner Name' },
    { field: 'OwnerAddress', label: 'Vehicle Owner Address' },
    // { field: 'StateName', label: 'State' },
    { field: 'City', label: 'City' },

    { field: 'WarehouseName', label: 'Warehouse Name' },
    { field: 'isActive', label: 'Is Active' },
  ];
  closeResult: string;
  isopen: boolean;
  cols: any[];
  constructor(private modalService: NgbModal, private vehicleService: VehiclesService, private router: Router,
    private confirmationService: ConfirmationService) { }
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
      { field: 'VehicleName', header: 'Vehicle Name' },
      { field: 'VehicleNumber', header: 'Vehicle Number' },
      { field: 'City', header: 'City' },
      { field: 'OwnerName', header: 'Owner Name' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'isActive', header: 'Is Active' },
    ];

    this.vehicleService.GetAllVehicles().subscribe(result => {
      this.vehicleList = result;
      for (var i in this.vehicleList) {
        this.vehicleList[i].CreatedDate = this.vehicleList[i].CreatedDate ? moment(this.vehicleList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log(this.vehicleList);
      console.log(this.vehicleList.length)
    });
  }

  addVehicle() {
    this.router.navigateByUrl("/layout/delivery/add");
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
        this.vehicleService.DeleteVehicle(ID).subscribe(result => {
          let ac = this.vehicleList.filter(x => x.VehicleId == ID)[0];
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
