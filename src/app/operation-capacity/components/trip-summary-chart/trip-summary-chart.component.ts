import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-summary-chart',
  templateUrl: './trip-summary-chart.component.html',
  styleUrls: ['./trip-summary-chart.component.scss']
})
export class TripSummaryChartComponent implements OnInit {
  @Input() inputData: any;
  @Input() pieOrderChart : any;
  data: any;
  chartOptions: any;
  val2: string = 'Option 2';
  constructor() {

    this.chartOptions = {
      legend: { display: false }
    };
  }

  ngOnInit() {
    setTimeout(() => {
      this.data = this.inputData
    }, 1000);
  }

}
