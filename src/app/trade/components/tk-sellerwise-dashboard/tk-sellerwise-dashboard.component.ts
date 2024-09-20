import { Component, OnInit } from '@angular/core';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import { tkSellerDashboardFilter } from 'app/shared/interface/trade/tkSellerDashboardFilter';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tk-sellerwise-dashboard',
  templateUrl: './tk-sellerwise-dashboard.component.html',
  styleUrls: ['./tk-sellerwise-dashboard.component.scss']
})
export class TkSellerwiseDashboardComponent implements OnInit {
  cityList: any[];
  isSearch: boolean;
  data: any;
  zones: any[];
  sellerslist: any[];
  text: any;
  tkSellerDashboardData: tkSellerDashboardFilter;
  TotalSellerCount: any;
  totalBIDCount: any;
  ExportSellerData: any[];
  blocked: boolean;
  exportTotalBidData: any[];
  getTkSellerDetails: any[];
  TotalRecords: number;
  PageSize: number;

  constructor(private ItemServices: TradeitemmasterService,
    private sellerDashboardService: OrderAssignmentsService,
    private expoerService: ExportServiceService, private messageService: MessageService) { this.data = {}; }

  ngOnInit() {
    this.text = '';
    this.data.city = '';
    this.data.SellerId = 0;
    this.data.StartDate = null;
    this.data.EndDate = null;
    this.PageSize = 10;
    this.ItemServices.SelectCity().subscribe(result => {
      this.cityList = result.filter(x => x == "Indore" || x == "Lucknow" || x == "Gwalior" || x == "Raipur" || x=="Ahmedabad" ||
        x == "Kota" || x == "Jodhpur" || x == "Jabalpur" || x == "Ujjain" || x == "Udaipur" || x == "Jaipur");
    });

    this.tkSellerDashboardData = {
      SellerId: 0,
      City: null,
      StartDate: null,
      EndDate: null,
      Skip: 0,
      Take: this.PageSize,
    }
    this.onInitialization();
    this.GetSellerDetails();
  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {

      this.isSearch = true;

    }
  }

  load(event) {
    this.tkSellerDashboardData.Skip = event.first;
    this.tkSellerDashboardData.Take = event.rows;
    this.GetSellerDetails();
  }

  GetSellerDetails() {
    this.blocked = true;
    this.sellerDashboardService.getTkSellerDetails(this.tkSellerDashboardData).subscribe(result => {
      this.blocked = false;
      this.getTkSellerDetails = result.tkdata;
      this.TotalRecords = result.TotalRecords;
    });
  }

  onInitialization() {
    this.TotalSellerCount = 0;
    this.totalBIDCount = 0;
    this.sellerDashboardService.getTkSellerDashboard(this.tkSellerDashboardData).subscribe(result => {
      this.blocked = false;
      this.TotalSellerCount = result.TotalSellerCount;
      this.totalBIDCount = result.totalBIDCount;
      this.ExportSellerData = result.exportSellerDashboard;
      this.exportTotalBidData = result.exportTotalBid;
    });
  }

  onSelectSeller(event) {
    this.data.SellerId = event.CustomerId;
    this.sellerDashboardService.getZonesBySellerId(event.CustomerId).subscribe(x => {

      this.zones = [];
      x.forEach(element => {

        if (element.ZoneName != '') {
          this.zones.push(element);
        }
      });
    });
  }

  getSeLlerList(event) {
    if (event.query.length > 2) {
      this.sellerDashboardService.getSellerByName(event.query).subscribe(result => {
        this.sellerslist = result;
      });
    }
  }

  Search(data) {
    if (data.StartDate != null && data.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'End date is required !!', detail: '' });
    }
    else if (data.StartDate == null && data.EndDate != null) {
      this.messageService.add({ severity: 'error', summary: 'Start date is required !!', detail: '' });
    }
    else if (data.StartDate > data.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start date can not be greater than End date !', detail: '' });
    }
    else {
      this.blocked = true;
      this.tkSellerDashboardData = {
        SellerId: data.SellerId,
        City: data.city,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        Skip: 0,
        Take: this.PageSize,
      }
      this.onInitialization();
      this.GetSellerDetails();
    }
  }

  sellerdata() {
    this.expoerService.exportAsExcelFile(this.ExportSellerData, 'exportSellerData');
   // this.ngOnInit();
  }

  totalBiddata() {
    this.blocked = true;
    var arr = [];
    this.exportTotalBidData.forEach(x => {
      let obj: any = {
        CustomerId: x.Customer.CustomerId,
        Skcode: x.Customer.Skcode,
        ShopName: x.Customer.ShopName,
        City: x.Customer.City,
        Mobile: x.Customer.Mobile,
        Name: x.Customer.Name,
        ItemId: x.ItemId,
        ItemName: x.ItemName,
        Qty: x.Qty,
        Price: x.Price,
        OrderQty: x.OrderQty,
        MinSellQty: x.MinSellQty,
        BidType: x.BidType,
        BasePrice: x.BasePrice,
        MRP: x.MRP,
        ValidDays: x.ValidDays,
        SellingDistance: x.SellingDistance,
        Quantum: x.Quantum,
        SizeInQuantum: x.SizeInQuantum,
        CreatedDate: x.CreatedDate,
        Discount: x.Discount,
        UnitPrice: x.UnitPrice
      }
      arr.push(obj);
    })
    this.blocked = false;
    this.expoerService.exportAsExcelFile(arr, 'exportSellerBid');
   // this.ngOnInit();
  }

  exportSellerReport(data) {
    if (data.StartDate != null && data.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'End date is required !!', detail: '' });
    }
    else if (data.StartDate == null && data.EndDate != null) {
      this.messageService.add({ severity: 'error', summary: 'Start date is required !!', detail: '' });
    }
    else if (data.StartDate > data.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start date can not be greater than End date !', detail: '' });
    }
    else {
      this.blocked = true;
      this.tkSellerDashboardData = {
        SellerId: data.SellerId,
        City: data.city,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        Skip: 0,
        Take: this.TotalRecords,
      }
      this.sellerDashboardService.getTkSellerDetails(this.tkSellerDashboardData).subscribe(result => {
        this.blocked = false;
        this.ExportSellerData = result.tkdata;
        this.expoerService.exportAsExcelFile(this.ExportSellerData, 'exportSellerData');
        this.ngOnInit();
      })
    }
  }

}
