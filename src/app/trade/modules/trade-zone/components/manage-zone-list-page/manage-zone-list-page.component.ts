import { Component, OnInit } from '@angular/core';
import { TradeZoneService } from '../../services/trade-zone.service';
import { MessageService } from 'primeng/api';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';

@Component({
  selector: 'app-manage-zone-list-page',
  templateUrl: './manage-zone-list-page.component.html',
  styleUrls: ['./manage-zone-list-page.component.scss']
})
export class ManageZoneListPageComponent implements OnInit {
  zonesupplierList : any;
  blocked : boolean;
  supplierList : any;
  isSearch : boolean;
  isTable : boolean;
  isInvalid : boolean;
  CustomerId : any;
  listView : boolean;

  constructor(private tradeZoneService : TradeZoneService,private orderAssignmentsService : OrderAssignmentsService ,private messageService : MessageService) { }

  ngOnInit() {
    this.CustomerId = "";
    this.listView = false;
    // this.orderAssignmentsService.getSellerByName('').subscribe(x=>
    //   {
    //     this.supplierList = x;
    //   })
  }

  search(managezoneForm,CustomerId)
  {
    if(managezoneForm.form.status == 'VALID')
    {
    CustomerId = 1;
    this.blocked = true;
    this.tradeZoneService.tradeCustomerZone(CustomerId).subscribe(y=>
      {
        this.zonesupplierList = y;
        this.blocked = false;
        this.listView = true;
      });
      }else{
        this.isInvalid = true;
        this.messageService.add({ severity: 'error', summary: 'SupplierName is Required', detail: '' });
      }
  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if (this.isTable == true) {
        this.isTable = false;
      }
      this.isSearch = true;
    }
  }

}
