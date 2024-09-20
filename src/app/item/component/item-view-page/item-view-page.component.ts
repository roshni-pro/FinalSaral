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
declare var $: any;

@Component({
  selector: 'app-item-view-page',
  templateUrl: './item-view-page.component.html',
  styleUrls: ['./item-view-page.component.scss'],
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
export class ItemViewPageComponent implements OnInit {

  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  itemList: any[];
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
  activeCountItem: number;
  constructor(private itemService: ItemService, private modalService: NgbModal, private router: Router, private warehouseService: WarehouseService) {
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
    { field: 'TotalTaxPercentage', label: 'Total Tax Percentage' },
    { field: 'TotalCessPercentage', label: 'Total Cess Percentage' },
    { field: 'TGrpName', label: 'Tax Group Name' },
    { field: 'OfferStartTime', label: 'Offer Start Time' },
    { field: 'OfferEndTime', label: 'Offer End Time' },
    { field: 'PurchaseMinOrderQty', label: 'Purchase Min Order Qty' },
    { field: 'PurchasePrice', label: 'Purchase Price' },
    { field: 'Number', label: 'Item Number' },
    
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

    this.roleName = localStorage.getItem('role');
    this.roleList = this.roleName.split(',');
    console.log(this.roleList);
    console.log(this.roleName);
    console.log(this.isWarehouseId)
    console.log(this.warehouseID)
    this.isDetails = false;
    this.isTable = true;
    this.isSearch = false;
    this.warehouseService.getWarehouseCommon().subscribe(result => {
      this.warehouseList = result;
      console.log(this.warehouseList);
    });
    this.onWarehouseChange(this.warehouseID)
    if (this.isWarehouseId) {

    } else {

    }

  }

  load(event) {

    console.log(event);
    var First = event.first;//(event.first == 0 || event.first) ? event.first  : 0;
    var Last = event.rows ? event.first + event.rows : 20;
    var page = Last / event.rows
    console.log(this.status)
    console.log(page)
    if (this.isWarehouseId == false) {
      this.itemService.getPagerItemList(event.rows, page, this.status).subscribe(result => {
        this.itemList = result.ordermaster;
        for (var i in this.itemList) {
          this.itemList[i].CreatedDate = this.itemList[i].CreatedDate ? moment(this.itemList[i].CreatedDate).format('DD/MM/YYYY') : null
          this.itemList[i].DataOfJoin = this.itemList[i].DataOfJoin ? moment(this.itemList[i].DataOfJoin).format('DD/MM/YYYY') : null
          this.itemList[i].DOB = this.itemList[i].DOB ? moment(this.itemList[i].DOB).format('DD/MM/YYYY') : null
        }
        console.log(this.itemList)

        // this.stockHistoryList = result['ordermaster'];
        this.dataTableComponent.rows = 20;
        this.dataTableComponent.value = this.itemList;
        this.dataTableComponent.totalRecords = result['total_count'];

      });
    } else {

      this.itemService.Getwarehouseitems(event.rows, page, this.warehouseID.value, this.status, '').subscribe(result => {
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
    if (this.warehouseID.value != "undefined") {
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

  onWarehouseChange(warehouseId) {
    debugger
    this.isDetails = false;
    this.isData = true;
    if (warehouseId != "undefined") {
      this.cols = [
        { field: 'CurrentStock', header: 'Stock', color: '#0cc27e', width: '20%', bool: false },
        { field: 'itemname', header: 'Item Name', width: '20%', bool: false },
        { field: 'itemBaseName', header: 'Item Base Name', width: '15%', bool: false },
        { field: 'WarehouseName', header: 'Warehouse Name', width: '15%', bool: false },
        { field: 'price', header: 'MRP Price', width: '10%', bool: false },
        { field: 'UnitPrice', header: 'Selling Price', width: '10%', bool: false },
        { field: 'PurchasePrice', header: 'Purchase Price', width: '10%', bool: false },
        { field: 'NetPurchasePrice', header: ' Net Purchase Price', width: '10%', bool: false },
        { field: 'PurchaseUnitName', header: 'Purchase Unit Name', width: '25%', bool: false },
        { field: 'SellingUnitName', header: 'Selling Unit Name', width: '25%', bool: false },
        { field: 'TotalTaxPercentage', header: 'Total Tax %', width: '25%', bool: false },
        { field: 'MinOrderQty', header: 'Min Item Order', width: '25%', bool: false },
        { field: 'CategoryName', header: ' Category', width: '25%', bool: false },
        { field: 'SubcategoryName', header: '  Sub category', width: '25%', bool: false },
        { field: 'SubsubcategoryName', header: '  Subsub cat', width: '25%', bool: false },
        { field: 'BuyerName', header: '   Buyer Name', width: '25%', bool: false },   
        { field: 'LogoUrl', header: 'Image', width: '10%', bool: true },
        
      ];
      this.itemList = null
      this.isData = true;
      this.isWarehouseId = true
      this.warehouseID = warehouseId;
      this.dataTableComponent.rows = 20;
      this.dataTableComponent.reset();
    
    } else {

    

      // for (var i in this.roleList) {
      //   console.log('Index' + i)
        //if (this.roleList[i] == 'HQ Master login' || this.roleList[i] == 'Item Master Creator') {

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
            { field: 'LogoUrl', header: 'Image', width: '10%', bool: true },
            // { field: 'Actions', header: 'Actions', width: '10%', bool: true },
          ];
          this.isData = true;
          this.itemList = null
          this.isWarehouseId = false;
          this.dataTableComponent.rows = 20;
          this.dataTableComponent.reset();
          //break;

        // } else {
        //   this.isData = false;
        //   this.isWarehouseId = false;
        //   // this.dataTableComponent.value = [];
        //   // this.dataTableComponent.rows = 0;
        //   this.cols = [];
        // }
      }
    
  }

  onStatusChange(s) {
    this.status = s
    console.log("activeCountItem",this.warehouseID);
    this.activeCountItem = null;
    //get active count when warehouse is selected and active is selected tejas
    if (s == "true" && this.warehouseID.value != null) {
      this.itemService.GetActiveItemWH(this.warehouseID.value).subscribe(result => {

        console.log("activeCountItem",result);
        this.activeCountItem = result;
      });
    }
    this.dataTableComponent.reset();
  }

      
  searchCentralItem(key) {
    this.isDetails = false;
    this.itemList = null
    console.log(key);
    if (this.warehouseID.value == "undefined") {
      this.itemService.searchCentralItem(key).subscribe(result => {
        // this.itemList = null
        this.itemList = result;
        //  this.dataTableComponent.value = this.itemList;
        this.dataTableComponent.totalRecords = result.length;
        this.dataTableComponent.rows = result.length;
      })
    } else {
      this.itemService.searchWarehouseItems(key, this.warehouseID.value).subscribe(result => {
        // this.itemList = null
        this.itemList = result;
        // this.dataTableComponent.value = this.itemList;
        this.dataTableComponent.totalRecords = result.length;
        this.dataTableComponent.rows = result.length;
      })
    }
  }

  searchClear() {
    this.searchKey = null
    this.ngOnInit();
  }
}
