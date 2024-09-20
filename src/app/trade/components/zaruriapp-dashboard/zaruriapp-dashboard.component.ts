import { Component, OnInit } from '@angular/core';
import { TradeDashboardFilters } from 'app/shared/interface/trade/trade-dashboard-filters';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { ZaruriAppdashboardFilter } from 'app/shared/interface/trade/ZaruriAppdashboardFilter';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import { window } from 'rxjs/operators';

@Component({
  selector: 'app-zaruriapp-dashboard',
  templateUrl: './zaruriapp-dashboard.component.html',
  styleUrls: ['./zaruriapp-dashboard.component.scss']
})
export class ZaruriappDashboardComponent implements OnInit {
  //zaruridashboard:any;
  zaruriAppdashboardFilter: ZaruriAppdashboardFilter;
  blocked: boolean;
  CategoryList: any[];
  cityList: any[];
  DashboardList: any;
  isSearch: boolean;
  sellerslist: any[];
  zones = [];
  idnotexist:boolean;
  data:any;
  text:any;

  constructor(private ItemServices: TradeitemmasterService, private consumerOrderService: OrderAssignmentsService) {
    this.DashboardList = {};
    this.data={};
  }

  ngOnInit() {
    this.data.SellerId=null;
    this.text='';
    this.zaruriAppdashboardFilter = {
      City: "",
      categoryid: null,
      SellerId: null
    }
    // this.ItemServices.SelectCategoryV2().subscribe(result => {
    //   this.CategoryList = result;
    // });

    // this.ItemServices.SelectCity().subscribe(result => {

    //   //this.cityList =result;
    //   this.cityList = result.filter(x => x == "Indore" || x.startsWith('Jaipur'));
    // });
    this.blocked = false;
    this.getSelletsList();
    this.OnInitialization(this.zaruriAppdashboardFilter);

  }

  OnInitialization(zaruriAppdashboardFilter) {
    this.blocked = true;
    this.DashboardList.DailyplacedOrders = 0;
    this.DashboardList.DailySale = 0;
    this.DashboardList.DailydeliveredOrders = 0;
    this.DashboardList.DailydeliveredSale = 0;
    this.DashboardList.MonthlyplacedOrders = 0;
    this.DashboardList.MonthlySale = 0;
    this.DashboardList.MonthlydeliveredOrders = 0;
    this.DashboardList.MonthlydeliveredSale = 0;
    this.DashboardList.OverallplacedOrders = 0;
    this.DashboardList.OverallSale = 0;
    this.DashboardList.OveralldeliveredOrders = 0;
    this.DashboardList.OveralldeliveredSale = 0;

    this.ItemServices.GetZaruriAppDashboard(zaruriAppdashboardFilter).subscribe(result => {
      this.blocked = false;
      this.DashboardList = result;
      this.data.SellerId=null;
      // console.log("this.DashboardList", this.DashboardList);
      this.DashboardList.OverallSale = (this.DashboardList.OverallSale / 10000000);
      this.DashboardList.OveralldeliveredSale = (this.DashboardList.OveralldeliveredSale / 10000000);

      this.DashboardList.MonthlySale = (this.DashboardList.MonthlySale / 10000000);
      this.DashboardList.MonthlydeliveredSale = (this.DashboardList.MonthlydeliveredSale / 10000000);

      this.DashboardList.DailySale = (this.DashboardList.DailySale / 10000000);
      this.DashboardList.DailydeliveredSale = (this.DashboardList.DailydeliveredSale / 10000000);
    });
  }

  onSearch() {
    //this.selectedList = []
    if (!this.data.SellerId) {
      this.idnotexist = true;
    }
    else {
      this.idnotexist = false;
      this.zaruriAppdashboardFilter=
      {
        SellerId:this.data.SellerId,
        City:null,
        categoryid:null
      }
      this.OnInitialization(this.zaruriAppdashboardFilter);
    }
    
  }

  getSelletsList() {
    this.consumerOrderService.getAllSellers().subscribe(result => {

      this.sellerslist = result;
      this.sellerslist.forEach(element => {
        if (element.CustomerName == "") {

          this.sellerslist.splice(this.sellerslist.findIndex(seller => seller.CustomerId == element.CustomerId), 1);
        }
      });
      this.sellerslist.sort(function (a, b) {
        if (a.CustomerName < b.CustomerName) { return -1; }
        if (a.CustomerName > b.CustomerName) { return 1; }
        return 0;
      })

    });
  }

  onSelectSeller(event) {
    this.data.SellerId = event.CustomerId;

    this.consumerOrderService.getZonesBySellerId(event.CustomerId).subscribe(x => {

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
      this.consumerOrderService.getSellerByName(event.query).subscribe(result => {
        this.sellerslist = result;
      });
    }
  }

  onCityClick(selectedCity) {
    this.sellerslist=[];
    // this.zaruriAppdashboardFilter.City = selectedCity;
    // this.OnInitialization(this.zaruriAppdashboardFilter);
    this.ngOnInit();
  }

  oncatClick(selectedcategory) {
    this.zaruriAppdashboardFilter.categoryid = selectedcategory;
    this.OnInitialization(this.zaruriAppdashboardFilter);

  }

  onSellerClick(SelectedsellerId) {
    this.zaruriAppdashboardFilter.SellerId = SelectedsellerId;
    this.OnInitialization(this.zaruriAppdashboardFilter);

  }
  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {

      this.isSearch = true;
    }
  }

}
