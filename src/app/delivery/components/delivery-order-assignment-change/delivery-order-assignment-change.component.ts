import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { DevSerService } from 'app/delivery/deliveryService/dev-ser.service';
import { DeliveryAssignmentService } from 'app/shared/services/delivery-assignment.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delivery-order-assignment-change',
  templateUrl: './delivery-order-assignment-change.component.html',
  styleUrls: ['./delivery-order-assignment-change.component.scss']
})
export class DeliveryOrderAssignmentChangeComponent implements OnInit {
  getListAllData: any;
  WarehouseList: any;
  serachData;
  chkdb;
  deliveryBoy;
  dBoyAllList;
  AlreadyExist;
  gotErrors;
  blocked: boolean;
  directOnPop: boolean = false;
  oldorders = [];
  total_count = [];
  currentPageStores = [];
  allCustomersEarch = [];
  DelIssuance: any = [];
  oldpords = false;
  summryViewPopup = false;
  historyPopup = false;
  assignmentFinalPop = false;
  productiveAssignmnetPop = false;
  viewAssignmentPop = false;
  skip: any;
  dboyordersdata;
  TotalAssignmentAmount;
  DeliveryCanceledRequest = [];
  AssignmentPaymentEnable: boolean = true;
  CreatedDate;
  DBoyName;
  DboyMobileNo;
  DeliveryIssuanceStatus;

  AssignmentBarcodeImage;

  UploadedFileName;

  items;//response
  TotalDeliveredOrder = 0;
  TotalDeliveredOrderAmount = 0;
  TotalDeliveredCashAmount = 0;
  TotalDeliveredChequeAmount = 0;
  TotalDeliveredElectronicAmount = 0;
  TotalDeliveredEpayLater = 0;
  TotalDeliveredmPos = 0;
  TotalDeliveredGullak = 0;
  //this.TotalRedispatchOrder = 0;
  TotalRedispatchOrderAmount = 0;
  TotalCanceledOrder = 0;
  TotalDeliveryCanceledRequestOrder = 0;
  TotalCanceledOrderAmount = 0;
  TotalDeliveryCanceledRequestAmount = 0;
  dataDeliveryHistroy;
  delivereddata = [];
  redispatcheddata = [];
  shippedData = [];
  cancelddata = [];
  date;
  dcanceldata;
  itemdetail = [];
  itemdetails = [];
  itemdetailsredispatched = [];
  TotalCancelOrder = 0;
  TotalCanceledOrderqty = 0;
  TotalRedispatchOrder = 0;
  TotalRedispatchOrderqty = 0;
  allproducts = [];
  allproductredispatched = [];
  GetShortItemsListData;
  GetShortAssignmentListData;
  summeryListData;
  orderdetails = [];
  IsReDispatchedData = [];
  GetViewAssignListData;
  selectedorders;
  TotalRedispatchedOrderAmount;
  listAllData: any;
  listAllDataPop = false;
  AssOrder;
  icePopup = false;
  take: any;
  AssignmentsInfo;
  directionAssignmentsInfo;

  myInnerHeight = window.innerHeight - 100;
  zoom: number = 13;
  public origin: any;
  expectedWaypoints: any[];
  addresses: any[];
  actualWaypoints: any[];
  actualDestination: any;
  actualOrigin: any;
  showMap: boolean;
  showMarker: boolean;
  //#region direction options
  icon = '/assets/img/logo/truck/1.png';
  waypointMarker = '/assets/img/logo/marker_pointer.png';
  public renderOptions = {
    suppressMarkers: true,
    suppressInfoWindows: false,
    waypoints: {
      icon: '/assets/img/logo/dot.png',
      label: '',
      infoWindow: 'Waypoint',
      opacity: 0.5,
    }
  };

  public markerOptions = {
    origin: {
      infoWindow: 'Origin.',
      icon: '',
    },
    // waypoints: {
    //   infoWindow: '',
    //   icon: '',
    // },
    destination: {
      infoWindow: 'Destination',
      icon: '',
    },
  };
  lat: number = 22.7196;
  lng: number = 75.8577;
  private geoCoder;
  fullscreenControl: boolean;

  address = [];
  rows: number = 10;
  first: number = 0;
  end: Date;
  startDateSearch: Date;
  UserRoleDA;
  totalRecords: number;
  type:string='summery';
  
  constructor(private DelAssignDataService: DevSerService, private deliveryServices: DeliveryAssignmentService, private router:Router) {
   }

  ngOnInit() {
    this.getListAllData = this.DelAssignDataService.getSummaryRowData();
    this.summryViewPopup = true;
    this.SummeryDataApi(this.getListAllData, this.type)
    //console.log(this.getListAllData);
  }

  SummeryDataApi(listData, type) {
    this.delivereddata = []
    this.cancelddata = [];
    this.DeliveryCanceledRequest = [];
    this.redispatcheddata = [];
    this.shippedData = [];
    this.DeliveryIssuanceStatus = '';
    this.blocked = true;
    this.deliveryServices.getViewAssignData(listData.OrderIds, listData.DeliveryIssuanceId, type).subscribe(response => {
      this.blocked = false;
      if (response.length > 0) {
        this.TotalAssignmentAmount = 0;
        this.CreatedDate = response[0].CreatedDate;
        this.DBoyName = response[0].DBoyName;
        this.DboyMobileNo = response[0].DboyMobileNo;
        this.DeliveryIssuanceStatus = response[0].DeliveryIssuanceStatus;

        this.AssignmentBarcodeImage = response[0].AssignmentBarcodeImage;

        this.UploadedFileName = response[0].UploadedFileName;

        this.items = response;//response

        this.TotalDeliveredOrder = 0;
        this.TotalDeliveredOrderAmount = 0;
        this.TotalDeliveredCashAmount = 0;
        this.TotalDeliveredChequeAmount = 0;
        this.TotalDeliveredElectronicAmount = 0;
        this.TotalDeliveredEpayLater = 0;
        this.TotalDeliveredmPos = 0;
        this.TotalDeliveredGullak = 0;
        this.date = response.OrderedDate;
        this.TotalRedispatchOrder = 0;
        this.TotalRedispatchOrderAmount = 0;

        this.TotalCanceledOrder = 0;
        this.TotalDeliveryCanceledRequestOrder = 0;
        this.TotalCanceledOrderAmount = 0;
        this.TotalDeliveryCanceledRequestAmount = 0;

        for (let i = 0; i < response.length; i++) {

          if (response[i].Status == "Delivered" || response[i].Status == "Account settled" || response[i].Status == "sattled" || response[i].Status == "Partial receiving -Bounce") {
            this.delivereddata.push(response[i]);
            this.TotalAssignmentAmount = this.TotalAssignmentAmount + response[i].GrossAmount;
          }
          if (response[i].Status == "Delivery Redispatch") {
            this.redispatcheddata.push(response[i]);
            this.TotalAssignmentAmount = this.TotalAssignmentAmount + response[i].GrossAmount;

          }
          if (response[i].Status == "Shipped" || response[i].Status == "Issued" || response[i].Status == "Assigned") {
            this.shippedData.push(response[i]);
            this.TotalAssignmentAmount = this.TotalAssignmentAmount + response[i].GrossAmount;

          }
          if (response[i].Status == "Delivery Canceled" || response[i].Status == "Order Canceled") {
            this.cancelddata.push(response[i]);
            this.TotalAssignmentAmount = this.TotalAssignmentAmount + response[i].GrossAmount;

          }
          if (response[i].Status == "Delivery Canceled Request" || response[i].Status == "Order Canceled") {
            this.DeliveryCanceledRequest.push(response[i]);
            this.TotalAssignmentAmount = this.TotalAssignmentAmount + response[i].GrossAmount;

          }
          
          if (this.AssignmentPaymentEnable && response[i].OrderRejectStatus){
            this.AssignmentPaymentEnable = false;
          }


          // if (this.AssignmentPaymentEnable == true && response[i].OrderRejectStatus == true){
          //   this.AssignmentPaymentEnable = false;
          // }
          // if (this.AssignmentPaymentEnable == false && response[i].OrderRejectStatus == false){
          //   this.AssignmentPaymentEnable = true;
          // }
        }

        for (let d = 0; d < this.delivereddata.length; d++) {

          this.TotalDeliveredOrderAmount = this.TotalDeliveredOrderAmount + this.delivereddata[d].GrossAmount;
          this.TotalDeliveredOrder = this.TotalDeliveredOrder + 1;
          this.delivereddata[d].PaymentDetails.forEach(payment => {

            if (payment.PaymentFrom == "Cash") {
              this.TotalDeliveredCashAmount = this.TotalDeliveredCashAmount + payment.Amount;
            }
            if (payment.PaymentFrom == "Cheque") {
              this.TotalDeliveredChequeAmount = this.TotalDeliveredChequeAmount + payment.Amount;
            }
            if (payment.PaymentFrom == "EPaylater") {
              this.TotalDeliveredEpayLater = this.TotalDeliveredEpayLater + payment.Amount;
            }
            if (payment.PaymentFrom == "MPos") {
              this.TotalDeliveredmPos = this.TotalDeliveredmPos + payment.Amount;
            }
            if (payment.PaymentFrom == "Gullak") {
              this.TotalDeliveredGullak = this.TotalDeliveredGullak + payment.Amount;
            }
            if (payment.PaymentFrom == "Online") {
              this.TotalDeliveredElectronicAmount = this.TotalDeliveredElectronicAmount + payment.Amount;
            }
          });
          this.delivereddata[d].CashAmount = this.delivereddata[d].PaymentDetails[0].Amount;
          this.delivereddata[d].ChequeAmount = this.delivereddata[d].PaymentDetails[1].Amount;
          this.delivereddata[d].ChequeNo = this.delivereddata[d].PaymentDetails[1].TransRefNo;
          this.delivereddata[d].EpayLaterAmount = this.delivereddata[d].PaymentDetails[2].Amount;
          this.delivereddata[d].EpayLaterTransId = this.delivereddata[d].PaymentDetails[2].TransRefNo;
          this.delivereddata[d].GullakAmount = this.delivereddata[d].PaymentDetails[3].Amount;
          this.delivereddata[d].GatewayOrderId = this.delivereddata[d].PaymentDetails[3].GatewayOrderId;
          this.delivereddata[d].mPosAmount = this.delivereddata[d].PaymentDetails[4].Amount;
          this.delivereddata[d].mPosTransId = this.delivereddata[d].PaymentDetails[4].TransRefNo;
          this.delivereddata[d].ElectronicAmount = this.delivereddata[d].PaymentDetails[5].Amount;
          this.delivereddata[d].ElectronicTransId = this.delivereddata[d].PaymentDetails[5].TransRefNo;
        }
        for (let e = 0; e < this.redispatcheddata.length; e++) {

          this.TotalRedispatchOrder = this.TotalRedispatchOrder + 1;
          this.TotalRedispatchOrderAmount = this.TotalRedispatchOrderAmount + this.redispatcheddata[e].GrossAmount;

          this.redispatcheddata[e].CashAmount = this.redispatcheddata[e].PaymentDetails[0].Amount;

          this.redispatcheddata[e].ChequeAmount = this.redispatcheddata[e].PaymentDetails[1].Amount;
          this.redispatcheddata[e].ChequeNo = this.redispatcheddata[e].PaymentDetails[1].TransRefNo;

          this.redispatcheddata[e].EpayLaterAmount = this.redispatcheddata[e].PaymentDetails[2].Amount;
          this.redispatcheddata[e].EpayLaterTransId = this.redispatcheddata[e].PaymentDetails[2].TransRefNo;

          this.redispatcheddata[e].GullakAmount = this.redispatcheddata[e].PaymentDetails[3].Amount;
          this.redispatcheddata[e].GatewayOrderId = this.redispatcheddata[e].PaymentDetails[3].GatewayOrderId;

          this.redispatcheddata[e].mPosAmount = this.redispatcheddata[e].PaymentDetails[4].Amount;
          this.redispatcheddata[e].mPosTransId = this.redispatcheddata[e].PaymentDetails[4].TransRefNo;


          this.redispatcheddata[e].ElectronicAmount = this.redispatcheddata[e].PaymentDetails[5].Amount;
          this.redispatcheddata[e].ElectronicTransId = this.redispatcheddata[e].PaymentDetails[5].TransRefNo;

        }

        for (let e = 0; e < this.cancelddata.length; e++) {

          this.TotalCanceledOrder = this.TotalCanceledOrder + 1;
          this.TotalCanceledOrderAmount = this.TotalCanceledOrderAmount + this.cancelddata[e].GrossAmount;

          this.cancelddata[e].CashAmount = this.cancelddata[e].PaymentDetails[0].Amount;

          this.cancelddata[e].ChequeAmount = this.cancelddata[e].PaymentDetails[1].Amount;
          this.cancelddata[e].ChequeNo = this.cancelddata[e].PaymentDetails[1].TransRefNo;

          this.cancelddata[e].EpayLaterAmount = this.cancelddata[e].PaymentDetails[2].Amount;
          this.cancelddata[e].EpayLaterTransId = this.cancelddata[e].PaymentDetails[2].TransRefNo;

          this.cancelddata[e].GullakAmount = this.cancelddata[e].PaymentDetails[3].Amount;
          this.cancelddata[e].GatewayOrderId = this.cancelddata[e].PaymentDetails[3].GatewayOrderId;

          this.cancelddata[e].mPosAmount = this.cancelddata[e].PaymentDetails[4].Amount;
          this.cancelddata[e].mPosTransId = this.cancelddata[e].PaymentDetails[4].TransRefNo;

          this.cancelddata[e].ElectronicAmount = this.cancelddata[e].PaymentDetails[5].Amount;
          this.cancelddata[e].ElectronicTransId = this.cancelddata[e].PaymentDetails[5].TransRefNo;

        }

        for (let e = 0; e < this.DeliveryCanceledRequest.length; e++) {

          this.TotalDeliveryCanceledRequestOrder = this.TotalDeliveryCanceledRequestOrder + 1;
          this.TotalDeliveryCanceledRequestAmount = this.TotalDeliveryCanceledRequestAmount + this.DeliveryCanceledRequest[e].GrossAmount;

          this.DeliveryCanceledRequest[e].CashAmount = this.DeliveryCanceledRequest[e].PaymentDetails[0].Amount;

          this.DeliveryCanceledRequest[e].ChequeAmount = this.DeliveryCanceledRequest[e].PaymentDetails[1].Amount;
          this.DeliveryCanceledRequest[e].ChequeNo = this.DeliveryCanceledRequest[e].PaymentDetails[1].TransRefNo;

          this.DeliveryCanceledRequest[e].EpayLaterAmount = this.DeliveryCanceledRequest[e].PaymentDetails[2].Amount;
          this.DeliveryCanceledRequest[e].EpayLaterTransId = this.DeliveryCanceledRequest[e].PaymentDetails[2].TransRefNo;

          this.DeliveryCanceledRequest[e].GullakAmount = this.DeliveryCanceledRequest[e].PaymentDetails[3].Amount;
          this.DeliveryCanceledRequest[e].GatewayOrderId = this.DeliveryCanceledRequest[e].PaymentDetails[3].GatewayOrderId;

          this.DeliveryCanceledRequest[e].mPosAmount = this.DeliveryCanceledRequest[e].PaymentDetails[4].Amount;
          this.DeliveryCanceledRequest[e].mPosTransId = this.DeliveryCanceledRequest[e].PaymentDetails[4].TransRefNo;

          this.DeliveryCanceledRequest[e].ElectronicAmount = this.DeliveryCanceledRequest[e].PaymentDetails[5].Amount;
          this.DeliveryCanceledRequest[e].ElectronicTransId = this.DeliveryCanceledRequest[e].PaymentDetails[5].TransRefNo;

        }
      }
      else {
        alert("something went wrong ");
      }
    }); 
  }

  viewAssignApicall(listData, type) {
    this.delivereddata = [];
    this.allproducts = [];
    this.allproductredispatched = [];
    this.shippedData = [];
    this.blocked = true;
    this.deliveryServices.getViewAssignData(listData.OrderIds, listData.DeliveryIssuanceId, type).subscribe(response => {
      this.blocked = false;
      this.dboyordersdata = response;
      this.TotalDeliveredOrder = 0;
      this.TotalDeliveredOrderAmount = 0;
      this.TotalDeliveredCashAmount = 0;
      this.TotalDeliveredChequeAmount = 0;
      this.TotalDeliveredElectronicAmount = 0;
      //this.TotalRedispatchOrder = 0;
      this.date = response.OrderedDate;
      this.TotalRedispatchOrderAmount = 0;
      this.TotalCanceledOrderAmount = 0;
      for (var i = 0; i < response.length; i++) {

        if (response[i].Status == "Delivered" || response[i].Status == "Account settled" || response[i].Status == "sattled" || response[i].Status == "Partial receiving -Bounce") {
          this.delivereddata.push(response[i]);
        }
        if (response[i].Status == "Delivery Redispatch") {
          this.redispatcheddata.push(response[i]);
        }
        if (response[i].Status == "Shipped" || response[i].Status == "Issued" || response[i].Status == "Assigned") {
          this.shippedData.push(response[i]);
        }
        if (response[i].Status == "Delivery Canceled" || response[i].Status == "Order Canceled") {
          this.cancelddata.push(response[i]);
        }
      }
      for (var d = 0; d < this.delivereddata.length; d++) {

        this.TotalDeliveredOrderAmount = this.TotalDeliveredOrderAmount + this.delivereddata[d].GrossAmount;
        this.TotalDeliveredOrder = this.TotalDeliveredOrder + 1;
        this.TotalDeliveredCashAmount = this.TotalDeliveredCashAmount + this.delivereddata[d].cashAmount;
        this.TotalDeliveredChequeAmount = this.TotalDeliveredChequeAmount + this.delivereddata[d].chequeAmount;
        this.TotalDeliveredElectronicAmount = this.TotalDeliveredElectronicAmount + this.delivereddata[d].ElectronicAmount;
      }
      for (var e = 0; e < this.redispatcheddata.length; e++) {

        //this.TotalRedispatchOrder = this.TotalRedispatchOrder + 1;
      }
      this.extraData(listData.DeliveryIssuanceId, listData.OrderIds);
    })
  }

  extraData(DeliveryIssuanceId, ids) {
    this.deliveryServices.getViewAssignData(ids, DeliveryIssuanceId, 'viewAssign').subscribe(data => {
      this.date = data[0].UpdatedDate;
      this.dcanceldata = data;
      this.itemdetail = [];
      this.itemdetails = [];
      this.itemdetailsredispatched = [];
      this.TotalCancelOrder = 0;
      this.TotalCanceledOrderqty = 0;
      this.TotalCanceledOrderAmount = 0;
      this.TotalRedispatchOrder = 0;
      this.TotalRedispatchOrderqty = 0;
      this.allproducts = [];
      this.allproductredispatched = [];
      for (let i = 0; i < data.length; i++) {

        if (data[i].Status == "Delivery Canceled" || data[i].Status == "Order Canceled") {
          this.TotalCanceledOrderAmount = this.TotalCanceledOrderAmount + data[i].GrossAmount;

          for (let k = 0; k < data[i].orderDetails.length; k++) {
            this.itemdetail.push(data[i].orderDetails[k]);
            this.TotalCanceledOrderqty = this.TotalCanceledOrderqty + data[i].orderDetails[k].qty;
          }
          this.TotalCancelOrder = this.TotalCancelOrder + 1;
          this.itemdetails.push(data[i]);
        }
      }
      if (this.itemdetails.length > 0) {
        this.selectedorders = this.itemdetails;
        console.log(this.itemdetails);
        var firstreq = true;
        for (var k = 0; k < this.selectedorders.length; k++) {
          for (var j = 0; j < this.selectedorders[k].orderDetails.length; j++) {
            if (firstreq) {
              var OD = this.selectedorders[k].orderDetails[j];
              OD.OrderQty = (this.selectedorders[k].orderDetails[j].OrderId + " - " + this.selectedorders[k].orderDetails[j].qty).toString();

              this.allproducts.push(OD);
              firstreq = false;
            } else {
              var checkprod = true;
              this.allproducts.map(prod => {
                // if (this.selectedorders[k].orderDetails[j].itemNumber == prod.itemNumber) {
                if (this.selectedorders[k].orderDetails[j].ItemMultiMRPId == prod.ItemMultiMRPId) {
                  prod.OrderQty += ", " + this.selectedorders[k].orderDetails[j].OrderId + " - " + this.selectedorders[k].orderDetails[j].qty;
                  prod.qty = this.selectedorders[k].orderDetails[j].qty + prod.qty;
                  prod.TotalAmt = this.selectedorders[k].orderDetails[j].TotalAmt + prod.TotalAmt;
                  checkprod = false;
                }
              })
              if (checkprod) {
                var ODD = this.selectedorders[k].orderDetails[j];//instead of OD used ODD
                ODD.OrderQty = (this.selectedorders[k].orderDetails[j].OrderId + " - " + this.selectedorders[k].orderDetails[j].qty).toString();
                this.allproducts.push(ODD);
              }
            }
          }
        }
        console.log("Assissment total products");
        console.log(this.allproducts);
      }
      //else {
      //    alert("Assissnment Data");
      //}
      this.TotalRedispatchedOrderAmount = 0;
      for (var c = 0; c < data.length; c++) {//instead of i used c
        if (data[c].Status == "Delivery Redispatch") {
          this.TotalRedispatchedOrderAmount = this.TotalRedispatchedOrderAmount + data[c].GrossAmount;

          for (var d = 0; d < data[c].orderDetails.length; d++) {//instead of o used d
            this.itemdetail.push(data[c].orderDetails[d]);
            this.TotalRedispatchOrderqty = this.TotalRedispatchOrderqty + data[c].orderDetails[d].qty;

          }
          this.TotalRedispatchOrder = this.TotalRedispatchOrder + 1;
          this.itemdetailsredispatched.push(data[c]);
        }
      }
      if (this.itemdetailsredispatched.length > 0) {
        this.selectedorders = this.itemdetailsredispatched;
        console.log(this.itemdetailsredispatched);
        var firstreqs = true;
        for (var e = 0; e < this.selectedorders.length; e++) {//instead of k used e
          for (var v = 0; v < this.selectedorders[e].orderDetails.length; v++) {//instead of j used v
            if (firstreqs) {
              var ODE = this.selectedorders[e].orderDetails[v];//instead of OD used ODE
              ODE.OrderQty = (this.selectedorders[e].orderDetails[v].OrderId + " - " + this.selectedorders[e].orderDetails[v].qty).toString();

              this.allproductredispatched.push(ODE);
              firstreqs = false;
            } else {
              var checkprod1 = true;//instead of checkprod used checkprod1
              this.allproductredispatched.map(prod => {


                // if (this.selectedorders[k].orderDetails[j].itemNumber == prod.itemNumber) {
                if (this.selectedorders[e].orderDetails[v].ItemMultiMRPId == prod.ItemMultiMRPId) {
                  prod.OrderQty += ", " + this.selectedorders[e].orderDetails[v].OrderId + " - " + this.selectedorders[e].orderDetails[v].qty;
                  prod.qty = this.selectedorders[e].orderDetails[v].qty + prod.qty;
                  prod.TotalAmt = this.selectedorders[e].orderDetails[v].TotalAmt + prod.TotalAmt;
                  checkprod1 = false;
                }
              })
              if (checkprod1) {
                var OD1 = this.selectedorders[e].orderDetails[v];//instead of OD used OD1
                OD1.OrderQty = (this.selectedorders[e].orderDetails[v].OrderId + " - " + this.selectedorders[e].orderDetails[v].qty).toString();
                this.allproductredispatched.push(OD1);
              }
            }
          }
        }
        console.log("Assissment redispatched total products");
        console.log(this.allproductredispatched);
      }


    });
    console.log(this.itemdetail, 'itemdetail');
    console.log(this.allproductredispatched, 'this.allproductredispatched');
    console.log(this.itemdetailsredispatched, 'this.itemdetailsredispatched');

  }

  AssignmentPayment(DeliveryIssuanceId) {
    if (DeliveryIssuanceId != 'undefined' && DeliveryIssuanceId != '') {
      const payload = {
        'DeliveryIssuanceId': this.getListAllData.DeliveryIssuanceId
      }
      this.blocked = true;
      this.deliveryServices.updateSummeryAssignment(this.getListAllData.DeliveryIssuanceId, payload).subscribe(response => {
        this.blocked = false;
        if (!response.Status) {
          alert("There is Some Problem");
        }
        else {
          alert(response.Message);
          window.location.reload();
        }
      });
    }
  }

  cancel(){
    this.router.navigate(['/layout/delivery/delivery-assignment'])
  }

  orderStatusUpdate(listData, status) {
    this.blocked = true;
    this.deliveryServices.updateStatus(listData.DeliveryIssuanceId, listData.OrderId, status).subscribe(response => {
      this.blocked = false;
      if (response) {
        alert("Order " + (status == 1 ? "Rejected" : "Accepted") + " successfully.");
        window.location.reload();
        // this.summryViewPopup = true;
        // this.SummeryDataApi(this.getListAllData, 'ViewSummery')
      }
      else {
        alert("Payment already submitted.");
        window.location.reload();
        // this.summryViewPopup = true;
        // this.SummeryDataApi(this.getListAllData, 'ViewSummery')
      }
    });

  }

}
