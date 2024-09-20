import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {OrderService} from 'app/shared/services/order.service';
import * as moment from 'moment';


@Component({
  selector: 'app-customer-trends',
  templateUrl: './customer-trends.component.html',
  styleUrls: ['./customer-trends.component.scss']
})
export class CustomerTrendsComponent implements OnChanges {
  @Input() details:any;

  @Input() lineChartData: Array<any>;

  @Input() lineChartLabels: Array<any> = [];

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
          labelString: 'Order Dates',
          lineHeight: 2
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
          labelString: 'Amount'
        }
      }]
    },
    title: {
      display: true,
      text: 'Order Analysis'
    }
  };

  lineChartColors: Array<any> = [
    {
      lineTension: 0,      
      fill: false,
      borderColor: "#00A5A8",
      pointBorderColor: "#00A5A8",
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
  
  ];

  lineChartLegend = true;
  lineChartType = 'line';
  lastTenOrders: any[];
  customerOrders: any[];
  cols: any[];

  constructor( private orderService: OrderService) { 
    this.lastTenOrders = [];
  }

  ngOnChanges(){
    this.cols = [
      {field: 'CreatedDate', header: 'Created Date'},
      {field: 'TotalAmount', header: 'Total Amount'},
      {field: 'invoice_no', header: 'Invoice No.'},
    ]

    this.orderService.GetByCustomerId(this.details.CustomerId).subscribe(result => {
      this.customerOrders = result;
      this.lineChartData= [
        { data: [], label: 'Total Amount' },
        { data: [], label: 'Saving Amount' }
      ];
      this.lineChartLabels = [];
      this.lastTenOrders = [];
  
      for(var i in this.customerOrders){
        this.lineChartData[0].data.push(this.customerOrders[i].TotalAmount);
        this.lineChartData[1].data.push(this.customerOrders[i].Savingamount);
        this.lineChartLabels.push(this.customerOrders[i].CreatedDate ? moment(this.customerOrders[i].CreatedDate).format('DD/MM/YYYY') : null);
      }
      for(var k=this.customerOrders.length-1; k>=0 && k>=this.customerOrders.length - 10; k--){
        this.lastTenOrders.push(this.customerOrders[k]);
      }
      console.log(this.lastTenOrders);
    });

    

    
  }
  
  ngOnInit(){

  }
  

}
