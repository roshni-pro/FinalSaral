import { Component, OnInit } from '@angular/core';
import { TownhallService } from 'app/shared/services/townhall.service';
import { TownHallHelperService } from 'app/shared/services/town-hall-helper.service';
import { TownHallCommentsSection } from 'app/shared/interface/townHall/town-hall-comments-section';
import { TownHallCommentService } from 'app/shared/services/townHallService/town-hall-comment.service';

@Component({
  selector: 'app-customerdelight',
  templateUrl: './customerdelight.component.html',
  styleUrls: ['./customerdelight.component.scss']
})
export class CustomerdelightComponent {
  activeStores: Array<any> = [];
  ActiveVarifiedStoresChartData: Array<any>;
  ActiveVarifiedStoresChartOptions: any;
  ActiveVarifiedStoresDataList: any[];
  ActiveVarifiedStoresChartColors: any[];

  DPAdded: Array<any> = [];
  DPAddedChartData: Array<any>;
  DPAddedChartOptions: any;
  DPAddedDataList: any[];
  DPAddedChartColors: any[];

  CRMlevel: Array<any> = [];
  CRMlevelChartData: any[] = [];
  CRMlevelChartLegend: boolean = true;
  CRMlevelChartColors: Array<any>;
  CRMlevelChartType: string = 'bar';
  CRMlevelChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false

  };
  CRMlevelChartLabels: string[] = [];
  CRMlevelDataList: any[];

  lineChartLegend = true;
  lineChartType = 'line';
  cols: any[];

  // barChartType = 'bar';
  // barChartLegend = true;

  townHallCommentsSection: TownHallCommentsSection;
  isEditable: boolean;

  constructor(private townhallservice: TownhallService, private townHallHelperService: TownHallHelperService, private townHallCommentService: TownHallCommentService) { };
  ngOnInit() {
    this.isEditable = false;
    this.townhallservice.GetTownHallCommentsSection().subscribe(x => {
    
      this.townHallCommentsSection = x;
      console.log(' saved this.townHallCommentsSection:', this.townHallCommentsSection);
      if (!this.townHallCommentsSection) {
        this.townHallCommentsSection = this.townHallCommentService.getEmptyCommentObject();
        
      }
    });

    this.townhallservice.GetTownHallData().subscribe(result => {
      this.townhallservice.SetMonthName(result);
      this.ActiveVarifiedStoresDataList = result.ActiveVarifiedStoresDcs;
      console.log('GetAgent is :', result);
      this.ActiveVarifiedStoresChartData = [
        { data: [], label: 'Active Stores' },
        { data: [], label: 'Verified Stores' },

      ];
      this.activeStores = [];

      this.ActiveVarifiedStoresChartOptions = this.townHallHelperService.getDefaultChartOptions('Active and Verified Stores Plots', 'Stores Count', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');

      this.ActiveVarifiedStoresChartColors = this.townHallHelperService.getChartColor('#00A5A8', '#FF7D4D', '#f0654f');
      let activeStores = 0;
      let varifiedStores = 0;
      for (var i in this.ActiveVarifiedStoresDataList) {
        activeStores += this.ActiveVarifiedStoresDataList[i].ActiveStores;
        varifiedStores += this.ActiveVarifiedStoresDataList[i].VarifiedStores;
        this.ActiveVarifiedStoresChartData[0].data.push(activeStores);
        this.ActiveVarifiedStoresChartData[1].data.push(varifiedStores);
        this.activeStores.push(this.ActiveVarifiedStoresDataList[i].MonthName);
        this.ActiveVarifiedStoresDataList[i].TotalActiveStores = activeStores;
        this.ActiveVarifiedStoresDataList[i].TotalVarifiedStores = varifiedStores;
      }

      this.DPAddedDataList = result.DPaddedusedDcs;
      console.log('GetAgent is :', result);
      this.DPAddedChartData = [
        { data: [], label: 'Points Added' },
        { data: [], label: 'Points Used' },

      ];
      this.DPAdded = [];

      this.DPAddedChartOptions = this.townHallHelperService.getDefaultChartOptions('DP Added Plots', 'DP Count', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
      this.DPAddedChartColors = this.townHallHelperService.getChartColor('#00A5A8', '#FF7D4D', '#f0654f');
      for (var i in this.DPAddedDataList) {
        this.DPAddedChartData[0].data.push(this.DPAddedDataList[i].PointsAdded);
        this.DPAddedChartData[1].data.push(this.DPAddedDataList[i].PointsUsed);
        this.DPAdded.push(this.DPAddedDataList[i].MonthName);
      }

      this.CRMlevelDataList = result.CRMlevelDcs;
      console.log('GetAgent is :', result);
      this.CRMlevelChartData = [
        { data: [], label: 'CRMlevel 0' },
        { data: [], label: 'CRMlevel 1' },
        { data: [], label: 'CRMlevel 2' },
        { data: [], label: 'CRMlevel 3' },
        { data: [], label: 'CRMlevel 4' },
        { data: [], label: 'CRMlevel 5' },


      ];
      this.CRMlevel = [];

      // this.CRMlevelChartOptions = this.townHallHelperService.getDefaultChartOptions('CRM level Plots', 'Count', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
      this.setCRMlevelChartColors();
      for (var i in this.CRMlevelDataList) {
        this.CRMlevelChartData[0].data.push(this.CRMlevelDataList[i].L0Count);
        this.CRMlevelChartData[1].data.push(this.CRMlevelDataList[i].L1Count);
        this.CRMlevelChartData[2].data.push(this.CRMlevelDataList[i].L2Count);
        this.CRMlevelChartData[3].data.push(this.CRMlevelDataList[i].L3Count);
        this.CRMlevelChartData[4].data.push(this.CRMlevelDataList[i].L4Count);
        this.CRMlevelChartData[5].data.push(this.CRMlevelDataList[i].L5Count);
        this.CRMlevel.push(this.CRMlevelDataList[i].MonthName);
      }
    });



  }
  setCRMlevelChartColors() {
    this.CRMlevelChartColors = [
      {

        backgroundColor: 'rgba(0, 157, 160, 0.8)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {

        backgroundColor: 'rgba(255, 141, 96, 0.8)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {

        backgroundColor: 'rgba(204, 0, 0, 0.8)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {

        backgroundColor: 'rgba(255, 204, 0,0.8)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {

        backgroundColor: 'rgba(55, 102, 204,0.8)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {

        backgroundColor: 'rgba(153, 0, 51 ,0.8)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
    ];

  }

  updateComment() {
    this.townhallservice.SaveTownHallCommentsSection(this.townHallCommentsSection).subscribe(x => {
      this.ngOnInit();
    });
  }

}




