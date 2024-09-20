import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { GetItemOrdersList } from 'app/shared/interface/picker/picker';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
@Component({
  selector: 'app-print-order-item',
  templateUrl: './print-order-item.component.html',
  styleUrls: ['./print-order-item.component.scss']
})
export class PrintOrderItemComponent implements OnInit {
 @Input()  orderIds: any;
GetItemOrdersList : GetItemOrdersList;
getDataList : any;
item:any;
blocked : boolean;
  constructor(private route: ActivatedRoute,private pickerservice: PickerService,private router : Router) { this.orderIds = []; }

  ngOnInit() {
    this.GetItemOrdersList = {
      orderid : null
    }
    this.orderIds =  Number(this.route.snapshot.paramMap.get("orderIds"));
    console.log('orderIds:ddd:',this.orderIds)
    console.log('GetItemOrdersList:ddd:',this.GetItemOrdersList)
  }
  printPage() {
    this.blocked = true;
    window.print();
    this.blocked = false;
  }

  showPage(){
    this.GetItemOrdersList.orderid =[ 88442, 88441, 88440 ];
    // this.GetItemOrdersList = {
    //   orderid : this.orderIds
    // }
    // this.GetItemOrdersList.orderid.push(this.orderIds);
    this.blocked = true;
    this.pickerservice.GetItemOrders(this.GetItemOrdersList).subscribe(x => {
      
      this.getDataList = x;      
      this.item = this.getDataList.Pickeritemlist;
      this.blocked = false;
    });
  }

  OnCancel()
  {
    this.router.navigateByUrl("layout/picker/orderpicker");
  }

}
