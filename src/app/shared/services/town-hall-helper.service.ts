import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TownHallHelperService {

  constructor() { }

  public getDefaultChartOptions(title: string, yAxisText: string, xAxisText: string, color: string, xGridColor: string, yGridColor: string): any {
    return {
      animation: {
        duration: 1000,
        easing: 'easeOutBack'
      },
      hover: {
        animationDuration: 1000,
        mode: 'label'
      },
      responsiveAnimationDuration: 1000,
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
      },
      tooltips: {
        mode: 'label',
        intersect: false,
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            color: xGridColor,
            drawTicks: false,
          },
          scaleLabel: {
            display: true,
            labelString: xAxisText
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            color: yGridColor,
            drawTicks: false,
          },
          scaleLabel: {
            display: true,
            labelString: yAxisText
          }
        }]
      },
      title: {
        display: true,
        text: title
      }
    };
  };

  public getChartColor(color1: string, color2: string, color3: string, lineTension: number = 0.5): any {
    let colorArray = [
      {

        fill: false,
        lineTension: lineTension,
        borderColor: color1,
        pointBorderColor: color1,
        pointBackgroundColor: "#FFF",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 8,
        pointRadius: 7,
      },
      {

        fill: false,
        lineTension:lineTension,
        borderColor: color2,
        pointBorderColor: color2,
        pointBackgroundColor: "#FFF",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
      },
      {
        lineTension: lineTension,
        fill: false,
        borderColor: color3,
        pointBorderColor: color3,
        pointBackgroundColor: "#FFF",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
      },

    ];

    return colorArray;
  }

}
