import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-delight',
  templateUrl: './customer-delight.component.html',
  styleUrls: ['./customer-delight.component.scss']
})
export class CustomerDelightComponent implements OnInit {
  lineChartData: any[];
  lineChartLabels: any[];
  lineChartOptions: any = {
    animation: {
      duration: 1000, // general animation time
      easing: 'easeOutBack'
    },
    hover: {
      animationDuration: 1000, // duration of animations when hovering an item
      mode: 'label'
    },
    responsiveAnimationDuration: 1000, // animation duration after a resize
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          color: "#f3f3f3",
          drawTicks: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          color: "#f3f3f3",
          drawTicks: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    },
    title: {
      display: true,
      text: 'Customer Delight'
    }
  };
  lineChartColors: Array<any> = [
    {
      lineTension: 0,
      fill: false,
      borderColor: "#7d4dff",
      pointBorderColor: "#7d4dff",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointRadius: 4,
    },
    {
      lineTension: 0,
      fill: false,
      borderColor: "#FF7D4D",
      pointBorderColor: "#FF7D4D",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointRadius: 4,
    },
    {
      lineTension: 0,
      fill: false,
      borderColor: "#4dff7d",
      pointBorderColor: "#4dff7d",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointRadius: 4,
    },


  ];
  lineChartLegend = true;
  lineChartType = 'line';
  

  constructor() { }

  ngOnInit() {
    this.lineChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40, 84, 62], label: 'My First dataset' },
      { data: [28, 48, 40, 19, 86, 27, 90, 25, 56], label: 'My Second dataset' },
      { data: [45, 25, 16, 36, 67, 18, 76, 59, 80], label: 'My Third dataset' }
    ];

    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];

  }

}
