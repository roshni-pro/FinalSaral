import { Component, OnInit, Input, EventEmitter, Output, Pipe, PipeTransform } from '@angular/core';
import { VehiclesService } from 'app/shared/services/vehicles.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { Router } from '@angular/router';
import { DeliveryBoyService } from 'app/shared/services/delivery-boy.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-delivery-boy',
  templateUrl: './add-delivery-boy.component.html',
  styleUrls: ['./add-delivery-boy.component.scss']
})
@Pipe({
  name: 'filter'
})
export class AddDeliveryBoyComponent implements OnInit,PipeTransform  {
  transform(value: any, field: string, input: string) {
    if (input !== undefined && input.length >= 2) {
      input = input.toLowerCase();
      if (typeof value[0] === 'string') {
        return value.filter(function(el: any) {
          return el.toLowerCase().indexOf(input) > -1;
        });
      }
      return value.filter(function(el: any) {
        return el[field].toLowerCase().indexOf(input) > -1;
      });
    }
    return value;
  }
  @Input() ID: any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  deliveryBoyDetails: any;
  cityList: any;
  warehouseList: any;
  stateList: any;
  vehicleList: any
  isCity: any;
  isVehicle: any;
  isWarehouse: any;
  agentList : any;
  isInvalid: boolean;
  constructor(private messageService: MessageService ,private deliveryBoyService: DeliveryBoyService, private vehicleService: VehiclesService,private customerservice:CustomerService, private pilotService: PepolePilotService, private router: Router) {
    this.deliveryBoyDetails = {};
    this.isCity = false;
    this.isWarehouse = false;
    this.isVehicle = false;
  }

  ngOnInit() {
    this.isInvalid = false;
    console.log(this.ID)
    if (this.ID) {
      this.deliveryBoyDetails = this.ID;
      console.log(this.deliveryBoyDetails)
      this.isCity = true;
      this.isWarehouse = true;
      this.isVehicle = true;

      if (this.deliveryBoyDetails.Stateid ) {
        this.pilotService.City().subscribe(result => {
          this.isCity = true;
          this.cityList = result;
        });
        if (this.deliveryBoyDetails.Cityid ) {
          this.customerservice.getWareHouseByCity(this.deliveryBoyDetails.Cityid).subscribe(result=>{
            this.isWarehouse = true
            this.warehouseList = result;
            console.log(this.warehouseList)
          })
          if (this.deliveryBoyDetails.WarehouseId) {
            this.vehicleService.GetAllVehicles().subscribe(result => {
              this.isVehicle = true;
              this.vehicleList = result;
            });
          }
          else{
            this.isVehicle = false;
          }
        }
        else{
          this.isWarehouse = false;
          this.isVehicle = false;
        }
      }
      else{
        this.isCity = false;
        this.isWarehouse = false;
        this.isVehicle = false;
      }
      // this.deliveryBoyService.GetByID(this.ID).subscribe(result => {
      //   console.log(result)
      //   this.deliveryBoyDetails = result;
      //  console.log(this.deliveryBoyDetails);
      // })
    }
    this.deliveryBoyService.getAjent().subscribe(result=>{
      this.agentList = result;
    })
    // this.pilotService.City().subscribe(result => {
    //   this.cityList = result;
    // })
    // this.pilotService.Warehouse().subscribe(result => {
    //   this.warehouseList = result;
    // })
    this.pilotService.States().subscribe(result => {
      this.stateList = result;
      //   if(this.deliveryBoyDetails.Stateid){
      //   this.pilotService.City().subscribe(result => {
      //     this.isCity = true;
      //     this.cityList = result;
      //     if(this.deliveryBoyDetails.Cityid){
      //     this.pilotService.Warehouse().subscribe(result => {
      //       this.isWarehouse = true
      //       this.warehouseList = result;
      //       if(this.deliveryBoyDetails.WarehouseId){
      //       this.vehicleService.GetAllVehicles().subscribe(result => {
      //         this.isVehicle = true;
      //         this.vehicleList = result;
      //       })
      //     }
      //     })
      //   }
      //   })
      // }
    })
    // this.vehicleService.GetAllVehicles().subscribe(result => {
    //   this.vehicleList = result;
    // })
  }
  onStateChange(id , name) {
    console.log(id);
    console.log(name);
    if (this.deliveryBoyDetails.Stateid && name == "state") {
      this.pilotService.City().subscribe(result => {
            this.isCity = true;
            this.cityList =  result.filter(x => x.Stateid == id);
      });
    }
      if (name === "city") {
          this.customerservice.getWareHouseByCity(id).subscribe(result=>{
            this.isWarehouse = true
            this.warehouseList = result;
            console.log(this.warehouseList)
          })
        }
          // this.warehouseList = result;
   
        if (this.deliveryBoyDetails.WarehouseId  && name == "warehouse") {
          this.vehicleService.GetAllVehicles().subscribe(result => {
            this.isVehicle = true;
            this.vehicleList = result;
          });
        }
      
  }
  onclick(testForm) {
    if (testForm.form.status == "VALID") {
    if (this.ID == null) {
      if(this.deliveryBoyDetails.Active){
      this.deliveryBoyService.addDeliveryBoy(this.deliveryBoyDetails).subscribe(result => {
        console.log(result);
        this.messageService.add({severity:'success', summary: 'Successfully Added', detail:''});
        this.router.navigateByUrl('/layout/delivery/delivery-boy')
        // this.expanded = false;
      },
        (err) => {
          alert("error")

        });
      }else{
        this.messageService.add({severity:'error', summary: 'Please Check Active Delivery Boy!', detail:''});
      }
    } else {
      this.deliveryBoyService.UpdateDeliveryBoy(this.deliveryBoyDetails).subscribe(result => {
        console.log(this.deliveryBoyDetails);
        this.refreshParent.emit();

        // this.expanded = false;
      },
        (err) => {
          alert("error")

        });
    }
  }else{
    this.isInvalid = true;
    this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
  }
  }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/delivery/delivery-boy')

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
