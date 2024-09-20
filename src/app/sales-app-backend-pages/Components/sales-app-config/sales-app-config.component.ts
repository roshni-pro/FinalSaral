import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-app-config',
  templateUrl: './sales-app-config.component.html',
  styleUrls: ['./sales-app-config.component.scss']
})
export class SalesAppConfigComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  activeIndex:any
  ngOnInit() {
    // this.route.queryParamMap.subscribe(params => {
    //   this.activeIndex = params.get('m');
    // });
    this.activeIndex = this.route.snapshot.queryParams.tab;
  }

  abc :boolean=false

  addItem(newItem: boolean) {
    this.abc=newItem;    
  }
  
  IsSalesAttendance :boolean=false
  changeSalesAttComponent(value: boolean) {
    this.IsSalesAttendance=value;    
  }

  event:any
  currentTab:number
  onTabChange(event) 
  {     
    this.currentTab=event
    console.log("currentTab",this.currentTab);
  }  
}
