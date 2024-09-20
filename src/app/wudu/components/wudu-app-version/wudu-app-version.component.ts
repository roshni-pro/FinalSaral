import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { WuduService } from 'app/shared/services/wudu/wudu.service';


@Component({
  selector: 'app-wudu-app-version',
  templateUrl: './wudu-app-version.component.html',
  styleUrls: ['./wudu-app-version.component.scss']
})
export class WuduAppVersionComponent implements OnInit {


  wuDuAppVersionDc: any;
  appVersionData: any;
  currentApp_version: any;
  apptype: any;


  constructor(private WuduService: WuduService, private router: Router) {
    this.appVersionData = {};
    this.apptype = "";
  }

  ngOnInit() {

    if (this.apptype) {
      this.appVersionData = this.apptype;

    }
    this.WuduService.currentversion().subscribe(result => {
      
      console.log(result);
      this.currentApp_version = result;
      this.currentApp_version = this.currentApp_version.App_version;
      console.log("mhjj", this.currentApp_version)
    })

  }

  UpdateApp(wuDuAppVersionDc) {
    
    if (!this.appVersionData.App_version) {
      
      alert("Please enter version .");
      return false;
    }

    console.log(this.appVersionData);

    this.WuduService.updateversion(wuDuAppVersionDc).subscribe(result => {
      console.log(result);
      alert("version Updated   Successfully  ")
      window.location.reload();
    })
  }

}
