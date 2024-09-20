import { Component, OnInit } from '@angular/core';
import { CustomerClusterHolidaysService } from 'app/delivery-capacity-opti/Service/customer-cluster-holidays.service';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-priority-warehouse-stores',
  templateUrl: './priority-warehouse-stores.component.html',
  styleUrls: ['./priority-warehouse-stores.component.scss']
})
export class PriorityWarehouseStoresComponent implements OnInit {

  constructor(private cityService: CityService, private customerservice: CustomerService, private salesApp: SalesAppServiceService
    , private apiservice: CustomerClusterHolidaysService, private msg: MessageService, private peoplePilot: PepolePilotService,
    private exportservice: ExportServiceService, private confirmationService: ConfirmationService
  ) { this.entity = "PriorityWarehouseStore"; }

  entity: any;
  blocked: boolean = false;
  cityList: any
  SelectedCity: any[] = []
  selectedWareHouse: any[] = []
  Selectedstore: any[] = []
  CityIDD: any
  Widd: any
  Sidd: any
  WareHouseList: any
  clusterList: any
  store: any
  DataList: any
  Status: any[] = []
  StConfigstore: any[] = []
  StNameList: any[] = []
  StConfigStorePerc: any
  StConfigPerc: any
  check: boolean = true;
  StConfigCity: any[] = []
  CityIDDd: any
  WareHouseLists: any
  WareHouseListt: any
  WhConfigCity: any
  roleName: any
  roleList: any
  WarehouseRole: boolean = false;
  SalesRole: boolean = false;
  HQRole: boolean = false;
  storeL: any
  TotalRecord: number = 0;
  StConfigWareHouse: any = []
  StConfigShow: boolean = false
  WhConfigShow: boolean = false;
  first: number = 0
  addC: boolean = false;
  StConfigStatus: any
  WhConfigWareHouse: any
  WhConfigPerc: any
  editItem: any
  editShow: boolean = false;
  editWHConfigper:any
  editStConfigper:any
  s: any
  AllDataStoreList: any[] = []
  historypopup: boolean = false;
  historyDetailid: number

  ngOnInit() {
    this.GetCity();
    this.GetStore();
    this.Status = [
      { 'name': 'Active', 'code': 'true' },
      { 'name': 'InActive', 'code': 'false' }
    ]
    this.role();
  }
  role() {
    this.blocked = true;
    this.peoplePilot.GetUserRole().subscribe(result => {
      this.blocked = false;
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);
      for (var i in this.roleList) {

        if (this.roleList[i] == 'Regional Outbound Lead' || this.roleList[i] == 'HQ Master login') {
          this.WarehouseRole = true;
        }
        else if (this.roleList[i] == 'Region sales lead' || this.roleList[i] == 'HQ Master login' || this.roleList[i] == "CM5 Sales Lead") {
          this.SalesRole = true;
        }
        if (this.roleList[i] == 'HQ Master login') {
          this.HQRole = true;
        }
      }
      localStorage.removeItem('role');
      console.log("wh role", this.WarehouseRole);

    });
  }
  GetCity() {
    this.blocked = true;
    this.cityService.GetAllCity().subscribe(result => {
      this.blocked = false;
      this.cityList = result;
    })
  }
  GetWarehouse() {
    this.CityIDD = [];
    this.selectedWareHouse = [];
    this.SelectedCity.forEach((element) => {
      this.CityIDD.push(element.Cityid);
    });
    this.blocked = true;
    this.customerservice.GetWarehouseListForTarget(this.CityIDD).subscribe((WareRes) => {
      this.blocked = false;
      console.log(WareRes, "WareRes");
      this.WareHouseList = WareRes;
    });
  }
  WhWare() {
    this.CityIDD = [];
    this.WhConfigWareHouse = undefined;
    this.WhConfigCity.forEach(element => {
      this.CityIDD.push(element.Cityid)
      this.blocked = true;
      this.customerservice.GetWarehouseListForTarget(this.CityIDD).subscribe(WareRes => {
        this.blocked = false;
        this.WareHouseListt = WareRes;
        this.CityIDD = [];
      })
    })
  }
  Stware() {
    this.CityIDD = [];
    this.StConfigWareHouse = [];
    this.StConfigCity.forEach(element => {
      this.CityIDD.push(element.Cityid)
      this.blocked = true;
      this.customerservice.GetWarehouseListForTarget(this.CityIDD).subscribe(WareRes => {
        this.blocked = false;
        this.WareHouseLists = WareRes;
        this.CityIDD = []
      })
    })
  }
  GetStore() {
    this.storeL = [];
    this.blocked = true;
    this.salesApp.GetStoreList().subscribe(data => {
      this.blocked = false;
      this.store = data;
      this.store.forEach(ele => {
        this.storeL.push(ele.Id)
      });
    })
  }
  Search(event) {
    debugger;
    if (this.SelectedCity.length == 0) {
      this.showError("Select City"); return false;
    }
    else if (this.selectedWareHouse.length == 0) {
      this.showError("Select Warehouse"); return false;
    }
    // else if (this.Selectedstore.length == 0) {
    //   this.showError("Select Store"); return false;
    // }
    else (this.selectedWareHouse.length > 0 && this.Selectedstore.length > 0)
    {
      this.CityIDD = []; this.Widd = []; this.Sidd = [];
      this.SelectedCity.forEach(element => {
        this.CityIDD.push(element.Cityid)
      });
      this.selectedWareHouse.forEach(element => {
        this.Widd.push(element.WarehouseId)
      });
      this.Selectedstore.forEach(element => {
        this.Sidd.push(element.Id)
      });
      const payload = {
        "WarehouseId": this.Widd,
        "StoreId": this.Sidd,
        "Skip": event && event.first ? event.first : 0,
        "Take": event && event.rows ? event.rows : 10,
        "IsExport": false
      }
      if (event == null) {
        this.TotalRecord = 0;
        this.first = 0
      }
      this.blocked = true;
      this.apiservice.GetPriorityWarehouseStore(payload).subscribe(res => {
        this.blocked = false;
        console.log(res);
        this.DataList = res;
        if (res.length != 0) {
          this.TotalRecord = res[0].TotalCount
          if (res.length != 0 && res[0].StoreId == null) {
            alert("Since no store is selected so stores without priority configuration is displayed here.");
          }
        }
        if (res.length == 0) {
          alert("Please select store.");
        }
      })
    }
  }
  AddWHConfig() {
    if (this.WarehouseRole) {
      this.WhConfigShow = true;
      this.Selectedstore = []
      this.selectedWareHouse = []
      this.SelectedCity = []
      this.DataList = undefined
    }
  }
  AddStoreConfig() {
    if (this.SalesRole) {
      this.StConfigShow = true;
      this.Selectedstore = []
      this.selectedWareHouse = []
      this.SelectedCity = []
      this.DataList = undefined
    }
  }
  Export() {
    debugger;
    if (this.SelectedCity.length == 0) {
      this.showError("Select City");
      return false;
    }
    else if (this.selectedWareHouse.length == 0) {
      this.showError("Select Warehouse"); return false;
    }
    // else if (this.Selectedstore.length == 0) {
    //   this.showError("Select Store");return false;
    // }
    else (this.selectedWareHouse && this.Selectedstore && this.selectedWareHouse.length > 0 && this.Selectedstore.length > 0)
    {
      this.CityIDD = []; this.Widd = []; this.Sidd = [];
      this.SelectedCity.forEach(element => {
        this.CityIDD.push(element.Cityid)
      });
      this.selectedWareHouse.forEach(element => {
        this.Widd.push(element.WarehouseId)
      });
      this.Selectedstore.forEach(element => {
        this.Sidd.push(element.Id)
      });
      const payload = {
        "WarehouseId": this.Widd,
        "StoreId": this.Sidd,
        "Skip": 0,
        "Take": 20,
        "IsExport": true
      }
      this.blocked = true;
      this.apiservice.GetPriorityWarehouseStore(payload).subscribe(res => {
        this.blocked = false;
        console.log(res);
        if (res.length != 0) {
          if (res.length != 0 && res[0].StoreId == null) {
            this.showError("here only those data will shown that's warehouse - store data not mapped");
          }
        }
        if (res.length == 0) {
          this.showError("here only those data will shown that's warehouse - store data not mapped"); return false;
        }
        if (res.length != 0) {
          var exportData = []
          for (var i in res) {
            var selectedFields = {
              "WarehouseName": res[i].WarehouseName,
              "StoreName": res[i].StoreName,
              "WarehouseConfigpercentage": res[i].WarehouseConfigpercentage,
              "StoreConfigpercentage": res[i].StoreConfigpercentage,
              "Status": res[i].Status,
            }
            exportData.push(selectedFields);
          }
          this.exportservice.exportAsExcelFile(exportData, "Priority Export Data")
        }
      })
    }
  }
  Add() {
    debugger;
    if (this.StConfigCity.length == 0) {
      this.showError("Select City"); return false;
    }
    else if (this.StConfigWareHouse.length == 0) {
      this.showError("Select Warehouse"); return false;
    }
    else if (this.StConfigstore.length == 0) {
      this.showError("Select Store"); return false;
    }
    else if (this.StConfigStatus == undefined) { this.showError("Select Status"); return false; }
    else {
      if (this.StNameList.length == 0) {
        this.StConfigstore.forEach(element => {
          var list = {
            "warehouseid": this.StConfigWareHouse.WarehouseId,
            "WarehouseName": this.StConfigWareHouse.WarehouseName,
            "Storeid": element.Id,
            "StoreName": element.Name,
            "StoreConfigpercentage": 0,
            "Status": this.StConfigStatus.code
          }
          this.StNameList.push(list);
        })
      }
      else {
        var w = this.StNameList.filter(x => x.warehouseid == this.StConfigWareHouse.WarehouseId);
        if (w.length == 0) {
          this.StConfigstore.forEach(element => {
            var list = {
              "warehouseid": this.StConfigWareHouse.WarehouseId,
              "WarehouseName": this.StConfigWareHouse.WarehouseName,
              "Storeid": element.Id,
              "StoreName": element.Name,
              "StoreConfigpercentage": 0,
              "Status": this.StConfigStatus.code
            }
            this.StNameList.push(list);
          })
        }
        else {
          let result = "";
          w.forEach(ele => {
            this.StConfigstore.forEach(element => {
              if (ele.Storeid == element.Id && this.StConfigWareHouse.WarehouseId == ele.warehouseid) {
                this.check = false;
                this.showError(element.Name + " is Already Exists");
                result += element.concat(",");
                return false;
              }
            })
          })
          if (this.check == true) {
            this.StConfigstore.forEach(element => {
              var list = {
                "warehouseid": this.StConfigWareHouse.WarehouseId,
                "WarehouseName": this.StConfigWareHouse.WarehouseName,
                "StoreConfigpercentage": 0,
                "Storeid": element.Id,
                "StoreName": element.Name, //
                "Status": this.StConfigStatus.code
              }
              this.StNameList.push(list);
              // this.List=this.StNameList
            })
          }
        }
      }
    }
    this.StConfigstore = [];
  }
  GetWarehoseCOnfigAll() {
    this.blocked = true;
    this.apiservice.GetWarehoseCOnfig(this.WhConfigWareHouse.WarehouseId).subscribe(res => {
      this.blocked = false;
      console.log(res);
      if (res == null) {
        this.WhConfigPerc = 0; this.blocked = false;
      }
      else {
        this.WhConfigPerc = res.WarehouseConfigpercentage
        this.showError("Data Already Existed");
      }
    })
  }
  GetWarehoseCOnfig(event) {
    debugger;
    if (this.StConfigWareHouse != undefined) {
      this.blocked = true;
      this.apiservice.GetWarehoseCOnfig(this.StConfigWareHouse.WarehouseId).subscribe(res => {
        this.blocked = false;
        console.log(res);
        if (res == null) {
          this.StConfigPerc = 0; this.blocked = false;
          alert("Please Add Warehouse Configuration.");
          this.addC = true;
          // this.StConfigShow=false;
          return false;
        } else {
          this.blocked = false;
          this.StConfigPerc = res.WarehouseConfigpercentage;
          this.addC = false;
        }
      })
    }
    let q = []
    q = this.StConfigWareHouse.WarehouseId
    const payload = {
      "WarehouseId": [q],
      "StoreId": this.storeL,
      "Skip": event && event.first ? event.first : 0,
      "Take": event && event.rows ? event.rows : 40,
      "IsExport": false
    }
    this.blocked = true;
    this.apiservice.GetPriorityWarehouseStore(payload).subscribe(res => {
      this.blocked = false;
      console.log(res);
      this.AllDataStoreList = res;
    })

  }
  StorePerc(pp) {
    debugger
    this.StConfigStorePerc = pp;
    console.log(this.StNameList);
    this.StNameList.forEach(ele => {
      if (ele.Storeid == pp.Storeid && ele.warehouseid == pp.warehouseid) {
        ele.StoreConfigpercentage = pp.StConfigStorePerc;
      }
    })
  }
  SaveSt() {
    let gf = false;
    if (this.StNameList.length > 0) {
      this.StNameList.forEach(e => {
        if (e.StoreConfigpercentage == 0) {
          gf = true;
        }
      })
      let result = "";
      console.log(this.StNameList, "StNameList");
      var sNam = []
      this.StNameList.forEach(ele => {
        let abc = this.AllDataStoreList.filter(x => x.warehouseId == this.StConfigWareHouse.WarehouseId && x.StoreId == ele.Storeid)
        if (abc.length > 0) {
          abc.forEach(element => {
            sNam.push(element.StoreName);
          });
        }
      });
      result += sNam;
      if (result != "") {
        alert(result + " already exist");
        return false;
      }
      if (gf) {
        this.showError("Enter StoreConfigpercentage");
        gf = false;
        return false;
      }
      else {
        this.s = 0;
        let abc = this.AllDataStoreList.filter(x => x.warehouseId == this.StConfigWareHouse.WarehouseId);
        abc.forEach(element => {
          this.s = this.s + element.StoreConfigpercentage
        });
        console.log(this.s);
        let t = 0;
        this.StNameList.forEach(e => {
          t = t + parseInt(e.StoreConfigpercentage)
        });
        t = t + this.s
        if (t <= 100) {
          this.blocked = true;
          this.apiservice.AddnewPriority(this.StNameList).subscribe(res => {
            console.log(res);
            if (res) {
              alert(res);
              this.Stcancel();
              this.Search(null);
              this.blocked = false;
            }
            else {
              alert(res); this.blocked = false;
            }
          })

        } else {
          alert("Unable to add configuration for new store due to 100% limit already assigned to other stores.");
        }
      }
    }
    else {
      alert("Please Add Store") //this.s
    }
  }
  SaveWh() {
    if (this.WhConfigCity == undefined) { alert("select city") }
    else if (this.WhConfigWareHouse == undefined) { alert("select warehouse") }
    else if (this.WhConfigPerc == undefined) { alert("Enter Percentage") }
    else {
      if (this.WhConfigPerc <= 100) {
        let payload = {
          "warehouseid": this.WhConfigWareHouse.WarehouseId,
          "WarehouseConfigpercentage": this.WhConfigPerc,
          "Status": true
        }
        this.blocked = true;
        this.apiservice.AddnewWhPriority(payload).subscribe(res => {
          console.log(res);
          if (res) {
            this.blocked = false;
            this.showSuccess(res);
            this.WhConfigShow = false;
            this.Whcancel();
          }
          else {
            this.blocked = false;
            this.showError(res);
          }
        })
      }
      else {
        alert("Invalid entry. Total percentage cannot be greater than 100%")
        return false;
      }
    }
  }
  Edit(item) {
    this.editItem = item;
    this.editShow = true;
    this.editWHConfigper = item.WarehouseConfigpercentage;
    this.editStConfigper = item.StoreConfigpercentage;

    const payload = {
      "WarehouseId": this.Widd,
      "StoreId": this.storeL,
      "Skip": 0,
      "Take": 40,
      "IsExport": false
    }
    this.blocked = true;
    this.apiservice.GetPriorityWarehouseStore(payload).subscribe(res => {
      this.blocked = false;
      console.log(res);
      this.AllDataStoreList = res;
      debugger;
      var abc = this.AllDataStoreList.filter(x => x.warehouseId == item.warehouseId && x.StoreId != item.StoreId)
      this.s = 0;
      abc.forEach(element => {
        this.s = this.s + element.StoreConfigpercentage
      });
    });
    console.log(this.s)
  }
  // ChangeEdit() {
  //   debugger;
  //   var t = 0;
  //   let y = this.s + parseInt(this.editStConfigper)
  //   if ((this.editWHConfigper == undefined || this.editWHConfigper == null || this.editWHConfigper == "" || this.editWHConfigper == 0) && this.WarehouseRole == true && this.HQRole == false) {
  //     this.showError("Enter warehouse percentage"); return false;
  //   }
  //   else if ((this.editStConfigper == undefined || this.editStConfigper == null || this.editStConfigper == "") && this.SalesRole == true && this.HQRole == false) {
  //     this.showError("Enter store percentage"); return false;
  //   }
  //   else if (this.editWHConfigper > 100) {
  //     this.showError("Invalid entry. Total percentage cannot be greater than 100%"); return false;
  //   }
  //   else {
  //     if (this.HQRole == true && this.editItem.StoreId == null) {
  //       const payload = {
  //         "warehouseid": this.editItem.warehouseId,
  //         "WarehouseConfigpercentage": this.editWHConfigper,
  //         "storeid": this.editItem.StoreId,
  //         "storeConfigpercentage": this.editStConfigper
  //       }
  //       this.blocked = true;
  //       this.apiservice.ChangeEditPriority(payload).subscribe(res => {
  //         console.log(res);
  //         if (res == "Updated Successfully") {
  //           alert(res);
  //           this.blocked = false;
  //           this.editShow = false;
  //           return false;
  //         }
  //         else {
  //           this.blocked = false;
  //           alert(res);
  //           return false;
  //         }
  //       })
  //     }
  //     else {
  //       if (this.WarehouseRole == true)// && this.editItem.StoreId =="null"
  //       {
  //         const payload = {
  //           "warehouseid": this.editItem.warehouseId,
  //           "WarehouseConfigpercentage": this.editWHConfigper,
  //           "storeid": this.editItem.StoreId,
  //           "storeConfigpercentage": this.editStConfigper
  //         }
  //         this.blocked = true;
  //         this.apiservice.ChangeEditPriority(payload).subscribe(res => {
  //           console.log(res);
  //           if (res == "Updated Successfully") {
  //             alert(res);
  //             this.blocked = false;
  //             this.editShow = false;
  //             return false;
  //           }
  //           else {
  //             this.blocked = false;
  //             alert(res); this.editShow = false;
  //             return false;
  //           }
  //         })
  //       }        
  //       if (y <= 100 && this.SalesRole == true) { //&& this.editItem.StoreId==null
  //         const payload = {
  //           "warehouseid": this.editItem.warehouseId,
  //           "WarehouseConfigpercentage": this.editWHConfigper,
  //           "storeid": this.editItem.StoreId,
  //           "storeConfigpercentage": this.editStConfigper
  //         }
  //         this.blocked = true;
  //         this.apiservice.ChangeEditPriority(payload).subscribe(res => {
  //           console.log(res);
  //           if (res == "Updated Successfully") {
  //             alert(res);
  //             this.blocked = false;
  //             this.editShow = false;
  //             this.Search(null);
  //           }
  //           else {
  //             this.blocked = false;
  //             alert(res);
  //           }
  //         })
  //       } else {
  //         if (this.SalesRole == true) {
  //           alert("Total percentage of stores cannot be greater than 100% ");
  //           console.log(t);
  //           return false;
  //         }
  //       }
  //     }

  //   }
  // }
  ChangeEdit() {
    debugger;
    var t = 0;
    let y = this.s + parseInt(this.editStConfigper)
    if ((this.editWHConfigper == undefined || this.editWHConfigper == null || this.editWHConfigper == "" || this.editWHConfigper == 0) && this.WarehouseRole == true) {
      this.showError("Enter warehouse percentage"); return false;
    }
    else if ((this.editStConfigper == undefined || this.editStConfigper == null || this.editStConfigper == "") && this.SalesRole == true) {
      this.showError("Enter store percentage"); return false;
    }
    else if (this.editWHConfigper > 100) {
      this.showError("Invalid entry. Total percentage cannot be greater than 100%"); return false;
    }
    else {
      if (y <= 100 || this.editItem.StoreId == null) { //&& this.editItem.StoreId==null
        const payload = {
          "warehouseid": this.editItem.warehouseId,
          "WarehouseConfigpercentage": this.editWHConfigper,
          "storeid": this.editItem.StoreId,
          "storeConfigpercentage": this.editStConfigper
        }
        this.blocked = true;
        this.apiservice.ChangeEditPriority(payload).subscribe(res => {
          console.log(res);
          if (res == "Updated Successfully") {
            alert(res);
            this.blocked = false;
            this.editShow = false;
            // this.Search(null);
          }
          else {
            this.blocked = false;
            alert(res);
          }
        })
      } else {
        alert("Total percentage of stores cannot be greater than 100% ");
        console.log(t);
        return false;
      }
    }
  }
  ChangeStatus(i) {
    debugger;
    if (i.Id != undefined) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to update? ',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',

        accept: () => {
          console.log(i);
          var a = !i.Status
          console.log(a);
          this.blocked = true;
          this.apiservice.ActiveInactivePriorityStoreIdWies(i.Id, a).subscribe(res => {
            console.log(res);
            if (res.Status) {
              this.blocked = false;
              this.showSuccess(res.Message);
              this.Search(null);
            }
            else {
              this.blocked = false;
              this.showError(res.Message);
            }
          })
        },
        reject: () => {}
      });
    } else {
      alert("Please Add Store Config");
    }
  }
  showError(msg1: string) {
    this.msg.add({ severity: 'error', summary: 'Error', detail: msg1 });
  }
  showSuccess(msg1: string) {
    this.msg.add({ severity: 'success', summary: 'Success', detail: msg1 });
  }
  openHistory(d, e) {
    this.historyDetailid = d.Id;
    this.historypopup = true
  }
  Stcancel() {
    this.StConfigCity = []
    this.StConfigPerc = undefined
    this.StConfigShow = false;
    this.StConfigStatus = undefined
    this.StConfigWareHouse = undefined
    this.StConfigstore = []
    this.StNameList = []
  }
  Whcancel() {
    this.WhConfigPerc = undefined
    this.WhConfigWareHouse = undefined
    this.WhConfigCity = undefined
    this.WhConfigShow = false;
  }
  Editcancel() {
    this.editShow = false;
    this.editStConfigper = undefined;
    this.editWHConfigper = undefined;
  }
  load(e) {
    debugger;
    this.Search(e);
  }
  Remove(d, index) {
    console.log(d);
    console.log(index);
    var b = this.StNameList.findIndex(x => x.Storeid == d.Storeid);
    console.log("bb::", b);
    this.StNameList.splice(b, 1)
    console.log(this.StNameList);

  }
  historypopupClose() {
    this.historypopup = false
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/; // Remove the minus sign from the pattern

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  space(event: any) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }
}

