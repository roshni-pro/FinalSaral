import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ClusterService } from 'app/shared/services/cluster.service';
import { SelectItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CityService } from 'app/shared/services/city.service';
import { VehiclesService } from 'app/shared/services/vehicles.service';

interface Vehicle {
  name: string,
  code: string
}
@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss']
})
export class AddvehicleComponent implements OnInit {
  dataselect: any[];
  VehicleID : any;
  @Input() VehicleId : any;
  @Input() ClusterId : any;
  @Input() WarehouseId : any;
  
  roleID: string;
  
  istree: any;
  treeData: any;
  childData: any;
  details: any;
  objRequest: any;
  selectedVehicle: any;//Vehicle[];
 requestData : any;
 
  isInvalid: boolean;

  // warehouseId : any;
  clusterId : any;

  vehicle :any;
  senddata: any;


  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  isDetails: boolean;
  blocked:boolean;

  constructor(private vehicleservice : VehiclesService, private clusterService : ClusterService, private messageService : MessageService,  private router : Router) { 

    this.istree = false;
    this.objRequest = [];
    //this.city = {};
    this.senddata = {};
  }

  ngOnInit() {

   
         this.clusterService.GetVehicleClusterWise(this.ClusterId,this.WarehouseId).subscribe(result => {
          console.log("Vehicles Are : ",result);
      this.dataselect = result;
      if(this.dataselect && this.dataselect.length > 0){
        this.objRequest.selectedVehicle = this.dataselect.filter(x => {return x.Selected == true}) 
      }
      console.log('dataselect : ', result);
    })

  }

  goToPage() {
   
    this.isdetailsclose.emit();
  }


  
  SaveData(selectedVehicle){
    console.log('cluster : ', this.ClusterId);
    console.log('selectedVehicle: ', selectedVehicle);

    this.senddata.ClusterId = this.ClusterId;
    this.senddata.VehicleID = this.objRequest.selectedVehicle;
    //this.selectedVehicle.ClusterId=this.ClusterId;
    
    this.selectedVehicle=selectedVehicle;
    this.selectedVehicle[0]={
      Selected: selectedVehicle[0].Selected,
       id:selectedVehicle[0].id,
       label: selectedVehicle[0].label,
      ClusterId:this.ClusterId
    };
    this.blocked = true;
    // this.clusterService.AddVehicles(this.senddata).subscribe(result => {
      
    this.clusterService.AddVehicles(selectedVehicle).subscribe(result => {
      

      this.dataselect = result;
      this.blocked = false;
    })
    this.router.navigateByUrl('/layout/warehouse/cluster');
    this.messageService.add({ severity: 'success', summary: 'Cluster Vehicle Updated Successfully!', detail: '' });
    //this.refreshParent.emit();
  }

}









// // // import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
// // // import { ClusterService } from 'app/shared/services/cluster.service';
// // // import { SelectItem, MessageService } from 'primeng/api';
// // // import { Router } from '@angular/router';
// // // import { CityService } from 'app/shared/services/city.service';
// // // import { VehiclesService } from 'app/shared/services/vehicles.service';

// // // interface Vehicle {
// // //   name: string,
// // //   code: string
// // // }
// // // @Component({
// // //   selector: 'app-addvehicle',
// // //   templateUrl: './addvehicle.component.html',
// // //   styleUrls: ['./addvehicle.component.scss']
// // // })
// // // export class AddvehicleComponent implements OnInit {
// // //   @Input() VehicleID: number;
// // //   vehicle : any;
// // //   dataselect : any;
// // //   isInvalid: boolean;
// // //   senddata: any;
// // //   VehicleId :any;
// // //   Active : boolean;
// // //   @Input() ClusterId: number;
 
// // //   @Output() refreshParent = new EventEmitter(); 
// // //   @Output() isdetailsclose = new EventEmitter<boolean>(); 
 

// // //   constructor(private vehicleservice : VehiclesService, private clusterService : ClusterService, private messageService : MessageService,  private router : Router) { this.vehicle = {}; 
// // //    this.senddata = {};}


// // //   ngOnInit() {
// // //         this.vehicleservice.GetAllVehicles().subscribe(result => {
// // //           
// // //           console.log("Vehicles Are : ",result);
// // //       this.dataselect = result;
// // //       console.log('dataselect : ', result);
// // //     })

// // //   }

// // //   goToPage() {
// // //     this.router.navigateByUrl('/layout/warehouse/cluster');
// // //   }


// // // //   saveRoleReq(){
// // // //     
// // // //     console.log(this.vehicle);
// // // //     if(this.VehicleID == null){
// // // //      this.clusterService.AddVehicles(this.vehicle).subscribe(result => {
// // // //       
// // // //       this.router.navigateByUrl('/layout/warehouse/cluster');
// // // //     },

// // // //     (err)=>{
// // // //     //  alert("error")
// // // //       this.messageService.add({severity:'error', summary: 'Error!', detail:''});
// // // //     });
// // // //   }
// // // // }  



// // // update(vehicleForm : any) {
 
// // //   
 
// // //   console.log(this.vehicle);
// // //   this.senddata.ClusterId = this.ClusterId;
// // //   this.senddata.VehicleId = this.vehicle.VehicleId;
// // //   this.senddata.Active = this.Active;

// // //   if(this.VehicleID == null){
// // //    this.clusterService.AddVehicles(this.vehicle).subscribe(result => {
// // //     
// // //     this.router.navigateByUrl('/layout/warehouse/cluster');
// // //   },

// // //   (err)=>{
  
// // //     this.messageService.add({severity:'error', summary: 'Error!', detail:''});
// // //   });
// // // }
// // // }  
// // // }
