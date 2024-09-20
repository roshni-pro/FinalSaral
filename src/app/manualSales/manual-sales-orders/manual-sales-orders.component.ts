import { Component, OnInit } from '@angular/core';
import { ManualSalesService } from 'app/shared/services/manual-sales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manual-sales-orders',
  templateUrl: './manual-sales-orders.component.html',
  styleUrls: ['./manual-sales-orders.component.scss']
})
export class ManualSalesOrdersComponent implements OnInit {

  Itemlist: any[];
  cols: any[];
  isOpenPopup: boolean;
  itemdatass: any[];
  colsv1: any[];
  popupdata: any;
  blocked: boolean;


  constructor(
    private manualSalesService: ManualSalesService,
    private modalService: NgbModal,
    private router: Router) {

    this.Itemlist = [];
    this.popupdata = {};
  }

  ngOnInit() {
    this.blocked = true;
    this.cols = [
      { field: 'DisplayName', header: ' Display Name' },
      { field: 'Email', header: 'Seller Email' },
      { field: 'Mobile', header: 'Seller Mobile' },
      { field: 'Name', header: 'Buyer Name' },
      { field: 'MobileNo', header: 'Buyer Mobile' },
      { field: 'Address', header: 'Buyer Address' },
      { field: 'Discription', header: 'Description' },
      { field: 'PaymentThrough', header: 'Mode of Payment' },
      { field: 'TotalOrderAmount', header: 'Total Order Amount' },
      { field: 'Actions', header: 'Actions', bool: true }
    ];
    this.colsv1 = [
      { field: 'ItemName', header: 'Item Name' },
      { field: 'Qty', header: 'Quantity' },
      { field: 'UnitPrice', header: 'Unit Price ' },
      { field: 'Percentage', header: 'Percentage%' },
      { field: 'TotalWithOutTaxAmount', header: 'Amount Without Tax' },
      { field: 'TotalAmount', header: 'Total Amount' },
    ];
    this.manualSalesService.getAll().subscribe(res => {
      this.Itemlist = res;
      console.log(this.Itemlist)
      this.blocked = false;
    })



  }

  goToAddOrderM() {
    this.router.navigateByUrl('layout/manualSales/add-manual-sales-orders');
  }

  Action(rowData) {
    console.log("rowdata", rowData);
    this.popupdata = rowData;
    this.itemdatass = rowData.manualSalesDetails;

    this.isOpenPopup = true;

  }

  printPage() {
    window.print();
  }


}
