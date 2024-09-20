import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { BrandbuyerService } from 'app/shared/services/brandbuyer.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { InvForcastInterface, ItemForecastPRRequestForBulkobj, ItemForecastPRRequestForSaveobj } from 'app/inventory-forcast/inv-forcast-interface/inv-forecast-interface';
import { OtherWarehouseDetails } from 'app/inventory-forcast/inv-forcast-interface/inv-forecast-interface'
import * as moment from 'moment';
import { CategoryService } from 'app/shared/services/category.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ConfirmationService } from 'primeng/api';
import { element } from 'protractor';


@Component({
  selector: 'app-item-forecast-for-po',
  templateUrl: './item-forecast-for-po.component.html',
  styleUrls: ['./item-forecast-for-po.component.scss']
})
export class ItemForecastForPoComponent implements OnInit, AfterViewInit {

  //-------------search variables------------------------------//
  masterwarehouseList: any[] = [];
  selectedwarehouse: any;
  CategoryList: any[] = [];
  selectedCatregory: any[] = [];
  subCatList: any[] = [];
  brandList: any[] = [];
  selectedSubsubCatregory: any[] = [];
  selectedSubCat: any[] = [];
  selectedOtherWarehouse: any;

  //-------------dataview variables------------------------------//

  details: InvForcastInterface[] = []

  processDialogVar: boolean = false;
  loading: boolean = false;
  // InternalTransferDialog: boolean = false;
  totalRecords: number = 0;

  skip: number = 0;
  take: number = 0;

  payloadObjForAutoPO = {
    cityIds: [],
    warehouseIds: [],
    categoriesIds: [],
    subCategoriesIds: [],
    subSubCategoriesIds: [],
    NetStock: '',
    skip: this.skip,
    take: this.take,
    SearchItem: ''


  }

  //---------------------------dialog box variables-----------------------------//

  Fulfillment: number = 0;
  dialogData: InvForcastInterface = {
    AveragePurchasePrice: 0,
    BuyingPrice: 0,
    CityId: 0,
    CityName: '',
    CurrentStock: 0,
    FulfillThrow: 0,
    Id: 0,
    ItemMultiMrpId: 0,
    ItemName: '',
    MRP: 0,
    MinOrderQty: 0,
    NetStock: 0,
    NoOfSet: 0,
    PRPaymentType: 0,
    RequiredQty: 0,
    SalesIntent: 0,
    SubsubcategoryName: '',
    SupplierId: 0,
    WarehouseId: 0,
    WarehouseName: '',
    YesterdayDemand: 0,
    PRId: 0,
    PrDate: '',
    DisplayName: '',
    checked: undefined,
    deleteId: undefined,
    ItemForecastDetailId: 0,
    poPurchasePrice: 0,
    RequiredQtyFinal: 0,
    OtherWarehouseCount: 0,
    SalesIntentQty: 0,
    saveDraftUniqueId: 0,
    DemandInCase: 0,
    FinalQty: 0,
    CatID: 0,
    Categoryid: 0,
    SubCatID: 0,
    SubCategoryId: 0,
    SubSubCatID: 0,
    SubsubCategoryid: 0,
    ItemMultiMRPId: 0,
    OPenQty: 0
  }

  supplierList: any[] = [];
  MOQList: any[] = [];
  PRType = [{
    label: "Advance PR",
    value: "Advance PR"
  }, {
    label: "Credit PR",
    value: "Credit PR"
  }];


  selectedSupplier: any;
  selectedMOQ: any;
  selectedPRPaymentType: any;
  selectedAAP: number = 0;
  selectedBuyerPrice: number = 0;
  selectedNoOfSets: any;
  OtherWareHouseList: any[] = [];
  finalQty: number = 0;
  first: number = 0;
  blocked: boolean;
  pickerType: any;
  selectedPicker: any;
  selectedDate: any;
  subcat: [];
  subsubcat: [];
  getRoleData: any;
  hubExecutiveRole: any;
  hqMasterRole: any;
  inventoryForecastingExecutive: any;
  inventoryForecastingSeniorExecutive: any;
  fulFillmentRequest: any;
  cmtType: any;
  poType: any;
  selectedType: any;
  selectedCmt: any;
  selectedPoDetails: any;
  bulkPrView: boolean = false;
  hubPurAssRole: any;
  regionPurLeadRole: any;
  minDateValue: any;
  InventoryMasterWarehouseList:any[]=[]
  searchKeyword: any;
  poshown:boolean=false

  constructor(private warehouseservice: WarehouseService, private Brandbuyer: BrandbuyerService, private API_Service: InventoryforcastserService,
    private categoryService: CategoryService, private subcategoryService: SubCategoryService, private exportService: ExportServiceService,
    private subsubCategoryService: SubSubCategoryService, private confirmationService: ConfirmationService) {
    this.pickerType = [
      { pickerName: "Pick", pickerValue: "Pick" },
      { pickerName: "Delivery from Supplier (chargeable)", pickerValue: "DeliveryfromSupplier" },
      { pickerName: "Delivery from Supplier (FOR)", pickerValue: "DeliveryfromSupplierFor" }
    ],

      this.cmtType = [
        { name: 'Hold', Comments: 'Hold' },
        { name: 'Cut and Dispatch', Comments: 'Cut and Dispatch' },
        { name: 'Via Supplier', Comments: 'Via Supplier' },
        { name: 'Via Internal', Comments: 'Via Internal' }
      ],

      this.poType = [
        { poName: 'All', value: 'all' },
        { poName: 'Planned', value: 'planned' },
        { poName: 'Demand', value: 'demand' },
      ];
    this.test();
  }

  ngOnInit() {
    this.selectedCmt = this.poType[0];
    this.minDateValue = new Date();
    // this.getRoleData = (JSON.parse(localStorage.getItem('tokenData')).rolenames).split(',');
    this.getRoleData = (localStorage.getItem('role')).split(',');
    var hubExecutive = 'Hub purchase executive';  //view + export
    var HQMaster = 'HQ Master login';  // view
    var hubPurAss = 'Hub purchase associate';  //view + export
    var regionPurLead = 'Region Purchase lead'; //view + export
    var FulFillmentRequest = 'FulFillment Request'; //editable
    var InventoryForecastingExecutive = 'Inventory Forecasting Executive';  //editable
    var InventoryForecastingSeniorExecutive = 'Inventory Forecasting Senior Executive';  //editable
    this.inventoryForecastingExecutive = this.getRoleData.find(x => x == InventoryForecastingExecutive);
    this.inventoryForecastingSeniorExecutive = this.getRoleData.find(x => x == InventoryForecastingSeniorExecutive);
    this.fulFillmentRequest = this.getRoleData.find(x => x == FulFillmentRequest);
    this.hubExecutiveRole = this.getRoleData.find(x => x == hubExecutive);
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster);
    this.hubPurAssRole = this.getRoleData.find(x => x == hubPurAss);
    this.regionPurLeadRole = this.getRoleData.find(x => x == regionPurLead);

    this.getBuyerList();
    this.getWarehouse();
    // this.city();
    this.getBuyer();
    this.skip = 1;
    this.take = 10;
  }

  //----------------search input functions-------------------------------//
  POIDs: any
  InternalIDs
  ShowGETID: Boolean = false

  test() {
    let nums1 = [-2, -1, -3];
    let nums2 = [3];
    let mainArr: number[] = nums1.concat(nums2).sort(function (a, b) { return a - b });
    let mainLength: number = mainArr.length;
    let len = parseInt((mainLength / 2).toString());

    if (mainLength % 2 == 0) {
      return (mainArr[len - 1] + mainArr[len]) / 2.0;
    } else {
      return mainArr[len] / 2.0;
    }

  }
  GETPOIDforOpenQty(product) {
    console.log(product);
    this.blocked = true;
    this.API_Service.GETPOIDforOpenQty(product.ItemMultiMrpId, product.WarehouseId).subscribe(result => {
      this.POIDs = result.POIDs
      this.InternalIDs = result.InternalIDs
      this.ShowGETID = true
      this.blocked = false;
    });
  }
 
  //cityListData:any[]=[]
  //cityHub:any[] = []
  // city(){
  //   this.API_Service.getCityList().subscribe(res => {
  //    this.cityListData = res;
  //     this.getAllHUbList();
  //   })
  // }

   //getAllHUbList(){
   //   this.cityHub = this.cityListData.map(function (elem) {
   //    return elem.Cityid ? elem.Cityid : elem
   //  });
   //  this.API_Service.getMultiHubList(this.cityHub).subscribe(res => {
   //    this.masterwarehouseList = res.filter(x => x.IsKPP === false);
   //    console.log(this.masterwarehouseList)
   //  })
  // }

   getWarehouse() {
    this.warehouseservice.GetAllWarehouseWithoutKpp().subscribe(result => {
       this.masterwarehouseList = result;
      // console.log(this.masterwarehouseList,"rr");
       
     });
   } 
//-- done because of warehouse selection

  getWHId() {
    this.viewDraftDataAsClone = [];
  }

  getBuyer() {
    this.blocked = true;
    this.API_Service.FullFillMentCategories().subscribe(result => {
      this.CategoryList = result;
      this.blocked = false;
    });
  }


  getSubCatList(categories) {
    this.subCatList = [];
    this.brandList = [];
    if (categories && categories.length) {
      var cat = [];
      categories.forEach(element => {
        cat.push(element.CategoryId);
      });

      this.blocked = true;
      this.API_Service.FullFillMentCompany(cat).subscribe(result => {

        this.subCatList = result;
        this.blocked = false;

      });
    }
  }

  showcheckBoXSupplier: boolean = false
  isSuplier: any
  getBrandsnew(categories, subcategories) {
    this.brandList = [];
    this.selectedSubsubCatregory = [];
    var catIdArr = []
    var subcatArr = []
    if (subcategories == undefined && categories == undefined) {
      return false;
    }
    else {
      catIdArr = [];
      categories.forEach(element => {
        catIdArr.push(element.CategoryId);
      });
      subcategories.forEach(element => {
        subcatArr.push(element.SubCategoryId);
      });
    }

    const payload = {
      categoryId: catIdArr,
      subcategoryId: subcatArr
    }


    if (subcategories && subcategories.length) {

      this.blocked = true;
      this.API_Service.FullFillMentBrand(payload).subscribe(result => {
        this.brandList = result;
        this.selectedSubsubCatregory = this.brandList;
        this.blocked = false;
      });
    }
  }
  cancel() {
    this.createbulk = false;
  }
  createbulk: boolean = false
  depoList: any;
  selectedDepo: any;
  depoNameBoolean: boolean;
  ExpiryDate:any
  getDepoList(selSupplier) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    console.log(selSupplier);//qqqqq
    this.ExpiryDate= moment(new Date(y, m,date.getDate() + selSupplier.Expirydays)).format('DD/MM/YYYY') 
    this.selDepoName = '';
    this.selectedDepo = undefined;
    if (this.createbulk) {///create
      if (selSupplier.bussinessType == 'Direct from company') { this.isSuplier = true; this.showcheckBoXSupplier = true }
      else { this.isSuplier = false; this.showcheckBoXSupplier = false }
    }
    else {//viewdraft
      if (selSupplier.bussinessType == 'Direct from company') this.showcheckBoXSupplier = true
      else this.showcheckBoXSupplier = false
    }



    //console.log(selSupplier.SupplierId)
    var id = selSupplier.SupplierId
    this.API_Service.getDepoForPr(id).subscribe(res => {
      //console.log(res);
      this.depoList = res;
      for (var i in this.depoList) {
        this.selDepoName = this.depoList[i].DepoName;
      }

      if (this.selDepoName == 'NULL') {
        this.depoNameBoolean = true;
      } else {
        this.depoNameBoolean = false;
      }
      //this.depoList = res.filter(x => x.DepoName != "NULL");
    })

    this.saveAsDraftChkForCondition(selSupplier)
  }
  //----------------search input functions ends-------------------------------//


  //----------------------dialog functions --------------------------------//

  singleRowDetails: any[] = [];
  processDialog(rowData: InvForcastInterface) {
    debugger
    console.log(this.selectedwarehouse,"selectedwarehouse");
    this.InventoryMasterWarehouseList=this.masterwarehouseList
    this.InventoryMasterWarehouseList  = this.InventoryMasterWarehouseList.filter(x =>x.WarehouseId!=this.selectedwarehouse.WarehouseId)
   // console.log(this.InventoryMasterWarehouseList,"oooo");
  
    console.log(rowData)
    this.singleRowDetails = [];
    this.MOQList = [];
    this.dialogData = rowData;
    let arr = [];
    arr.push(this.dialogData);
    arr.forEach(element => {
      this.API_Service.GetItemMoQ(rowData.ItemMultiMrpId, rowData.WarehouseId).subscribe(
        (res) => {
            debugger;
          console.log(res);
          this.supplierList = res.SupplierLst;
          this.selectedSupplier = this.supplierList;
          if (res.MOQLst.length > 0) {
            res.MOQLst.forEach(el => {
              let obj = {
                Quantity: 0,
                Id: 0,
              }
              obj.Quantity = el;
              obj.Id = element.Id
              this.MOQList.push(obj)
            });
            this.selectedMOQ = this.MOQList;
            element.moqSupplierList = this.MOQList;
            element.MinOrderQty = element.moqSupplierList[0];
            element.poPurchasePrice = res.POPurchasePrice;
            let DemandInCaseVal = Math.ceil((element.NetStock / (element.MinOrderQty.Quantity || element.MinOrderQty)));
            element.DemandInCase = DemandInCaseVal > 0 ? 0 : DemandInCaseVal;
            element.OtherWarehouseCount = 0;
            element.OtherWarehouseDetails.forEach(ele => {
              ele.otherWhReqQty == null ? 0 : ele.otherWhReqQty;
              element.OtherWarehouseCount += ele.otherWhReqQty;
            });
            if (element.OtherWarehouseCount < 0) {
              element.OtherWarehouseCount = 0;
            } else {
              element.OtherWarehouseCount = Math.ceil((element.OtherWarehouseCount / (element.MinOrderQty.Quantity || element.MinOrderQty)));
            }
            if (element.RequiredQty < 0) {
              element.RequiredQty = 0;
            } else {
              element.RequiredQtyFinal = Math.ceil((element.RequiredQty / (element.MinOrderQty.Quantity || element.MinOrderQty)));
            }
          } else {
            this.MOQList = [
              {
                Quantity: 0
              }
            ]
          }
        },
        (err) => {
        }
      );
    })

    this.singleRowDetails = arr;
    this.GetItemMoQ(rowData);
    this.Fulfillment = 0;
    this.finalQty = 0;
    this.processDialogVar = true;
  }

  GetItemMoQ(rowData) {
    let obj: InvForcastInterface = rowData;
//    console.log(this.dialogData,"dialogData");

    this.dialogData.OtherWarehouseDetails.forEach(element => {
      if (element.OtherWarehouseId > 0) {
        var data = this.masterwarehouseList.filter(x => x.WarehouseId == element.OtherWarehouseId)
        if(data.length >0){
          element.label = data[0].WarehouseName;  
        }
        // element.label = this.masterwarehouseList.filter(x => x.WarehouseId == element.OtherWarehouseId)[0].WarehouseName;
      }
      console.log(element.label);
    });
    this.OtherWareHouseList = this.dialogData.OtherWarehouseDetails;
    this.selectedOtherWarehouse = this.OtherWareHouseList;

  }

  selectedNetDemand: any;
  selectedAllowedQty: any;

  selectedNetWarehouseId: any;
  getDemandBasedOnWarehouse(demandDetails) {
    console.log(demandDetails,"answer");
    
    if (demandDetails.OtherWhDemand <= 0) {
      this.selectedOtherWarehouse = null;
      this.selectedNetDemand = null;
      this.selectedAllowedQty=null;
      this.selectedNetWarehouseId = null;
      alert("No demand available");
    } else {
      // this.selectedNetDemand = demandDetails.OtherWhNetDemand  changes at 28 dec
      this.selectedNetDemand = demandDetails.OtherWhDemand
      this.selectedAllowedQty=demandDetails.otherWhReqQty
      this.selectedNetWarehouseId = demandDetails.OtherWarehouseId;
    }
  }

  getMoqValue(d, rowSelection) {
    // console.log(d);
    // console.log(rowSelection);
    rowSelection.MinOrderQty = d.value.Quantity ? d.value.Quantity : 0;
    rowSelection.NoOfSet = rowSelection.NoOfSet === null ? rowSelection.NoOfSet : 0;
    rowSelection.FinalQty = rowSelection.MinOrderQty * rowSelection.NoOfSet;
    this.selectedMoqForPo = rowSelection.MinOrderQty;
    if(this.selectedRowItemList.length>0){
    this.selectedRowItemList.forEach(element => {
      if(element.ItemMultiMrpId == rowSelection.ItemMultiMrpId)
      {
        let total = 0;
        if(element.OtherWarehouseDetails == undefined)
        {
          this.tempselectedRowItemList.forEach(temp => {
            if(temp.ItemMultiMRPId == rowSelection.ItemMultiMrpId)
            {
              temp.OtherWarehouseDetails.forEach(data => {
                total +=data.otherWhReqQty;
              });
            }
          });
        }else{
        element.OtherWarehouseDetails.forEach(el => {
          total +=el.otherWhReqQty;
        });
      }
        element.OtherWarehouseCount = Math.ceil((total / (element.MinOrderQty || element.MinOrderQty)));
        element.RequiredQtyFinal = Math.ceil((element.RequiredQty / (element.MinOrderQty || element.MinOrderQty)));
      }
    });
  }else{
    let totalsingle =0
    rowSelection.OtherWarehouseDetails.forEach(el => {
      totalsingle +=el.otherWhReqQty;
    });
    rowSelection.OtherWarehouseCount = Math.ceil((totalsingle / (rowSelection.MinOrderQty || rowSelection.MinOrderQty)));
    rowSelection.RequiredQtyFinal = Math.ceil((rowSelection.RequiredQty / (rowSelection.MinOrderQty || rowSelection.MinOrderQty)));
  }
    this.saveAsDraftChkForCondition(rowSelection);
  }

  selectedInventoryWarehouse:any;
  selDepoName: string = '';
  updateItemFulFillRequest() {
    debugger
    console.log(this.singleRowDetails,"singlerow")
    var payload = {
      ItemForecastDetailId: this.dialogData.Id,
      FulfillThrow: this.Fulfillment,
      BuyingPrice: 0,
      SupplierId: 0,
      PRPaymentType: '',
      MinOrderQty: 0,
      NoOfSet: 0,
      InternalTransferWHId: null,
      SalesIntentQty: this.dialogData.SalesIntent,
      Demand: this.dialogData.YesterdayDemand,
      PickerType: '',
      ETADate: null,
      DepoId: 0,
      PeopleID: 12,
      FreightCharge: 0
    }

    if (this.Fulfillment == 1) {

      if (this.selectedPicker.pickerValue == undefined) {
        alert('Please Select Picker')
        return false;
      }

      if (this.selectedDate == null) {
        alert('Please Select ETA Date')
        return false;
      }

      if (this.selectedSupplier.length > 0) {
        if (this.selectedSupplier.SupplierId == null) {
          alert('Please Select Supplier')
          return false;
        }
      }

      if (this.selectedDepo == undefined) {
        alert('Please Select Depo')
        return false;
      }

      if (this.selectedPRPaymentType.length > 0) {
        if (this.selectedPRPaymentType.value == undefined) {
          alert('Please Select PR')
          return false;
        }
      }

      if (this.selectedBuyer == (null || undefined)) {
        alert('Please Select Buyer');
        return false;
      }

      if (this.singleRowDetails[0].poPurchasePrice == undefined) {
        alert('Please fill PO price')
        return false;
      }
      if (this.singleRowDetails[0].MinOrderQty == undefined) {
        alert('Please fill MOQ')
        return false;
      }
      if (this.singleRowDetails[0].NoOfSet == (undefined || null)) {
        alert('Please fill No of set')
        return false;
      }

      if ((this.singleRowDetails[0].NoOfSet) > (this.singleRowDetails[0].RequiredQtyFinal + this.singleRowDetails[0].OtherWarehouseCount)) {
        alert('No of set in cases should be less or equal than(allowed qty + other hub) in cases');
        return false;
      }

      var pickerType = this.selectedPicker.pickerValue;
      var ETADate = moment(this.selectedDate).format('MM/DD/YYYY');
      var depoId = this.selectedDepo ? this.selectedDepo.DepoId : 0;
      var supplierId = this.selectedSupplier.SupplierId;
      var prPaymentType = this.selectedPRPaymentType.value;
      var buyerId = this.selectedBuyer == null ? '' : this.selectedBuyer.PeopleID;
      var bussinessCheck = this.isSuplier == true ? 'Direct from company' : null;
      console.log("singleRowDetails", this.singleRowDetails);
      
      this.finalArrDetails = this.singleRowDetails.map(function (a) {
        return {
          "ItemForecastDetailId": (a.ItemForecastDetailId.Id || a.ItemForecastDetailId),
          "FulfillThrow": 1,
          "BuyingPrice": parseFloat(a.poPurchasePrice) || a.BuyingPrice,
          "MinOrderQty": (a.MinOrderQty.Quantity || a.MinOrderQty),
          "NoOfSet": parseInt(a.NoOfSet),
          "InternalTransferWHId": null,
          "SalesIntentQty": a.SalesIntent || a.SalesIntentQty,
          "Demand": null,
          "PickerType": pickerType,
          "ETADate": ETADate,
          "DepoId": depoId,
          "SupplierId": supplierId,
          "PRPaymentType": prPaymentType,
          "PeopleID": buyerId,
          "FreightCharge": 0,
          "Id": 0,
          "Warehouseid": a.WarehouseId,
          "AllowedQty": a.RequiredQtyFinal,
          "AllowedQtyOtherHub": a.OtherWarehouseCount,
          "Demandcases": a.DemandInCase,
          "Itemname": a.ItemName,
          "OPenQty": a.OPenQty,
          "RequiredQty": a.RequiredQty,
          "YesterdayDemand": a.YesterdayDemand,
          "SubCategoryId":a.SubCategoryId,
          "bussinessType": bussinessCheck ,   
          "SubsubCategoryId":a.SubsubCategoryid,
          "MultiMrpId":a.ItemMultiMrpId
        }
      })

      var obj = {
        'ItemForecastPRRequestForBulkobj': this.finalArrDetails
      }

      // console.log(obj);
      // return false;
      this.blocked = true;
      this.API_Service.saveBulkPr(obj).subscribe(
        (res) => {
          console.log(res)
          if (res.Status == true) {
            alert(res.msg);
            this.processDialogVar = false;
            this.blocked = false;
            this.viewDraftAddBtnClick = false;
            this.GetItemForeCastForPO();
          }

          if (res.Status == false) {
            alert(res.msg);
            this.blocked = false;
            return false;
          }

        },
        (err) => {
          alert(err.error.ErrorMessage)
          this.blocked = false;
        }
      )

    } else if (this.Fulfillment == 2) {

      if (this.selectedNetWarehouseId == null) {
        alert('Please Select Warehouse')
        return false;
      }

      if (this.selectedMOQ.Quantity == 0) {
        alert('Please Select Different MOQ');
        return false;
      }

      if (this.selectedMOQ.length > 0) {
        alert('Please Select MOQ');
        return false;
      }

      if (this.selectedNoOfSets == null) {
        alert('Please Select NO of Sets');
        return false;
      }

      if (this.selectedNoOfSets == 0) {
        alert('Please Set Different Value');
        return false;
      }

      payload.InternalTransferWHId = this.selectedNetWarehouseId,
        payload.Demand = this.selectedNetDemand,
        payload.MinOrderQty = this.selectedMOQ.Quantity,
        payload.NoOfSet = this.selectedNoOfSets

      this.blocked = true;
      this.API_Service.UpdateItemFulFillRequest(payload).subscribe(
        (res) => {
          debugger
          //console.log(res);
          if (res.Status == true) {
            alert(res.msg)
            this.processDialogVar = false;
            this.blocked = false;
            this.GetItemForeCastForPO();

          } else {
            alert(res.msg)
            this.blocked = false;
          }
        },
        (err) => {
          //console.log(err);
          this.blocked = false;
        }
      );

    }
    else if (this.Fulfillment == 3) {
      debugger
      console.log(this.selectedInventoryWarehouse,"OtherWarehouse");
      

      if (this.selectedInventoryWarehouse == null && this.selectedInventoryWarehouse==undefined) {
        alert('Please Select Warehouse')
        return false;
      }

      if (this.selectedMOQ.Quantity == 0) {
        alert('Please Select Different MOQ');
        return false;
      }

      if (this.selectedMOQ.length > 0) {
        alert('Please Select MOQ');
        return false;
      }

      if (this.selectedNoOfSets == null) {
        alert('Please Select NO of Sets');
        return false;
      }

      if (this.selectedNoOfSets == 0) {
        alert('Please Set Different Value');
        return false;
      }
  
   
    

      payload.InternalTransferWHId = this.selectedInventoryWarehouse.WarehouseId,
      payload.Demand = this.OtherWareHouseList[0].OtherWhDemand,   
        payload.MinOrderQty = this.selectedMOQ.Quantity,
        payload.NoOfSet = this.selectedNoOfSets

      this.blocked = true;
      this.API_Service.UpdateItemFulFillRequest(payload).subscribe(
        (res) => {
          debugger
          //console.log(res);
          if (res.Status == true) {
            alert(res.msg)
            this.processDialogVar = false;
            this.blocked = false;
            this.GetItemForeCastForPO();

          } else {
            alert(res.msg)
            this.blocked = false;
          }
        },
        (err) => {
          //console.log(err);
          this.blocked = false;
        }
      );
      }
    }
  

  ngAfterViewInit() {
    this.loading = false;
  }

  //----------------------dialog functions ends --------------------------------//

  //------------- data view functions -------------------------//

  finalArr: any[] = [];
  viewBtnLocalStorage: any;
  addBtnLocalStorage: any;
  preselectedwarehouse:any;
  GetItemForeCastForPO() {
    debugger
    this.details = []
    this.totalRecords = 0
    this.first = 0;
    this.skip = 1;
    this.take = 10;
    if (this.selectedwarehouse == undefined || this.selectedwarehouse && this.selectedwarehouse.WarehouseId == 0) {
      alert("Please Select Warehouse First!!");
    }
    else if (this.selectedCatregory == undefined || this.selectedCatregory && this.selectedCatregory.length == 0) {
      alert("Please Select Category First!!");
    }
    else if (this.selectedSubCat == undefined || this.selectedSubCat && this.selectedSubCat.length == 0) {
      alert("Please Select SubCategory First!!");
    }
    else if (this.selectedSubsubCatregory == undefined || this.selectedSubsubCatregory && this.selectedSubsubCatregory.length == 0) {
      alert("Please Select SubSubCategory First!!");
    } else if (this.selectedCmt == undefined) {
      alert("Please Select Type");
    } else {
      this.loadData(null)
    }
    if(this.preselectedwarehouse==null){
      this.preselectedwarehouse= this.selectedwarehouse.WarehouseId;
    }
    if(this.preselectedwarehouse != this.selectedwarehouse.WarehouseId){
      this.preselectedwarehouse=this.selectedwarehouse.WarehouseId;
      this.selectedRowItemList=[];
   
    }

  }


  savedDraftCountData: number;
  loadData(event) {
    this.finalChkArr = [];
    this.prList = [];
    this.finalSelectedArr = [];

    //this.selectedRowItemList = [];
    if ((this.selectedwarehouse == undefined || this.selectedwarehouse && this.selectedwarehouse.WarehouseId == 0) || (this.selectedCatregory == undefined || this.selectedCatregory.length == 0) || (this.selectedSubCat == undefined || this.selectedSubCat.length == 0) || (this.selectedSubsubCatregory == undefined || this.selectedSubsubCatregory.length == 0)) {
      return false;
    }

    if (event) {
      var Last = event.first ? event.first + event.rows : 10;
      this.skip = Last / event.rows;
      this.take = event.rows;
    }

    let warehouseIDs: any[] = [];
    let categoriesIDs: any[] = [];
    let subCategoriesIDs: any[] = [];
    let subSubCategoriesIDs: any[] = [];
    let catSelection: number = 0;

    if (this.selectedwarehouse != undefined) {
      warehouseIDs.push(this.selectedwarehouse.WarehouseId)
    }

    if (this.selectedCatregory.length > 0) {
      catSelection = 1;
      this.selectedCatregory.forEach(element => {
        categoriesIDs.push(element.CategoryId)
      });

      if (this.selectedSubCat.length > 0) {
        catSelection = 2;
        this.selectedSubCat.forEach(element => {
          subCategoriesIDs.push(element.SubCategoryId)
        });

        if (this.selectedSubsubCatregory.length > 0) {
          this.selectedSubsubCatregory.forEach(element => {
            subSubCategoriesIDs.push(element.BrandId)
            catSelection = 3;
          });
        } else {
          alert("please select catagory then sub catagory then brands")
        }
      } else {
        alert("please select catagory then sub catagory then brands")
      }
    }

    this.payloadObjForAutoPO = {
      cityIds: [],
      warehouseIds: warehouseIDs,
      categoriesIds: categoriesIDs,
      subCategoriesIds: subCategoriesIDs,
      subSubCategoriesIds: subSubCategoriesIDs,
      NetStock: this.selectedCmt == undefined ? '' : this.selectedCmt.value,
      skip: this.skip || 1,
      take: this.take || 10,
      SearchItem: this.searchKeyword == undefined ? '' : this.searchKeyword
    }

    this.loading = true;
    this.blocked = true;
    debugger;
    this.API_Service.getItemForeCastForPO(this.payloadObjForAutoPO).subscribe(
      (res) => {
        console.log(res);
        //console.log(this.selectedRowItemList);
        this.first = 1;
        this.savedDraftCountData = res.SaveasdraftCount;
        if (res.ItemForeCastPOResponses.length > 0) {
          this.details = res.ItemForeCastPOResponses;

          this.details.forEach((element: any) => {
            element.Comments = { name: element.Comments, Comments: element.Comments }
            element.checked = false;
            element.ItemForecastDetailId = element.Id;
            element.saveDraftUniqueId = 0;
            element.deleteID = false;
          });


          console.log(this.details);
          this.onFinalRowSelect(null);
          this.loading = false;
          this.blocked = false;
          this.totalRecords = res.TotalRecord;
        }
        else {
          this.details = [];
          this.loading = false;
          this.blocked = false;
          this.totalRecords = 0;
        }
      },
      (err) => {
        this.details = [];
        this.loading = false;
        this.blocked = false;
        this.totalRecords = 0;
        alert(err.error.ErrorMessage)
        // console.log(err);
      }
    );

  }

  //------------- data view functions end -------------------------//
  clearDialog() {
    debugger
    //this.selectedSupplier = this.supplierList;
    this.selectedMOQ = this.MOQList;
    this.selectedPRPaymentType = this.PRType;
    this.selectedAAP = this.dialogData.AveragePurchasePrice;
    this.selectedBuyerPrice = 0;
    this.selectedNoOfSets = undefined;
    this.finalQty = 0;
    this.selectedOtherWarehouse = this.OtherWareHouseList;
    this.selectedNetDemand = null;
    this.selectedAllowedQty=null;
    this.selectedPicker = '';
    this.ExpiryDate=undefined
    this.selectedDate = null;
    this.selectedDepo = undefined;
    this.selectedBuyerPrice = null;
    this.numberBoolean = false;
    this.buyingValNotZero = false;
    this.buyingVal = false;
    this.selectedSupplier = undefined;
    this.isSuplier = undefined;
    console.log(this.Fulfillment);
  }
  
  poclearDialog(a) {
    debugger
    //this.selectedSupplier = this.supplierList;
    if(a.WarehouseId>0){
      this.blocked=true;
      this.API_Service.PoCheckbySubcatid(a.WarehouseId,0,a.SubCategoryId,a.SubsubCategoryid,a.ItemMultiMrpId).subscribe(result => {
        this.blocked=false;
        if(result.StopPo==true){
          this.poshown=false;
          alert(result.CompanyBrand)
          return false;
        }
      })
    }
    console.log(a);
    this.poshown=true;
    this.selectedMOQ = this.MOQList;
    this.selectedPRPaymentType = this.PRType;
    this.selectedAAP = this.dialogData.AveragePurchasePrice;
    this.selectedBuyerPrice = 0;
    this.selectedNoOfSets = undefined;
    this.finalQty = 0;
    this.selectedOtherWarehouse = this.OtherWareHouseList;
    this.selectedNetDemand = null;
    this.selectedAllowedQty=null;
    this.selectedPicker = '';
    this.ExpiryDate=undefined
    this.selectedDate = null;
    this.selectedDepo = undefined;
    this.selectedBuyerPrice = null;
    this.numberBoolean = false;
    this.buyingValNotZero = false;
    this.buyingVal = false;
    this.selectedSupplier = undefined;
    this.isSuplier = undefined;
  }

  getMoq(selMoq) {
    this.selectedNoOfSets = null;
    this.finalQty = null;
  }

  numberBoolean: boolean
  keyPress() {
    if (this.selectedNoOfSets == 0) {
      this.numberBoolean = true;
    } else {
      this.numberBoolean = false;
    }
    this.finalQty = 0;
    this.finalQty = this.selectedNoOfSets * this.selectedMOQ.Quantity;
  }

  buyingVal: boolean
  buyingValNotZero: boolean
  buyingPriceKeyPress() {
    if (this.selectedBuyerPrice == 0) {
      this.buyingValNotZero = true;
    } else {
      this.buyingValNotZero = false;
    }
    if (this.dialogData.MRP < this.selectedBuyerPrice) {
      this.buyingVal = true;
    } else {
      this.buyingVal = false;
    }
  }


  bulkbuyingPriceKeyPress(item) {
    //(item.BuyingPrice).toFixed(2);
    console.log(item);
    if (item.poPurchasePrice == 0) {
      this.buyingValNotZero = true;
    } else {
      this.buyingValNotZero = false;
    }
    if (item.MRP < item.poPurchasePrice) {
      this.buyingVal = true;
    } else {
      this.buyingVal = false;
    }
    this.saveAsDraftChkForCondition(item)
  }

  cmtSaveForPo(productDetails) {
    let Id = productDetails.Id;
    let cmt = productDetails.Comments.Comments;
    let supplierId = productDetails.SupplierId == null ? 0 : productDetails.SupplierId;
    if (cmt == null) {
      alert("Please add comment");
      return false;
    }
    this.API_Service.saveComment(Id, cmt, supplierId).subscribe(
      (res) => {
        this.loadData(event);
      },
      (err) => {
        alert(err.error.ErrorMessage)
      }
    )
  }

  prArr: any = [];
  btnEnableForPr: boolean = false;
  selectedItem: boolean = false;
  selectedRowItemList: InvForcastInterface[] = [];
  viewDraftAddBtnClick: boolean = false;
  onRowClick(productData) {
    debugger
    if( this.selectedwarehouse.WarehouseId  >0){
        this.blocked = true;
        this.API_Service.PoCheckbySubcatid(this.selectedwarehouse.WarehouseId,0,productData.SubCategoryId,productData.SubsubCategoryid,productData.ItemMultiMrpId).subscribe(result => {
          debugger  
          this.blocked = false;
           if(result.StopPo==true){
            productData.checked = false;
            alert(result.CompanyBrand)
            return false;
           }
           else{
            if (this.savedDraftCountData > 0 && this.viewDraftAddBtnClick == false) {
                alert('Firstly click View Draft button then after click addmore button');
                productData.checked = undefined;
              }
              if (productData.checked == true) {
                if (this.selectedRowItemList.length > 0) {
                  let checkFlag = 0;
                  this.selectedRowItemList.forEach((element: any, index: number) => {
                    if (element.ItemForecastDetailId == productData.ItemForecastDetailId) {
                      element.checked = true;
                      checkFlag = 1;
                    }
                  })
                  if (checkFlag == 0) {
                    productData.checked = true;
                    this.selectedRowItemList.push(productData);
                  }
          
                } else if (this.selectedRowItemList.length == 0) {
                  this.selectedRowItemList.push(productData);
                }
              } else {
                if (this.selectedRowItemList.length > 0) {
                  this.selectedRowItemList.forEach((element: any, index: number) => {
                    if (element.ItemForecastDetailId == productData.ItemForecastDetailId) {
                      this.selectedRowItemList.splice(index, 1);
                    }
                  })
                }
              }
              console.log(productData, this.selectedRowItemList);
           }
          });
        //PoCheckbySubcatid
    }
    else{
      
        if (this.savedDraftCountData > 0 && this.viewDraftAddBtnClick == false) {
            alert('Firstly click View Draft button then after click addmore button');
            productData.checked = undefined;
          }
          if (productData.checked == true) {
            if (this.selectedRowItemList.length > 0) {
              let checkFlag = 0;
              this.selectedRowItemList.forEach((element: any, index: number) => {
                if (element.ItemForecastDetailId == productData.ItemForecastDetailId) {
                  element.checked = true;
                  checkFlag = 1;
                }
              })
              if (checkFlag == 0) {
                productData.checked = true;
                this.selectedRowItemList.push(productData);
              }
      
            } else if (this.selectedRowItemList.length == 0) {
              this.selectedRowItemList.push(productData);
            }
          } else {
            if (this.selectedRowItemList.length > 0) {
              this.selectedRowItemList.forEach((element: any, index: number) => {
                if (element.ItemForecastDetailId == productData.ItemForecastDetailId) {
                  this.selectedRowItemList.splice(index, 1);
                }
              })
            }
          }
    }
      
  }

  finalChkArr: any[] = [];
  finalSelectedArr: any = [];
  onFinalRowSelect(ItemDetails: any | null) {

    this.selectedRowItemList.forEach((elementMain: any) => {
      this.details.forEach((elementSub: any) => {
        if (elementMain.ItemForecastDetailId == elementSub.ItemForecastDetailId) {
          elementSub.checked = elementMain.checked;
        }
      });
    })
  }

  prList: any;
  prSupplierList: any;
  prMOQList: any[] = [];
  tempselectedRowItemList : any;
  showBulkPr() {
    debugger
    this.createbulk = true;
    if (this.selectedRowItemList.length > 0) {
      this.bulkPrView = true;
    }
    this.tempselectedRowItemList = this.selectedRowItemList;
    this.selectedRowItemList.forEach(element => {
      if (!element.moqSupplierList || element.moqSupplierList == undefined || element.moqSupplierList.length == 0) {
        element.moqSupplierList = [];
        this.blocked = true;
        this.API_Service.GetItemMoQ(element.ItemMultiMrpId, element.WarehouseId).subscribe(
          (res) => {
            console.log(res);
            this.prSupplierList = res.SupplierLst;
            //this.prSelectedSupplier = this.prSupplierList;
            if (res.MOQLst.length > 0) {
              res.MOQLst.forEach(el => {
                let obj = {
                  Quantity: 0,
                  Id: 0,
                }
                obj.Quantity = el;
                obj.Id = element.Id
                this.prMOQList.push(obj)
              });

              element.moqSupplierList = this.prMOQList.filter(x => x.Id == element.Id);
              element.MinOrderQty = element.moqSupplierList[0];
              let DemandInCaseVal = Math.ceil((element.NetStock / (element.MinOrderQty.Quantity || element.MinOrderQty)));
              element.DemandInCase = DemandInCaseVal > 0 ? 0 : DemandInCaseVal;
              element.poPurchasePrice = res.POPurchasePrice;
              element.OtherWarehouseCount = 0;
              element.OtherWarehouseDetails.forEach(ele => {
                ele.otherWhReqQty == null ? 0 : ele.otherWhReqQty;
                element.OtherWarehouseCount += ele.otherWhReqQty;
              });
              if (element.OtherWarehouseCount < 0) {
                element.OtherWarehouseCount = 0;
              } else {
                element.OtherWarehouseCount = Math.ceil((element.OtherWarehouseCount / (element.MinOrderQty.Quantity || element.MinOrderQty)));
              }
              if (element.RequiredQty < 0) {
                element.RequiredQty = 0;
              } else {
                element.RequiredQtyFinal = Math.ceil((element.RequiredQty / (element.MinOrderQty.Quantity || element.MinOrderQty)));
              }

              this.blocked = false;
            } else {
              this.prMOQList = [
                {
                  Quantity: 0
                }
              ]
              this.blocked = false;
            }
          },
          (err) => {
            alert(err.error.ErrorMessage)
            this.blocked = false;
          },
        );
      }
    });
  }


  prSelectedPicker: any;
  prSelectedDate: any;
  prSelectedSupplier: any;
  prSelectedDepo: any;
  prSelectedPRPaymentType: any;
  btnDisableForBulkPr: boolean = false;
  saveBtnDisable: boolean = false;
  finalArrDetails: any;
  selectedBuyer: any;
  saveAsDraftFirst: boolean = false;
  moqSelectReq: boolean = false;
  nosSelectReq: boolean = false;
  poSelectReq: boolean = false;


  saveBulkObj: ItemForecastPRRequestForSaveobj[];
  saveBulkPr() {
    debugger
    this.saveBulkObj = [];
    this.moqSelectReq = false;
    this.nosSelectReq = false;
    this.poSelectReq = false;
    this.saveBtnDisable = false;
    //console.log(this.selectedRowItemList);
    if (this.prSelectedPicker == undefined) {
      alert('Please Select Picker')
      return false;
    }

    if (this.prSelectedDate == null) {
      alert('Please Select ETA Date')
      return false;
    }

    if (this.prSelectedSupplier == undefined) {
      //if (this.prSelectedSupplier.SupplierId == null) {
      alert('Please Select Supplier')
      return false;
      //}
    }

    if (this.prSelectedDepo == undefined) {
      alert('Please Select Depo')
      return false;
    }

    if (this.prSelectedPRPaymentType == undefined) {
      alert('Please Select PR')
      return false;
    }

    if (this.selectedBuyer == undefined) {
      alert('Please Select Buyer')
      return false;
    }

    let PickerType = this.prSelectedPicker == undefined ? '' : this.prSelectedPicker.pickerValue;
    let ETADate = this.prSelectedDate == undefined ? '' : moment(this.prSelectedDate).format('MM/DD/YYYY');
    let SupplierId = this.prSelectedSupplier == null ? '' : this.prSelectedSupplier.SupplierId;
    let DepoId = this.prSelectedDepo ? this.prSelectedDepo.DepoId : 0;
    let PRPaymentType = this.prSelectedPRPaymentType == null ? '' : this.prSelectedPRPaymentType.value;
    let BuyerId = this.selectedBuyer == null ? '' : this.selectedBuyer.PeopleID;
    let BuFreightCharge = 0;
    var bussinessCheck = this.isSuplier == true ? 'Direct from company' : null;
    console.log("this.selectedRowItemList", this.selectedRowItemList);
    this.selectedRowItemList.forEach((element: any) => {
      var pochk = parseFloat(element.poPurchasePrice)
      var noschk = parseInt(element.NoOfSet)
      if (Number.isNaN(pochk) || pochk == 0) {
        this.poSelectReq = true;
        return false;
      } else if ((element.MinOrderQty) == null || (element.MinOrderQty) == undefined) {
        this.moqSelectReq = true;
        return false;
      } else if (Number.isNaN(noschk) || noschk == 0) {
        this.nosSelectReq = true;
        return false;
      } else if ((element.NoOfSet) > (element.RequiredQtyFinal + element.OtherWarehouseCount) && !this.saveBtnDisable) {
        alert('No of set in cases should be less or equal than(allowed qty + other hub) in cases');
        this.saveBtnDisable = true;
        return false;
      } else if (!this.saveBtnDisable && !this.poSelectReq && !this.moqSelectReq && !this.nosSelectReq) {
        //console.log(this.selectedRowItemList)
      

        this.saveBulkObj.push({
          "ItemForecastDetailId": element.ItemForecastDetailId.Id ? element.ItemForecastDetailId.Id : element.ItemForecastDetailId,
          "FulfillThrow": 1,
          "BuyingPrice": parseFloat(element.poPurchasePrice) || element.BuyingPrice,
          "MinOrderQty": (element.MinOrderQty.Quantity || element.MinOrderQty),
          "NoOfSet": parseInt(element.NoOfSet),
          "InternalTransferWHId": null,
          "SalesIntentQty": element.SalesIntent || element.SalesIntentQty,
          "Demand": null,
          "PickerType": PickerType,
          "ETADate": ETADate,
          "DepoId": DepoId,
          "SupplierId": SupplierId,
          "PRPaymentType": PRPaymentType,
          "PeopleID": BuyerId,
          "FreightCharge": BuFreightCharge,
          "Id": element.saveDraftUniqueId,
          "OPenQty": element.OPenQty,
          "RequiredQty": element.RequiredQty,
          "YesterdayDemand": element.YesterdayDemand,
          "Warehouseid": element.WarehouseId,
          "AllowedQty": element.RequiredQtyFinal,
          "AllowedQtyOtherHub": element.OtherWarehouseCount,
          "Demandcases": element.DemandInCase,
          "Itemname": element.ItemName,
          "bussinessType": bussinessCheck,
          "SubCategoryId":element.SubCatID || element.SubCategoryId,
          "SubsubCategoryId":element.SubSubCatID || element.SubsubCategoryid,
          "MultiMrpId":element.ItemMultiMrpId || element.ItemMultiMRPId
        })
      }
    });


    if (!this.saveBtnDisable && !this.poSelectReq && !this.moqSelectReq && !this.nosSelectReq) {

      if (this.saveBulkObj != undefined) {
        var obj = {
          'ItemForecastPRRequestForBulkobj': this.saveBulkObj
        }
        // console.log(obj);
        // return false;
        this.blocked = true;
        this.API_Service.saveBulkPr(obj).subscribe(
          (res) => {
            console.log(res)
            if (res.Status == true) {
              this.selectedRowItemList = null;
              alert(res.msg);
              this.blocked = false;
            }

            if (res.Status == false) {
              alert(res.msg);
              this.blocked = false;
              return false;
            }

            this.ClearData();
            // localStorage.setItem('viewbtnClick', '0');
            // localStorage.setItem('addbtnClick', '0');
            // localStorage.setItem('supplierIdInSaveDraftCase', '');
            // localStorage.setItem('depoIdInSaveDraftCase', '');
            this.viewDraftDataAsClone = [];
            this.bulkPrView = false;

            this.selectedItem = false;
            this.searchKeyword = undefined;
            this.loadData(event)
            this.selectedRowItemList = [];
            this.finalArr = [];
            this.prArr = [];
            this.finalChkArr = [];
            this.finalSelectedArr = [];
            this.prList = [];
          },
          (err) => {
            alert(err.error.ErrorMessage)
            this.blocked = false;
          }
        )

      }
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    }

    if (event.which == 45 || event.which == 189) {
      event.preventDefault();
    }
  }

  decimalFilterNos(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    }

    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  nosChkCase: boolean = false;
  getItemValue(rowSelection?) {
    // console.log(rowSelection)
    // console.log(this.prList);
    if (rowSelection) {
      if (rowSelection.MinOrderQty != null) {
        rowSelection.FinalQty = (rowSelection.MinOrderQty.Quantity || rowSelection.MinOrderQty) * rowSelection.NoOfSet;
      }
    }
    if ((rowSelection.FinalQty) > (rowSelection.RequiredQty + rowSelection.OtherWarehouseCount)) {
    } else {
      this.saveBtnDisable = false;
    }

    if (rowSelection.MinOrderQty != null) {
      if ((rowSelection.NoOfSet == 0) || (rowSelection.MinOrderQty.Quantity == 0) || (Number.isNaN(parseInt(rowSelection.FinalQty)) == true)) {
        this.nosChkCase = true;
      } else {
        this.nosChkCase = false;
      }
    } else {
      this.nosChkCase = true;
    }

    this.saveAsDraftChkForCondition(rowSelection);
  }

  selectedMoqForPo: any;
  ClearData() {
    this.createbulk = false;
    this.ExpiryDate=undefined;
    this.prSelectedPicker = undefined;
    this.prSelectedDate = undefined;
    this.prSelectedSupplier = undefined;
    this.prSelectedDepo = undefined;
    this.prSelectedPRPaymentType = undefined;
    this.selectedBuyer = undefined;
    this.prMOQList = [];
    this.selectedMoqForPo = undefined;
    this.selectedRowItemList = [];
    this.selectedItem = false;
    this.viewDraftAddBtnClick = false;
    //this.viewDraftDataAsClone = [];
    this.finalArr.forEach(element => {
      element.NoOfSet = undefined;
    });

    this.finalChkArr.forEach(element => {
      element.NoOfSet = undefined;
    });

    this.selectedRowItemList.forEach(element => {
      element.NoOfSet = undefined;
      element.poPurchasePrice = undefined;
      element.checked = undefined;
    });

    this.details.forEach(element => {
      element.checked = undefined;
    })
    this.bulkPrView = false;
    // this.viewDraftAddBtnClick == false
    //this.saveDraftBtnEnable = true;
    // this.selectedItem = false;
    this.saveBtnDisable = false;
    this.isSuplier = undefined;
    this.saveDraftBtnEnable = false;
  }




  buyerList: any;
  getBuyerList() {
    this.API_Service.buyerListForPo().subscribe(
      (res) => {
        console.log(res);
        this.buyerList = res;
      },
      (err) => {
        alert(err.error.ErrorMessage);
      }
    )
  }

  exportBtn: boolean = true;
  exportLoaderBtn: boolean = false;
  exportDownload() {

    let warehouseIDs: any[] = [];
    let categoriesIDs: any[] = [];
    let subCategoriesIDs: any[] = [];
    let subSubCategoriesIDs: any[] = [];
    let catSelection: number = 0;

    if ((this.selectedwarehouse == undefined) || (this.selectedCatregory == undefined) || (this.selectedSubCat == undefined) || (this.selectedSubsubCatregory == undefined)) {
      alert('Please Fill All Required Details');
      return false;
    }

    if (this.selectedwarehouse != undefined) {
      warehouseIDs.push(this.selectedwarehouse.WarehouseId)
    }

    if (this.selectedCatregory.length > 0) {
      catSelection = 1;
      this.selectedCatregory.forEach(element => {
        categoriesIDs.push(element.CategoryId)
      });

      if (this.selectedSubCat.length > 0) {
        catSelection = 2;
        this.selectedSubCat.forEach(element => {
          subCategoriesIDs.push(element.SubCategoryId)
        });

        if (this.selectedSubsubCatregory.length > 0) {
          this.selectedSubsubCatregory.forEach(element => {
            subSubCategoriesIDs.push(element.BrandId)
            catSelection = 3;
          });
        }
      }
    }

    this.payloadObjForAutoPO = {
      cityIds: [],
      warehouseIds: warehouseIDs,
      categoriesIds: categoriesIDs,
      subCategoriesIds: subCategoriesIDs,
      subSubCategoriesIds: subSubCategoriesIDs,
      NetStock: this.selectedCmt == undefined ? '' : this.selectedCmt.value,
      skip: 1,
      take: this.totalRecords,
      SearchItem: this.searchKeyword == undefined ? '' : this.searchKeyword
    }

    console.log(this.payloadObjForAutoPO);
    this.exportBtn = false;
    this.exportLoaderBtn = true;
    this.API_Service.exportItemForeCastForPO(this.payloadObjForAutoPO).subscribe(
      (res) => {
        console.log(res);
        if (res.ItemForeCastPOResponses.length > 0) {
          var itemDetails = res.ItemForeCastPOResponses;
          this.exportService.exportAsExcelFile(itemDetails, 'ItemFulfillmentRecord');
          this.exportBtn = true;
          this.exportLoaderBtn = false;
        }
      },
      (err) => {
      }
    );
  }

  getDeleteRejectId: number;
  deletedSelectedArr: any[] = [];
  rejectItem(item: any) {

    if (item.saveDraftUniqueId == 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this id ?',
        accept: () => {
          const objWithIdIndex = this.selectedRowItemList.findIndex((obj: any) => (obj.ItemForecastDetailId.Id || obj.ItemForecastDetailId) === (item.ItemForecastDetailId.Id || item.ItemForecastDetailId));
          if (objWithIdIndex > -1) {
            alert('Delete Record');
            this.selectedRowItemList.splice(objWithIdIndex, 1);
            this.finalChkArr.splice(objWithIdIndex, 1);
            this.selectedRowItemList.forEach(a => {
              if (a.ItemForecastDetailId == (item.ItemForecastDetailId.Id || item.ItemForecastDetailId)) {
                item.checked = false;
                item.deleted = true;
              }
            });
            this.details.forEach(a => {
              if (a.Id == (item.ItemForecastDetailId.Id || item.ItemForecastDetailId)) {
                item.checked = false;
              }
            });
            this.saveDraftBtnEnable = true;
            console.log(this.selectedRowItemList);
            console.log(this.details);
          }
        },
        reject: () => {
        }
      });
    } else {
      this.getDeleteRejectId = item.saveDraftUniqueId;
      console.log(this.getDeleteRejectId);
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this id ?',
        accept: () => {
          this.blocked = true;
          this.API_Service.deletePoId(item.saveDraftUniqueId).subscribe(
            (res) => {
              alert(res);
              const dbIdIndex = this.selectedRowItemList.findIndex((obj) => (obj.saveDraftUniqueId) === item.saveDraftUniqueId);
              if (dbIdIndex > -1) {
                this.selectedRowItemList.splice(dbIdIndex, 1);
              }
              this.selectedRowItemList.forEach(el => {
                if (el.ItemForecastDetailId == (item.ItemForecastDetailId.Id || item.ItemForecastDetailId)) {
                  item.checked = false;
                  item.deleted = true;
                }
              });
              this.details.forEach(a => {
                if (a.Id == (item.ItemForecastDetailId.Id || item.ItemForecastDetailId)) {
                  item.checked = false;
                }
              });
              this.saveDraftBtnEnable = true;
              console.log(this.selectedRowItemList);
              this.blocked = false;
            },
            (err) => {
              alert(err.error.ErrorMessage)
              this.blocked = false;
            }
          )
        },
        reject: () => {
        }
      });
    }
  }

  draftBtn: boolean = true;
  addMoreItemBtn: boolean = false;
  finalObj: any;
  saveDraftBtn: boolean = false;
  saveDraftTableRes: any;

  finalDraft: ItemForecastPRRequestForBulkobj[];

  saveAsDraft() {
    this.finalDraft = [];
    this.moqSelectReq = false;
    this.nosSelectReq = false;
    this.poSelectReq = false;
    this.saveBtnDisable = false;
    if (this.prSelectedPicker == undefined) {
      alert('Please Select Picker')
      return false;
    }

    if (this.prSelectedDate == null) {
      alert('Please Select ETA Date')
      return false;
    }

    if (this.prSelectedSupplier == undefined) {
      //if (this.prSelectedSupplier.SupplierId == null) {
      alert('Please Select Supplier')
      return false;
      //}
    }

    if (this.prSelectedDepo == undefined) {
      alert('Please Select Depo')
      return false;
    }

    if (this.prSelectedPRPaymentType == undefined) {
      alert('Please Select PR')
      return false;
    }

    if (this.selectedBuyer == undefined) {
      alert('Please Select Buyer')
      return false;
    }
    let PickerType = this.prSelectedPicker == undefined ? '' : this.prSelectedPicker.pickerValue;
    let ETADate = this.prSelectedDate == undefined ? '' : moment(this.prSelectedDate).format('MM/DD/YYYY');
    let SupplierId = this.prSelectedSupplier == null ? '' : this.prSelectedSupplier.SupplierId;
    let DepoId = this.prSelectedDepo ? this.prSelectedDepo.DepoId : 0;
    let PRPaymentType = this.prSelectedPRPaymentType == null ? '' : this.prSelectedPRPaymentType.value;
    let BuyerId = this.selectedBuyer == null ? '' : this.selectedBuyer.PeopleID;
    let BuFreightCharge = 0;
    var bussinessCheck = this.isSuplier == true ? 'Direct from company' : null;
    localStorage.setItem('supplierIdInSaveDraftCase', (this.prSelectedSupplier.SupplierId));
    console.log(this.selectedRowItemList);
    this.selectedRowItemList.forEach((element: any) => {
      if (element.checked == true) {
        var pochk = parseFloat(element.poPurchasePrice)
        var noschk = parseInt(element.NoOfSet)
        if (Number.isNaN(pochk) || pochk == 0) {
          this.poSelectReq = true;
          return false;
        } else if ((element.MinOrderQty) == null || (element.MinOrderQty) == undefined) {
          this.moqSelectReq = true;
          return false;
        } else if (Number.isNaN(noschk) || noschk == 0) {
          this.nosSelectReq = true;
          return false;
        } else if ((element.NoOfSet) > (element.RequiredQtyFinal + element.OtherWarehouseCount) && !this.saveBtnDisable) {
          alert('No of set in cases should be less or equal than(allowed qty + other hub) in cases');
          this.saveBtnDisable = true;
          return false;
        } else if (!this.saveBtnDisable && !this.poSelectReq && !this.moqSelectReq && !this.nosSelectReq) {
          //this.selectedRowItemList.forEach((a)=> {
          //if(a.checked == true){
          this.finalDraft.push({
            "ItemForecastDetailId": (element.ItemForecastDetailId.Id ? element.ItemForecastDetailId.Id : element.ItemForecastDetailId),
            "FulfillThrow": 1,
            "BuyingPrice": parseFloat(element.poPurchasePrice) || element.BuyingPrice,
            "MinOrderQty": (element.MinOrderQty.Quantity || element.MinOrderQty),
            "NoOfSet": parseInt(element.NoOfSet),
            "InternalTransferWHId": null,
            "SalesIntentQty": element.SalesIntentQty || element.SalesIntent,
            "Demand": null,
            "Demandcases": element.DemandInCase,
            "AllowedQty": element.RequiredQtyFinal,
            "AllowedQtyOtherHub": element.OtherWarehouseCount,
            "FinalQty": element.FinalQty,
            "PickerType": PickerType,
            "ETADate": ETADate,
            "DepoId": DepoId,
            "SupplierId": SupplierId,
            "PRPaymentType": PRPaymentType,
            "PeopleID": BuyerId,
            "FreightCharge": BuFreightCharge,
            "WarehouseId": element.WarehouseId,
            "Categoryid": element.CatID || element.Categoryid,
            "SubCategoryId": element.SubCatID || element.SubCategoryId,
            "SubsubCategoryid": element.SubSubCatID || element.SubsubCategoryid,
            "ItemName": element.ItemName,
            "APP": element.AveragePurchasePrice || element.AveragePurchasePrice,
            "ItemMultiMRPId": element.ItemMultiMRPId || element.ItemMultiMrpId,
            "Id": element.saveDraftUniqueId,
            "bussinessType": bussinessCheck,
            "OPenQty": element.OPenQty,
            "RequiredQty": element.RequiredQty,
            "YesterdayDemand": element.YesterdayDemand
          })
          //}
          //})
        }
      }
    });
    //}

    if (!this.saveDraftBtn && !this.poSelectReq && !this.moqSelectReq && !this.nosSelectReq) {
      var draftObj = {
        'ItemForecastPRRequestForBulkobj': this.finalDraft
      }
      // console.log(draftObj);
      // return false;
      this.blocked = true;
      this.API_Service.savedDraftAsPo(draftObj).subscribe(
        (res) => {
          console.log(res);
          if (res.Status == true) {
            alert(res.msg);
            //this.selectedRowItemList;
            //console.log(this.selectedRowItemList);
            this.bulkPrView = false;
            //this.draftBtn = false;
            //this.addMoreItemBtn = true;
            this.blocked = false;
            this.selectedRowItemList = [];
            this.viewDraftAddBtnClick = false;
            //this.deletedSelectedArr = [];
            // this.viewDraftDataAsClone = [];
            // this.selectedItem = false;
            this.searchKeyword = undefined;
            this.first = 0;
            this.loadData(event);
            // this.viewDraftAddBtnClick = false;
            // localStorage.setItem('viewbtnClick', '0');
            // localStorage.setItem('addbtnClick', '0');
            // localStorage.setItem('supplierIdInSaveDraftCase', '');
            // localStorage.setItem('depoIdInSaveDraftCase', '');

          }

          if (res.Status == false && res.Idlist.length == 0) {
            alert(res.msg);
            //this.draftBtn = true;
            //this.addMoreItemBtn = false;
            // this.viewDraftDataAsClone = [];
            this.blocked = false;
            return false;
          }


          if (res.Status == false && res.Idlist.length > 0) {
            //alert(res.msg);
            var resMsg = res.msg;
            let IdArr: any[] = []
            res.Idlist.forEach(element => {
              IdArr.push(element)
            });

            var obj = {
              'Ids': IdArr
            }
            console.log(obj)
            this.confirmationService.confirm({
              message: resMsg + '<br>' + 'Are you sure that you want to delete this id`s ?',
              accept: () => {
                this.blocked = true;
                this.API_Service.deleteMultipleItemDraft(obj).subscribe(
                  (res) => {
                    console.log(res);
                    alert(res)
                    this.saveAsDraft();
                    this.blocked = false;
                  },
                  (err) => {
                    console.log(err);
                    this.blocked = false;
                  }
                )
              },
              reject: () => {
                this.blocked = false;
              }
            });
          }

        },
        (err) => {
          alert(err.error.ErrorMessage);
          this.blocked = false;
        }
      );
    }
  }

  addMoreItem() {
    localStorage.setItem('addbtnClick', '1');
    console.log(this.viewDraftDataAsClone);
    console.log(this.selectedRowItemList);
    this.viewDraftAddBtnClick = true;
    this.bulkPrView = false;

  }

  viewDraftDataAsClone: any;
  viewdraftsupplierid:any;
  viewdraftsupplier:any
  viewDraft() {
    this.viewDraftDataAsClone = [];
    localStorage.setItem('viewbtnClick', '1')
    this.saveDraftBtnEnable = false;
    //this.viewDraftDataAsClone = [];
    this.selectedRowItemList = [];
    let warehouseIDs: any[] = [];
    let categoriesIDs: any[] = [];
    let subCategoriesIDs: any[] = [];
    let subSubCategoriesIDs: any[] = [];
    this.isSuplier = undefined;

    if (this.selectedwarehouse != undefined) {
      warehouseIDs.push(this.selectedwarehouse.WarehouseId)
    }

    if (this.selectedCatregory.length > 0) {
      this.selectedCatregory.forEach(element => {
        categoriesIDs.push(element.CategoryId)
      });
    }
    if (this.selectedSubCat.length > 0) {
      this.selectedSubCat.forEach(element => {
        subCategoriesIDs.push(element.SubCategoryId)
      });
    }

    if (this.selectedSubsubCatregory.length > 0) {
      this.selectedSubsubCatregory.forEach(element => {
        subSubCategoriesIDs.push(element.BrandId)
      });
    }

    const obj = {
      'warehouseIds': warehouseIDs,
      'categoriesIds': categoriesIDs,
      'subCategoriesIds': subCategoriesIDs,
      'subSubCategoriesIds': subSubCategoriesIDs,
    }
    this.bulkPrView = true;
    this.blocked = true;
    this.API_Service.viewDraftAsPo(obj).subscribe(
      (res) => {
        //console.log(res);
        //this.first = 1;
        console.log(res);
        this.selectedRowItemList = res;
        this.viewdraftsupplierid=res[0].SupplierId;

        this.selectedRowItemList.forEach(x => {
          if (x.bussinessType == 'Direct from company') this.isSuplier = true
          else this.isSuplier = false
        })

        if (this.selectedRowItemList.length > 0) {
          this.prSelectedPicker = this.pickerType.filter(x => x.pickerValue == res[0].PickerType)[0];
          this.prSelectedPRPaymentType = this.PRType.filter(x => x.value == res[0].PRPaymentType)[0];
          this.selectedBuyer = this.buyerList.filter(x => x.PeopleID == res[0].BuyerId)[0];
          this.prSelectedDate = moment(res[0].ETADate).format('MM/DD/YYYY');
        } else {
          this.prSelectedPicker = undefined;
          this.prSelectedPRPaymentType = undefined;
          this.selectedBuyer = undefined;
          this.prSelectedDate = undefined;
        }




        this.selectedRowItemList.forEach(element => {
          element.moqSupplierList = [];
          this.blocked = true;
          this.API_Service.GetItemMoQ(element.ItemMultiMRPId, element.WarehouseId).subscribe(
            (res) => {
              //console.log(res);
              // res.forEach(x=>{                 
              //   if (x.bussinessType == 'Direct from company') this.isSuplier = true
              //   else this.isSuplier = false;
              // })
              this.viewdraftsupplier=res.SupplierLst.filter(x=>x.SupplierId==this.viewdraftsupplierid)[0].Expirydays;
              var date = new Date(), y = date.getFullYear(), m = date.getMonth();
              this.ExpiryDate= moment(new Date(y, m,date.getDate() + this.viewdraftsupplier)).format('DD/MM/YYYY')
              this.prSupplierList = res.SupplierLst;
              this.prSelectedSupplier = this.prSupplierList; //aaa
              if (res.MOQLst.length > 0) {
                res.MOQLst.forEach((el: any) => {
                  let obj = {
                    Quantity: 0,
                    Id: 0,
                  }
                  obj.Quantity = el;
                  obj.Id = element.ItemForecastDetailId
                  this.prMOQList.push(obj)
                });

                element.saveDraftUniqueId = element.Id,
                  element.ItemName = element.ItemName,
                  element.AveragePurchasePrice = element.APP,
                  element.poPurchasePrice = (element.BuyingPrice).toFixed(2),
                  element.MinOrderQty = element.MinOrderQty,
                  element.NoOfSet = element.NoOfSet,
                  element.DemandInCase = element.Demandcases,
                  element.RequiredQtyFinal = element.AllowedQty,
                  element.OtherWarehouseCount = element.AllowedQtyOtherHub,
                  element.FinalQty = element.FinalQty,
                  element.prSelectedDepo = element.DepoId,
                  element.moqSupplierList = this.prMOQList.filter(x => x.Id == element.ItemForecastDetailId);
                element.MinOrderQty = element.moqSupplierList[0];
                this.prSelectedSupplier = this.prSupplierList.filter(x => x.SupplierId == element.SupplierId)[0];
                if (this.prSelectedSupplier.bussinessType == 'Direct from company') {
                  this.showcheckBoXSupplier = true
                } else {
                  this.showcheckBoXSupplier = false
                }


                localStorage.setItem('supplierIdInSaveDraftCase', (this.prSelectedSupplier.SupplierId));
                this.API_Service.getDepoForPr(this.prSelectedSupplier.SupplierId).subscribe(res => {
                  this.depoList = res;
                  this.prSelectedDepo = this.depoList.filter(x => x.DepoId == element.DepoId)[0];
                  localStorage.setItem('depoIdInSaveDraftCase', (this.prSelectedDepo.DepoId));
                  //console.log( this.prSelectedDepo);
                  if (this.prSelectedDepo == 'NULL') {
                    this.depoNameBoolean = true;
                  } else {
                    this.depoNameBoolean = false;
                  }
                })
                this.blocked = false;
              } else {
                this.prMOQList = [
                  {
                    Quantity: 0
                  }
                ]
                this.blocked = false;
              }
            },
            (err) => {
              alert(err.error.ErrorMessage)
              this.blocked = false;
            },
          );
        });


        console.log(this.selectedRowItemList);

        res.forEach(el => {
          el.checked = true;
        });


        console.log(this.selectedRowItemList);
        console.log(this.viewDraftDataAsClone);
        if (this.details.length > 0) {
          this.selectedRowItemList.forEach(el => {
            this.details.forEach(dl => {
              if (el.ItemForecastDetailId == dl.Id) {
                dl.checked = true;
              }
            })
          })
        }

        this.blocked = false;
      },
      (err) => {
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
    );

  }

  cancelSelectedItemPopUp() {
    //this.selectedItem = false;
    //this.viewDraftDataAsClone = [];
    this.selectedRowItemList.forEach(element => {
      element.checked = undefined;
    });
    this.viewDraftAddBtnClick = false;
    this.selectedRowItemList = [];
  }

  ClearRecordForSinglePr() {
    this.selectedPicker = undefined;
    this.ExpiryDate=undefined;
    this.selectedDate = undefined;
    this.selectedSupplier = undefined;
    this.isSuplier = undefined;
    this.selectedDepo = undefined;
    this.selectedPRPaymentType = undefined;
    this.selectedBuyer = undefined;
    this.singleRowDetails.forEach(element => {
      element.NoOfSet = undefined;
    });
    this.processDialogVar = false;
  }

  ClearRecordForSingleInternalTransfer() {
    this.selectedOtherWarehouse = undefined;
    this.selectedMOQ = undefined;
    this.selectedNoOfSets = undefined;
    this.processDialogVar = false;
    this.ExpiryDate=undefined;
  }

  itemChkOnId(itemDetails: any) {
    if (itemDetails.saveDraftUniqueId != 0) {
      alert('you can not unchecked, if you want then firstly delete it from view draft');
      return false;
    }
  }

  saveDraftBtnEnable: boolean = false;
  saveAsDraftChkForCondition(item) {
    this.savedDraftCountData;
    var itemStatus = false;
    if (item) {
      itemStatus = true;
    }
    if ((this.savedDraftCountData == 0 && itemStatus == true) || this.prSelectedPicker || this.prSelectedDate || this.prSelectedSupplier || this.isSuplier || this.prSelectedDepo || this.prSelectedPRPaymentType || this.selectedBuyer) {
      this.saveDraftBtnEnable = true;
    }

    if ((this.savedDraftCountData == 0 && itemStatus == true) || this.prSelectedPicker || this.prSelectedDate || this.prSelectedSupplier || this.isSuplier || this.prSelectedDepo || this.prSelectedPRPaymentType || this.selectedBuyer) {
      this.saveDraftBtnEnable = false;
    }

    if ((this.savedDraftCountData == 0 && itemStatus == true) || this.prSelectedPicker || this.prSelectedDate || this.prSelectedSupplier || this.isSuplier || this.prSelectedDepo || this.prSelectedPRPaymentType || this.selectedBuyer) {
      this.saveDraftBtnEnable = true;
    }
  }

  multipleDeletedNonZeroId: any[] = [];
  deleteAllDraft(itemsDetails) {
    this.multipleDeletedNonZeroId = itemsDetails.filter(x => x.saveDraftUniqueId != 0).map(x => x.saveDraftUniqueId);
    var obj = {
      'Ids': this.multipleDeletedNonZeroId
    }
    this.blocked = true;
    this.API_Service.deleteMultipleItemDraft(obj).subscribe(
      (res) => {
        console.log(res);
        this.bulkPrView = false;
        this.blocked = false;
        this.selectedRowItemList = [];
        this.searchKeyword = undefined;
        this.first = 0;
        this.loadData(event);
      },
      (err) => {
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
    )
  }
}
