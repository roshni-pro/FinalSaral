import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { VehicleService } from 'app/shared/services/vehicle.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { element } from 'protractor';

@Component({
  selector: 'app-add-dboy-mst',
  templateUrl: './add-dboy-mst.component.html',
  styleUrls: ['./add-dboy-mst.component.scss']
})
export class AddDboyMstComponent implements OnInit {
  dboyList: any[];
  cols: any[];
  dataAdd: any;
  isOpenPopup: boolean;
  isViewPopup: boolean = false;
  blocked: boolean;
  name: string = "";
  mobileno: string = "";
  aadharno: string = "";
  file: any;
  uploadFlagAdhar: boolean;
  uploadFlagPhoto: boolean;
  uploadFlagAdharBack: boolean;
  public imagePath;
  imgURL: any;
  selectAgentOrTrans: string;
  baseURL: any;
  AadharImage: any;
  AadharBackImage: any;
  PhotoImage: any;
  skip: any;
  take: any;
  totalRecords: number;
  cityList: any[];
  AgentList: any[];
  IsdisableAgent: boolean = false;
  IshowAdd: boolean = true;
  IshowEdit: boolean = true;
  @Input() Id: any;
  isInvalid: boolean = false;
  masterwarehouseList: any[];
  DboyValidity: boolean = false;
  CurrentDate: any;
  IsDisabled: boolean = false;
  warehouseids: any;

  VehicleMasterId: any

  constructor(private _service: VehicleService, private router: Router, private customerService: CustomerService, private route: ActivatedRoute, private exportService: ExportServiceService, private cityService: CityService, private messageService: MessageService, private datepipe: DatePipe) {
    this.dataAdd = {}; this.baseURL = environment.apiURL;
    this.CurrentDate = moment(new Date()).format('MM/DD/YYYY');
  }

  ngOnInit() {
    this.IsDisabled = false;
    this.IshowAdd = true;
    this.IshowEdit = false;
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.GetVehicleDetailsByDboyId();
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
    })
    if (this.Id != 0) {

      this._service.GetdboyListById(this.Id).subscribe(res => {
        console.log("GetdboyListById", res);
        this.dataAdd = res;
        this.IsDisabled = true;
        this.dataAdd.WarehouseId = res.WarehouseId;
        this.dataAdd.Cityid = res.CityId;
        this.getWarehouse(res.CityId);
        this.dataAdd.WarehouseId = res.WarehouseId;

        this.dataAdd.VehicleMasterId = res.VehicleMasterId;
        
        this.dataAdd.AgentOrTransport = res.AgentOrTransport;
        this.dataAdd.Type = res.Type;
        this.AadharImage = res.AadharCopy;
        this.AadharBackImage = res.AadharCopyBack;
        this.PhotoImage = res.Photo;
        this.dataAdd.ValidFrom = this.dataAdd.ValidFrom == null ? null : moment(this.dataAdd.ValidFrom).format('MM/DD/YYYY HH:mm:ss');
        this.dataAdd.ValidTill = this.dataAdd.ValidTill == null ? null : moment(this.dataAdd.ValidTill).format('MM/DD/YYYY HH:mm:ss');
        this.dataAdd.Type == "Regular" ? this.DboyValidity = false : this.DboyValidity = true;
        if (res.AgentOrTransport == "Agent") {
          this.IsdisableAgent = true
          this._service.AgentList(this.dataAdd.CityId).subscribe(result => {
            this.AgentList = result;
          })
        }
        else {
          this.IsdisableAgent = false
        }
        this.IshowAdd = false;
        this.IshowEdit = true;
      });
    }

  }
  openImage(img) {
    window.open(this.baseURL + img);
  }
  getWarehouse(cityid) {
    this.customerService.getWareHouseByCity(cityid).subscribe(x => {
      this.masterwarehouseList = x
      // let selectedWids = [];
      // // debugger;
      // this.warehouseids.forEach(element => {
      //   let existWid = x.find(x=>x.WareHouseId == element);
      //   if(existWid != null)
      //   {
      //     selectedWids.push(existWid);
      //   }
      // });
      // this.masterwarehouseList = selectedWids;
    })
  }
  typeChange(Type) {
    if (Type == "Regular") {
      this.DboyValidity = false;
    }
    else {
      this.DboyValidity = true;
    }
  }
  Cancle() {
    this.router.navigateByUrl('layout/vehicle/dboy');
  }
  PreventPastDate() {
    this.dataAdd.ValidFrom = moment(this.dataAdd.ValidFrom).format('MM/DD/YYYY');

    if ((this.dataAdd.ValidFrom < this.CurrentDate)) {
      this.messageService.add({ severity: 'error', summary: 'You Cannot Select Past Date!', detail: '' });
      return;
    }
  }
  PreventPastValidTillDate() {
    this.dataAdd.ValidTill = moment(this.dataAdd.ValidTill).format('MM/DD/YYYY');
    if ((this.dataAdd.ValidTill < this.CurrentDate)) {
      this.messageService.add({ severity: 'error', summary: 'You Cannot Select Past Date!', detail: '' });
      return;
    }
  }

  OnSubmit(data, DboyForm) {
    console.log(data,DboyForm);
    if (DboyForm.form.status == "VALID") {

      if (data.MobileNo != null) {
        if (data.MobileNo.length != 10) {
          this.messageService.add({ severity: 'error', summary: 'Enter Valid Mobile No!', detail: '' });
          return;
        }
      }
      if (data.AadharNo != null) {
        if (data.AadharNo.length != 12) {
          this.messageService.add({ severity: 'error', summary: 'Enter Valid Aadhar No!', detail: '' });
          return;
        }
      }
      if (data.Type == "" || data.Type == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Please Select Type!', detail: '' });
        return;
      }
      if ((data.ValidFrom == "" || data.ValidFrom == undefined) || (data.ValidTill == "" || data.ValidTill == undefined)) {
        if (data.Type != "Regular") {
          this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
          return;
        }
      }
      if (data.Type != "Regular") {
        this.dataAdd.ValidFrom = moment(this.dataAdd.ValidFrom).format('MM/DD/YYYY');
        if (data.ValidFrom != "" || data.ValidFrom != null)
          if ((this.dataAdd.ValidFrom < this.CurrentDate)) {
            this.messageService.add({ severity: 'error', summary: 'You Cannot Select Past Date!', detail: '' });
            return;
          }
        this.dataAdd.ValidTill = moment(this.dataAdd.ValidTill).format('MM/DD/YYYY');
        if (data.Id == undefined || data.Id == null || data.Id == 0) {
          if (data.ValidTill != "" || data.ValidTill != null)
            if ((this.dataAdd.ValidTill < this.dataAdd.ValidFrom)) {
              this.messageService.add({ severity: 'error', summary: 'ValidTill Date Should Be Greater than From Date!', detail: '' });
              return;
            }
        }
      }
      if (data.AgencyName == "" || data.AgencyName == null) {
        if (data.Type == "3PL") {
          this.messageService.add({ severity: 'error', summary: 'Agency Name is Required!', detail: '' });
          return;
        }
      }
      if (data.AgentOrTransport != "" || data.AgentOrTransport != null) {
        if (data.AgentOrTransport == "Agent") {
          if (data.AgentId == 0 || data.AgentId == "" || data.AgentId == undefined) {
            this.messageService.add({ severity: 'error', summary: 'Agent Name is Required!', detail: '' });
            return;
          }
        }
      }
      if (data.AadharCopy == null || data.AadharCopy == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Please upload Aadhar images!', detail: '' });
        return;
      }
      if (data.AadharCopyBack == null || data.AadharCopyBack == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Please upload Aadhar Back images!', detail: '' });
        return;
      }
      if (data.Photo == null || data.Photo == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Please upload Photo!', detail: '' });
        return;
      }

      data.ValidFrom = data.ValidFrom == undefined ? null : moment(data.ValidFrom).format('MM/DD/YYYY');
      data.ValidTill = data.ValidTill == undefined ? null : moment(data.ValidTill).format('MM/DD/YYYY');
      if (data.Id > 0) {
        this._service.EditDboy(data).subscribe(result => {
          if (result.Result) {
            this.dataAdd = {};
            this.file = [];
            this.router.navigateByUrl('layout/vehicle/dboy');
          }
          else {
            alert(result.msg);
          }
        })
      }
      else {
        debugger;
        this._service.AddDboy(data).subscribe(result => {
          if (result.Succeeded) {
            this.dataAdd = {};
            this.file = [];
            this.router.navigateByUrl('layout/vehicle/dboy');
          }
          else {
            alert(result.ErrorMessage);
          }
        })
      }

    }
    else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }

  getSelectedOptionText(obj) {
    this.AgentList = [];
    this.dataAdd.AgentId = 0;
    if (obj.value == "Agent") {
      this.IsdisableAgent = true;
      this._service.AgentList(this.dataAdd.CityId).subscribe(result => {
        this.AgentList = result;
      })
    }
    else {
      this.IsdisableAgent = false;
    }
  }

  registrationList: any[] = [];
  GetVehicleDetailsByDboyId() {
    this._service.GetVehicleDetailsByDboyId(this.Id).subscribe(result => {
      console.log("list", result);
      if(result && result.length>0){
        this.registrationList = result;
        this.registrationList.forEach(element=>{
          element.registrationId = element.Id;
        })
      }
    })
  }

  setRegistration(){
    console.log(this.dataAdd.VehicleMasterId);
  }

  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log(this.imgURL, 'urlimg')
    }
    (success) => {
      alert("image uploaded successfully")
    };
  }
  uploadAadharCopy() {
    if (!this.file) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0], 'Aadhar.jpg')
      this._service.UploadDboyDoc(formData).subscribe(result => {
        console.log(result)
        this.dataAdd.AadharCopy = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlagAdhar = false;
        this.AadharImage = result;
      }, (err) => {
      });
    }
  }
  uploadAadharBackCopy() {
    if (!this.file) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0], 'AadharBack.jpg')
      this._service.UploadDboyDoc(formData).subscribe(result => {
        this.dataAdd.AadharCopyBack = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlagAdharBack = false;
        this.AadharBackImage = result;
      }, (err) => {
      });
    }
  }
  uploadPhoto() {
    if (!this.file) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0], 'Photo.jpg')
      this._service.UploadDboyDoc(formData).subscribe(result => {
        this.dataAdd.Photo = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlagPhoto = false;
        this.PhotoImage = result;
      }, (err) => {
      });
    }
  }
}
