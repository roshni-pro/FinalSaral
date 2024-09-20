import { Component, OnInit } from "@angular/core";
import { CityService } from "app/shared/services/city.service";
import { CustomerService } from "app/shared/services/customer.service";
import { ExportServiceService } from "app/shared/services/export-service.service";
import { WarehouseService } from "app/shared/services/warehouse.service";
import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";
import { NewEwayServiceService } from "../Servicee/new-eway-service.service";
import { Item } from "app/category-master/components/sale-default-category/sale-default-category.component";
@Component({
  selector: "app-failed-ewaybills",
  templateUrl: "./failed-ewaybills.component.html",
  styleUrls: ["./failed-ewaybills.component.scss"],
})
export class FailedEwaybillsComponent implements OnInit {
  opengeneratebill: boolean = false;
  RefNo: any;
  GSTCustomerName: any;
  Pincodeone: any;
  Distanceone: any = 0;
  isverify: any;
  VehicleNumgenerateone: any;
  dateMin = new Date();
  // customer={};
  showOrderType:boolean=false;
  General:any[]=[
    {name: 'General', code: 1},
    {name: 'InternalTransfer', code: 0}
  ];
  general:any;
  dateMax = new Date();
  constructor(
    private EwayBillOrderDetailService: NewEwayServiceService,
    private customerService: CustomerService,
    private warehouseService: WarehouseService,
    private cityService: CityService,
    private exportservice: ExportServiceService,
    private msg: MessageService,
    public datepipe: DatePipe,
  ) {}

  OrderTypeListtt: any[] = [];
  ngOnInit() {
    this.GetCity();
    this.dateMax.setDate(this.dateMax.getDate());
    this.OrderTypeListtt = [
      { name: "Issued", code: "Issued" },
      { name: "Ready to Dispatch", code: "Ready to Dispatch" },
      { name: "Shipped", code: "Shipped" },
      // {name: 'Delivered', code: 'Delivered'},
      // {name: 'sattled', code: 'sattled'},
      { name: "Delivery Redispatch", code: "Delivery Redispatch" },
    ];
    this.general={name: 'General', code: 1}
  }

  cityList: any;
  GetCity() {
    // this.blocked=true;
    this.cityService.getAllCityNew().subscribe((result) => {
    
      console.log("result",result);
      this.cityList = result;
      this.GetWarehouse(this.SelectedCityf)
      // this.blocked=false;
    });
  }
  CityIDD: any[] = [];
  WareHouseList: any;
  GetWarehouse(SelectedCityf) {
    // this.blocked=true;
    
    this.CityIDD = [];
    this.SelectedCityf.forEach((element) => {
      this.CityIDD.push(element.value);
      this.customerService
        .GetWarehouseListForTargetV2(this.CityIDD)
        .subscribe((WareRes) => {
          console.log(WareRes,"WareRes");
          
          this.WareHouseList = WareRes;
        });
    });
  }

  TotalRecordFour: any;
  FailedEwaybillDCs: any;
  FromDatefour: any;
  ToDatefour: any;
  OrderIdfour: any;
  selectedWareHouseFour: any;
  OrderType: any;
  SelectedCityf: any;
  blocked: boolean = false;
  FailedEwaybillList: any;
  WareID: any[] = [];
  CID: any[] = [];

  getFailedEwaybillss(event) {
    
    // if(this.tabC==true)
    // {
    //     this.getEwaybillList();
    // }
    
    if (
      this.ToDatefour != undefined &&
      (this.FromDatefour == null || this.FromDatefour == undefined)
    ) {
      this.showError("Please Select StartDate");
      return false;
    } else if (this.ToDatefour == undefined && this.FromDatefour != undefined) {
      this.showError("please select EndDate");
      return false;
    }
    if (
      (this.SelectedCityf == undefined || this.SelectedCityf.length == 0) &&
      (this.lo == false || this.SearchHit == true)
    ) {
      
      this.showError("Select City");
      return false;
    }
    if (
      (this.selectedWareHouseFour == undefined ||
        this.selectedWareHouseFour.length == 0) &&
      (this.lo == false || this.SearchHit == true)
    ) {
      
      this.showError("Select Warehouse");
      return false;
    }
    if (this.SelectedCityf != undefined) {
      this.CID = [];
      this.SelectedCityf.forEach((element) => {
        this.CID.push(element.value);
      });
    }
    if (this.selectedWareHouseFour != undefined) {
      this.WareID = [];
      this.selectedWareHouseFour.forEach((element) => {
        this.WareID.push(element.value);
      });
    }
    if(this.general.name=='InternalTransfer')
    {
     this.showOrderType=true
    }
    else
    {
     this.showOrderType=false
    }
    if (this.SearchHit == true) {
      this.FailedEwaybillDCs = {
        cityid:
          this.SelectedCityf || this.SelectedCityf != undefined ? this.CID : [],
        warehouseId:
          this.selectedWareHouseFour && this.selectedWareHouseFour != undefined
            ? this.WareID
            : [],
        ordertype: this.OrderType ? this.OrderType.code : null,
        orderid: this.OrderIdfour ? this.OrderIdfour : 0,
        Startdate: this.FromDatefour
          ? moment(this.FromDatefour).format("YYYY-MM-DD")
          : null,
        EndDate: this.ToDatefour
          ? moment(this.ToDatefour).format("YYYY-MM-DD")
          : null,
        skip: event && event.first ? event.first : 0,
        take: event && event.rows ? event.rows : 10,
        type: this.general?this.general.code:1
      };
      console.log(this.FailedEwaybillDCs);
      this.blocked = true;
      this.EwayBillOrderDetailService.GetFailedEwaybill(
        this.FailedEwaybillDCs
      ).subscribe((result) => {
        
        this.FailedEwaybillList = result["failedEWayBillOrderDCs"];
        this.TotalRecordFour = result["TotalRecords"];
        console.log("FailedEwaybillList", this.FailedEwaybillList);
        this.blocked = false;
        console.log(result);
        // this.FailedEwaybillList.forEach((element) => {
        //   if (element["ErrorMessage"] == null) {
        //     element.err = "--";
        //   } else {
        //     // element.err=element["ErrorMessage"].split(":",4)
        //     // element.err='"'+element.err[2].split(",",1)
        //   }
        // });
      });
    }
  }
  Capital(event) {
    
    const pattern = /[A-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  FailedEwaybillListExport: any;
  result: any;
  ExportFailedEway() {

    if (
      this.selectedWareHouseFour == undefined &&
      this.SelectedCityf == undefined &&
      this.OrderIdfour == undefined &&
      this.OrderType == undefined &&
      this.FromDatefour == undefined &&
      this.ToDatefour == undefined
    ) {
      
      this.showError("Please select atlest one filter criteria");
      return false;
    }
    if (this.FailedEwaybillList == undefined) {
      this.showError("Please search the data first");
      return false;
    }
    if (
      this.ToDatefour != undefined &&
      (this.FromDatefour == null || this.FromDatefour == undefined)
    ) {
      this.showError("Please Select StartDate");
      return false;
    } else if (this.ToDatefour == undefined && this.FromDatefour != undefined) {
      this.showError("please select EndDate");
    }

    if (this.SelectedCityf != undefined) {
      this.CID = [];
      this.SelectedCityf.forEach((element) => {
        this.CID.push(element.value);
      });
    }
    if (this.selectedWareHouseFour != undefined) {
      this.WareID = [];
      this.selectedWareHouseFour.forEach((element) => {
        this.WareID.push(element.value);
      });
    }
    if (this.selectedWareHouseFour != undefined) {
      this.FailedEwaybillDCs = {
        cityid:
          this.SelectedCityf || this.SelectedCityf != undefined ? this.CID : [],
        warehouseId:
          this.selectedWareHouseFour && this.selectedWareHouseFour != undefined
            ? this.WareID
            : [],
        ordertype: this.OrderType ? this.OrderType.code : null,
        orderid: this.OrderIdfour ? this.OrderIdfour : 0,
        Startdate: this.FromDatefour
          ? moment(this.FromDatefour).format("YYYY-MM-DD")
          : null,
        EndDate: this.ToDatefour
          ? moment(this.ToDatefour).format("YYYY-MM-DD")
          : null,
        skip:  0,
        take: this.TotalRecordFour,
        type: this.general?this.general.code:1
      };

      console.log(this.FailedEwaybillDCs);
      var failedexportnew;
      this.blocked = true;
      this.EwayBillOrderDetailService.GetFailedEwaybill(
        this.FailedEwaybillDCs
      ).subscribe((result: any) => {
        this.FailedEwaybillListExport = result.failedEWayBillOrderDCs;

        failedexportnew = this.FailedEwaybillListExport.map(function (a) {
          return {
            // PaymentRefNo: a.PaymentRefNo,
            
            OrderId: a.OrderId,
            orderamount: a.orderamount,
            InvoiceNo: a.InvoiceNo,
            OrderStatus: a.OrderStatus,
            // EwayBillNumber:a.EwayBillNumber,
            //EwayBillDate :a.EwayBillDate,
            CreatedDate: a.CreatedDate,
            // EwayBillValidTill:a.EwayBillValidTill,
            CustomerTypeName: a.CustomerTypeName,
            ErrorMessage: a.ErrorMessage,
          };
        });
        if (failedexportnew && failedexportnew.length > 0) {
          this.exportservice.exportAsExcelFile(
            failedexportnew,
            "Export Failed Eway-bills Data"
          );
          this.blocked = false;
        } else {
          this.showError("No Data Found!");
          this.blocked = false;
        }
      });
    }
  }

  ClearFailedEway() {
    this.SelectedCityf = undefined;
    this.selectedWareHouseFour = undefined;
    this.WareHouseList = [];
    this.OrderType = undefined;
    this.OrderIdfour = undefined;
    this.ToDatefour = undefined;
    this.selectedWareHouseFour = undefined;
    this.FromDatefour = undefined;
    this.FailedEwaybillList = [];
  }
  GenerateTransporterDocNumber: any;
  GenerateTransporterDocDate: any;
  isVehicleNumgenerateone: boolean = false;
  isPincodeone: boolean = false;
  isRefNo: boolean = false;
  isGSTCustomerName: boolean = false;
  isGenerateTransporterDocNumber: boolean = false;
  isGenerateTransporterDocDate: boolean = false;
  isDistanceone: boolean = false;
  failedewaylist: any;
  ReGenrate(failedewaylist) {
    // console.log("ITEM",failedewaylist );
console.log(failedewaylist);

    this.opengeneratebill = true;
    this.failedewaylist = failedewaylist;
    
    // console.log("this.failedewaylist",this.failedewaylist.OrderId);
  }

  generateeeCancel() {
    console.log(this.failedewaylist);
    
    this.opengeneratebill = false;
    this.VehicleNumgenerateone = "";
    this.failedewaylist = [];
    (this.GenerateTransporterDocNumber = ""),
      (this.GenerateTransporterDocDate = ""),
      (this.Distanceone = ""),
      (this.Pincodeone = ""),
      (this.RefNo = ""),
      (this.GSTCustomerName = "");
  }
  generatesuubmitbtn() {
    
    if (!this.VehicleNumgenerateone) {
      this.isVehicleNumgenerateone = true;
    }
    if (!this.Pincodeone) {
      this.isPincodeone = true;
    }
    if (!this.RefNo) {
      this.isRefNo = false;
    }
    if (!this.GSTCustomerName) {
      this.isGSTCustomerName = false;
    }
    if (this.RefNo && !this.GSTCustomerName) {
      this.isGSTCustomerName = true;
    }
    if (this.GSTCustomerName && !this.RefNo) {
      this.isRefNo = true;
    }
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
      if (this.VehicleNumgenerateone && this.Pincodeone) {
    
        const payload = {
          orderid: this.failedewaylist.OrderId,
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
            : moment(this.GenerateTransporterDocDate).format("DD/MM/YY"),
          distance: !this.Distanceone ? 0 : this.Distanceone,
          topincode: this.Pincodeone ? this.Pincodeone : 0,
          CustomerType: this.failedewaylist.CustomerTypeName,
        };
        this.blocked = true;
    
        if(this.general.name=='General')
        {
        this.EwayBillOrderDetailService.ReGenerateEwayBYIRN(payload).subscribe(
          (res: any) => {
            this.VehicleNumgenerateone = "";
            this.failedewaylist = [];
            (this.GenerateTransporterDocNumber = ""),
              (this.GenerateTransporterDocDate = ""),
              (this.Distanceone = ""),
              (this.Pincodeone = ""),
              (this.RefNo = ""),
              (this.GSTCustomerName = "");
            if (res) {
              alert("Eway Bill ReGenerated!!");
              this.opengeneratebill = false;
              this.blocked = false;
              // this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe((result:any)=>{
              //   this.r = result
              //   this.orderlist=this.r.getEwaydata
              //   console.log("orderlist",this.orderlist);
              //   this.TotalRecord=this.r.TotalRecord
              //   this.blocked=false;
              // })
              this.getFailedEwaybillss(event)
            } else {
              alert("Eway Bill Not Generated!!");
              this.opengeneratebill = false;
              this.blocked = false;
              this.getFailedEwaybillss(event)
            }
          
          }
        );
        }
        else{
          const payload1 = {
            TransferOrderId: this.failedewaylist.OrderId,
            vehicleno: !this.VehicleNumgenerateone
              ? null
              : this.VehicleNumgenerateone,
              TransportName: this.GSTCustomerName,
              TransportGST: this.RefNo,
              TransDocNo: !this.GenerateTransporterDocNumber
              ? null
              : this.GenerateTransporterDocNumber,
              TransDocDt: !this.GenerateTransporterDocDate
              ? null
              : moment(this.GenerateTransporterDocDate).format("DD/MM/YY"),
            distance: !this.Distanceone ? 0 : this.Distanceone,
            topincode: this.Pincodeone ? this.Pincodeone : 0,
            CustomerType: this.failedewaylist.CustomerTypeName,
          };

          this.EwayBillOrderDetailService.ReGenerateEwayBYIRNN(payload1).subscribe(
            (res: any) => {
              this.VehicleNumgenerateone = "";
              this.failedewaylist = [];
              (this.GenerateTransporterDocNumber = ""),
                (this.GenerateTransporterDocDate = ""),
                (this.Distanceone = ""),
                (this.Pincodeone = ""),
                (this.RefNo = ""),
                (this.GSTCustomerName = "");
              if (res) {
                alert("Eway Bill ReGenerated!!");
                this.opengeneratebill = false;
                this.blocked = false;
                // this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe((result:any)=>{
                //   this.r = result
                //   this.orderlist=this.r.getEwaydata
                //   console.log("orderlist",this.orderlist);
                //   this.TotalRecord=this.r.TotalRecord
                //   this.blocked=false;
                // })
                this.getFailedEwaybillss(event)
              } else {
                alert("Eway Bill Not Generated!!");
                this.opengeneratebill = false;
                this.blocked = false;
                this.getFailedEwaybillss(event)
              }
            
            }
          );

        }
      }
    }
  }
customer = {NameOnGST:"",BillingCity:"",BillingZipCode:"",BillingState:"",BillingAddress:""};
GSTData:any;
GSTdisplay:boolean
  // VarifiedCustomerGSTNO(text) {
  //   if (text.length == 15) {
  //     this.blocked = true;
  //     this.customerService
  //       .CheckVarifiedCustomerGSTNO(text)
  //       .subscribe((result) => {
  //         if (result.Status) {
  //           this.blocked = false;
  //           this.customer.NameOnGST = result.custverify.Name;
  //           this.GSTCustomerName=this.customer.NameOnGST
  //           this.customer.BillingCity = result.custverify.City;
  //           this.customer.BillingState = result.custverify.State;
  //           this.customer.BillingZipCode = result.custverify.Zipcode;
  //           this.customer.BillingAddress = result.custverify.ShippingAddress;
  //           this.GSTData = result.custverify;
  //           this.GSTdisplay = true;
  //           // this.IsGstDisturb = false;
  //           // this.IsBillingAddEditable = true;
  //           alert("GST Verified");

  //         } else {
  //           this.blocked = false;
  //           alert("Invalid  GST/TIN_No/Ref No.");
  //         }
  //       });
  //   } else {
  //     alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE");
  //   }
  // }

  SearchHit: boolean = false;
  ForSearchHit() {
    this.SearchHit = true;
    this.first = 0;
    this.TotalRecordFour=0;
  }
  lo: boolean = false;
  load(event) {
    this.lo = true;
    this.getFailedEwaybillss(event);
  }

  showError(msg1: string) {
    this.msg.add({ severity: "error", summary: "Error", detail: msg1 });
  }
  showSuccess(msg1: string) {
    this.msg.add({ severity: "success", summary: "Success", detail: msg1 });
  }

  isSearch: boolean = false;
  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
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
  skip: any;
  take: any;
  first: number = 0;
  EmptyITList() {
    this.FailedEwaybillList = undefined;
    this.TotalRecordFour = 0;
    this.skip = 0;
    this.take = 0;
    this.first = 0;
  }

  EmptyITListw() {
    this.FailedEwaybillList = undefined;
    this.TotalRecordFour = 0;
    this.skip = 0;
    this.take = 0;
    this.first = 0;
    this.selectedWareHouseFour = [];
    this.CityIDD = [];
  }
}
