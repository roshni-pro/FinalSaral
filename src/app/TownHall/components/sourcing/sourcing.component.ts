import { Component, OnInit } from '@angular/core';
import { TownhallService } from 'app/shared/services/townhall.service';
import { TownHallHelperService } from 'app/shared/services/town-hall-helper.service';
import { TownHallCommentsSection } from 'app/shared/interface/townHall/town-hall-comments-section';
import { TownHallCommentService } from 'app/shared/services/townHallService/town-hall-comment.service';

@Component({
  selector: 'app-sourcing',
  templateUrl: './sourcing.component.html',
  styleUrls: ['./sourcing.component.scss']
})
export class SourcingComponent implements OnInit {
  ActiveSourcing: Array<any> = [];
  ActiveSourcingChartData: Array<any>;
  ActiveSourcingChartOptions: any;
  ActiveSourcingDataList: any[];
  ActiveSourcingChartColors: any[];

  ActiveItemChartData: Array<any>;
  ActiveItemChartOptions: any;

  ActiveItemsKK: Array<any> = [];
  ActiveItemsKKChartData: Array<any>;
  ActiveItemsKKChartOptions: any;
  ActiveItemsKKDataList: any[];
  ActiveItemsKKChartColors: any[];


  lineChartLegend = true;
  lineChartType = 'line';
  cols: any[];

  barChartType = 'bar';
  barChartLegend = true;

  townHallCommentsSection: TownHallCommentsSection;
  isEditable: boolean;

  constructor(private townhallservice: TownhallService, private townHallHelperService: TownHallHelperService,private townHallCommentService: TownHallCommentService) { }

  ngOnInit() {
    this.isEditable = false;
    this.townhallservice.GetTownHallCommentsSection().subscribe(x => {
      this.townHallCommentsSection = x;
      if(!this.townHallCommentsSection){
        this.townHallCommentsSection = this.townHallCommentService.getEmptyCommentObject();
      }         
    });
    
    this.townhallservice.GetTownHallData().subscribe(result => {
      this.townhallservice.SetMonthName(result);
      this.ActiveSourcingDataList = result.ActiveSourcingDcs;
      this.ActiveSourcingChartData = [
        // { data: [], label: 'Active Items' },
        { data: [], label: 'Active Brand' },
        { data: [], label: 'Active Vendors' },

      ];
      this.ActiveItemChartData = [
        { data: [], label: 'Active Items' },
      ];
      this.ActiveSourcing = [];
      this.ActiveSourcingChartOptions = this.townHallHelperService.getDefaultChartOptions('Active Brands and Vendors Plots', 'Count', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
      this.ActiveItemChartOptions = this.townHallHelperService.getDefaultChartOptions('Active Items Plots', 'Count', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
      let previousKppCount = 0;
      this.ActiveSourcingChartColors = this.townHallHelperService.getChartColor('#00A5A8', '#FF7D4D', '#452aa8');
      for (var i in this.ActiveSourcingDataList) {
        // previousKppCount += this.ActiveSourcingDataList[i].TotalActiveAgent;
        // this.ActiveSourcingDataList[i].SumOfAllKPP = previousKppCount;
        this.ActiveItemChartData[0].data.push(this.ActiveSourcingDataList[i].ActiveItems);
        this.ActiveSourcingChartData[0].data.push(this.ActiveSourcingDataList[i].ActiveBrand);
        this.ActiveSourcingChartData[1].data.push(this.ActiveSourcingDataList[i].ActiveVendors);
        this.ActiveSourcing.push(this.ActiveSourcingDataList[i].MonthName);
      }

      this.ActiveItemsKKDataList = result.ActiveKKSourcingDcs;
      this.ActiveItemsKKChartData = [
        { data: [], label: 'Active Items Kissan Kirana' },


      ];
      this.ActiveItemsKK = [];

      this.ActiveItemsKKChartOptions = this.townHallHelperService.getDefaultChartOptions('Active Items Kissan Kirana Plots', 'Active ITem', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
      previousKppCount = 0;
      this.ActiveItemsKKChartColors = this.townHallHelperService.getChartColor('#452aa8', '#FF7D4D', '#f0654f');
      for (var i in this.ActiveItemsKKDataList) {
        // previousKppCount += this. ActiveItemsKKDataList[i].TotalActiveAgent;
        // this. ActiveItemsKKDataList[i].SumOfAllKPP = previousKppCount;
        this.ActiveItemsKKChartData[0].data.push(this.ActiveItemsKKDataList[i].ActiveItemsKK);

        this.ActiveItemsKK.push(this.ActiveItemsKKDataList[i].MonthName);
      }
    });
  }

  updateComment(){
    this.townhallservice.SaveTownHallCommentsSection(this.townHallCommentsSection).subscribe(x => {
      console.log(' saved this.townHallCommentsSection:', this.townHallCommentsSection);
      this.ngOnInit();
    });
  }

}
