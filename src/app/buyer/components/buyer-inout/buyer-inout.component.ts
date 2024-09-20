import { Component, OnInit } from '@angular/core';
import { BuyerService } from 'app/shared/services/buyer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-buyer-inout',
  templateUrl: './buyer-inout.component.html',
  styleUrls: ['./buyer-inout.component.scss']
})
export class BuyerInoutComponent implements OnInit {

  MonthList = [
    { "Name": "January", id: 1 },
    { "Name": "February", id: 2 },
    { "Name": "March", id: 3 },
    { "Name": "April", id: 4 },
    { "Name": "May", id: 5 },
    { "Name": "June", id: 6 },
    { "Name": "July", id: 7 },
    { "Name": "August", id: 8 },
    { "Name": "September", id: 9 },
    { "Name": "October", id: 10 },
    { "Name": "November", id: 11 },
    { "Name": "December", id: 12 }
  ];
  StockList =[
    {"Name":"Free",id:1},
    {"Name":"Damage",id:2},
    {"Name":"NonSellable",id:3},
    {"Name":"Clearance",id:4},
    {"Name":"NonRevenue",id:5}
  ]

  YearList = [
    // { "year": "2020" ,id:2020 },
    // { "year": "2021", id:2021 }
  ]
  month: number;
  year: number;
  blocked: boolean;
  selectedOtherStock:any
  otherStockmonth:number
  otherStockyear:number
  constructor(private exportService: ExportServiceService, private buyerservice: BuyerService, calendar: NgbCalendar) { }

  ngOnInit() 
  {
    this.YearList.push({ "year": (new Date().getFullYear() - 2).toString(), id: (new Date().getFullYear() - 2) })
    this.YearList.push({ "year": (new Date().getFullYear() - 1).toString(), id: (new Date().getFullYear() - 1) })
    this.YearList.push({ "year": new Date().getFullYear().toString(), id: new Date().getFullYear() })
  }

  // export() {
  //   
  //   this.buyerservice.GetInOut(this.month, this.year).subscribe(result => {
  //     
  //     this.exportService.ExportToExcel(result, 'resultInOut');
  //     console.log(result);
  //   })
  // }

  export() {
  debugger
    this.blocked = true;
    this.buyerservice.GetInOut(this.month, this.year).subscribe(result => {
      this.blocked = false;
      var filename = 'buyerData' + new Date;
      this.downloadURI(result, filename)
    });
    console.log("result");
  }
  downloadURI(uri, name) {

    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }
  exportOtherStock()
  {
    debugger
    console.log(this.selectedOtherStock,"selectedOtherStock");
    this.blocked = true;
   this.buyerservice.GetOtherStockInOut(this.selectedOtherStock,this.otherStockmonth,this.otherStockyear).subscribe(res=>
    {
      this.blocked = false; 
      var filename =this.selectedOtherStock+new Date;
      this.downloadURI(res,filename)
    })
    
  }



}

