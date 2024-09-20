import { Component, OnInit } from '@angular/core';
import { PickerService } from 'app/shared/services/picker/picker.service';

import { Router } from '@angular/router';
import { GetItemOrdersList, GetItemOrdersListV2, GetPendingOrderFilterDc, LineItemCutItemDc, MongoPickerDetails, MongoPickerMaster } from 'app/shared/interface/picker/picker';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';


@Component({
  selector: 'app-order-picker',
  templateUrl: './order-picker.component.html',
  styleUrls: ['./order-picker.component.scss']
})
export class OrderPickerComponent implements OnInit {
  selectedIr: any;
  warehouseList: any;
  clusterList: any;
  pickerList: any[];
  OrderChecklist: any;
  ordermaster: any;
  TargetValue: any;
  OrderDetailsId: any;
  blocked: boolean;
  isOpenPopupPayments: boolean;
  selecteddetails: any;
  getDataList: any;
  editQtyData: any[];
  y: any[];
  redOrderId: any;
  orderIds: number[];
  itemList: any[];
  isSelectedIds: boolean[];
  WarehouseId: any;
  ClusterId: any;
  GetItemOrdersList: GetItemOrdersList;
  msgs: Message[] = [];
  generatedpickerList: any;
  getPeople: any;
  PeopleID: any;
  item: any[];
  showReason: boolean = false;
  errorShow: boolean = false;
  isInvalid: boolean;
  WarehouseName: any;
  GetItemOrdersListV2: GetItemOrdersListV2
  isItemdetail: boolean;
  printdetail: boolean;
  isSelect: boolean;
  orderblank: boolean;
  cols: any[];
  whname: any;
  savedata: boolean;
  showItemDetail: boolean;
  DisplayName: any;
  term: number;
  disabled: boolean;
  getPendingOrderFilterDc: GetPendingOrderFilterDc;
  Save: boolean;
  filterBtn: boolean = false;
  redOrder: boolean;
  totalRecords: number;
  LineItemCutItemDc: LineItemCutItemDc;
  lineItems: any[]
  pickerListData: any;
  orderidforfilter = null;
  newlistbyId: any[];
  oldList: any[];
  multiply: any;
  selecteditem: any;
  dboylist: any;
  GetItemOrdersListS: any;
  dboyname: any;
  Orderitemlist: any[];
  Orderlist: any[];
  mongoPickerMaster: MongoPickerMaster[] = [];
  mongoPickerDetails: MongoPickerDetails[] = [];
  hideCheckBox:boolean=false;
  CustomerType:any;
  CustomerId:any;
  customerlist:any;
  WarehouseIdFilter:boolean=false;
  OrderType:any=0;
  constructor(private pickerservice: PickerService, private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService, public location: Location) {
    this.orderIds = [];
    this.isSelectedIds = [];
    this.editQtyData = [];
    this.itemList = [];
    this.item = [];
    this.lineItems = [];
    this.pickerList = [];
    this.Orderlist = [];
  }

  ngOnInit() {
    this.pickerList = [];
    this.totalRecords = null;
    this.WarehouseId = '';
    this.ClusterId = '';
    this.PeopleID = '';
    this.term = null;
    this.CustomerType='';
    this.CustomerId='';
    this.cols = [
      { field: 'OrderId', header: 'Order Id' },
      //{ field: 'Skcode', header: 'Skcode' },
      { field: 'ClusterName', header: 'Cluster Name' },
      //{ field: 'OfferCode', header: 'Offer Code' },
      //{ field: 'CustomerName', header: 'Customer Name' },
      //{ field: 'ShopName', header: 'ShopName' },
      { field: 'OrderTakenSalesPerson', header: 'OrderBy' },
      { field: 'SalesPerson', header: 'SalesPerson' },
     // { field: 'ShippingAddress', header: 'ShippingAddress' },
     { field: 'reditemavaiableValuestr', header: 'Available Stock' },
      { field: 'Orderamount', header: 'Order Amount' },
  

    ];

    this.getPendingOrderFilterDc = {
      ClusterId: null,
      WareHouseID: null,
      ItemPerPage: 20,
      PageNo: 0,
      TotalRecords: null,
      OrderId: 0,
      CustomerId:0,
      CustomerType:null,
      OrderType:0      
    }


    this.GetItemOrdersList = {
      orderid: null
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
      MongoObjectid:null
    }
    this.blocked = true;
    this.pickerservice.GetAllWarehouse().subscribe(x => {
      this.warehouseList = x;
      this.blocked = false;
      console.log('x:', x);
    });
    this.isOpenPopupPayments = false;
  }


  getClusterlist(WarehouseId) {
    this.blocked = true;
    this.WarehouseId = WarehouseId;
    this.pickerservice.GetAllCluster(WarehouseId).subscribe(y => {
      this.clusterList = y;
      this.blocked = false;
      console.log('y:', y);
    });
  }


  warehouseSelected(WarehouseId,CustomerId,CustomerType) {
this.hideCheckBox=false;
var filterWarehouse= this.warehouseList.filter(x=>x.WarehouseId==WarehouseId);
    if(filterWarehouse[0].IsDeliveryOptimizationEnabled){
      alert("Picker Creation Stopped at warehouse leval");
      this.hideCheckBox=true;    
      this.blocked=false;  
      return false;
    }
    this.orderIds = [];
    this.blocked = true;
    this.getPendingOrderFilterDc = {
      ClusterId: null,
      WareHouseID: WarehouseId,
      ItemPerPage: 20,
      PageNo: 0,
      TotalRecords: null,
      OrderId: 0,
      CustomerId:CustomerId,
      CustomerType:CustomerType,
      OrderType:this.OrderType   
    }

    this.pickerservice.GetAllOrderPicker(this.getPendingOrderFilterDc).subscribe(y => {
      this.pickerList = [];
      this.blocked = false;
      this.pickerList = y.ordermaster;
      console.log('pickerList',this.pickerList);
      this.totalRecords = y.total_count;
      if(y.orderIds){
        this.isSelect=true;
        this.orderIds=y.orderIds;
        this.Orderlist = this.pickerList.filter(e=> e.IsSelected == true);
      }
    });
    this.pickerservice.GetDboyWarehouseid(WarehouseId).subscribe(y => {

      this.dboylist = y;
      console.log("dboyname", this.dboylist)
    });
  }

  Detail(ir) {
    this.getDataList = null;
    this.isItemdetail = true;
    this.blocked = true;

    this.pickerservice.GetItemOrder(ir).subscribe(x => {

      this.getDataList = x.orderDetails;
      for (var i in this.getDataList) {
        if (this.getDataList[i].IsFreeItem == true) {
          this.getDataList[i].IsFreeItem = 'Free';
        }
        else {
          this.getDataList[i].IsFreeItem = 'Not Free';
        }
      }
      this.blocked = false;
      console.log("getdataList:", this.getDataList)
    });
  }

  increment(selecteditem, val) {

    selecteditem.QtyChangeReason = null;
    if (selecteditem.qty == null) {
      selecteditem.qty = parseInt(selecteditem.MinOrderQty);
    }
    else {
      selecteditem.qty += parseInt(selecteditem.MinOrderQty);
      if (selecteditem.qty > selecteditem.Noqty) {
        alert('Quantity should not be greater then Max Quantity');
        selecteditem.qty = selecteditem.RequiredQty;
        selecteditem.visibleReason = true;

        this.messageService.add({ severity: 'error', summary: 'Quantity should not be greater then Max Quantity', detail: '' });
      } else {
        this.TargetValue = selecteditem.qty;
        this.OrderDetailsId = selecteditem.OrderDetailsId;
        this.detectRowEdit(selecteditem, val);

      }

    }

  };


  decrement(selecteditem, val) {
    
    selecteditem.QtyChangeReason = null;
    if (selecteditem.qty >= 0) {
      if (selecteditem.qty == 0) {
        this.messageService.add({ severity: 'error', summary: 'MinOrderQty is more than ordered qty', detail: '' });
        alert('MinOrderQty is more than ordered qty');
        return selecteditem.qty;
      }
      selecteditem.qty -= parseInt(selecteditem.MinOrderQty);
      selecteditem.visibleReason = true;
      this.OrderDetailsId = selecteditem.OrderDetailsId;
      this.detectRowEdit(selecteditem, val);
    } else {
      selecteditem.qty = parseInt(selecteditem.MinOrderQty);

    }

  };

  detectRowEdit(rowData, val) {

  }
  selcteddQTR(QtyChangeReason) {
    let orderlist = this.getDataList;
    if (QtyChangeReason.qty <= QtyChangeReason.CurrentStock) {
      QtyChangeReason.errorShow = false;
    }
    else {
      QtyChangeReason.QtyChangeReason = null;
      alert('stock qty is not available ' + 'avlqty=' + QtyChangeReason.CurrentStock + ' RequiredQty =' + QtyChangeReason.qty + 'for item: ' + QtyChangeReason.itemname);
      QtyChangeReason.errorShow = true;
      this.messageService.add({ severity: 'error', summary: 'Stock qty not available', detail: '' });
      return;
    }
    this.pickerservice.GetFreebiesItems(QtyChangeReason.OrderId, QtyChangeReason.ItemId, QtyChangeReason.WarehouseId).subscribe(x => {
      let data = x;
      orderlist.forEach((value, index) => {
        if (value.ItemId == data.FreeItemId && value.IsFreeItem == true && value.FreeWithParentItemId == data.itemId) {
          this.multiply = QtyChangeReason.qty / data.MinOrderQuantity;
          var totalquantity = parseInt(this.multiply) * data.NoOffreeQuantity;
          value.qty = totalquantity;
          console.log('qty', value.qty);

        };
      });
    });

  }
  getData(ir) {
    if ((ir.Trupay != 'Cash') && (ir.OrderColor == 'rgb(255, 153, 153)'||ir.OrderColor == 'yellow')) {
      alert('this order is not eligible to cut line item, Due to online/Gullak Payment');
      return false;
    }

    // if(ir.OrderType == 8){
    //   alert('this order is not eligible to cut line item, Due to order type is 8');
    //   return false;
    // }

    this.getDataList = null;
    this.errorShow = false;
    ir.IsSelected = !ir.IsSelected;
    console.log('ir is: ', ir);
    if (ir.IsSelected) {
     var reditemavaiableValuestr=  Number.parseInt(ir.reditemavaiableValuestr);
      if (ir.OrderColor == 'rgb(255, 153, 153)'|| (reditemavaiableValuestr !=100 && ir.OrderColor == 'yellow')) {
        this.selectedIr = ir;
        ir.IsSelected = !ir.IsSelected;
        this.blocked = true;

        //    this.pickerservice.GetItemOrder(ir.OrderId).subscribe(x => {
        //
        this.getDataList = ir.orderDetails;
        for (var i in this.getDataList) {
          this.getDataList[i].RequiredQty = this.getDataList[i].qty;
          this.getDataList[i].QtyChangeReason = null;
        }
        this.blocked = false;
        console.log("getdataList:", this.getDataList)
        //   });
        this.redOrderId = ir.OrderId;
        this.redOrder = true;

        return;
      }


      this.orderIds.push(ir.OrderId);
      this.isSelectedIds.push(ir.IsSelected);
      this.Orderlist.push(ir);
    }
    else {

      let index = this.orderIds.indexOf(ir.OrderId);
      if (index >= 0) {
        this.orderIds.splice(index, 1);

        this.itemList.forEach(element => {
          this.itemList.splice(index, 1);
        });
      }
      let indexOrder = this.Orderlist.findIndex(e=> e.OrderId == ir.OrderId);
      if (indexOrder >= 0) {
        this.Orderlist.splice(indexOrder, 1);

        this.itemList.forEach(element => {
          this.itemList.splice(indexOrder, 1);
        });
      }
    }
    if (ir.IsSelected == true) {


      this.isSelect = ir.IsSelected;
      if (this.isSelect == false) {
        this.orderIds = [];
      }
    }
  }

  saveRedOrder(ir) {
let cnt = 0;
for (let i = 0; i < ir.length; i++) {
  if (ir[i].qty == 0) {
    cnt++;
  }
}
if(ir.length==cnt){
alert('Order required at least one line item!!');
return false;
}
    var IsAddedSetOd = 0;
    for (var i in ir) {

      if (ir[i].RequiredQty != ir[i].qty && ir[i].QtyChangeReason == null && !ir[i].IsFreeItem) {
        alert(' Select Reason');
        let index = this.orderIds.indexOf(ir[i].OrderId);
        if (index >= 0) {
          this.orderIds.splice(index, 1);
        }
        return false;
      }


      if (ir[i].RequiredQty != ir[i].qty && ir[i].qty <= ir[i].CurrentStock) {
        ir[i].IsSelected = !ir[i].IsSelected;
        if (ir[i].IsSelected) {

          let OdIsexits = this.orderIds.filter(x => {
            return x == IsAddedSetOd;
          })

          if (OdIsexits && OdIsexits.length > 0) {

          }
          else {
            this.orderIds.push(this.redOrderId);
          }

          IsAddedSetOd = ir[i].OrderId;
          let obj = {
            IsFreeItem: ir[i].IsFreeItem,
            ItemMultiMRPId: ir[i].ItemMultiMRPId,
            SellingUnitName: ir[i].SellingUnitName,
            orderIds: ir[i].OrderId,
            qty: ir[i].qty,
            OrderId: this.redOrderId,
            itemNumber: ir[i].itemNumber,
            OrderDetailsId: ir[i].OrderDetailsId,
            QtyChangeReason: ir[i].QtyChangeReason,
            RequiredQty: ir[i].RequiredQty

          }
          let OrderDetailsIdex = this.itemList.filter(x => {
            return x.OrderDetailsId == ir[i].OrderDetailsId;
          })

          if (OrderDetailsIdex && OrderDetailsIdex.length > 0) {

          }
          else {
            this.itemList.push(obj);

          }
        }
        else {
        }
        if (ir[i].IsSelected == true) {
          this.isSelect = ir[i].IsSelected;
          if (this.isSelect == false) {
            this.orderIds = [];
          }
        }
      }
      else {
        if (ir[i].qty > ir[i].CurrentStock) {
          alert('stock qty is not available ' + 'avlqty=' + ir[i].CurrentStock + ' RequiredQty =' + ir[i].qty + 'for item: ' + ir[i].itemname);
          ir[i].errorShow = true;
          this.messageService.add({ severity: 'error', summary: 'stock qty is not available , avlqty=' + ir[i].CurrentStock + ' RequiredQty =' + ir[i].qty, detail: '' });
          let index = this.orderIds.indexOf(ir[i].OrderId);
          if (index >= 0) {
            this.orderIds.splice(index, 1);
          }
        }

      }

    }

    if (this.orderIds.length > 0) {

      let Isexits = this.orderIds.filter(x => {
        return x == IsAddedSetOd;
      })
      if (Isexits && Isexits.length > 0) {
        this.selectedIr.IsSelected = true;
        this.redOrder = false;

      }
    }
  }


  GeneratePickerList(Orderid, Orderlist) {
    this.mongoPickerMaster = [];
    this.Orderlist=[];
    Orderid.forEach(Orderid=>{
    var filterOrderIds   = this.pickerList.filter(e=> e.OrderId == Orderid);
    this.Orderlist.push(filterOrderIds[0]);
    })

    this.Orderlist.forEach(element => {
      this.mongoPickerDetails = [];
      element.orderDetails.forEach(detail => {
        let mongoDetails = {
          OrderDetailsId :detail.OrderDetailsId,
          OrderId :detail.OrderId,
          WarehouseId :detail.WarehouseId,
          Qty: detail.qty,
          ItemMultiMrpId: detail.ItemMultiMRPId,
          itemNumber:detail.itemNumber,
          itemname:detail.itemname,
          IsFreeItem:detail.IsFreeItem,
          price:detail.price,
          UnitPrice:detail.UnitPrice,
          IsDispatchedFreeStock: detail.IsDispatchedFreeStock
        }
        this.mongoPickerDetails.push(mongoDetails);
      });
      let mongoMaster = {
        OrderId: element.OrderId,
        WarehouseId :element.WarehouseId,
        Status: element.Status,
        PickerOrderStatus: 1,
        CreatedDate: new Date(),
        UpdatedDate: new Date(),
        ClusterId:element.ClusterId,
        Skcode:element.Skcode,
        ShopName:element.ShopName,
        ShippingAddress:element.ShippingAddress,
        GrossAmount:element.GrossAmount,
        CustomerType:this.CustomerType,
        orderDetails :this.mongoPickerDetails
      };
      this.mongoPickerMaster.push(mongoMaster);
    });
 console.log(this.mongoPickerMaster)
    this.pickerservice.PostOrderMongo(this.mongoPickerMaster).subscribe(x => {
      debugger;
      let order = x;
      console.log(x);

      if(x.Status==true){
        if (x) {
          this.router.navigateByUrl('layout/picker/mongopickerMaster/'+x.Message);
        }else{
          alert("Already created order List!!");
          this.router.navigateByUrl('layout/picker/mongopickerMaster');
        }
      }
      else{
        alert(x.Message);
      }

    });
  }
  // GeneratePickerList(orderIds, dboyid) {

  //   if (dboyid == "") {
  //     this.messageService.add({ severity: 'error', summary: 'Please Select Dboy Name', detail: '' });
  //     return;
  //   }
  //   var a = this.warehouseList.filter(x => x.WarehouseId == this.WarehouseId);
  //   for (var i in a) {
  //     console.log(a[i].WarehouseName);
  //     this.whname = a[i].WarehouseName;
  //     console.log('whname', this.whname);
  //   }
  //   var dboy = this.dboylist.filter(x => x.PeopleID == dboyid);
  //   for (var j in dboy) {
  //     this.dboyname = dboy[j].DisplayName;
  //   }
  //   this.PeopleID = [];
  //   if (orderIds.length > 0) {
  //     //this.getDataList = 
  //     this.GetItemOrdersListS.orderid = orderIds;
  //     this.GetItemOrdersListS.dboyid = dboyid;
  //     this.blocked = true;
  //     this.pickerservice.GetItemOrders(this.GetItemOrdersListS).subscribe(x => {
  //       let order = x;

  //       this.getDataList = this.getDataList;
  //       this.item = [];
  //       var dataItem = [];
  //       this.lineItems = [];
  //       dataItem = order.Pickeritemlist;

  //       // if(this.itemList && this.itemList.length >0){
  //       //   this.itemList.forEach(item =>{
  //       //     let tempItem = dataItem.filter(elem => {
  //       //       return elem.OrderdetailsId == item.OrderdetailsId;
  //       //     })[0];
  //       //     tempItem.qty -= (item.RequiredQty -item.qty);
  //       //   })
  //       // }

  //       for (var i in dataItem) {
  //         let IsAdded = false;
  //         this.itemList.forEach((myObject, index) => {
  //           if (myObject.OrderDetailsId == dataItem[i].OrderdetailsId) {
  //             let exitsList = [];
  //             if (this.lineItems.length > 0) {
  //               exitsList = this.lineItems.filter(x => {
  //                 return x.OrderDetailsId == myObject.OrderDetailsId
  //               })
  //             }
  //             if (exitsList && exitsList.length > 0) {
  //               exitsList[0].qty = myObject.qty;
  //             }
  //             else {
  //               let cutItem = {
  //                 OrderId: myObject.OrderId,
  //                 OrderDetailsId: myObject.OrderDetailsId,
  //                 Qty: myObject.qty,
  //                 QtyChangeReason: myObject.QtyChangeReason
  //               }
  //               if (!myObject.IsFreeItem) {
  //                 this.lineItems.push(cutItem);
  //               }
  //             }
  //             dataItem[i].qty -= myObject.RequiredQty - myObject.qty;
  //           }
  //         });
  //         let obj = {
  //           IsFreeItem: dataItem[i].IsFreeItem,
  //           ItemMultiMRPId: dataItem[i].ItemMultiMRPId,
  //           SellingUnitName: dataItem[i].SellingUnitName,
  //           orderIds: dataItem[i].orderIds,
  //           qty: dataItem[i].qty,
  //           AvailableQty: dataItem[i].AvailableQty
  //         }
  //         this.item.push(obj);
  //         this.isOpenPopupPayments = true;
  //       }
  //       console.log('item:', this.item);
  //       this.blocked = false;
  //       this.GetpickerofWarehouse(this.WarehouseId);
  //       this.isOpenPopupPayments = true;
  //       this.Save = true;
  //     });
  //   }
  //   else if (orderIds.length == 0) {
  //     this.messageService.add({ severity: 'error', summary: 'Add some Order!', detail: '' });
  //   }
  // }
  rowData(d, e) {
    this.selecteddetails = d;

  }

  generatedList(orderIds, PeopleID, ClusterId) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to Save this Item?   क्या आप वाकई इस आइटम को सहेजना चाहते हैं?',
      accept: () => {
        this.GetItemOrdersListV2 = {
          orderid: orderIds,
          peopleId: PeopleID,
          ClusterId: ClusterId,
          LineItemCutItems: this.lineItems,
          dboyid: this.GetItemOrdersListS.dboyid,
          MongoObjectid:null
        }
        this.blocked = true;

        if (orderIds != 0) {

          this.pickerservice.PostOrderPickerMasters(this.GetItemOrdersListV2).subscribe(x => {

            console.log('OrderPickerMaster', x);

            if (x == 'Something went wrong') {
              this.messageService.add({ severity: 'error', summary: '', detail: '' + x });
              this.showItemDetail = false;
              this.isOpenPopupPayments = false;
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
              this.isOpenPopupPayments = false;
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
              this.isOpenPopupPayments = false;

              if (x == "") {
                alert('Status of this OrderId ' + this.GetItemOrdersListV2.orderid + ' ' + 'is not in Pending Status');
                this.messageService.add({ severity: 'success', summary: 'Status of this OrderId ' + this.GetItemOrdersListV2.orderid + ' ' + 'is not in Pending Status', detail: '' + x });
                this.PeopleID = [];
                this.orderIds = [];
                console.log('generated picker list:', this.generatedpickerList);
                this.generatedpickerList = x;
                if (x.PickerPersonId == PeopleID) {
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
                if (x.PickerPersonId == PeopleID) {
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
          this.isOpenPopupPayments = false;
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

  GetpickerofWarehouse(WarehouseId) {
    this.blocked = true;
    this.pickerservice.GetpickerofWarehouse(WarehouseId).subscribe(x => {
      this.getPeople = x;
      this.blocked = false;
      console.log('GeTPeople:', this.getPeople);
    });
  }

  pickername(PeopleID) {

    for (var i in this.getPeople) {

      if (PeopleID == this.getPeople[i].PeopleID) {

        this.DisplayName = this.getPeople[i].DisplayName;
        console.log('displayyyyName:', this.DisplayName);
      }
    }
  }

  onCancel(isSelectedIds) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Cancel this OrderIds?क्या आप वाकई इस आदेश को रद्द करना चाहते हैं?',
      accept: () => {
        this.orderIds = [];
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

  Close() {
    window.location.reload();
  }

  reset() {

    this.term = null;
    this.WarehouseId = "";
    this.pickerList = [];
    this.orderIds = [];
    this.CustomerType=[];
    this.CustomerId="";
    this.WarehouseIdFilter=false;
  }

  Orderfilter(event) {

    this.pickerList.filter(x => x.OrderId == event.OrderId || x.Skcode == event.Skcode || x.OrderId == event.OrderId);

  }
  GetCustomer(CustomerType,WarehouseId)
  {
    if(CustomerType !=""){
    this.blocked = true;
     this.CustomerId="";
     if(CustomerType==1){
     const custType="SKP Owner";
      this.customerlist =[];
     this.pickerservice.SearchSKP_KPP_OwnerList(this.WarehouseId,custType).subscribe(x => {
      this.customerlist = x; 
      this.blocked = false;     
      console.log('GeTPeople:', this.customerlist);
    });
    this.blocked = false;   
  }else{
    this.warehouseSelected(this.WarehouseId,this.CustomerId,this.CustomerType);
  }
}
  }
  getrateTrip(){
    this.warehouseSelected(this.WarehouseId,this.CustomerId,this.CustomerType);
  }
  selectwarehouse(){
    this.pickerList=[];
    this.CustomerType="";
    this.CustomerId="";
    this.WarehouseIdFilter=true;
  }
  selectoType(){
    this.pickerList=[];
    this.OrderType="";
  }
}

