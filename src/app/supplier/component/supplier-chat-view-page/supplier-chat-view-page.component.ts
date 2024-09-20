import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-supplier-chat-view-page',
  templateUrl: './supplier-chat-view-page.component.html',
  styleUrls: ['./supplier-chat-view-page.component.scss']
})
export class SupplierChatViewPageComponent implements OnInit {

  supplierList: any[];
  selectedSupplier: any;
  cols: any[];
  closeResult: string;
  isDetails: boolean;

  constructor(private supplierService: SupplierService, private modalService: NgbModal, private router: Router) { }

  display: boolean = false;
  selectedSupplierDetails: any;
  activeFields: any[] = [{ field: 'Name', label: 'Supplier Name' }, { field: 'SUPPLIERCODES', label: 'Supplier Code' }, { field: 'TINNo', label: 'TIN NO.' },  { field: 'EmailId', label: 'Email ID' }, { field: 'MobileNo', label: 'Mobile No.' },{ field: 'CreatedDate', label: 'Created Date' }, { field: 'Active', label: 'Active Status' }, { field: 'BillingAddress', label: 'Billing Address' }, { field: 'Bank_AC_No', label: 'Account No.' }, { field: 'Bank_Ifsc', label: 'Bank IFSC Code' }, { field: 'Bank_Name', label: 'Name Of Bank' }];
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

    this.isDetails = false;
    this.cols = [
      { field: 'Name', header: 'Supplier Name', width: '20%', bool: false },
      { field: 'SUPPLIERCODES', header: 'Supplier Code', width: '10%', bool: false },
      { field: 'MobileNo', header: 'Mobile Phone', width: '15%', bool: false },
      { field: 'EmailId', header: 'Email', width: '25%', bool: false },

    ];

    this.supplierService.GetAll().subscribe(result => {
      console.log(result);
      this.supplierList = result;
      for (var i in this.supplierList) {
        this.supplierList[i].CreatedDate = this.supplierList[i].CreatedDate ? moment(this.supplierList[i].CreatedDate).format('DD/MM/YYYY') : null
        this.supplierList[i].DataOfJoin = this.supplierList[i].DataOfJoin ? moment(this.supplierList[i].DataOfJoin).format('DD/MM/YYYY') : null
        this.supplierList[i].DOB = this.supplierList[i].DOB ? moment(this.supplierList[i].DOB).format('DD/MM/YYYY') : null
      }
    });





  }




  openDetails(d, e) {
    this.selectedSupplierDetails = d;
    if (this.selectedSupplier != undefined) {
      this.selectedSupplier.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
    this.selectedSupplier = e;
    
    if(this.selectedSupplier.path){
      this.selectedSupplier.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedSupplier)
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedSupplier.path){
      this.selectedSupplier.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

}
