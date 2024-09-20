import { Component, OnInit } from '@angular/core';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { PeopleService } from 'app/shared/services/people.service';
import * as moment from 'moment';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { IncidentReportDc } from 'app/incident-reporting/interface/IncidentReport';
import { IncidentreportingService } from 'app/incident-reporting/services/incidentreporting.service';
import { DepartmentService } from 'app/shared/services/department.service';
import { MessageService } from 'primeng/api';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ClusterService } from 'app/shared/services/cluster.service';
import { CityService } from 'app/shared/services/city.service';
import { StateService } from 'app/shared/services/state.service';


@Component({
  selector: 'app-incident-reporting',
  templateUrl: './incident-reporting.component.html',
  styleUrls: ['./incident-reporting.component.scss']
})
export class IncidentReportingComponent implements OnInit {
  RoleList: any[];
  customerInfo: any;
  people : any;
  reportList : any;
  data: any;
  inboundList : any;
  outboundList : any;
  loss : any;
  selectedReport : any;
  selectedReportedRole : any;
  selectedOutbound : any[];
  selectedInbound : any[];
  selectedRole : any;
  isInvalid : boolean = false;
  incidentReportDc : IncidentReportDc;
  WarehouseId : any;
  inboundDD : boolean = false;
  outboundDD : boolean = false;
  cityList : any;
  deptList : any;
  RoleId : any;
  description : boolean = false;
  PeopleID : any;
  blocked : boolean = false;
  Location : any;
  peopleDetail : any;
  cityId : any;
  warehouseList: any;
  Warehouse : any;
  cityData : any;
  checked: boolean = false;
  dateerror: boolean;
  cityName : any;
  stateData :any;
  stateid : any;
  StateName : any;
  WarehouseName : any;

  constructor(private pepolePilotService: PepolePilotService,private peopleService : PeopleService,private departmentService : DepartmentService
    ,private pickerService : PickerService,private incidentreportingService : IncidentreportingService,
    private messageService: MessageService,private warehouse : WarehouseService,private cityService : CityService
    ,private clusterservice : ClusterService,private stateService : StateService) { this.people = {}; 
  
  }

  ngOnInit() {
    
    this.RoleId = "";
    this.Warehouse = "";
    // this.customerInfo = JSON.parse(localStorage.getItem("userName"));
    this.customerInfo = localStorage.getItem('userid');
    this.WarehouseId = localStorage.getItem('Warehouseid');
    this.peopleService.GetAll().subscribe(x=>
      {
        
        this.peopleDetail = x.filter(z=>z.PeopleID == this.customerInfo);
        // this.Location = this.peopleDetail[0].city;
        this.cityId = this.peopleDetail[0].Cityid;
        this.Location = this.peopleDetail[0].Unit;
        this.stateid = this.peopleDetail[0].Stateid;
        // this.WarehouseName = this.peopleDetail[0].WarehouseId;
        this.stateService.GetAllState().subscribe(a=>
          {
            this.stateData = a.filter(z=>z.Stateid == this.stateid);
            this.StateName = this.stateData[0].StateName;
          })
        this.cityService.GetAllCity().subscribe(y=>
          {
            
            this.cityData = y.filter(z=>z.Cityid == this.cityId);
            this.cityName = this.cityData[0].CityName;
          });
        // alert(this.Location);
        // alert(this.cityId);
      })
    console.log(this.customerInfo);
    this.data = {};
    this.data.Month = moment().toDate();
    // this.data.timeofIncident = moment().
    this.people.PeopleID = 0;
    this.data.Dept = "";
    this.data.City = "";
    this.data.loss = "";
    this.data.Warehouse = "";
    this.PeopleID = "";
    this.data.PeopleID = "";
    this.selectedReport =  localStorage.getItem('userName'),
    this.selectedReportedRole = localStorage.getItem('role');
    // this.data.CaseNo = 'A' + this.customerInfo + 'Z';
    this.generateCaseNumber();
    // this.customerInfo = JSON.parse(localStorage.getItem("customerInfo"));
    this.pepolePilotService.role(this.people.PeopleID).subscribe(result => {
      
      this.RoleList = result;
    });
    this.cityService.GetActiveCity().subscribe(result => {
      
      this.cityList = result;
    })
    this.departmentService.GetAllDepartment().subscribe(y=>
      {
       this.deptList = y; 
      }) 
    this.peopleService.GetAll().subscribe(result => {
      this.reportList = result.filter(x => x.PeopleID != this.people.PeopleID);
    })
    this.pickerService.getInboundLeadForIncidentReport(this.WarehouseId).subscribe(result => {
      
      this.inboundList = result;
     
      if(result.length == 1)
      {
        this.selectedInbound = this.inboundList[0].DisplayName;        
      }
      else{
        this.inboundDD = true;
        this.inboundList = result;
      }
      // this.inboundDD = false;
      if(result.length == 0)
      {
        this.pickerService.GetInboundLeadForIncidentReportwithoutWarehouseId().subscribe(result => {
          
          this.inboundList = result;          
          this.inboundDD = true;
        });
      }
    })
    this.pickerService.getOutboundLeadForIncidentReport(this.WarehouseId).subscribe(result => {
      
      this.outboundList = result;
      if(result.length == 1)
      {
        this.selectedOutbound = this.outboundList[0].DisplayName;        
      }
      else{
        this.outboundDD = true;
        this.outboundList = result;
      }
      // this.outboundDD = false;
      if(result.length == 0)
      {
        this.pickerService.GetOutboundLeadForIncidentReportwithoutWarehouseId().subscribe(result => {
          
          this.outboundList = result;
          this.outboundDD = true;
        });
      }
    })

    // this.warehouse.GetAllWarehouse().subscribe(result => {
    //   this.warehouseList = result;
    // })
    
  }
  onsearch(searchdata) {
    this.clusterservice.GetWarehouseByCity(searchdata).subscribe(result => {
      this.warehouseList = result;
    })
  }
  onCancel()
  {
    window.location.reload();
  }

  update(incidentReport,PeopleID,data,selectedRole)
  {

// let time= moment(data.timeofIncident).format("hh:mm a")
this.blocked = true; 
if(incidentReport.form.status == "VALID")
{
  this.blocked = true; 
  if(PeopleID == "" || PeopleID == undefined)
  {
    this.incidentReportDc = {
      ReportedBy : this.customerInfo,
      ReportedRole : this.selectedReportedRole,
      CaseNo : data.CaseNo,
      OutBound : this.outboundList[0].PeopleID,
      InBound : data.PeopleID,
      PersonName : data.Name,
      PersonRole : selectedRole[0].RoleName,
      Department : data.Dept,
      TypeOfLoss : data.loss,
      DateofIncident : data.DOI,
      CityId : data.City,
      DateOfReport : data.Month,
      TimeofIncident : data.timeofIncident,
      // TimeofIncident : time,
      IncidentDescription : data.desc,
      Location : this.cityId,
      WarehouseId : data.Warehouse,
      WitnessName : data.WitnessName,
      MobileNo : data.MobileNo
    }
  }
  else if(data.PeopleID == "" || data.PeopleID == undefined)
  {
    this.incidentReportDc = {
      ReportedBy : this.customerInfo,
      ReportedRole : this.selectedReportedRole,
      CaseNo : data.CaseNo,
      OutBound : PeopleID,
      InBound : this.inboundList[0].PeopleID,
      PersonName : data.Name,
      PersonRole : selectedRole[0].RoleName,
      Department : data.Dept,
      TypeOfLoss : data.loss,
      DateofIncident : data.DOI,
      CityId : data.City,
      DateOfReport : data.Month,
      TimeofIncident : data.timeofIncident,
      // TimeofIncident : time,
      IncidentDescription : data.desc,
      Location : this.cityId,
      WarehouseId : data.Warehouse,
      WitnessName : data.WitnessName,
      MobileNo : data.MobileNo
    }
  }
  else if(PeopleID == "" || PeopleID == undefined && data.PeopleID == "" || data.PeopleID == undefined)
  {
    this.incidentReportDc = {
      ReportedBy : this.customerInfo,
      ReportedRole : this.selectedReportedRole,
      CaseNo : data.CaseNo,
      OutBound : this.outboundList[0].PeopleID,
      InBound : this.inboundList[0].PeopleID,
      PersonName : data.Name,
      PersonRole : selectedRole[0].RoleName,
      Department : data.Dept,
      TypeOfLoss : data.loss,
      DateofIncident : data.DOI,
      CityId : data.City,
      DateOfReport : data.Month,
      TimeofIncident : data.timeofIncident,
      // TimeofIncident : time,
      IncidentDescription : data.desc,
      Location : this.cityId,
      WarehouseId : data.Warehouse,
      WitnessName : data.WitnessName,
      MobileNo : data.MobileNo
    }
  }
  else
  {
  this.incidentReportDc = {
    ReportedBy : this.customerInfo,
    ReportedRole : this.selectedReportedRole,
    CaseNo : data.CaseNo,
    OutBound : PeopleID,
    InBound : data.PeopleID,
    PersonName : data.Name,
    PersonRole : selectedRole[0].RoleName,
    Department : data.Dept,
    TypeOfLoss : data.loss,
    DateofIncident : data.DOI,
    CityId : data.City,
    DateOfReport : data.Month,
    TimeofIncident : data.timeofIncident,
    // TimeofIncident : time,
    IncidentDescription : data.desc,
    Location : this.cityId,
    WarehouseId : data.Warehouse,
    WitnessName : data.WitnessName,
    MobileNo : data.MobileNo
  }
}
  
  this.incidentreportingService.addIncidentReport(this.incidentReportDc).subscribe(result=>{
    
    this.blocked = false;
    if(result == true)
    {
      this.messageService.add({ severity: 'success', summary: 'Data Saved succesfully', detail: '' });
      alert('Data Saved succesfully');
      window.location.reload();
    }
  })
}
else{
  this.blocked = false; 
  this.isInvalid = true;  
}

  }

  generateCaseNumber() {  
    // var digits = '0123456789'; 
    // let CaseNumber = ''; 
    // for (let i = 0; i < 4; i++ ) { 
    //   CaseNumber += digits[Math.floor(Math.random() * 10)]; 
    // } 
    // this.data.CaseNo = CaseNumber;
    // return CaseNumber; 
    this.incidentreportingService.caseNoGenterated().subscribe(x=>
      {
        this.data.CaseNo = x;
      })
} 
roeName(RoleName)
{
  
  if(RoleName.length > 1)
  {
    this.messageService.add({ severity: 'error', summary: 'Select only 1 Role!', detail: '' });
    this.selectedRole = '';
  }
}
changeDate(e) {
  
  this.checked = false;
  let currentdate = new Date();
  currentdate.setDate(currentdate.getDate());
  
  if (new Date(e.target.value) > currentdate) {
    
    this.dateerror = true;
    setTimeout(() => {
      this.data.DOI = null;
      e.target.value = null;
    }, 500);
  }
  else{
    this.data.DOI = currentdate;
  }
}
keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

// changeTime(e) {
//   
//   this.checked = false;
//   let currenttime = new Date();
//   currenttime.setTime(currenttime.getTime());
//   
//   if (new Date(e) > currenttime) {
//     
//     alert('invalid time');
//     this.dateerror = true;
//     setTimeout(() => {
//       this.data.time = null;
//       e.target.value = null;
//     }, 500);
//   }
// }

}
