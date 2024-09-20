import { Component, OnInit } from '@angular/core';
import { TownhallService } from 'app/shared/services/townhall.service';
import { TownHallHelperService } from 'app/shared/services/town-hall-helper.service';
import { TownHallCommentsSection } from 'app/shared/interface/townHall/town-hall-comments-section';
import { TownHallCommentService } from 'app/shared/services/townHallService/town-hall-comment.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  salesData: any[];

  lineChartLegend = true;
  lineChartType = 'line';

  kkSales: Array<any> = [];
  kkChartData: Array<any>;
  kkChartOptions: any;
  kkSalesDataLabel: any[];
  kkSalesChartColors: any[];

  onlineSales: Array<any> = [];
  onlineSalesChartData: Array<any>;
  onlineSalesChartOptions: any;
  onlineSalesDataLabel: any[];
  onlineSalesChartColors: any[];

  totalSales: Array<any> = [];
  totaleSalesChartData: Array<any>;
  totalSalesChartOptions: any;
  totalSalesDataLabel: any[];
  totalSalesChartColors: any[];

  orderAndKisanKiranaRetailers: Array<any> = [];
  orderAndKisanKiranaRetailersChartData: Array<any>;
  orderAndKisanKiranaRetailersChartOptions: any;
  orderAndKisanKiranaRetailersDataLabel: any[];
  orderAndKisanKiranaRetailersChartColors: any[];

  totalOrder: Array<any> = [];
  totalOrderChartData: Array<any>;
  totalOrderChartOptions: any;
  totalOrderDataLabel: any[];
  totalOrderChartColors: any[];

  orderedBrands: Array<any> = [];
  orderedBrandsChartData: Array<any>;
  orderedBrandsChartOptions: any;
  orderedBrandsDataLabel: any[];
  orderedBrandsChartColors: any[];

  townHallCommentsSection: TownHallCommentsSection;
  isEditable: boolean;

  constructor(private townhallService: TownhallService, private townhallHelperService: TownHallHelperService, private townHallCommentService: TownHallCommentService) { }

  ngOnInit() {
    this.isEditable = false;
    this.townhallService.GetTownHallCommentsSection().subscribe(x => {
      this.townHallCommentsSection = x;
      if(!this.townHallCommentsSection){
        this.townHallCommentsSection = this.townHallCommentService.getEmptyCommentObject();
      }         
    });

    this.townhallService.GetTownHallData().subscribe(result => {
      this.townhallService.SetMonthName(result);
      this.salesData = result.MonthlySaleDataDc;
      this.setKKAndOnlineSalesChartData();
    });
  }

  setLabel(lableName: string): any {
    let label = { data: [], label: lableName };
    if (this.salesData && this.salesData.length > 0) {
      this.salesData.forEach(item => {
        label.data.push(item.MonthName);
      });
    }
    return label.data;
  }


  setKKAndOnlineSalesChartData() {
    this.kkChartData = [
      { data: [], label: 'Kisan Kirana Sales' }
    ];
    this.onlineSalesChartData = [
      { data: [], label: 'Online Sales' }
    ];
    this.totaleSalesChartData = [
      { data: [], label: 'Total Sales' }
    ];

    this.orderAndKisanKiranaRetailersChartData = [
      { data: [], label: 'Total Retailers' },
      { data: [], label: 'Kisan Kirana Retailers' }
    ];

    this.totalOrderChartData = [
      { data: [], label: 'Total Orders' }
    ];

    this.orderedBrandsChartData = [
      { data: [], label: 'Total Brands' }
    ];

    this.kkSales = [];
    if (this.salesData && this.salesData.length > 0) {
      this.salesData.forEach(sale => {
        let onlineSale = (sale.OnlineSales / 10000000).toFixed(2);
        let kkSale = (sale.KisanKiranaSales / 100000).toFixed(2);
        let totalSale = (sale.TotalSales / 10000000).toFixed(2);
        this.kkSales.push({
          onlineSale: onlineSale,
          kkSale: kkSale,
          MonthName: sale.MonthName,
          TotalSales: totalSale,
          OrderRetailers: sale.OrderRetailers,
          KisanKiranaRetailers: sale.KisanKiranaRetailers,
          TotalOrders: sale.TotalOrders,
          OrderedBrands: sale.OrderedBrands
        });

        this.kkChartData[0].data.push(kkSale);
        this.onlineSalesChartData[0].data.push(onlineSale);
        this.totaleSalesChartData[0].data.push(totalSale);
        this.orderAndKisanKiranaRetailersChartData[0].data.push(sale.OrderRetailers);
        this.orderAndKisanKiranaRetailersChartData[1].data.push(sale.KisanKiranaRetailers);
        this.totalOrderChartData[0].data.push(sale.TotalOrders);
        this.orderedBrandsChartData[0].data.push(sale.OrderedBrands);
      });
    }
    this.kkSalesDataLabel = this.setLabel('Months');
    this.onlineSalesDataLabel = this.setLabel('Months');
    this.totalSalesDataLabel = this.setLabel('Months');
    this.orderAndKisanKiranaRetailersDataLabel = this.setLabel('Months');
    this.totalOrderDataLabel = this.setLabel('Months');
    this.orderedBrandsDataLabel = this.setLabel('Months');

    this.kkChartOptions = this.townhallHelperService.getDefaultChartOptions('Kisan Kirana Sales', 'Sales (in Lakhs)', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
    this.onlineSalesChartOptions = this.townhallHelperService.getDefaultChartOptions('Online Sales', 'Sales (in Crores)', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
    this.totalSalesChartOptions = this.townhallHelperService.getDefaultChartOptions('Total Sales', 'Sales (in Crores)', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
    this.orderAndKisanKiranaRetailersChartOptions = this.townhallHelperService.getDefaultChartOptions('Total & Kisan Kirana Retailers', 'Number of Retailers', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
    this.totalOrderChartOptions = this.townhallHelperService.getDefaultChartOptions('Total Orders', 'Number of Orders', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
    this.orderedBrandsChartOptions = this.townhallHelperService.getDefaultChartOptions('Total Brands', 'Number of Brands', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');

    this.kkSalesChartColors = this.townhallHelperService.getChartColor('#f22cc7', '#29f0c1', '#29f0c1', 0.1);
    this.onlineSalesChartColors = this.townhallHelperService.getChartColor('#379e5a', '#29f0c1', '#29f0c1', 0.1);
    this.totalSalesChartColors = this.townhallHelperService.getChartColor('#4955a3', '#29f0c1', '#29f0c1', 0.1);
    this.orderAndKisanKiranaRetailersChartColors = this.townhallHelperService.getChartColor('#4955a3', '#29f0c1', '#29f0c1', 0.1);
    this.totalOrderChartColors = this.townhallHelperService.getChartColor('#bd0404', '#29f0c1', '#29f0c1', 0.1);
    this.orderedBrandsChartColors = this.townhallHelperService.getChartColor('#5e5300', '#29f0c1', '#29f0c1', 0.1);
  }

  updateComment(){
    this.townhallService.SaveTownHallCommentsSection(this.townHallCommentsSection).subscribe(x => {
      console.log(' saved this.townHallCommentsSection:', this.townHallCommentsSection);
      this.ngOnInit();
    });
  }

}
