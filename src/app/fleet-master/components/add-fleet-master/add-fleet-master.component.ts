import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetMaster, fleetMasterAccountDetails, fleetMasterDetails } from 'app/fleet-master/interface/fleet-masterdc';
import { FleetMasterService } from 'app/fleet-master/services/fleet-master.service';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-fleet-master',
  templateUrl: './add-fleet-master.component.html',
  styleUrls: ['./add-fleet-master.component.scss']
})
export class AddFleetMasterComponent implements OnInit {
  data : any;
  isOpen : boolean = false;
  vehicleDetail : fleetMasterDetails[]=[];
  showTable : boolean = false;
  fleetMasterdc : FleetMaster;
  isInvalid : boolean = false;
  isSearch: boolean = true;
  isTable: boolean = true;
  @Input() Id: any;
  isEditOpen : boolean = false;
  blocked:boolean;
  cityList:any;
  fleetAccountDetail:fleetMasterAccountDetails[]=[];
  warehouseList=[];
  constructor(private fleetMasterService  : FleetMasterService,private messageService: MessageService
    ,private route: ActivatedRoute, private confirmationService: ConfirmationService,private pilotService:PepolePilotService
    ,private router: Router, private customerService:CustomerService,private cityService: CityService) { this.data = {};}

  ngOnInit() {
    this.blocked=true;
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.cityService.GetAllCity().subscribe(result => {
      this.cityList = result;
      this.blocked=false;
    })
    if(this.Id != 0)
    {
      this.fleetMasterService.getfleetMasterbyId(this.Id).subscribe(res=>
        
        {
          this.isEditOpen = true;
          debugger
          this.data = res.data;
          var wareid =res.data.WarehouseId;
          this.data.Warehouseid=wareid;
          this.getWarehouse(this.data.CityId);
          this.data.ContractStart  = moment(this.data.ContractStart).format('MM/DD/YYYY HH:mm');
          this.data.ContractEnd  =  moment(this.data.ContractEnd).format('MM/DD/YYYY HH:mm');
          this.vehicleDetail = this.data.fleetMasterDetails;
          console.log('res:',res.data);
          this.showTable = true;
          this.blocked=false;
        });
    }

    this.data.FleetType ="";
    this.data.Channel  = "";
    this.data.OperatedBy ="";
    this.data.FreightDiscount  = "";
  }

  // addFleetMaster//
  addFleetMaster(fleetForm)
  {
    if (fleetForm.form.status == "VALID") {
      this.isSearch = false;
      // this.isOpen = true;
      this.showTable = false;
      console.log('addFleetMaster' , this.data);
    }else{
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }
  addFleetVehicleType(vehilclefleetForm,data)
  {
    // this.isInvalid = false;
    if (vehilclefleetForm.form.status == "VALID") {
      if(!this.Id)
      {
        this.isOpen = false;
        this.showTable = true;
        let obj : any ={
          Id :  this.data.Id ? this.data.Id : 0,
          FleetMasterId : this.data.FleetMasterId ? this.data.FleetMasterId : 0, 
          VehicleType : this.data.VehicleType,
          NoOfVehicle : this.data.NoOfVehicle,
          FixedCost : this.data.FixedCost,
          ExtraKmCharge : this.data.ExtraKmCharge,
          ExtraHrCharge : this.data.ExtraHrCharge,
          WaitingCharge : this.data.WaitingCharge,
          VehicleCapacity : this.data.VehicleCapacity,
          Make : this.data.Make,
          NonworkingDayAmt : this.data.NonworkingDayAmt,
          DistanceContract : this.data.DistanceContract,
          DaysContract : this.data.DaysContract,
          HrContract : this.data.HrContract,  
        }
        this.vehicleDetail.push(obj);
        this.data.VehicleType = "";
        this.data.NoOfVehicle = "";
        this.data.FixedCost = null;
        this.data.ExtraKmCharge = null;
        this.data.ExtraHrCharge = null;
        this.data.WaitingCharge = null;
        this.data.VehicleCapacity = null;
        this.data.Make = "";
        this.data.NonworkingDayAmt = null;
        this.data.DistanceContract = null;
        this.data.DaysContract = null;
        this.data.HrContract = null;
        console.log('addFleetVehicleType' , this.vehicleDetail);
        this.isInvalid = false;
      }
      else{
        this.isOpen = false;
        this.showTable = true;
        this.isSearch = false;
        data;
        for(var i in this.vehicleDetail)
        {
          if(this.vehicleDetail[i].Id == this.data.FleetDetailsId )
          {
            // this.vehicleDetail[i].Id :  this.data.Id ? this.data.Id : 0,
            this.vehicleDetail[i].FleetMasterId = this.data.FleetMasterId ? this.data.FleetMasterId : 0; 
            this.vehicleDetail[i].VehicleType = this.data.VehicleType;
            this.vehicleDetail[i].NoOfVehicle = this.data.NoOfVehicle;
            this.vehicleDetail[i].FixedCost = this.data.FixedCost;
            this.vehicleDetail[i].ExtraKmCharge = this.data.ExtraKmCharge;
            this.vehicleDetail[i].ExtraHrCharge = this.data.ExtraHrCharge;
            this.vehicleDetail[i].WaitingCharge = this.data.WaitingCharge;
            this.vehicleDetail[i].VehicleCapacity = this.data.VehicleCapacity;
            this.vehicleDetail[i].Make = this.data.Make;
            this.vehicleDetail[i].NonworkingDayAmt = this.data.NonworkingDayAmt;
            this.vehicleDetail[i].DistanceContract = this.data.DistanceContract;
            this.vehicleDetail[i].DaysContract = this.data.DaysContract;
            this.vehicleDetail[i].HrContract = this.data.HrContract;       
          }
          
        }
        // this.vehicleDetail = this.data;
      }
   }else{
        this.isInvalid = true;
        this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
      }
  }
  removeSelected(selecteditem)
  {
    if(this.Id == 0)
    {
      var b = this.vehicleDetail.findIndex(x => x.VehicleType == selecteditem.VehicleType);
      this.vehicleDetail.splice(b, b);
      if (this.vehicleDetail.length == 1 && b == 0) {
        this.vehicleDetail = [];
      }
    }
    else{
        
        var b = this.vehicleDetail.findIndex(x => x.Id == selecteditem.Id && x.FleetMasterId == selecteditem.FleetMasterId);
      this.vehicleDetail.splice(b, b);
      if (this.vehicleDetail.length == 1 && b == 0) {
        this.vehicleDetail = [];
      }
    }
  }

  editelected(selecteditem)
  {

    this.isSearch = false;
      this.isOpen = true;
      this.showTable = false;
      this.data.VehicleType = selecteditem.VehicleType;
      this.data.NoOfVehicle = selecteditem.NoOfVehicle;
      this.data.FixedCost = selecteditem.FixedCost;
      this.data.ExtraKmCharge = selecteditem.ExtraKmCharge;
      this.data.ExtraHrCharge = selecteditem.ExtraHrCharge;
      this.data.WaitingCharge = selecteditem.WaitingCharge;
      this.data.VehicleCapacity = selecteditem.VehicleCapacity;
      this.data.Make = selecteditem.Make;
      this.data.NonworkingDayAmt = selecteditem.NonworkingDayAmt;
      this.data.DistanceContract = selecteditem.DistanceContract;
      this.data.DaysContract = selecteditem.DaysContract;
      this.data.HrContract = selecteditem.HrContract;
      this.data.FleetDetailsId = selecteditem.Id;
  }
  saveFleetMaster(data)
  {
    this.blocked=true;
    this.fleetMasterdc = {
      Id: this.Id ? this.Id : 0,
      FleetType: data.FleetType,
      Channel: data.Channel,
      OperatedBy: data.OperatedBy,
      TransportName: data.TransportName,
      TransportAgentName: data.TransportAgentName,
      FreightDiscount: data.FreightDiscount,
      TollAmt: data.TollAmt,
      ContractStart: data.ContractStart,
      ContractEnd: data.ContractEnd,
      CityId: data.CityId,
      Warehouseid: data.Warehouseid,
      AadharImagePath:data.AadharImagePath,
      AadharNo:data.AadharNo,
      PanImagePath:data.PanImagePath,
      PanNo:data.PanNo,
      GSTIN:data.GSTIN,
      Address:data.Address,
      TransporterStateId:data.TransporterStateId,
      TransporterCityId:data.TransporterCityId,
      IsActive: data.IsActive ? true : false,
      IsBlocked: data.IsBlocked ? true : false,
      fleetMasterDetails: this.vehicleDetail,
      TransportAgentMobileNo: data.TransportAgentMobileNo,
      fleetMasterAccountDetailDc:this.fleetAccountDetail,
      AgreementPath:data.AgreementPath,
      MSMECertificatePath:data.MSMECertificatePath,
      IsMSME:data.IsMSME,

    }
    if(this.Id == 0)
    {
    this.fleetMasterService.addFleetMaster(this.fleetMasterdc).subscribe(x=>
      {
        // if(x.Status == true)
        // {
          this.blocked=false;
          this.messageService.add({ severity: 'success', summary: x, detail: '' });
          this.router.navigateByUrl('layout/fleetMaster/fleet-master-List');
        // }
      })
    }
    else{      
      this.fleetMasterService.updateFleetMaster(this.fleetMasterdc).subscribe(x=>
        {
          // if(x.Status == true)
          // {
            this.blocked=false;
            this.messageService.add({ severity: 'success', summary: x, detail: '' });
            this.router.navigateByUrl('layout/fleetMaster/fleet-master-List');
          // }
        })
    }
  }
  backToListPage()
  {
    this.router.navigateByUrl('layout/fleetMaster/fleet-master-List');
  }
  ActiveInactive(d)
  {
    this.data.IsActive=d.IsActive;
  }
  ActiveInactiveIsblocked(d){
    this.data.IsBlocked=d.IsBlocked;
  }

  getWarehouse(cityid){
    debugger
    this.customerService.getWareHouseByCity(cityid).subscribe(x=>{
      this.warehouseList=x
      console.log(this.warehouseList,'list')

    })
  }
}
