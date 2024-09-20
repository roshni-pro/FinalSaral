import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MonthEndService } from 'app/report/services/month-end.service'; 

@Component({
  selector: 'app-month-end-data',
  templateUrl: './month-end-data.component.html',
  styleUrls: ['./month-end-data.component.scss']
})
export class MonthEndDataComponent implements OnInit {
  monthYearValue:any;
  monthEndList:any;
  monthVal:any;
  yearVal:any;
  month:any;
  year:any;
  formattedMonth:string;
  constructor(private _service:MonthEndService) { }

  ngOnInit() {
    this.month=new Date().getMonth()+1;
    this.year=new Date().getFullYear();
    this.formattedMonth = moment(this.month, 'MM').format('MMMM');
    this.getSearchRecord(this.month,this.year);
  }

  getSearchRecord(month,year){
    if(this.month>0 && this.year>0){
      this._service.getMonthEndData(month,year).subscribe(res => {
        if(res.length>0){
          if(res[0].Key == 'No record found!!' && res[0].Value == 'No record found!!'){
            this.monthEndList = [];
          }else{
            this.monthEndList = res;
            console.log(this.monthEndList);
          }
        }
      })
    }
  }
} 
