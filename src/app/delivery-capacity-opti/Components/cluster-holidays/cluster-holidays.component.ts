import { Component, OnInit } from '@angular/core';
import { CustomerClusterHolidaysService } from 'app/delivery-capacity-opti/Service/customer-cluster-holidays.service';
import { DeliveryCapacityOptimizationService } from 'app/delivery-capacity-opti/Service/delivery-capacity-optimization.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { error } from 'console';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cluster-holidays',
  templateUrl: './cluster-holidays.component.html',
  styleUrls: ['./cluster-holidays.component.scss']
})
export class ClusterHolidaysComponent implements OnInit {

  constructor(private service: DeliveryCapacityOptimizationService,private customerservice: CustomerService,
    private Holidayserv:CustomerClusterHolidaysService,private msg:MessageService) { }
  WareHouseList:any
  Weekends:weekend[]
  selectedWareHouse:any
  clusterList:any;
  selectedCluster:any
  Holidays:any[];
  currentYear:number= new Date().getFullYear();
  recentYear:number= new Date().getFullYear()
  year : any;
  Holidates:any
  showHistoryData :boolean=false
  ClusterList:any[]=[]
  SelectedWeekend:any=[]
  first:number=0
  ngOnInit() {
    this.GetWarehouse();
    this.GetWeekend();
  }

  GetWarehouse(){
    this.service.GetWareHouseNew().subscribe(WareRes => { 
      console.log(WareRes);
      this.WareHouseList = WareRes
    })
  }

  getCluster(WareIDD) {
    debugger;
    this.clusterList=[]
    this.customerservice.getClusterByCity(WareIDD.value).subscribe(result => {
      this.clusterList = result;
    })
  }

  GetWeekend(){
    this.Weekends = [
      { name: 'Sunday', code: 'Sunday' }
      , { name: 'Monday', code: 'Monday' }
      , { name: 'Tuesday', code: 'Tuesday' }
      , { name: 'Wednesday', code: 'Wednesday' }
      , { name: 'Thursday', code: 'Thursday' }
      , { name: 'Friday', code: 'Friday' }
      , { name: 'Saturday', code: 'Saturday' }
    ];
  }

  holidayChangeEffect(ev,week){
    debugger; 
    week.forEach(element => {
      this.SelectedWeekend=[];
      this.SelectedWeekend.push(element)
    });
  }

  YearClick(e)
  {
    debugger;
    if(e.target.innerText == 'Next')
    {
      this.currentYear += 1; 
      this.year = this.recentYear + 2;

      if(this.currentYear == this.year)
      {
        alert('Next Year: '+ this.currentYear);
       // this.SelectedDefaultData();
        window.location.reload();
      }else{
        alert('Next Year: '+ this.currentYear);
      }     
    }
    // else if(e.target.innerText == 'Previous')
    // {
    //   this.currentYear -= 1; 
    //   this.year = this.recentYear - 2;
    //   if(this.currentYear == this.year)
    //   {
    //     alert('Previous Year: '+ this.currentYear);
    //     window.location.reload();
    //   }else{
    //     alert('Previous Year: '+ this.currentYear);
    //   }          
    // }
    else if(e.target.innerText == 'Today')
    {
      this.currentYear = this.recentYear;
    }
    //this.SelectedDefaultData();
   this.getHolidayWorkingList(this.selectedCluster);
    
  }
 
  SelectedDefaultData(SelectedDays:any)
  {   
    debugger;
    this.SelectedWeekend = [];
    SelectedDays.holiday.forEach(element => {
      let sw = {
        name: element,
        code: element
      } 
      this.SelectedWeekend.push(sw);
    });   
  }

  getHolidayWorkingList(Cluster) 
  { 
    console.log(this.selectedWareHouse)
    debugger;
    this.Holidayserv.GetHolidayWorkingList(this.selectedWareHouse.value,Cluster.ClusterId).subscribe(HWLres => 
    {       
      this.SelectedDefaultData(HWLres);
      this.Holidays=HWLres.Holidays;
      this.Holidates=HWLres.HolidayDate         
      var currentYEAR = this.currentYear;
      $(".year-calendar__body__month__inner").each(function (i) {
        $(this).find('.year-calendar__body__month__inner__week__day__text').each(function (ind, element) {
          if ($(element).text().trim()) {        
            var day = parseInt($(element).text().trim());
            var calDate = new Date(currentYEAR, i, day);              
            const CalClear = $(element).parent().css("background-color", "white")              
                       
            HWLres.HolidayDate.forEach(data => {
              var dt = moment(data).toDate();        
              if (dt.toDateString() == calDate.toDateString()) {
                $(element).parent().css("background-color", "lightcoral") // weekend holiday        
              }
            });
          }
        });
      });
    })
  }

  eventDayClickHandler(e) {
    debugger
    console.log("kji"+e)
  }

  Clear(){
    window.location.reload();
    this.clusterModel={
      clusterId:undefined,
      warehouseId:undefined,
      holiday:[]
      //year:undefined
    };
    this.selectedWareHouse=undefined
    this.clusterList=undefined
    this.selectedCluster=undefined
    this.Holidays=[];
    this.SelectedWeekend=undefined
    this.Holidates=[];
  }

  clusterModel:clusterHolidayDc
  postClusterData(){  
    if(this.selectedWareHouse==undefined){this.showError("Please Select Warehouse First")}
    else if(this.selectedCluster==undefined){this.showError("Please Select Cluster First")}
    else if(this.SelectedWeekend==undefined||this.SelectedWeekend.length==0){this.showError("Please Select Day First")}
    else{
      this.clusterModel={
        clusterId:this.selectedCluster.ClusterId,
        warehouseId:this.selectedWareHouse.value,
        holiday:this.SelectedWeekend.map(item => item.name)
        //year:this.currentYear
      };
      console.log("dks",this.clusterModel)
      this.Holidayserv.PostclusterHolidayList(this.clusterModel).subscribe(res => 
      { 
        if(res.Status==true){this.showSuccess("Data saved sucessfully")
        this.getHolidayWorkingList(this.selectedCluster)
      }
        else{this.showError("something went wrong")}
      })
    }
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

 
  GetHistroyData()
  {
    if(this.selectedWareHouse==null || this.selectedWareHouse==undefined)
    {
      this.showError("Please Select Warehouse");
      return false
    }
   if(this.selectedCluster==null || this.selectedCluster==undefined)
   {
    this.showError("Please Select cluster");
    return false
   }
   this.showHistoryData=true;
   this.Holidayserv.ClusterHolidayHistoryData(this.selectedCluster.ClusterId).subscribe(res=>
    { 
        this.ClusterList=res;
        this.first=0
      console.log(this.ClusterList,"ClusterList");
    })
   
  }
}

interface weekend{
  name: string,
  code: string
}

export interface clusterHolidayDc{
  clusterId:number,
  warehouseId:number,
  holiday:string[],
  
}