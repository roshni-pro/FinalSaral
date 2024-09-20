import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';
@Component({
  selector: 'app-invent-cycles-warehoues',
  templateUrl: './invent-cycles-warehoues.component.html',
  styleUrls: ['./invent-cycles-warehoues.component.scss']
})
export class InventCyclesWarehouesComponent implements OnInit {
  list: any = [];
  List: any = [];
  rowDataV1: any;
  popupOpen: boolean;
  historylist: any;
  lists: any;
  roleName: any;
  roleList: any;
  Button: any[];
  IsAvailable: boolean = false;
  availableData: any = []
  skip: number
  take: number
  blocked: boolean = false;
  total: number
  WarehouseId: number
  rowdata: any
  IsPVProcess: boolean = false;
  entity: any;
  orderids: any[] = [];
  StartPVPopUp: boolean = false;
  constructor(
    private warehouseService: WarehouseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private peoplePilot: PepolePilotService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.entity = "Warehouse"
  }

  ngOnInit() {
    //debugger;
    // this.DisplayButton();
    var roles = localStorage.getItem('role').split(',');
    var assignedRoles = roles.filter(x => x == 'Inbound Lead' || x == 'Banking Executives' || x == 'Banking Associates' || x == 'Banking dept. lead' || x == 'HQ Master login');
    if (assignedRoles.length > 0) {
      this.getData();
    } else {
      alert("You are not Authorize!!");
    }
    //  roles.forEach(x=>{
    //   if(x=='Inbound Lead' || x=='Banking Executives' || x=='Banking Associates' || x== 'Banking dept. lead' || x== 'HQ Master login' ) {   this.getData();   }
    //  })
  }

  getData() {
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);

      for (var i in this.roleList) {
        if (this.roleList[i] == 'HQ Master login' || this.roleList[i] == 'Inbound Lead' || this.roleList[i] == 'Banking Executives' || this.roleList[i] == 'Banking Associates' || this.roleList[i] == 'Banking dept. lead') {
          this.warehouseService.GetWarehoueAll().subscribe(result => {
            // this.list = result;
            this.warehouseService.ShowButton().subscribe(res => {
              result.forEach(element => {
                res.forEach(ele => {
                  if (element.WarehouseId == ele.WarehouseId) {
                    element.isShowBtn = ele.isShowBtn;
                  }
                  element.enableList = false;
                });
              });
              this.list = result;
              if (result[0].IsPVProcess == true) {
                this.IsPVProcess = true;
              }
              console.log('list', this.list);


            })



          });
        }
      }


      // this.roleList.forEach(el=>{
      //   if(el == 'HQ Master login' || el == 'Inbound Lead' || el == 'Regional Inbound Lead' ||el == 'Zonal Inbound Lead')
      //   {
      //     debugger
      //     this.warehouseService.GetWarehoueAll().subscribe((result:any) => {
      //       this.List=[];
      //             if(result.length>0){
      //               result.forEach(e=>{
      //                 this.Button.forEach(element=>{
      //                   if(e.WarehoueId==element.WarehoueId){
      //                           let  exm={
      //                               "WarehouseId":e.WarehouseId,
      //                               "WarehouseName":e.WarehouseName ,
      //                               "IsStopCurrentStockTrans":e.IsStopCurrentStockTrans,
      //                               "IsDeliveryOptimizationEnabled":e.IsDeliveryOptimizationEnabled ,
      //                               "IsLocationEnabled":e.IsLocationEnabled,
      //                               "isShowBtn":element.isShowBtn
      //                            }

      //                            this.List.push(exm);
      //                            console.log(this.List); 
      //                           }
      //                         })


      //               })
      //             }

      //           });

      //   } 
      // })



    });
    // if((this.List.length>0 || this.List!=undefined) && (this.Button!=undefined || this.Button.length>0)){
    //   this.List.forEach((element:any) => {
    //     this.Button.forEach((el:any)=>{
    //       // debugger
    //       if(element.WarehoueId==el.WarehoueId)
    //       //   let  exm={
    //       //      "WarehouseId":element.WarehouseId,
    //       //       "WarehouseName":element.WarehouseName ,
    //       //      "IsStopCurrentStockTrans":element.IsStopCurrentStockTrans,
    //       //      "IsDeliveryOptimizationEnabled":element.IsDeliveryOptimizationEnabled ,
    //       //       "IsLocationEnabled":element.IsLocationEnabled,
    //       //       "isShowBtn":el.isShowBtn
    //       //    }
    //       //    this.List.push(exm);
    //         {
    //           console.log("lisssstt",element);
    //           console.log("fsrgr",el);
    //         } 


    //       // }
    //     });
    //     })

    // }
  }
  display: any
  Newlistdata: any
  transactionType: any;
  startPopup(listdata) {
    this.orderids = [];
    //debugger;
    this.Newlistdata = listdata;
    debugger;
    this.display = true
  }
  checkStockInventoryMovement(value) {
    debugger;
    this.transactionType = value;
    var roles = localStorage.getItem('role').split(',');
    var assignedRoles = roles.filter(x => x == 'Inbound Lead' || x == 'Banking Executives' || x == 'Banking Associates' || x == 'Banking dept. lead' || x == 'HQ Master login');
    if (assignedRoles.length > 0) {
      this.start(this.Newlistdata, value);
    } else {
      alert("You are not Authorize!!");
    }
  }
  isOrder: boolean = false;
  templistData: any;
  textMsg: any;
  StockInventoryPopUp: boolean = false;
  InventoryList: any = [];
  start(listdata, value) {
    // debugger    
    this.confirmationService.confirm({
      message: `Are you sure that you want to Start Current ${value == 'SM' ? 'Stock' : 'Inventory'} Transactions?`,
      accept: () => {
        debugger;
        this.isOrder = false;
        listdata.IsStopCurrentStockTrans = true;
        listdata.TransactionType = value;
        this.templistData = listdata;
        console.log(listdata);
        this.loaderService.loading(true);
        this.warehouseService.updateWarehoueInventry(listdata).subscribe(result => {
          this.lists = result;
          console.log(this.lists);

          this.loaderService.loading(false);
          // debugger;
          if (result.Status == false) {
            debugger
            this.StockInventoryPopUp = true;
            this.InventoryList = result.BatchMismatchData;
            alert(result.Message);
            // this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
            this.display = false;
            if (result.IsInventoryCycleAutoRTPFound == true) {
              this.orderids = [];
              this.textMsg = '';
              // alert(result.Message);
              this.textMsg = result.Message;
              let ids = result.OrderIds.split(',').map(Number);
              ids.forEach(element => {
                let objIds = {
                  'Id': element
                }
                this.orderids.push(objIds);
                // debugger;
              });
              // this.confirmationService.confirm({
              //   message: result.Message,
              //   accept: () => {
              //     listdata.IsStopCurrentStockTrans=true;
              //     listdata.TransactionType=value;
              //     listdata.IsInventoryCycleAutoRTPConfirm = true;
              //     console.log(listdata);
              //     this.warehouseService.updateWarehoueInventry(listdata).subscribe(result =>{
              //       this.lists=result;                    
              //       if(result.Status == false)
              //       {
              //         alert(result.Message);
              //         // this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
              //         this.display=false; 
              //       }
              //       if(this.lists == 'Inventory For This Warehouse Started Successfully!')
              //       {
              //         this.messageService.add({ severity: 'success', summary: result, detail: '' });
              //         this.display=false
              //       }else{
              //         this.messageService.add({ severity: 'error', summary: result, detail: '' });
              //         this.display=false
              //       }
              //     });
              //   }
              // });
              this.isOrder = true;
              // this.orderIdsUpdate();
            } else {
              let orderids = [];
              // this.textMsg = '';
              // // alert(result.Message);
              // this.textMsg = result.Message;
              let ids = result.OrderIds.split(',').map(Number);
              ids.forEach(element => {
                let objIds = {
                  'Id': element
                }
                this.orderids.push(objIds);
              });
              alert(result.Message + result.OrderIds);
            }
          }
          if (this.lists == 'Inventory For This Warehouse Started Successfully!') {
            this.messageService.add({ severity: 'success', summary: result, detail: '' });
            this.display = false
          } else {
            // this.messageService.add({ severity: 'error', summary: result, detail: '' });
            this.display = false
          }

          //   this.loaderService.loading(true);
          //  this.warehouseService.GetWarehoueAll().subscribe(result => {
          //   this.warehouseService.ShowButton().subscribe(res=>{
          //     result.forEach(element => {
          //       res.forEach(ele => {
          //         if(element.WarehouseId == ele.WarehouseId)
          //         {
          //           element.isShowBtn = ele.isShowBtn;
          //           element.enableList=false;
          //         }
          //       });
          //     });
          //     this.list = result;
          //     this.loaderService.loading(false);
          //     if(result[0].IsPVProcess == true)
          //     {
          //       this.IsPVProcess = true;
          //     }
          //     console.log('list',this.list);


          //   })
          //   this.list = result;
          //   if(result[0].IsPVProcess == true)
          //   {
          //     this.IsPVProcess = true;
          //   }
          // });
          this.getData();
        });
      }
    });
  }
  cancel()
  {
    this.getData();
    this.InventoryList=[];
  }
  orderIdsUpdate() {
    debugger;
    // this.confirmationService.confirm({
    //   message: result.Message,
    //   accept: () => {
    debugger;
    let listdata = this.templistData;
    listdata.IsStopCurrentStockTrans = true;
    listdata.IsInventoryCycleAutoRTPConfirm = true;
    console.log(listdata);
    // this.blocked = true;
    this.loaderService.loading(true);
    this.warehouseService.updateWarehoueInventry(listdata).subscribe(result => {
      this.lists = result;
      // this.blocked = false;        
      this.loaderService.loading(false);
      this.isOrder = false;
      if (result.Status == false) {
        alert(result.Message);
        // this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
        this.display = false;
        this.isOrder = false;
      }
      if (this.lists == 'Inventory For This Warehouse Started Successfully!') {
        this.messageService.add({ severity: 'success', summary: result, detail: '' });
        this.display = false
      }
      else {
        // this.messageService.add({ severity: 'error', summary: result, detail: '' });
        this.display = false
      }
      this.getData();
    });
    // }
    // });
  }
  isStartPV: boolean = false;
  startPV(ir) {
    debugger;
    var roles = localStorage.getItem('role').split(',');
    var assignedRoles = roles.filter(x => x == 'Inbound Lead' || x == 'Banking Executives' || x == 'Banking Associates' || x == 'Banking dept. lead' || x == 'HQ Master login');
    if (assignedRoles.length > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Start PV?',
        accept: () => {
          ir.TransactionType = "PV";
          if (this.Newlistdata == undefined) {
            this.Newlistdata = ir;

          }
          this.templistData = ir;
          debugger;
          this.Newlistdata.IsStopCurrentStockTrans = true;
          // this.Newlistdata.TransactionType=value;
          this.loaderService.loading(true);
          this.warehouseService.startPVwarehouseInventory(this.Newlistdata).subscribe(result => {
            debugger
            console.log(result, "startvi");
            if (result.Status == false) {
              debugger
              this.StartViList = result.BatchMismatchData;
              console.log((this.StartViList, "startvilist"));
              alert(result.Message);
              this.StartPVPopUp = true;
            }
            this.loaderService.loading(false);
            debugger;
            if (result.Status == true) {
              this.isStartPV = true;
              this.StartPVPopUp = false
              this.display = false;
              this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
              // this.warehouseService.StopWarehoueInventry(ir).subscribe(result =>{
              //   this.lists=result;
              // this.messageService.add({ severity: 'error', summary: this.lists, detail: '' });
              this.loaderService.loading(true);
              this.warehouseService.GetWarehoueAll().subscribe(result => {
                //api of PV;
                debugger;
                this.warehouseService.ShowButton().subscribe(res => {
                  result.forEach(element => {
                    res.forEach(ele => {
                      if (element.WarehouseId == ele.WarehouseId) {
                        element.isShowBtn = ele.isShowBtn;
                        element.enableList = false
                      }
                    });
                  });
                  this.loaderService.loading(false);
                  if (result[0].IsPVProcess == true) {
                    this.IsPVProcess = true;
                  }



                  this.list = result;
                  console.log('list', this.list);


                })
              });
              // });
            }
            else {
              this.getData();
              if (result.Message == '') {
                result.Message = 'Something Went Wrong!!';
              }
              if (result.Status == false) {
                this.display = false;
                if (result.IsInventoryCycleAutoRTPFound == true) {
                  this.orderids = [];
                  this.textMsg = '';
                  this.textMsg = result.Message;
                  let ids = result.OrderIds.split(',').map(Number);
                  ids.forEach(element => {
                    let objIds = {
                      'Id': element
                    }
                    this.orderids.push(objIds);
                  });
                  this.isOrder = true;
                } else {
                  let orderids = [];
                  let ids = result.OrderIds.split(',').map(Number);
                  ids.forEach(element => {
                    let objIds = {
                      'Id': element
                    }
                    this.orderids.push(objIds);
                  });
                  alert(result.Message + result.OrderIds);
                }
              }
              this.messageService.add({ severity: 'error', summary: result.Message, detail: '' });
            }
            this.getData();
          });
        }
      });
    }
    else {
      alert("You are not Authorize!!");
    }
  }
  StartViList: any[] = [];
  stopPV(ir) {
    debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Stop PV?',
      accept: () => {
        this.loaderService.loading(true);
        this.warehouseService.stopPVwarehouseInventory(ir.WarehouseId).subscribe(result => {
          this.loaderService.loading(false);
          console.log(result, "resultstart");

          if (result.Status == true) {
            this.display = false;
            this.messageService.add({ severity: 'success', summary: result.msg, detail: '' });
            // this.warehouseService.StopWarehoueInventry(ir).subscribe(result =>{
            //   this.lists=result;
            // this.messageService.add({ severity: 'error', summary: this.lists, detail: '' });
            this.loaderService.loading(true);
            this.warehouseService.GetWarehoueAll().subscribe(result => {
              //api of PV;
              debugger;
              this.warehouseService.ShowButton().subscribe(res => {
                result.forEach(element => {
                  res.forEach(ele => {
                    if (element.WarehouseId == ele.WarehouseId) {
                      element.isShowBtn = ele.isShowBtn;
                      element.enableList = false
                    }
                  });
                });
                this.loaderService.loading(false);
                this.list = result;
                if (result[0].IsPVProcess == true) {
                  this.IsPVProcess = true;
                }
                console.log('list', this.list);
              })
            });
            // });
          } else {
            this.messageService.add({ severity: 'error', summary: result.msg, detail: '' });
          }
          this.getData();
        });
      }
    });
  }
  onClickPVBtn(ir) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to do Physical Verification?',
      accept: () => {
        ir.IsStopCurrentStockTrans = false;
        this.loaderService.loading(true);
        this.warehouseService.StopWarehoueInventry(ir).subscribe(result => {
          this.lists = result;
          this.loaderService.loading(false);
          this.messageService.add({ severity: 'error', summary: this.lists, detail: '' });
          this.loaderService.loading(true);
          this.warehouseService.GetWarehoueAll().subscribe(result => {
            //api of PV;
            debugger;
            this.warehouseService.ShowButton().subscribe(res => {
              result.forEach(element => {
                res.forEach(ele => {
                  if (element.WarehouseId == ele.WarehouseId) {
                    element.isShowBtn = ele.isShowBtn;
                    element.enableList = false
                  }
                });
              });
              this.loaderService.loading(false);
              this.list = result;
              if (result[0].IsPVProcess == true) {
                this.IsPVProcess = true;
              }
              console.log('list', this.list);


            })
            // debugger;
            this.loaderService.loading(true);
            this.warehouseService.DeleteTodayInventoryCycleData(ir.WarehouseId).subscribe(x => {
              // debugger;
              this.loaderService.loading(false);
            });
            console.log("list", this.list);

          });
        });
      }
    });
  }
  stop(listdatas) {
    listdatas.TransactionType = null;
    var roles = localStorage.getItem('role').split(',');
    debugger;
    var assignedRoles = roles.filter(x => x == 'Inbound Lead' || x == 'Banking Executives' || x == 'Banking Associates' || x == 'Banking dept. lead' || x == 'HQ Master login');
    if (assignedRoles.length > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Stop CurentStock Transactions?',
        accept: () => {
          listdatas.IsStopCurrentStockTrans = false;
          this.loaderService.loading(true);
          this.warehouseService.StopWarehoueInventry(listdatas).subscribe(result => {
            this.loaderService.loading(false);
            this.lists = result;
            this.messageService.add({ severity: 'success', summary: this.lists, detail: '' });

            this.loaderService.loading(true);
            this.warehouseService.GetWarehoueAll().subscribe(result => {
              this.warehouseService.ShowButton().subscribe(res => {
                result.forEach(element => {
                  res.forEach(ele => {
                    if (element.WarehouseId == ele.WarehouseId) {
                      element.isShowBtn = ele.isShowBtn;
                      element.enableList = false
                    }
                  });
                });
                this.loaderService.loading(false);
                this.list = result;
                if (result[0].IsPVProcess == true) {
                  this.IsPVProcess = true;
                }
                console.log('list', this.list);


              })
              this.list = result;
              if (result[0].IsPVProcess == true) {
                this.IsPVProcess = true;
              }
              console.log("list", this.list);

            });
          });
        }
      });
    } else {
      alert("You are not Authorize!!");
    }
  }
  PVhistorylist: any;
  isPVHistory: boolean = false;
  openDetails(rowDataV1) {
    this.popupOpen = true;
    this.isPVHistory = false;
    this.loaderService.loading(true);
    this.warehouseService.getInventorycyclehistory(rowDataV1.WarehouseId).subscribe(result => {
      this.historylist = result;
      this.loaderService.loading(false);

    });
  }
  openPVHistoryDetail(rowDataV1) {
    this.isPVHistory = true;
    this.popupOpen = false;
    this.loaderService.loading(true);
    this.warehouseService.getWarehousePVHistory(rowDataV1.WarehouseId).subscribe(result => {
      this.PVhistorylist = result;
      this.loaderService.loading(false);

    });
  }
  onClickClearancePreapreItem(ir) {
    // debugger
    this.loaderService.loading(true);
    this.warehouseService.insertClearanceNonSaleablePrepareItem(ir.WarehouseId).subscribe((res: any) => {
      console.log(res);
      this.loaderService.loading(false);

      if (res && res.Status == true) {
        this.list.forEach(element => {
          if (ir.WarehoueId == element.WarehoueId) {
            ir.enableList = true
          }
          else {
            ir.enableList = false;
          }
        });
        this.messageService.add({ severity: 'success', summary: res.Message, detail: '' });
      }
      else {
        this.messageService.add({ severity: 'error', summary: res.Message, detail: '' });
      }



      // if(result.Status==true){
      //   this.messageService.add({ severity: 'success', summary: 'Clearance Item Moved Successfully!!', detail: '' });
      // }
      // else if(result.length!=0){
      //  alert(result.Message);
      // }else{

      // }
    });
  }

  DisplayButton() {
    this.loaderService.loading(true);
    this.warehouseService.ShowButton().subscribe(res => {
      this.loaderService.loading(false);
      this.Button = res;
      console.log("buttonn", this.Button);

    })

  }

  loader(event, WarehouseId) {
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    this.WarehouseId = WarehouseId
    if (this.WarehouseId != null || this.WarehouseId != undefined) {
      this.Available();
    }
  }


  Available() {
    this.availableData = []
    if (this.WarehouseId != null) {
      // this.blocked=true;
      this.loaderService.loading(true);
      this.warehouseService.AvailableItemForClNSOrders(this.WarehouseId, this.skip, this.take).subscribe((res: any) => {

        if (res.AvailableItemForClNSOrderDC && res.AvailableItemForClNSOrderDC.length > 0) {

          this.availableData = res.AvailableItemForClNSOrderDC;
          console.log("this.availableData", this.availableData);
          this.total = res.TotalRecords
        }
        // this.blocked=false;
        this.loaderService.loading(false);

      })
      this.IsAvailable = true;

    }

  }
}
