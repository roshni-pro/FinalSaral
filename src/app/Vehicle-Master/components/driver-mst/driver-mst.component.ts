import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { VehicleService } from 'app/shared/services/vehicle.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-driver-mst',
  templateUrl: './driver-mst.component.html',
  styleUrls: ['./driver-mst.component.scss']
})
export class DriverMstComponent implements OnInit {
  driverList: any[];
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
  uploadFlagAdharBack: boolean;
  uploadFlagPhoto: boolean;
  uploadFlagDLCopy: boolean;
  public imagePath;
  imgURL: any;
  baseURL: any;
  AadharImage: any;
  AadharBackImage: any;
  PhotoImage: any;
  DLCopyImage: any;
  skip: number;
  take: number;
  totalRecords: number;
  cityList: any[];
  IshowAdd: boolean = true;
  IshowEdit: boolean = true;
  masterwarehouseList: any[];
  CurrentDate: any;
  isDLPopup: boolean = false;
  message: string = "";
  statusValue: number = 0;
  IsDisabled: boolean = false;
  SelectedCityId:any;
  SelectedWarehouseId:any;
  DriverExport :any[]=[];
  ExportData:any;
  minDateValue: any;
  warehouseids : any;
  constructor(private _service: VehicleService, private customerService: CustomerService, private confirmationService: ConfirmationService, private exportService: ExportServiceService, private cityService: CityService, private messageService: MessageService,) {
    this.dataAdd = {}; this.baseURL = environment.apiURL;this.ExportData={};
  }

  ngOnInit(): void {
    this.IsDisabled = false;
    this.blocked = false;
    this.isOpenPopup = false;
    const today = new Date();
    const tomorrow = moment().add(1, 'days').toDate();
    this.minDateValue = tomorrow;
    //this.getWarehouse();
    this.cityService.getCommonCity().subscribe(result => {
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
  }

  getWarehouse(cityid) {
    debugger;
    this.customerService.getWareHouseByCityNew(cityid).subscribe(x => {
      this.masterwarehouseList = x
    //   let selectedWids = [];
    //   // debugger;
    //   this.warehouseids.forEach(element => {
    //     let existWid = x.find(x=>x.WareHouseId == element);
    //     if(existWid != null)
    //     {
    //       selectedWids.push(existWid);
    //     }
    //   });
    //   this.masterwarehouseList = selectedWids;
    })
  }
  load(event) {
    debugger;
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;
    // if(this.SelectedWarehouseId==null || this.SelectedWarehouseId==undefined)
    // {
    //   this._service.GetdriverListPaging(this.skip, this.take).subscribe(result => {
    //     this.driverList = result.DriverMasterDcs;
    //     for (var i in this.driverList) {
    //       this.driverList[i].DLNoValidity = moment(this.driverList[i].DLNoValidity).format('MM/DD/YYYY');
    //     }
    //     this.totalRecords = result.totalcount
    //     this.blocked = false;
    //   })
    // }
     if(this.SelectedWarehouseId  && this.SelectedWarehouseId.value>0)
     {
        this._service.SearchDriverList(this.name, this.statusValue,this.SelectedCityId.value,this.SelectedWarehouseId.value,this.skip,this.take).subscribe(result => {
          this.driverList = result.DriverMasterDcs;
          this.totalRecords = result.totalcount;
          this.blocked = false;
        })
     }
    }
   
  

  OnSubmit(data) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    this.CurrentDate = new Date();
    const diffDays = Math.round(Math.abs((data.DLNoValidity - this.CurrentDate) / oneDay));
    var currentYear=moment(this.CurrentDate).format('yyyy');
    var DLNoValidityYear=moment(data.DLNoValidity).format('yyyy');
    var currentMonth=moment(this.CurrentDate).format('MM');
    var DLNoValidityMonth=moment(data.DLNoValidity).format('MM');
    debugger;
    if (currentYear == DLNoValidityYear && currentMonth > DLNoValidityMonth) {
      alert("Your DL is Expired");
      return;
    }
    // if (currentDATE == DLNoValidityDATE && currentMonth == DLNoValidityMonth && currentDay >= DLNoValidityDay) {
    //   if(currentDay > DLNoValidityDay){
    //   alert("Your DL is Expired");
    //   return;
    //   }else if(currentDay == DLNoValidityDay){
    //     alert("Your DL is Expired");
    //     return;
    //   }
    // }
    if (currentYear > DLNoValidityYear) {
      alert("Your DL is Expired");
      return;
    }
    if (diffDays <= 30) {
      alert("Your DL is Expire with in " + diffDays + " days")
      // this.message="Your DL is Expire with in " +diffDays+ " days"
      // this.isDLPopup=true;
    }
    if (data.AadharCopy == null || data.AadharCopy == undefined) {
      alert("Please upload Aadhar images")
      return;
    }
    if (data.AadharCopyBack == null || data.AadharCopyBack == undefined) {
      alert("Please upload Aadhar Back images")
      return;
    }

    if (data.Photo == null || data.Photo == undefined) {
      alert("Please upload Photo")
      return;
    }
    if (data.DLCopy == null || data.DLCopy == undefined) {
      alert("Please upload DLCopy")
      return;
    }
    this._service.AddDriver(data).subscribe(result => {
      if (result.Result) {
        alert(result.msg)
        this.isOpenPopup = false;
        this.dataAdd = {};
        this.file = [];
        this.IsDisabled = false;
      }else{
        alert(result.msg);
        return false;
      }
    })
  }
  ActiveInactive(d, bool) {
    this._service.DriverActiveInactive(d.Id, bool).subscribe(res => {
    })
  }
  isBlocked(b, bool) {
    this._service.DriverIsBlocked(b.Id, bool).subscribe(res => {
    });
  }
  StatusChange(status) {
    this.statusValue = status;
  }
  GetDriverList() {
    this.blocked = true;
    this._service.GetDriverList().subscribe(result => {
      //this.driverList = result.DriverMasterDcs;
      this.blocked = false;
    })
  }

  Search(name) {
    
    
    this.driverList=null
    this.totalRecords=0
    if(this.SelectedCityId &&(this.SelectedWarehouseId==0 || this.SelectedWarehouseId==undefined) )
   {
    alert("Please select warehouse first")
    this.blocked = false;
   }
   if(name || (this.SelectedCityId && this.SelectedWarehouseId) || (this.SelectedCityId && this.SelectedWarehouseId && this.statusValue)||(this.statusValue>0))
   {
    this.blocked = true;
    this._service.SearchDriverList(name, this.statusValue,this.SelectedCityId.value,this.SelectedWarehouseId.value,this.skip,this.take).subscribe(result => {
      this.driverList = result.DriverMasterDcs;
      this.totalRecords=result.totalcount;
      this.blocked = false;
    })
   }
    
  }
  Refresh() {
    // debugger;
    // this.statusValue = 0;
    // this.name = "";
    // this.skip=1;
    // this.SelectedWarehouseId=0,this.SelectedCityId=0;
    // this.driverList=null
    // this.totalRecords=0
    // this._service.SearchDriverList(this.name, this.statusValue,this.SelectedCityId,this.SelectedWarehouseId,this.skip,this.take).subscribe(result => {
    //   this.driverList = result.DriverMasterDcs;
    //   this.totalRecords=result.totalCount;
    //   for (var i in this.driverList) {
    //     this.driverList[i].DLNoValidity = moment(this.driverList[i].DLNoValidity).format('MM/DD/YYYY');
    //   }
    //   this.blocked = false;
    // })
    window.location.reload();
  }
  openImage(img)
  {
    window.open(this.baseURL+img);
  }
  ExportDriver() {
    if(this.SelectedWarehouseId > 0)
    {
      this._service.ExportDriver(this.SelectedWarehouseId).subscribe(result => {
        // for(var i=0; i<result.length;i++){
        //   this.ExportData.Name =result[i]["Name"];
        //   this.ExportData.Address =result[i]["Address"];
        //   this.ExportData.MobileNo =result[i]["MobileNo"];
        //   this.ExportData.AadharNo =result[i]["AadharNo"];
        //   this.ExportData.DLNo =result[i]["DLNo"];
        //   this.ExportData.DLNoValidity =result[i]["DLNoValidity"];
        //   this.ExportData.TransportName =result[i]["TransportName"];
        //   this.ExportData.IsBlocked =result[i]["IsBlocked"];
        //   this.ExportData.IsActive =result[i]["IsActive"];
        //   this.ExportData.CityName =result[i]["CityName"];
        //   this.ExportData.WarehouseName =result[i]["WarehouseName"];
        //   this.DriverExport.push(this.ExportData);
        // }
        this.exportService.exportAsExcelFile(result, 'DriverData');
      })
    }
 
  }
  AddItem() {
    this.dataAdd = {};
    this.masterwarehouseList = null;
    this.isOpenPopup = true;
    this.IshowAdd = true;
    this.IshowEdit = false;
    this.AadharImage = "";
    this.PhotoImage = "";
    this.DLCopyImage = "";
    this.AadharBackImage = "";
    this.IsDisabled = false;
  }
  EditDriver(obj) {
    this.dataAdd = obj;
    this.getWarehouse(obj.CityId);
    this.dataAdd.WarehouseId = obj.WarehouseId;
    this.dataAdd.Cityid = obj.Cityid;
    this.dataAdd.DLNoValidity = moment(this.dataAdd.DLNoValidity).format('MM/DD/YYYY HH:mm:ss');
    this.AadharImage =  obj.AadharCopy;
    this.AadharBackImage =  obj.AadharCopyBack;
    this.PhotoImage = obj.Photo;
    this.DLCopyImage = obj.DLCopy;
    this.dataAdd.IsBlocked = obj.IsBlocked;    
    this.isOpenPopup = true;
    this.IshowAdd = false;
    this.IshowEdit = true;
    this.IsDisabled = true;
  }
  cancle() {
    this.isOpenPopup = false;
    this.dataAdd = {};
    this.dataAdd.IsBlocked = false;
    this.IsDisabled = false;
  }
  onRowSelect(data) {
    this.dataAdd = data;
    this.isViewPopup = true;
  }
  close() {
    this.dataAdd = {};
    this.isViewPopup = false;
  }


  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      //console.log(this.imgURL, 'urlimg')
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
      this._service.UploadDriverDoc(formData).subscribe(result => {
        console.log(result)
        this.dataAdd.AadharCopy = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlagAdhar = false;
        this.AadharImage=result;
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
      this._service.UploadDriverDoc(formData).subscribe(result => {
        console.log(result)
        this.dataAdd.AadharCopyBack = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlagAdharBack = false;
        this.AadharBackImage=result;
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
      this._service.UploadDriverDoc(formData).subscribe(result => {
        this.dataAdd.Photo = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlagPhoto = false;
        this.PhotoImage=result;
      }, (err) => {
      });
    }
  }
  uploadDLCopy() {
    if (!this.file) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0], 'DlCopy.jpg')
      this._service.UploadDriverDoc(formData).subscribe(result => {
        this.dataAdd.DLCopy = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.uploadFlagDLCopy = false;
        this.DLCopyImage=result;
      }, (err) => {
      });
    }
  }
}
