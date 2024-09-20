import { Component, OnInit } from '@angular/core';
import { TownhallService } from 'app/shared/services/townhall.service';
import { TownHallHelperService } from 'app/shared/services/town-hall-helper.service';
import { TownHallCommentsSection } from 'app/shared/interface/townHall/town-hall-comments-section';
import { TownHallCommentService } from 'app/shared/services/townHallService/town-hall-comment.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  lineChartLegend = true;
  lineChartType = 'line';

  postCancellationData: any[];
  postCancellationChartData: Array<any>;
  postCancellationChartOptions: any;
  postCancellationDataLabel: any[];
  postCancellationChartColors: any[];

  tatData: any;
  tatChartData: Array<any>;
  tatChartOptions: any;
  tatDataLabel: any[];
  tatChartColors: any[];

  
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
      this.postCancellationData = result.TownHallPostCancellationDcs;
      console.log('this.postCancellationData: ', this.postCancellationData);
      this.setPostCancellationChartData();
    
      this.tatData = result.TATinHrsDc;
      console.log('this.tatData: ', this.tatData);
      this.setTATData();
    })
  }

  setLabel(lableName: string): any {
    let label = { data: [], label: lableName };
    if (this.postCancellationData && this.postCancellationData.length > 0) {
      this.postCancellationData.forEach(item => {
        label.data.push(item.MonthName);
      });
    }
    return label.data;
  }

  setPostCancellationChartData() {
    this.postCancellationChartData = [
      { data: [], label: 'Cancel Orders' }
    ];
    
    if (this.postCancellationData && this.postCancellationData.length > 0) {
      this.postCancellationData.forEach(order => {
        let postCancellation = order.PostCancellation;
        this.postCancellationChartData[0].data.push(postCancellation);
      });
    }
    this.postCancellationDataLabel = this.setLabel('Months');
    this.postCancellationChartOptions = this.townhallHelperService.getDefaultChartOptions('Cancel Order', 'Orders Percentage', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
    this.postCancellationChartColors = this.townhallHelperService.getChartColor('#f22cc7', '#29f0c1', '#29f0c1', 0.1);
  
  }

  setTATData() {
    this.tatChartData = [
      { data: [], label: 'Cancel Orders' }
    ];
    
    if (this.tatData && this.tatData.length > 0) {
      this.tatData.forEach(order => {
        let TATinHrs = order.TATinHrs;
        this.tatChartData[0].data.push(TATinHrs);
      });
    }
    this.tatDataLabel = this.setLabel('Months');
    this.tatChartOptions = this.townhallHelperService.getDefaultChartOptions('Cancel Order', 'Orders Percentage', 'Months', '#FF7D4D', '#f3f3f3', '#dedede');
    this.tatChartColors = this.townhallHelperService.getChartColor('#106137', '#29f0c1', '#29f0c1', 0.1);
  
  }

  
  updateComment(){
    this.townhallService.SaveTownHallCommentsSection(this.townHallCommentsSection).subscribe(x => {
      console.log(' saved this.townHallCommentsSection:', this.townHallCommentsSection);
      this.ngOnInit();
    });
  }


}
