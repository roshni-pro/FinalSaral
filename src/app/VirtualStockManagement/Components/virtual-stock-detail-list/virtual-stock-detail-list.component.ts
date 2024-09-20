import { DatePipe } from '@angular/common';
import { ItemMasterService } from './../../../shared/services/item-master.service';
import { ItemService } from './../../../shared/services/item.service';
import { WarehouseService } from './../../../shared/services/warehouse.service';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ManualStockUpdatePagerFilter } from 'app/VirtualStockManagement/Interfaces/manual-stock-update-pager-filter';

@Component({
  selector: 'app-virtual-stock-detail-list',
  templateUrl: './virtual-stock-detail-list.component.html',
  styleUrls: ['./virtual-stock-detail-list.component.scss'],
  providers: [DatePipe]
})
export class VirtualStockDetailListComponent implements OnInit {
  @ViewChild('manualTable', { static: false }) manualTable: any;
  @ViewChild(Table, { static: false }) table: Table;
  blocked = true;
  pager: ManualStockUpdatePagerFilter;
  warehouseList = [];
  manualStockRequestsList = [];
  itemList: any[];
  totalRecords = 0;
  maxRows = 10;
  filterBy = '';
  searchFilterValue = '';
  peopleList = [];
  keepLoading = true;
  displayError = '';
  warehouseName = '';
  filters = [
    { name: 'Settled' },
    { name: 'Partially Settled' }
  ]
  cols = [
    // { header: 'Edit' },
    { field: 'ItemMultiMRPId', header: 'ItemMultiMRPId' },
    { field: 'ItemName', header: 'ItemName' },
    { field: 'WarehouseName', header: ' WarehouseName' },
    { field: 'SourceStockType', header: 'SourceStockType' },
    { field: 'DestinationStockType', header: 'DestinationStockType' },
    { field: 'Qty', header: 'Qty' },
    { field: 'UserName', header: 'UserName' }
  ];
  warehouseID: number = null;
  itemmultimrpid: number = 0;
  isLoading: boolean;
  selectedItem: any;
  creationDate: Date = null;
  virtual: boolean;
  constructor(private virtualStockService: VirtualStockService,
    private router: Router, private r: ActivatedRoute, private warehouseService: WarehouseService, private itemService: ItemService,
    private itemmasterservice: ItemMasterService, private datePipe: DatePipe
  ) {

    this.selectedItem = {};
  }

  ngOnInit() {
    this.resetPager();

    this.virtual = false;
    //this.getmanualStockRequestsList();
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.warehouseList = result;
        if (this.warehouseName) {
          this.warehouseID = this.warehouseList.filter(x => {
            return x && x.code.toLowerCase() == this.warehouseName.toLowerCase();
          })[0].ID;
        }
        console.log('result: ', this.warehouseList);
      });
  }

  getmanualStockRequestsList() {
    this.resetPager();
    this.selectedItem = null;
    this.warehouseID = null;
    this.manualStockRequestsList = [];
    this.totalRecords = 0;
    this.manualTable._first = 0;
    this.getData();
  }

  load(event) {
    console.log('loading is: ', event);
    //this.virtualStockService.getManualStockUpdateRequestList()
    this.pager.Skip = event.first;
    this.pager.Take = event.rows;

    this.getData();
  }

  searchFilter(filterValue) {
    this.searchFilterValue = filterValue;
    this.table.reset();
    let page = { skip: 0, take: 10 };
    if (true) {
      let myDate = this.datePipe.transform(this.creationDate, 'yyyy-MM-dd');

      this.virtualStockService.getTransactionListByName(this.searchFilterValue, this.warehouseID, myDate, page).subscribe(result => {
        this.blocked = false;
        this.manualStockRequestsList = result.ManualStockRequestsList;
        this.totalRecords = result.TotalRecords;
        console.log('manualStockRequestsList:', this.manualStockRequestsList);
      });
    }
  }

  navToSettlePayments() {
    this.router.navigate(["agentpaymentsettlement"], { relativeTo: this.r.parent });
  }

  onSelectWarehouse() {
    this.pager.Skip = 0;
    this.pager.Take = this.maxRows;
    this.pager.WarehouseId = this.warehouseID ? this.warehouseID : null;
    this.manualStockRequestsList = [];
    this.totalRecords = 0;
    this.manualTable._first = 0;
    this.getData();
  }



  onSelect($event) {
    let page = { skip: 0, take: 10 };
    //let myDate = this.datePipe.transform(this.creationDate, 'yyyy-MM-dd');
    let myDate = this.creationDate ? moment(this.creationDate).format('MM/DD/YYYY HH:mm:ss') : null
    this.virtualStockService.getTransactionListByName(this.searchFilterValue, this.warehouseID, myDate, page)
      .subscribe(result => {
        this.blocked = false;
        this.manualStockRequestsList = result.ManualStockRequestsList;
        this.totalRecords = result.TotalRecords;
      });
  }

  navToViewStocks() {
    this.router.navigate(["virtualStockManagement"], { relativeTo: this.r.parent });
  }


  navTostockSettlement() {
    this.router.navigate(["stockSettlement"], { relativeTo: this.r.parent });
  }

  Searchfilter(event) {
    
    let term = event.target.value
    console.log(term);
    var a = this.manualStockRequestsList;

    if (term.length > 3) {
      this.manualStockRequestsList = this.manualStockRequestsList.filter(x => x.SourceStockType == term || x.DestinationStockType == term || x.UserName == term || x.ItemName == term || x.ItemMultiMRPId == term || x.CreatedBy == term)
      if (this.manualStockRequestsList.length == 0) {
        this.manualStockRequestsList = a;
      }
    }
    if (term.length == 0) {
      let page = { skip: 0, take: 10 };
      if (true) {
        let myDate = this.datePipe.transform(this.creationDate, 'yyyy-MM-dd');

        this.virtualStockService.getTransactionListByName(this.searchFilterValue, this.warehouseID, myDate, page).subscribe(result => {
          this.blocked = false;
          this.manualStockRequestsList = result.ManualStockRequestsList;
          this.totalRecords = result.TotalRecords;
          console.log('manualStockRequestsList:', this.manualStockRequestsList);
        });
      }
    }
  }


  getitemList(event) {
    
    if (event.query.length > 2 && this.warehouseID) {
      this.isLoading = true;
      this.virtualStockService.searchWarehouseItems(event.query, this.warehouseID).subscribe(result => {
        this.isLoading = false;
        this.itemList = result;
      })
    }
  }

  onSelectItem(event) {
    console.log(' this.selectedItem:',  this.selectedItem);
    this.pager.ItemMultiMRPId = this.selectedItem.ItemMultiMRPId
    this.pager.Skip = 0;
    this.pager.Take = this.maxRows;
    this.manualStockRequestsList = [];
    this.totalRecords = 0;
    this.manualTable._first = 0;
    this.getData();
  }


  private getData() {
    this.blocked = true;
    this.virtualStockService.getManualStockUpdateRequestList(this.pager).subscribe(x => {
      console.log('getManualStockUpdateRequestList: ', x);
      this.manualStockRequestsList = x.ManualStockRequestsList;
      this.totalRecords = x.TotalRecords;
      this.blocked = false;
    })
  }

  private resetPager() {
    this.pager = {
      ItemMultiMRPId: null,
      Keyword: '',
      WarehouseId: null,
      Skip: 0,
      Take: this.maxRows
    }
  }

}
