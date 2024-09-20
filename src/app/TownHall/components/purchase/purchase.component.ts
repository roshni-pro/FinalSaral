import { Component, OnInit } from '@angular/core';
import { TownhallService } from 'app/shared/services/townhall.service';
import { TownHallHelperService } from 'app/shared/services/town-hall-helper.service';
import { TownHallCommentsSection } from 'app/shared/interface/townHall/town-hall-comments-section';
import { TownHallCommentService } from 'app/shared/services/townHallService/town-hall-comment.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  poFillrateList: any[];
  orderFillrateList: any[];
  fillRateChartData: any[];

  fillRateChartOptions: any;
  fillRateChartLables: any[];
  fillRateChartColor: any[];
  lineChartLegend = true;
  lineChartType = 'line';




  inventoryDayChartData: any[] = [];
  inventoryDayChartLegend: boolean = true;
  inventoryDayChartColors: Array<any>;
  inventoryDayChartType: string = 'bar';
  inventoryDayChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false

  };
  inventoryDayChartLabels: string[] = [];
  inventoryData: any[];

  townHallCommentsSection: TownHallCommentsSection;
  isEditable: boolean;

  constructor(private townhallService: TownhallService, private townHallHelperService: TownHallHelperService, private townHallCommentService: TownHallCommentService) { }

  ngOnInit() {

    this.isEditable = false;
    this.townhallService.GetTownHallCommentsSection().subscribe(x => {
      this.townHallCommentsSection = x;
      console.log('this.townHallCommentsSection :', this.townHallCommentsSection );
      if(!this.townHallCommentsSection){
        this.townHallCommentsSection = this.townHallCommentService.getEmptyCommentObject();
      }         
    });

    //#region fill rate region starts
    this.fillRateChartLables = [];
    this.townhallService.GetTownHallData().subscribe(result => {
      this.townhallService.SetMonthName(result);
      this.poFillrateList = result.PoFillrates;
      console.log('poFillrateResult', result);
      this.orderFillrateList = result.OrderFillrates;
      this.makeFillRateChartData();
    //#endregion fill rate region starts

      this.inventoryData = result.InventoryDayDcs;
      this.setInventoryDaysChartColors();
      this.setInventoryDaysChartData();
    });

  }

  private makeFillRateChartData() {

    this.fillRateChartData = [
      { data: [], label: 'Order Fill Rate' },

    ];

    this.fillRateChartOptions = this.townHallHelperService.getDefaultChartOptions('Fill Rate Plots', 'Fill Rate Percentage', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
    let previousFillRateCount = 0;
    this.fillRateChartColor = this.townHallHelperService.getChartColor('#8ED59D', '#E2C279', '#f0654f', 0.1);

    this.orderFillrateList.forEach(x => {
      previousFillRateCount = x.fillrates.toFixed(2);
      x.fillrates = x.fillrates.toFixed(2);
      this.fillRateChartLables.push(x.MonthName);
      this.fillRateChartData[0].data.push(previousFillRateCount);
    });

    let poFillRate = { data: [], label: 'PO Fill Rate' };

    this.poFillrateList.forEach(x => {
      previousFillRateCount = x.fillrates.toFixed(2);
      x.fillrates = x.fillrates.toFixed(2);
      poFillRate.data.push(previousFillRateCount);
    });
    this.fillRateChartData.push(poFillRate);
  }

  private setInventoryDaysChartColors() {
    this.inventoryDayChartColors = [
      {

        backgroundColor: 'rgba(255, 141, 96, 0.8)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {

        backgroundColor: 'rgba(0, 157, 160, 0.8)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },

    ];

  }

  private setInventoryDaysChartData() {
    let chartData = { data: [], label: 'Inventory Days (In Lakh)' };
    if (this.inventoryData && this.inventoryData.length > 0) {
      this.inventoryData.forEach(x => {
        this.inventoryDayChartLabels.push(x.MonthName);
        x.Values = x.Values / 100000;
        x.Values = x.Values.toFixed(2);
        chartData.data.push(x.Values);
      });
    }
    this.inventoryDayChartData.push(chartData);
  }


  updateComment(){
    this.townhallService.SaveTownHallCommentsSection(this.townHallCommentsSection).subscribe(x => {
      console.log(' saved this.townHallCommentsSection:', this.townHallCommentsSection);
      this.ngOnInit();
    });
  }

}
