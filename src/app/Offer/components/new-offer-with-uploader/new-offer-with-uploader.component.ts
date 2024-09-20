import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from 'app/offer/Service/offer.service';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { element } from 'protractor';
import * as moment from 'moment';
import { LoaderService } from 'app/shared/services/loader.service';



@Component({
	selector: 'app-new-offer-with-uploader',
	templateUrl: './new-offer-with-uploader.component.html',
	styleUrls: ['./new-offer-with-uploader.component.scss']
})
export class NewOfferWithUploaderComponent implements OnInit, DoCheck {
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
	groupData;
	CustomerskCode;
	isExists: boolean = false;
	clearfile:boolean=false;
	loadingIconForExcludedItemsListSC: boolean = false;
	loadingIconForExcludedItemsListBr: boolean = false;
	blocked:boolean=false
	invalidDates: any
	fileValue;
	apiURL:any;
	selectedStoredId:any=null	
	isCrmOfferFlag : boolean = false;
	constructor(
		public cityService: CityService,
		private customerservice: CustomerService,
		public offerService: OfferService,
		private router: Router,
		private loaderService: LoaderService
	) {
		this.data = {};
		this.apiURL = environment.apiURL;
	}

	ngOnInit() {
		this.data.OfferBillDiscountRequiredItems = [];
		this.data.IsCRMOffer = false;
		this.disablesave = false;
		this.getAllCityList();
		this.getWarehouseList();
		this.data.ApplyOn = 'PreOffer'
		this.Allgroups()
		
	}
	onUpload1(event) {
		console.log('file isssssss', event);
		for(let file of event.files) {
            this.fileValue = file;
        }
	

        // for(let file of event.files) {
        //     this.uploadedFiles.push(file);
        // }

        // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
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

	getEventFile(file) { // get File Value
		console.log(file, 'fileeeeeeeeee');
		this.fileValue = file[0]

		if(this.clearfile)
		{
			file.target.value=null;
		}
	}

	onUpload() {
		// const files = event.files[0];
		//console.log(files);

		//   file.append("file", files)
		// alert('upload');

		var fd = new FormData();
		fd.append('file', this.fileValue);
		fd.append('compid', '1');

		let file = new FormData();
		this.offerService.uploader(fd).subscribe((res) => {

			console.log(res);
		},
			(err) => {
				console.log(err);
			})
	}
    checkMultiselect:number=null
	dataWareHouse:any
	ngDoCheck() { // do check for checkform value for show and hide next step
			
		this.dataWareHouse=this.data.WarehouseId
		if ( this.data.WarehouseId && this.data.OfferAppType) {
			this.open1StForm = true;
		}
		if(this.dataWareHouse!=null)
		{
		if (this.dataWareHouse.length>1) {
				this.MultiWarehouse = true;
			} else {
				this.MultiWarehouse = false;
			}
		}
	
		if (this.data.OfferName && this.data.OfferOn && this.data.EndDate && this.data.StartDate) {
			this.offerOnForm(this.data.OfferOn);
		}
	}
	ChooseFreeItem(dt, StoreId, IsStore) { // choose item type after select offer on item
		console.log(this.data.WarehouseId);
		this.changeOfferOnval(dt);

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
		this.subcategorys = [];
		this.brands = [];
		this.data.ReqBrandmodel = this.data.brands;
		if (IsStore != 'Company') {
			this.GetStoreBrandCompany(StoreId);
		}
		else {
			this.GetCategorys();
		}
	}

	GetStoreBrandCompany(StoreId) {
		this.offerService.getSelectStoreBrand(StoreId).subscribe(result => {
			this.storeBrand = result;
			this.subcategorys = result.Companys;
			this.brands = result.Brands;
			this.data.ReqBrandmodel = result.brands;
		});
	}

	GetCategorys() {
		this.offerService.getAllCategory().subscribe(result => {
			this.storeBrand = result;
		});
	};

	getAllCityList() { // Get All City List
		this.cityService.GetAllCity().subscribe(result => {
			this.cityList = result;
			console.log(this.cityList);

		});
	}

	getWarehouseList()
	{
		this.customerservice.getWareHouseList().subscribe(res=>
			{
				this.getWherehouseList=res;
				console.log(res);
				console.log(this.getWherehouseList);
				
				
			})
	}

	getCityValue(cityId) { // change function for get warehouse by city id
		this.customerservice.getWareHouseByCity(cityId).subscribe(result => {
			//this.getWherehouseList = result;
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
	searchwarehouseId:any[]=[]
	warehouseID:number
	onItemSearch(e) { // Change Function for Get All Item List by City Id or Key Search
		this.data.FreeItemdata=''
		let serachValue = ''
		if (e == 'ItemValue') {
			serachValue = this.data.searchItem
		} else if (e == 'FreeItem') {
			serachValue = this.data.freeItemSearch
		} else {
			serachValue = this.data.searchItemOfferOn
		}	
		if(this.data.WarehouseId!=undefined)
		var WareHouseIdFreeItem=this.data.WarehouseId[0].WarehouseId

		this.offerService.getAllItemByCityId(serachValue,WareHouseIdFreeItem).subscribe(result => {
			if (e == 'ItemValue') {
				this.getAllItemList = result;
			} else if (e == 'FreeItem') {
				this.getFreeitemSearchItemList = result;
			} else {
				this.getAllSearchItemList = result;
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
		//this.data.FreeofferType = '';
        this.selectedStoredId=null
		if (e == 'Store') {
			this.showStore = true;
			this.getAllStoreList()
		} else {
			this.showStore = false;
			this.data.StoreId = " ";
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
		});
	}

	onCancel() {
		this.router.navigateByUrl("/layout/offer/offer-list");
	}

	updateItemChange(e) { // Change function for sratch type

		this.loadingIconForExcludedItemsListBr = false;
		this.loadingIconForExcludedItemsListSC = false;

		this.ItemOfferList = [];
		this.itemClassificationdata = [];
		this.itemAllData = [];
		//this.storeBrand = [];
		this.searchItemVal = [];
		this.itemSeectVal = e;

		//alert(this.data.BillDiscountType)

		//to clear previous unused inputs
		this.data.excludeSelectData = null;
		this.data.isIncludeBillDiscountType = null;
		this.data.subcategorymodel = null;
		// this.data.BillDiscountType = ""
		// this.data.isInclude = '';







		// console.log(this.itemSeectVal, 'this.itemSeectVal');
		switch (this.itemSeectVal) {
			case 'items': case 'itemMargin': {
				this.showIncludeItem = true;
				this.getSearchitemLIst();
				// console.log('testttt');
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

	getSearchitemLIst() { // get Item list when select sratch Item or item Margin Radio
		this.ItemOfferList = [];
		let category = this.data.categoryId ? this.data.categoryId : '';
		let subcat = this.data.subCategoryId ? this.data.subCategoryId : '';
		let subcatmain = this.data.subSubCategoryId ? this.data.subSubCategoryId : '';
		let margin = this.data.ItemMargin ? this.data.ItemMargin : '';
		let clssified = this.classifiledVal ? this.classifiledVal : '';
		this.offerService.getItemSearchAllList(this.data.CityId,
			category, subcat, subcatmain, margin, clssified).subscribe(data => {
				// console.log(data, 'data');
				this.ItemOfferList = data
			});



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
		var itemselect = [];
		itemselect = this.data.ObjectType == "Item" ? this.data.ReqItemselect : this.data.ReqBrandselect;
		var selectedText = [];//itemselect.options[itemselect.selectedIndex].text;
		var selectedId = [];//itemselect.options[itemselect.selectedIndex].text;
		var selecteditemids = "";

		console.log(this.data.ReqItemselect, this.data.ReqBrandselect);


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

		if (this.data.OfferBillDiscountRequiredItems.length > 0) {
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
			// alert(this.isExists);
			if (!this.isExists) {
				itemselect.forEach(element => {
					selectedText.push(element['ItemName']);
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
					selectedText.push(element['ItemName']);
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
	}

	reloadItems() {

		//if(this.data.ReqItemselect[0] == undefined){
		var dataToPost = {
			WarehouseId: this.data.CityId,
			keyword: this.data.SearchItemValue,
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
		// console.log(e, 'e');
		if (e == 'brand') {
			// this.data.ReqItemselect='';
			this.data.SearchItemValue = '';
			this.data.ReqBrandselect = '';
			this.getSratchBrandList();

		} else if (e == 'Item') {
			this.data.ReqItemselect = ''
			// this.data.ReqBrandselect = '';

		}
	}

	getSratchBrandList() { // get Item list when select sratch Item or item Margin Radio
		this.offerService.getAllSratuchBrandList().subscribe(data => {
			this.ItemBrandList = data['Brands'];
			// console.log(this.ItemBrandList, 'data');
		});
	}

	dataChanged(newObj) {
		//this.data.FreeofferType = '';
		// here comes the object as parameter
	}



	onItemSelect(test) {
		// console.log(test, 'test');

	}

	changeOfferOnval(dt) {
		// if (this.data.OfferOn == 'BillDiscount' || this.data.OfferOn == 'ScratchBillDiscount') {
		// 	this.data.IsStore = false
		// }

		this.data.FreeofferType=dt;
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
		if (this.data.BillDiscountOfferOn == 'FreeItem') {
			this.data.IsDispatchedFreeStock = 'true';
		}
		this.data.DiscountPercentage = 0;
		this.data.BillDiscountWallet = 0;
		this.data.BillDiscountFreeItems = [];
	
		if(this.data.BillDiscountOfferOn =='DynamicWalletPoint')
		{
			this.data.OfferScratchWeights = [
			{ 'WalletPoint': 10, 'Weight': 40 },
			{ 'WalletPoint': 20, 'Weight': 30 },
			{ 'WalletPoint': 50, 'Weight': 15 },
			{ 'WalletPoint': 100, 'Weight': 10 },
			{ 'WalletPoint': 200, 'Weight': 5 }];
		}
		else
		{
			this.data.OfferScratchWeights=[]
		}
	};

	CallGCData(typeData) { // Set customer type value according to type
		if (typeData == "Group") {
			this.offerService.getAllCustomerGroupListforOffer(this.selectedStoredId,this.data.OfferAppType).subscribe(data => {
debugger;
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

		var Itemselected = [];
		var billDiscountsection = [];
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
		if (data.BillDiscountType == "itemClassification" || data.BillDiscountType == "itemMargin") {
			data.BillDiscountType = "items";
		}
		console.log(data.WareHouseId, 'data.WareHouseId');

		if (data.WarehouseId == undefined || data.WarehouseId == "") {
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

		// if (data.FreeofferType == undefined || data.FreeofferType == "") {
		// 	alert("Please Select Type");
		// 	return false;
		// }

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

		if (this.data.OfferOn != 'Item' && data.IsStore != 'Company' && (data.IsStore == undefined || data.IsStore == "")) {
			alert("Please Select Store");
			return false;
		}
		data.UserType
		if (this.data.UserType == "" || this.data.UserType == undefined) {
			alert("Please Select UserType");
			return false;
		}
		// if (data.IsActive == "" || data.IsActive == undefined) {
		// 	alert("Please Select Status");
		// 	return false;
		// }
		if (data.BillDiscountType == 'category') {
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

		if ((data.ItemId == "" || data.ItemId == undefined || data.ItemId == null) && data.OfferOn == 'tems') {
			alert("Please Select Item");
			return false;
		}
		if ((data.MinOrderQuantity <= 0 || data.MinOrderQuantity == undefined) && data.OfferOn == 'Item') {
			alert("Minimum Order Quantity Should be greater than 0");
			return false;
		}


		// if ((data.FreeofferType == "" || data.FreeofferType == undefined || data.FreeofferType == null) && data.OfferOn != 'BillDiscount') {
		// 	alert("Please Select FreeOffer Type");
		// 	return false;
		// }

		if ((data.BillDiscountOfferOn == "" || data.BillDiscountOfferOn == undefined) && data.OfferOn == 'BillDiscount') {
			alert("Please select BillDiscountOfferOn");
			return false;
		}
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

		if (data.FreeofferType == 'ItemMaster' && data.IsDispatchedFreeStock == undefined) {
			alert("Please select FreeStock Dispatched type");
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
		//if (data.OfferOn == 'ScratchBillDiscount' && (data.OfferCode == null || data.OfferCode == "" || data.OfferCode == undefined)) {
		//    alert("Please enter offer code");
		//    return false;

		//}
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
		if (this.data.WarehouseId) { // Get Single or multiple Where house Ids
			OnlyOneWhereHouseIds = this.data.WarehouseId[0]['WarehouseId']; // Single wherehouse
			this.data.WarehouseId.forEach(element => { // multiple WhereHouse
				AllWhereHouseIds.push(element.WarehouseId)
			});
		}
		console.log(OnlyOneWhereHouseIds);
		
		// console.log(this.data.excludeSelectData, 'this.data.excludeSelectData');

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
		var objdc = [];
		// console.log(billDiscountsection);

		if (billDiscountsection && !(billDiscountsection == undefined || billDiscountsection == null)) {
			if (data.BillDiscountType == 'category' || data.BillDiscountType == 'subcategory' || data.BillDiscountType == 'brand' || data.BillDiscountType == 'BillDiscount')
				billDiscountsection.forEach(obj => {
					objdc.push({ Id: 0, OfferId: 0, ObjId: obj.Id, IsInclude: false });
				});
		}

		var ExcelUploadfile
		if (this.fileValue != null) {
			var fd = new FormData();
			fd.append('file', this.fileValue);
			fd.append('compid', '1');
			ExcelUploadfile = fd
		}
		// let file = new FormData();
		// this.offerService.uploader(fd).subscribe((res) => {

		//   console.log(res);
		// },
		//   (err) => {
		//     console.log(err);
		//   })
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
			start: data.StartDate.toLocaleString(),
			end: data.EndDate.toLocaleString(),
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
			IsCRMOffer: data.IsCRMOffer,
			CustomerId: data.CustomerId,//CustomerId
			GroupId: data.GroupID,//GroupId
			FreeItemLimit: data.FreeItemLimit,  // add Item Limit
			Category: data.Categoryid,
			subCategory: data.SubCategoryId,
			subSubCategory: data.subSubCategoryId,
			BillDiscountType: data.BillDiscountType,
			OfferItemsBillDiscounts: itemdc,
			BillDiscountOfferSections: objdc,
			ItemId: data.ItemId,
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
			ExcludeGroupId:data.ExcludeGroupId !=undefined? data.ExcludeGroupId:0,
			CombinedGroupId:data.CombinedGroupId !=undefined? data.CombinedGroupId.Id:0,
			ChannelIds:channelids.toString()
		};
		console.log(dataToPost, 'dataToPost');
		let container = JSON.stringify(dataToPost)
		console.log(container);
		
		let formData = new FormData();
		if (this.fileValue != undefined) {
			formData.append('file', this.fileValue)
		}
		else {
			alert("Please Upload Excel File");
			return false;
		}

		debugger;
		formData.append('Data', container)
		console.log("abc",formData);
		
		this.blocked=true
		this.offerService.AddOfferUsingUploader(formData).subscribe(res => { 
			// Api method call for add new Offer
				
				console.log(res);			
				alert(res.msg)
				this.blocked=false;
				if (res.status) {
					this.router.navigateByUrl("/layout/offer/offer-list");
					
				}
				if(!res.status)
				{
					this.clearfile=true;
				}
			},
			(err) => {
				console.log(err);
				alert("Some issue during upload, Please try again");
			}
		);
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
				if(this.data.WarehouseId!=undefined)
		        var WareHouseIdFreeItem=this.data.WarehouseId[0].WarehouseId
				this.offerService.getItemStockData(Item.ItemId, Item.ItemMultiMRPId, WareHouseIdFreeItem, this.data.IsDispatchedFreeStock).subscribe(result => {
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

	GetItemsByType(ids, type, typeval) {

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
		debugger;
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
		debugger;
		let todayDate = new Date();
		let endDate = this.data.EndDate ? moment(this.data.EndDate).format('YYYY-MM-DD') : null;
		let today=todayDate ? moment(todayDate).format('YYYY-MM-DD') : null;
		if(endDate != today){
		this.data.EndDate.setHours(23);
		this.data.EndDate.setMinutes(59);
		this.data.EndDate.setSeconds(59);
		}
	}

	onClickGroupList(GroupID){
		debugger;
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


iscombinedofferseen:boolean=false
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
iscreatenewgroup:boolean = false
	  newgrouopname:any
	  createnewgroup(){
		this.iscreatenewgroup = true;
	  }
	  Cancelgroup(){
		this.iscreatenewgroup = false;
	  }

	  Savegroup(name){
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
