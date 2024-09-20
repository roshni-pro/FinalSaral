import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentcomissionsetcitywiseService } from 'app/shared/services/agentcomissionsetcitywise.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import * as moment from 'moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ExportService } from 'app/shared/services/export.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-agentcomissionsetcitywise',
  templateUrl: './agentcomissionsetcitywise.component.html',
  styleUrls: ['./agentcomissionsetcitywise.component.scss']
})
export class AgentcomissionsetcitywiseComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  cityList: any;
  agentcomissionlist: any[];
  searchModel: any;
  isDetails: boolean;
  isSearch: any;
  searchdata: any;
  Id:any;
  IsActive:true
  isInvalid:any;
  exportData:any;

  constructor(private agentcomission: AgentcomissionsetcitywiseService,
     private router: Router, private messageService: MessageService,
      private confirmationService: ConfirmationService,private exportService:ExportServiceService) { this.searchModel = {}; }

  ngOnInit() {

    this.agentcomission.Getagentcommissioncitywise().subscribe(result => {
      
      this.agentcomissionlist = result;
      console.log('this.agentcomissionlist', this.agentcomissionlist)
    })
    this.agentcomission.GetAllCity().subscribe(result => {
      this.cityList = result;
      console.log("this.cityList", this.cityList);
      
      for (var i in this.agentcomissionlist) {
        for (var j in this.cityList) {
          
          if (this.agentcomissionlist[i].CityId == this.cityList[j].Cityid) {
           
            this.agentcomissionlist[i].CityName = this.cityList[j].CityName;
            console.log("this.TotalCommissionList[i].CityName ", this.agentcomissionlist[i].CityName);
          }
        }
      }
    })



  }

  addcomission() {
    this.router.navigateByUrl("layout/agentcomissionsetcitywise/agentcomissionsetcitywise-add");
  }

  search(data) {
    // if (agentcommissionForm.form.status == "VALID") {
      // if (this.Id == null ) {
    
    this.isDetails = false;
  
    // else{
    //   this.messageService.add({ severity: 'error', summary: 'Please Enter Details', detail: '' });
    // }
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    if ((this.searchModel.FromDate || this.searchModel.ToDate) && (!this.searchModel.Cityid)) {
      this.messageService.add({ severity: 'error', summary: 'Please Select City', detail: '' });
    }
    else if ((!this.searchModel.FromDate || !this.searchModel.ToDate) && (this.searchModel.Cityid)) {
      this.messageService.add({ severity: 'error', summary: 'Please Enter date', detail: '' });
      // this.isSearch = true
      // this.dataTableComponent.reset();

    }
    else{
    this.agentcomission.SearchAllAgentData(data.Cityid, FromDate, ToDate).subscribe(result => {
      {
        

        this.agentcomissionlist = result;

        for (var j in this.cityList) {
          for (var i in this.agentcomissionlist) {
           
            if (this.agentcomissionlist[i].CityId == this.cityList[j].Cityid) {
             
              this.agentcomissionlist[i].CityName = this.cityList[j].CityName;
              console.log("this.TotalCommissionList[i].CityName ", this.agentcomissionlist[i].CityName);
            }
          }
        }

     
        console.log("this.searchdata", this.searchdata)
        console.log("this.searchModel", this.searchModel)

      }
    

      //  if (this.searchModel.Cityid == true) {
      //    
      //   this.dataTableComponent.reset();

      // } else 
      //   this.messageService.add({ severity: 'error', summary: 'Please Enter Details', detail: '' });
      // }

      // this.customer.GetCustomerService(data.skcode,data.ToDate,data.FromDate,data.mobile,data.cityId).subscribe(res=>{
      //   this.customerList = res
      // })
    })
  }


  }


  Remove(agentcommission) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.agentcomission.Deleteagentcommission(agentcommission.Id).subscribe(result => {
          
          this.ngOnInit();
          //  if(result!=null)
          //  {
          //  this.router.navigateByUrl("layout/agentcomissionsetcitywise/agentcomissionsetcitywis");
          console.log('Result is', result)




        })
      }

    })
  }

  export()
  {   
    this.agentcomission.exportAgentcommissioncitywise().subscribe(result => { 
      this.exportData =  result ;
      this.exportService.exportAsExcelFile(this.exportData, 'agentCommission'); 
    })
  }

  Active(Activeagent) {
        
        this.agentcomission.Activeagentcommission(Activeagent.Id).subscribe(result => {
          
          this.ngOnInit();         
          console.log('Result is', result)     

    })
  }
}