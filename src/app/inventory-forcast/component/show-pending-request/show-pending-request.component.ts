import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';

@Component({
  selector: 'app-show-pending-request',
  templateUrl: './show-pending-request.component.html',
  styleUrls: ['./show-pending-request.component.scss']
})
export class ShowPendingRequestComponent implements OnInit {

  saleslist:any[]= [];
  selectdate:Date=null
  brandname:string=''
  constructor(private serv:InventoryforcastserService) { }

  ngOnInit() {
    this.salesIntentShow();
  }
  
salesIntentShow()
{
  let date = this.selectdate ? moment(this.selectdate).format('yyyy-MM-01') : null
  // this.serv.oldRequestSearch(this.brandname,date).subscribe((res)=>
  // {
  //   console.log(res);
  //   this.saleslist=res
  //   console.log(this.saleslist)
  // })
}
clear()
  {
    this.brandname=''
    this.selectdate=null
    this.salesIntentShow()
  }

}
