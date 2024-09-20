import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryAssignmentService } from 'app/shared/services/delivery-assignment.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

import { WarehouseService } from 'app/shared/services/warehouse.service';
import { environment } from 'environments/environment';
import * as moment from 'moment'; import { MapsAPILoader, MouseEvent, ControlPosition, FullscreenControlOptions } from '@agm/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { DevSerService } from 'app/delivery/deliveryService/dev-ser.service';
declare var $: any;
declare const google: any;

@Component({
  selector: 'app-delivery-assignment',
  templateUrl: './delivery-assignment.component.html',
  styleUrls: ['./delivery-assignment.component.scss']
})
export class DeliveryAssignmentComponent implements OnInit {
  WarehouseList: any;
  serachData;
  chkdb;
  deliveryBoy;
  getListAllData;
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
  options: FullscreenControlOptions;///22jan
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
  fullscreenControl: boolean;;
  public searchControl: FormControl;

  address = [];
  rows: number = 10;
  first: number = 0;
  end: Date;
  startDateSearch: Date;
  hostUrl = environment.apiURL;
  UserRoleDA;
  totalRecords: number;
  MyTitle: 'trdegghhhhhhhhhhh'
  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private deliveryServices: DeliveryAssignmentService,
    public exportService: ExportServiceService,
    private deleAssignDataService : DevSerService

  ) {
    this.serachData = {};
    if (this.UserRoleDA != null) {
      this.UserRoleDA = JSON.parse(localStorage.getItem('RolePerson'));
      console.log(this.UserRoleDA, 'this.UserRoleDA');
    }


  }

  ngOnInit() {
    this.getAllWarehouseList();
  }

  getAllWarehouseList() { // get all wherehouse list for top search dropdown
    this.blocked = true;
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.blocked = false;
      this.WarehouseList = result;
    })
  }

  getWhereHouseId() { // DBoy List according to Wherehouse Id
    this.dBoyAllList = [];
    if (!(this.serachData.WarehouseId == undefined || this.serachData.StatusId == undefined)) {
      this.blocked = true;
      this.deliveryServices.GetBBoyListByWhereHouseId(this.serachData.WarehouseId).subscribe(result => {
        this.blocked = false;
        let dboyList = []
        result.forEach(element => {
          if (this.serachData.StatusId == 1) {
            if (element.Active == true) {
              dboyList.push(element)
            }
          }
          if (this.serachData.StatusId == 0) {
            if (element.Active == false) {
              dboyList.push(element)
            }
          }
        });
        this.dBoyAllList = dboyList;
        console.log(this.dBoyAllList, 'this.dBoyAllList');
      })
      // if (this.serachData.WarehouseId == undefined) {
      //   alert("Please select one wareHouse for select Delivery boy list")
      //   return
      // }
      // if (this.serachData.StatusId == undefined) {
      //   alert("Please select one status for select Delivery boy list")
      //   return
      // }
    }
    // else {
    //   this.blocked = true;
    //   this.deliveryServices.GetBBoyListByWhereHouseId(this.serachData.WarehouseId).subscribe(result => {
    //     this.blocked = false;
    //     this.dBoyAllList = result;
    //     console.log(this.dBoyAllList, 'this.dBoyAllList');
    //   })
    // }
  }

  getStatusUpdate(valueGet) {
    this.dBoyAllList = [];
    this.serachData.StatusId = valueGet;
    console.log(this.serachData.StatusId, 'this.serachData.StatusId');

    if (!(this.serachData.WarehouseId == undefined || this.serachData.StatusId == undefined)) {
      this.blocked = true;
      this.deliveryServices.GetBBoyListByWhereHouseId(this.serachData.WarehouseId).subscribe(result => {
        this.blocked = false;
        let dboyList = []
        result.forEach(element => {
          if (this.serachData.StatusId == 1) {
            if (element.Active == true) {
              dboyList.push(element)
            }
          }
          if (this.serachData.StatusId == 0) {
            if (element.Active == false) {
              dboyList.push(element)
            }
          }
        });
        this.dBoyAllList = dboyList;
        console.log(this.dBoyAllList, 'this.dBoyAllList');
      })
      // if (this.serachData.WarehouseId == undefined) {
      //   alert("Please select one wareHouse for select Delivery boy list")
      //   return
      // }
      // if (this.serachData.StatusId == undefined) {
      //   alert("Please select one status for select Delivery boy list")
      //   return
      // }
    }
    //  else {
    //   this.blocked = true;
    //   this.deliveryServices.GetBBoyListByWhereHouseId(this.serachData.WarehouseId).subscribe(result => {
    //     this.blocked = false;
    //     this.dBoyAllList = result;
    //     console.log(this.dBoyAllList, 'this.dBoyAllList');
    //   })
    // }
  }


  getdborders() {
    console.log(this.serachData.WarehouseId);

    if (this.serachData.WarehouseId == undefined || this.serachData.StatusId == undefined) {
      alert('Please select one wareHouse or status for select Delivery boy list')
    } else {
      console.log(this.serachData.DBoy, 'serachData.DBoy');
      this.deliveryBoy = this.serachData.DBoy;
      localStorage.setItem('DBoysData', this.deliveryBoy);
      this.chkdb = false;
    }
  }


  getSearchData(textValue) {
    this.serachData.search = textValue;
    console.log(textValue);

    let filteredList = [];
    filteredList = Object.assign([], this.currentPageStores).filter(
      item =>
        item.DeliveryIssuanceId.toString().toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.TotalAssignmentAmount.toString().toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.DisplayName.toString().toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.Status.toLowerCase().indexOf(textValue.toLowerCase()) > -1
    );
    if (filteredList.length) {
      this.allCustomersEarch = filteredList;
    }
    else {
      if (textValue == '') {
        this.Search();
      }
      else {
        this.currentPageStores = [];
      }
    }
    let filteredListData = this.allCustomersEarch.filter(wh => this.currentPageStores.indexOf(wh) >= 0);
    if (!(filteredListData.length == 0) && !(textValue == '' || textValue == null)) {
      filteredListData.splice(10, this.currentPageStores.length - 10);
      this.currentPageStores = filteredListData;
    }
    else {
      this.Search();

    }
  }

  SearchAssignmentByIds() { // Search data by assignment Id
    if (!this.serachData.AssignmentIds) {
      alert(" enter assignment id ");
      return false;
    } else {
      this.blocked = true;
      this.deliveryServices.SearchAssignment(this.serachData.AssignmentIds).subscribe(data => {
        this.blocked = false;
        if (data.historyamount.length > 0) {
          this.oldorders = [];
          this.total_count = [];
          this.currentPageStores = [];
          this.allCustomersEarch = [];
          this.DelIssuance = [];
          this.oldpords = false;

          this.oldorders = data.historyamount;
          this.total_count = data.total_count;
          this.currentPageStores = this.oldorders;
          this.allCustomersEarch = this.oldorders;
          this.DelIssuance = data;
          this.oldpords = true;
        } else {
          alert("no record found");
        }
      })
    }
  }

  exportFileData() { // export file
    console.log(this.DelIssuance.historyamount, 'export');
    if (this.DelIssuance.historyamount == undefined || this.DelIssuance.historyamount == '' || this.DelIssuance.historyamount == null) {
      alert("please select atleast one warehouse/status and D'boy then search & export.")
    } else {

      // if (DelIssuancetemp != undefined) {
      let DateFrom = this.startDateSearch ? this.startDateSearch.toLocaleString() : '';
      let DateTo = this.end ? this.end.toLocaleString() : '';
      this.deliveryServices.DeliveryIssuance(this.total_count, 1, this.deliveryBoy.PeopleID, DateFrom, DateTo).subscribe(data => {
        let DelIssuancetemp = data.historyamount;
        console.log(DelIssuancetemp);
        let NewExportData = [];
        for (let i = 0; i < DelIssuancetemp.length; i++) {
          let tts = { DeliveryBoy: '', DeliveryIssuanceId: '', TotalAssignmentAmount: '', CreatedDate: '', Status: '', VehicleNumber: '', ProductType: '' };
          tts.DeliveryIssuanceId = DelIssuancetemp[i].DeliveryIssuanceId;
          tts.TotalAssignmentAmount = DelIssuancetemp[i].TotalAssignmentAmount;
          tts.CreatedDate = DelIssuancetemp[i].CreatedDate;
          tts.Status = DelIssuancetemp[i].Status;
          tts.VehicleNumber = DelIssuancetemp[i].VehicleNumber;
          tts.ProductType = DelIssuancetemp[i].details.length;
          tts.DeliveryBoy = DelIssuancetemp[i].DisplayName;
          NewExportData.push(tts);
        }
        this.exportService.exportAsExcelFile(NewExportData, 'DeliveryAssignment');
      })

      // }
    }

  }

  endDateVal(e) {
    this.end = e.toLocaleString('en-US')
  }
  startDateUpdate(e) {
    this.startDateSearch = e.toLocaleString('en-US')
  }
  getReport() {
    //this.router.navigate(['/layout/delivery/assignment-report'])
    window.open('#'+'/layout/delivery/assignment-report','_blank');
  }


  splitOrderIds:any;
  Search() {
    if (this.serachData.WarehouseId == undefined || this.serachData.StatusId == undefined || this.serachData.DBoy == undefined) {
      if (this.serachData.WarehouseId == undefined) {
        alert('Please select one wareHouse');
        return
      }
      if (this.serachData.StatusId == undefined) {
        alert('Please select status');
        return
      }
      if (this.serachData.DBoy == undefined) {
        alert('Please select one Delivery boy');
        return
      }
    } else {
      let DBoyId = '';
      if (this.deliveryBoy.PeopleID) {
        DBoyId = this.deliveryBoy.PeopleID
      }
      // let numPerPageOpt = [30, 50, 100, 200];//dropdown options for no. of Items per page
      // let itemsPerPage = numPerPageOpt[0]; //this could be a dynamic value from a drop down
      // let selectedPagedItem = numPerPageOpt[0];// for Html page dropdown
      // itemsPerPage = selectedPagedItem;
      const payload = {
        DateFrom: this.startDateSearch ? this.startDateSearch.toLocaleString() : '',
        DateTo: this.end ? this.end.toLocaleString() : '',
        page: 1,
        total_count: 30,
      }
      this.deliveryServices.DeliveryIssuance(payload.total_count, payload.page, DBoyId, payload.DateFrom, payload.DateTo).subscribe(data => {
        console.log(data, 'result');
        this.oldorders = data.historyamount;
        this.total_count = data.total_count;
        this.currentPageStores = this.oldorders;
        this.currentPageStores.forEach(element => {
          element.totalOrderIdLength = element.OrderIds.split(',').length;
        });
        this.DelIssuance = data;
        console.log(this.DelIssuance, "this.oldorders");
        this.oldpords = true;
      })
    }

  }

  Finalization() {
    if (this.GetShortItemsListData.length > 0) {
      alert('Please save short item first then finalize.');
      return false;
    }
    // DBoyData.DeliveryIssuanceId = 0;
    if (this.getListAllData.DeliveryIssuanceId != "undefined" && this.getListAllData.DeliveryIssuanceId > 0) {
      const payload = {
        'DeliveryIssuanceId': this.getListAllData.DeliveryIssuanceId
      }
      this.deliveryServices.finalLizedData(this.getListAllData.DeliveryIssuanceId, payload).subscribe(response => {
        if (!response) {
          alert("Assignment Finalization not done");
        }
        else {
          alert("Assignment Finalization SUCCESSFULLY!!!");
          window.location.reload();
        }
      })
    }
    else {
      alert("there Is issue in Finalization");
    }
  }

  viewDetails(pod) {
    this.listAllData = pod;
    console.log(this.listAllData, 'this.listAllData');
    this.listAllDataPop = true;
  }

  load(event) {
    let Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;
    const payload = {
      DateFrom: this.startDateSearch ? this.startDateSearch.toLocaleString() : '',
      DateTo: this.end ? this.end.toLocaleString() : '',
      page: this.skip,
      totalitem: this.take,
    }

    //var PeopleId = this.deliveryBoy.PeopleID == undefined ? 0 : this.deliveryBoy.PeopleID;
    
    this.deliveryServices.DeliveryIssuance(payload.totalitem, payload.page, this.deliveryBoy.PeopleID, payload.DateFrom, payload.DateTo).subscribe(data => {
      console.log(data, 'result');
      this.oldorders = data.historyamount;
      this.total_count = data.total_count;
      this.currentPageStores = this.oldorders;
      this.DelIssuance = data;
      this.oldpords = true;
    })
  }

  getAssignmntId(valu) {
    //console.log(valu);
    this.serachData.AssignmentIds = valu;
  }


  clearSearch() { // Clear Assignmnet Search data
    console.log(this.serachData.AssignmentIds);

    if (this.serachData.AssignmentIds) {
      this.serachData.AssignmentIds = [];
      this.serachData.AssignmentIds = '';
      this.serachData.search = [];
      this.serachData.search = '';
      this.oldorders = [];
      this.total_count = [];
      this.currentPageStores = [];
      this.DelIssuance = [];
      this.oldpords = false;
    }
  }

  DeliveryHistroy(listData) { // get Assignment History Dtaa by DeliveryIssuanceId
    console.log(listData, 'listData');
    this.historyPopup = true;
    this.blocked = true;
    this.deliveryServices.GetDBoyHistory(listData.DeliveryIssuanceId).subscribe(data => {
      this.blocked = false;
      this.dataDeliveryHistroy = data;
    })
  }

  AddShortItems(listData) {// get Assignment ShortItems Dtaa by DeliveryIssuanceId
    console.log(listData, 'listData');
    this.getListAllData = listData;
    this.assignmentFinalPop = true;
    this.blocked = true;
    this.deliveryServices.GetShortItemsData(listData.DeliveryIssuanceId).subscribe(data => {
      this.blocked = false;
      this.GetShortItemsListData = data;
    })
  }

  orderStatusUpdate(listData, status) {
    this.blocked = true;
    this.deliveryServices.updateStatus(listData.DeliveryIssuanceId, listData.OrderId, status).subscribe(response => {
      this.blocked = false;
      if (response) {
        alert("Order " + (status == 1 ? "Rejected" : "Accepted") + " successfully.");
        // window.location.reload();
        this.summryViewPopup = true;
        this.SummeryDataApi(this.getListAllData, 'ViewSummery')
      }
      else {
        alert("Payment already submitted.");
        // window.location.reload();
        this.summryViewPopup = true;
        this.SummeryDataApi(this.getListAllData, 'ViewSummery')
      }
    });

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

  viewAssignmnt(listData, type) {// get Assignment View Dtaa by DeliveryIssuanceId
    console.log(listData, 'listData');
    this.getListAllData = listData;
    if (type == 'viewAssign') {
      this.viewAssignmentPop = true;
      this.viewAssignApicall(listData, type)
    } else {
      this.summryViewPopup = true;
      this.SummeryDataApi(listData, type)
    }
    this.TotalAssignmentAmount = this.getListAllData.TotalAssignmentAmount;
  }

  saveRowdData(listData, type){
    var ID = listData.DeliveryIssuanceId;
    this.deleAssignDataService.saveRowData(listData);
    // this.router.navigate(['/layout/delivery/DeliveryOrderAssignmentChange/'+ID]);
    window.open('#'+'/layout/delivery/DeliveryOrderAssignmentChange/'+ID ,'_blank');
        //const url = this.router.createUrlTree(['/#/layout/delivery/DeliveryOrderAssignmentChange/',+ID])
    //window.open(URL, '_blank')
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
          if (this.AssignmentPaymentEnable && response[i].OrderRejectStatus)
            this.AssignmentPaymentEnable = false;
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

  printWarehouseName:any;
  prodetails(listData) {
    this.getListAllData = listData;
    this.orderdetails = [];
    this.IsReDispatchedData = [];
    this.productiveAssignmnetPop = true;
    this.deliveryServices.AssignmentProductsList(listData.DeliveryIssuanceId).subscribe(data => {
      this.blocked = false;
      data.forEach(element => {
        //console.log(element);
        var xboxes = 0;
             var xpieces = 0;
              if (element.PurchaseMinOrderQty > 0) {
                xboxes = element.qty / element.PurchaseMinOrderQty;
                xpieces = element.qty % element.PurchaseMinOrderQty;
                var str = xboxes.toString();
                var numarray = str.split('.');
                element.Boxes = numarray[0];
                element.piece = xpieces;
              } else {
                xboxes = element.PurchaseMinOrderQty;
                xpieces = element.qty;
                var str = xboxes.toString();
                var numarray = str.split('.');
                element.Boxes = numarray[0];
                element.piece = xpieces;
              }

        if (element.IsReDispatched != true) {
          this.orderdetails.push(element);
          console.log(this.orderdetails);

        } else {
          this.IsReDispatchedData.push(element)
        }
      });
      //console.log(this.orderdetails, 'this.orderdetails');
      this.deliveryServices.GetAssingmentamount(listData.DeliveryIssuanceId).subscribe(data2 => {
        this.blocked = false;
        this.GetShortAssignmentListData = data2;
      });
      this.deliveryServices.GetAssOrder(listData.DeliveryIssuanceId).subscribe(data3 => {
        this.blocked = false;
        //console.log(data3, 'data333333');

        this.AssOrder = data3.OrderDispatchedMasters;
        this.printWarehouseName = this.AssOrder[0];
        //console.log(this.AssOrder);
      });
    });
  }

  GetDirection(DId) {
    this.directOnPop = true;
    this.blocked = true;
    this.deliveryServices.GetDirectionDetails(DId).subscribe(data => {
      this.blocked = false;
      console.log(data);

      if (data.Root != null) {
        // this.initMap(data.Root);
        this.showMap = true;
        this.directionAssignmentsInfo = data;
        console.log(this.directionAssignmentsInfo, 'this.directionAssignmentsInfo');
        this.expectedWaypoints = [];
        let addresses = [];
        for (let i = 0; i < this.directionAssignmentsInfo.Root.routes[0].legs.length; i++) {
          addresses.push({
            start: this.directionAssignmentsInfo.Root.routes[0].legs[i].start_address,
            end: this.directionAssignmentsInfo.Root.routes[0].legs[i].end_address,
            distance: this.directionAssignmentsInfo.Root.routes[0].legs[i].distance.text
          });
          this.origin = { lat: Number(this.directionAssignmentsInfo.Root.routes[0].legs[i].start_location.lat), lng: Number(this.directionAssignmentsInfo.Root.routes[0].legs[i].start_location.lng) };
          let objs = {
            location: { lat: Number(this.directionAssignmentsInfo.Root.routes[0].legs[i].end_location.lat), lng: Number(this.directionAssignmentsInfo.Root.routes[0].legs[i].end_location.lng) },
            // originLocation :  { lat: Number(res.lat.toFixed(6)), lng: Number(res.lg.toFixed(6)) }
          }

          this.expectedWaypoints.push(objs);

        }
        this.addresses = addresses;
        console.log(this.addresses, 'aaaaaaaaaaaaaa');

      } else {
        alert("Sorry we are unable to get direction for this assignment");
      }
    });
  }

  // initMap(root) {
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   const map = new google.maps.Map(document.getElementById("map11223"), {
  //     zoom: 6,
  //     center: { lat: root.routes[0].legs[0].start_location.lat, lng: root.routes[0].legs[0].start_location.lng },
  //   });
  //   directionsRenderer.setMap(map);
  //   this.calculateAndDisplayRoute(directionsService, directionsRenderer, root);
  // }

  // calculateAndDisplayRoute(directionsService, directionsRenderer, root) {
  //   const waypts = [];

  //   for (let i = 1; i < root.routes[0].legs.length; i++) {
  //     waypts.push({
  //       location: { lat: root.routes[0].legs[i].start_location.lat, lng: root.routes[0].legs[i].start_location.lng },
  //       stopover: true,
  //     });
  //   }

  //   let pointA: any = new google.maps.LatLng(root.routes[0].legs[0].start_location.lat, root.routes[0].legs[0].start_location.lng);
  //   console.log(pointA, 'pointA');

  //   let radiusInKm = 0.01;
  //   let pointB = pointA.destinationPoint(90, radiusInKm);

  //   console.log(pointB, 'pointB');

  //   directionsService.route({
  //     origin: root.routes[0].legs[0].start_location.lat + "," + root.routes[0].legs[0].start_location.lng, //document.getElementById("start").value,
  //     destination: pointB,
  //     waypoints: waypts,
  //     optimizeWaypoints: true,
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   },
  //     (response, status) => {
  //       if (status === "OK") {
  //         directionsRenderer.setDirections(response);
  //         const route = response.routes[0];
  //         console.log(route, 'route');

  //         const summaryPanel = document.getElementById("directions-panel");
  //         summaryPanel.innerHTML = "<br><b><u>Route </u></b><br>";
  //         for (let i = 0; i < route.legs.length; i++) {
  //           summaryPanel.innerHTML += "<b>" + route.legs[i].start_address + "</b><br> to <br>";
  //           summaryPanel.innerHTML += "<b>" + route.legs[i].end_address + "</b><br>";
  //           summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
  //         }
  //       } else {
  //         window.alert("Directions request failed due to " + status);
  //       }
  //     }
  //   );
  // }

  getTotalTax(data) {
    let totaltax = 0;
    data.forEach(x => {

      //totaltax = totaltax + x.AmtWithoutTaxDisc;
      totaltax = totaltax + (x.TaxAmmount + x.CessTaxAmount);
    });
    return totaltax;
  }
  getTotalQty(data) {
    let totalQty = 0;
    data.forEach(x => {

      totalQty = totalQty + x.Noqty;
    });
    return totalQty;
  }
  getTotalAWOTD(data) {
    let totalAWOTD = 0;
    data.forEach(x => {

      totalAWOTD = totalAWOTD + x.AmtWithoutTaxDisc;
    });
    return totalAWOTD;
  }
  getTotalAmtIncTaxes(data) {
    let totalAmtIncTaxes = 0;
    data.forEach(x => {

      totalAmtIncTaxes = totalAmtIncTaxes + x.TotalAmt;
    });
    return totalAmtIncTaxes;
  }
  getTotalTaxableValue(data) {
    let totalTaxableValue = 0;
    data.forEach(x => {
      totalTaxableValue = totalTaxableValue + x.AmtWithoutTaxDisc;

    });
    return totalTaxableValue;
  }
  getTotalIGST(data) {
    let totalIGST = 0;
    data.forEach(x => {

      totalIGST = totalIGST + x.TaxAmmount + x.CessTaxAmount;
    });
    return totalIGST;
  }
  getTotalSGST(data) {
    let totalSGST = 0;
    data.forEach(x => {

      totalSGST = totalSGST + x.SGSTTaxAmmount;
    });
    return totalSGST;
  }
  getTotalCGST(data) {
    let totalCGST = 0;
    data.forEach(x => {

      totalCGST = totalCGST + x.CGSTTaxAmmount;
    });
    return totalCGST;
  }
  getTotalIOverall(data) {

    let TotalIOverall = 0;
    data.forEach(x => {

      TotalIOverall = TotalIOverall + x.AmtWithoutTaxDisc + x.SGSTTaxAmmount + x.CGSTTaxAmmount + x.CessTaxAmount;
    });
    return TotalIOverall;
  }



  UploadIc(Id, Icfile, IsIcVerified, IsPhysicallyVerified) {
    let datato =
    {
      Id: Id,
      Icfile: Icfile,
      IsIcVerified: IsIcVerified,
      IsPhysicallyVerified: IsPhysicallyVerified
    }
    this.AssignmentsInfo = datato;
    console.log(this.AssignmentsInfo);
    this.AssignmentsInfo.IsIcVerified = this.AssignmentsInfo.IsIcVerified;
    this.AssignmentsInfo.IsPhysicallyVerified = this.AssignmentsInfo.IsPhysicallyVerified;
    this.AssignmentsInfo.RejectionComment = this.AssignmentsInfo.RejectionComment
    this.icePopup = true;
  }

  PutImage(data) {
    console.log(data, 'data');

    if (data.RejectionComment == null || data.RejectionComment == undefined || data.RejectionComment == "" || data.IsPhysicallyVerified != false) {
      if (data.IsPhysicallyVerified == true) {
        let dataToPost = {
          IsIcVerified: data.IsIcVerified,
          IsPhysicallyVerify: data.IsPhysicallyVerified,
          DeliveryIssuanceId: data.Id,
          Comment: data.RejectionComment
        };
        this.blocked = true;
        this.deliveryServices.IcVerified(dataToPost).subscribe(data2 => {
          this.blocked = false;
          if (data2.id == 0) {
            this.gotErrors = true;
            if (data[0].exception == "Already") {
              this.AlreadyExist = true;
            }
          }
          else {
            alert('Add Successfully');
            location.reload();
          }
        });
      }
      else if (data.IsIcVerified == null || data.IsIcVerified == false) {
        alert("Please Approve Assignment, Physical verify or Comment");
      }
      else {
        const dataToPost = {
          IsIcVerified: data.IsIcVerified,
          IsPhysicallyVerify: data.IsPhysicallyVerified,
          DeliveryIssuanceId: data.Id,
          Comment: data.RejectionComment
        };
        this.deliveryServices.IcVerified(dataToPost).subscribe(data3 => {

          if (data3.id == 0) {
            this.gotErrors = true;
            if (data[0].exception == "Already") {
              this.AlreadyExist = true;
            }
          }
          else {
            alert('Add Successfully');
            location.reload();
          }
        });
      }
    }
    else {
      let dataToPost1 = {
        IsIcVerified: data.IsIcVerified,
        IsPhysicallyVerify: data.IsPhysicallyVerified,
        DeliveryIssuanceId: data.Id,
        Comment: data.RejectionComment
      };
      this.deliveryServices.IcVerified(dataToPost1).subscribe(data4 => {
        if (data4.id == 0) {
          this.gotErrors = true;
          if (data[0].exception == "Already") {
            this.AlreadyExist = true;
          }
        }
        else {
          alert('Add Successfully');
          location.reload();
        }

      })
    }

  }


}
