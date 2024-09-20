import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaxMasterService } from 'app/shared/services/tax-master.service';
import { Router } from '@angular/router';
import { VehiclesService } from 'app/shared/services/vehicles.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { CustomerService } from 'app/shared/services/customer.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  @Input() vehicleID : any
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  vehicle : any
  cityList: any;
  warehouseList: any;
  stateList : any;
  constructor(private vehicleService:VehiclesService,private customerservice : CustomerService, private pilotService:PepolePilotService,private router:Router) { this.vehicle = {}}

  ngOnInit() {
    if(this.vehicleID){
      this.vehicleService.GetByID(this.vehicleID).subscribe(result => {
        this.vehicle = result;
       console.log(this.vehicle);
       if (this.vehicle.Stateid ) {
        this.pilotService.City().subscribe(result => {
          // this.cityList = result;
          this.cityList =  result.filter(x => x.Stateid == this.vehicle.Stateid);
        });
        if (this.vehicle.Cityid ) {
          this.customerservice.getWareHouseByCity(this.vehicle.Cityid).subscribe(result=>{
            this.warehouseList = result;
          })
       
        }
      
      }
      })
      }
     

      // this.pilotService.City().subscribe(result => {
      //   this.cityList = result;
      // })
      // this.pilotService.Warehouse().subscribe(result => {
      //   this.warehouseList = result;
      // })
      this.pilotService.States().subscribe(result => {
        this.stateList = result;
      })
  }
  onStateChange(id , type) {
    console.log(id);
    console.log(name);
    if (type=='state') {
      this.pilotService.City().subscribe(result => {
            // this.cityList = result;
            this.cityList =  result.filter(x => x.Stateid == id);
      });
    }
    if (type=='city') {
          this.customerservice.getWareHouseByCity(id).subscribe(result=>{
            this.warehouseList = result;
            console.log(this.warehouseList)
          })
        }
      
  }
  onclick(){
    if(this.vehicleID == null){
      this.vehicleService.addVehicle(this.vehicle).subscribe(result => {
        this.router.navigateByUrl('/layout/delivery/vehicles')
       // this.expanded = false;
      },
      (err)=>{
        alert("error")
     
      });
    }else{
      this.vehicleService.UpdateVehicle(this.vehicle).subscribe(result => {
        console.log(this.vehicle);
        this.refreshParent.emit(false);
       
       // this.expanded = false;
      },
      (err)=>{
        alert("error")
     
      });
    }
  }

  onCancel(){
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/delivery/vehicles')
   
  }
}
