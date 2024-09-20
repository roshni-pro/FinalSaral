import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VehiclesService } from 'app/shared/services/vehicles.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { Router } from '@angular/router';
import { DeliveryBoyService } from 'app/shared/services/delivery-boy.service';
import { AgentService } from 'app/shared/services/agent.service';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.scss']
})
export class AgentEditComponent implements OnInit {
  @Input() 
  details : any;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  deliveryBoyDetails : any;
  cityList: any;
  warehouseList: any;
  stateList : any;
  vehicleList:any;
  Id:any;
  agent:any;
  isInvalid:boolean;
    constructor(private agentService: AgentService,private deliveryBoyService : DeliveryBoyService, private vehicleService:VehiclesService, private pilotService:PepolePilotService,private router:Router) { this.deliveryBoyDetails = {};}
  
    ngOnInit() {
      console.log(this.details.PeopleID)
      // if(this.ID){
      //   this.deliveryBoyService.GetByID(this.ID).subscribe(result => {
      //     console.log(result)
      //     this.deliveryBoyDetails = result;
      //    console.log(this.deliveryBoyDetails);
      //   })
      //   }
        this.agentService.GetByID(this.details.AgentCode).subscribe(result=>{
          //this.agentMasterList=result;
          console.log(result);
        });
      // this.pilotService.City().subscribe(result => {
      //   this.cityList = result;
      // })
      // this.pilotService.Warehouse().subscribe(result => {
      //   this.warehouseList = result;
      // })
      // this.pilotService.States().subscribe(result => {
      //   this.stateList = result;
      // })
      // this.vehicleService.GetAllVehicles().subscribe(result => {
      //   this.vehicleList = result;
      // })
    }
    update(agentEditForm: any) {
      console.log('agentEditForm: ', agentEditForm);
      if (agentEditForm.form.status == "VALID") {
      if(this.Id == null){
      this.agentService.addAgent(this.agent).subscribe(result => {
        this.router.navigateByUrl('layout/admin/city')
       // this.expanded = false;
      },
      (err)=>{
        alert("error")
     
      });
    }else{
      this.agentService.UpdateAgent(this.agentService).subscribe(result => {
        console.log(this.Id);
        this.router.navigateByUrl('layout/admin/city')
       // this.expanded = false;
      },
      (err)=>{
        alert("error")
     
      });
    }
    
  }else{
    this.isInvalid = true;
  }
  
  
  }
  
  
  
  
  onCancel(){
    this.isdetailsclose.emit(false);
   this.router.navigateByUrl('layout/admin/agent')
 }
  }