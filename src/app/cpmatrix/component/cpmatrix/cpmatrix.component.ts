import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessageService } from 'primeng/api';
import { CpmatrixService } from 'app/shared/services/cpmatrix.service';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-cpmatrix',
  templateUrl: './cpmatrix.component.html',
  styleUrls: ['./cpmatrix.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  providers: [DatePipe]
})
export class CPMatrixComponent implements OnInit {

  CategoryName: any[];
  FinalData: any;
  years: any[];
  cityList: any[];
  isInvalid: boolean;
  cpmatrixList: any[];
  datatoshow: any;
  showTable: boolean;
  percentage: any;
  defaultMonth: number;
  defaultYear: number;
  month: number;
  year: number;
  columnList: string[];
  percentageG: string[];
  difference : any;
  blocked: boolean;
  exportFilenameDatetime: any;
  myDate = new Date();
  constructor(private cpmatrixService: CpmatrixService,
    private router: Router,private datePipe: DatePipe,
    private messageService: MessageService) {
    this.FinalData = {};
    this.years = [];
    this.datatoshow = {};
    // // this.cpmatrixList = {};
    // this.percentage = {};


    //#region by amit

    //#endregion
  }

  ngOnInit() {
    this.blocked=true;
    this.columnList = [];
    var date = new Date().getDate();
    // var Month = (new Date().getMonth()) - 0;
    var Month = (new Date().getMonth()) + 1;
    this.defaultMonth = Month;
    this.FinalData.Month = this.defaultMonth;

    var year = (new Date().getFullYear());
    this.defaultYear = year;
    this.FinalData.Year = this.defaultYear;
    console.log(" this.defaultYear  this.defaultYear  this.defaultYear  this.defaultYear ", this.defaultYear);
    var range = [];
    //range.push(year);
    for (var i = -1; i < 3; i++) {
      range.push(year + i);
    }
    this.years = range;
    console.log('this.years this.years  ', this.years);
    this.blocked=false;


  }


  Search(FinalData) {
    this.blocked=true;
      this.cpmatrixService.GetMonthCpMatrix(FinalData.Month, FinalData.Year).subscribe(result => {
        this.cpmatrixList = result;
        this.blocked=false;       
        this.addColumns();
        this.setColumns();

      }); 
  }

  addColumns() {
    if (this.cpmatrixList && this.cpmatrixList.length > 0) {
      this.cpmatrixList.forEach(product => {
        if (product.Customers && product.Customers.length > 0) {
          product.Customers.forEach(customer => {
            let existedList = this.columnList.filter(x => { return x == customer.SkCode });
            if (existedList && existedList.length > 0) {

            } else {
              // this.columnList.push(customer.SkCode);
              this.columnList.push(customer.CustomerName);
            }
          });
        }
      });
    }
  }

  setColumns() {
    if (this.cpmatrixList && this.cpmatrixList.length > 0) {
      this.cpmatrixList.forEach(product => {
        product.columnList = {};
        this.columnList.forEach(col => {
          //product.columnList[x] =
          // let existedList = product.Customers.filter(customer =>{return col == customer.SkCode});
          let existedList = product.Customers.filter(customer => { return col == customer.CustomerName });
          if (existedList && existedList.length > 0) {
            product.columnList[col] = { Delta: existedList[0].Delta, OrderAmount: existedList[0].OrderAmount, percentage: existedList[0].percentage, difference: existedList[0].difference };
            existedList[0].OrderAmount = (existedList[0].OrderAmount && !isNaN(existedList[0].OrderAmount)) ? Number(existedList[0].OrderAmount).toFixed(2) : existedList[0].OrderAmount;
            existedList[0].Delta = (existedList[0].Delta && !isNaN(existedList[0].Delta)) ? Number(existedList[0].Delta).toFixed(2) : existedList[0].Delta;
            this.percentage = (existedList[0].Delta / existedList[0].OrderAmount) * 100;
            existedList[0].percentage = this.percentage;
            existedList[0].percentage = (existedList[0].percentage && !isNaN(existedList[0].percentage)) ? Number(existedList[0].percentage).toFixed(2) : existedList[0].percentage;
            this.difference = existedList[0].OrderAmount - existedList[0].Delta;
          //  existedList[0].difference = this.difference;
            existedList[0].difference =this.difference && !isNaN(this.difference) ? Number(this.difference).toFixed(2) : this.difference;
            // existedList[0].difference = (existedList[0].difference && !isNaN(existedList[0].difference)) ? Number(existedList[0].percentage).toFixed(2) : existedList[0].percentage;
            this.setColumnClass(product.columnList[col])
            //product.columnList[col] = existedList[0].Delta;
          } else {
            // product.columnList[col] = {Delta: '-', OrderAmount: '-'};
            product.columnList[col] = { Delta: '0', OrderAmount: '0', percentage: '0', class : "green-hm" };
          }
        });
      })
    }
  }

  setColumnClass(col) {
    if (col.percentage <= 5) {
      col.class = "green-hm";
    } else if (col.percentage <= 20) {
      col.class = "p-green-hm";
    } else if (col.percentage <= 50) {
      col.class = "yellow-hm";
    } else if (col.percentage <= 70) {
      col.class = "orange-hm";
    } else {
      col.class = "red-hm";
    }

  }



}
