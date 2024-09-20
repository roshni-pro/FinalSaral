import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-activity-histroy',
  templateUrl: './activity-histroy.component.html',
  styleUrls: ['./activity-histroy.component.scss']
})
export class ActivityHistroyComponent implements OnInit {
  @Input() activityHistoryData : any;
  ActivityHistoryList:any[]=[]
  constructor() { }

  ngOnInit() {
    console.log(this.activityHistoryData,"activityHistoryData"); 
    this.ActivityHistoryList=this.activityHistoryData
  }

}
