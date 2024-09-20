import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';

@Component({
  selector: 'app-trade-app-version',
  templateUrl: './trade-app-version.component.html',
  styleUrls: ['./trade-app-version.component.scss']
})
export class TradeAppVersionComponent implements OnInit {


  TradeAppVersionDc: any;
  appVersionData: any;
  currentApp_version:any;
  apptype:any;
 
 

  constructor(private TradeCustomerService: TradeCustomerService, private router: Router) {
    this.appVersionData = {};
    this.apptype="";

  }

  ngOnInit() {
    
    if(this.apptype){
      this.appVersionData = this.apptype;
      
    }
    this.TradeCustomerService.currentversion().subscribe(result => {
      //console.log(result);
      this.currentApp_version = result;
      this.currentApp_version =  this.currentApp_version.App_version;
      console.log("mhjj", this.currentApp_version)
    })

  }

  UpdateApp(TradeAppVersionDc) {
    
    if (!this.appVersionData.App_version ) {
      
      alert("Please enter version .");
      return false;
    }
  
    console.log(this.appVersionData);
    
    this.TradeCustomerService.updateversion(TradeAppVersionDc).subscribe(result => {
      console.log(result);
      alert("version Updated   Successfully  ")
      this.router.navigateByUrl('layout/trade/trade-app-version')
    })
  }

}
