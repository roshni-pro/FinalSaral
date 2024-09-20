import { Component, OnInit } from '@angular/core';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gr-quality-configuration',
  templateUrl: './gr-quality-configuration.component.html',
  styleUrls: ['./gr-quality-configuration.component.scss']
})
export class GrQualityConfigurationComponent implements OnInit {

  constructor(private warehouseService: WarehouseService, private Service: PodashboardserviceService
    , private confirmationService: ConfirmationService, private msg: MessageService, private serv: InventoryforcastserService
  ) {
    this.entity = "GrQualityConfiguration";
  }
  StatusList: any[] = []
  WareHouseList: any
  Keyword: any
  selectedStatus: any
  selectedWH: any
  searchList: any
  AdWareHouse: any = []
  addPopup: boolean = false
  aKeyword: any
  itemsList: any
  selecteditem: any
  additemList: any = []
  TotalRecord: number = 0
  historyDetailid: any
  historypopup: boolean = false;
  entity: any;
  blocked: any = false;
  first: number = 0;
  OrisearchList: any
  subCatList: any = []
  brandList: any = []
  selectedSubCat: any = []
  selectedSubsubCatregory: any = []
  categoryListData: any

  ngOnInit() {
    this.GetWarehouses();
    this.categoryList();
    // this.QualityCheckerPeopleList();
    this.StatusList = [
      { code: true, name: 'Active' },
      { code: false, name: 'In-Active' }
    ]
  }
  GetWarehouses() {
    this.blocked = true;
    this.warehouseService.getWarehouseCommon().subscribe(WareRes => {
      this.WareHouseList = WareRes
      this.blocked = false;
    })
  }
  sear(){
    this.TotalRecord = 0;
        this.first = 0;
  }
  Search(event) {
    if (this.selectedWH == undefined) { this.showError("Please Select Warehouse"); return false; }
    else if (this.selectedStatus == undefined) { this.showError("Please Select Status"); return false; }
    else {
      let skip = event && event.first ? event.first : 0;
      let take = event && event.rows ? event.rows : 10
      this.Keyword = this.Keyword == undefined ? '' : this.Keyword;
      if (event == null) {
        this.TotalRecord = 0;
        this.first = 0
      }
      let wid=[];
      this.selectedWH.forEach(e => {
        wid.push(e.value);
      });     
      const payload ={
        "warehouseid":wid,
        "active":this.selectedStatus.code,
        "Keyword":this.Keyword,
        "Skip":skip,
        "Take":take
      }
 this.blocked = true;
      this.Service.GrQualityApprovalConfiguration(payload).subscribe(res => {
        this.blocked = false;
        this.searchList = res;
        this.QualityCheckerPeopleList();
        this.OrisearchList = res;
        this.TotalRecord = res[0].TotalCount;
        console.log(this.searchList);
      })
    }
  }

  Add() {
    this.addPopup = true;
  }
  AdBrand: any = []
  Asearch() {
    if (this.AdWareHouse.length == 0) {
      alert("please Select Warehouse"); return false;
    }
    // else if (this.aKeyword == undefined) {
    //   alert("Please search keyword"); return false;
    // }
    else if (this.AdBrand.length == 0) {
      alert("Please Select Brand"); return false;
    }
    else
    // if (this.aKeyword != undefined && this.aKeyword.length >= 3)
    {
      let wid = [], bid = [];
      this.AdWareHouse.forEach(ele => {
        wid.push(ele.value)
      });
      this.AdBrand.forEach(ele => {
        bid.push(ele.BrandId)
      });
      // this.blocked = true;
      const payload =
      {
        'warehouseid': wid,
        'brandId': bid,
        'keyword': this.aKeyword == undefined ? '' : this.aKeyword
      }
      this.Service.AddSearchGrQualityItem(payload).subscribe(res => {
        this.itemsList = undefined; this.selecteditem = undefined; this.peopleDcs = []
        console.log(res);
        this.itemsList = res;
        this.QualityCheckerPeopleList();
        // this.peopleDcs=res.peopleDcs
        // this.blocked = false;
      })
    }
    // else {
    //   alert("Please enter atleast 3 letters");
    // }
  }
  peopleDcs: any = []
  check: boolean = false
  AddItems() {
    if (this.selecteditem == undefined || this.selecteditem.length == 0) {
      alert("Please Select Items")
      return false;
    }
    if (this.additemList.length > 0) {
      let result = "";
      this.additemList.forEach(ele => {
        this.selecteditem.forEach(element => {
          this.AdWareHouse.forEach(e => {
            if (ele.WarehouseId == e.value && ele.ItemNo == element.ItemNumber) {
              result = element.ItemNumber//.concat(",");
              this.check = true;
            }
          });
        });
      })
      this.check == true ? alert(result + " already existed") : false;
    }
    if (this.additemList.length > 0 && this.check == false) {
      this.selecteditem.forEach(ele => {
        this.AdWareHouse.forEach(e => {
          var list = {
            "ItemNo": ele.ItemNumber,
            "ItemName": ele.ItemName,
            "WarehouseId": e.value,
            "Warehouse": e.label,
            "CheckerId": this.AdPeopleid == undefined ? 0 : this.AdPeopleid.PeopleID
          }
          this.additemList.push(list);
        });
      })
    } else {
      if (this.additemList.length == 0) {
        this.selecteditem.forEach(ele => {
          this.AdWareHouse.forEach(e => {
            var list = {
              "ItemNo": ele.ItemNumber,
              "ItemName": ele.ItemName,
              "WarehouseId": e.value,
              "Warehouse": e.label,
              "CheckerId": this.AdPeopleid == undefined ? 0 : this.AdPeopleid.PeopleID
            }
            this.additemList.push(list);
          })
        })
      }
    }
    console.log(this.additemList);

    this.check = false;
  }
  AdPeopleid: any
  isChecker:boolean=true
  SaveAdd() {
    if (this.additemList.length == 0) {
      alert("Please add item"); return false;
    }
    else if (this.additemList.length > 0) {
      this.additemList.forEach(ele => {
        if (ele.CheckerId == 0) {
          alert("Select Quality Manager for " + ele.ItemNo);
          this.isChecker=false;
          return false;
        }
      });
    }
    if(this.isChecker){
    this.blocked = true;
      this.Service.AddNewGrQualityApprovalItem(this.additemList).subscribe(res => {
        this.blocked = false;
        if (res.Status) {
          alert(res.Message);
          this.addPopup = false;
        } else {
          alert(res.Message);
        }
      })
    }this.isChecker=true;
  }

  Edit(item) {
    debugger;
    console.log(item);
      this.confirmationService.confirm({
        message: !item.IsActive ? 'Are you sure you want to Deactivate?' : 'Are you sure you want to Activate?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (!item.IsActive) { item.IsReportUpload = false; }
          const payload = {
            'WarehouseId': item.WarehouseId,
            'ItemNumber': item.ItemNumber,
            'IsReportUpload': item.IsReportUpload,
            'IsActive': item.IsActive,
            'CheckerId': item.peopleId
          }
          this.blocked = true;
          this.Service.ChangeEditQualityConfig(payload).subscribe(res => {
            this.blocked = false;
            if (res.Status) {
              alert(res.Message);
              this.isShow=false;
              this.Search(event);
            } else {
              alert(res.Message);
            }
          })
        }
      })
  }

  EditQ(item) {
    debugger;
    console.log(item);
    if (item.DisplayName.PeopleID !=undefined){
      this.confirmationService.confirm({
        message: 'Are you sure you want to Update',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (!item.IsActive) { item.IsReportUpload = false; }
          const payload = {
            'WarehouseId': item.WarehouseId,
            'ItemNumber': item.ItemNumber,
            'IsReportUpload': item.IsReportUpload,
            'IsActive': item.IsActive,
            'CheckerId': item.DisplayName!=undefined ? item.DisplayName.PeopleID  :""
          }
          this.blocked = true;
          this.Service.ChangeEditQualityConfig(payload).subscribe(res => {
            this.blocked = false;
            if (res.Status) {
              alert(res.Message);
              this.isShow=false;
              this.Search(event);
            } else {
              alert(res.Message);
            }
          })
        }
      })
    }else{
      alert("Select Quality Manager");
    }
    }

  load(e) {
    this.Search(e);
  }
  Close() {
    this.addPopup = false;
    this.additemList = [];
    this.selecteditem = undefined;
    this.aKeyword = undefined;
    this.AdWareHouse = [];
    this.itemsList = undefined;
    this.checkedAll = false;
    this.AdBrand = [];
    this.CheakerAll=undefined;
  }

  Remove(d, index) {
    var b = this.additemList.findIndex(x => x.ItemNo == d.ItemNo && x.WarehouseId == d.WarehouseId);
    this.additemList.splice(b, 1)
  }

  openHistory(d, e) {
    this.historyDetailid = d.Id;
    this.historypopup = true
  }
  showError(msg1: string) {
    this.msg.add({ severity: 'error', summary: 'Error', detail: msg1 });
  }
  showSuccess(msg1: string) {
    this.msg.add({ severity: 'success', summary: 'Success', detail: msg1 });
  }
  checkedAll: boolean = false
  allcheck(a) {
    this.additemList.forEach(ele => {
      ele.IsChecked = a == true ? ele.IsChecked = true : ele.IsChecked = false
    })
  }

  categoryList() {
    this.subCatList = [];
    this.brandList = [];
    this.selectedSubCat = [];
    this.selectedSubsubCatregory = [];
    this.serv.getAllCategories().subscribe(res => {
      this.categoryListData = res;
      this.getAllSubCatList();
    })
  }

  getAllSubCatList() {
    var catIds = this.categoryListData.map(function (elem) {
      return elem.CategoryId ? elem.CategoryId : elem
    });
    this.blocked = true;
    this.serv.getSubCategories(catIds).subscribe(result => {
      this.subCatList = result;
      this.blocked = false;
      this.getAllBrandCatList();
    });
  }
  getAllBrandCatList() {
    var catIds = this.categoryListData.map(function (elem) {
      return elem.CategoryId ? elem.CategoryId : elem
    });
    var SubCatIds = this.subCatList.map(function (elem) {
      return elem.SubCategoryId ? elem.SubCategoryId : elem
    });
    const payload = {
      categoryId: catIds,
      subcategoryId: SubCatIds
    }
    this.blocked = true;
    this.serv.getSubSubCatList(payload).subscribe(result => {
      console.log(result);

      this.brandList = result;
      this.blocked = false;
    });
  }
  Changepeople(item) {
    this.additemList.forEach(e => {
      if (item.WarehouseId == e.WarehouseId && item.ItemNo == e.ItemNo) {
        e.CheckerId = item.AdPeopleid.PeopleID;
      }
    });
    console.log(this.additemList);
  }

  QualityCheckerPeopleList() {
    this.Service.QualityCheckerPeopleList().subscribe(res => {
      console.log(res);
      this.peopleDcs = res;
    })
  }

  isShow:boolean=false
  DisplayNameEdit(i)
  {
    i.isShow=true;
  }
  notShow(i){
    i.isShow=false;
   // i.DisplayName=undefined
  }
  CheakerAll:boolean=false;
  allManag(a){
    if(this.additemList[0].AdPeopleid ==undefined ){
      alert("Select one manager of first row, it will be common to all.");
      this.CheakerAll=false;
      return false;
    }else if(this.additemList[0].AdPeopleid =="" ){
      alert("Select one manager of first row, it will be common to all.");
      this.CheakerAll=false;
      return false;
    }
    if(this.additemList.length>0){
      let pid =this.additemList[0].AdPeopleid;
      this.additemList.forEach(ele => {
          ele.AdPeopleid = a == true ? pid:"";
      })
    }else{
      alert("Select one manager of first row, it will be common to all.");
      this.CheakerAll=false;
    }
  }
}

