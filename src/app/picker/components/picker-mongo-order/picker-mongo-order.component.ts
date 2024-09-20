import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetItemOrdersListV2 } from 'app/shared/interface/picker/picker';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
@Component({
  selector: 'app-picker-mongo-order',
  templateUrl: './picker-mongo-order.component.html',
  styleUrls: ['./picker-mongo-order.component.scss']
})
export class PickerMongoOrderComponent implements OnInit {
  mongolist: any;
  popOpen: boolean;
  checkedOrderList: boolean;
  orderMaster: any;
  objectId: any;
  dboylist: any;
  clusterList: any;
  ClusterId: any;
  dboyId: any;
  FilterOrder: any;
  isSelect: any;
  getDataList: any;
  orderIds: number[];
  isSelectedIds: boolean[];
  itemList: any[];
  selectedIr: any;
  GetItemOrdersListS: any;
  isOpenPopupPiclist: boolean;
  blocked: boolean;
  lineItems: any[];
  item: any[];
  dboyname: any;
  Save: boolean;
  GetItemOrdersListV2: GetItemOrdersListV2
  pickerList: any;
  orderblank: boolean;
  generatedpickerList: any;
  PeopleID: any;
  savedata: boolean;
  showItemDetail: boolean;
  AllmongoList: boolean;
  redOrderId: any;
  redOrder: boolean;
  SelectedOrderAmount: number;
  constructor(private pickerservice: PickerService,
    private router: Router, private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public location: Location) {
    this.isSelectedIds = [];
    this.itemList = [];
    this.orderIds = [];
    this.SelectedOrderAmount = 0;
  }

  ngOnInit() {
    this.blocked = true;
    this.AllmongoList = false;
    this.popOpen = false;
    this.Save = false;
    this.checkedOrderList = false;
    this.isOpenPopupPiclist = false;
    this.ClusterId = "";
    this.dboyId = "";
    this.objectId = String(this.route.snapshot.paramMap.get("ObjectId"));
    this.PeopleID = localStorage.getItem('userid');
    if (this.objectId != "null") {
      this.mongolist = [];
      this.pickerservice.GetMongoPickerObjectId(this.objectId).subscribe(x => {
        this.mongolist = x;
        this.AllmongoList = false;
        let mongoOrderMaster = x.mongoPickerOrderMaster;
        if (mongoOrderMaster != null) {
          this.getOrder(this.mongolist);
        } else {
          alert("Data Not Available!!")
          this.router.navigateByUrl('layout/picker/createpicker');
        }
        this.blocked = false;
      });
    } else {
      this.mongolist = [];
      this.pickerservice.GetMongoPickerOrderMaster().subscribe(x => {
        this.mongolist = x;
        this.AllmongoList = true;
        this.blocked = false;
      });
    }
    this.GetItemOrdersListS = {
      orderid: null,
      dboyid: 0
    }
    this.GetItemOrdersListV2 = {
      orderid: null,
      peopleId: null,
      ClusterId: null,
      LineItemCutItems: null,
      dboyid: 0,
      MongoObjectid: null
    }
  }
  getOrder(data) {
    this.AllmongoList = false;
    this.blocked = true;
    this.ClusterId = [];
    this.dboyId = [];
    this.popOpen = true;
    this.checkedOrderList = false;
    debugger;
    this.orderMaster = this.mongolist.mongoPickerOrderMaster;
    if (this.orderMaster != null) {
      let warehouseId = this.orderMaster[0].WarehouseId;
      this.pickerservice.GetAllCluster(warehouseId).subscribe(y => {
        var ClusterIds = this.orderMaster.map(x => x.ClusterId);
        this.clusterList = y.filter(f => ClusterIds.includes(f.ClusterId))
        this.blocked = false;
      });
      this.pickerservice.GetDboyWarehouseid(warehouseId).subscribe(y => {
        this.dboylist = y;
        this.blocked = false;
        console.log("dboyname", this.dboylist)
      });
    }
  }

  getFilterOrderId(ClusterId) {
    this.orderIds = [];
    this.FilterOrder = [];
    this.SelectedOrderAmount = 0;
    this.checkedOrderList = true;
    this.FilterOrder = this.orderMaster.filter(x => x.ClusterId == ClusterId);
    this.FilterOrder.forEach(element => {
      if (element.IsSelected) {
        element.IsSelected = false;
      }
      if (element.OrderColor == 'rgb(255, 153, 153)') {
        element.OrderColor = "white";             
      }
    });
  }
  generatedList(orderIds, ClusterId, dboyId) {
    this.blocked = true;
    if (dboyId == "") {
      this.messageService.add({ severity: 'error', summary: 'Please Select Dboy Name', detail: '' });
      this.blocked = false;
      return;
    }
    if (ClusterId == "") {
      this.messageService.add({ severity: 'error', summary: 'Please Select Cluster', detail: '' });
      this.blocked = false;
      return;
    }
    var dboy = this.dboylist.filter(x => x.PeopleID == dboyId);
    for (var j in dboy) {
      this.dboyname = dboy[j].DisplayName;
    }
    this.GetItemOrdersListS.orderid = orderIds;
    this.GetItemOrdersListS.dboyid = dboyId;
    this.GetItemOrdersListS.MongoObjectId = this.objectId;
    this.pickerservice.GetItemOrders(this.GetItemOrdersListS).subscribe(x => {
      let order = x;
      this.blocked = false;
      this.item = [];
      var dataItem = [];
      this.lineItems = [];
      dataItem = order.Pickeritemlist;
      if (dataItem) {
        dataItem.forEach((myObject) => {
          let obj = {
            IsFreeItem: myObject.IsFreeItem,
            ItemMultiMRPId: myObject.ItemMultiMRPId,
            SellingUnitName: myObject.SellingUnitName,
            orderIds: myObject.orderIds,
            qty: myObject.qty,
            AvailableQty: myObject.AvailableQty
          }
          this.item.push(obj);
          let lineItemobj = {
            OrderId: myObject.orderIds,
            OrderDetailsId: myObject.OrderdetailsId,
            Qty: myObject.qty,
            QtyChangeReason: null,
          }
          this.lineItems.push(lineItemobj);
        });
      }
      this.blocked = false;
      this.isOpenPopupPiclist = true;
      this.Save = true;
    });
  }
  getData(ir) {
    if (this.ClusterId.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Please Select Cluster', detail: '' });
      return false;
    } else {
      this.getDataList = null;
      ir.IsSelected = !ir.IsSelected;
      var datatoPost = {
        Id: this.mongolist.Id,
        mongoPickerOrderMaster: ir,
        ClusterId:this.ClusterId
      }
      this.pickerservice.checkInventryOrderMaster(datatoPost).subscribe(x => {
        this.mongolist = x;
        this.AllmongoList = false;
        if (ir.IsSelected) {
          if (ir.OrderColor == 'rgb(255, 153, 153)') {
            this.selectedIr = ir;
            ir.IsSelected = !ir.IsSelected;
            this.blocked = true;
            this.getDataList = ir.orderDetails;
            for (var i in this.getDataList) {
              this.getDataList[i].RequiredQty = this.getDataList[i].qty;
              this.getDataList[i].QtyChangeReason = null;
            }
            this.blocked = false;
            this.redOrderId = ir.OrderId;
            this.redOrder = true;
            return;
          } else {
            this.orderIds.push(ir.OrderId);
            this.isSelectedIds.push(ir.IsSelected);
            let orderamount = 0;
            ir.orderDetails.forEach(element => {
              if (element.Qty > 0) {
                orderamount += (element.Qty * element.UnitPrice);
              }
            });
            this.SelectedOrderAmount += orderamount;
            let clusterIdVal = x.mongoPickerOrderMaster.filter(x => x.ClusterId == this.ClusterId);
            this.orderIds.forEach(e1 => {
              x.mongoPickerOrderMaster.forEach(e2 => {
                if (e1 == e2.OrderId) {
                  // let indexval = this.orderMaster.findIndex(e=> e.OrderId == e2.OrderId);
                  let indexval = x.mongoPickerOrderMaster.map(el => el.OrderId).indexOf(e2.OrderId);
                  this.orderMaster = x.mongoPickerOrderMaster;
                  this.orderMaster[indexval].IsSelected = true
                }
              });

              this.FilterOrder = this.mongolist.mongoPickerOrderMaster.filter(x => x.ClusterId == this.ClusterId);
              this.FilterOrder.forEach(element => {
                if (element.OrderColor == 'rgb(255, 153, 153)') {
                  element.IsSelected = false;
                  let index = this.orderIds.indexOf(element.OrderId);
                  if (index >= 0) {
                    this.orderIds.splice(index, 1);
                    this.itemList.forEach(element => {
                      this.itemList.splice(index, 1);
                    });
                  }
                  let orderamount = 0;
                  let findOrder = ir.orderDetails.filter(x => x.OrderId == element.OrderId);
                  findOrder.forEach(element => {
                    if (element.Qty > 0) {
                      orderamount += (element.Qty * element.UnitPrice);
                    }
                  });
                  this.SelectedOrderAmount -= orderamount;
                }
              });
            });
          }
        }
        else {
          let index = this.orderIds.indexOf(ir.OrderId);
          if (index >= 0) {
            debugger;
            this.orderIds.splice(index, 1);
            this.itemList.forEach(element => {
              this.itemList.splice(index, 1);
            });
            let orderamount = 0;
            let findOrder = ir.orderDetails.filter(x => x.OrderId == ir.OrderId);
            findOrder.forEach(element => {
              if (element.Qty > 0) {
                orderamount += (element.Qty * element.UnitPrice);
              }
            });
            this.SelectedOrderAmount -= orderamount;             
            let indexval =x.mongoPickerOrderMaster.map(el => el.OrderId).indexOf(ir.OrderId);
            this.orderMaster = x.mongoPickerOrderMaster;
            this.orderMaster[indexval].IsSelected = false;
            this.FilterOrder.forEach(element => {
              if (element.OrderColor == 'rgb(255, 153, 153)') {
                element.OrderColor = "white";  
              }
            });
          }
        }
        if (ir.IsSelected == true) {
          this.isSelect = ir.IsSelected;
          if (this.isSelect == false) {
            this.orderIds = [];
          }
        }
      });
    }
  }
  onCancel(isSelectedIds) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Cancel this OrderIds?क्या आप वाकई इस आदेश को रद्द करना चाहते हैं?',
      accept: () => {
        this.orderIds = [];
        this.SelectedOrderAmount = 0;
        isSelectedIds = false;
        for (var i in this.mongolist.mongoPickerOrderMaster) {
          this.mongolist.mongoPickerOrderMaster[i].IsSelected = false;
          if (this.mongolist.mongoPickerOrderMaster[i].IsSelected == false) {
            this.orderIds = [];
            this.orderblank = false;
            this.FilterOrder = this.mongolist.mongoPickerOrderMaster.filter(x => x.ClusterId == this.ClusterId);
            this.FilterOrder.forEach(element => {
              if (element.OrderColor == 'rgb(255, 153, 153)') {
                element.OrderColor = "white";             
              }
            });
            console.log('orderIdsorderIds:::', this.orderIds);
          }
          console.log('this.pickerList.IsSelected:::', this.mongolist.mongoPickerOrderMaster[i].IsSelected);
        }
        console.log('dsdddd:::', isSelectedIds);
      }
    });
  }
  generatedpPickerList(orderIds, ClusterId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Save this Item?   क्या आप वाकई इस आइटम को सहेजना चाहते हैं?',
      accept: () => {
        this.GetItemOrdersListV2 = {
          orderid: orderIds,
          peopleId: Number.parseInt(this.PeopleID),
          ClusterId: ClusterId,
          LineItemCutItems: this.lineItems,
          dboyid: this.GetItemOrdersListS.dboyid,
          MongoObjectid: this.objectId
        }
        this.blocked = true;

        if (orderIds != 0) {

          this.pickerservice.PostOrderPickerMasters(this.GetItemOrdersListV2).subscribe(x => {

            console.log('OrderPickerMaster', x);

            if (x == 'Something went wrong') {
              this.messageService.add({ severity: 'error', summary: '', detail: '' + x });
              this.showItemDetail = false;
              this.isOpenPopupPiclist = false;
              this.blocked = false;

              this.pickerservice.GetAllOrderPicker(ClusterId).subscribe(y => {
                this.pickerList = y;
                if (y.length > 0) {
                  this.orderIds = [];
                }
              });
            }
            else if (x == 'Only Warehouse Planner can Generate Picker') {
              alert(x);
              this.messageService.add({ severity: 'error', summary: '', detail: '' + x });
              this.showItemDetail = false;
              this.isOpenPopupPiclist = false;
              this.blocked = false;

              this.pickerservice.GetAllOrderPicker(ClusterId).subscribe(y => {
                this.pickerList = y;
                if (y.length > 0) {
                  this.orderIds = [];
                  this.emptylist(this.isSelectedIds);
                }
              });
              this.orderIds = [];
              this.emptylist(this.isSelectedIds);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
            else if (x == 'There is no pending order to generate Picker') {
              alert(x);
              this.orderIds = [];
              console.log('generated picker list:', this.generatedpickerList);
              this.generatedpickerList = x;
              this.emptylist(this.isSelectedIds);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
            else {
              this.isOpenPopupPiclist = false;

              if (x == "") {
                alert('Status of this OrderId ' + this.GetItemOrdersListV2.orderid + ' ' + 'is not in Pending Status');
                this.messageService.add({ severity: 'success', summary: 'Status of this OrderId ' + this.GetItemOrdersListV2.orderid + ' ' + 'is not in Pending Status', detail: '' + x });
                this.PeopleID = [];
                this.orderIds = [];
                console.log('generated picker list:', this.generatedpickerList);
                this.generatedpickerList = x;
                if (x.PickerPersonId == Number.parseInt(this.PeopleID)) {
                  this.savedata = true;
                  this.emptylist(this.isSelectedIds);
                }
                console.log('generated picker list:', this.generatedpickerList);
                this.blocked = false;
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
              else {
                alert(x);
                this.messageService.add({ severity: 'success', summary: 'Saved Succesfully.', detail: '' + x });
                this.PeopleID = [];
                this.orderIds = [];
                console.log('generated picker list:', this.generatedpickerList);
                this.generatedpickerList = x;
                if (x.PickerPersonId == Number.parseInt(this.PeopleID)) {
                  this.savedata = true;
                  this.emptylist(this.isSelectedIds);
                }

                console.log('generated picker list:', this.generatedpickerList);
                this.blocked = false;

                // setTimeout(() => {
                window.location.reload();
                //   }, 2000);
              }

            }

          });
          this.Save = false;
        }
        if (orderIds == 0) {
          this.isOpenPopupPiclist = false;
          this.router.navigateByUrl("layout/picker/orderpicker", { skipLocationChange: false }).then(() => {
            console.log(decodeURI(this.location.path()));
            this.blocked = false;
            this.pickerservice.GetAllOrderPicker(ClusterId).subscribe(y => {
              this.pickerList = y;
            });

            this.messageService.add({ severity: 'success', summary: 'Already Saved Data Successfully!', detail: '' });
          });
          window.location.reload();
        }

      }
    });
  }
  emptylist(isSelectedIds) {
    isSelectedIds = false;
    for (var i in this.pickerList) {
      this.pickerList[i].IsSelected = false;
      if (this.pickerList[i].IsSelected == false) {
        this.orderIds = [];
        this.orderblank = false;
        console.log('orderIdsorderIds:::', this.orderIds);
      }
      console.log('this.pickerList.IsSelected:::', this.pickerList[i].IsSelected);
    }
    console.log('dsdddd:::', isSelectedIds);
  }
  back() {
    this.router.navigateByUrl('layout/picker/createpicker');
  }
}
