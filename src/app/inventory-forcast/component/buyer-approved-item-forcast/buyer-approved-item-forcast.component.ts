import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';


@Component({
  selector: 'app-buyer-approved-item-forcast',
  templateUrl: './buyer-approved-item-forcast.component.html',
  styleUrls: ['./buyer-approved-item-forcast.component.scss']
})
export class BuyerApprovedItemForcastComponent implements OnInit {
  categoryListData: any;
  cityListData: any;
  selectedCity: any;
  selectedHub: any;
  subCatList = [];
  brandList: any[];
  subcat: any[];
  subSubcat: any[];
  selectedBrandId: any[];
  cityHub: any[] = [];
  selectedWarehouseId: any[];
  hubList = [];
  selectedSubsubCatregory: any[] = [];
  selectedCatregory: any[] = [];
  selectedSubCat: any[] = [];
  ItemPerPage: any;
  PageNo: any;
  buyerItemForcastDetails: any;
  itemForcastHistory: any;
  ItemMultiMrpId: any;
  WarehouseId: any;
  itemPeopleId: any;
  itemId: any;
  itemPercentValue: any;
  itemBuyerEditForecast: any;
  TotalRecord: any;
  itemInvetoryDay: any;
  blocked: boolean;
  fulfillmentList: any;
  PRType: any;
  selectedfulfillmentType: any = 0;
  selectedPrType: any;
  selectedSupplierId: any;
  selectedList = [];
  selectedRow: any[] = [];
  markedVal: any;
  newArray: any;
  indexId = [];
  addbtnEnable: boolean;
  getRoleData:any;
  sourceExecutiveRole:any;
  hqMasterRole:any;
  hqpurchaseExecutive:any;
  hqpurchaseAssociate:any;
  Type:any;
  selectedType:any;
  constructor(private _service: InventoryforcastserService,private confirmationService: ConfirmationService, private exportService: ExportServiceService) {

    this.fulfillmentList = [
      { fulfillmentName: 'Purchase Request', fufillmentValue: 1 },
      { fulfillmentName: 'Internal Transfer', fufillmentValue: 2 }
    ]

    this.PRType = [
      { label: "Advance PR", value: "Advance PR" },
      { label: "Credit PR", value: "Credit PR" }
    ],

    this.Type = [
      {poName: 'Planned', value: 'planned'},
      {poName: 'Demand', value: 'demand'},
  ];

  }

  ngOnInit() {
    this.getRoleData = (localStorage.getItem('role')).split(',');
    // var sourceExecutive = 'Buyer'; 
    var sourceExecutive = 'Region purchase lead';
    var HQMaster = 'HQ Master login';
    var purchaseExecutive = 'Hub purchase executive';
    var purchaseAssociate = 'Hub purchase associate';
    
    this.sourceExecutiveRole = this.getRoleData.find(x => x == sourceExecutive)
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster)
    this.hqpurchaseExecutive = this.getRoleData.find(x => x == purchaseExecutive)
    this.hqpurchaseAssociate = this.getRoleData.find(x => x == purchaseAssociate)


    this.cityList();
    this.categoryList();

  }

  cityList() {
    this._service.getCityList().subscribe(res => {
      this.cityListData = res.map(function (a) {
        return {
          'Cityid': a.Cityid,
          'CityName': a.CityName,
        }
      });
      console.log(this.cityListData);
    })
  }

  getHubList(cities) {
    this.cityHub = [];
    var cityId = cities.Cityid
    this.cityHub.push(cityId);
    console.log("cityhub==>", this.cityHub)
    this.blocked = true;
    this._service.getHubList(this.cityHub).subscribe(res => {
      this.hubList = res.filter(x => x.IsKPP === false)
      this.blocked = false;
      console.log("hublist==>", this.hubList)

    });
  }

  supplierList: any;
  selWareIdValue: any;
  supplierListData(selectedHub) {
    this.selectedWarehouseId = [];
    this.selWareIdValue = this.selectedHub.WarehouseId;
    this.selectedWarehouseId.push(this.selWareIdValue);
    this.blocked = true;
    // this._service.getSupplierList(this.selWareIdValue).subscribe(res => {
    //   this.supplierList = res;
    //   this.blocked = false;
    // })
    this.viewSupplierListOnView();
  }

  viewSupplierListOnView(){
    let multiMrpId = 0;
    let WarehouseId = 0;
    this._service.GetItemMoQ(multiMrpId, WarehouseId).subscribe(
      (res) => {
        console.log(res);
        this.supplierList = res.SupplierLst;
        this.blocked = false;
    });
  }

  categoryList() {
    this.subCatList = [];
    this.selectedSubCat = [];
    this.selectedSubsubCatregory = [];
    this._service.getAllCategories().subscribe(res => {
      this.categoryListData = res;
      console.log("category", this.categoryListData);

    })
  }

  getSubCatList(categories) {
    this.subCatList = [];
    this.selectedSubCat = [];
    this.brandList = [];

    if (categories && categories.length > 0) {
      this.subcat = categories.map(function (elem) {
        return elem.CategoryId ? elem.CategoryId : elem
      });


      // const payload = {
      //   categoryId: this.subcat
      // }
      this.blocked = true;
      this._service.getSubCategories(this.subcat).subscribe(result => {
        this.subCatList = result;
        this.blocked = false;
      });
    } else {
    }

  }
  getBrandsnew(subcategories) {
    this.brandList = [];
    this.selectedSubsubCatregory = [];
    const payload = {
      categoryId: this.subcat,
      subcategoryId: this.subSubcat
    }
    if (subcategories && subcategories.length > 0) {

      this.subSubcat = subcategories.map(function (elem) {
        return elem.SubCategoryId ? elem.SubCategoryId : elem
      });

      const payload = {
        categoryId: this.subcat,
        subcategoryId: this.subSubcat
      }

      this.blocked = true;
      this._service.getSubSubCatList(payload).subscribe(result => {
        this.brandList = result;
        this.blocked = false;
      });
    } else {
    }
  }

  exportbtn:boolean=false;
  getSearchResult() {
    this.selectedRow = [];
    if (!this.selectedCity) {
      alert('Please Select City');
    } else {
      if (!this.selectedHub) {
        alert('Please Select Hub')
      } else {
        // if (this.selectedCatregory.length == 0) {
        //   alert('Please Select Category')
        // } else {
          // if (this.selectedSubCat.length == 0) {
          //   alert('Please Select Sub Category')
          // } else {
            // if (this.selectedSubsubCatregory.length == 0) {
            //   alert('Please Select Sub Sub Category')
            // } else {
            //   debugger;
              // if (!this.selectedfulfillmentType) {
              //   alert('Please Select fulfillment')
              // } else {
                this.load(event);
                this.exportbtn = true;
              // }
            // }
          // }
        // }
      }
    }
  }

  seleSupplier = [];
  selPRID: any;
  load(event) {
    this.seleSupplier = [];
    var Last = event.first ? event.first + event.rows : 50
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows

    if (this.selectedPrType != undefined) {
      this.selPRID = this.selectedPrType.value
    } else {
      this.selPRID = '';
    }

    if (this.selectedSupplierId != undefined) {
      this.seleSupplier.push(this.selectedSupplierId.SupplierId);
    } else {
      this.seleSupplier = [];
    }

    // if (this.selectedSubsubCatregory.length > 0) {
    //   this.selectedBrandId = this.selectedSubsubCatregory.map(function (e) {
    //     return e.BrandId ? e.BrandId : e
    //   })
    // }

    const payload = {
      'cityIds': this.cityHub,
      'warehouseIds': this.selectedWarehouseId,
      'categoriesIds': this.subcat,
      'subCategoriesIds': this.subSubcat,
      'subSubCategoriesIds': this.selectedBrandId,
      'skip': this.PageNo || 1,
      'take': this.ItemPerPage || 50,
      'fulfillthrowId': this.selectedfulfillmentType == (0 || null) ?  0 : this.selectedfulfillmentType.fufillmentValue,
      'prType': this.selPRID,
      'supplierIds': this.seleSupplier,
      'NetStock': this.selectedType == undefined ? '' : this.selectedType.value,
      
    }

    // if (this.cityHub && this.selectedHub && this.selectedCatregory && this.selectedSubCat && this.selectedSubsubCatregory) {
      if (this.cityHub && this.selectedHub) {
      this.blocked = true;
      this._service.GetBuyerApproveItemForeCast(payload).subscribe(
        res => {
          //debugger;
          console.log(res);
          this.TotalRecord = res.TotalRecord;
          res.BuyerApproveItemForeCasts.forEach(el => {
            el.totalWeight = ((el.Weight * el.NoOfSet * el.MinOrderQty) / 1000); 
            el.totalWeightType = 'kg';
          });;
          res.BuyerApproveItemForeCasts.forEach(element => {
            element.checked = false;
          });
          this.buyerItemForcastDetails = res.BuyerApproveItemForeCasts;
          console.log(this.buyerItemForcastDetails);
          this.blocked = false;
        },
        err => {
          alert(err.error.ErrorMessage)
          this.blocked = false;
        }
      )
    }
  }

  fulfillboolean: boolean = false;
  getFulFillmentType(val) {

    this.buyerItemForcastDetails = null;

    if (val.fulfillmentName == 'Purchase Request') {
      this.fulfillboolean = true;
    } else {
      this.fulfillboolean = false;
      this.selectedPrType = null;
      this.selectedSupplierId = null;
    }
  }


  singleCreateArr = [];
  createData(itemData) {
    
    this.singleCreateArr = [];
    this.singleCreateArr.push(itemData.fulfillmentId);
     console.log(this.singleCreateArr);
   
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action ?',
      accept: () => {

        const payload = {
          'Ids': this.singleCreateArr
        }

        this.blocked = true;
        this._service.addbuyerForcast(payload).subscribe(res => {
          console.log(res);
          if (res.Status == true) {
            alert(res.Message)
            this.blocked = false;
            this.load(event);
            this.getSearchResult();
          } else {
            alert(res.Message)
          }
        })
      }
    });
  }


  onRowClick(inputid, e, item) {

    if (this.selectedfulfillmentType.fufillmentValue == 1 && item.FulfillThrow == 1) {
      if (this.selectedRow.length > 0) {
        var IsNotSamePrType= this.selectedRow.filter(x=>x.PRPaymentType!=item.PRPaymentType)
        var IsNotSameSupllier = this.selectedRow.filter(x => x.SupplierName != item.SupplierName);
        var IsNotSameBusinessType = this.selectedRow.filter(x => x.bussinessType != item.bussinessType);

        console.log(IsNotSameSupllier);
        if (IsNotSameSupllier.length > 0) { 
            setTimeout(function () {
              console.log('hide');
              item.checked = false;
              alert("you can't approved two diffrent supplier request.");
            }, 200);
            return false;
        }
        else if(IsNotSameBusinessType.length>0){
          setTimeout(function () {
            console.log('business');
            item.checked = false;
            alert("you can't approved two diffrent business type.");
          }, 200);
        }
        else if(IsNotSamePrType.length>0)
        {
          setTimeout(function () {
            console.log('hide');
            item.checked = false;
            alert("you can't approved two diffrent PR Payment Type.");
          }, 200);
          return false;
        }
        else {
          var IsAdded = this.selectedRow.find(x => x.fulfillmentId == item.fulfillmentId);
          if (item.checked && !IsAdded) {
            item.checked = true;
            this.selectedRow.push(item);

          } else {
            let index = this.selectedRow.indexOf(item);
            if (index >= 0) {
              this.selectedRow.splice(index, 1);
            }
          }
        }
      } else {
        var IsAdded = this.selectedRow.find(x => x.fulfillmentId == item.fulfillmentId);
        if (item.checked && !IsAdded) {
          this.selectedRow.push(item);

        } else {

          let index = this.selectedRow.indexOf(item);
          if (index >= 0) {
            this.selectedRow.splice(index, 1);

          }
        }
      }
    } else if (this.selectedfulfillmentType.fufillmentValue == 2 && item.FulfillThrow == 2) {
      if (this.selectedRow.length > 0) {
        var IsNotSameretwid = this.selectedRow.filter(x => x.InternalTransferWHId != item.InternalTransferWHId);
        if (IsNotSameretwid.length > 0) {
          setTimeout(function () {
            console.log('hide');
            item.checked = false;
            alert("you can't approved two diffrent warehouse request.");
          }, 200);
          return false;
        }
        else {
          var IsAdded = this.selectedRow.find(x => x.fulfillmentId == item.fulfillmentId);
          if (item.checked && !IsAdded) {
            item.checked = true;
            this.selectedRow.push(item);

          } else {
            let index = this.selectedRow.indexOf(item);
            if (index >= 0) {
              this.selectedRow.splice(index, 1);
            }
          }
        }
      } else {
        var IsAdded = this.selectedRow.find(x => x.fulfillmentId == item.fulfillmentId);
        if (item.checked && !IsAdded) {
          this.selectedRow.push(item);

        } else {

          let index = this.selectedRow.indexOf(item);
          if (index >= 0) {
            this.selectedRow.splice(index, 1);

          }
        }
      }
    }
    console.log(this.selectedRow);
    if (this.selectedRow.length > 0) {
      this.addbtnEnable = true;
    } else {
      this.addbtnEnable = false;
    }
  }


  addmultipleRecord() {
    console.log(this.selectedRow)
    if (this.selectedRow.length > 0) {
      let selectedRowId = [];
      this.selectedRow.forEach(element => {
        selectedRowId.push(element.fulfillmentId);
      });
      const payload = {
        'Ids': selectedRowId
      }
      
      this.blocked = true;
      this._service.addbuyerForcast(payload).subscribe(res => {
        console.log(res);
        if (res.Status) {
          this.selectedRow = [];
          this.addbtnEnable = false;
          alert(res.Message)
          this.load(event);
          this.getSearchResult();
          this.blocked = false;
        } else {
          //debugger;
          this.blocked = false;

          alert(res.Message)
        }
      })
    }
  }
  clearRecord() {
    this.selectedCity = null
    this.selectedHub = null
    this.selectedCatregory = null
    this.selectedSubCat = null
    this.selectedSubsubCatregory = null
    this.selectedfulfillmentType = null
    this.selectedSupplierId = null
    this.selectedPrType = null
    // this.buyerItemForcastDetails = null
    this.fulfillboolean = false;
    this.TotalRecord = 0;
    this.buyerItemForcastDetails = [];
    this.exportbtn = false;
    this.addbtnEnable = false;
  }

  editModeView:boolean=false;
  suppList:any;
  MOQList:any[]= [];
  selectedSupplier:any;
  selectedMOQ:any;
  itemRecord:any;
  IsDirectSupplier:any;
  editMode(item){
    this.showcheckBoXSupplier=false
    this.nosVal = item.NoOfSet;
    this.freCharge = item.FreightCharge;
    this.editModeView = true;
    this.selectedSupplier = undefined;
    this.selectedDepo = undefined;
    this.selectedMOQ = undefined;
    this.MOQList = [];
    this.suppList = [];
    this.depoList = [];
    this.isSuplier=undefined
    this.itemRecord = item;
    this._service.GetItemMoQ(this.itemRecord.ItemMultiMrpId, this.itemRecord.WarehouseId).subscribe(
      (res) => {
       
        console.log("moQresponse",res);
        this.suppList = res.SupplierLst;
        // console.log(this.suppList,'suppList');
        this.selectedSupplier = this.suppList.filter(x=>x.SupplierId == item.SupplierId)[0];
        debugger;
        if(item.bussinessType == 'Direct from company') this.isSuplier=true
        else this.isSuplier=false
        if(this.selectedSupplier.bussinessType== 'Direct from company') this.showcheckBoXSupplier=true
        else this.showcheckBoXSupplier=false
        
        this._service.getDepoForPr(this.selectedSupplier.SupplierId).subscribe(res => {
          this.depoList = res;
          this.selectedDepo = this.depoList.filter(x=>x.DepoId == item.DepoId)[0];
        })
        if (res.MOQLst.length > 0) {
          let moqDC = [];
          res.MOQLst.forEach(element => {
            var obj = {
              Quantity: Number
            }
            obj.Quantity = element;
            moqDC.push(obj)
          });
          this.MOQList = moqDC;
          this.selectedMOQ = this.MOQList.filter(x=>x.Quantity == item.MinOrderQty)[0];
        } 
      },
      (err) => {
      },
    );

  }
  isSuplier:any
  showcheckBoXSupplier:boolean=false
  depoList: any;
  getDepoList(selSupplier) {
    if(selSupplier.bussinessType=='Direct from company') this.showcheckBoXSupplier=true
    else this.showcheckBoXSupplier=false
    var id = selSupplier.SupplierId;
    this._service.getDepoForPr(id).subscribe(res => {
      this.depoList = res;
    })
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
        event.preventDefault();
    }

    if ( event.which == 45 || event.which == 189 ) {
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
  return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}

 
 selectedDepo:any;
 freCharge:any;
 nosVal:any;
  updateRecord(){
    if (this.selectedSupplier == undefined) {
      alert('Please Select Supplier')
      return false;
    }

    if (this.selectedDepo == undefined) {
      alert('Please Select Depo')
      return false;
    }

    if (this.freCharge == null) {
      alert('Please Select Freight Charge')
      return false;
    }

    if (this.selectedMOQ == undefined) {
        alert('Please Select MOQ')
        return false;
    }

    if (this.nosVal == undefined) {
      alert('Please Select No of Set')
      return false;
    }

    if (this.nosVal == 0) {
      alert('Please Set Different Value')
      return false;
    }

    let Id = this.itemRecord == undefined ? 0 : this.itemRecord.Id;
    let fulfillmentId = this.itemRecord == undefined ? 0 : this.itemRecord.fulfillmentId;
    let supplierId = this.selectedSupplier == undefined ? 0 : this.selectedSupplier.SupplierId;
    let depoId = this.selectedDepo == undefined ? 0 : this.selectedDepo.DepoId;
    let freCharge = this.freCharge == undefined ? 0 : this.freCharge;
    let Moq = this.selectedMOQ == undefined ? 0 : this.selectedMOQ.Quantity;
    let nosVal = this.nosVal == undefined ? 0 : this.nosVal;

    const payload = {
        "Id":Id,
        "SupplierId":supplierId,
        "MinOrderQty":Moq,
        "NoOfSet": parseInt(nosVal),
        "DepoId":depoId,
        "FreightCharge":freCharge,
        "fulfillmentId":fulfillmentId,
        "bussinessType":this.isSuplier == true ? 'Direct from company' : null
    }
    
    this._service.updatePurchaseApprovedItem(payload).subscribe(
      (res)=>{
        console.log(res);
        if(res.Status){
          alert(res.msg);
        }
        this.editModeView = false;
        this.selectedRow = [];
        this.load(event);
      },(err)=>{
        alert(err.error.ErrorMessage)
      }
    ) 
  }

  closeDialog(){
    this.editModeView= false;
    this.selectedSupplier = undefined;
    this.selectedDepo = undefined;
    this.freCharge = undefined;
    this.selectedMOQ = undefined;
    this.nosVal = undefined;
  }

  rejectItem(item){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action ?',
      accept: () => {

        this.blocked = true;
        this._service.rejectPurchaseReques(item.fulfillmentId).subscribe(
          (res)=>{
            console.log(res);
            alert(res);
            this.load(event);
            this.blocked = false;
          },(err)=>{
            alert(err.error.ErrorMessage);
            this.blocked = false;
          }
        )

      }
    });
  }

  exportDownload(){
      const payload = {
        'cityIds': this.cityHub,
        'warehouseIds': this.selectedWarehouseId,
        'skip': this.PageNo || 1,
        'take': this.ItemPerPage || 50,
        'prType': this.selPRID,
        'supplierIds': this.seleSupplier,
        'NetStock': this.selectedType == undefined ? '' : this.selectedType.value,
        'fulfillthrowId': this.selectedfulfillmentType == (0 || null) ?  0 : this.selectedfulfillmentType.fufillmentValue,
      }
      this.blocked = true;
      this._service.exportForPurchaseApprovedItemForecast(payload).subscribe(
        (res)=>{
          console.log(res);
          let result = res.BuyerApproveItemForeCasts;
          this.exportService.exportAsExcelFile(result, 'export_purchase_approved_item_forecast');
          this.blocked = false;
        },(err)=>{
          alert(err.error.ErrorMessage);
          this.blocked = false;
        }
      )
  }
}
