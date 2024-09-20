import { Component, OnInit } from '@angular/core';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  getDataList: any;
  blocked : boolean;
  OrderId : any;
  constructor(private pickerservice : PickerService,private router : Router,private route: ActivatedRoute,) { }

  ngOnInit() {
    this.OrderId = Number(this.route.snapshot.paramMap.get("OrderId"));
this.OrderId=88442;
this.blocked = true;
    this.pickerservice.GetItemOrder(this.OrderId).subscribe(x => {
      this.getDataList = x;
      this.blocked = false;
      console.log("getdataList:", this.getDataList)
      this.blocked = false;
      console.log('x:',x);
    });
  }

  OnCancel()
  {
    this.router.navigateByUrl("layout/picker/orderpicker");
  }

}
