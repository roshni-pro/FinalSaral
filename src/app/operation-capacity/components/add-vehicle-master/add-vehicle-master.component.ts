import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vehicleMaster } from 'app/vehicle-master/interface/vehicle-masterdc';
import { VehicleMasterService } from 'app/vehicle-master/services/vehicle-master.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  rangeDates:any;
  minDate: Date;
  maxDate: Date;
  fleetType : any;
  FleetMasterId:any;
  thresholdkgList:any[]
  selectedthresholdkg:any;
  warehouseids : any;
  constructor(private messageService: MessageService
    , private vehicleMasterService: VehicleMasterService
    , private route: ActivatedRoute
    , private router: Router,
    private pilotService: PepolePilotService,private cityService: CityService,private customerService:CustomerService
    , private confirmationService: ConfirmationService) {
    this.data = {};
    this.baseURL = environment.apiURL;
  }

  ngOnInit() {
    this.getThresholdkgList();
    this.blocked=true;
    this.data.CityId="";
    this.data.Warehouseid="";
    this.data.transportId="";
    this.data.OwnershipType="";
    // this.data.TripTypeEnum="";
    this.data.FleetType = "";
    this.data.VehicleType = "";
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    //date
    let today = new Date();
    let lastDate = new Date();
    lastDate.setDate(today.getDate()+100000);
  //  this.rangeDates = [ lastDate, today];
    this.minDate = today;
    this.maxDate = lastDate;
//end
    this.cityService.getActiveWarehouseCityDelivery().subscribe(result => {
      this.cityList = result;
      // let cityids = [];
      // result.forEach(element => {
      //   cityids.push(element.Cityid)
      // });
      // this.cityService.GetWarehouse(cityids).subscribe(x=>{
      //   var widIds = localStorage.getItem('warehouseids');
      //   this.warehouseids = widIds.split(',').map(Number);
      //   let warehouseList = [];
      //   let filterCityList = [];
      //   x.forEach(el => {
      //     this.warehouseids.forEach(wid => {
      //       if(el.WarehouseId == wid)
      //       {
      //           if(filterCityList.length > 0)
      //           {
      //             var existCity = filterCityList.find(x=>x.Cityid == el.Cityid);
      //             if(existCity == null)
      //             {
      //               filterCityList.push(result.filter(x=>x.Cityid == el.Cityid)[0]);
      //             }
      //           }else{
      //             filterCityList.push(result.filter(x=>x.Cityid == el.Cityid)[0]);
      //           }
      //       }
      //     });           
      //   });
      //   this.cityList = filterCityList;
        
      // })
      this.blocked=false;

    })

    if (this.Id != 0) {
      this.vehicleMasterService.vehicleMasterbyId(this.Id).subscribe(res => {
        this.Iseditable = true;
        this.data = res.data;
        this.fleetType = this.data.FleetType;
        var wareid =res.data.WarehouseId;
        this.data.FleetMasterId=this.data.FleetMasterId;
        this.data.Warehouseid=wareid;
        this.getWarehouse(this.data.CityId);
        this.RegistrationImage =  this.data.RegistrationImage;
        this.RegistrationImageBack= this.data.RegistrationImageBack;
        this.InsuranceImage =  this.data.InsuranceImage;
        this.PUCimage =  this.data.PUCimage;
        this.data.VehicleTypeName=this.data.VehicleType;
        this.data.PUCValidTill = moment(this.data.PUCValidTill).format('MM/DD/YYYY HH:mm:ss');
        this.data.InsuranceValidity = moment(this.data.InsuranceValidity).format('MM/DD/YYYY HH:mm:ss');
        // this.getTransportList(this.data.FleetType)
        this.getVehicleType(this.data.FleetId);
        this.blocked=false;
      });
    }
  }
  getThresholdkgList(){
    this.vehicleMasterService.GetThresholdkgList().subscribe(res=>{
      this.thresholdkgList=res
      console.log(res);
      
    })
  }
  getTransportList(fleetType,Warehouseid) {
    if(this.Iseditable){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
    this.vehicleMasterService.gettransportList(fleetType,Warehouseid).subscribe(result => {
      this.transportList = result;
    })
    this.data.VehicleType =[];
  },
  reject: () => {
    this.data.FleetType = this.fleetType;
  }
  });
}
else{
  this.vehicleMasterService.gettransportList(fleetType,Warehouseid).subscribe(result => {
    this.transportList = result;
  })
}
  }
  getVehicleType(FleetMasterId) {
    if(FleetMasterId == 0){
    if(this.data.FleetMasterId>0){
    this.vehicleMasterService.getVehicleList(this.data.FleetMasterId).subscribe(result => {
      this.VehicleList = result;      
    })
  }
   }else{
    this.data.VehicleType="";
    this.data.VehicleTypeName="";
    this.vehicleMasterService.getVehicleList(FleetMasterId).subscribe(result => {
      this.VehicleList = result; 
    })
  }
  }
  onSelectvehicle(args) {
    this.fleetdetailsid = this.data.VehicleType;
    var vehicleData = this.VehicleList.find(x=>x.Id == this.data.VehicleType);
    this.data.VehicleTypeName = vehicleData.VehicleType;
    // this.data.VehicleType = args.target.options[args.target.selectedIndex].text;
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
    this.blocked=true;
    debugger;
    if (vehicleForm.form.status == "VALID") {
      if (this.RegistrationImage == undefined || this.RegistrationImage == null) {
        this.messageService.add({ severity: 'error', summary: 'Please upload Registration images!', detail: '' });
        this.blocked=false;
        return;        
      }
      if (this.RegistrationImageBack == undefined || this.RegistrationImageBack == null) {
        this.messageService.add({ severity: 'error', summary: 'Please upload Registration Back images!', detail: '' });
        this.blocked=false;
        return;
      }
      if (this.InsuranceImage == undefined || this.InsuranceImage == null) {
        this.messageService.add({ severity: 'error', summary: 'Please upload Insurance images!', detail: '' });
        this.blocked=false;
        return;
      }
      if (this.PUCimage == undefined || this.PUCimage == null) {
        this.messageService.add({ severity: 'error', summary: 'Please upload PUC images!', detail: '' });
        this.blocked=false;
        return;
      }
      if (data.VehicleType == undefined || data.VehicleType == null || data.VehicleType.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'Please add Vehicle Type!', detail: '' });
        this.blocked=false;
        return;
      }           
      if (!this.Id) {
        if(this.VehicleList.length > 0){
          var vehicleData = this.VehicleList.find(x=>x.Id == data.VehicleType);
        data.VehicleType = vehicleData.VehicleType;
        this.fleetdetailsid = vehicleData.Id;
          }
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
        IsBlocked: false,
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
        this.vehicleMasterService.addFleetMaster(this.vehicleMaster).subscribe(x => {
          this.Result = x.Result;
          this.message = x.msg;
          if (this.Result) {
            this.blocked=false;
            this.messageService.add({ severity: 'success', summary: this.message, detail: '' });
            this.router.navigateByUrl('layout/operation-capacity/vehicle-master-List');
          } else {
            this.messageService.add({ severity: 'error', summary: this.message, detail: '' });
            this.blocked=false;
          }
        })
      }
      else {
        if(this.VehicleList.length > 0){
          if(this.isNumber(data.VehicleType)){
            var vehicleData = this.VehicleList.filter(x=>x.Id == data.VehicleType);
            data.VehicleType = vehicleData[0].VehicleType;
            this.fleetdetailsid = vehicleData[0].Id;
          }else{
            var vehicleData = this.VehicleList.find(x=>x.VehicleType == data.VehicleType);
            data.VehicleType = vehicleData.VehicleType;
            this.fleetdetailsid = vehicleData.Id;
          }         
          }
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
        IsBlocked: false,
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
        this.vehicleMasterService.editVehicleMaster(this.vehicleMaster).subscribe(x => {
          this.Result = x.Result;
          this.message = x.msg;
          if (this.Result) {
            this.blocked=false;
            this.messageService.add({ severity: 'success', summary: this.message, detail: '' });
            this.router.navigateByUrl('layout/operation-capacity/vehicle-master-List');
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
    this.router.navigateByUrl('layout/operation-capacity/vehicle-master-List');
  }
addfleetType(){
  this.router.navigateByUrl('layout/operation-capacity/fleet');
}
  EditVehicleType(data) {
    this.isOpenVehicletype = true;
    this.transportList = null;
    this.vehicleMasterService.gettransportList(this.data.FleetType,this.data.Warehouseid).subscribe(result => {
      this.transportList = result;
    })
    // this.getTransportList(this.data.FleetType,this.data.Warehouseid);
    // this.data.VehicleType =[];
    //this.getVehicleType(this.data.FleetId);
  }
  onSelectvehicleType(args) {
    this.fleetdetailsid = this.data.VehicleType;
    var vehicleData = this.VehicleList.find(x=>x.Id == this.data.VehicleType);
    this.data.VehicleType = vehicleData.VehicleType;
    // this.data.VehicleType = args.target.options[args.target.selectedIndex].text;
    this.isOpenVehicletype = false;
  }
  // cityid:any;s
  getWarehouse(cityid){
    if(this.Id == 0){
    this.data.Warehouseid="";
    this.data.FleetType="";
    this.transportList=[];
    }
    this.customerService.getWareHouseByCity(cityid).subscribe(x=>{
      this.warehouseList=x
      // console.log(this.warehouseList,'list')
      // let selectedWids = [];
      // this.warehouseids.forEach(element => {
      //   let existWid = x.find(x=>x.WareHouseId == element);
      //   if(existWid != null)
      //   {
      //     selectedWids.push(existWid);
      //   }
      // });
      // this.warehouseList = selectedWids;
    })
  }
  openImage(img)
  {
    // window.open('/#/'+this.router.url+'/'  + img );
    window.open(this.baseURL+img);
  }
  openPDF()
  {
    window.open(this.baseURL+this.InsuranceImage);
  }
   isNumber(value) {return typeof value === 'number';}
}

