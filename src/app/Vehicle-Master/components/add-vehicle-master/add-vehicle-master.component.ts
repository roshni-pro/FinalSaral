import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vehicleMaster } from 'app/vehicle-master/interface/vehicle-masterdc';
import { VehicleMasterService } from 'app/vehicle-master/services/vehicle-master.service';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { CityService } from 'app/shared/services/city.service';

@Component({
  selector: 'app-add-vehicle-master',
  templateUrl: './add-vehicle-master.component.html',
  styleUrls: ['./add-vehicle-master.component.scss']
})
export class AddVehicleMasterComponent implements OnInit {
  data: any;
  registerFile: any;
  insuranceValidityFile: any;
  pucValidityFile: any;
  RegistrationImage: any;
  RegistrationImageBack:any;
  InsuranceImage: any;
  PUCimage: any;
  public imagePath;
  uploadedFiles: any;
  isInvalid: boolean = false;
  @Input() Id: any;
  baseURL: any;
  vehicleMaster: vehicleMaster;
  cityList: any;
  transportList: any;
  VehicleList: any;
  fleetdetailsid: any;
  VehicleTypeName: any;
  Result: boolean;
  message: string;
  Iseditable: boolean;
  isOpenVehicletype: boolean;
  blocked:boolean;
  warehouseList=[];
  constructor(private messageService: MessageService
    , private vehicleMasterService: VehicleMasterService
    , private route: ActivatedRoute
    , private router: Router,
    private pilotService: PepolePilotService,private cityService: CityService,private customerService:CustomerService) {
    this.data = {};
    this.baseURL = environment.apiURL;
  }

  ngOnInit() {
    this.blocked=true;
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.cityService.GetAllCity().subscribe(result => {
      this.cityList = result;
      this.blocked=false;

    })

    if (this.Id != 0) {
      this.vehicleMasterService.vehicleMasterbyId(this.Id).subscribe(res => {
        this.Iseditable = true;
        debugger;
        this.data = res.data;
        var wareid =res.data.WarehouseId;
        this.data.Warehouseid=wareid;
        this.getWarehouse(this.data.CityId);
        this.RegistrationImage =  this.data.RegistrationImage;
        this.RegistrationImageBack= this.data.RegistrationImageBack;
        this.InsuranceImage =  this.data.InsuranceImage;
        this.PUCimage =  this.data.PUCimage;
        this.data.PUCValidTill = moment(this.data.PUCValidTill).format('MM/DD/YYYY HH:mm:ss');
        this.data.InsuranceValidity = moment(this.data.InsuranceValidity).format('MM/DD/YYYY HH:mm:ss');
        // this.getTransportList(this.data.FleetType)
        this.getVehicleType(this.data.FleetId);
        this.blocked=false;
      });
    }
    this.data.FleetType = "";
    this.data.VehicleType = "";
    
  }

  // getTransportList(fleetType) {
  //   this.vehicleMasterService.gettransportList(fleetType).subscribe(result => {
  //     this.transportList = result;
  //   })
  // }
  getVehicleType(FleetMasterId) {
    this.vehicleMasterService.getVehicleList(FleetMasterId).subscribe(result => {
      this.VehicleList = result;
      // if (this.Id) {
      //   for (var j in this.VehicleList) {
      //     if (this.data.FleetId == this.VehicleList[j].Id) {
      //       this.data.VehicleType = this.VehicleList[j].VehicleType;
      //       this.data.fleetDetailid = this.VehicleList[j].Id;
      //     }
      //   }
      // } else {
      //   for (var j in this.VehicleList) {
      //     if (this.data.FleetId == this.VehicleList[j].Id) {
      //       this.data.VehicleType = this.VehicleList[j].VehicleType;
      //       this.data.fleetDetailid = this.VehicleList[j].Id;
      //     }
      //   }
      // }
    })
  }
  onSelectvehicle(args) {
    this.fleetdetailsid = this.data.VehicleType;
    this.data.VehicleType = args.target.options[args.target.selectedIndex].text;
  }
  uploadRegistrationFile(file: File[]) {
    this.registerFile = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      //this.imgURL = x;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }
  UploadRegistrationImage() {
    this.RegistrationImage=[];
    if (this.registerFile) {
      let formData = new FormData();
      formData.append('file', this.registerFile[0]);
      this.vehicleMasterService.uploadImage(formData).subscribe(x => {

        this.messageService.add({ severity: 'success', summary: 'Upload Successfully!', detail: '' });
        console.log('RegistrationImage', x);
        // this.RegistrationImage = this.baseURL + x;
        this.RegistrationImage = x;
      })
    }
  }
  uploadRegistrationFileBack(file:File[]){
    this.registerFile = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      //this.imgURL = x;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }
  UploadRegistrationImageBack(){
    if (this.registerFile) {
      let formData = new FormData();
      formData.append('file', this.registerFile[0]);
      this.vehicleMasterService.uploadImage(formData).subscribe(x => {
        this.messageService.add({ severity: 'success', summary: 'Upload Successfully!', detail: '' });
        console.log('RegistrationImageBack', x);
        // this.RegistrationImage = this.baseURL + x;
        this.RegistrationImageBack = x;
      })
    }
  }

  uploadInsuranceValidityFile(file: File[]) {
    this.insuranceValidityFile = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      //this.imgURL = x;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }


  UploadInsuranceVaildityImage() {
    if (this.insuranceValidityFile) {
      let formData = new FormData();
      formData.append('file', this.insuranceValidityFile[0]);
      this.vehicleMasterService.uploadImage(formData).subscribe(x => {

        this.messageService.add({ severity: 'success', summary: 'Upload Successfully!', detail: '' });
        // this.InsuranceImage = this.baseURL + x;
        this.InsuranceImage = x;
      })
    }
  }

  uploadPUCValidityFile(file: File[]) {
    this.pucValidityFile = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      //this.imgURL = x;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }
  UploadPUCValidityImage() {
    if (this.pucValidityFile) {
      let formData = new FormData();
      formData.append('file', this.pucValidityFile[0]);
      this.vehicleMasterService.uploadImage(formData).subscribe(x => {

        this.messageService.add({ severity: 'success', summary: 'Upload Successfully!', detail: '' });
        console.log('PUCimage', x);
        this.PUCimage =  x;
        // this.PUCimage = x;
      })
    }
  }

  save(data, vehicleForm) {
    debugger;
    this.blocked=true;
    if (vehicleForm.form.status == "VALID") {
      this.vehicleMaster =
      {
        Id: this.Id ? this.Id : 0,
        FleetType: data.FleetType,
        VehicleType: data.VehicleType,
        VehicleNo: data.VehicleNo,
        Model: data.Model,
        RegistrationNo: data.RegistrationNo,
        OwnerName: data.OwnerName,
        ChasisNo: data.ChasisNo,
        OwnershipType: data.OwnershipType,
        InsuranceNo: data.InsuranceNo,
        VehiclePermit: data.VehiclePermit,
        EngineNo: data.EngineNo,
        VehicleWeight: data.VehicleWeight,
        IsBlocked: true,
        PUCValidTill: data.PUCValidTill,
        RegistrationImage: this.RegistrationImage,
        RegistrationImageBack:this.RegistrationImageBack,
        InsuranceImage: this.InsuranceImage,
        PUCimage: this.PUCimage,
        CityId: data.CityId,
        InsuranceValidity: data.InsuranceValidity,
        MakerName: data.MakerName,
        FleetId: this.fleetdetailsid,
        Warehouseid: data.Warehouseid,
        PUCNo:data.PUCNo,
        // TripTypeEnum:data.TripTypeEnum
      }
      if (!this.Id) {
        this.vehicleMasterService.addFleetMaster(this.vehicleMaster).subscribe(x => {
          this.Result = x.Result;
          this.message = x.msg;
          if (this.Result) {
            this.blocked=false;
            this.messageService.add({ severity: 'success', summary: this.message, detail: '' });
            this.router.navigateByUrl('layout/vehicle/vehicle-master-List');
          } else {
            this.messageService.add({ severity: 'error', summary: this.message, detail: '' });
            this.blocked=false;
          }
        })
      }
      else {
        this.vehicleMasterService.editVehicleMaster(this.vehicleMaster).subscribe(x => {
          this.Result = x.Result;
          this.message = x.msg;
          if (this.Result) {
            this.blocked=false;
            this.messageService.add({ severity: 'success', summary: this.message, detail: '' });
            this.router.navigateByUrl('layout/vehicle/vehicle-master-List');
          } else {
            this.messageService.add({ severity: 'error', summary: this.message, detail: '' });
            this.blocked=false;
          }
        })
      }

    }
    else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
      this.blocked=false;
    }
  }
  backtoListPage() {
    this.router.navigateByUrl('layout/vehicle/vehicle-master-List');
  }

  EditVehicleType(data) {
    this.isOpenVehicletype = true;
    this.transportList = null;
   // this.getTransportList(this.data.FleetType);
    this.data.VehicleType =[];
    //this.getVehicleType(this.data.FleetId);
  }
  onSelectvehicleType(args) {
    this.fleetdetailsid = this.data.VehicleType;
    this.data.VehicleType = args.target.options[args.target.selectedIndex].text;
    this.isOpenVehicletype = false;
  }
  // cityid:any;s
  getWarehouse(cityid){
    debugger
    this.customerService.getWareHouseByCity(cityid).subscribe(x=>{
      this.warehouseList=x
      console.log(this.warehouseList,'list')

    })
  }
}

