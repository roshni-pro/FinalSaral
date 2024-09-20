import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { resource } from 'selenium-webdriver/http';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-hub-transfer',
  templateUrl: './hub-transfer.component.html',
  styleUrls: ['./hub-transfer.component.scss']
})
export class HubTransferComponent implements OnInit {
  @Input() cityID: number
  @Input() customerid: number;
  warehouseList: any;
  @Input() Warehouseid: number;

  // Warehouseid: any = "null";
  Warehouseid1: any = "null";
  orderList: any[];
  Active: boolean = false;

  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  invalidform: boolean;
  constructor(private customerservice: CustomerService, private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {

    this.customerservice.getWareHouseByCity(this.cityID).subscribe(result => {
      this.warehouseList = result;
    })
    
    this.getOrders(this.Warehouseid);
  }
  getOrders(wID) {
    
    this.customerservice.getOrderForCustomer(this.customerid, wID).subscribe(result => {
      this.orderList = result;
      console.log(this.orderList)
    })
  }
  onTransfer(wId) {

    if (
      this.Warehouseid1 && this.Warehouseid1 != "null") {
      this.confirmationService.confirm({
        message: 'All offers and freebies will be remove from items on hub Change, Are you sure that you want to perform this action?',
        accept: () => {

          this.customerservice.HubtransferdataV2(this.customerid, this.Warehouseid, this.Warehouseid1).subscribe(result => {
            console.log(result);
            if (result == 'Please Select correct Hub!!') {
              // this.refreshParent.emit();
              // this.messageService.add({ severity: 'error', summary: result, detail: '' });
              this.messageService.add({ severity: 'error', summary: "orders not available for customer on this hub", detail: '' });

            } else {
              //  this.refreshParent.emit();
              //this.Warehouseid = null;
              this.Warehouseid = this.Warehouseid1;
               this.Warehouseid1 = null;
              this.messageService.add({ severity: 'success', summary: result, detail: '' });
            }
          },
            (err) => {
              this.messageService.add({ severity: 'error', summary: 'error', detail: '' });
              // this.refreshParent.emit();
            });
        }
      });
      this.invalidform = false;
    }
    else {
      this.invalidform = true;
      this.messageService.add({ severity: 'error', summary: 'pls select both warehouses', detail: '' });

    }
  }
}
