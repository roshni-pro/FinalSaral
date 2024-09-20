import { DatePipe } from '@angular/common';
import { ItemMasterService } from './../../../shared/services/item-master.service';
import { ItemService } from './../../../shared/services/item.service';
import { WarehouseService } from './../../../shared/services/warehouse.service';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-virtual-stock-settlement',
  templateUrl: './virtual-stock-settlement.component.html',
  styleUrls: ['./virtual-stock-settlement.component.scss'],
  providers: [DatePipe]
})
export class VirtualStockSettlementComponent implements OnInit {

  @ViewChild(Table, { static: false }) table: Table;
  blocked = true;
  warehouseList = [];
  manualStockRequestsList = [];
  totalRecords = 0;
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
    { field: 'Id', header: ' Id' },
    { field: 'ItemMultiMRPId', header: 'ItemMultiMRPId' },
    { field: 'WarehouseId', header: ' WarehouseId' },
    { field: 'SourceStockType', header: 'SourceStockType' },
    { field: 'ItemName', header: 'ItemName' },
    { field: 'Qty', header: 'Qty' },
    { field: 'DestinationStockType', header: 'DestinationStockType' },
    { field: 'UserName', header: 'UserName' }
  ];
  itemList = [];
  warehouseID: number = 0;
  itemmultimrpid: number = 0;
  isLoading: boolean;
  selectedItem: any;
  creationDate: Date = null;
  virtual : boolean;

  constructor(private virtualStockService: VirtualStockService,
    private router: Router, private r: ActivatedRoute, private warehouseService: WarehouseService, private itemService: ItemService,
    private itemmasterservice: ItemMasterService, private datePipe: DatePipe
  ) {

    this.selectedItem = {};
  }

  ngOnInit() {
    this.virtual = false;
    this.getmanualStockRequestsList();
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
    this.blocked = true;
    let page = { skip: 0, take: 10 };
    this.virtualStockService.getTransactionList(page)
      .subscribe(result => {
        this.blocked = false;
        this.manualStockRequestsList = result.ManualStockRequestsList;
        this.totalRecords = result.TotalRecords;
        console.log(result);
        this.keepLoading = false;
      });
  }

  load(event) {
    //this.blocked = true;
    let page = { skip: event.first, take: event.rows };
    if (this.searchFilterValue == '') {
      let myDate = this.datePipe.transform(this.creationDate, 'yyyy-MM-dd');
      this.virtualStockService.getTransactionListByName(this.searchFilterValue, this.warehouseID, myDate, page)
        .subscribe(result => {
          this.blocked = false;
          this.manualStockRequestsList = result.ManualStockRequestsList;
          this.totalRecords = result.TotalRecords;
          for(var i in this.manualStockRequestsList)
          {
            if(this.manualStockRequestsList[i].Qty == 0)
            {
              this.virtual = true;
            }
          }
          console.log('manualStockRequestsList:', this.manualStockRequestsList);
        });
    }
    else {
      let myDate = this.datePipe.transform(this.creationDate, 'yyyy-MM-dd');
      this.virtualStockService.getTransactionListByName(this.searchFilterValue, this.warehouseID, myDate, page)
        .subscribe(result => {
          this.blocked = false;
          this.manualStockRequestsList = result.ManualStockRequestsList;
          this.totalRecords = result.TotalRecords;
          console.log('manualStockRequestsList:', this.manualStockRequestsList);
        });
    }
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

  onSelectItem($event) {
    let page = { skip: 0, take: 10 };
    let myDate = this.datePipe.transform(this.creationDate, 'yyyy-MM-dd');

    this.virtualStockService.getTransactionListByName(this.searchFilterValue, this.warehouseID, myDate, page)
      .subscribe(result => {
        this.blocked = false;
        this.manualStockRequestsList = result.ManualStockRequestsList;
        this.totalRecords = result.TotalRecords;
      });
  }

  getitemList(event) {
    this.isLoading = true;
    if (event.query.length > 2 && this.warehouseID != 0) {
      this.itemService.searchWarehouseItems(event.query, this.warehouseID).subscribe(result => {
        this.isLoading = false;
        this.itemList = result;
      })
    }
    // else {
    //   if (this.warehouseID == 0) {
    //     
    //     this.itemmasterservice.GetMaster().subscribe(result => {
    //       
    //       this.isLoading = false;
    //       this.itemList = result;
    //     })
    //   }
    // }
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
  navToViewStocksettle(rowData)
  {
    
    console.log('rowData:',rowData);
    this.router.navigate(["virtualStockManagement/" + rowData.ItemMultiMRPId + '/' + rowData.WarehouseId + '/' + rowData.ItemName], { relativeTo: this.r.parent });
  }

}
