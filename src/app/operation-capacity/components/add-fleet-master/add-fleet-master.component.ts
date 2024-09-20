import { Component, HostListener, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FleetMaster,
  fleetMasterAccountDetails,
  fleetMasterDetails,
} from "app/fleet-master/interface/fleet-masterdc";
import { FleetMasterService } from "app/fleet-master/services/fleet-master.service";
import { CityService } from "app/shared/services/city.service";
import { CustomerService } from "app/shared/services/customer.service";
import { PepolePilotService } from "app/shared/services/pepole-pilot.service";
import { StateService } from "app/shared/services/state.service";
import { VehicleService } from "app/shared/services/vehicle.service";
import { VehicleMasterService } from "app/vehicle-master/services/vehicle-master.service";
import { environment } from "environments/environment";
import * as moment from "moment";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-add-fleet-master",
  templateUrl: "./add-fleet-master.component.html",
  styleUrls: ["./add-fleet-master.component.scss"],
})
export class AddFleetMasterComponent implements OnInit {
  data: any;
  isOpen: boolean = false;
  vehicleDetail: fleetMasterDetails[] = [];
  showTable: boolean = false;
  fleetMasterdc: FleetMaster;
  isInvalid: boolean = false;
  isSearch: boolean = true;
  isTable: boolean = true;
  @Input() Id: any;
  isEditOpen: boolean = false;
  blocked: boolean;
  cityList: any;
  warehouseList = [];
  isEdit: boolean = false;
  selectedIndex: any;
  agentList: any;
  warehouseids: any;
  thresholdkgList: any[] = [];
  accountdetail: any;
  accountDisplay: boolean = false;
  stateList: any;
  transportercityList: any;
  roleName: any;
  roleList: any;
  checkrole: boolean = false;
  baseURL: any;
  showAccountTable: boolean = false;
  isAccountSaved: boolean = false;
  checkAccountInvalid: boolean = false;
  iseditAccountSaved: boolean = false;
  // fleetMasterAccountDetailDc:any;
  fleetAccountDetail: fleetMasterAccountDetails[] = [];
  constructor(
    private fleetMasterService: FleetMasterService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private pilotService: PepolePilotService,
    private router: Router,
    private customerService: CustomerService,
    private cityService: CityService,
    private vehicleMasterService: VehicleMasterService,
    private vehicleService: VehicleService,
    private pepolePilotService: PepolePilotService
  ) {
    this.data = {};
    this.data.fleetMasterAccountDetailDc = [
      {
        Id: 0,
        FleetMasterId: 0,
        AccountNo: "",
        IFSCcode: "",
        BranchName: "",
        BankName: "",
        HolderName: "",
        CancelledChequePath: "",
      },
    ];
    (this.accountdetail = {}), (this.baseURL = environment.apiURL);
  }

  ngOnInit() {


    this.blocked = true;
    this.setMSMEList();
    this.getThresholdkgList();
    this.data.CityId = "";
    this.data.Warehouseid = "";
    this.data.TransportAgentName = "";

    this.Id = Number(this.route.snapshot.paramMap.get("Id"));

    this.roleName = localStorage.getItem("role");
    this.roleList = this.roleName.split(",");
    console.log(this.roleList, "rolelist");

    this.roleList.forEach((x: any) => {
      if (
        x == "Accounts executive" ||
        x == "Accounts associates" ||
        x == "HQ Master login"
      ) {
        this.checkrole = true;
      }
    });
    //debugger;
    console.log("this.checkrole", this.checkrole);

    this.pepolePilotService.States().subscribe((result) => {
      this.stateList = result;
      console.log("this.stateList :", result);
    });
    this.pepolePilotService.City().subscribe((result) => {
      if (this.data.TransporterStateId) {
        this.transportercityList = result.filter(
          (x) => x.Stateid == this.data.TransporterStateId
        );
      } else {
        this.transportercityList = result;
      }
    });

    this.cityService.getActiveWarehouseCityDelivery().subscribe((result) => {
      this.cityList = result;

      this.blocked = false;
    });
    if (this.Id != 0) {
      debugger
      this.fleetMasterService.getfleetMasterbyId(this.Id).subscribe((res) => {
        this.isEditOpen = true;
        this.data = res.data;
        if (
          this.data &&
          this.data.PanNo != null &&
          this.data.PanImagePath != null &&
          this.data.TransporterCityId != null &&
          this.data.TransporterStateId != null
        ) {
          this.iseditAccountSaved = true;
        }
        console.log("hi", this.data);

        var wareid = res.data.WarehouseId;
        if (this.data.fleetMasterAccountDetailDc) {
          this.fleetAccountDetail = this.data.fleetMasterAccountDetailDc;
        }
        else
        // else {
        //   this.data.fleetMasterAccountDetailDc = [
        //     {
        //       Id: 0,
        //       FleetMasterId: 0,
        //       AccountNo: "",
        //       IFSCcode: "",
        //       BranchName: "",
        //       BankName: "",
        //       HolderName: "",
        //     },
        //   ];
        //   this.fleetAccountDetail = this.data.fleetMasterAccountDetailDc;
        // }

        // this.isAccountSaved = true;
        console.log("this.fleetMasterAccountDetailDc", this.fleetAccountDetail);

        this.data.Warehouseid = wareid;
        this.getWarehouse(this.data.CityId);
        this.data.ContractStart = moment(this.data.ContractStart).format(
          "MM/DD/YYYY HH:mm"
        );
        this.data.ContractEnd = moment(this.data.ContractEnd).format(
          "MM/DD/YYYY HH:mm"
        );
        this.vehicleDetail = this.data.fleetMasterDetails;
        console.log("res:", res.data);
        this.isSearch = false;
        this.showTable = true;
        this.showAccountTable = true;
        this.blocked = false;
        // this.data.IsAppprovedByAccount =  res.data
      });
    }

    this.data.FleetType = "";
    this.data.Channel = "";
    this.data.OperatedBy = "";
    this.data.FreightDiscount = "";
  }

  onChangeState(Stateid) {
    
    this.pepolePilotService.City().subscribe((result) => {
      //debugger;
      this.transportercityList = result.filter((x) => x.Stateid == Stateid);
      console.log("state", result, "cities", this.transportercityList);
    });
  }
  isOpenAddRow(type) {
    // Open Popup for Add/Edit row Data
    //debugger;
    this.isOpen = true;
    this.isInvalid = false;
    if (this.isEditOpen) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
      this.data.VehicleType = null;
      this.data.NoOfVehicle = null;
      this.data.FixedCost = null;
      this.data.ExtraKmCharge = null;
      this.data.ExtraHrCharge = null;
      this.data.WaitingCharge = null;
      this.data.VehicleCapacity = null;
      this.data.Make = null;
      this.data.NonworkingDayAmt = null;
      this.data.DistanceContract = null;
      this.data.DaysContract = null;
      this.data.HrContract = null;
      this.data.FleetDetailsId = null;
    }
  }
  MSME: any;
  setMSMEList() {
    this.MSME = [
      { label: "No", Id: false },
      { label: "Yes", Id: true },
    ];
  }
  getThresholdkgList() {
    this.vehicleMasterService.GetThresholdkgList().subscribe((res) => {
      this.thresholdkgList = res;
      console.log(res);
    });
  }

  // addFleetMaster//
  addFleetMaster(fleetForm) {
    //    //debugger;

    if (fleetForm.form.status == "VALID") {
      this.isSearch = false;
      // this.isOpen = true;
      this.showTable = false;
      this.messageService.add({
        severity: "success",
        summary: "Details Saved",
        detail: "",
      });
      console.log("addFleetMaster", this.data);
    } else {
      this.isInvalid = true;
      this.messageService.add({
        severity: "error",
        summary: "Please Fill required Fields!",
        detail: "",
      });
    }
  }
 
  letterOnly(event) : Boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }


  saveAccountApproval(accountForm) {
    debugger;
    // if (this.checkrole && this.isEditOpen && this.data.MSMECertificatePath == null) {
    //   this.messageService.add({
    //     severity: "error",
    //     summary: "Please upload MSME Certificate image!",
    //     detail: "",
    //   });
    //   this.checkAccountInvalid = true;

    //   return;
    // }
    // if (this.data.AadharImagePath == null) {
    //   this.messageService.add({
    //     severity: "error",
    //     summary: "Please upload Aadhar image!",
    //     detail: "",
    //   });
    //   this.checkAccountInvalid = true;

    //   return;
    // }
    if (this.data.PanImagePath == null) {
      this.messageService.add({
        severity: "error",
        summary: "Please upload Pan image!",
        detail: "",
      });
      this.checkAccountInvalid = true;

      return;
    }

    debugger;
    if (accountForm.form.status == "VALID") {
      if (this.isEditOpen) {

        this.iseditAccountSaved=true;
      } else {
        this.isAccountSaved = true;
      }
      console.log("addFleetMaster", this.data);
      this.messageService.add({
        severity: "success",
        summary: "Details Saved",
        detail: "",
      });
    } 
    else {
      this.checkAccountInvalid = true;
      this.messageService.add({
        severity: "error",
        summary: "Please Fill required Fields!",
        detail: "",
      });
    }
  }
  saveFleetVehicleType(vehilclefleetForm, data) {
    // //debugger;
    if (vehilclefleetForm.form.status == "VALID") {
      // this.showTable = true;
      let obj: any = {
        Id: 0,
        FleetMasterId: this.data.Id ? this.data.Id : 0,
        VehicleType: this.data.VehicleType,
        NoOfVehicle: this.data.NoOfVehicle,
        FixedCost: this.data.FixedCost,
        ExtraKmCharge: this.data.ExtraKmCharge,
        ExtraHrCharge: this.data.ExtraHrCharge,
        WaitingCharge: this.data.WaitingCharge,
        VehicleCapacity: this.data.VehicleCapacity,
        Make: this.data.Make,
        NonworkingDayAmt: this.data.NonworkingDayAmt,
        DistanceContract: this.data.DistanceContract,
        DaysContract: this.data.DaysContract,
        HrContract: this.data.HrContract,
      };
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
      console.log("addFleetVehicleType", this.vehicleDetail);
      this.isInvalid = false;
      this.isOpen = false;
    } else {
      this.isInvalid = true;
      this.messageService.add({
        severity: "error",
        summary: "Please Fill required Fields!",
        detail: "",
      });
    }
  }
  addFleetVehicleType(vehilclefleetForm, data) {
    // this.isInvalid = false;
    if (vehilclefleetForm.form.status == "VALID") {
      this.isEdit = false;
      this.showTable = true;
      this.isSearch = false;
      data;
      for (var i in this.vehicleDetail) {
        if (
          this.vehicleDetail[i] == this.vehicleDetail[this.selectedIndex - 1]
        ) {
          // this.vehicleDetail[i].Id :  this.data.Id ? this.data.Id : 0,
          this.vehicleDetail[i].FleetMasterId = this.data.FleetMasterId
            ? this.data.FleetMasterId
            : 0;
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
        this.messageService.add({
          severity: "success",
          summary: "Detail Saved!",
          detail: "",
        });
      }
    } else {
      this.isInvalid = true;
      this.messageService.add({
        severity: "error",
        summary: "Please Fill required Fields!",
        detail: "",
      });
    }
  }
  removeSelected(selecteditem) {
    if (this.Id == 0) {
      var b = this.vehicleDetail.findIndex(
        (x) => x.VehicleType == selecteditem.VehicleType
      );
      this.vehicleDetail.splice(b, b);
      if (this.vehicleDetail.length == 1 && b == 0) {
        this.vehicleDetail = [];
      }
    } else {
      var b = this.vehicleDetail.findIndex(
        (x) =>
          x.Id == selecteditem.Id &&
          x.FleetMasterId == selecteditem.FleetMasterId
      );
      this.vehicleDetail.splice(b, b);
      if (this.vehicleDetail.length == 1 && b == 0) {
        this.vehicleDetail = [];
      }
    }
  }

  editelected(selecteditem, index) {
    //debugger;

    this.selectedIndex = index;
    this.isSearch = false;
    this.isEdit = true;
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

  async saveFleetMaster(data) {
    debugger;
    if (this.vehicleDetail.length > 0 ) {
      // validation for save
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
        AadharImagePath: data.AadharImagePath,
        AadharNo: data.AadharNo,
        PanImagePath: data.PanImagePath,
        PanNo: data.PanNo,
        GSTIN: data.GSTIN,
        Address: data.Address,
        TransporterStateId: data.TransporterStateId,
        TransporterCityId: data.TransporterCityId,
        AgreementPath: data.AgreementPath,
        MSMECertificatePath: data.MSMECertificatePath,
        IsMSME: data.IsMSME,
        IsActive: data.IsActive ? true : false,
        IsBlocked: data.IsBlocked ? true : false,
        fleetMasterDetails: this.vehicleDetail,

        TransportAgentMobileNo: data.TransportAgentMobileNo,
        fleetMasterAccountDetailDc: this.fleetAccountDetail,
      };
    } else {
      alert("please fill all required fields");
    }

    if (this.Id == 0) {
      //save
      debugger;

      this.fleetMasterService
        .addFleetMaster(this.fleetMasterdc)
        .subscribe((x) => {
          if (x.Result) {
            this.blocked = false;
            this.messageService.add({
              severity: "success",
              summary: x.msg,
              detail: "",
            });
            this.router.navigateByUrl(
              "layout/operation-capacity/fleet-master-List"
            );
          } else {
            this.blocked = false;
            this.messageService.add({
              severity: "error",
              summary: x.msg,
              detail: "",
            });
          }
        });
    } else {
      debugger;

      let x: any = await this.fleetMasterService
        .updateFleetMaster(this.fleetMasterdc)
        .toPromise();

      if (x && x.Result) {
        this.blocked = false;
        this.messageService.add({
          severity: "success",
          summary: x.msg,
          detail: "",
        });
        this.router.navigateByUrl(
          "layout/operation-capacity/fleet-master-List"
        );
      } else {
        this.blocked = false;
        this.messageService.add({
          severity: "error",
          summary: x.msg,
          detail: "",
        });
      }
    }
  }

  backToListPage() {
    this.router.navigateByUrl("layout/operation-capacity/fleet-master-List");
  }
  ActiveInactive(d) {
    this.data.IsActive = d.IsActive;
  }
  ActiveInactiveIsblocked(d) {
    this.data.IsBlocked = d.IsBlocked;
  }

  getWarehouse(cityid) {
    this.customerService.getWareHouseByCity(cityid).subscribe((x) => {
      this.warehouseList = x;
      console.log(this.warehouseList, "list");
    });
    this.vehicleService.AgentList(cityid).subscribe((res) => {
      this.agentList = res;
    });
  }
  onSelectAgent(data) {
    console.log("datataa", data);
    var a = this.agentList.filter((x) => x.DisplayName == data);
    this.data.TransportAgentMobileNo = a[0].Mobile;
  }
  deleteSelectedRow(config) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        const index = this.vehicleDetail.indexOf(config);
        if (this.vehicleDetail.length == 1 && index == 0) {
          this.vehicleDetail = [];
        } else {
          this.vehicleDetail.splice(index, 1);
        }
        this.messageService.add({
          severity: "success",
          summary: "Removed successfully",
          detail: "",
        });
      },
    });
    // }
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  isAccountEdit: boolean = false;
  isAccountAdd: boolean = false;

  isAccountDetail() {
    //debugger;
    this.accountDisplay = true;
    this.isInvalid = false;
    if (this.isEditOpen) {
      if (
        this.data.fleetMasterAccountDetailDc &&
        this.data.fleetMasterAccountDetailDc.length < 1
      ) {
      } else {
        this.data.fleetMasterAccountDetailDc = [
          {
            Id: 0,
            FleetMasterId: 0,
            AccountNo: "",
            IFSCcode: "",
            BranchName: "",
            BankName: "",
            HolderName: "",
          },
        ];
      }
      this.isAccountEdit = true;
      this.isAccountAdd = false;
    } else {
      this.isAccountEdit = false;
      this.isAccountAdd = true;
    }
  }

  editSelectedaccount(selecteditem, index) {
    debugger;
    this.selectedIndex = index;

    if (this.isEditOpen) {
      this.isAccountEdit = true;
    } else {
      this.isAccountAdd = true;
    }
  }


  isaccountInvalid: boolean = false;

  savefleetAccountDetails(accountdetail) {
    debugger;
    if (accountdetail.form.status == "VALID") {
      this.showTable = true;
      let obj: any = {
        Id: this.isEditOpen ? this.data.fleetMasterAccountDetailDc[0].Id : 0,
        FleetMasterId: this.data.Id ? this.data.Id : 0,
        AccountNo: this.data.fleetMasterAccountDetailDc[0].AccountNo,
        IFSCcode: this.data.fleetMasterAccountDetailDc[0].IFSCcode,
        BranchName: this.data.fleetMasterAccountDetailDc[0].BranchName,
        BankName: this.data.fleetMasterAccountDetailDc[0].BankName,
        HolderName: this.data.fleetMasterAccountDetailDc[0].HolderName,
        CancelledChequePath:
          this.data.fleetMasterAccountDetailDc[0].CancelledChequePath
      };
      if (this.fleetAccountDetail == null) this.fleetAccountDetail = [];

      if (
        obj.AccountNo &&
        obj.BankName &&
        obj.BranchName &&
        obj.HolderName &&
        obj.IFSCcode &&
        obj.CancelledChequePath
      ) {
        if (this.fleetAccountDetail && this.fleetAccountDetail.length == 0) {
          this.fleetAccountDetail.push(obj);
          this.isAccountEdit = false;
          this.isAccountAdd = false;
        } else {
          this.fleetAccountDetail[0] = obj;
          this.isAccountEdit = false;
          this.isAccountAdd = false;
        }
      } else {
        this.isaccountInvalid = true;
        alert("please fill all the field");
      }

      console.log("fleetaccountdetail", this.fleetAccountDetail);
      this.isaccountInvalid = false;

      this.isOpen = false;
    } else {
      this.isaccountInvalid = true;
      this.messageService.add({
        severity: "error",
        summary: "Please Fill required Fields!",
        detail: "",
      });
    }
  }

  deleteAccountDetailRow(config) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        this.fleetMasterService.deleteAccountRow(config.Id).subscribe((x) => {
          console.log(x);
          this.fleetAccountDetail = [];
          this.data.fleetMasterAccountDetailDc = [
            {
              Id: 0,
              FleetMasterId: 0,
              AccountNo: "",
              IFSCcode: "",
              BranchName: "",
              BankName: "",
              HolderName: "",
              CancelledChequePath:""
            },
          ];
        });

        this.messageService.add({
          severity: "success",
          summary: "Removed successfully",
          detail: "",
        });
      },
    });
    // }
  }
  PanImage: any;
  file: any;
  public imagePath;
  imgURL: any;

  uploadAadhar(file: File[]) {
    // this.file = file;
    // var reader = new FileReader();
    // this.imagePath = file;
    // reader.readAsDataURL(file[0]);
    // reader.onload = (_event) => {
    //   this.imgURL = reader.result;
    //   //console.log(this.imgURL, 'urlimg')
    // }
    // (success) => {
    //   alert("image uploaded successfully")
    // };

    // if (confirm("Do you want to upload this file ?")) {
    this.file = file;
    var reader = new FileReader();
    // this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.uploadAadharCopy();
    // } else {
    //   $("#myInput1").val("");

    //   // reader.readAsText(readonly);
    //   return false;
    // }
  }
  AadharImage: any;
  uploadAadharCopy() {
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
      formData.append("file", this.file[0], "AadharBack.jpg");
      this.fleetMasterService.UploadImageDoc(formData).subscribe(
        (result) => {
          console.log(result);
          this.data.AadharImagePath = result;
          this.messageService.add({
            severity: "success",
            summary: "Uploaded Successfully",
            detail: "",
          });
          this.file = [];
          // this.uploadFlagAdhar = false;
          this.AadharImage = result;
        },
        (err) => {}
      );
    }
  }
  file1: any;
  uploadPan(file: File[]) {
    //debugger;

    // if (confirm("Do you want to upload this file ?")) {
    this.file1 = file;
    var reader = new FileReader();
    // this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.uploadPanCopy();
    // } else {
    //   $("#myInput").val("");

    //   // reader.readAsText(readonly);
    //   return false;
    // }
  }
  uploadPanCopy() {
    if (!this.file1) {
      this.messageService.add({
        severity: "error",
        summary: "please choose file",
        detail: "",
      });
      return;
    }
    if (this.file1) {
      let formData = new FormData();
      formData.append("file", this.file1[0], "Pan.jpg");
      this.fleetMasterService.UploadImageDoc(formData).subscribe(
        (result) => {
          console.log(result);
          this.data.PanImagePath = result;
          this.messageService.add({
            severity: "success",
            summary: "Uploaded Successfully",
            detail: "",
          });
          this.file1 = [];
          // this.uploadFlagAdhar = false;
          this.PanImage = result;
        },
        (err) => {}
      );
    }
  }

  agreementfile: any;
  uploadAgreement(file: File[]) {
    this.agreementfile = file;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.uploadAgreementCopy();
  }
  uploadAgreementCopy() {
    if (!this.agreementfile) {
      this.messageService.add({
        severity: "error",
        summary: "please choose file",
        detail: "",
      });
      return;
    }
    if (this.agreementfile) {
      let formData = new FormData();
      formData.append("file", this.agreementfile[0], "Agreement.pdf");
      this.fleetMasterService.UploadImageDoc(formData).subscribe(
        (result) => {
          console.log(result);
          this.data.AgreementPath = result;
          this.messageService.add({
            severity: "success",
            summary: "Uploaded Successfully",
            detail: "",
          });
          this.agreementfile = [];
          // this.PanImage = result;
        },
        (err) => {}
      );
    }
  }

  chequefile: any;
  uploadCancelCheque(file: File[]) {
    this.chequefile = file;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.uploadCancelChequeCopy();
  }
  uploadCancelChequeCopy() {
    debugger;
    if (!this.chequefile) {
      this.messageService.add({
        severity: "error",
        summary: "please choose file",
        detail: "",
      });
      return;
    }
    if (this.chequefile) {
      let formData = new FormData();
      formData.append("file", this.chequefile[0]);
      this.fleetMasterService.UploadImageDoc(formData).subscribe(
        (result) => {
          console.log(result);
          this.data.fleetMasterAccountDetailDc[0].CancelledChequePath = result;
          console.log("this.data.fleetAccountDetail", this.data);

          this.messageService.add({
            severity: "success",
            summary: "Uploaded Successfully",
            detail: "",
          });
          this.chequefile = [];
          // this.PanImage = result;
        },
        (err) => {}
      );
    }
  }

  MSMEfile: any;
  uploadMSME(file: File[]) {
    this.MSMEfile = file;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.uploadMSMECopy();
  }
  uploadMSMECopy() {
    debugger;
    if (!this.MSMEfile) {
      this.messageService.add({
        severity: "error",
        summary: "please choose file",
        detail: "",
      });
      return;
    }
    if (this.MSMEfile) {
      let formData = new FormData();
      formData.append("file", this.MSMEfile[0]);
      this.fleetMasterService.UploadImageDoc(formData).subscribe(
        (result) => {
          console.log(result);
          this.data.MSMECertificatePath = result;
          this.messageService.add({
            severity: "success",
            summary: "Uploaded Successfully",
            detail: "",
          });
          this.MSMEfile = [];
          // this.PanImage = result;
        },
        (err) => {}
      );
    }
  }

  openImage(img) {
    debugger;
    window.open(this.baseURL + img);
  }

  async accountapproval(accountForm: any,status:boolean) {
    debugger;

    if (accountForm.form.status == "VALID") {
     
    
      console.log("approval data", this.data);

      if (status) {
        if (
          this.data &&
          this.data.PanNo &&
          this.data.TransporterStateId &&
          this.data.TransporterCityId &&
          this.data.PanImagePath 
          // &&
          // this.data.IsMSME != null &&
          // this.data.MSMECertificatePath
        ) {
          let isChecksCleared = true;

          if (
            this.data.fleetMasterAccountDetailDc &&
            this.data.fleetMasterAccountDetailDc.length > 0
          ) {
            this.data.fleetMasterAccountDetailDc.forEach((element: any) => {
              if (
                !element.AccountNo ||
                !element.HolderName ||
                !element.IFSCcode ||
                !element.BankName ||
                !element.BranchName
                //  ||
                // !element.CancelledChequePath
              ) {
                isChecksCleared = false;
              }
            });
          } else {
            isChecksCleared = false;
          }

          if (isChecksCleared) {
            if (confirm("Do you want to perform this action ?")) {
              await this.saveFleetMaster(this.data);
              this.fleetMasterService
                .accountApprove(this.data.Id, status)
                .subscribe((x: any) => {
                  console.log(x);
                  if (x.Status) this.data.IsAppprovedByAccount = status;
                  alert(x.Message);
                });
            }
          } else {
            alert("Some Field are missing Fleet in Account Details");
          }
        } else {
          if (this.data.IsMSME == null || !this.data.MSMECertificatePath) {
            alert("please enter MSME details with attachment");
            return;
          }
          alert("please enter payment details");
        }
      } else {
        if (confirm("Do you want to perform this action ?")) {
          await this.saveFleetMaster(this.data);
          this.fleetMasterService
            .accountApprove(this.data.Id, status)
            .subscribe((x: any) => {
              console.log(x);
              if (x.Status) this.data.IsAppprovedByAccount = status;
              alert(x.Message);
            });
        }
      }
    
    } 
    else {
      this.checkAccountInvalid = true;
      // this.messageService.add({
      //   severity: "error",
      //   summary: "Please Fill required Fields!",
      //   detail: "",
      // });
      alert('please fill correct form');
    }
  }

  onAccountEditclose() {
    this.isAccountEdit = false;
  }
}
