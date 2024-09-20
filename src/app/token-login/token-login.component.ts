import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import * as tslib_1 from "tslib"
import { EntityHistoryService } from 'app/shared/services/entity-history.service';
@Component({
  selector: 'app-token-login',
  templateUrl: './token-login.component.html',
  styleUrls: ['./token-login.component.scss']
})
export class TokenLoginComponent implements OnInit {
  redirecURL: string;
  token: any;
  constructor(private router: Router, private route: ActivatedRoute,private WarehouseService: WarehouseService,private peoplePilot : PepolePilotService
    ,private entityHistoryService : EntityHistoryService) {
   
    console.log(this.route.params);
    this.route.params.subscribe(params => {
      console.log("params" , params)
      this.redirecURL = params.redirectURL;
      // this.token = JSON.parse(params.token) ;
      // console.log(this.token)
      localStorage.setItem('userToken', params.token);
      localStorage.setItem('warehouseids', params.Warehouseids);
      localStorage.setItem('userid', params.userid);
      localStorage.setItem('userName', params.userName);
      localStorage.setItem('Warehouseid', params.Warehouseid);
      // localStorage.setItem('tokenData', JSON.stringify(this.token));
      this.redirecURL  =  this.redirecURL.replace(/---/g, '/'); 
      console.log(this.redirecURL);
      console.log("+++++++++++++" , params.Warehouseids);
      this.router.navigateByUrl(this.redirecURL);
    });
    this.peoplePilot.GetUserRole().subscribe(result=>{
      localStorage.setItem('role',result);
    })
    let userid = localStorage.getItem('userid');
    debugger;
    if(Number.parseInt(userid) > 0)
    {
      this.entityHistoryService.angularPageList(userid).subscribe(x=>
        {
            localStorage.setItem("AllPageListDC", JSON.stringify(x.AllPageListDC));
            localStorage.setItem("AssignedPageListDc", JSON.stringify(x.AssignedPageListDc));
        })
    }
    
  }

  ngOnInit() {
  //   var warehouseids = localStorage.getItem('warehouseids');
  //   console.log("warehouseids");
  //   console.log(warehouseids);
  //   if(!warehouseids){
  //   this.WarehouseService.GetMultipleWarehouses().subscribe(result=>{
  //     // var wid = result.map(x => x.WarehouseId)
  //     // var a  = wid.toString();
  //     localStorage.setItem('warehouseids', result);
  //   })
  // };
  }

}
