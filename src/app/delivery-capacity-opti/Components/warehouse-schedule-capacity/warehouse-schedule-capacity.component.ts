import { Component, Input,ElementRef, OnInit, Renderer2,ViewChild, TemplateRef,SimpleChanges  } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { DeliveryCapacityOptimizationService } from 'app/delivery-capacity-opti/Service/delivery-capacity-optimization.service';
import * as moment from 'moment';
//import { lastDayOfISOWeek } from 'date-fns';

@Component({
  selector: 'app-warehouse-schedule-capacity',
  templateUrl: './warehouse-schedule-capacity.component.html',
  styleUrls: ['./warehouse-schedule-capacity.component.scss']
})
export class WarehouseScheduleCapacityComponent implements OnInit {

  WareHouseList: any[] = []
  name: any
  code: any
  WareHousesId: any
  WeekId: any[] = [];
  Weekends: any[] = [];
  selectedWareHouse: any;
  SelectedWeekend: any[] = [];
  clickedDate: Date;
  currentDate: Date;
  UDates:any
  date:any
  date1:any
  date2:any
  display: boolean = false;
  DefaultTC: number
  HolidayLists: any;
  WorkingLists: any;
  Holidays: any[]
  UpdateThresholdCapacity: any;
  updateThresholdDC: any;
  wareHData: any[] = [];
  blocked:boolean 
  SelectedDate:any[]=[]
  wareid:any
  WareName:any[];
  currentYear:number= new Date().getFullYear();
  recentYear:number= new Date().getFullYear()
  year : any;
  datee:any
  first:number=0
  constructor(private service: DeliveryCapacityOptimizationService, private exportservice: ExportServiceService, private renderer: Renderer2, private elem: ElementRef) { }

  ngOnInit() {
    this.GetWarehouse();
    this.GetWeekend();
  }


  YearClick(e)
  {
    if(e.target.innerText == 'Next')
    {
      this.currentYear += 1; 
      this.year = this.recentYear + 2;

      if(this.currentYear == this.year)
      {
        alert('Next Year: '+ this.currentYear);
        this.SelectedDefaultData();
        window.location.reload();
      }else{
        alert('Next Year: '+ this.currentYear);
      }     
    }
    else if(e.target.innerText == 'Previous')
    {
      this.currentYear -= 1; 
      this.year = this.recentYear - 2;
      if(this.currentYear == this.year)
      {
        alert('Previous Year: '+ this.currentYear);
        window.location.reload();
      }else{
        alert('Previous Year: '+ this.currentYear);
      }          
    }
    else if(e.target.innerText == 'Today')
    {
      this.currentYear = this.recentYear;
    }
    this.SelectedDefaultData();
    this.getHolidayWorkingList();
    
  }

  GetWarehouse() {
    this.service.GetWareHouseNew().subscribe(WareRes => { 
      console.log(WareRes);
      
      this.WareHouseList = WareRes
    })
  }

  GetWeekend() {
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

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  showHistroy:boolean=false;
  allHistroy:any[]=[]
  GetHistroyData()
  {
     if(this.selectedWareHouse==null || this.selectedWareHouse==undefined)
     {
      alert("Please Select Warehouse")
      return false;
     }
    this.showHistroy=true;
    this.blocked=true
    this.service.GetHistroyData(this.selectedWareHouse.value).subscribe((res:any)=>
    {
    console.log(res);
    this.blocked=false
    this.first=0;
    if(res!=null)
    {
      this.allHistroy=res;
      console.log(this.allHistroy);
    }
      })
  }
  
  postDefaultDeliveryCapacity()
  {
    
    var arr:any[]=[]
    this.WareHousesId=this.selectedWareHouse
    this.wareid=this.WareHousesId.value
    arr.push(this.wareid)   
    this.WeekId = [];
    this.SelectedWeekend.forEach(element => {
      this.WeekId.push(element.code);
    });
    const payload =
    {
      "warehouseIds": arr,
      "Holidays": this.WeekId,
      "DefaultCapacity": this.DefaultTC,
      "year" : this.currentYear 
    }
    if (this.selectedWareHouse == null || this.selectedWareHouse==undefined || this.selectedWareHouse.length==0) 
    {
      alert("Select Warehouse ");
    }
    else if(this.SelectedWeekend == null || this.SelectedWeekend==undefined || this.SelectedWeekend.length==0)
    {
      alert("Select Weekend")
    }
    else if( this.DefaultTC == 0 || this.DefaultTC<0  || this.DefaultTC==null)
    {
      alert("Enter Default Threshold Count")
    }
    if (this.SelectedWeekend.length>0 && this.DefaultTC > 0 && this.WareHousesId.value>0) 
    {
      this.blocked=true;
      this.service.PostDefaultDeliveryCapacity(payload).subscribe(DDCres => {   
        alert("Submitted Successfully!!");
        this.blocked=false;
        this.getHolidayWorkingList();
      })      
    }
  } 
  
  SelectedDefaultData()
  {   
    if(this.wareid==undefined){
      return;
    }
    else{
    const payload =
    {
      'warehouseid':this.wareid,
      'year':this.currentYear
    }
    this.service.SelectedData(payload).subscribe((SRes:any)=>
      { 
        console.log(SRes);
        
        this.SelectedDate=SRes
        this.SelectedWeekend = [];
        this.SelectedDate.forEach(element => {
          let sw = {
            name: element.Holiday,
            code: element.Holiday
          }
          this.SelectedWeekend.push(sw);
        });   
        if(SRes && SRes.length>0) {
          this.DefaultTC=SRes[0].DefaultCapacity;
        }
      })
    }
  }

  eventDayClickHandler(e) {
    // console.log(e)
    this.updateThresholdDC = [];
    this.clickedDate = e.day.date;
    this.selectedPopupData();    
  // if (this.wareHData.length == 0) {
  //   alert("please select one warehouse ");
  //   this.display=false;
  // }
    if (this.wareHData.length != null && this.wareHData.length !=undefined && this.wareHData.length != 0) 
    {
        this.wareHData.forEach(element => {
        let obj = {
          warehouseId: element.WarehouseId,
          WarehouseName: element.WarehouseName,
          Date: this.date,
          UpdateThresholdCapacity: this.UpdateThresholdCapacity,
          year : this.currentYear
        }        
        this.updateThresholdDC.push(obj)
      });
    } 
    this.currentDate=new Date();
    if(this.currentYear <= this.recentYear)
    {      
      if(this.clickedDate<=this.currentDate)
      {
        alert("Please Select Upcoming Days!!");
        this.display=false;
      }      
    }
  }
  
  isThresholdCapacity : boolean = false;
  updateBtn() 
  {
    this.WareHousesId=this.selectedWareHouse
    this.wareid=this.WareHousesId.value
    const payload =
    {
      "warehouseId":this.wareid,
      "Date": this.date,
      "UpdateThresholdCapacity": this.UpdateThresholdCapacity,
      "year": this.currentYear
    }
    this.isThresholdCapacity = false;          
    if(this.UpdateThresholdCapacity<0 || this.UpdateThresholdCapacity==undefined || this.UpdateThresholdCapacity=='')
    {
      alert('Enter Threshold Capacity ' );
      this.isThresholdCapacity = true;
      this.display=true;
    }
    if(!this.isThresholdCapacity)
    {
      this.currentDate=new Date();
      this.date1=moment(this.clickedDate).format();
      this.date2=moment(this.currentDate).format();
      if(this.date1>=this.date2  && this.UpdateThresholdCapacity>=0)
      {
        if(payload!=undefined && payload!= null)
        {
          this.blocked=true;
          this.service.PostUpdatetDeliveryCapacity(payload).subscribe(res => {      
            if(!res)
            {
              this.blocked=false;
              alert("Updated Successfully");
              this.getHolidayWorkingList();
            }
          })
        }  
      } 
    }
  }

  getHolidayWorkingList() 
  { 
    this.WareHousesId = [];
    this.wareHData = [];
    
    this.WareHousesId=this.selectedWareHouse
    this.wareid=this.WareHousesId.value
    this.WareName=this.WareHousesId.label
    let wh = 
    {
      WarehouseId: this.wareid,
      WarehouseName: this.WareName,
      year : this.currentYear 
    }
    this.wareHData.push(wh);    
    // this.blocked=true;
    this.service.GetHolidayWorkingList(this.wareid,this.currentYear).subscribe(HWLres => 
    {      
      // this.blocked=false;   
      this.HolidayLists = HWLres.HolidayLists;
      this.WorkingLists = HWLres.WorkingLists;     
      this.Holidays=HWLres.Holidays;      
      var currentYEAR = this.currentYear;
      $(".year-calendar__body__month__inner").each(function (i) {
        $(this).find('.year-calendar__body__month__inner__week__day__text').each(function (ind, element) {
          if ($(element).text().trim()) { 
            
            var day = parseInt($(element).text().trim());
            // var calDate = new Date(2022, i, day);  
            var calDate = new Date(currentYEAR, i, day);              
            const CalClear = $(element).parent().css("background-color", "white")              
                       
            HWLres.Holidays.forEach(data => {
              var dt = moment(data).toDate();        
              if (dt.toDateString() == calDate.toDateString()) {
                $(element).parent().css("background-color", "lightcoral") // weekend holiday        
              }
            });

            HWLres.WorkingLists.forEach(data => {
              var dt = moment(data.Date).toDate();     
              if (dt.toDateString() == calDate.toDateString()) {
                $(element).parent().css("background-color", "lightseagreen") // holiday-> working
              }
            });

            HWLres.HolidayLists.forEach(data => {
              var dt = moment(data.Date).toDate();             
              if (dt.toDateString() == calDate.toDateString()) {
                $(element).parent().css("background-color", "lightcoral") // working-> holiday
              }
            });
          }
        });
      });
      // this.blocked=false;
    })
  }

  selectedPopupData() 
  {
    this.UpdateThresholdCapacity=this.DefaultTC;
    this.currentDate=new Date();
    if(this.wareid==undefined || this.wareid==0 )
    {
      this.display=false;
      alert("Please select warehouse")
    }
    
    this.date1=moment(this.clickedDate).format();
    this.date2=moment(this.currentDate).format();
    if(this.date1>=this.date2 && this.wareid!=undefined )
    {
      this.date=moment(this.clickedDate).format('MM/DD/YYYY');
      this.display=true;
      const payload =
      {
        'warehouseId':this.wareid,
        'Date': this.date,
        'year': this.currentYear
      }
      this.display=true;
      this.service.selectUpdtData(payload).subscribe(SUDres =>
      {   
        // this.blocked=false;
        this.UDates=moment(SUDres.Date).format('MM/DD/YYYY');
        if(this.date!=this.UDates)
        {
          this.UpdateThresholdCapacity=0;
        }
        if(this.date==this.UDates)
        {          
          this.UpdateThresholdCapacity=SUDres.UpdateThresholdCapacity
          this.display=true;
        }      
      })      
      this.Holidays.forEach(element => {
        this.datee=moment(element).format('MM/DD/YYYY');
        if(this.datee==this.date)
        {
          this.UpdateThresholdCapacity=0;
        }
      });
    }
    
  }

  Clean()
  {    
    this.SelectedWeekend = [];
    this.DefaultTC = 0;
    this.HolidayLists = null;
    this.WorkingLists = null;
  }

  Clear() {    
    window.location.reload();
  }
}