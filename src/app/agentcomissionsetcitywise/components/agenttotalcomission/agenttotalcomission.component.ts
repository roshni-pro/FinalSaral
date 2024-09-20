import { Component, OnInit } from '@angular/core';
import { AgentcomissionsetcitywiseService } from 'app/shared/services/agentcomissionsetcitywise.service';
import { PeopleService } from 'app/shared/services/people.service';
import * as moment from 'moment';
import { AnyARecord } from 'dns';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-agenttotalcomission',
  templateUrl: './agenttotalcomission.component.html',
  styleUrls: ['./agenttotalcomission.component.scss']
})
export class AgenttotalcomissionComponent implements OnInit {
  TotalCommissionList:any;
  people:any;
  searchModel: any;
  cityList:any;
  cols:any[];
  customerList:any;
  expandedRows:any;
  selectedRowDetails: any;
  selectedRow: any;
  isDetails:any;
  CommissionTotalAmount:any;
  exportData:any;
  constructor(private agentcomission : AgentcomissionsetcitywiseService , private peopleService : PeopleService, private cust :CustomerService,
    private exportService: ExportServiceService) { }

  ngOnInit() {
    this.cols = [
     
      { field: 'City', header: 'City' },
      { field: 'PeopleId', header: 'AgentName' },
      { field: 'Name', header: 'CustomerName' },     
      { field: 'Skcode', header: 'SkCode' },     
      { field: 'ShopName	', header: 'ShopName' },
      { field: 'CommissionAmount	', header: 'CommissionAmount' },
      { field: 'CreatedDate	', header: 'CreatedDate' },
      
    ]
    
    this.CommissionTotalAmount=0;
    this.agentcomission.GetTotalCommision().subscribe(result => {
      
      this.TotalCommissionList = result;
      this.TotalCommissionList.forEach(element => {
        this.CommissionTotalAmount=this.CommissionTotalAmount+element.CommissionAmount;
       });
      console.log(' TotalCommissionList :',this.TotalCommissionList);
    })
    

    // 
    // this.agentcomission.GetAllCity().subscribe(result => {
    //   
    //   this.cityList = result; 
    //   console.log("this.cityList",this.cityList);
    //   for(var i in this.TotalCommissionList)
    //   {
    //   for(var j in this.cityList)
    //   {
    //    
    //      if(this.TotalCommissionList[i].CityId == this.cityList[j].Cityid)
    //    {
    // 
    //       this.TotalCommissionList[i].CityName = this.cityList[j].CityName;
    //       console.log("this.TotalCommissionList[i].CityName ",this.TotalCommissionList[i].CityName );
    //        }
    //       }
    //   }
    // })

    // this.cust.GetAllCustomer().subscribe(result => {
    //   
    //   this.customerList = result;
  
    //   for(var i in this.TotalCommissionList)
    //  {
    //    
    //  for(var j in this.customerList)
    //  {
    //    
    //  if(this.TotalCommissionList[i].CustomerId == this.customerList[j].CustomerId)
    //  { 
    //    
    //   this.TotalCommissionList[i].CustomerId = this.customerList[j].Name;
    //    console.log('this.TotalCommissionList :',this.TotalCommissionList);
    //  }
    // }
    // }
    //  })


   this.peopleService.GetAll().subscribe(result => {
   
   this.people = result;
   for(var i in this.TotalCommissionList)
   {
   for(var j in this.people)
   {
     
   if(this.TotalCommissionList[i].PeopleId == this.people[j].PeopleID)
   { 
     
    this.TotalCommissionList[i].DisplayName = this.people[j].DisplayName;
     console.log('this.TotalCommissionList :',this.TotalCommissionList);
   }
  }
  }
})

  }
  openDetails(d, e) {
    this.selectedRowDetails = d;
    this.peopleService.GetAll().subscribe(result => {
      
       this.people = result;
       console.log('people:',this.people);
    
    for(var i in this.people)
    {
    if(d.PeopleId == this.people[i].PeopleID)
    {
      d.PeopleId = this.people[i].DisplayName;
      console.log(' PeopleId :',d.PeopleId );
    }
    }
  });
    console.log(this.selectedRowDetails);
    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }
  export()
  {  
      this.exportData = this.TotalCommissionList;
      this.exportService.exportAsExcelFile(this.exportData, 'agenttotalCommission');    
  }

}


