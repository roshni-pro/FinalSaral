import { Component, OnInit } from '@angular/core';
import { orderMultiSettle } from 'app/order/order-interface/order-multiSettle';
import { RedeemMasterService } from 'app/order/services/redeem-master.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';


@Component({
  selector: 'app-order-settle',
  templateUrl: './order-settle.component.html',
  styleUrls: ['./order-settle.component.scss']
})
export class OrderSettleComponent implements OnInit {

  allWarehouses: any[] = [];
  selectedWarehouseID: any;
  warehouseID: number;
  allDeliveryBoys: any[];
  DboyDetails: any;
  checkedAllDboys: boolean = false;

  startDate: Date;
  endDate: Date;
  OrderID: any;
  AssignmentID: any;
  isDeliveryBoyExists: boolean = false;
  isResultListAvailable: boolean = false;

  allOrderDispatchResults: any;
  roleName: any;
  roleList: any[];
  isHQRoleExists: boolean = false;

  selectedValues: any[] = [];
  settleAmt: any;
  multiSettlePayload: orderMultiSettle;

  discountApplied: number;

  constructor(private apiService: RedeemMasterService, private peoplePilot: PepolePilotService,
    private exportService: ExportServiceService) { }

  ngOnInit() {
    this.getWarehouseList();
    this.getRoles();
  }

  getWarehouseList() {
    this.apiService.getWarehouses().subscribe(
      (res) => {
        // console.log(res);
        this.allWarehouses = res;
        if (this.allWarehouses.length > 0) {
          this.selectedWarehouseID = this.allWarehouses[0];
          this.getDeliveryBoy();
        } else {
          alert("error - cannot find warehouse list")
        }
      },
      (err) => {
        console.log(err);
        this.allWarehouses = [];
        alert("error - cannot find warehouse list")
      }
    );
  }

  getRoles() {
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      // console.log("", this.roleList);
      // console.log(this.roleName);
    })
  }

  getDeliveryBoy() {
    this.warehouseID = this.selectedWarehouseID.WarehouseId;
    // console.log(ID, this.warehouseID);

    this.apiService.getDeliveryBoybyWarehouseID(this.warehouseID).subscribe(
      (res: any[]) => {
        // console.log(res);
        if (res.length > 0) {
          this.allDeliveryBoys = res;
          // this.allDeliveryBoys.unshift({DisplayName: 'All', Mobile: "all"})
          this.DboyDetails = this.allDeliveryBoys[0];
          this.isDeliveryBoyExists = true;
        } else {
          this.allDeliveryBoys = [];
          this.isDeliveryBoyExists = false;
          // alert("No Delivery boys are available for this warehouse")
        }
      },
      (err) => {
        console.log(err);
        this.allDeliveryBoys = [];
        this.isDeliveryBoyExists = false;
        alert("error- Cannot fine Delivery boys")
      }
    )
  }

  Search() {
    let startDate = this.startDate ? moment(this.startDate).format('MM/DD/YYYY') : null;
    let endDate = this.endDate ? moment(this.endDate).format('MM/DD/YYYY') : null;
    let DBoyMobile;
    // let DBoyMobile = this.DboyDetails.Mobile;
    this.warehouseID = this.selectedWarehouseID.WarehouseId;
    console.log(this.DboyDetails);

    if (this.DboyDetails == 'all') {
      DBoyMobile = 'all';
    } else {
      DBoyMobile = this.DboyDetails.Mobile;
    }

    console.log(startDate, endDate, DBoyMobile, this.warehouseID, this.OrderID, this.AssignmentID, this.isDeliveryBoyExists);
    // alert("exists")
    if (this.isDeliveryBoyExists) {
      this.apiService.getOrderDispatchedMasterResults(DBoyMobile, startDate, endDate, this.OrderID, this.AssignmentID, this.warehouseID).subscribe(
        (res) => {
          console.log(res);
          if (res.ordermaster.length > 0) {
            this.isResultListAvailable = true;
            this.allOrderDispatchResults = res.ordermaster;
            this.allOrderDispatchResults.forEach(element => {
              element.RecivedAmount = element.CashAmount + element.CheckAmount + element.EpayLater + element.Online + element.GullakAmount + element.Empos - element.DiscountAmount
            });
            // debugger;
            console.log('rec amt : -', this.allOrderDispatchResults)
          } else {
            this.allOrderDispatchResults = [];
            this.isResultListAvailable = false;
            alert("No results for this input-set, please try using different input");
          }
        },
        (err) => {
          this.isResultListAvailable = false;
          console.log(err);
        }
      );
    } else { alert("there is no Delevery boy for this warehouse") }
  }

  reload() {

    let DBoyMobile;
    // let DBoyMobile = this.DboyDetails.Mobile;
    this.warehouseID = this.selectedWarehouseID.WarehouseId;
    // console.log('-----------------------------------', this.checkedAllDboys);

    if (this.DboyDetails == 'all') {
      DBoyMobile = 'all';
    } else {
      DBoyMobile = this.DboyDetails.Mobile;
    }

    console.log(DBoyMobile, this.warehouseID, this.OrderID, this.isDeliveryBoyExists);

    // alert("exists")
    if (this.isDeliveryBoyExists) {
      this.apiService.OrderDispatchedMaster(DBoyMobile, this.OrderID, this.warehouseID).subscribe(
        (res) => {
          console.log(res);
          if (res.ordermaster.length > 0) {
            this.allOrderDispatchResults = res.ordermaster;
            this.allOrderDispatchResults.forEach(element => {
              element.RecivedAmount = element.CashAmount + element.CheckAmount + element.EpayLater + element.Online + element.GullakAmount + element.Empos - element.DiscountAmount
            });
            debugger;
            console.log('rec amt : -', this.allOrderDispatchResults)
            this.isResultListAvailable = true;
          } else {
            this.allOrderDispatchResults = [];
            this.isResultListAvailable = false;
            alert("No results for this input-set, please try using different input");
          }
        },
        (err) => {
          console.log(err);
          this.isResultListAvailable = false;
          this.allOrderDispatchResults = [];
        }
      );
    } else { alert("there is no Delevery boy for this warehouse") }

    for (var i in this.roleList) {
      console.log(this.roleList[i]);
      if (this.roleList[i] == 'HQ Master login' || this.roleList[i] == 'HQ IC Executive') {
        this.isHQRoleExists = true;
      } else {
        this.isHQRoleExists = false;
      }
    }
  }
  addSelected(rowvalue, e) {
    console.log("-----------------------------------------", this.selectedValues, e);

    this.allOrderDispatchResults.forEach(element => {
      if (element == rowvalue) {
        element.check = e;
      }
    });
    // console.log(this.allOrderDispatchResults);


    if (this.selectedValues.length == 0 && e == true) {
      rowvalue.check = true;
      this.selectedValues.push(rowvalue);
      // console.log("Path 1", this.selectedValues, e);
    } else {
      if (e == true) {
        // rowvalue.check = true;
        let count: any[] = this.selectedValues.filter(x => x.OrderId == rowvalue.OrderId);
        if (count.length < 1) {
          rowvalue.check = true;
          this.selectedValues.push(rowvalue);
          // console.log("Path 2", this.selectedValues, e);
        } else {
          // console.log("Path 3- no action needed", this.selectedValues, e);
        }
      } else {
        let count: any[] = this.selectedValues.filter(x => x.OrderId == rowvalue.OrderId)[0];
        let index = this.selectedValues.indexOf(count)
        this.selectedValues.splice(index, 1);
        // console.log("Path 4", count, index, this.selectedValues, e);
      }
    }
  }

  settleSelected() {
    // payload.AssignedOrders.push(this.selectedValues)
    //this.multiSettlePayload.AssignedOrders = this.selectedValues;
    this.multiSettlePayload = {
      AssignedOrders: this.selectedValues
    }


    console.log(this.multiSettlePayload, this.allOrderDispatchResults);
    if (this.selectedValues.length < 1) {
      alert("Please select orders to settle");
      return false;
    }
    if (confirm("Are you sure ?")) {
      this.apiService.selectedMultiSattle(this.multiSettlePayload).subscribe(
        (res) => {
          console.log(res);
          alert("Settled successfully")
          window.location.reload();
          this.selectedValues = [];
        },
        (err) => {
          console.log(err);
          // this.selectedValues = [];
          alert("Failed to Settle, Please try again")
        }
      );
    } else {
    }
  }

  settle(item) {
    // https://uat.shopkirana.in/api/OrderDispatchedMasterFinal
    if (confirm("Are you sure ?")) {
      this.apiService.settle(item).subscribe(
        (res) => {
          console.log(res);
          alert("Settled successfully")
          window.location.reload();
        },
        (err) => {
          console.log(err);
          alert("Failed to Settle, Please try again")
        }
      );
    } else {

    }
  }

  export() {
    var result = this.allOrderDispatchResults.map(function (a) {
      return {
        'WarehouseName': a.WarehouseName,
        'OrderId': a.OrderId,
        'AssignmentDate': a.CreatedDate,
        'AssignmentNo': a.DeliveryIssuanceIdOrderDeliveryMaster,
        'OrderAmount': a.GrossAmount,
        'Discount': a.DiscountAmount,
        'CashAmount': a.CashAmount,
        'ChequeNumber': a.CheckNo,
        'ChequeAmount': a.CheckAmount,
        'GullakAmount': a.GullakAmount,
        'OnlineAmount': a.Online,
        'EMposAmount': a.Empos,
        'EpayLaterAmount': a.EpayLater,
        'SettleAmount': a.RecivedAmount,
        'DeliveryBoyName': a.DboyName,
        'OrderedDate': a.CreatedDate,

        // 'EpayLaterRefNo ': a.BasicPaymentDetails[2].TransRefNo;,

        // 'OnlineRefNo ': a.BasicPaymentDetails[4].TransRefNo;

        // 'EmposRefNo ': a.OrderByDate[i].BasicPaymentDetails[3].TransRefNo;

        // 'deliveryCharge ': a.deliveryCharge,

        // 'Status ': a.Status,

      };
    });
    this.exportService.exportAsExcelFile(result, 'OrderDetails');
  }
}





