import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { AttendanceRulesService } from 'app/sales-app-backend-pages/Services/attendance-rules.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { CustomerService } from 'app/shared/services/customer.service';

@Component({
  selector: 'app-attendance-rules-create-new',
  templateUrl: './attendance-rules-create-new.component.html',
  styleUrls: ['./attendance-rules-create-new.component.scss']
})
export class AttendanceRulesCreateNewComponent implements OnInit{

  constructor( private ActiveRoute: ActivatedRoute, private msg:MessageService, private router : Router,private exportserv:ExportServiceService,
    private salesAtRule: AttendanceRulesService,private _service :ItemClassificationIncentiveReportService,private confirmationService:ConfirmationService,
    private customerService:CustomerService){}

  @Output() SalesAttendanceEvent = new EventEmitter<boolean>();
  StoreId:any
  selectedCity:any
  blocked:boolean=false
  IsShowUrl:any
  Menu:string
  AttConfigId:any
  AttendanceConfigList:any={}
  selectedMessage:any={};
  StoreList:any=[]
  //storeids:any
  CityList:any
  ChannelMasterIds:any
  ngOnInit() {  
    debugger
    //on create case:
    this.salesAtRule.currentMessage.subscribe(message => (this.selectedMessage = message));
    console.log(this.selectedMessage)//
    this.AttendanceConfigList.ChannelObj=this.selectedMessage
    this.ChannelMasterIds = this.ActiveRoute.snapshot.paramMap.get('storeId');
    this.Menu = this.ActiveRoute.snapshot.paramMap.get('Menu');
    this.IsShowUrl = this.ActiveRoute.snapshot.paramMap.get('isShow');
    this.AttConfigId = this.ActiveRoute.snapshot.paramMap.get('AttendaceConfigId');
    //this.getStore();
    //this.getCities();
    this.CustomerChannelTypeList();
    this.forShowingData();
  }  

  async forShowingData(){
    debugger
    console.log(this.Menu,this.IsShowUrl,this.AttConfigId);
    this.ChannelTypeList=[]
    var res1:any = await this.customerService.CustomerChannelTypeList().toPromise();
    this.ChannelTypeList=res1;
    if((this.Menu == 'Edit' || this.Menu == 'Duplicate' || this.Menu == 'GlobalEdit') && this.AttConfigId != undefined )
    {
      //for store
      // store
      //for city
      var isEdit:boolean=false
      if(this.Menu=='Edit') isEdit=true
      var res2:any =await this.salesAtRule.GetCityListForAttendanceConfig(this.ChannelMasterIds==undefined? this.selectedMessage.ChannelMasterId:parseInt(this.ChannelMasterIds),isEdit).toPromise();
      if(res2.Data.length>=0){
        this.CityList=res2.Data;
        console.log(res2);
      }//city
      var res:any =await this.salesAtRule.GetAttendanceConfigById(this.AttConfigId).toPromise();
      // .subscribe((res:any)=>{
        console.log("beforeBind",res);
        
          if(res.Status)
          {debugger
            //const StoreName = this.StoreList.filter(x=> {if(x.Id == res.Data.StoreId) return x});
            const ChannelName = this.ChannelTypeList.filter(x=> {if(x.ChannelMasterId == res.Data.ChannelMasterId) return x});
            const CityName = this.Menu == 'Duplicate' ? {}:this.CityList.filter(x=>{if(x.Cityid == res.Data.CityId) return x});
            const AttendanceDataList = []
            AttendanceDataList.push(res.Data);
            AttendanceDataList.forEach(x=>{
            x.Id =  this.Menu == 'Duplicate' ? 0 :  x.Id
            x.CityObj = CityName[0]
            //x.ChannelMasterId = StoreName[0]
            x.ChannelObj = ChannelName[0]
            x.IsCheckinBeatShop = x.IsCheckinBeatShop==true? "true":"false"
            x.IsCheckOutBeatShop = x.IsCheckOutBeatShop==true? "true":"false"
            x.IsFullDayBeatShop= x.IsFullDayBeatShop==true? "true":"false"
            x.IsTADABeatShop= x.IsTADABeatShop==true? "true":"false"
            });
            this.AttendanceConfigList = AttendanceDataList[0];
          }
          console.log("this.AttendanceConfigList", this.AttendanceConfigList);
      // })
    }
    else{
        this.getStore();
        this.getCities();
        this.AttendanceConfigList.IsTADABeatShop="false";
        this.AttendanceConfigList.IsCheckinBeatShop="false";
        this.AttendanceConfigList.IsCheckOutBeatShop="false";
        this.AttendanceConfigList.IsFullDayBeatShop="false";
    }
  }
 
  async getStore(){
    this.StoreList=[]
    var res:any = await this._service.GetStoreList().toPromise();
  //  .subscribe(res=>{
      this.StoreList=res;
      console.log(res);
    // })
  }

  async getCities(){
    debugger
    var isEdit:boolean=false
    if(this.Menu=='Edit') isEdit=true
    var res:any =await this.salesAtRule.GetCityListForAttendanceConfig(this.ChannelMasterIds==undefined? this.selectedMessage.ChannelMasterId:parseInt(this.ChannelMasterIds),isEdit).toPromise();
    if(res.Data.length>0)
    {
      this.CityList=res.Data;
      console.log(res);
    }
  }
  getWarehouseByCityId(){ }

  Checkvalue(e){
    debugger
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    if(e.match(pattern)) {
      this.AttendanceConfigList.DayMinVisits= undefined;
    }
    else{
     this.AttendanceConfigList.DayMinVisits
    }
  }

  Check(event){
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    // Check if the input starts with zero
    if (inputValue.length === 0 && event.key === '0') {
      // Prevent the default action (i.e., entering the key) if the input starts with zero
      event.preventDefault();
    }
    if ( (event.which>64 && event.which<91) || (event.which>96 && event.which<123) || (event.which == 45 || event.which == 189)){   
      event.preventDefault();
   } 
  } 

  navigationExtras: NavigationExtras = {
    queryParams: {
      tab:5
    }
  };

  CreateNew(){
    debugger
    this.SalesAttendanceEvent.emit(false);
    this.salesAtRule.changeMessage(undefined);
    this.router.navigate(['/layout/salesApp/SalesAppConfig'], this.navigationExtras);
  }

  chageStore(){}

  IsCheckinBeatShop:any
  CheckInTime:any
  IsCheckOutBeatShop:any
  IsFullDayBeatShop:any
  IsMinimumVisit:boolean
  DayMinVisits:number
  IsTADABeatShop:any
  IsTADARequired:boolean
  TADACalls:number
  Description:String
  save(){
    debugger
    console.log(this.AttendanceConfigList);
    if(this.AttendanceConfigList.ChannelObj==undefined) this.showError("Channel required")
    else if(this.AttendanceConfigList.CityObj==undefined && this.Menu != 'GlobalEdit') this.showError("City required")
    else if(this.AttendanceConfigList.CheckInTime==undefined) this.showError("CheckIn Time required")
    else if(this.AttendanceConfigList.IsCheckinBeatShop==undefined) this.showError("Checkin Beat Shop required")
    else if(this.AttendanceConfigList.IsCheckOutBeatShop==undefined) this.showError("CheckOut Beat Shop required")
    else if(this.AttendanceConfigList.IsFullDayBeatShop==undefined) this.showError("FullDay Beat Shop required")
    else if(this.AttendanceConfigList.IsMinimumVisit==true && this.AttendanceConfigList.DayMinVisits==undefined ){this.showError("Day Min Visits required")}
    //else if(this.AttendanceConfigList.IsMinimumVisit==false && this.AttendanceConfigList.DayMinVisits!=undefined ){this.showError("If You Enter DayMinVisits then DayMinVisits check is required")}
    else if(this.AttendanceConfigList.IsTADABeatShop==undefined) this.showError("TA/DA Beat Shop required")
    else if(this.AttendanceConfigList.IsTADARequired==true && this.AttendanceConfigList.TADACalls==undefined ) {this.showError("Minimum Productive Calls required")}
    //else if(this.AttendanceConfigList.IsTADARequired==false && this.AttendanceConfigList.TADACalls!=undefined ) {this.showError("If You Enter MinimumProductiveCalls then MinimumProductiveCalls check is required")}
    else if(this.AttendanceConfigList.Description==undefined) this.showError("Description required")
    else{
        var AttendanceRuleConfigDC= {
          "Id": this.AttendanceConfigList.Id==undefined?0:this.AttendanceConfigList.Id,
          "ChannelMasterId":this.AttendanceConfigList.ChannelObj.ChannelMasterId,
          "StoreId":[],
          "CityId":this.AttendanceConfigList.CityObj==undefined ? 0:this.AttendanceConfigList.CityObj.Cityid,
          "IsCheckinBeatShop": this.AttendanceConfigList.IsCheckinBeatShop=='true' ? true :false,
          "CheckInTime": this.AttendanceConfigList.CheckInTime ,
          "IsCheckOutBeatShop": this.AttendanceConfigList.IsCheckOutBeatShop=='true' ? true :false, 
          "IsFullDayBeatShop": this.AttendanceConfigList.IsFullDayBeatShop=='true' ? true :false,
          "IsMinimumVisit": this.AttendanceConfigList.IsMinimumVisit==undefined ? false :this.AttendanceConfigList.IsMinimumVisit,
          "DayMinVisits": this.AttendanceConfigList.DayMinVisits,
          "IsTADABeatShop": this.AttendanceConfigList.IsTADABeatShop=='true' ? true :false,
          "IsTADARequired":this.AttendanceConfigList.IsTADARequired==undefined ? false :this.AttendanceConfigList.IsTADARequired,
          "TADACalls":this.AttendanceConfigList.TADACalls,
          "Description":this.AttendanceConfigList.Description
        }
        console.log(AttendanceRuleConfigDC);  
        this.blocked = true;
        this.salesAtRule.InsertUpdateAttendanceConfig(AttendanceRuleConfigDC).subscribe(res=>{
          //console.log(res); 
          this.blocked = false;
          if(res.Status==true){ 
            this.showSuccess(res.Message)
            setTimeout(() => {
              alert("This attendance configuration will get enabled at 12 midnight.")
              this.CreateNew(); 
             }, 800);    
          }
          else this.showError(res.message)             
        },(err: any) => {
          this.blocked = false;
          console.log(err); this.showError(err.error.Message)})  
    }       
  }
  skip:number=0;
  take:number=10;
  TotalHistryRecordCount:number
  load(event) {
    debugger
    this.take = event && event.rows ? event.rows : 1;
    this.skip = event && event.first ? event.first : 0; 
    
    if(this.display){
      this.Editlog(false) 
      //this.skip=0 ;this.take=10;
    } 
  }
  first:number=0
  display:boolean=false;
  LogHistory:any[];
  Editlog(val){
    debugger;
    if(val!=false)this.display=true
    this.blocked = true;
    this.salesAtRule.Editlog(this.AttConfigId,this.skip,this.take).subscribe(res=>{
      console.log(res); 
      this.blocked = false;
      if(res.Status==true){ 
        this.LogHistory=res.Data.AttendanceRuleConfigLog;
        this.TotalHistryRecordCount=res.Data.TotalRecords
      }
      else this.showError('No Data Found')             
    },(err: any) => {
      this.blocked = false;
      console.log(err); this.showError(err.error.Message)})
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

  ExportLogHistory(){
    debugger
    this.blocked=true;
    this.salesAtRule.Editlog(this.AttConfigId,0,this.TotalHistryRecordCount).subscribe(res=>{
      console.log(res); 
      this.blocked = false;
      if(res.Status==true){ 
        var response = res.Data.AttendanceRuleConfigLog.map(function(rowData) {
          return {
            'Id':rowData.Id==null?0:rowData.Id,
            'Attendance Rule ConfigId':rowData.AttendanceRuleConfigId,
            'IsCheckinBeatShop': rowData.IsCheckinBeatShop,
            'Check In Time':( rowData.CheckInTime==null) ?'--':rowData.CheckInTime,
            'IsCheckOutBeatShop': rowData.IsCheckOutBeatShop,
            'IsFullDayBeatShop': rowData.IsFullDayBeatShop,
            'IsMinimumVisit': rowData.IsMinimumVisit, 
            'Day Min Visits':rowData.DayMinVisits==null?'--':rowData.DayMinVisits,
            'IsTADABeatShop':rowData.IsTADABeatShop,
            'IsTADARequired':rowData.IsTADARequired,
            'TADA Calls':rowData.TADACalls==null?'--':rowData.TADACalls,
            'Description':rowData.Description==null?'--':rowData.Description,
            'Remark':rowData.Remark==null?'--':rowData.Remark,
            'Created Date':rowData.CreatedDate,
           };
         });
        this.exportserv.exportAsExcelFile(response,"HistroyEditLogReport")
      }
      else this.showError('No Data Found')             
    },(err: any) => {
      this.blocked = false;
      console.log(err); this.showError(err.error.Message)})
  }

  ChannelTypeList:any
  CustomerChannelTypeList(){
    debugger;
    this.customerService.CustomerChannelTypeList().subscribe(res=>{
      this.ChannelTypeList=res;
      console.log(this.ChannelTypeList);
      
    })
  }

}


