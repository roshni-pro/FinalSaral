import { Component, OnInit, Input } from '@angular/core';
import { TownhallService } from 'app/shared/services/townhall.service';
import * as moment from 'moment';
import { TownHallHelperService } from 'app/shared/services/town-hall-helper.service';
import { TownHallCommentsSection } from 'app/shared/interface/townHall/town-hall-comments-section';
import { TownHallCommentService } from 'app/shared/services/townHallService/town-hall-comment.service';


@Component({
  selector: 'app-agent-kpp',
  templateUrl: './agent-kpp.component.html',
  styleUrls: ['./agent-kpp.component.scss']
})
export class AgentKPPComponent implements OnInit {

  @Input() barChartData: Array<any>;

  agentKPPs: Array<any> = [];
  agentKPPChartData: Array<any>;
  agentKPPChartOptions: any;
  agentKPPDataList: any[];
  agentKPPChartColors: any[];


  activeKPPChartData: Array<any>;
  activeKPPLabels: Array<any> = [];
  activeKPPChartOptions: any;
  activekpp: any[];
  activeKppChartColors: any[];

  activeClusterChartData: Array<any>;
  activeClusterChartLabels: Array<any> = [];
  activeClusterOptions: any;
  activeClusterChartColors: any[];

  lineChartLabels4: Array<any> = [];
  barChartLabels: Array<any> = [];


  agentcluster: any[];
  lineChartLegend = true;
  lineChartType = 'line';
  cols: any[];
  barChartType = 'bar';
  barChartLegend = true;
  agentkpp: any[];
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false

  };
  barChartColors: Array<any> = [
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
    {

      backgroundColor: 'rgba(81,117,224,.6)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },


  ];


  townHallCommentsSection: TownHallCommentsSection;
  isEditable: boolean;

  constructor(private townhallservice: TownhallService, private townHallHelperService: TownHallHelperService, private townHallCommentService: TownHallCommentService) { };

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
      //#region Agent Kpp region
      this.agentKPPDataList = result.ActiveAgents;
      console.log('GetAgent is :', result);
      this.agentKPPChartData = [
        { data: [], label: 'TotalActiveAgent' },

      ];
      this.agentKPPs = [];

      this.agentKPPChartOptions = this.townHallHelperService.getDefaultChartOptions('Agent KPP Plots', 'KPP Count', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
      let previousKppCount = 0;
      this.agentKPPChartColors = this.townHallHelperService.getChartColor('#f0654f', '#f0654f', '#f0654f');
      for (var i in this.agentKPPDataList) {
        previousKppCount += this.agentKPPDataList[i].TotalActiveAgent;
        this.agentKPPDataList[i].SumOfAllKPP = previousKppCount;
        this.agentKPPChartData[0].data.push(previousKppCount);
        this.agentKPPs.push(this.agentKPPDataList[i].MonthName);
      }

      //#endregion  

      //#region active kpp region

      this.activekpp = result.ActiveKpps;
      this.activeKPPChartData = [
        { data: [], label: 'TotalActivekpp' },
      ];
      this.activeKPPLabels = [];
      previousKppCount = 0;
      this.activeKppChartColors = this.townHallHelperService.getChartColor('#452aa8', '#29f0c1', '#29f0c1');
      this.activeKPPChartOptions = this.townHallHelperService.getDefaultChartOptions('Active KPP Plots', 'KPP Count', 'Months', '#14131a', '#f4e1f5', '#dedede');
      for (var i in this.activekpp) {
        previousKppCount += this.activekpp[i].TotalActivekpp;
        this.activekpp[i].SumOfAllKPP = previousKppCount;
        this.activeKPPChartData[0].data.push(previousKppCount);
        this.activeKPPLabels.push(this.activekpp[i].MonthName);
      }
      console.log(' this.activeKPPChartData: ', this.activeKPPChartData);

      //#endregion

      //#region active clusters  

      this.agentcluster = result.ActiveClusters;
      this.activeClusterChartData = [
        { data: [], label: 'TotalActiveCluster' },
      ];
      this.activeClusterChartLabels = [];
      var activeC = 0;
      this.activeClusterChartColors = this.townHallHelperService.getChartColor('#f22cc7', '#29f0c1', '#29f0c1');
      this.activeClusterOptions = this.townHallHelperService.getDefaultChartOptions('Active KPP Plots', 'KPP Count', 'Months', '#14131a', '#f4e1f5', '#dedede');

      for (var i in this.agentcluster) {
        activeC += this.agentcluster[i].TotalActiveCluster;
        this.agentcluster[i].SumOfAllKPP = activeC;
        this.activeClusterChartData[0].data.push(activeC);
        this.activeClusterChartLabels.push(this.agentcluster[i].MonthName);
      }
    });
    //#endregion
  }


  updateComment(){
    this.townhallservice.SaveTownHallCommentsSection(this.townHallCommentsSection).subscribe(x => {
      console.log(' saved this.townHallCommentsSection:', this.townHallCommentsSection);
      this.ngOnInit();
    });
  }


}




