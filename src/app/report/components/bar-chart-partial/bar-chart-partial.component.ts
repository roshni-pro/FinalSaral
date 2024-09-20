import { Component, Input, OnInit } from '@angular/core';
import { AnyRecordWithTtl } from 'dns';

@Component({
  selector: 'app-bar-chart-partial',
  templateUrl: './bar-chart-partial.component.html',
  styleUrls: ['./bar-chart-partial.component.scss']
})
export class BarChartPartialComponent implements OnInit {
  @Input() chartId: string;
  @Input() cards: any;
  optionChart: any;
  constructor() { }

  ngOnInit() {
    // console.log('this.cards', this.cards);
    this.init();
  }


  init() {


    let self1 = this.chartId;
    let card = this.cards;
    const customTooltips = function (tooltip) {
      // debugger
      // console.log('card: ', card);
      // console.log('tooltip: ', tooltip);
      let target = null;
      if (tooltip.dataPoints && tooltip.dataPoints.length > 0) {
        target = card.Target.filter(x => {
          return x.monthName == tooltip.dataPoints[0].label
        })[0];
      }


      // Tooltip Element
      let tooltipEl = document.getElementById(self1);
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = self1;
        tooltipEl.className = 'annn';
        tooltipEl.innerHTML = '<table></table>';
        this._chart.canvas.parentNode.appendChild(tooltipEl);
      }
      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.classList.remove('opc');
        tooltipEl.classList.add('rmv');

        tooltipEl.style.opacity = 0 as any;
        return;
      }
      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      tooltipEl.classList.add('opc');
      tooltipEl.classList.remove('rmv');
      if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }
      function getBody(bodyItem) {
        return bodyItem.lines;
      }
      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(getBody);
        let innerHtml = '<tbody>';
        // titleLines.forEach(function (title) {
        //   innerHtml += '<tr><th>' + title + '</th></tr>';
        // });
        // innerHtml += '<tbody>';
        bodyLines.forEach(function (body, i) {
          const colors = tooltip.labelColors[i];
          let style = 'background:' + colors.backgroundColor;
          style += '; border-color:' + colors.borderColor;
          style += '; border-width: 2px';
          const span = '<span class="chartjs-tooltip-key" style="' +
            style +
            '"></span>';
          innerHtml += '<tr><td>' + 'Target' + '</td><td>' + target.PlannedValue + '</td></tr>';
          innerHtml += '<tr><td>' + 'Achieved' + '</td><td>' + target.AchievedValue + '</td></tr>';
          innerHtml += '<tr><td>' + 'Achieved %' + '</td><td>' + target.AchievedPercent + '</td></tr>';
        });
        innerHtml += '</tbody>';
        const tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }
      const positionY = this._chart.canvas.offsetTop;
      const positionX = this._chart.canvas.offsetLeft;
      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1 as any;
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY - 120 + 'px';
      tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
      tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
      tooltipEl.style.padding = tooltip.yPadding +
        'px ' +
        tooltip.xPadding +
        'px';
    };

    this.optionChart = {
      //maintainAspectRatio: false,
      responsiveAnimationDuration: 0,
      responsive: false,
      maintainAspectRatio: false,
      // scales: {
      //   yAxes: [
      //     {
      //       stacked: true,
      //       ticks: {
      //         beginAtZero: true,
      //       },
      //       gridLines: {
      //         display: true,
      //         color: 'rgba(255,99,132,0.2)',
      //       },
      //     },
      //   ],
      //   xAxes: [
      //     {
      //       stacked: true,
      //       ticks: {
      //         // beginAtZero: true,
      //       },
      //       gridLines: {
      //         display: false,
      //       },
      //     },
      //   ],
      // },


      scales: {
        yAxes: [
          {
            display: false,
            scaleLabel: {
              show: false,
            },

            gridLines: {
              display: false,
              color: "rgba(0, 0, 0, 0)",
            }
            // ticks: {
            //   beginAtZero: true,
            //   max: 100,
            //   min: 0
            // }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
              color: "rgba(0, 0, 0, 0)",
            }
            // display: true,
            // ticks: {
            //   display: false,
            //   beginAtZero: 0
            // }
          }
        ]
      },



      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
        mode: 'index',
        position: 'nearest',
        custom: customTooltips,

      },
    };

  }



}
