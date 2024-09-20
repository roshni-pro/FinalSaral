import { Component, OnInit } from '@angular/core';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PaginatortradeMaster } from 'app/shared/interface/paginator-trade-itemMaster';
import { reject } from 'q';
import { CANCELLED } from 'dns';
declare var $: any;

@Component({
  selector: 'app-trade-item',
  templateUrl: './trade-item.component.html',
  styleUrls: ['./trade-item.component.scss']
})
export class TradeItemComponent implements OnInit {

  CategoryList: any[];
  Items: any;
  cols: any[];
  results: any;
  totalRecords: number;
  loading: boolean;
  istrue: boolean;
  itemID: any;
  pageSize: number;
  paginator: PaginatortradeMaster;
  Active: boolean | null;
  tradeItem: any;
  CategoryId: number;
  blocked: boolean;


  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private ItemServices: TradeitemmasterService,
    private router: Router,
    private exportService: ExportServiceService) {
    this.tradeItem = {};
  }

  ngOnInit() {
    //this.blocked = true;
    this.pageSize = 10;
    this.paginator = {
      Skip: 0,
      Take: this.pageSize,
      CategoryId: null,
      Active: null,
      SearchKeyWords: "",
      IsConsumerItem:null
    }

    this.ItemServices.SelectCategoryV2().subscribe(result => {
      this.CategoryList = result;
      console.log('this.CategoryName: ', this.CategoryList);
    });




    this.cols = [
      { field: 'ItemName', header: 'Item Name' },
      { field: 'MRP', header: 'MRP' },
      { field: 'BrandName', header: 'Brand Name' },
      { field: 'BasePrice', header: 'Base Price' },
      { field: 'UnitOfQuantity', header: 'Unit Of Quantity' },
      { field: 'UnitOfMeasurement', header: 'Unit Of Measurement' },
      { field: 'SellingDP', header: 'Selling DP' },
      { field: 'BuyingDP', header: 'Buying DP' },
      { field: 'Active', header: 'Active/Inactive', bools: true },
      { field: 'Actions', header: 'Actions', bool: true }

    ];

    this.Active = null;
    this.CategoryId = null;
    this.initialize();

  }

  private initialize() {
    this.blocked = true;
    this.ItemServices.GetAll(this.paginator).subscribe(result => {
      this.results = result;
      this.Items = this.results.TradeItemMasterDcs;
      this.totalRecords = this.results.total;
      this.blocked = false;
    });
  }

  load(event) {
    this.paginator.Skip = event.first;
    this.paginator.Take = event.rows;

    this.initialize();
  }

  exportItem() {
    this.blocked = true;


    this.exportService.exportAsExcelFile(this.Items, 'TradeCustomer');
    this.blocked = false;

  }

  onActiveToggle(Active) {
    console.log("Active", Active);
    this.paginator.Active = Active;
    this.blocked = true;

    this.initialize();
  }

  //on Status Change
  onStatusChange(status) {
    this.blocked = true;
    this.paginator.Active = status;
    this.initialize();

  }

  //on Category Change
  onCategoryChange(CategoryId) {
    this.blocked = true;
    this.paginator.CategoryId = CategoryId;
    this.initialize();
  }

  //dynamic Search
  dynamicSearch() {
    if (this.paginator.SearchKeyWords && this.paginator.SearchKeyWords.length >= 2) {
      this.initialize();
    }
    else if (this.paginator.SearchKeyWords.length == 0) {
      this.initialize();
    }
  }

  onReset() {
    this.paginator.Active = null;
    this.paginator.IsConsumerItem = null;
    this.paginator.CategoryId = null;
    this.paginator.Skip = 0;
    this.paginator.Take = this.pageSize;
    this.paginator.Skip = 0;
    this.paginator.SearchKeyWords = '';
    this.initialize();
  }

  Activeitemlist(data) {
   // console.log("data", data.IsActive);
    var daa = data.IsActive;

    console.log("daadaadaadaa", daa);

    this.confirmationService.confirm({
      message: 'Are you sure that you want to change Status?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (daa)
        {
              data.IsTradeItem = true;
              data.IsConsumerItem = true;
              data.IsActive = true;
        }
        else
        {
          data.IsTradeItem = false;
          data.IsConsumerItem = false;
        }
        this.ItemServices.UpdateItems(data).subscribe(result => {
          if(result !=null)
          {
            this.messageService.add({ severity: 'success', summary: 'Item Updated Successfully!', detail: '' });    
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Update failed!', detail: '' });   
            window.location.reload(); 
          }
        });
      },
      reject: () => {
        if(data.IsActive == true)
        {
          data.IsActive=false;
        }
        else
        {
          data.IsActive=true;
        }
       
      }
    });
  }


  reLoad() {
    this.blocked = true;

    this.Active = null;
    this.CategoryId = null;
    this.tradeItem = {};
    this.istrue = false;
    //this.messageService.add({ severity: 'success', summary: 'Updated Successfully!', detail: '' });
    this.initialize();
    // this.ItemServices.GetAll(this.Active, this.CategoryId).subscribe(result => {
    //   this.Items = result;
    //   console.log(this.Items);
    //   this.blocked = false;

    // })
  }

  CancelV1(e) {
    this.istrue = e;
  }

  addItems()
  {
    this.istrue = true;
    this.itemID = null;
  }


  Edit(ID) {
    this.istrue = true;
    this.itemID = ID;
    // this.router.navigateByUrl('full-layout/item/Edit')
  }

  onChange(data)
  {
    this.blocked = true;
    this.paginator.IsConsumerItem = data;
    this.initialize();
  }

  // SearchItem(tradeItem) {
  //   this.blocked = true;

  //   console.log("tradeItem :", tradeItem);
  //   this.paginator.Active = tradeItem.Active;
  //   this.paginator.CategoryId = tradeItem.CategoryId;

  //    this.initialize();

  // }


}




