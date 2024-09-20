import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ItemService } from 'app/shared/services/item.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { ScrollableView } from 'primeng/table';
// import ResizeObserver from 'resize-observer-polyfill';
import { DialogModule } from 'primeng/dialog';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { environment } from 'environments/environment';
declare var $: any;

// ScrollableView.prototype.ngAfterViewChecked = function () {
//   if (!this.initialized && this.el.nativeElement.offsetParent) {
//     //this.alignScrollBar();
//     this.initialized = true;

//     new ResizeObserver(entries => {
//       //for (let entry of entries)
//         this.alignScrollBar();
//     }).observe(this.scrollBodyViewChild.nativeElement);
//   }
// };

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})


export class ItemMasterComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  itemList: any[];
  popupDisplay: boolean = false;
  warehouseList: any[];
  selectedItem: any;
  cols: any[];
  closeResult: string;
  isDetails: boolean;
  isSearch: boolean;
  isTable: boolean;
  acc: any;
  searchKey: any;
  totalRecords: any;
  isWarehouseId: boolean;
  warehouseID: any;
  status: any;
  exportList: any;
  isSearchTrue: any
  roleName: any;
  roleList: any;
  isData: any;
  blocked: boolean;
  activeCountItem: number;
  type: any;
  apiURL: string;
cloudUrl: string;
  constructor(private itemService: ItemService, private modalService: NgbModal, private router: Router, private warehouseService: WarehouseService, private peoplePilot: PepolePilotService) {
    this.apiURL = environment.apiURL;
    this.cloudUrl='https://res.cloudinary.com';
    this.isDetails = false;
    this.searchKey = null;
    this.isWarehouseId = false;
    this.status = "Default";
    this.warehouseID = "undefined"
    this.isSearchTrue = false;
    this.isData = true;
  }
  display: boolean = false;
  selectedItemDetails: any;
  activeFields: any[] = [
    { field: 'itemname', label: 'Item Name' },
    { field: 'price', label: 'Price' },
    { field: 'itemBaseName', label: 'Item Base Name' },
    { field: 'free', label: 'Is Free' },
    { field: 'UnitPrice', label: 'Unit Price' },
    { field: 'TradePrice', label: 'Trade Price' },
    { field: 'WholeSalePrice', label: 'Wholesale Price' },
    { field: 'TotalTaxPercentage', label: 'Total Tax Percentage' },
    { field: 'TotalCessPercentage', label: 'Total Cess Percentage' },
    { field: 'TGrpName', label: 'Tax Group Name' },
    { field: 'OfferStartTime', label: 'Offer Start Time' },
    { field: 'OfferEndTime', label: 'Offer End Time' },
    { field: 'PurchaseMinOrderQty', label: 'Purchase Min Order Qty' },
    { field: 'PurchasePrice', label: 'Purchase Price' },
    { field: 'Number', label: 'Item Number' },
    { field: 'ShelfLife', label: 'Shelf Life' },
    { field: 'Barcode', label: 'Barcode' },
    { field: 'ShowTypes', label: 'Show Types' },
    { field: 'ABCClassification', label: 'ABC Classification' },
    { field: 'ItemMultiMRPId', label: 'ItemMultiMRPId' },
    { field: 'price', label: 'MRP' },
    { field: 'UnitofQuantity', label: 'UnitofQuantity' },
    { field: 'UOM', label: 'UOM' },
  ];
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }


  //Accordian-Code
  // Prevent panel toggle code
  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === '2') {
      $event.preventDefault();
    }
    if ($event.panelId === '3' && $event.nextState === false) {
      $event.preventDefault();
    }
  };

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');


      console.log(this.roleList);
      console.log(this.roleName);
      console.log(this.isWarehouseId)
      console.log(this.warehouseID)
      this.isDetails = false;
      this.isTable = true;
      this.isSearch = false;
      this.warehouseService.getSpecificWarehouses().subscribe(result => {
        this.warehouseList = result;
        console.log(this.warehouseList);
      });
      this.onWarehouseChange(this.warehouseID)
      if (this.isWarehouseId) {

      } else {

      }
    })
    // if(this.isWarehouseId){

    // }else{
    // this.cols = [
    //   {field: 'itemname', header: 'Item Name', width: '20%', bool: false  },

    //   { field: 'itemBaseName', header: 'Item Base Name', width: '15%', bool: false  },
    //   { field: 'MRP', header: 'MRP', width: '10%', bool: false },
    //   { field: 'PurchaseUnitName', header: 'Purchase Unit Name', width: '25%', bool: false  },
    //   { field: 'SellingUnitName', header: 'Selling Unit Name', width: '25%', bool: false  },
    //   { field: 'SellingUnitName', header: 'Selling Unit Name', width: '25%', bool: false  },
    //   { field: 'CreatedDate', header: 'Created Date', width: '10%', bool: false  },
    //   { field: 'LogoUrl', header: 'Image', width: '10%', bool: true},
    //   // { field: 'Actions', header: 'Actions', width: '10%', bool: true },
    // ];


    // }

    // this.itemService.GetAll().subscribe(result=>{
    //   console.log(result);
    //   this.itemList=result;
    //   for(var i in this.itemList){
    //     this.itemList[i].CreatedDate = this.itemList[i].CreatedDate ? moment(this.itemList[i].CreatedDate).format('DD/MM/YYYY') : null
    //     this.itemList[i].DataOfJoin = this.itemList[i].DataOfJoin ? moment(this.itemList[i].DataOfJoin).format('DD/MM/YYYY') : null
    //     this.itemList[i].DOB = this.itemList[i].DOB ? moment(this.itemList[i].DOB).format('DD/MM/YYYY') : null
    //   }
    // });



    // let width = $('div.position-fixed.supplier-details').parent().width();

  }

  load(event) {

    console.log(event);
    var First = event.first;//(event.first == 0 || event.first) ? event.first  : 0;
    var Last = event.rows ? event.first + event.rows : 20;
    // this.inputModel.Contains = this.searchKey ? this.searchKey : null;
    // this.inputModel.ColumnName = event.sortField ? event.sortField : 'StockId';
    // this.inputModel.IsAscending = event.sortOrder == 1 ? true : false;
    var page = Last / event.rows
    console.log(this.status)
    console.log(page)
    if (this.isWarehouseId == false) {
      this.blocked = true;
      this.itemService.getPagerItemList(event.rows, page, this.status).subscribe(result => {
        console.log("itemlist", result);

        this.blocked = false;
        this.itemList = result.ordermaster;
        for (var i in this.itemList) {
          this.itemList[i].CreatedDate = this.itemList[i].CreatedDate ? moment(this.itemList[i].CreatedDate).format('DD/MM/YYYY') : null
          this.itemList[i].DataOfJoin = this.itemList[i].DataOfJoin ? moment(this.itemList[i].DataOfJoin).format('DD/MM/YYYY') : null
          this.itemList[i].DOB = this.itemList[i].DOB ? moment(this.itemList[i].DOB).format('DD/MM/YYYY') : null
         // debugger
          if(this.itemList[i].LogoUrl !=null && (!(this.itemList[i].LogoUrl.includes(this.apiURL)))&& !(this.itemList[i].LogoUrl.includes(this.cloudUrl))  ){
            this.itemList[i].LogoUrl = this.apiURL+this.itemList[i].LogoUrl;
            console.log(this.itemList[i].LogoUrl);
          }
        }
        console.log(this.itemList)

        // this.stockHistoryList = result['ordermaster'];
        this.dataTableComponent.rows = 20;
        this.dataTableComponent.value = this.itemList;
        this.dataTableComponent.totalRecords = result['total_count'];



      });
    } else {
      this.blocked = true;
      var strtyp = this.storeType == '1'?"ConsumerType":""
      this.itemService.Getwarehouseitems(event.rows, page, this.warehouseID, this.status, strtyp).subscribe(result => {
        this.blocked = false;
        this.itemList = result.ordermaster;
        for (var i in this.itemList) {
          this.itemList[i].CreatedDate = this.itemList[i].CreatedDate ? moment(this.itemList[i].CreatedDate).format('DD/MM/YYYY') : null
          this.itemList[i].DataOfJoin = this.itemList[i].DataOfJoin ? moment(this.itemList[i].DataOfJoin).format('DD/MM/YYYY') : null
          this.itemList[i].DOB = this.itemList[i].DOB ? moment(this.itemList[i].DOB).format('DD/MM/YYYY') : null
        }
        console.log(this.itemList)
        this.dataTableComponent.value = this.itemList;
        // this.stockHistoryList = result['ordermaster'];
        this.dataTableComponent.totalRecords = result['total_count'];
        this.dataTableComponent.rows = 20;

      });
    }



  }
  ToggleActivation(item) {
    if (item.active) {
      item.active = false;
    } else {
      item.active = true;
    }
    if (this.warehouseID != "undefined") {
      this.itemService.PutItem(item).subscribe(result => {
        this.isDetails = false;
        if(this.selectedItem.path){
          this.selectedItem.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
        }
        this.modalService.dismissAll("done");
      });
    } else {
      this.itemService.PutCentralItem(item).subscribe(result => {
        this.isDetails = false;
        if(this.selectedItem.path){
          this.selectedItem.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
        }
        this.modalService.dismissAll("done");
      });
    }

  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if (this.isTable == true) {
        this.isTable = false;
      }
      this.isSearch = true;
      //   $([document.documentElement, document.body]).animate({
      //     scrollTop: $("#dataTable").offset().top
      // }, 1000);
    }
  }

  onDelete(ItemId: any) {
    console.log(ItemId);
    this.itemService.DeleteItem(ItemId).subscribe(result => {
      this.modalService.dismissAll("done");
      this.ngOnInit();
    });
    this.isDetails = false;
    if(this.selectedItem.path){
      this.selectedItem.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }

  }
  storeType:any
  onWarehouseChange(warehouseId) {
    // debugger
    this.isDetails = false;
    this.isData = true;
    if (warehouseId != "undefined") {
        var object = this.warehouseList.filter(x => x.WarehouseId == warehouseId);
        if(object.length > 0 && object.length == 1){
            this.storeType = object[0].Storetype;
        }
        
      this.cols = [
        { field: 'ABCClassification', header: 'ABC Classification', width: '10%', bool: true },
        { field: 'CurrentStock', header: 'Stock', color: '#0cc27e', width: '20%', bool: false },
        { field: 'ShowTypes', header: 'ShowTypes', color: '#0cc27e', width: '20%', bool: false },
        { field: 'itemname', header: 'Item Name', width: '40%', bool: false },
        { field: 'Tag', header: 'ROC', color: '#0cc27e', width: '20%', bool: false },
        { field: 'itemBaseName', header: 'Base Name', width: '30%', bool: false },
        // { field: 'WarehouseName', header: 'Warehouse Name', width: '15%', bool: false },
        { field: 'price', header: 'MRP', width: '10%', bool: false },
        { field: 'UnitPrice', header: 'Unit Price', width: '10%', bool: false },
        { field: 'TradePrice', header: 'Trade Price', width: '10%', bool: false },
        { field: 'WholeSalePrice', header: 'Wholesale Price', width: '10%', bool: false },
        { field: 'PurchasePrice', header: 'PP', width: '10%', bool: false },
        // { field: 'NetPurchase5rice', header: ' NPP', width: '10%', bool: false },
        { field: 'PurchaseUnitName', header: 'PUName', width: '30%', bool: false },
        // { field: 'SellingUnitName', header: 'Selling Unit Name', width: '25%', bool: false },
        { field: 'TotalTaxPercentage', header: 'TTax %', width: '15%', bool: false },
        { field: 'MinOrderQty', header: 'MOQ', width: '25%', bool: false },
        { field: 'CategoryName', header: ' Category', width: '25%', bool: false },
        { field: 'SubcategoryName', header: '  Sub cat', width: '25%', bool: false },
        { field: 'SubsubcategoryName', header: '  Subsub cat', width: '25%', bool: false },
        { field: 'BuyerName', header: 'Buyer Name', width: '25%', bool: false },
        { field: 'LogoUrl', header: 'Image', width: '10%', bool: true },
        
        // { field: 'Actions', header: 'Actions', width: '10%', bool: true },
      ];


      this.itemList = null
      this.isData = true;
      this.isWarehouseId = true
      this.warehouseID = warehouseId;
      this.dataTableComponent.rows = 20;
      this.dataTableComponent.reset();
      // this.itemService.GetByWarehouseID(warehouseId).subscribe(result=>{
      //   this.itemList = result;
      //   console.log(this.itemList);
      // });
    } else {

      // this.itemService.exportCentralItem().subscribe(result=>{
      //   this.exportList = result
      //   console.log(this.exportList.length)
      // })

      for (var i in this.roleList) {
        console.log('Index' + i)
        if (this.roleList[i] == 'HQ Master login' || this.roleList[i] == 'Item Master Creator') {

          this.cols = [
            { field: 'itemname', header: 'Item Name', width: '20%', bool: false },
          

            { field: 'itemBaseName', header: 'Item Base Name', width: '15%', bool: false },
            { field: 'price', header: 'MRP Price', width: '10%', bool: false },
            { field: 'PurchaseUnitName', header: 'Purchase Unit Name', width: '25%', bool: false },
            { field: 'SellingUnitName', header: 'Selling Unit Name', width: '25%', bool: false },
            { field: 'TotalTaxPercentage', header: 'Total Tax %', width: '25%', bool: false },
            { field: 'MinOrderQty', header: 'Min Item Order', width: '25%', bool: false },
            { field: 'CategoryName', header: ' Category', width: '25%', bool: false },
            { field: 'SubcategoryName', header: '  Sub category', width: '25%', bool: false },
            { field: 'SubsubcategoryName', header: '  Subsub cat', width: '25%', bool: false },
            { field: 'CreatedDate', header: 'Created Date', width: '10%', bool: false },
            { field: 'ShelfLife', header: 'ShelfLife', width: '10%', bool: false },
            { field: 'LogoUrl', header: 'Image', width: '10%', bool: true },
            // { field: 'Category', header: 'ABC-Category', width: '10%', bool: true },

          ];
          this.isData = true;
          this.itemList = null;
          this.isWarehouseId = false;
          this.dataTableComponent.rows = 20;
          this.dataTableComponent.reset();
          break;

        } else {
          this.isData = false;
          this.isWarehouseId = false;
          // this.dataTableComponent.value = [];
          // this.dataTableComponent.rows = 0;
          this.cols = [];
        }
      }
    }
  }

  barcodeimage:any
  barcodePopup(barcode:string) {
       
    this.barcodeimage=null
    if(barcode != null && barcode != '')
    {
      this.itemService.GetBarCode(barcode).subscribe(res=>{
        this.barcodeimage='data:image/png;base64,'+ res.BarcodeImage
        }) 
        this.popupDisplay = true;
    }
    else{
        alert('There is no barcode for this product')
    } 
  }
  // printImg(url) {
  //   var win = window.open('');
  //   win.document.write('<img src="' + url + '" onload="window.print();window.close()" />');
  //   win.focus();
  // }


  onStatusChange(s) {

    this.status = s
    console.log("activeCountItem", this.warehouseID);
    this.activeCountItem = null;
    //get active count when warehouse is selected and active is selected tejas
    if (s == "true" && this.warehouseID != null) {
      this.itemService.GetActiveItemWH(this.warehouseID).subscribe(result => {

        console.log("activeCountItem", result);
        this.activeCountItem = result;
      });
    }
    this.dataTableComponent.reset();
  }


  goToAddItem() {
    this.router.navigateByUrl('layout/item/item-master/form');
  }

  editItem(e) {
    if(e.path){
      e.path[1].nextSibling.nextSibling.style.display = "table-row";
    }
  }

  openDetails(d, e) {
    
    this.isDetails = false;
    this.popupDisplay = false;
    this.selectedItemDetails = d;
    this.selectedItem = e;
    console.log(d);
    console.log(this.selectedItemDetails);
    
    // debugger;
    this.type = d.Type;
    this.blocked = true;
    if (this.selectedItem != undefined) {
      if(this.selectedItem.path){
        this.selectedItem.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
      this.blocked = false;
    }else{
      this.selectedItem = e;
      this.selectedItem.path = [{className: null},  
      {className: 'classForHoverEffect ng-tns-c5-1 ng-star-inserted selected'}
    ];
      // this.selectedItem.path[0] = {classnull};
      // this.selectedItem.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    
    this.blocked = false;
    console.log(this.selectedItem)
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    // this.selectedItem.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
  }

  searchCentralItem(key) {
    this.isDetails = false;
    this.itemList = null
    console.log(key);
    if (this.warehouseID == "undefined") {
      this.blocked = true;
      this.itemService.searchCentralItem(key).subscribe(result => {
        // this.itemList = null
        this.blocked = false;
        this.itemList = result;
        //  this.dataTableComponent.value = this.itemList;
        this.dataTableComponent.totalRecords = result.length;
        this.dataTableComponent.rows = result.length;
      })
    } else {

      this.blocked = true;
      var strtyp = this.storeType == '1'?"ConsumerType":""
      this.itemService.searchWarehouseItems(key, this.warehouseID, strtyp).subscribe(result => {
        // this.itemList = null
        this.blocked = false;
        this.itemList = result;
        // this.dataTableComponent.value = this.itemList;
        this.dataTableComponent.totalRecords = result.length;
        this.dataTableComponent.rows = result.length;
      })
    }
  }

  exportCentral() {
    this.exportList = null;

    this.itemService.exportCentralItem().subscribe(result => {

      // this.exportList = result;
      let exportCentralList: any[] = [];
      result.forEach(element => {
        let lst = {
          CategoryName: element.CategoryName,
          CategoryCode: element.Code,
          SubcategoryName: element.SubcategoryName,
          SubsubcategoryName: element.SubsubcategoryName,
          BrandCode: element.Code,
          itemname: element.itemname,
          itemcode: element.itemcode,
          Number: element.Number,
          SellingSku: element.SellingSku,
          price: element.price,
          PurchasePrice: element.PurchasePrice,
          UnitPrice: element.UnitPrice,
          MinOrderQty: element.MinOrderQty,
          SellingUnitName: element.SellingUnitName,
          PurchaseMinOrderQty: element.PurchaseMinOrderQty,
          StoringItemName: element.StoringItemName,
          PurchaseSku: element.PurchaseSku,
          PurchaseUnitName: element.PurchaseUnitName,
          BaseCategoryName: element.BaseCategoryName,
          TGrpName: element.TGrpName,
          TotalTaxPercentage: element.TotalTaxPercentage,
          HindiName: element.HindiName,
          SizePerUnit: element.SizePerUnit,
          Barcode: element.Barcode,
          Active: element.active,
          Deleted: element.Deleted,
          Margin: element.Margin,
          PromoPoint: element.promoPoint,
          HSNCode: element.HSNCode,
          IsSensitive: element.IsSensitive,
          ShelfLife: element.ShelfLife,
          ShowTypes: element.ShowTypes,
          PTR: element.PTR,
          BaseScheme: element.BaseScheme,
        }
        exportCentralList.push(lst);
      });
      this.exportList = exportCentralList;
      this.exportAsExcelFile(this.exportList, 'Centra_lItem');

    })
  }


  exportFullWarehouseList() {
    this.exportList = null;
    if (this.warehouseID > 0) {
      this.itemService.export(this.warehouseID).subscribe(result => {
        this.exportList = result;
        this.exportAsExcelFile(this.exportList, 'FullWarehouse_Item');
      })
    }
    else {
      this.itemService.exportFullWarehouse(this.warehouseID).subscribe(result => {
        this.exportList = result;
        this.exportAsExcelFile(this.exportList, 'FullWarehouse_Item');
      })
    }

  }

  exportDeactivatedList() {
    this.exportList = null;
    this.itemService.exportDeactivatedWarehouseItems(this.warehouseID).subscribe(result => {
      this.exportList = result;
      this.exportAsExcelFile(this.exportList, 'Deactivated_Item');
    })
  }

  _exportCurrentWarehouse() {

    this.exportList = null;
    this.itemService.exportCurrentWarehouseItemList(this.warehouseID, this.status).subscribe(result => {

      this.exportList = result.ordermaster;
      // this.dataTableComponent.totalRecords = result.ordermaster.length;
      this.exportAsExcelFile(this.exportList, 'CurrentWarehouseItemList');
    })
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }

  searchClear() {
    this.searchKey = null
    this.ngOnInit();
  }
  printBarcode(){
    // debugger;
  }
}


