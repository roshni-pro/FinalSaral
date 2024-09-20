import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CityService } from "app/shared/services/city.service";
import { CustomerService } from "app/shared/services/customer.service";
import { ExportServiceService } from "app/shared/services/export-service.service";
import { WarehouseService } from "app/shared/services/warehouse.service";
import * as moment from "moment";
import { MessageService } from "primeng/api";
import { NewEwayServiceService } from "../Servicee/new-eway-service.service";
import { unescape } from "querystring";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import * as FileSaver from 'file-saver';
import { PepolePilotService } from "app/shared/services/pepole-pilot.service";
@Component({
  selector: "app-order-page",
  templateUrl: "./order-page.component.html",
  styleUrls: ["./order-page.component.scss"],
})
export class OrderPageComponent implements OnInit {
  entity: any;
  constructor(
    private EwayBillOrderDetailService: NewEwayServiceService,
    private customerService: CustomerService,
    private router: Router,
    private cityService: CityService,
    private exportservice: ExportServiceService, private peoplePilot: PepolePilotService,
    private msg: MessageService,
    public datepipe: DatePipe
  ) {
    this.entity = "OrderEwayBill";
  }
  Updatetabledata: any;
  Vehiclenumupdatetwo: any;
  placeofchangeupdate: any;
  Reason: any;
  UpdateComment: any;
  openupdatepopup: any;
  openupdatepopupA: any;
  TransDocNoU: any;
  TransDocDtU: any;
  reasoncancel: any;
  CommentCancel: any;
  opencancelbill: boolean = false;
  selectedWareHouse: any;
  OrderId: any;
  FromDate: any;
  ToDate: any;
  Status: any;
  OrderDCs: any;
  SKCode: any;
  skip: any;
  take: any;
  blocked: boolean = false;
  TotalRecord: any;
  r: any;
  CityIDD: any[] = [];
  WareID: any[] = [];
  SearchHit: boolean = false;
  status: any = ([] = []);
  reasonss: any = ([] = []);
  opencancelbil: any[];
  first: number = 0;
  GenerateTableData: any;
  opengeneratebill: any;
  opengeneratebillA: any
  RefNo: any;
  GSTCustomerName: any;
  Pincodeone: any;
  Distanceone: any = 0;
  isverify: any;
  VehicleNumgenerateone: any;
  cityList: any;
  CtyIdd: any[] = [];
  SelectedCity: any[] = [];
  WareHouseList: any[] = [];
  popupOpen: boolean = false;
  dateMin = new Date();
  roleName: any;
  roleList: any;
  roleListarry: boolean = true;
  dateMax = new Date();
  ngOnInit() {
   

    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);
      
      for (var i in this.roleList) {
        if (this.roleList[i] == 'WH delivery planner' || this.roleList[i] == 'Outbound Lead' || this.roleList[i]=='Hub delivery planner') {
          this.roleListarry = false;
        }
        
      }
      

    });


    this.dateMax.setDate(this.dateMax.getDate());

    this.status = [
      { name: "Issued", code: "Issued" },
      { name: "Ready to Dispatch", code: "Ready to Dispatch" },
      { name: "Shipped", code: "Shipped" },
      // {name: 'Delivered', code: 'Delivered'},
      // {name: 'sattled', code: 'sattled'},
      { name: "Delivery Redispatch", code: "Delivery Redispatch" },
    ];
    this.reasonss = [
      { name: "DUE TO BREAK DOWN", code: 1 },
      { name: "DUE TO TRANSSHIPMENT", code: 2 },
      { name: "OTHERS", code: 3 },
      { name: "FIRST TIME", code: 4 },
    ];
    this.opencancelbil = [
      { name: "DUPLICATE", code: 1 },
      { name: "ORDER_CANCELLED", code: 2 },
      { name: "DATA_ENTRY_MISTAKE", code: 3 },
      { name: "OTHERS", code: 4 },
    ];
    this.GetCity();
    this.GetWarehouse(this.SelectedCity);
  }

  GetCity() {
    this.cityService.getAllCityNew().subscribe((result) => {
      this.cityList = result;
    });
  }

  GetWarehouse(SelectedCity) {
  
    this.CtyIdd = [];
    if (this.SelectedCity.length > 0 || this.SelectedCity != undefined) {
      this.SelectedCity.forEach((element) => {
        this.CtyIdd.push(element.value);
      });
      this.customerService
        .GetWarehouseListForTargetV2(this.CtyIdd)
        .subscribe((WareRes) => {
          console.log(WareRes,"WareRes");
          
          this.WareHouseList = WareRes;

          // this.blocked=false;
        });
    }
  }

  orderlist: any;
  orderlistEmpty() {
    this.orderlist = undefined;
    this.skip = 0;
    this.take = 0;
    this.first = 0;
    this.TotalRecord = 0;
  }
  orderlistEmptyw() {
    this.orderlist = undefined;
    this.skip = 0;
    this.take = 0;
    this.first = 0;
    this.TotalRecord = 0;
    this.selectedWareHouse = [];
  }

  orderlistEmptywarehouse() {
    this.orderlist = undefined;
    this.skip = 0;
    this.take = 0;
    this.first = 0;
    this.TotalRecord = 0;
    this.selectedWareHouse = [];
  }
  isSearch: boolean = false;
  toggleSearchone() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
  }

  showError(msg1: string) {
    this.msg.add({ severity: "error", summary: "Error", detail: msg1 });
  }
  showSuccess(msg1: string) {
    this.msg.add({ severity: "success", summary: "Success", detail: msg1 });
  }

  ForSearchHit() {
    this.SearchHit = true;
    this.first = 0;
    this.TotalRecord = 0;
  }
  getEwaybillList(event: any) {
    if (
      (this.SelectedCity == undefined || this.SelectedCity.length == 0) &&
      (this.lo == false || this.SearchHit == true)
    ) {
      alert("Select City");
      return false;
    }
    if (
      (this.selectedWareHouse == undefined ||
        this.selectedWareHouse.length == 0) &&
      (this.lo == false || this.SearchHit == true)
    ) {
      alert("Select Warehosue");
      return false;
    }
    if (this.FromDate == undefined && this.ToDate != undefined) {
      this.showError("please select StartDate");
      return false;
    } else if (this.ToDate == undefined && this.FromDate != undefined) {
      this.showError("please select EndDate");
      return false;
    }
    if (this.selectedWareHouse != undefined) {
      this.WareID = [];
      this.selectedWareHouse.forEach((element) => {
        this.WareID.push(element.value);
      });
    }
    if (this.SelectedCity != undefined) {
      this.CityIDD = [];
      this.SelectedCity.forEach((element) => {
        this.CityIDD.push(element.value);
      });
    }
    if (this.SearchHit == true) {
      
      this.OrderDCs = {
        cityid: this.SelectedCity ? this.CityIDD : [],
        warehouseid: this.selectedWareHouse ? this.WareID : [],
        startdate: this.FromDate
          ? moment(this.FromDate).format("YYYY-MM-DD")
          : null,
        EndDate: this.ToDate ? moment(this.ToDate).format("YYYY-MM-DD") : null,
        orderid: this.OrderId ? this.OrderId : 0,
        skcode: this.SKCode ? this.SKCode : null,
        Status: this.Status ? this.Status.code : null,
        // "skip":this.skip,
        // "take":this.take
        skip: event && event.first ? event.first : 0,
        take: event && event.rows ? event.rows : 10,
      };
      this.blocked = true;
      this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe(
        (result: any) => {
          console.log(result);
          //this.first=0;
          this.r = result;
          this.orderlist = this.r.getEwaydata;
          console.log("orderlist", this.orderlist);
          this.TotalRecord = this.r.TotalRecord;
          console.log("tr", this.TotalRecord);
          // this.tabC==false;
          this.blocked = false;
        }
      );
    }
  }

  ClearEwayOrders() {
    this.SelectedCity = undefined;
    (this.selectedWareHouse = undefined), (this.TotalRecord = undefined);
    this.OrderId = undefined;
    this.FromDate = undefined;
    this.ToDate = undefined;
    this.Status = undefined;
    this.orderlist = [];
    this.orderlist = undefined;
  }

  orderlistt: any[];
  OrderDCsExport: any;
  ExportEwayOrders() {
   
    // if( this.searchModel.SelectedCity==undefined  && this.searchModel.selectedWareHouse==undefined &&   this.searchModel.SkCode == undefined && this.searchModel.OrderId==undefined && this.searchModel.FromDate==undefined &&   this.searchModel.ToDate==undefined &&   this.searchModel.Status ==undefined)
    // {
    //   this.showError("Please select atlest one filter criteria")
    //   return false;
    // }
    if (this.orderlist == undefined) {
      this.showError("Please search the data first");
      return false;
    } else if (this.FromDate == undefined && this.ToDate != undefined) {
      this.showError("please select StartDate");
    } else if (this.ToDate == undefined && this.FromDate != undefined) {
      this.showError("please select EndDate");
    }

    if (this.selectedWareHouse != undefined) {
      this.WareID = [];
      this.selectedWareHouse.forEach((element) => {
        this.WareID.push(element.value);
      });
    }
    if (this.SelectedCity != undefined) {
      this.CityIDD = [];
      this.SelectedCity.forEach((element) => {
        this.CityIDD.push(element.value);
      });
    }
    // else if(this.OrderId !=0 && this.OrderId !='' && this.OrderId !=undefined && this.SelectedCity==undefined
    // && this.selectedWareHouse==undefined  &&  this.Status ==undefined && this.ToDate==undefined && this.FromDate==undefined)
    // {
    if ((this, this.orderlist != undefined)) {
      this.OrderDCsExport = {
        cityid: this.SelectedCity ? this.CityIDD : [],
        warehouseid: this.selectedWareHouse ? this.WareID : [],
        startdate: this.FromDate
          ? moment(this.FromDate).format("YYYY-MM-DD")
          : null,
        EndDate: this.ToDate ? moment(this.ToDate).format("YYYY-MM-DD") : null,
        orderid: this.OrderId ? this.OrderId : 0,
        skcode: this.SKCode ? this.SKCode : null,
        Status: this.Status ? this.Status.code : null,
        skip: 0,
        take: this.TotalRecord,
        // "skip":this.skip,
        // "take":this.take
      };
      var orderlisttnew;
      this.blocked = true;
      this.EwayBillOrderDetailService.GetEwaybillOrder(
        this.OrderDCsExport
      ).subscribe((result) => {
        this.r = result;
        this.orderlistt = this.r.getEwaydata;
        this.TotalRecord = this.r.TotalRecord;
        orderlisttnew = this.orderlistt.map(function (a) {
          return {
            // PaymentRefNo: a.PaymentRefNo,
            OrderId: a.OrderId,
            orderamount: a.orderamount,
            InvoiceNo: a.InvoiceNo,
            OrderStatus: a.OrderStatus,
            Skcode: a.Skcode,
            CustomerName: a.CustomerName,
            MobileNo: a.MobileNo,
            EwayBillNumber: a.EwayBillNumber,
            EwayBillDate: a.EwayBillDate,
            EwayBillValidTill: a.EwayBillValidTill,
            CustomerTypeName: a.CustomerTypeName,
            IsExtendEwayBill: a.IsExtendEwayBill,
            IsCancelEwayBill: a.IsCancelEwayBill,
            EwayBillCancelDate: a.EwayBillCancelDate,
          };
        });
        if (orderlisttnew && orderlisttnew.length > 0) {
          this.exportservice.exportAsExcelFile(
            orderlisttnew,
            "Export Eway Bill Order Data"
          );
          this.blocked = false;
        } else {
          this.showError("No Data Found!");
          this.blocked = false;
        }
      });
    }
  }
  lo: boolean = false;
  load(event) {
    this.lo = true;
    this.getEwaybillList(event);
  }

  canceltabledata: any;
  CancelOrder(item) {
    
    this.canceltabledata = item;
    this.reasoncancel = undefined;
    this.CommentCancel = undefined;
    this.cpress = false;
    this.opencancelbill = true;
  }

  Regeneratebtn() {
    alert("regenerate");
  }

  ewaybillpdf: any;
  orderid: any;
  exportPdf(ewaybillno, orderid, CustomerType) {
    this.ewaybillpdf = JSON.parse(ewaybillno)
    console.log(this.ewaybillpdf, "this.ewaybillpdf");

    var myArray = [];
    {
      myArray.push(this.ewaybillpdf);
    }
    const payload = {
      ewb_numbers: myArray,
      custometType: CustomerType,
      OrderId: orderid
    };
    this.EwayBillOrderDetailService.GetEwaybillPdf(payload).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status) {
          window.open(environment.apiURL + result.EwayBillPDF);
          // var file = new Blob([result.EwayBillPDF.blob()], { type: 'application/pdf' })
          // var fileURL = URL.createObjectURL(file);
          // window.open(fileURL); // if you want to open it in new tab
          // var a         = document.createElement('a');
          // a.href        = fileURL; 
          // a.target      = '_blank';
          // a.download    = 'bill.pdf';
          // document.body.appendChild(a);
          // a.click();
        } else {
          this.showError(result.Message);
        }

      }


    );
  }


  generateitem(item) {
   
    this.GenerateTableData = item;
    this.isverify = false;
    this.opengeneratebill = true;
    this.opengeneratebillA = false;
    this.RefNo = undefined;
    this.GSTCustomerName = undefined;
    this.GenerateTransporterDocNumber = undefined;
    this.GenerateTransporterDocDate = undefined;
    this.Pincodeone = undefined;
    this.Distanceone = 0;
    this.key = false;
    this.VehicleNumgenerateone = undefined;
  }

  OrderPageHistoryData: any;
  ophd: boolean = false;
  rowDataV1: any;
  OrderHistory(rowDataV1) {

    this.rowDataV1 = rowDataV1;
    this.popupOpen = true;
  
    // this.EwayBillOrderDetailService.OrderPageHistory(d.OrderId).subscribe(res=>{
    //   console.log(res);
    //   this.ophd=true
    //   this.OrderPageHistoryData=res
    // })
  }
  onDismiss() {
    this.ophd = false;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  GSTdisplay: boolean = false;
  // VarifiedCustomerGSTNO(text) {
  //   if (text == undefined) {
  //     alert("Please enter Transport GST");
  //   }
  //   if (text.length == 15) {
  //     this.blocked = true;
  //     this.EwayBillOrderDetailService.CheckVarifiedCustomerGSTNO(
  //       text
  //     ).subscribe((result) => {
  //       console.log(result,"VarifiedCustomerGSTNO");

  //       if (result.Status && result.custverify.Active=="Active") {
  //         this.GSTCustomerName = result.custverify.Name;
  //         this.GSTdisplay = true;
  //         this.isverify = true;
  //         this.blocked = false;
  //       } else {
  //         this.isverify = false;
  //         alert("Invalid  Transport GST. ");
  //         this.blocked = false;
  //       }
  //     });
  //   } else {
  //     this.isverify = false;
  //     alert("Please enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE");
  //     this.blocked = false;
  //   }
  // }

  GenerateTransporterDocNumber: any;
  GenerateTransporterDocDate: any;
  isVehicleNumgenerateone: boolean = false;
  isPincodeone: boolean = false;
  isRefNo: boolean = false;
  isGSTCustomerName: boolean = false;
  isGenerateTransporterDocNumber: boolean = false;
  isGenerateTransporterDocDate: boolean = false;
  isDistanceone: boolean = false;
  key: boolean = false;
  generatesuubmitbtn() {
  
    if (!this.VehicleNumgenerateone) {
      this.isVehicleNumgenerateone = true;
    }
    if (!this.Pincodeone) {
      this.isPincodeone = true;
    }
    // if (!this.RefNo) {
    //   this.isRefNo = false;
    // }
    // if (!this.GSTCustomerName) {
    //   this.isGSTCustomerName = false;
    // }
    // if (this.RefNo && !this.GSTCustomerName) {
    //   this.isGSTCustomerName = true;
    // }
    // if (this.GSTCustomerName && !this.RefNo) {
    //   this.isRefNo = true;
    // }
    if (!this.GenerateTransporterDocNumber) {
      this.isGenerateTransporterDocNumber = false;
    }
    if (!this.GenerateTransporterDocDate) {
      this.isGenerateTransporterDocDate = false;
    }
    if (this.GenerateTransporterDocNumber && !this.GenerateTransporterDocDate) {
      this.isGenerateTransporterDocDate = true;
    }
    if (this.GenerateTransporterDocDate && !this.GenerateTransporterDocNumber) {
      this.isGenerateTransporterDocNumber = true;
    }
    // if (this.Distanceone == 0 || this.Distanceone == "") {
    //   this.Distanceone = 0;
    // }
    // if (this.RefNo && !this.isverify) {
    //   this.showError("Please Enter Valid Transport GST Number");
    //   return false;
    // }
    else {
      if (this.VehicleNumgenerateone) {
        const payload = {
          orderid: this.GenerateTableData.OrderId,
          vehicleno: !this.VehicleNumgenerateone
            ? null
            : this.VehicleNumgenerateone,
          transportername: this.GSTCustomerName,
          transportergst: this.RefNo,
          transporterdocno: !this.GenerateTransporterDocNumber
            ? null
            : this.GenerateTransporterDocNumber,
          transporterdocdate: !this.GenerateTransporterDocDate
            ? null
            : this.GenerateTransporterDocDate,
          distance: !this.Distanceone ? 0 : this.Distanceone,
          topincode: this.Pincodeone ? this.Pincodeone : 0,
          CustomerType: 0 //this.GenerateTableData.CustomerTypeName,
        };
        this.blocked = true;
        this.EwayBillOrderDetailService.ReGenerateEwayBYIRN(payload).subscribe(
          (res: any) => {
            if (res) {
              alert("Eway Bill ReGenerated!!");
              this.opengeneratebill = false;
              this.opengeneratebillA = false;
              this.blocked = true;
              this.EwayBillOrderDetailService.GetEwaybillOrder(
                this.OrderDCs
              ).subscribe((result: any) => {
                this.r = result;
                this.orderlist = this.r.getEwaydata;
                console.log("orderlist", this.orderlist);
                this.TotalRecord = this.r.TotalRecord;
                this.blocked = false;
              });
            } else {
              alert("Eway Bill Not Generated!!");
              this.opengeneratebill = false;
              this.opengeneratebillA = false;
              this.blocked = false;
            }
          }
        );
      }
    }
  }
 

  generateeeCancel() {
    this.opengeneratebill = false;
    this.openupdatepopupA = false;
    this.isverify = false;
  }

  GSTdisplayClose() {
    this.GSTdisplay = false;
  }
  StateCodee: number = 0;
  Capital(event) {
   
    const pattern = /[A-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  DocumentRegex(event) {
  
    const pattern = /[a-zA-Z0-9\\\-\/\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  updateitem(enm) {
  
    console.log(enm);
    this.Updatetabledata = enm;
    this.Vehiclenumupdatetwo = undefined;
    this.Transporterid=undefined;
    this.placeofchangeupdate = undefined;
    this.Reason = undefined;
    this.StateCodee = 0;
    this.TransDocDtU = undefined;
    this.TransDocNoU = unescape;
    this.UpdateComment = undefined;
    this.openupdatepopup = true;
  }
  UpdatePartAsubmit(enm) {
  
    console.log(enm);
    this.Updatetabledata = enm;
    this.Vehiclenumupdatetwo = undefined;
    this.Transporterid=undefined;
    this.placeofchangeupdate = undefined;
    this.Reason = undefined;
    this.StateCodee = 0;
    this.TransDocDtU = undefined;
    this.TransDocNoU = unescape;
    this.UpdateComment = undefined;
    this.openupdatepopupA = true;
  }

  isVehiclenumupdatetwo: boolean = false;
  isplaceofchangeupdate: boolean = false;
  isTransDocNoU: boolean = false;
  isTransDocDtU: boolean = false;
  isReason: boolean = false;
  Updatesubmit() {
  
    if (this.Vehiclenumupdatetwo == undefined) {
      this.isVehiclenumupdatetwo = true;
    }
    if (this.placeofchangeupdate == undefined) {
      this.isplaceofchangeupdate = true;
    }
    if (
      (this.TransDocNoU == undefined || this.TransDocNoU == "") &&
      this.TransDocDtU
    ) {
      this.isTransDocNoU = true;
      return false;
    }
    if (this.TransDocNoU == undefined) {
      this.isTransDocNoU = false;
    } else if (this.TransDocNoU && this.TransDocDtU == undefined) {
      this.isTransDocDtU = true;
      return false;
    }
    if (this.TransDocDtU == undefined) {
      this.isTransDocDtU = false;
    }
    if (this.Reason == undefined) {
      this.isReason = true;
    }
    if (
      this.Vehiclenumupdatetwo != undefined &&
      this.placeofchangeupdate != undefined &&
      this.Reason != undefined
    ) {
      var eway = parseInt(this.Updatetabledata.EwayBillNumber);
      const payload = {
        orderid: this.Updatetabledata.OrderId,
        EwbNumber: eway,
        VehNo:
          this.Vehiclenumupdatetwo == undefined
            ? null
            : this.Vehiclenumupdatetwo,
        FromPlace: this.placeofchangeupdate,
        FromState: this.StateCodee,
        ReasonCode: this.Reason.code,// this.Updatetabledata.CustomerType==0 ? this.Reason.code : this.Reason.name,
        ReasonRemark: this.Reason.name,
        TransDocNo: this.TransDocNoU == undefined ? null : this.TransDocNoU,
        TransDocDt:
          this.TransDocDtU == undefined
            ? null
            : moment(this.TransDocDtU).format("DD/MM/YYYY"),
        Customertype: 0,//this.Updatetabledata.CustomerType,
        APITypes: 1
      };
      console.log(payload);
     
      this.blocked = true;
      this.EwayBillOrderDetailService.updateVehiclePartB(payload).subscribe(
        (res: any) => {
        
          this.blocked = false;
          if (res.status == true) {
            alert(res.Message);
            this.openupdatepopup = false;
            this.openupdatepopupA = false;
            this.blocked = true;
            this.EwayBillOrderDetailService.GetEwaybillOrder(
              this.OrderDCs
            ).subscribe((result: any) => {
              console.log(result);
              //this.first=0;
              this.r = result;
              this.orderlist = this.r.getEwaydata;
              console.log("orderlist", this.orderlist);
              this.TotalRecord = this.r.TotalRecord;
              this.blocked = false;
            });
          } else {
            alert(res.Message);
            //this.openupdatepopup=false;
            this.blocked = false;
          }
        }
      );
    }
  }
  Transporterid: any
  generatesuubmitbtnn() {
   
    var eway = parseInt(this.Updatetabledata.EwayBillNumber);
    const payload = {
      Orderid: this.Updatetabledata.OrderId,
      EwbNumber: eway,
      TransporterId: this.Transporterid,
      Customertype: 0,//this.Updatetabledata.CustomerType,
      APITypes: 1
    };
    console.log(payload);
  
    this.blocked = true;
    this.EwayBillOrderDetailService.UpdatePartA(payload).subscribe(
      (res: any) => {
      
        console.log(res, "res");
        this.blocked = false;
        if (res.status == true) {
          alert(res.Message);
          this.openupdatepopup = false;
          this.openupdatepopupA = false;
          this.blocked = true;
          this.EwayBillOrderDetailService.GetEwaybillOrder(
            this.OrderDCs
          ).subscribe((result: any) => {
            console.log(result);
            //this.first=0;
            this.r = result;
            this.orderlist = this.r.getEwaydata;
            console.log("orderlist", this.orderlist);
            this.TotalRecord = this.r.TotalRecord;
            this.blocked = false;
          });
        } else {
          alert(res.Message);
          //this.openupdatepopup=false;
          this.blocked = false;
        }
      }
    );

  }
  updatepopupClose() {
    this.openupdatepopup = false;
    this.openupdatepopupA = false
  }
  disabled: boolean = false;
  reasonchaneg() {
    if (this.Reason.name == "Other") {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  cancelbillBtn() {
    this.opencancelbill = false;
  }

  kl: boolean = false;
  cpress: boolean = false;
  CancelSubmitBtn() {
   
    this.cpress = true;
    if (this.reasoncancel != undefined) {
      var eway = parseInt(this.canceltabledata.EwayBillNumber);
      const payload = {
        orderid: this.canceltabledata.OrderId,
        ewbNo: eway,
        cancelRsnCode: this.reasoncancel.name,
        // this.canceltabledata.CustomerType == 0
        //   ? this.reasoncancel.name
        //   : this.reasoncancel.code,
        cancelRmrk: this.reasoncancel.name,
        Customertype: 0,//this.canceltabledata.CustomerType,
        APITypes: 1
      };
      console.log(payload);
      this.blocked = true;
      this.EwayBillOrderDetailService.CancelEwayBill(payload).subscribe(
        (res: any) => {
          
          console.log(res);
          if (res.status == true) {
            alert(res.Message);
            this.opencancelbill = false;
            this.EwayBillOrderDetailService.GetEwaybillOrder(
              this.OrderDCs
            ).subscribe((result: any) => {
              console.log(result);
              this.r = result;
              this.orderlist = this.r.getEwaydata;
              this.TotalRecord = this.r.TotalRecord;
              this.blocked = false;
            });
          } else {
            alert(res.Message);
            this.opencancelbill = false;
            this.blocked = false;
          }
        }
      );
    }
  }

  disabledd: boolean = false;
  cancelreasonchange() {
    if (this.reasoncancel.name == "OTHERS") {
      this.disabledd = true;
    } else {
      this.disabledd = false;
    }
  }
}
