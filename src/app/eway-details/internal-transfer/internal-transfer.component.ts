import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';
import { unescape } from "querystring";
import { MessageService } from 'primeng/api';
import { NewEwayServiceService } from '../Servicee/new-eway-service.service';
import { log } from 'console';
import { environment } from "environments/environment";
import { Router } from '@angular/router';


@Component({
  selector: 'app-internal-transfer',
  templateUrl: './internal-transfer.component.html',
  styleUrls: ['./internal-transfer.component.scss']
})
export class InternalTransferComponent implements OnInit {
  GenerateTableData: any;
  isverify: any;
  opengeneratebill: any;
  GenerateTransporterDocNumber:any;
  Pincodeone:any;
  RefNo: any;
  GenerateTransporterDocDate:any;
  GSTCustomerName :any;
  key: boolean = false;
  Distanceone: any = 0;
  VehicleNumgenerateone: any;
  isVehicleNumgenerateone: boolean = false;
  isPincodeone: boolean = false;
  updateGSTCustomerName:any
  updateRefNo:any
  isRefNo: boolean = false;
  isGSTCustomerName: boolean = false;
  isGenerateTransporterDocNumber: boolean = false;
  isGenerateTransporterDocDate: boolean = false;
  isDistanceone: boolean = false;
  ITList: any;
  entity: any;
  first: number = 0;
  skip: any;
  take: any;
  WareHouseList: any;
  SearchHit: boolean = false;
  resultt: any;
  itExportData: any;
  InternalTransfersDCs: any;
  FromDatetwo: any;
  ToDatetwo: any;
  TransferOrderidTwo: any;
  InvoiceTwo: any;
  blocked: boolean = false;
  selectedWareHousesecond: any;
  WareID: any[] = [];
  TotalRecord: any;
  listData: any;
  tranfergeneratepopup: boolean = false;
  isverified: boolean = false;
  RefNos: any;
  popupOpen: boolean = false;
  GSTCustomerNames: any;
  VehicleNumbertwo: any;
  DOCNoIT: any;
  selectDateIT: any;
  Distancetwo: number;
  wer: boolean = false;
  result: any
  lo: boolean = false
  selectDateGIT: any
  DOCNoGIT: any
  ophd: boolean = false;
  rowDataV1: any;
  disabledd:boolean=false
  disabled: boolean = false;
  GSTdisplayy: any;
  isSearch: boolean = false
  openupdatepopup:any
  openupdatepopupA:any
  placeofchangeupdate:any
  Vehiclenumupdatetwo:any
  Updatetabledata:any
  StateCodee: number = 0;
  TransDocDtU: any;
  TransDocNoU: any;
  UpdateComment: any;
  Reason: any;
  isVehiclenumupdatetwo: boolean = false;
  isplaceofchangeupdate: boolean = false;
  isTransDocNoU: boolean = false;
  isTransDocDtU: boolean = false;
  isReason: boolean = false;
  eway:number
  OrderId:number
  kl: boolean = false;
  r: any;
  cpress: boolean = false;
  opencancelbill: boolean = false;
  reasoncancel: any;
  OrderDCs: any;
  orderlist: any;
  canceltabledata: any;
  CommentCancel: any;
  ewaybillpdf:any;
  Transferorderid:any;
  InternalTransferHistoryData: any;
  dateMin = new Date();
  dateMax = new Date();
  constructor(private EwayBillOrderDetailService: NewEwayServiceService, private customerService: CustomerService,
    private warehouseService: WarehouseService, private cityService: CityService, private exportservice: ExportServiceService, private msg: MessageService,private router: Router,
    public datepipe: DatePipe) 
    { 
        this.entity = "OrderEwayBill";
    }
   
  ngOnInit() {
    
    this.dateMax.setDate(this.dateMax.getDate());
    this.GetWarehousesSecond();
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
  }
  opencancelbil: any[];
  reasonss: any = ([] = []);

  GetWarehousesSecond() {
    this.warehouseService.getWarehouseCommon().subscribe(WareRes => {
      this.WareHouseList = WareRes
      console.log(this.WareHouseList);
      this.WareHouseList.forEach(element => {
        element.warecity = element.WarehouseName + ' ' + element.CityName
      });
    })
  }

  DocumentRegex(event) {
    
    const pattern = /[a-zA-Z0-9\\\-\/\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ForSearchHit() {
    this.SearchHit = true
    this.first = 0;
    this.TotalRecord=0;
  }

  InternalTransfers(event) {
    if (this.FromDatetwo != undefined && (this.ToDatetwo == undefined || this.ToDatetwo == null)) {
      alert("Please Select End date")
      return false;
    }
    if (this.ToDatetwo != undefined && (this.FromDatetwo == undefined || this.FromDatetwo == null)) {
      this.showError("Please Select Start date")
      return false;
    }
    // if(this.TransferOrderidTwo!=undefined && this.WareHouseList==undefined && this.FromDatetwo==undefined &&
    //   this.ToDatetwo==undefined &&
    //   (this.InvoiceTwo==undefined || this.InvoiceTwo=='' || this.InvoiceTwo==null))
    // {
    if ((this.selectedWareHousesecond == undefined || this.selectedWareHousesecond.length == 0) && (this.lo == false || this.SearchHit == true)) {
      this.showError("Select Warehouse")
      return false;
    }
    if (this.selectedWareHousesecond != undefined) {
      this.WareID = [];
      this.selectedWareHousesecond.forEach(element => {
        this.WareID.push(element.value)
      });
    }
    if (this.SearchHit == true) {
      this.InternalTransfersDCs =
      {
        "Warehouseids": this.selectedWareHousesecond ? this.WareID : [],
        "TransferOrderId": this.TransferOrderidTwo ? this.TransferOrderidTwo : 0,
        "InvoiceNumber": this.InvoiceTwo ? this.InvoiceTwo : null,
        "Startdate": this.FromDatetwo ? moment(this.FromDatetwo).format('YYYY-MM-DD') : null,
        "EndDate": this.ToDatetwo ? moment(this.ToDatetwo).format('YYYY-MM-DD') : null,
        "skip": event && event.first ? event.first : 0,
        "take": event && event.rows ? event.rows : 20
      }
      this.blocked = true;
      this.EwayBillOrderDetailService.internaltransfernew(this.InternalTransfersDCs).subscribe(result => {
        console.log(result);
        this.blocked = false;
        this.result = result
        this.ITList = this.result.internalEwayBillOrderLists
        this.TotalRecord = this.result.internalEwayBillOrderLists[0].TotalCount;
    
        this.ITList.forEach(x => {
          x.showIRgen = false
        }
        )
      });
      return false;
    }
  }

  ClearInternalTransfers() {
    this.selectedWareHousesecond = undefined
    this.TransferOrderidTwo = undefined
    this.InvoiceTwo = undefined
    this.FromDatetwo = undefined
    this.ToDatetwo = undefined
    this.ITList = undefined
  }
  cancelbillBtn() {
    this.opencancelbill = false;
  }

  ExportInternalTransfers() {
    if (this.selectedWareHousesecond == undefined && this.TransferOrderidTwo == undefined && this.InvoiceTwo == undefined && this.FromDatetwo == undefined && this.ToDatetwo == undefined) {
      this.showError("Please select atlest one filter criteria")
      return false;
    }
    if (this.ITList == undefined) {
      this.showError("Please search the data first")
      return false;
    }
    if (this.ToDatetwo != undefined && (this.FromDatetwo == undefined || this.FromDatetwo == null)) {
      this.showError("Please Select Start date")
      return false;
    }
    if (this.ITList != undefined) {
      this.InternalTransfersDCs =
      {
        "Warehouseids": this.selectedWareHousesecond ? this.WareID : [],
        "TransferOrderId": this.TransferOrderidTwo ? this.TransferOrderidTwo : 0,
        "Startdate": this.FromDatetwo ? moment(this.FromDatetwo).format('YYYY-MM-DD') : null,
        "EndDate": this.ToDatetwo ? moment(this.ToDatetwo).format('YYYY-MM-DD') : null,
        "skip": 0,
        "take": this.TotalRecord ? this.TotalRecord : 20,
      }
      this.blocked = true;
      this.EwayBillOrderDetailService.internaltransfernew(this.InternalTransfersDCs).subscribe(result => {
        this.resultt = result
        this.itExportData = this.resultt.internalEwayBillOrderLists
        if (this.itExportData && this.itExportData.length > 0) {
          this.exportservice.exportAsExcelFile(this.itExportData, "Export Internal Transfer Export Data")
          this.blocked = false;
        } else {
          this.showError('No Data Found!');
          this.blocked = false;
        }
      })
    }
  }
  // IRNGenerate(data) {
  //   this.EwayBillOrderDetailService.IRNReGenerate(data.TransferOrderId).subscribe((res: any) => {
  //     console.log("res", res);
  //     this.listData = res
  //     if (this.listData == true) {
  //       data.showIRgen = true;

  //       //  window.location.reload();
  //     }
  //     else {
  //       alert(data.TransferOrderId + "irn not")
  //     }

  //   })
  // }

  //Generate Eway Bill By IRn 
  GenerateEwaybillByIRN(GenerateTableData) {
    const payload1 = {

      "TransferOrderId": GenerateTableData.TransferOrderId,
      "TransportGST": this.RefNo,
      "TransportName": this.GSTCustomerName,
      "vehicleno": this.VehicleNumgenerateone
    }
    this.EwayBillOrderDetailService.EwayBillGenerateByIrn(payload1).subscribe(result => {
      console.log(result);
    })
  }

  loadd(event) {
    this.lo = true
    this.GenerateEwaybillByIRN(event);
  }

  tranfergenerate() {
    this.tranfergeneratepopup = true;
    this.isverified = false
    this.RefNo = undefined
    this.GSTCustomerNames = undefined
    this.VehicleNumbertwo = undefined
    this.DOCNoIT = undefined
    this.DOCNoGIT = undefined
    this.selectDateIT = undefined
    this.Distancetwo = undefined

  }


  // openHistoryy(doy) {
  //   this.EwayBillOrderDetailService.ITHistory(doy.TransferOrderId).subscribe(res => {
  //     this.wer = true
  //     this.InternalTransferHistoryData = res
  //   })
  // }

  OrderHistory(rowDataV1) {
    
    console.log(rowDataV1)
    this.rowDataV1 = rowDataV1;
    this.popupOpen = true;
    // 
    // this.EwayBillOrderDetailService.OrderPageHistory(d.OrderId).subscribe(res=>{
    //   console.log(res);
    //   this.ophd=true
    //   this.OrderPageHistoryData=res
    // })
  }
  onDismiss() {
    this.ophd = false;
  }

  onDismisss() {
    this.wer = false
  }

  // VarifiedCustomerGSTNOs(text) {
  //   if (text == undefined) {
  //     alert("Please enter Transport GST")
  //   }
  //   if (text.length == 15) {
  //     this.blocked = true;
  //     this.EwayBillOrderDetailService.CheckVarifiedCustomerGSTNO(text).subscribe(result => {
  //       if (result.Status && result.custverify.Active=="Active") {
  //         this.GSTCustomerNames = result.custverify.Name;
  //         this.GSTdisplayy = true;
  //         this.blocked = false;
  //         this.isverified = true;
  //       }
  //       else {
  //         alert("Invalid  Transport GST. ");
  //       }
  //     })
  //   }
  //   else {
  //     alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE");
  //     this.GSTdisplayy = false;
  //   }
  // }

 //UpdateVarifiedCustomerGSTNOs(text) {
    // if (text == undefined) {
    //   alert("Please enter Transport GST")
    // }
    // if (text.length == 15) {
    //   this.blocked = true;
    //   this.EwayBillOrderDetailService.CheckVarifiedCustomerGSTNO(text).subscribe(result => {
    //     if (result.Status) {
    //       this.updateGSTCustomerName = result.custverify.Name;
    //       // this.GSTdisplayy = true;
    //       this.blocked = false;
    //       this.isverified = true;
    //     }
    //     else {
    //       alert("Invalid  Transport GST. ");
    //     }
    //   })
    // }
    // else {
    //   alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE");
    //   this.GSTdisplayy = false;
    // }
  //}

  GSTdisplayClosee() {
    this.GSTdisplayy = false
  }

  TransferPopupsubmit() {
  
    if (this.VehicleNumbertwo == undefined || this.VehicleNumbertwo == "") {
      this.showError("Please Enter Vehicle Number")
      // return false;
    }
    else if (this.DOCNoGIT == undefined || this.DOCNoGIT == "") {
      this.showError("Please enter Document Number")
    }
    else if (this.selectDateGIT == undefined || this.selectDateGIT == "") {
      this.showError("Please enter Document Date")
    }
    else if (this.RefNo == undefined || this.RefNo == "") {
      this.showError("Please Transpost GST")
    }
    // else if (this.Distanceone == undefined || this.Distanceone<0) { this.showError("Please Enter Distance");
    else if (this.Distancetwo == undefined || this.Distancetwo < 0) {
      this.showError("Please Enter Distance")
      this.Distancetwo = 0
    }
    else if (this.GSTCustomerNames == undefined || this.GSTCustomerNames == '') {
      this.showError("lease enter GST Transport Name")
    }
    else if (this.isverified == false) {
      this.showError("Please verify Transport Gst Number")
    }
    else {
      alert("submit api");
      this.tranfergeneratepopup = false;
      this.isverified = true
    }
  }
  tranferpupopclose() {
    this.tranfergeneratepopup = false;
    
  }

  load(event) {
    this.lo = true
    this.InternalTransfers(event);
  }

  showError(msg1: string) {
    this.msg.add({ severity: 'error', summary: 'Error', detail: msg1 });
  }
  showSuccess(msg1: string) {
    this.msg.add({ severity: 'success', summary: 'Success', detail: msg1 });
  }


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

  EmptyITList() {
    this.ITList = undefined
    this.TotalRecord = 0
    this.first = 0
    this.skip = 0
    this.take = 0
  }

  Capital(event) {
    
    const pattern = /[A-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  UpdatePartAsubmit(enm) {
    
    console.log(enm);
    this.Updatetabledata = enm;
    this.Vehiclenumupdatetwo = undefined;
    this.placeofchangeupdate = undefined;
    this.Reason = undefined;
    this.Transporterid=undefined;
    this.StateCodee = 0;
    this.TransDocDtU = undefined;
    this.TransDocNoU = unescape;
    this.UpdateComment = undefined;
    this.updateGSTCustomerName=undefined;
    this.updateRefNo=undefined;
    this.openupdatepopup = true;
    this.openupdatepopupA = false;
  }
  Transporterid: any
  updatePartAitem(enm) {
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
    this.openupdatepopup = false;
    this.openupdatepopupA = true;
  }
  updatePartBitem(enm) {

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

  Updatesubmit(Updatetabledata) {
   // console.log(this.Updatetabledata);
 if (this.Vehiclenumupdatetwo == undefined && this.updateRefNo==undefined) {
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
      // this.Vehiclenumupdatetwo != undefined &&
      this.placeofchangeupdate != undefined &&
      this.Reason != undefined) {

       const payload = {
        orderid: this.Updatetabledata.TransferOrderId,
        EwbNumber: this.Updatetabledata.EwayBillNumber,
        VehNo:
          this.Vehiclenumupdatetwo == undefined
            ? null
            : this.Vehiclenumupdatetwo,
            TransporterGstin:this.updateRefNo,
            TransporterName:this.updateGSTCustomerName,
        FromPlace: this.placeofchangeupdate,
        FromState: this.StateCodee,
        ReasonCode:   this.Reason.code, //this.Reason.code,
        ReasonRemark: '',//this.Reason.name,
        TransDocNo: this.TransDocNoU == undefined ? null : this.TransDocNoU,
        TransDocDt:
          this.TransDocDtU == undefined
            ? null
            : moment(this.TransDocDtU).format("DD/MM/YYYY"),
        Customertype: 0,
        APITypes :2

      };

      console.log(payload);
      
      this.EwayBillOrderDetailService.updateVehiclePartB(payload).subscribe(
        (res: any) => {
          if (res.status == true) {
            alert(res.Message);
            this.openupdatepopup = false;
            this.openupdatepopupA = false;
            this.blocked = true;
            // this.EwayBillOrderDetailService.GetEwaybillOrder(
            //   this.OrderDCs
            // ).subscribe((result: any) => {
            //   console.log(result);
            //   //this.first=0;
            //   this.r = result;
            //   this.orderlist = this.r.getEwaydata;
            //   console.log("orderlist", this.orderlist);
            //   this.TotalRecord = this.r.TotalRecord;
            //   this.blocked = false;
            // });
           this.InternalTransfers(null)
          } else {
            alert(res.Message);
            //this.openupdatepopup=false;
            this.blocked = false;
          }
        }
      );
    }
  }

  updatepopupClose() {
    this.openupdatepopup = false;
    this.openupdatepopupA = false;
  }

  CancelOrder(item) {
    
    this.canceltabledata = item;
   // console.log(this.canceltabledata);
    
    this.reasoncancel = undefined;
    this.CommentCancel = undefined;
    this.cpress = false;
    this.opencancelbill = true;
  }
  CancelSubmitBtn(canceltabledata) {
    
    this.cpress = true;
    if (this.reasoncancel != undefined) {
      var eway = parseInt(this.canceltabledata.EwayBillNumber);
      const payload = {
        orderid: this.canceltabledata.TransferOrderId,
        ewbNo: eway,
        
        cancelRsnCode:
          this.canceltabledata.CustomerType == 0
            ? this.reasoncancel.name
            : this.reasoncancel.code,
        cancelRmrk: this.reasoncancel.name,
        Customertype: this.canceltabledata.CustomerType,
        APITypes :2
      };
      console.log(payload);
      this.blocked = true;
      this.EwayBillOrderDetailService.CancelEwayBill(payload).subscribe(
        (res: any) => {
          
          console.log(res);
          if (res.status == true) {
            alert(res.Message);
            this.opencancelbill = false;
            // this.EwayBillOrderDetailService.GetEwaybillOrder(
            //   this.OrderDCs
            // ).subscribe((result: any) => {
            //   console.log(result);
            //   this.r = result;
            //   this.orderlist = this.r.getEwaydata;
            //   this.TotalRecord = this.r.TotalRecord;
            //   this.blocked = false;
            // });
            this.InternalTransfers(null)
          } else {
            alert(res.Message);
            this.opencancelbill = false;
            this.blocked = false;
          }
        }
      );
    }
  }

  exportPdf(ewaybillno,Transferorderid,CustomerType) {
    this.ewaybillpdf=JSON.parse(ewaybillno)
    console.log(this.ewaybillpdf,"this.ewaybillpdf");
    
    var myArray = [];
    {
      myArray.push(this.ewaybillpdf);
    }
    const payload = {
      ewb_numbers: myArray,
      custometType: CustomerType,
      OrderId:Transferorderid,
      Apitypes:2
    };
    this.EwayBillOrderDetailService.GetEwaybillPdf(payload).subscribe(
      (result:any) => {
        console.log(result);
       if(result.status){
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
       }else{
        this.showError(result.Message);
       }

      }


    );
  }

  reasonchaneg()
  {
    if (this.Reason.name == "Other") {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  generateeeCancel() {
    this.opengeneratebill = false;
    this.openupdatepopupA = false;
    this.isverify = false;
  }
  IrnNo:any
  generatesuubmitbtn(GenerateTableData) {
    console.log(GenerateTableData.IRNno,"orderid");

    if (!this.VehicleNumgenerateone) {
      this.isVehicleNumgenerateone = true;
    }
    // if (!this.Pincodeone) {
    //   this.isPincodeone = true;
    // }
    if (!this.RefNo) {
      this.isRefNo = false;
    }
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
          TransferOrderId:  GenerateTableData.TransferOrderId,
          vehicleno: !this.VehicleNumgenerateone
            ? null
            : this.VehicleNumgenerateone,
            TransportName: this.GSTCustomerName,
          TransportGST: this.RefNo,
          transporterdocno: !this.GenerateTransporterDocNumber
            ? null
            : this.GenerateTransporterDocNumber,
            TransDocDt: !this.GenerateTransporterDocDate
            ? null
            : this.GenerateTransporterDocDate,
          distance: !this.Distanceone ? 0 : this.Distanceone,
          topincode: this.Pincodeone ? this.Pincodeone : 0,
          IrnNo:GenerateTableData.IRNno
          //CustomerType: this.GenerateTableData.CustomerTypeName,
        };
        this.blocked = true;
        this.EwayBillOrderDetailService.ReGenerateEwayBYIRNN(payload).subscribe(
          (res: any) => {
            if (res) {
              alert("Eway Bill ReGenerated!!");
              this.opengeneratebill = false;
              this.blocked = true;
              // this.EwayBillOrderDetailService.GetEwaybillOrder(
              //   this.OrderDCs
              // ).subscribe((result: any) => {
              //   this.r = result;
              //   this.orderlist = this.r.getEwaydata;
              //   console.log("orderlist", this.orderlist);
              //   this.TotalRecord = this.r.TotalRecord;
              //   this.blocked = false;
              // });
              this.InternalTransfers(null)
            } else {
              alert("Eway Bill Not Generated!!");
              this.opengeneratebill = false;
              this.blocked = false;
            }
          }
        );
      }
    }
  }
  generatesuubmitbtnn() {
    var eway = parseInt(this.Updatetabledata.EwayBillNumber);
    const payload = {
      Orderid: this.Updatetabledata.TransferOrderId,
      EwbNumber: eway,
      TransporterId: this.Transporterid,
      Customertype: 0,//this.Updatetabledata.CustomerType,
      APITypes: 2
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
          this.InternalTransfers(null)
        } 
        else {
          alert(res.Message);
          //this.openupdatepopup=false;
          this.blocked = false;
        }
      }
    );

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
  //       if (result.Status) {
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
  
  generateitem(item) {
    
    this.GenerateTableData = item;
    this.isverify = false;
    this.opengeneratebill = true;
    this.RefNo = undefined;
    this.GSTCustomerName = undefined;
    this.GenerateTransporterDocNumber = undefined;
    this.GenerateTransporterDocDate = undefined;
    this.Pincodeone = undefined;
    this.Distanceone = 0;
    this.key = false;
    this.VehicleNumgenerateone = undefined;
  }

  cancelreasonchange() {
    if (this.reasoncancel.name == "OTHERS") {
      this.disabledd = true;
    } else {
      this.disabledd = false;
    }
  }

}
