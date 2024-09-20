import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ItemService } from 'app/shared/services/item.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { CurrentStockService } from 'app/shared/services/current-stock.service';

import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { ScrollableView } from 'primeng/table';
// import ResizeObserver from 'resize-observer-polyfill';
import { DialogModule } from 'primeng/dialog';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ConfirmDialogService } from 'app/current-stock/services/confirm-dialog.service';


@Component({
  selector: 'app-current-stock',
  templateUrl: './current-stock.component.html',
  styleUrls: ['./current-stock.component.scss']
})
export class CurrentStockComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  warehouseList: any[];
  currentStockList: any[];
  selectedRowDetails: any;
  blocked:boolean=false
  selectedRow: any;
  cols: any[];
  isDetails: boolean;
  isSearch: boolean;
  isTable: boolean;
  activeFields: any[] = [{ field: 'itemname', label: 'Item Name' }, { field: 'ItemId', label: 'Item Id' }, { field: 'ItemNumber', label: 'Item Number' }, { field: 'WarehouseName', label: 'Warehouse Name' }, { field: 'MRP', label: 'MRP' }, { field: 'UnitofQuantity', label: 'UnitofQuantity' }, { field: 'UOM', label: 'Unit Of Measurement' }, { field: 'UpdatedDate', label: 'Updated Date' }, { field: 'CreationDate', label: 'Created Date' }, { field: 'ShowTypes', label: 'ShowTypes' }, { field: 'ABCCategory', label: 'ABC Classification' }];
  totalRecords: any;
  inputModel: any;
  searchKey: any
  warehouseId: any
  apiURL: string;
  exportList: any
  MonthADD: any;
  MonthSub: any;
  Todaysub: any;
  TodayAdd: any;
  MonthADDList: any;
  MonthSubList: any;
  TodaysubList: any;
  TodayAddList: any;
  Mannual: any[];
  rows: number = 20;
  first: number = 0;

  constructor(private warehouseService: WarehouseService, private currentStockService: CurrentStockService, private exportService: ExportServiceService, private messageService: MessageService, private router: Router
    , private confirmDialogService: ConfirmDialogService) {
    this.inputModel = {}; this.warehouseId = 0; this.MonthADD = 0; this.MonthSub = 0; this.Todaysub = 0; this.TodayAdd = 0;
    this.apiURL = environment.apiURL;
    this.exportList = [];
    this.MonthADDList = [];
    this.MonthSubList = [];
    this.TodayAddList = [];
    this.TodaysubList = [];
  }

  ngOnInit() {

    this.isDetails = false;
    this.isTable = true;
    this.isSearch = false;
    this.cols = [
      { field: 'ItemNumber', header: 'Item Number', color: '#0cc27e', width: '5%', bool: false },
      { field: 'ItemMultiMRPId', header: 'MultiMRPId', color: 'black', width: '25%', bool: false },
      { field: 'MRP', header: 'MRP', color: 'black', width: '25%', bool: false },
      { field: 'APP', header: 'APP', color: 'black', width: '25%', bool: false },
      { field: 'UOM', header: 'Unit Of Measurement', color: 'black', width: '25%', bool: false },
      { field: 'itemname', header: 'Item Name', color: 'black', width: '25%', bool: false },
      { field: 'Tag', header: 'ROC', color: 'black', width: '25%', bool: false },
      { field: 'CurrentInventory', header: 'Current Inventory', color: 'red', width: '10%', bool: false },
      { field: 'APPtotalamount', header: 'Total Amount', color: 'red', width: '10%', bool: false },
      { field: 'PlannedStock', header: 'Planned Stock', color: 'blue', width: '10%', bool: false },
      { field: 'WarehouseName', header: 'Warehouse Name', color: 'black', width: '25%', bool: false },
      { field: 'CreationDate', header: 'Created Date', color: 'black', width: '15%', bool: false, },
      { field: 'ShowTypes', header: 'ShowTypes', color: 'black', width: '15%', bool: false, },
      { field: 'ABCCategory', header: 'ABC Classification', color: 'black', width: '15%', bool: false, },
    ];

    // this.warehouseService.GetAllWarehouse().subscribe(result => {
    //   this.warehouseList = result;
    //   this.warehouseId = this.warehouseList[0].WarehouseId
    //   console.log(this.warehouseList);
    // });

    this.getSpecificWarehouses();
    // this.warehouseService.getSpecificWarehouses().subscribe(result => {   //// tejas added multi warehouse
    //   this.warehouseList = result;
    //   this.warehouseId = this.warehouseList[0].WarehouseId
    //   console.log(this.warehouseList);
    // });

    // this.currentStockService.GetCurrentStocks().subscribe(result=>{
    //   this.exportList = result;
    // });

  }

  referesh() {
    debugger;
    this.isDetails = false;
    this.dataTableComponent.reset();
  }

  private async getSpecificWarehouses() {
    //  this.warehouseService.getSpecificWarehouses().subscribe(result =>{
    this.warehouseService.getWarehouseCommon().subscribe(result => {
      this.warehouseList = result
      debugger
      this.warehouseId = result[0].value;
      this.GetWarehouseWiseManualEdit();
      this.dataTableComponent.reset();

        // this.warehouseList.forEach(element => {   //aartimukati
        //   element.warecity=element.WarehouseName+' '+element.CityName
        // });
        console.log(this.warehouseList);

    });


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
  // onChange(searchkey){
  //   this.currentStockList = this.currentStockService
  // }

  onDelete(ItemId: any) {
    console.log(ItemId);
    // this.currentStockService.DeleteItem(ItemId).subscribe(result=>{
    //   this.modalService.dismissAll("done");
    //   this.ngOnInit();
    // });
    this.isDetails = false;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }

  }

  onWarehouseChange(e) {
    debugger;
    console.log(e.value);
    this.warehouseId = e.value
    this.dataTableComponent.reset();
    this.GetWarehouseWiseManualEdit();
  }
  BatchcodewiseExport(){
    debugger;
    if(this.warehouseId==undefined || this.warehouseId==null || this.warehouseId==0) 
      this.messageService.add({ severity: 'error', summary: 'Select Warehouse First', detail: ''})
    else{
      this.blocked=true;
      this.currentStockService.BatchcodewiseExport(this.warehouseId).subscribe((response:any)=>{
        this.blocked=false;
        (response.length==0)?this.messageService.add({ severity: 'error', summary: 'Data Not Found!', detail: ''}):this.exportService.exportAsExcelFile(response, 'BatchcodewiseCurrentStockReport')
      },(error:any)=>{
        this.blocked=false;
        console.log(error);
      })
    }
  }
  load(event) {
    debugger;
    this.inputModel.First = event.first;//(event.first == 0 || event.first) ? event.first  : 0;
    this.inputModel.Last = event.rows ? event.first + event.rows : 20;
    this.inputModel.Contains = this.searchKey ? this.searchKey : null;
    this.inputModel.ColumnName = event.sortField ? event.sortField : 'StockId';
    this.inputModel.IsAscending = event.sortOrder == 1 ? true : false;
    var page = this.inputModel.Last / event.rows;
    this.blocked=true;
    this.currentStockService.GetCurrentStockByWarehouse(this.warehouseId, this.inputModel).subscribe(result => {
      result
      console.log(result, 'result');
      setTimeout(() => {
        let ItemClassificationDCList = [];
        if (result && result.currentStockList && result.currentStockList.length) {
         
          result.currentStockList.forEach(element => {

            let ItemClassificationDC = {
              itemnumber: element && element.ItemNumber && element.ItemNumber.toString() != "" ? element.ItemNumber.toString() : '',
              warehouseid: element && element.WarehouseId && element.WarehouseId != null ? element.WarehouseId : '',
              // Category: ''
            }
            ItemClassificationDCList.push(ItemClassificationDC);
          });
          this.currentStockService.GetItemClassificationsAsync(ItemClassificationDCList).subscribe(res => {
            result.currentStockList.forEach(el => {
              result
              el.ABCCategory = res.filter(re => re.ItemNumber == el.ItemNumber) && res.filter(re => re.ItemNumber == el.ItemNumber)[0] ? res.filter(re => re.ItemNumber == el.ItemNumber)[0].Category : 'D';
            });
            if (this.searchKey != null) {
              this.totalRecords = 0;
            } else {
              this.totalRecords = result.totalRecords;
            }
            this.currentStockList = result.currentStockList;
          });
        }
      }, 1);
      for (var i in this.currentStockList) {
        this.currentStockList[i].CreationDate = this.currentStockList[i].CreationDate ? moment(this.currentStockList[i].CreationDate).format('DD/MM/YYYY') : null;
        this.currentStockList[i].UpdatedDate = this.currentStockList[i].UpdatedDate ? moment(this.currentStockList[i].UpdatedDate).format('DD/MM/YYYY') : null
      }
    });
    this.blocked=false
  }

  GetWarehouseWiseManualEdit() {
    debugger;
    this.currentStockService.GetWarehouseManualEdit(this.warehouseId).subscribe(result => {
      //uncomment to continue export
      this.MonthADDList = result['MonthADDList'];
      this.MonthSubList = result['MonthSubList'];
      this.TodaysubList = result['TodaysubList'];
      this.TodayAddList = result['TodayAddList'];
      this.MonthADD = result['MonthADD'];
      this.MonthSub = result['MonthSub'];
      this.Todaysub = result['Todaysub'];
      this.TodayAdd = result['TodayAdd'];
    })
  }

  onSearch() {
    console.log(this.searchKey, 'this.searchKey');
    this.dataTableComponent.reset()
  }
  isOpenPopup: boolean = false;
  onSave(rowData, event) {
    debugger;
    this.isOpenPopup = true;
    this.confirmDialogService.confirm({
      show: true,
      StockId: rowData.StockId,
      StockName: 'C'
    }).subscribe(() => {

    });

    event.stopPropagation();
  }
  // onClose(e)
  // {
  //   debugger;
  //   this.isDetails = true;
  // }
  openDetails(d, e) {
    debugger;
    this.selectedRowDetails = d;
    console.log(e.composedPath());

    // this.confirmDialogService.confirm({
    //   show : true,
    //   StockId : d.StockId,
    //   StockName : 'C'
    // }).subscribe(() => {
    // });
    if (this.selectedRow != undefined) {
      if (this.selectedRow.path) {
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }else
    this.selectedRow = e;
    if(this.selectedRow.path){
      // this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
      this.selectedRow.path = [{className: null},  
        {className: 'classForHoverEffect ng-tns-c5-1 ng-star-inserted selected'}];
    }
    console.log(this.selectedRow)
    // if(this.isOpenPopup)
    // {
    //   this.isDetails = false;
    // }else{
    this.isDetails = true;
    // }

  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if (this.selectedRow.path) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  freeStock() {
    window.open(this.apiURL + '/#/FreeStockData')
  }

  _exportFullCurrentStock() {
    this.currentStockService.GetWarehousebased(this.warehouseId).subscribe(result => {
      this.exportList = result;
      this.currentStockService.getExportData(this.warehouseId).subscribe(result => {
        let ItemClassificationDCList = [];
        if (result && result.length) {
          result.forEach(element => {
            let ItemClassificationDC = {
              itemnumber: element && element.ItemNumber && element.ItemNumber.toString() != "" ? element.ItemNumber.toString() : '',
              warehouseid: element && element.WarehouseId && element.WarehouseId != null ? element.WarehouseId : '',
            }
            ItemClassificationDCList.push(ItemClassificationDC);
          });
          this.currentStockService.GetItemClassificationsAsync(ItemClassificationDCList).subscribe(res => {
            result.forEach(el => {
              result
              el.ABCClasssification = res.filter(re => re.ItemNumber == el.ItemNumber) && res.filter(re => re.ItemNumber == el.ItemNumber)[0] ? res.filter(re => re.ItemNumber == el.ItemNumber)[0].Category : 'D';
            });

            ItemClassificationDCList = result;
            this.exportService.exportAsExcelFile(result, 'result');
          });
        }
      })
    });
  }

  exportMonthADDList() {

    let ItemClassificationDCList = [];
    if (this.MonthADDList && this.MonthADDList.length) {

      this.MonthADDList.forEach(element => {

        // let ItemClassificationDC = {

        //   itemnumber: element && element.ItemNumber && element.ItemNumber.toString() != "" ? element.ItemNumber.toString() : '',
        //   warehouseid: this.warehouseId
        //   // Category: ''
        // }
        element.warehouseid = this.warehouseId;
        // ItemClassificationDCList.push(this.MonthADDList);
      });

      this.currentStockService.GetItemClassificationsForExportAsync(this.MonthADDList).subscribe(res => {
        this.MonthADDList.forEach(el => {

          el.ABCClasssification = res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId) && res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0] ? res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0].Category : 'D';
        });
        ItemClassificationDCList = this.MonthADDList;
        this.exportService.exportAsExcelFile(ItemClassificationDCList, 'MonthADDList');
      });
    }


  }

  exportMonthSubList() {
    let ItemClassificationDCList = []
    if (this.MonthSubList && this.MonthSubList.length) {

      this.MonthSubList.forEach(element => {

        // let ItemClassificationDC = {

        //   itemnumber: element && element.ItemNumber && element.ItemNumber.toString() != "" ? element.ItemNumber.toString() : '',
        //   warehouseid: this.warehouseId
        //   // Category: ''
        // }
        element.warehouseid = this.warehouseId;
        // ItemClassificationDCList.push(this.MonthSubList);
      });

      this.currentStockService.GetItemClassificationsForExportAsync(this.MonthSubList).subscribe(res => {
        this.MonthSubList.forEach(el => {

          el.ABCClasssification = res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId) && res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0] ? res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0].Category : 'D';

        });

        ItemClassificationDCList = this.MonthSubList;
        this.exportService.exportAsExcelFile(ItemClassificationDCList, 'MonthSubList');

      });
    }


  }

  exportTodaysubList() {
    let ItemClassificationDCList = []
    if (this.TodaysubList && this.TodaysubList.length) {

      this.TodaysubList.forEach(element => {

        // let ItemClassificationDC = {

        //   itemnumber: element && element.ItemNumber && element.ItemNumber.toString() != "" ? element.ItemNumber.toString() : '',
        //   warehouseid: this.warehouseId
        //   // Category: ''
        // }
        element.warehouseid = this.warehouseId;
        // ItemClassificationDCList.push(this.TodaysubList);
      });

      this.currentStockService.GetItemClassificationsForExportAsync(this.TodaysubList).subscribe(res => {
        this.TodaysubList.forEach(el => {

          el.ABCClasssification = res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId) && res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0] ? res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0].Category : 'D';

        });

        ItemClassificationDCList = this.TodaysubList;
        this.exportService.exportAsExcelFile(ItemClassificationDCList, 'TodaysubList');
      });
    }


  }

  exportTodayAddList() {
    let ItemClassificationDCList = []
    if (this.TodayAddList && this.TodayAddList.length) {
      this.TodayAddList.forEach(element => {
        element.warehouseid = this.warehouseId;
      });

      this.currentStockService.GetItemClassificationsForExportAsync(this.TodayAddList).subscribe(res => {
        this.TodayAddList.forEach(el => {

          el.ABCClasssification = res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId) && res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0] ? res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0].Category : 'D';

        });

        ItemClassificationDCList = this.TodayAddList;
        this.exportService.exportAsExcelFile(ItemClassificationDCList, 'TodayAddList');
      });
    }
    // this.exportService.exportAsExcelFile(this.TodayAddList, 'TodayAddList');
  }

  _exportFullStock() { // Manual Data Export
    this.currentStockService.ManualEntriesExport(this.warehouseId).subscribe(result => {
      let ItemClassificationDCList = [];
      console.log(result);
      this.Mannual = result;
      result.forEach(element => {
        element.warehouseid = this.warehouseId;
      });
      this.currentStockService.GetItemClassificationsForExportAsync(result).subscribe(res => {
        result.forEach(el => {
          el.ABCClasssification = res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId) && res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0] ? res.filter(re => re.ItemMultiMRPId == el.ItemMultiMRPId)[0].Category : 'D';
        });
        ItemClassificationDCList = result;
        this.exportService.exportAsExcelFile(ItemClassificationDCList, 'Mannual Data');
      });

      // this.exportService.exportAsExcelFile(result, 'Mannual Data');
    });

    // this.exportService.exportAsExcelFile(this.TodaysubList,'TodaysubList');
  }
}
