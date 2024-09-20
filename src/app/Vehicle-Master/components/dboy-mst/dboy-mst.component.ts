import { Component, OnInit } from "@angular/core";
import { ExportServiceService } from "app/shared/services/export-service.service";
import { VehicleService } from "app/shared/services/vehicle.service";
import { MessageService } from "primeng/api";
import { DatePipe } from "@angular/common";
import { environment } from "environments/environment";
import * as moment from "moment";
import { PepolePilotService } from "app/shared/services/pepole-pilot.service";
import { Router } from "@angular/router";
import { CityService } from "app/shared/services/city.service";
import { CustomerService } from "app/shared/services/customer.service";

@Component({
  selector: "app-dboy-mst",
  templateUrl: "./dboy-mst.component.html",
  styleUrls: ["./dboy-mst.component.scss"],
})
export class DboyMstComponent implements OnInit {
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
  public imagePath;
  imgURL: any;
  selectAgentOrTrans: string;
  baseURL: any;
  AadharImage: any;
  PhotoImage: any;
  skip: any;
  take: any;
  totalRecords: number;
  cityList: any[];
  AgentList: any[];
  IsdisableAgent: boolean = false;
  IshowAdd: boolean = true;
  IshowEdit: boolean = true;
  statusValue: number = 0;
  ExportData: any;
  SelectedCityId: any;
  SelectedWarehouseId: any;
  masterwarehouseList: any[];
  DboyExport: any[] = [];
  warehouseids: any;
  SelectedCityIdbackup: any;
  SelectedWarehouseIdbackup: any;

  constructor(
    private _service: VehicleService,
    private router: Router,
    private customerService: CustomerService,
    private cityService: CityService,
    private exportService: ExportServiceService,
    private pilotService: PepolePilotService,
    private messageService: MessageService,
    private datepipe: DatePipe
  ) {
    this.dataAdd = {};
    this.baseURL = environment.apiURL;
    this.ExportData = {};
  }

  async ngOnInit() {
    if (localStorage.getItem("DMCity") != null) {
      this.cityList = await this.cityService.getAllCityNew().toPromise();

      this.SelectedCityIdbackup = Number(localStorage.getItem("DMCity"));
      this.SelectedWarehouseIdbackup = Number(
        localStorage.getItem("DMWarehouse")
      );

      this.name = localStorage.getItem("DMSearch")
        ? localStorage.getItem("DMSearch")
        : "";
      this.statusValue = JSON.parse(localStorage.getItem("DMStatus"))
        ? JSON.parse(localStorage.getItem("DMStatus"))
        : 0;
      this.masterwarehouseList = await this.customerService
        .getWareHouseByCityNew(this.SelectedCityIdbackup)
        .toPromise();
      debugger;
      this.SelectedCityId = this.cityList.find((x: any) => {
        if (this.SelectedCityIdbackup == x.value) {
          return x;
        }
      });

      this.SelectedWarehouseId = this.masterwarehouseList.find((x: any) => {
        if (this.SelectedWarehouseIdbackup == x.value) {
          return x;
        }

        console.log("this.SelectedWarehouseId", this.SelectedWarehouseId);
      });

      // this.statusValue=

      // this.masterwarehouseList = await this.customerService
      // .getWareHouseByCityNew(this.SelectedCityId)
      // .toPromise();

      // this.searchModel.Cityid = this.cityList.find(
      //   (x: any) => x.value == this.Cityid
      // );
      // console.log("this.searchModel.Cityid",this.searchModel.Cityid);
      // this.searchModel.statusValue=this.searchdata;
      // this.searchModel.searchall=this.search;
      // this.searchModel.FromDate = this.FromDate? new Date(this.FromDate):null;
      // this.searchModel.ToDate = this.ToDate? new Date(this.ToDate):null;

      localStorage.removeItem("DMCity");
      localStorage.removeItem("DMWarehouse");
      localStorage.removeItem("DMSearch");
      localStorage.removeItem("DMStatus");
    }
    // this.searchModel.Cityid=[];
    else this.uploadFlagAdhar = false;
    this.blocked = false;
    this.isOpenPopup = false;
    this.dataAdd = {};
    this.cityService.getCommonCity().subscribe((result) => {
      this.cityList = result;
    });
  }
  async load(event) {
 
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;
    if (localStorage.getItem("DMCity") != null) {
      //this._service.GetdboyListPaging(this.skip, this.take).subscribe(result => {
      this._service
        .SearchdboyList(
          
          this.name,
          this.statusValue,
          Number(JSON.parse(localStorage.getItem("DMCity"))),
          Number(JSON.parse(localStorage.getItem("DMWarehouse"))),
          this.skip,
          this.take
        )

        .subscribe((result: any) => {
          this.dboyList = result.DBoyMasterDcs;
          console.log("hello", this.dboyList);
          this.totalRecords = result.totalcount;
          // for (var i in this.dboyList) {
          //   this.dboyList[i].ValidFrom = moment(this.dboyList[i].ValidFrom).format('MM/DD/YYYY');
          //   this.dboyList[i].ValidTill = moment(this.dboyList[i].ValidTill).format('MM/DD/YYYY');
          // }
        });
    } else {
      //this._service.GetdboyListPaging(this.skip, this.take).subscribe(result => {
      
      this._service
        .SearchdboyList(
          this.name,
          this.statusValue,
          this.SelectedCityId.value,
          this.SelectedWarehouseId.value,

          this.skip,
          this.take
        )
        .subscribe((result:any) => {

          this.dboyList = result.DBoyMasterDcs;
          console.log("hello", this.dboyList);
          this.totalRecords = result.totalcount;
          // for (var i in this.dboyList) {
          //   this.dboyList[i].ValidFrom = moment(this.dboyList[i].ValidFrom).format('MM/DD/YYYY');
          //   this.dboyList[i].ValidTill = moment(this.dboyList[i].ValidTill).format('MM/DD/YYYY');
          // }
        });
    }
  }
  getWarehouse(cityid) {

    console.log(cityid,"cityid");
    
    this.customerService.getWareHouseByCityNew(cityid).subscribe((x) => {
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
      this.masterwarehouseList = x;
      console.log(this.masterwarehouseList ,"cityiddd");
      
      // debugger;
    });
  }

  OnSubmit(data) {
    if (data.CityId == 0 || data.CityId == null || data.CityId == undefined) {
      alert("Please Select City");
      return;
    }
    if (data.Type == "" || data.Type == undefined) {
      alert("Please Select Type");
      return;
    }
    if (data.AgencyName == "" || data.AgencyName == null) {
      if (data.Type == "3PL") {
        alert("Agency Name is Required");
        return;
      }
    }
    if (
      data.AgentOrTransport == 0 ||
      data.AgentOrTransport == undefined ||
      data.AgentOrTransport == null
    ) {
      alert("Please select AgentOrTransport");
      return;
    }
    if (data.AgentOrTransport != "" || data.AgentOrTransport != null) {
      if (data.AgentOrTransport == "Agent") {
        if (
          data.AgentId == 0 ||
          data.AgentId == "" ||
          data.AgentId == undefined
        ) {
          alert("Agent Name is Required");
          return;
        }
      }
    }
    if (data.AadharCopy == null || data.AadharCopy == undefined) {
      alert("Please upload Aadhar images");
      return;
    }
    if (data.Photo == null || data.Photo == undefined) {
      alert("Please upload Photo");
      return;
    }
    this._service.AddDboy(data).subscribe((result) => {
      if (result.Result) {
        alert(result.msg);
        this.isOpenPopup = false;
        this.GetDboyList();
        this.dataAdd = {};
        this.file = [];
      } else {
        alert(result.msg);
      }
    });
  }
  getSelectedOptionText(obj) {
    if (obj.value == "Agent") {
      this.IsdisableAgent = true;
      this._service.AgentList(this.dataAdd.CityId).subscribe((result) => {
        this.AgentList = result;
      });
    } else {
      this.IsdisableAgent = false;
    }
  }
  GetDboyList() {
    this.blocked = true;
    this._service.GetdboyList().subscribe((result) => {
      this.dboyList = result.DBoyMasterDcs;
      for (var i in this.dboyList) {
        this.dboyList[i].ValidFrom = moment(this.dboyList[i].ValidFrom).format(
          "MM/DD/YYYY"
        );
        this.dboyList[i].ValidTill = moment(this.dboyList[i].ValidTill).format(
          "MM/DD/YYYY"
        );
      }

      this.blocked = false;
    });
  }
  ActiveInactive(d, bool) {
    this._service.DboyActiveInactive(d.Id, bool).subscribe((res) => {});
  }
  isBlocked(b, bool) {
    this._service.DboyIsBlocked(b.Id, bool).subscribe((res) => {});
  }
  StatusChange(status) {
    this.statusValue = status;
  }

  namebackup: any;
  Search(name) {
    debugger;
    console.log(name,"name");
    
    this.namebackup = name;
    this.totalRecords = 0;
    this.skip = 1;
    this.take = 10;
    this.dboyList = [];
   

    // if ((name || this.statusValue) &&( this.SelectedCityId==undefined || this.SelectedWarehouseId==undefined)
    //  || (this.SelectedCityId==undefined && this.SelectedWarehouseId==undefined)) {
    //   alert("Please select city first");
    //   this.blocked = false;
    //   return;
    // }
    // if (name && this.statusValue) {
    //   alert("Please select city first");
    //   this.blocked = false;
    //   return;
    // }
    if (!name && this.SelectedWarehouseId == undefined) {
      alert("Please select warehouse first");
      this.blocked = false;
    }

    if (
      name ||
      (this.SelectedCityId && this.SelectedWarehouseId) ||
      (this.SelectedCityId.value > 0 &&
        this.SelectedWarehouseId.value > 0 &&
        this.statusValue) ||
      this.statusValue > 0
    ) {
      this.blocked = true;
      this._service
        .SearchdboyList(
          name,
          this.statusValue,
          this.SelectedCityId.value,
          this.SelectedWarehouseId.value,
          this.skip,
          this.take
        )
        .subscribe((result) => {
          this.dboyList = result.DBoyMasterDcs;
          this.totalRecords = result.totalcount;
          this.blocked = false;
        });
    }
  }
  Refresh() {
    // this.statusValue=0;
    // this.name="";
    // this.SelectedCityId=0,this.SelectedWarehouseId=0;
    // this._service.SearchdboyList(this.name,this.statusValue,this.SelectedCityId,this.SelectedWarehouseId,this.skip,this.take).subscribe(result => {
    //   this.dboyList = result.DBoyMasterDcs;
    //   this.totalRecords=result.totalcount;
    //   for (var i in this.dboyList) {
    //     this.dboyList[i].ValidFrom = moment(this.dboyList[i].ValidFrom).format('MM/DD/YYYY');
    //     this.dboyList[i].ValidTill = moment(this.dboyList[i].ValidTill).format('MM/DD/YYYY');
    //   }
    //   this.blocked = false;
    // })
    window.location.reload();
  }
  ExportDboy() {
    if (this.SelectedWarehouseId.value > 0) {
      this._service
        .Exportdboy(this.SelectedWarehouseId.value)
        .subscribe((result) => {
          // for(var i=0; i<result.length;i++){
          //   this.ExportData.Name =result[i]["Name"];
          //   this.ExportData.Address =result[i]["Address"];
          //   this.ExportData.MobileNo =result[i]["MobileNo"];
          //   this.ExportData.AadharNo =result[i]["AadharNo"];
          //   this.ExportData.Type =result[i]["Type"];
          //   this.ExportData.AgencyName =result[i]["AgencyName"];
          //   this.ExportData.AgentOrTransport =result[i]["AgentOrTransport"];
          //   this.ExportData.ValidFrom =result[i]["ValidFrom"];
          //   this.ExportData.ValidTill =result[i]["ValidTill"];
          //   this.ExportData.IsBlocked =result[i]["IsBlocked"];
          //   this.ExportData.IsActive =result[i]["IsActive"];
          //   this.ExportData.CityName =result[i]["CityName"];
          //   this.ExportData.AgentName =result[i]["AgentName"];
          //   this.ExportData.WarehouseName =result[i]["WarehouseName"];
          //   this.DboyExport.push(this.ExportData);
          // }
          this.exportService.exportAsExcelFile(result, "DboyData");
        });
    } else {
      alert("Please Select Warehouse First!");
    }
  }

  AddItem() {
    this.router.navigateByUrl("layout/vehicle/Adddboy");
  }
  EditDboy(obj) {
    if (this.statusValue != null) {
      localStorage.setItem("DMStatus", JSON.stringify(this.statusValue));
    }
    if (this.namebackup != null) {
      localStorage.setItem("DMSearch", this.namebackup);
    }
    if (this.SelectedCityId != null) {
      localStorage.setItem("DMCity", this.SelectedCityId.value);
    }
    if (this.SelectedWarehouseId != null) {
      localStorage.setItem("DMWarehouse", this.SelectedWarehouseId.value);
    }
    this.router.navigateByUrl("layout/vehicle/edit-Dboy/" + obj.Id);
  }
  cancle() {
    this.isOpenPopup = false;
    this.dataAdd = {};
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
      console.log(this.imgURL, "urlimg");
    };
    (success) => {
      alert("image uploaded successfully");
    };
  }
  uploadAadharCopy() {
    debugger;
    if (!this.file) {
      this.messageService.add({
        severity: "error",
        summary: "please choose file",
        detail: "",
      });
      return;
    }
    if (this.file) {
      let formData = new FormData();
      formData.append("file", this.file[0], "Aadhar.jpg");
      this._service.UploadDboyDoc(formData).subscribe(
        (result) => {
          console.log(result);
          this.dataAdd.AadharCopy = result;
          this.messageService.add({
            severity: "success",
            summary: "Uploaded Successfully",
            detail: "",
          });
          this.file = [];
          this.uploadFlagAdhar = false;
        },
        (err) => {}
      );
    }
  }
  uploadPhoto() {
    if (!this.file) {
      this.messageService.add({
        severity: "error",
        summary: "please choose file",
        detail: "",
      });
      return;
    }
    if (this.file) {
      let formData = new FormData();
      formData.append("file", this.file[0], "Photo.jpg");
      this._service.UploadDboyDoc(formData).subscribe(
        (result) => {
          this.dataAdd.Photo = result;
          this.messageService.add({
            severity: "success",
            summary: "Uploaded Successfully",
            detail: "",
          });
          this.file = [];
          this.uploadFlagPhoto = false;
        },
        (err) => {}
      );
    }
  }
}
