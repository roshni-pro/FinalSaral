import { Component, OnInit } from '@angular/core';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Router } from '@angular/router';
import { FullLayoutComponent } from 'app/layouts/full/full-layout.component';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-warehouse-selection',
  templateUrl: './warehouse-selection.component.html',
  styleUrls: ['./warehouse-selection.component.scss']
})
export class WarehouseSelectionComponent implements OnInit {
  warehouseids : any;
  warehouses : any;
  SelectedWarehouse : any
  constructor(private userService : UserService, private WarehouseService: WarehouseService,private PepolePilotService: PepolePilotService,private router: Router) { }

  ngOnInit() {
    
    // console.log(localStorage.getItem('tokenData'));
    this.warehouseids= localStorage.getItem('warehouseids');
    if( this.warehouseids){
    this.warehouseids = this.warehouseids.split(',').map(Number);
  
    this.WarehouseService.GetWarehouses().subscribe(result=>{
      this.warehouses = result.filter(f => this.warehouseids.includes(f.WarehouseId))

    })
  }
  }
  onCheckBoxChange(j){
    console.log(j)
    for (var i in this.warehouses) {
      if (this.warehouses[i].WarehouseId == j.WarehouseId) {
        this.warehouses[i].Selected = j.Selected;
        j.Selected =  j.Selected;
        this.SelectedWarehouse = this.warehouses[i];
      } else {
        this.warehouses[i].Selected = false;
      }
    }
  }

  onSave(){
    console.log(this.SelectedWarehouse);
    if( this.SelectedWarehouse != undefined ){
      // var data = JSON.parse( localStorage.getItem('tokenData'));
      var userid = localStorage.getItem("userid")//parseInt(data.userid)
      var uName = localStorage.getItem("userName");
      this.PepolePilotService.PeopleGetByID(parseInt(userid)).subscribe(result=>{
        console.log(result);
        var password = result.Password;
        var userName = uName;
        var wID = this.SelectedWarehouse.WarehouseId
        this.userService.userAuthentication(userName, password , wID).subscribe((data: any) => {
            if(data){
              localStorage.setItem('tokenData', JSON.stringify(data));
              localStorage.setItem('userToken', data.access_token);
              localStorage.setItem('Warehouseid', data.Warehouseid);
               this.router.navigate(['layout']);
              //window.location.replace('http://localhost:26265/#/DashboardReport');
            }
        })
      })
      // localStorage.setItem('warehouseids', this.SelectedWarehouse.WarehouseId);
      // this.WarehouseService.ChangeWarehouseID(this.SelectedWarehouse.WarehouseId).subscribe(result => {
      //   console.log(result);
        
      // })

      // this.userService.userAuthentication(this.userName, this.password).subscribe((data: any) => {
     // this.router.navigate(['layout']);
    }else{
      alert("alert")
    }
  }
}
