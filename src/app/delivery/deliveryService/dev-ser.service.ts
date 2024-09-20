import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevSerService {

  summaryData: any;

  constructor() { }

  saveRowData(data){
    if(data){
      this.summaryData = data;
      // console.log(this.summaryData);
      localStorage.setItem('summaryData', JSON.stringify(this.summaryData));
    }
  }

  getSummaryRowData(){

    //console.log(JSON.parse(localStorage.getItem('summaryData')));
    var getData = JSON.parse(localStorage.getItem('summaryData'));
    return getData;
  }

}
