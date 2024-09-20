import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { RocServiceService } from 'app/roc/Services/roc-service.service';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-buyer-roc',
  templateUrl: './buyer-roc.component.html',
  styleUrls: ['./buyer-roc.component.scss']
})
export class BuyerRocComponent implements OnInit {
  MonthList:any[]= [
    { "Name": "January", id: 0},
    { "Name": "February", id: 1 },
    { "Name": "March", id: 2 },
    { "Name": "April", id: 3 },
    { "Name": "May", id: 4 },
    { "Name": "June", id: 5 },
    { "Name": "July", id: 6 },
    { "Name": "August", id: 7 },
    { "Name": "September", id: 8 },
    { "Name": "October", id: 9 },
    { "Name": "November", id: 10 },
    { "Name": "December", id: 11 }
  ];
  YearList:any[]=[
    { "Name": "2023", id: 2023 },
    { "Name": "2022", id: 2022 },
    { "Name": "2021", id: 2021 },
    { "Name": "2020", id: 2020 }
  ]
  selectedMonth:any
  selectedYear:any
  blocked:boolean=false
  constructor(private service: RocServiceService,private msg:MessageService) { }

  ngOnInit() {
  }
  Export()
  {
    debugger
     console.log(this.selectedMonth);
     console.log(this.selectedYear);
     if(this.selectedMonth==null || this.selectedMonth==undefined)
     {
      this.showError("Please Select Month")
      return false;
     }
     if(this.selectedYear==null ||this.selectedYear==undefined)
     {
      this.showError("Please Select Year")
      return false;
     }
     this.selectedMonth.id= this.selectedMonth.id-1;
    var firstmonthdate = new Date(this.selectedYear.id, this.selectedMonth.id, 1)
    console.log(firstmonthdate,"firstmonthdate");
    
    var firstDate= firstmonthdate ? moment(firstmonthdate).format('YYYY-MM-DD') : null
    this.blocked=true
    this.service.ExportROc(firstDate).subscribe(res=>
      {
        this.blocked=false
        console.log(res,"res");
        var URL=environment.apiURL + res;
        console.log(URL);
        window.open(URL);
      })
  }
  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }
  Reset()
  {
    this.selectedMonth=null
    this.selectedYear=null
  }

}
