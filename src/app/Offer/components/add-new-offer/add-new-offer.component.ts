import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { transformMenu } from '@angular/material';
import { Router } from '@angular/router';
import { Theme } from '@fullcalendar/core';
import { OfferService } from 'app/offer/Service/offer.service';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { event, trim } from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import {MessageService} from 'primeng/api';
import { ViewChild, ElementRef } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoaderService } from 'app/shared/services/loader.service';
@Component({
	selector: 'app-add-new-offer',
	templateUrl: './add-new-offer.component.html',
	styleUrls: ['./add-new-offer.component.scss']
})
export class AddNewOfferComponent implements OnInit, DoCheck {
	@ViewChild('fileRef',null) fileUploader: ElementRef;
	checked: boolean = false;
	cityList: any;
	minimumDate = new Date();
	open1StForm: boolean = false;
	MultiWarehouse: boolean = false;
	ItemMasterValue: boolean = false;
	WalletPOintValue: boolean = false;
	scaratichdata: boolean = false;
	open2ndForm: boolean = false;
	showItemform: boolean = false;
	showBillform: boolean = false;
	showScratchform: boolean = false;
	checktrue: boolean = true;
	getWherehouseList: any;
	getAllItemList: any;
	getAllSearchItemList: any;
	getFreeitemSearchItemList: any;
	wherehouseId = [];
	lineItemValueGet = [];
	isInvalid;
	itemAllData;
	filterItemSelect;
	rangeDates;
	data: any;
	selcetData;
	storeBrand;
	subcategorys;
	brands;
	classifiledVal;
	OnlyOneWhereHouseIds;
	searchItemVal;
	itemClassificationdata;
	freeitemData;
	ifreedata;
	storeList: any;
	ItemOfferList: any;
	ItemBrandList: any;
	itemSeectVal: any;
	showStore: boolean = false;
	trueNoneValue: boolean = false;
	disablesave: boolean = false;
	showIncludeItem: boolean = false;
	itemsArray:any[]=[]
	groupData;
	CustomerskCode;
	isExists: boolean = false;
	rows: number = 10;
	SelectedGroupId:number
	selectedStoredId:any=null;
	loadingIconForExcludedItemsListSC: boolean = false;
	loadingIconForExcludedItemsListBr: boolean = false;
	isCrmOfferFlag : boolean = false;
	uploadedCustomerList:any[]=[]
	Array:any[]=[]
	IsPriorityOffer:boolean
	flag:boolean=false
	iscombinedofferseen:boolean = false

	constructor(
		public cityService: CityService,
		private customerservice: CustomerService,
		public offerService: OfferService,
		private router: Router,
		private exportserv:ExportServiceService,
		private messageService: MessageService,
		private loaderService: LoaderService
	) {
		this.data = {};
	}
	ngOnInit() {
		this.data.OfferBillDiscountRequiredItems = [];
		this.data.IsCRMOffer = false;
		this.disablesave = false;
		this.getAllCityList();
		this.data.ApplyOn = 'PreOffer'

		console.log(this.data.BillDiscountType);
		this.Allgroups()
	}
	ngDoCheck() { // do check for checkform value for show and hide next step
		// console.log(this.data.StartDate);
		// if (this.data.StartDate != undefined) {
		// 	if (this.data.StartDate.length > 1) {
		// 		this.data.EndDate = this.data.StartDate[1];
		// 		// this.data.StartDate = this.data.StartDate[0];
		// 	}
		// }

		// console.log();

		if (this.data.CityId && this.data.WareHouseId && this.data.OfferAppType) {
			this.open1StForm = true;
		}
		if (this.data.WareHouseId) {
			if (this.data.WareHouseId.length > 1) {
				this.MultiWarehouse = true;
			} else {
				this.MultiWarehouse = false;
			}
		}
		if (this.data.OfferName && this.data.IsActive && this.data.OfferOn && this.data.EndDate != null && this.data.StartDate) {
			
			this.offerOnForm(this.data.OfferOn);
		} else {
		
			this.showItemform = false;
			this.showBillform = false;
			this.showScratchform = false;
		}
	}
	onClickCRMOffer()
	{
		debugger;
		if(this.data.IsCRMOffer == true){
			this.isCrmOfferFlag = true;
			this.data.OfferAppType = 'Retailer App';
		}
		else{
			this.isCrmOfferFlag = false;
		}
	}
	ChooseFreeItem(dt, StoreId, IsStore) { // choose item type after select offer on item
		debugger;
		if (this.data.FreeofferType == 'ItemMaster') {
			this.data.offerType = dt;
			this.ItemMasterValue = true;
			this.WalletPOintValue = false;
			this.offerService.getItemSelectData(this.data.WareHouseId[0]['WareHouseId']).subscribe(result => {
			this.filterItemSelect = result;
			});
		} else if (this.data.FreeofferType == "BillDiscount" || this.data.FreeofferType == "ScratchBillDiscount") {
			if (this.data.FreeofferType == 'ScratchBillDiscount') {
				this.data.offerType = dt;
				this.ItemMasterValue = false;
				this.WalletPOintValue = true;
				this.scaratichdata = true;
			}
			this.LoadBillDiscountDetail(StoreId, IsStore);
		} else {
			this.offerService.getItemSelectData(this.data.WareHouseId[0]['WareHouseId']).subscribe(result => {
				this.filterItemSelect = result;
			});
			if (this.data.FreeofferType == 'WalletPoint') {
				this.data.offerType = dt;
				this.ItemMasterValue = false;
				this.WalletPOintValue = true;
			}
		}
	}
	LoadBillDiscountDetail(StoreId, IsStore) {
		debugger;
		this.subcategorys = [];
		this.brands = [];
		this.data.ReqBrandmodel = this.data.brands;
		this.GetItemClassification();
		if (IsStore != 'Company') {
			this.GetStoreBrandCompany();
		}
		else {
			this.GetCategorys();
		
		}
	}
	GetStoreBrandCompany() {
		debugger;
		this.offerService.getSelectStoreBrand(this.selectedStoredId).subscribe(result => {
			this.storeBrand = result;
			this.subcategorys = result.Companys;
			console.log(this.subcategorys,"Data");
			this.brands = result.Brands;
			console.log(this.brands,"StoreBrandS");
			this.data.ReqBrandmodel = result.brands;
		});
	}
	GetCategorys() {
		debugger
		this.offerService.getAllCategory().subscribe(result => {
			this.storeBrand = result;
		});
	};

	noneClassificationSelected:any
	classificationList:any
	GetItemClassification()
	{
    this.offerService.GetItemIncentiveClassificationMasters().subscribe(result=>
		{
			this.classificationList=result
		})
	}
	OnchangeAPPType()
	{
		debugger
	this.noneClassificationSelected=null
	console.log(this.noneClassificationSelected,"noneClassificationSelected");
	
	}
	classificationarray:any[]=[]
	classString:string=''
	ChangeClassificationList()
	{debugger
		
	}

	getAllCityList() { // Get All City List
		this.cityService.GetAllCity().subscribe(result => {
			this.cityList = result;
			console.log(this.cityList);
		});
	}

	getCityValue(cityId) { // change function for get warehouse by city id
		this.customerservice.getWareHouseByCity(cityId).subscribe(result => {
			this.getWherehouseList = result;
			this.data.WareHouseId = result;
			console.log(this.getWherehouseList);

		})
	}
	// ChangeWarehouse(WarehouseIds) {
	// 	console.log(WarehouseIds);

	// 	if (WarehouseIds) {
	// 		if (WarehouseIds.length > 1) {
	// 			let Warehouseid = WarehouseIds[0].WarehouseId;
	// 			this.data.WarehouseId = WarehouseIds[0].WarehouseId;
	// 			this.customerservice.getWarehouseId(Warehouseid).subscribe(result => {
	// 				let Items = result;
	// 				console.log(Items, 'Items');

	// 			})
	// 		}
	// 	}
	// }

	SearchMainItem(key) {
		console.log(this.data.WareHouseId[0]['WareHouseId'], 'this.data.WareHouseId[0]');
		console.log(this.data.WareHouseId, 'this.data');

		this.offerService.getSelectMainItem(key, this.data.WareHouseId[0]['WareHouseId'], this.data.OfferAppType).subscribe(result => {
			this.getAllItemList = result;
		});
	};

	onItemSearch(e) { // Change Function for Get All Item List by City Id or Key Search
		console.log(this.data.WareHouseId, 'this.data.WareHouseId');

		let serachValue = ''
		if (e == 'ItemValue') {
			serachValue = this.data.searchItem
		} else if (e == 'FreeItem') {
			serachValue = this.data.freeItemSearch
		} else {
			serachValue = this.data.searchItemOfferOn
		}
		this.offerService.getAllItemByCityId(serachValue, this.data.WareHouseId[0]['WareHouseId']).subscribe(result => {
			if (e == 'ItemValue') {
				this.getAllItemList = result;
				console.log(this.getAllItemList)
			} else if (e == 'FreeItem') {
				this.data.FreeItemdata=undefined;
				this.getFreeitemSearchItemList=undefined;
				this.getFreeitemSearchItemList = result;
				console.log(this.getFreeitemSearchItemList);
				
			} else {
				this.getAllSearchItemList = result;
				console.log(this.getAllSearchItemList );
				
			}

			this.offerService.getSearchItemData(result).subscribe(data => {
				data.forEach(el => {
					if (e == 'ItemValue') {
						el.ABCCategory = result.filter(re => re.ItemId == el.ItemId) && result.filter(re => re.ItemId == el.ItemId)[0] ? result.filter(re => re.ItemId == el.ItemId)[0].Category : 'D';
					} else {
						el.ABCCategory = result.filter(re => re.ItemId == el.ItemId) && result.filter(re => re.ItemId == el.ItemId)[0] ? result.filter(re => re.ItemId == el.ItemId)[0].Category : 'D';
					}
				});
			})
		})
	}
	updateOfferByValue(e) { // on change function for show or hide div or form for sratch offer type
		// checkhere
		// this.data.excludeSelectData = null;
		// this.data.isIncludeBillDiscountType = null;
		// this.data.subcategorymodel = null;
        this.selectedStoredId=null
		this.data.FreeofferType = '';
		this.noneClassificationSelected=null
		if (e == 'Store') {
			this.showStore = true;
			this.getAllStoreList();
			this.data.BillDiscountType='subcategory';
		} else {
			this.showStore = false;
			this.data.BillDiscountType='BillDiscount';
		}
	}
	offerOnForm(Offeron) { // Change Function for Offer On value show or hide according to offer on select
		switch (Offeron) {
			case 'Item': {
				this.showItemform = true;
				this.showBillform = false;
				this.showScratchform = false;
				break;
			}
			case 'BillDiscount': {
				this.showItemform = false;
				this.showBillform = true;
				this.showScratchform = false;
				// // console.log(this.data.IsStore);
				break;
			}
			case 'ScratchBillDiscount': {
				this.showItemform = false;
				this.showBillform = false;
				this.showScratchform = true;
				// // console.log(this.data.IsStore);
				break;
			}
		}

	}
	getAllStoreList() { // get all store function for Sratch Offer store type
		this.offerService.getStoreList().subscribe(data => {
			this.storeList = data;
			console.log(this.storeList,"storeList ");
			
		});
	}
	onCancel() {
		this.router.navigateByUrl("/layout/offer/offer-list");
	}
	updateItemChange(e,data) { // Change function for sratch type
		debugger;
		// console.log(data.WareHouseId[0].WareHouseId,"data.WareHouseId3");
	    // console.log(data[0].WareHouseId,"data.WareHouseId");
		// console.log(this.data.WareHouseId[0].WareHouseId,"data.WareHouseId1");
		this.itemsArray=[];
		this.loadingIconForExcludedItemsListBr = false;
		this.loadingIconForExcludedItemsListSC = false;
		this.ItemOfferList = [];
		this.itemClassificationdata = [];
		this.itemAllData = [];
		//this.storeBrand = [];
		this.searchItemVal = [];
		this.itemSeectVal = e;
        this.noneClassificationSelected=null
		//alert(this.data.BillDiscountType)

		//to clear previous unused inputs
		this.data.excludeSelectData = null;
		this.data.isIncludeBillDiscountType = null;
		this.data.subcategorymodel = null;
		// this.data.BillDiscountType = ""
		// this.data.isInclude = ''
		// console.log(this.itemSeectVal, 'this.itemSeectVal');
		switch (this.itemSeectVal) {
			case 'items': case 'itemMargin': {
				this.showIncludeItem = true;
				this.getSearchitemLIst();
				// console.log('testttt');
				break;
			}
			case 'ClearanceStock': {
				this.showIncludeItem = true;
				this.GetItemNameForClearanceStock(data)
				break;
			}
			case 'BillDiscount': case 'brand': {
				this.getSratchBrandList();
				break;
			}
			case 'subcategory': {
				this.GetItemsByType(this.data.BillDiscountType, 'SubCategory', 'subcategory');
				break;
			}
			case 'itemClassification': {
				this.getSearchitemLIst();
				break;
			} case 'BillDiscount': {
				this.itemSeectVal = 'BillDiscount';
				this.trueNoneValue = true;
				break;
			}
		}
	}
	warehouseId: number
	citylist: number

	getSearchitemLIst() { // get Item list when select sratch Item or item Margin Radio
		// this.warehouseId=this.data.WareHouseId;
		this.warehouseId = this.data.WareHouseId[0].WareHouseId;
		console.log(this.data.WareHouseId[0].WareHouseId);

		this.ItemOfferList = [];
		console.log("CityID", this.data.CityId);
		console.log("WarehouseId", this.data.WareHouseId[0].WareHouseId);
		this.warehouseId = this.data.WareHouseId[0].WareHouseId
		let category = this.data.categoryId ? this.data.categoryId : '';
		let subcat = this.data.subCategoryId ? this.data.subCategoryId : '';
		let subcatmain = this.data.subSubCategoryId ? this.data.subSubCategoryId : '';
		let margin = this.data.ItemMargin ? this.data.ItemMargin : '';
		let clssified = this.classifiledVal ? this.classifiledVal : '';


		this.loaderService.loading(true);		
		this.offerService.getItemSearchAllList(this.warehouseId,

			category, subcat, subcatmain, margin, clssified).subscribe(data => {
				// console.log(data, 'data');
				this.loaderService.loading(false);		
				this.ItemOfferList = data
				console.log(this.ItemOfferList);
			});
	}
	ItemNameClearanceStock:any[]=[]
	GetItemNameForClearanceStock(data)
	{
		 console.log(data.WareHouseId);
		
		this.offerService.getItemNameCleareanceStock(data.WareHouseId[0].WareHouseId).subscribe(res=>
			{
				this.ItemNameClearanceStock=res
				
			})
	}
	getclassifiledVal(e) {
		this.classifiledVal = e
		// console.log(this.classifiledVal, this.classifiledVal);
	}
	GetItems(warehouseId, categoryId, subCategoryId) {
		this.itemClassificationdata = [];
		this.searchItemVal = [];
		let margin = '';
		let itemClassification = '';
		let subSubCategoryId = '';
		if (this.data.BillDiscountType == "itemClassification") {
			itemClassification = this.classifiledVal ? this.classifiledVal : '';
		}
		if (this.data.BillDiscountType == "itemMargin") {
			margin = this.data.ItemMargin ? this.data.ItemMargin : '';
		}
		this.offerService.getItemSearchAllList(this.data.CityId, categoryId, subCategoryId, subSubCategoryId, margin, itemClassification).subscribe(data => {

			if (this.data.BillDiscountType == "itemClassification") {
				this.itemClassificationdata = data;
				// console.log(this.itemClassificationdata, 'this.itemClassificationdata');

			}
			else {
				this.searchItemVal = data;
			}
		});
	}
	SearchFreeItem(freeitemkey) {
		this.offerService.getSerchFreeItem(freeitemkey, this.data.WareHouseId[0]['WareHouseId']).subscribe(data => {
			this.searchItemVal = data;
			this.offerService.getSearchItemData(data).subscribe(res => {
				this.freeitemData = [];
				this.ifreedata = [];
				data.forEach(el => {
					el.ABCCategory = res.filter(re => re.ItemId == el.ItemId) && res.filter(re => re.ItemId == el.ItemId)[0] ? res.filter(re => re.ItemId == el.ItemId)[0].Category : 'D';
					this.freeitemData.push(el);
					this.ifreedata.push(el);
				});
			});
		});

	}
	RemoveItem(add, index) {

		let indexval = this.data.OfferBillDiscountRequiredItems.findIndex(x => x.ObjectId == add.ObjectId);
		// console.log(add, this.data.OfferBillDiscountRequiredItems, indexval);		
		this.data.OfferBillDiscountRequiredItems.splice(indexval, 1);
	}

	addItems() { // Add More Items
		debugger
		var itemselect = [];
		itemselect = this.data.ObjectType == "Item" ? this.data.ReqItemselect : this.data.ReqBrandselect;
		var selectedText = [];//itemselect.options[itemselect.selectedIndex].text;
		var selectedId = [];//itemselect.options[itemselect.selectedIndex].text;
		var selecteditemids = "";
		if (itemselect == undefined) {
			alert("Please select atleast one item/brand.");
			return false;
		} else if (this.data.ObjectType == "Item" && this.data.ReqItemselect.length == 0) {
			alert("Please Select an Item")
			return false;
		} else if (this.data.ObjectType != "Item" && this.data.ReqBrandselect.length == 0) {
			alert("Please Select a Brand")
			return false;
		}
		this.isExists = false;


		// if(this.data.ReqItemselect.length == 0 && this.data.ReqBrandselect.length == 0){
		// 	alert("Please Select a Product");
		// 	return false;
		// }

		// console.log(this.data.OfferBillDiscountRequiredItems.length, 'this.data.OfferBillDiscountRequiredItems.length');
        console.log(itemselect,"ItemSelect");
		
		if (this.data.OfferBillDiscountRequiredItems.length > 0) {
			debugger
			this.data.OfferBillDiscountRequiredItems.forEach(el => {
				itemselect.forEach(e => {
					var itemlst = String(el.ObjectId).indexOf(",") > -1 ? el.ObjectId.split(",") : String(el.ObjectId);
					var itemselectValue = this.data.ObjectType == "Item" ? 'Item' : 'brand';
					console.log("el.ObjectType", el.ObjectType, "itemselectValue", itemselectValue, "e.Id", e.Id, "el.ObjectId", el.ObjectId);

					let isItemLstArr = String(el.ObjectId).indexOf(",") > -1
					console.log(isItemLstArr);
					if (isItemLstArr) {
						itemlst.forEach(elemID => {
							if (el.ObjectType == itemselectValue && e.Id == elemID) {
								this.isExists = true;
								return false;
							}
						});
					} else {
						if (el.ObjectType == itemselectValue && e.Id == itemlst) {
							this.isExists = true;
							return false;
						}
					}
				});

				if (this.data.ObjectType == "Item") {
					//this.searchItemVal = [];
					return;
				}
			});

			if (this.isExists) {
				// this.data.ReqItemselect = [];
				//this.data.ReqBrandselect = [];
				alert(this.data.ObjectType + ' already added');
				return false;
			}
			console.log(itemselect,"itemselect");
			console.log(this.data);
			
			// alert(this.isExists);
			if (!this.isExists) {
				debugger
				itemselect.forEach(element => {
					if(this.selectedStoredId)
					{
						selectedText.push(
							element['Name']
							);
					}
					else
					{
						selectedText.push(
							element['Name']    //ItemName RR
							);
					}
					
					selectedId.push(element['Id']);
				});
				this.data.OfferBillDiscountRequiredItems.push(
					{
						offerId: 0,
						Id: 0,
						ObjectType: this.data.ObjectType,
						ObjectId: selectedId.toString(),
						ObjectText: selectedText.toString(),
						ValueType: this.data.qtyValue,
						ObjectValue: this.data.txtObjectType
					}
				);
			}
		}

		else {
			if (this.data.ObjectType == "Item") {
				itemselect.forEach(element => {
					selectedText.push(element['ItemName']);
					selectedId.push(element['Id']);
				});
			}
			else {
				itemselect.forEach(element => {
					debugger
					// selectedText.push(element['ItemName']);
					if(this.selectedStoredId)
					{
						selectedText.push(
							element['Name']
							);
					}
					else
					{
						selectedText.push(
							element['Name'] //ItemName        RR
							);
					}
					selectedId.push(element['Id']);
				});
			}

			this.data.OfferBillDiscountRequiredItems.push(
				{
					offerId: 0,
					Id: 0,
					ObjectId: selectedId.toString(),
					ObjectType: this.data.ObjectType == "Item" ? "Item" : "brand",
					ObjectText: selectedText.toString(),
					ValueType: this.data.qtyValue,
					ObjectValue: this.data.txtObjectType
				}
			);
			//this.searchItemVal = [];
		}

		// this.data.ReqItemselect = [];
		//this.data.ReqBrandselect = [];
		console.log(this.data.OfferBillDiscountRequiredItems, 'this.data.OfferBillDiscountRequiredItems');

		if (this.data.OfferBillDiscountRequiredItems.length >= 0) {
			this.data.SearchItemValue = '';
			this.data.ObjectType = null;
			this.data.qtyValue = '';
			this.data.txtObjectType = null;
		}
		this.data.ReqBrandselect=null
	}

	reloadItems() {
		//if(this.data.ReqItemselect[0] == undefined){
		var dataToPost = {
			WarehouseId: this.data.WareHouseId[0].WareHouseId,
			keyword: trim(this.data.SearchItemValue),
			margin: "0",
			itemClassification: '',
			subCategoryMappingids: [],
			brandCategoryMappingIds: []
		};
		this.offerService.getSearchItem(dataToPost).subscribe(data => {
			console.log(data, 'data');
			this.searchItemVal = data;
		});
		// }else{
		// 	this.data.SearchItemValue = '';
		// 	this.data.ObjectType = null;
		// 	this.data.qtyValue = '';
		// 	this.data.txtObjectType = null;
		// }
	}

	FillCompanyBrand(e) {
		debugger
		console.log(e, 'e')
		if(this.selectedStoredId)
		{
			this.GetStoreBrandCompany()
		}
		if (e == 'brand' && !this.selectedStoredId) {
			// this.data.ReqItemselect='';
			this.data.SearchItemValue = '';
			this.data.ReqBrandselect = '';
			this.getSratchBrandList();

		} else if (e == 'Item') {
			this.data.ReqItemselect = ''
			// this.data.ReqBrandselect = '';

		}
	}

	getSratchBrandList() { 
		debugger
		// get Item list when select sratch Item or item Margin Radio
		this.offerService.getAllSratuchBrandList().subscribe(data => {
			this.ItemBrandList = data['Brands'];
			// console.log(this.ItemBrandList, 'data');
		});
	}

	// dataChanged(newObj) {
	// 	this.data.FreeofferType = '';
	// 	// here comes the object as parameter
	// }



	onItemSelect(test) {
		// console.log(test, 'test');

	}

	changeOfferOnval() {
		// if (this.data.OfferOn == 'BillDiscount' || this.data.OfferOn == 'ScratchBillDiscount') {
		// 	this.data.IsStore = false
		// }
		this.data.IsStore = 'Company';
		this.data.BillDiscountType = 'BillDiscount';
		this.showStore = false;
		this.trueNoneValue = true;
		this.itemSeectVal = 'BillDiscount';
		this.data.StoreId = 0;
		if (this.data.OfferOn == 'BillDiscount') {
			this.data.BillDiscountType = "BillDiscount";
			this.data.ObjectType = "Items";
		} else if (this.data.OfferOn == 'ScratchBillDiscount') {
			this.data.BillDiscountType = "BillDiscount";
		}
		else {
			this.data.BillDiscountType = "";
		}

	}
	StockChange() {
		this.data.BillDiscountFreeItems = [];
	};
	BillDiscountOfferOn() {
		if(this.data.BillDiscountOfferOn == 'DynamicAmount')
		{
          this.checked=false
		  this.data.UserType=null
		}
		if (this.data.BillDiscountOfferOn == 'FreeItem') {
			this.data.IsDispatchedFreeStock = 'true';
		}
		this.data.DiscountPercentage = 0;
		this.data.BillDiscountWallet = 0;
		this.data.BillDiscountFreeItems = [];
		this.data.OfferScratchWeights = [
			{ 'WalletPoint': 10, 'Weight': 40 },
			{ 'WalletPoint': 20, 'Weight': 30 },
			{ 'WalletPoint': 50, 'Weight': 15 },
			{ 'WalletPoint': 100, 'Weight': 10 },
			{ 'WalletPoint': 200, 'Weight': 5 }];
		
	};
	CallGCData(typeData) {
		 // Set customer type value according to type
		 debugger;
		 this.data.FreeofferType=null
		if (typeData == "Group") {
			this.offerService.getAllCustomerGroupListforOffer(this.selectedStoredId,this.data.OfferAppType).subscribe(data => {
				this.groupData = data	
			});
		} else if (typeData == "KPPCustomer") {
			this.data.CustomerId = '-2';
		}
		else if (typeData == "PrimeCustomer") {
			this.data.CustomerId = '-9';
		}
		else {
			this.data.CustomerId = '-1';
		}
	}
	// CallGCData(typeData) { // Set customer type value according to type
	// 	if (typeData == "Group") {
	// 		this.offerService.getAllCustomerGroupList().subscribe(data => {
	// 			this.groupData = data
	// 		});
	// 	} else if (typeData == "KPPCustomer") {
	// 		this.data.CustomerId = '-2';
	// 	}
	// 	else if (typeData == "PrimeCustomer") {
	// 		this.data.CustomerId = '-9';
	// 	}
	// 	else {
	// 		this.data.CustomerId = '-1';
	// 	}
	// }
	SearchCustomer() { // Serach customer with SKcode and get data
		if (this.data.skCode == '' || this.data.skCode == null) {
			alert('Please enter skcode')
		} else {
			this.offerService.GetCustomerBySkCode(this.data.skCode).subscribe(data => {
				// console.log(data, 'data');
				if (data.length == '' || data.length == 0) {
					alert('no record found')
				} else {
					this.CustomerskCode = data
				}

			});
		}
	}
	updateWalletApply(value) { // Update wallet point value for for discount selection wallet
		this.data.ApplyOn = value
	}
	getWalletTypeVal(walletVal) {
		// console.log(walletVal, 'walletVal');
		this.data.WalletType = walletVal
	}
	saveData(data, Objselected) { //Add new offer with all values	
           debugger;
		// console.log(this.SelectedGroupId,"data.GroupID")
		console.log(data.freebiesType,"data.freebiesType");
		
		console.log(data.ChannelId)
		console.log(data.UserType)
		
		


		if(this.isexclusivegroupbool){
			if(data.ExcludeGroupId >0){}
			else{
				alert("Please Select Exclude user Type");
				return false;
			}
		}
		else{
			data.ExcludeGroupId=0;
		}
		
		if(this.iscombinedofferseen){
			if(data.CombinedGroupId == undefined){
				// alert("Please Select Combined Group Offer");
				// return false
		}
			else{
				
			}
		}
		else{
			if(data.CombinedGroupId ==undefined){}
			else{data.CombinedGroupId.Id=0;}
		}
		var Itemselected = [];
		var billDiscountsection = [];
		
		if (data.BillDiscountType == "itemClassification" || data.BillDiscountType == "itemMargin") {
			data.BillDiscountType = "items";
		}
		if (data.WareHouseId == undefined || data.WareHouseId == "") {
			alert("Please Select atleat one Warehouse");
			return false;
		}
		if (data.StartDate == undefined || data.StartDate == "") {
			alert("Please Select Start Date");
			return false;
		}
		if (data.EndDate == undefined || data.EndDate == "") {
			alert("Please Select End Date");
			return false;
		}
		if (data.OfferAppType == undefined || data.OfferAppType == "") {
			alert("Please Select OfferAppType");
			return false;
		}
		if (data.FreeofferType == undefined || data.FreeofferType == "") {
			alert("Please Select Type");
			return false;
		}

		if (data.OfferName == undefined || data.OfferName == "") {
			alert("Please Fill Offer Name");
			return false;
		}

		// if (data.OfferCategory == undefined || data.OfferCategory == "") {
		//   alert("Please Fill Offer Category");
		//   return false;
		// }
		if (data.OfferOn == undefined || data.OfferOn == "") {
			alert("Please Fill Offer On");
			return false;
		}

		if (this.data.OfferOn != 'Item' && data.IsStore!='Company' && this.selectedStoredId != 'Company' && (this.selectedStoredId == undefined || this.selectedStoredId == "")) {
			alert("Please Select Store");
			return false;
		}
		if (data.IsActive == "" || data.IsActive == undefined) {
			alert("Please Select Status");
			return false;
		}
		if(data.BillDiscountOfferOn=="DynamicAmount")
		{
			if(this.uploadedCustomerList.length==0)
			{
				alert("Please Upload File")
				return false;
			}
		}
		if ((data.UserType == "" || data.UserType == undefined) && data.OfferOn != 'Item' && data.BillDiscountOfferOn!="DynamicAmount") {
			alert("Please Select User Type");
			return false;
		}
		else {
			if (data.BillDiscountOfferOn == 'Percentage') {
				data.ApplyOn = 'PreOffer'
			}
			if (this.data.UserType == "KPPCustomer") {
				this.data.CustomerId = -2;
			}
			if (this.data.UserType == "PrimeCustomer") {
				this.data.CustomerId = -9;
			}
			if (this.data.UserType == "AllCustomer") {
				this.data.CustomerId = -1;
			}
		}
		if (this.data.BillDiscountType == 'BillDiscount' && data.IsStore != 'Company' && data.OfferOn != 'Item') {
			alert("Please Select Offer On");
			return false;
		}
		console.log("Bill Discount Type", data.BillDiscountType);

		if (data.BillDiscount == 'category') {
			if (!this.data.categorymodel) {
				alert("Please Select Category");
				return false;
			}
			else {
				billDiscountsection = this.data.categorymodel;
				Itemselected = Objselected;
			}
		}
		if (data.BillDiscountType == 'subcategory') {
			if (!this.data.subcategorymodel) {
				alert("Please Select SubCategory");
				return false;
			}
			else {
				debugger
				billDiscountsection = this.data.subcategorymodel;
				Itemselected = Objselected;

			}

		}
		if (data.BillDiscountType == 'brand') {
			if (!this.data.isIncludeBillDiscountType) {
				alert("Please Select Brands");
				return false;
			} else {
				billDiscountsection = this.data.isIncludeBillDiscountType;
				Itemselected = Objselected;
			}
		}

		if (data.BillDiscountType == undefined) {
			data.BillDiscountType = 'BillDiscount';
		}

		if (data.BillDiscountType == 'BillDiscount') {
			if (this.data.noneExculdeData) {
				billDiscountsection = this.data.noneExculdeData;
			}
		}
		if (data.BillDiscountType == 'ClearanceStock') {
			if (this.data.isInclude) {
				billDiscountsection = this.data.isInclude;
			}
		}
		// console.log(data.isInclude, 'data.isInclude');

		if (data.OfferOn == "BillDiscount" && data.BillDiscountOfferOn == "FreeItem" && data.BillDiscountFreeItems && (!data.BillDiscountFreeItems || !data.BillDiscountFreeItems.length)) {
			alert("Please add free item list");
			return false;
		}

		if (data.OfferOn == "BillDiscount" && data.BillDiscountOfferOn == "FreeItem" && data.BillDiscountFreeItems && data.BillDiscountFreeItems.length && data.BillDiscountFreeItems.length > 0) {
			// if (data.BillDiscountFreeItems.length != null) {
			// 	for (var c = 0; c < data.BillDiscountFreeItems.length; c++) {
			// 		if (data.BillDiscountFreeItems[c].StockQty < data.BillDiscountFreeItems[c].OfferStockQty) {
			// 			alert("Free item " + data.BillDiscountFreeItems[c].ItemName + " offer stock qty (" + data.BillDiscountFreeItems[c].OfferStockQty + ") can't grater then stock qty (" + data.BillDiscountFreeItems[c].StockQty + ")");
			// 			return false;
			// 		}
			// 		if (data.BillDiscountFreeItems[c].OfferStockQty < data.BillDiscountFreeItems[c].Qty) {
			// 			alert("Free item " + data.BillDiscountFreeItems[c].ItemName + " qty (" + data.BillDiscountFreeItems[c].Qty + ") can't grater then offer stock qty (" + data.BillDiscountFreeItems[c].OfferStockQty + ")");
			// 			return false;
			// 		}
			// 	}
			// }
		}
		if (data.BillDiscountType == 'items' || data.BillDiscountType == "itemClassification" || data.BillDiscountType == "itemMargin") {
			if (data.BillDiscountType == null || data.BillDiscountType == '') {
				alert("Please Select Items");
				return false;
			}
		}
		// if(this.data.BillDiscountType =='ClearanceStock' && billDiscountsection==null)
		// {
		// 	alert("Please Select Itemname")
		// 	return false
		// }
		console.log(data.ItemId);
		
		if ((data.ItemId == "" || data.ItemId == undefined || data.ItemId == null) && data.OfferOn == 'Item') {
			alert("Please Select Item");
			return false;
		}
		if ((data.MinOrderQuantity <= 0 || data.MinOrderQuantity == undefined) && data.OfferOn == 'Item') {
			alert("Minimum Order Quantity Should be greater than 0");
			return false;
		}
		if ((data.FreeofferType == "" || data.FreeofferType == undefined || data.FreeofferType == null) && data.OfferOn != 'BillDiscount') {
			alert("Please Select FreeOffer Type");
			return false;
		}
		// if ((data.BillDiscountOfferOn == "" || data.BillDiscountOfferOn == undefined  &&data.FreeItemId=='') && data.OfferOn == 'BillDiscount') {
		// 	alert("Please select BillDiscountOfferOn");
		// 	return false;
		// }
		if ((data.BillDiscountOfferOn == "" || data.BillDiscountOfferOn == undefined) && data.OfferOn == 'BillDiscount') {
			alert("Please select BillDiscountOfferOn");
			return false;
		}
		if ((data.BillDiscountOfferOn == "" || data.BillDiscountOfferOn == undefined) && data.OfferOn == 'ScratchBillDiscount') {
			alert("Please select ScratchBillDiscountOfferOn");
			return false;
		}
		// data.BillDiscountType && data.BillDiscountType == 'BillDiscount'
		if (this.data.BillDiscountType == '' && data.BillDiscountType != 'Offer On' && data.FreeItemId == '' && (data.StoreId == undefined || data.StoreId == "")) {
			alert("Please select BillDiscountOfferOn");
			return false;
		}
		// this.data.OfferOn != 'Item' && data.IsStore != 'Company' && (data.StoreId == undefined || data.StoreId == "")

		if ((data.BillAmount == "" || data.BillAmount == undefined) && (data.BillDiscountOfferOn == 'Percentage' || data.BillDiscountOfferOn == 'WalletPoint')) {
			alert("Please Enter Minimum Bill Amount");
			return false;
		}
		if ((data.DiscountPercentage == "" || data.DiscountPercentage == undefined) && data.BillDiscountOfferOn == 'Percentage') {
			alert("Please select DiscountPercentage");
			return false;
		}
		
		// console.log(data.BillDiscountWallet, 'data.BillDiscountWallet');

		if ((data.BillDiscountWallet == "" || data.BillDiscountWallet == undefined) && data.BillDiscountOfferOn == 'WalletPoint') {
			alert("Please select Discount Wallet Point");
			return false;
		}
		// console.log(data.FreeWalletPoint, 'data.FreeWalletPoint');

		if ((data.FreeWalletPoint == "" || data.FreeWalletPoint == undefined) && data.FreeofferType == 'WalletPoint') {
			alert("Please select Free Wallet Point");
			return false;
		}
		if ((data.FreeItemId == "" || data.FreeItemId == undefined) && data.FreeofferType == 'ItemMaster') {
			alert("Please select Free Item");
			return false;
		}
		if ((data.FreeItemLimit == "" || data.FreeItemLimit == undefined) && data.FreeofferType == 'ItemMaster') {
			alert("Please Enter Item Limit");
			return false;
		}
		if ((data.NoOffreeQuantity == "" ||data.NoOffreeQuantity == undefined) && data.FreeofferType == 'ItemMaster') {
			alert("Please Enter No Of Quantity");
			return false;
		}
		if (data.FreeofferType == 'ItemMaster' && data.IsDispatchedFreeStock == undefined) {
			alert("Please select Stock Dispatched type");
			return false;
		}
		if (data.FreeofferType == 'ItemMaster' && data.freebiesType == undefined) {
			alert("Please select Freebies type");
			return false;
		}
		//if (((data.FreeItemLimit == "" || data.FreeItemLimit == undefined) && data.FreeofferType == 'ItemMaster') && data.OfferOn == 'BillDiscount') {
		//    alert("Please select Free Item Limit");
		//    return false;
		//}
		if (((data.NoOffreeQuantity == "" || data.NoOffreeQuantity == undefined) && data.FreeofferType == 'ItemMaster') && data.OfferOn == 'BillDiscount') {
			alert("Please select Free Item Quantity");
			return false;
		}
		if (data.OfferOn == 'ScratchBillDiscount' && (data.OfferCode == null || data.OfferCode == "" || data.OfferCode == undefined)) {
			alert("Please enter offer code");
			return false;
		}
		if (data.BillAmount < 0) {
			alert("Please enter bill amount positive");
			return false;
		}
		if (data.MaxBillAmount < 0) {
			alert("Please enter Maximum bill amount positive");
			return false;
		}
		if (data.MaxDiscount < 0) {
			alert("Please enter maximum discount positive");
			return false;
		}
		if ((data.BillDiscountWallet < 0) || (data.DiscountPercentage < 0)) {
			alert("Please enter positive value");
			return false;
		}
		if ((data.MaxBillAmount == 0) && (data.BillAmount > data.MaxBillAmount)) {
			alert("Minimum Amount Can't Be Greater Than Maximum");
			return false;
		}

		if (data.OfferOn == "BillDiscount" && data.LineItem && data.OfferLineItemValues && data.OfferLineItemValues.length > 0 && data.OfferLineItemValues.length != data.LineItem) {
			alert("Please click Add Line Item Value button to add Line item value.");
			return false;
		}
		if (data.OfferOn != "BillDiscount") {
			data.OfferLineItemValues = [];
		}
		if (data.FreeofferType == 'ItemMaster' && this.data.freeItemQuantity < 1) {
			alert("Free stock not available please check");
			return false;
		}
		if (data.FreeofferType == 'ItemMaster' && this.data.freeItemQuantity < data.FreeItemLimit) {
			alert("Free Item limit not a greater tha free item qty please check");
			return false;
		}
		//else {
		// var ar = [];
		// if (data.ItemId != null) {
		//   ar = data.ItemId.split(',');
		// } else {
		//   ar[0] = "";
		//   ar[1] = "";
		// }
debugger;
		var fr = [];
		if (data.FreeItemId != null) { // Get free item data
			fr = data.FreeItemId.split(',');
		} else {
			fr[0] = "";
			fr[1] = "";
		}
		// console.log(data.OfferLineItemValues, 'OfferLineItemValues');

		var AllWhereHouseIds = [];
		var OnlyOneWhereHouseIds = [];
		if (this.data.WareHouseId) { // Get Single or multiple Where house Ids
			OnlyOneWhereHouseIds = this.data.WareHouseId[0]['WareHouseId']; // Single wherehouse
			this.data.WareHouseId.forEach(element => { // multiple WhereHouseF
				AllWhereHouseIds.push(element.WareHouseId)
			});
		}
		var itemdc = [];
		if (data.BillDiscountType != 'BillDiscount') {
			if (this.data.excludeSelectData && !(this.data.excludeSelectData == undefined || this.data.excludeSelectData == '' || this.data.excludeSelectData == null)) {
				if (this.itemSeectVal == 'items' || this.itemSeectVal == 'itemMargin' || this.itemSeectVal == 'itemClassification') {
					this.data.excludeSelectData.forEach(Item => {
						itemdc.push({ Id: 0, OfferId: 0, itemId: Item.Id, IsInclude: true });
					});
				} else {
					this.data.excludeSelectData.forEach(Item => {
						itemdc.push({ Id: 0, OfferId: 0, itemId: Item.Id, IsInclude: false });
					});
				}
			}
		}
		var addItemdata = [];
		console.log(this.data.OfferBillDiscountRequiredItems, 'this.data.OfferBillDiscountRequiredItems');
		if (this.data.OfferBillDiscountRequiredItems && !(this.data.OfferBillDiscountRequiredItems == undefined || this.data.OfferBillDiscountRequiredItems == '' || this.data.OfferBillDiscountRequiredItems == null)) {
			addItemdata = this.data.OfferBillDiscountRequiredItems
		}

		var lineItemValue = [];
		if (this.lineItemValueGet && !(this.lineItemValueGet == undefined || this.lineItemValueGet == null)) {
			this.lineItemValueGet.forEach(obj1 => {
				lineItemValue.push({ Id: 0, OfferId: 0, itemValue: obj1.itemValue });
			});
		}
		if(data.BillDiscountType == 'ClearanceStock')
		{
			if(billDiscountsection.length == 0 && data.isInclude==undefined)
			{
				alert("Please add Clearance stock item list")
				return false;

			}
		}
		var objdc = [];
		// console.log(billDiscountsection);

		if (billDiscountsection && !(billDiscountsection == undefined || billDiscountsection == null)) {
			if (data.BillDiscountType == 'category' || data.BillDiscountType == 'BillDiscount') {
				billDiscountsection.forEach(obj => {
					objdc.push({ Id: 0, OfferId: 0, ObjId: obj.Id, IsInclude: false });
				});
			}
			else if (data.BillDiscountType == 'subcategory' || data.BillDiscountType == 'brand') {

				billDiscountsection.forEach(obj => {
					objdc.push({ Id: 0, OfferId: 0, ObjId: obj.Id, IsInclude: true });
				});
			}
			else if (data.BillDiscountType == 'ClearanceStock') {

				billDiscountsection.forEach(obj => {
					objdc.push({ Id: 0, OfferId: 0, ObjId: obj.Id, IsInclude: true });
				});
			}	
			this.classString=null
		    this.classificationarray=[]
			if(this.noneClassificationSelected!=null)
			{
				this.noneClassificationSelected.forEach(x=>
					{
					  console.log();
					  this.classificationarray.push(x.Classification)
					//   const string1=x.Classification.join(',')
					})
					this.classString=this.classificationarray.join(',')
					console.log(this.classString,"ClassString");
			}
	      		
		}
		if(this.itemsArray.length==1){
			if(data.IsFreebiesItem == true)
			{
				if(data.MainItemMinimumQty>0){
					data.MinOrderQuantity = data.MainItemMinimumQty;
					this.itemsArray.forEach(obj=>{
						data.ItemId=obj.Id
					})
				}
				else{
					alert("Please Select Main Item Minimum Quantity for Applying Freebies")
					return false;
				}
			}
			else{
				data.IsFreebiesItem=false;
			}
		}
		else{
			data.IsFreebiesItem=false;
		}
		
		var channelids= []
		
		if(data.UserType == "Channel"){
			if(data.ChannelId == 'undefined' || data.ChannelId == undefined){
				alert("please Select a Channel ");
				return false;
			}
			else{
				data.ChannelId.forEach(element => { // multiple WhereHouseF
					channelids.push(element.ChannelMasterId)
				});
			}
		}

		var dataToPost = {
			WarehouseId: OnlyOneWhereHouseIds.toString(),
			OfferName: data.OfferName,
			MinOrderQuantity: data.MinOrderQuantity,
			FreeOfferType: data.FreeofferType,
			FreeItemId: fr[0],
			FreeItemName: fr[1],
			Description: data.discriptions,
			NoOffreeQuantity: data.NoOffreeQuantity,
			FreeWalletPoint: data.FreeWalletPoint,
			OfferLogoUrl: '',
			start: data.StartDate,//data.StartDate[0].toLocaleString(),
			end: data.EndDate,//data.EndDate.toLocaleString(),
			OfferCode: data.OfferCode,
			OfferOn: data.OfferOn,
			OfferCategory: 'Offer',
			CityId: data.CityId,
			MaxQtyPersonCanTake: data.MaxQtyPersonCanTake,
			OfferWithOtherOffer: data.OfferWithOtherOffer,
			IsActive: data.IsActive,
			OfferVolume: data.OfferVolume,
			DiscountPercentage: data.DiscountPercentage,
			IsOfferOnCart: data.IsOfferOnCart,
			QtyAvaiable: data.QtyAvaiable,
			QtyConsumed: data.QtyConsumed,
			BillAmount: data.BillAmount,
			MaxBillAmount: data.MaxBillAmount,
			MaxDiscount: data.MaxDiscount,
			LineItem: data.LineItem,
			BillDiscountOfferOn: data.BillDiscountOfferOn,
			BillDiscountWallet: data.BillDiscountWallet,
			IsMultiTimeUse: data.IsMultiTimeUse,
			IsUseOtherOffer: data.IsUseOtherOffer,
			IsCRMOffer : data.IsCRMOffer,
			CustomerId: data.CustomerId,//CustomerId
			GroupId: data.GroupID,//GroupId
			FreeItemLimit: data.FreeItemLimit,  // add Item Limit
			Category: data.Categoryid,
			subCategory: data.SubCategoryId,
			subSubCategory: data.subSubCategoryId,
			BillDiscountType: data.BillDiscountType,
			OfferItemsBillDiscounts: itemdc,
			BillDiscountOfferSections: objdc,
			ItemId: data.ItemId ? data.ItemId.toString():null,
			OfferUseCount: data.OfferUseCount,
			OfferAppType: data.OfferAppType,
			IsDispatchedFreeStock: data.IsDispatchedFreeStock,
			ApplyOn: data.ApplyOn,
			WalletType: data.WalletType,
			OfferScratchWeights: data.OfferScratchWeights,
			BillDiscountFreeItems: data.BillDiscountFreeItems,
			OfferBillDiscountRequiredItems: addItemdata,
			OfferLineItemValues: lineItemValue,
			WarehouseIds: AllWhereHouseIds.toString(),
			StoreId: data.IsStore=='Store' ? this.selectedStoredId : 0,
			IsAutoApply: data.IsAutoApply,
			ScratchCardCustomers:this.uploadedCustomerList,
			IncentiveClassification :this.classString!=null ?this.classString:null,
			IsFreebiesLevel:data.freebiesType,
			IsPriorityOffer:data.IsPriorityOffer,
			ImagePath:this.ImagePath,
			ExcludeGroupId:data.ExcludeGroupId !=undefined? data.ExcludeGroupId:0,
			CombinedGroupId:data.CombinedGroupId !=undefined? data.CombinedGroupId.Id:0,
			IsBillDiscountFreebiesItem:data.IsFreebiesItem==true?true:false,
			ChannelIds:channelids.toString(),
			IsBillDiscountFreebiesValue :data.IsFreebiesValue == true ? true : false
		};
		console.log(dataToPost, 'dataToPost');
		this.loaderService.loading(true);
		this.offerService.AddNewOffer(dataToPost).subscribe(data => { // Api method call for add new Offer
			alert(data.msg)
			this.loaderService.loading(false);
			if (data.msg == "Offer Added Successfully.") {
				this.router.navigateByUrl("/layout/offer/offer-list");
			}
		});
	}
	IncludeItem(data)
	{
		debugger
		this.itemsArray=[];
		data.forEach(element => {
			this.itemsArray.push(element)
		});
		 console.log(this.itemsArray,"itemsArray");
		this.data.excludeSelectData=this.itemsArray
		 console.log(this.data.excludeSelectData,"excludeSelectData");
	}
	updateLineItem(value, indexvalue) {
		// console.log(indexvalue, value);
		// console.log(this.lineItemValueGet.length);
		if (this.lineItemValueGet.length == 0) {
			this.lineItemValueGet.push({
				offerId: 0,
				Id: 0,
				rowIndexVal: indexvalue,
				itemValue: value
			});
			return
		} else {
			let chekIndexVal: any = this.lineItemValueGet.findIndex(element => indexvalue == element.rowIndexVal)
			if (chekIndexVal != -1) {
				this.lineItemValueGet[chekIndexVal]['itemValue'] = value;
			} else {
				this.lineItemValueGet.push({
					offerId: 0,
					Id: 0,
					rowIndexVal: indexvalue,
					itemValue: value
				});
			}
			// console.log(this.lineItemValueGet);

		}
	}
	RemoveFreeItem(BillDiscountFreeItem) { // Remove Item Section form table
		if (this.data.BillDiscountFreeItems.length != null) {
			for (var c = 0; c < this.data.BillDiscountFreeItems.length; c++) {
				if (this.data.BillDiscountFreeItems[c].ItemId == BillDiscountFreeItem.ItemId) {
					this.data.BillDiscountFreeItems.splice(c, 1);
				}
			}

		}
	};
	ItemStock() {
		// console.log(this.data.FreeItemdata);
		// console.log(this.data.IsDispatchedFreeStock);

		if (this.data.FreeItemdata) {
			var Item = this.data.FreeItemdata;
			if (this.data.BillDiscountFreeItems.length != null) {
				for (var c = 0; c < this.data.BillDiscountFreeItems.length; c++) {
					if (this.data.BillDiscountFreeItems[c].ItemId == Item.ItemId) {
						alert(Item.itemname + " Free item already added.");
						return false;
					}
				}


				this.offerService.getItemStockData(Item.ItemId, Item.ItemMultiMRPId, this.data.WareHouseId[0]['WareHouseId'].toString(), this.data.IsDispatchedFreeStock).subscribe(result => {
					// console.log(result, 'result');
					this.selcetData = result;
					result.ItemName = Item.itemname;
					result.ItemMultiMrpId = Item.ItemMultiMRPId;
					result.MRP = Item.price;
					result.StockType = this.data.IsDispatchedFreeStock=="true" ? 2 : 1;
					result.RemainingOfferStockQty = 0;
					this.data.BillDiscountFreeItems.push(result);
				});
				//this.data.IsDispatchedFreeStock = true;

			}
		}
		else {
			alert("Please select free item.");
		}
	}

	AddLineItemValue() {
		this.lineItemValueGet = [];
		this.data.OfferLineItemValues = [];
		if (this.data.LineItem > 0) {
			for (let i = 0; i < this.data.LineItem; i++) {
				this.data.OfferLineItemValues.push({
					offerId: 0,
					Id: 0,
					itemValue: ""
				});
			}
		}
	};
	ImagePath: any;
	registerFile: string[] = [];
	UploadOfferImage() {
		debugger
	
		if (this.registerFile.length>0) {
		  let formData = new FormData();
		  formData.append('file', this.registerFile[0]);
		  this.offerService.uploadImage(formData).subscribe(x => {
			debugger
			this.ImagePath=x;
			alert("Image Uploaded Successfully");
			console.log('ImagePath', x);
			this.registerFile=[]
		
		  })
		}
		else
		{
			alert("Please Select File")
		}
	  }
	  imageSrc: string;
	  onFileChange(event) {
		debugger
		//this.blocked=true;
		const reader = new FileReader();
		if(event.target.files && event.target.files.length) {
		  const [file] = event.target.files;
		  reader.readAsDataURL(file);
		  reader.onload = () => {
			this.imageSrc = reader.result as string;
			console.log(this.imageSrc,"imagesrc");
			
			//this.blocked=false;
		  }
		} //this.blocked=false;
	  }
	  proppan3:number;
	  removeOfferImage() {
		debugger;
		this.registerFile=[];
		this.ImagePath=[]
		this.imageSrc=null;
		this.fileUploader.nativeElement.value = null;
	
	  }
	  uploaderrr(e) {

		debugger;
		//console.log (e.target.files);  
		for (var i = 0; i < e.target.files.length; i++) {
		  this.registerFile.push(e.target.files[i]);
		}
	}
	GetItemsByType(ids, type, typeval) {
       debugger
		if (this.data.WarehouseId) {
			alert("Please select warehouse.");
			return false;
		}

		if (!ids) {
			alert("Please select atleat one " + type);
			return false;
		}
		if (typeval == 'selectBrand' || typeval == 'subcategory') {
			let itemIds = [];
			ids.forEach(element => {
				itemIds.push(element.Id)
			});
			const payload = {
				ids: itemIds,
				warehouseid: this.data.WareHouseId[0]['WareHouseId'],
				type: type
			}
			this.loadingIconForExcludedItemsListBr = true;
			this.loadingIconForExcludedItemsListSC = true;
			this.offerService.getSearcBrandData(payload).subscribe(data => {
				// console.log(data, 'dataaaaaaaa');
				this.itemAllData = data;
				if (data) {
					this.loadingIconForExcludedItemsListBr = false;
					this.loadingIconForExcludedItemsListSC = false;
				}
			});
		} else {
			this.loadingIconForExcludedItemsListBr = true;
			this.loadingIconForExcludedItemsListSC = true;
			this.offerService.getAllCategory().subscribe(data => {
				// console.log(data, 'dataaaaaaaa');
				this.itemAllData = data;
				if (data) {
					this.loadingIconForExcludedItemsListBr = false;
					this.loadingIconForExcludedItemsListSC = false;
				}
			});
		}
	}

	onChangeStart(event){
		let todayDate = new Date();
		let startDate=this.data.StartDate ? moment(this.data.StartDate).format('YYYY-MM-DD') : null;
		let today=todayDate ? moment(todayDate).format('YYYY-MM-DD') : null;
		if(startDate != today){
			this.data.StartDate.setHours(0);
			this.data.StartDate.setMinutes(0);
			this.data.StartDate.setSeconds(0);
		}		
	}

	onChangeEndDate(event){

		let todayDate = new Date();
		let endDate = this.data.EndDate ? moment(this.data.EndDate).format('YYYY-MM-DD') : null;
		let today=todayDate ? moment(todayDate).format('YYYY-MM-DD') : null;
		if(endDate != today){
		this.data.EndDate.setHours(23);
		this.data.EndDate.setMinutes(59);
		this.data.EndDate.setSeconds(59);
		}
	}
	
	Upload(event, uploadCustom) {
		debugger
		// console.log('uploadCustom: ', uploadCustom);
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = event.files[0];
	  reader.onload=(event) => {
		debugger		
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
		console.log(jsonData,"jsonData");
		  var dataFromExcel = jsonData;
		  const dataString = JSON.stringify(jsonData);
		  let excelData = dataFromExcel.OfferExport;
		  console.log(excelData);
		  let arrayData = [];
		  if(excelData == 'undefined' || excelData == undefined){
			alert("File is Empty")
			return false
		  }
		  excelData.forEach((element) => {
			let obj = {
				Skcode: element.Skcode,
				Amount: element.Amount,
				MinOrderAmount:element.MinOrderAmount,
				MaxOrderAmount:element.MaxOrderAmount
			}
			arrayData.push(obj);	
		  });
		  this.uploadedCustomerList=arrayData
		  if (this.uploadedCustomerList.length == 0) {
			alert("File is Empty")
			return false
		  }
		  else 
		  {
			this.uploadedCustomerList.forEach(element => {		
				if(element.Skcode === undefined || element.Amount === undefined || element.MinOrderAmount === undefined || element.MaxOrderAmount === undefined)
				{
					this.flag=true
					
				}
			  });
		  }
		  if(this.flag == true)
		  {
			alert("Please Fill All Fields")
			this.uploadedCustomerList=[]
		  }
		  else
		  {
			alert("File Uploded Successfully")
		  }
		  arrayData=[]
		}
		reader.readAsBinaryString(file);
	  }
	  DownloadSample()
	  {
		this.Array = [
			{
			  'Skcode': null,
			  'Amount': null,
			  'MinOrderAmount':null,	
			  'MaxOrderAmount':null
			}
		  ]
		  this.exportserv.exportAsExcelFile(this.Array, "UploadCustomerExcelFile")
	  }

	  iscreatenewgroup:boolean = false
	  newgrouopname:any
	  createnewgroup(){
		this.iscreatenewgroup = true;
	  }
	  Cancelgroup(){
		this.iscreatenewgroup = false;
	  }
	  Savegroup(name){
		debugger
		if(name == undefined || name =="" || name == null){
			alert("Please Enter Group Name")
			return false;
		}
		else{
			this.loaderService.loading(true);
			this.offerService.Addnewexclusivegroup(name).subscribe(res=>{
				this.loaderService.loading(false);
				if(res.Status == true){
					alert(res.Message)	
					this.iscreatenewgroup = false;
					this.Allgroups();
					this.newgrouopname=null;
				}
				else{
					alert(res.Message)	
				}
			})
		}
		
	  }
	  AllExclusivegroups:any
	  Allgroups(){
		
		this.offerService.GetAllExclusivegroup().subscribe(res=>{
			
			if(res.length>0){
				this.AllExclusivegroups = res;
			}
			
		})
	  }
	  exclusiveusertype:any='none'
	  onselectexclusiveusertype(abc){
		if(abc == 'group'){
			alert(abc)
		}

	  }
	  isexclusivegroupbool:boolean=false
	  groupdataa:any
	  CallGCDataa(typeData) {
		// Set customer type value according to type
		debugger;
		
		//this.data.FreeofferType=null
	   if (typeData == "Group") {
		this.isexclusivegroupbool=true;
		   this.offerService.getAllCustomerGroupListforOffer(null,this.data.OfferAppType).subscribe(data => {
			   this.groupdataa = data	
		   });
	   } 
	   else{
		this.isexclusivegroupbool=false;
	   }
   }
//    groupinputValue:any
//    filtergroupdata:any
//    filterOptions() {
//     this.filtergroupdata = this.groupData.filter(option =>
//       option.fip_name.toLowerCase().includes(this.groupinputValue.toLowerCase())
//     );
//   }
//   selectedBank: any;
//   selectOption(option: any) {
//     this.selectedBank = option;
//     this.groupinputValue = option.fip_name;
    
//   }


onusewithotherpress(data){
	debugger
	if(data.IsUseOtherOffer){  
		this.iscombinedofferseen = true;
	}
	else{
		this.iscombinedofferseen = false;
		if(data.CombinedGroupId ==undefined){}
			else{data.CombinedGroupId=undefined;}
	}
	
}
public e: any;

omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
inputText: string = '';

onInputChange(newgrouop) {
//   this.inputText = this.inputText.trim(); // Trim spaces
debugger
if(newgrouop==" ")
{
   alert("Blank Space  not Allowed")
   this.newgrouopname=null;
}
}
ChannelTypeList: any
getchannellist(data){
	debugger
	
	if(data.UserType =="Channel"){
		this.loaderService.loading(true);
		this.customerservice.CustomerChannelTypeList().subscribe(res => {
			this.loaderService.loading(false);
			console.log(res);
			this.ChannelTypeList = res;
		  })
	}
}
 
}
