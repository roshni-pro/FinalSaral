import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { element } from 'protractor';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-gaming-reward-Dashboard',
  templateUrl: './gaming-reward-Dashboard.component.html',
  styleUrls: ['./gaming-reward-Dashboard.component.scss']
})
export class GamingRewardDashboardComponent implements OnInit {

  constructor( private salesAppService:SalesAppServiceService,  private messageService: MessageService, private exportService:ExportServiceService ) { }
  selectedCities:any
  selectedHub:any
  cityHub:any[]=[]
  selectedSkCode:string=''
  toBucket:number=0
  fromBucket:number=0
  blocked:boolean=false
  hubList:any[]=[]
  exportRewardDashboardData:any[]=[]
  cityListData:any[]=[]
  rewardDashboardData:any[]=[]
  skip:number=1
  take:number=10
  totalRecords:number
  ngOnInit() {
    this.cityList()
  }
  cityList() {
    this.salesAppService.getCityList().subscribe(res => {
      this.cityListData = res;
    })
  }
  getAllHUbList(selectedCities){
    this.cityHub=[]
   this.salesAppService.getHubList(selectedCities.Cityid).subscribe(res => {
     this.hubList = res 
    this.hubList.forEach(element=>
      {
        this.cityHub.push(element.WarehouseId)
      })
   }); 
}
load(event)
{
  if (event) {
    var Last = event.first ? event.first + event.rows : 10
    this.take = event.rows
    this.skip = Last / event.rows
  }
  this.selectedSkCode=this.selectedSkCode==""?null:this.selectedSkCode
  const payload=
  {
    'CityId':this.selectedCities.Cityid,
    'Warehouseid':this.cityHub,
    'Skcode':this.selectedSkCode,
    'FromBucketNo':this.fromBucket,
    'EndBucketNo':this.toBucket,
    'Skip':this.skip,
    'Take':this.take
  }
  this.blocked=true
  this.salesAppService.GetDashboardGameProgress(payload).subscribe(res=>
    {
      this.blocked=false
      
      this.rewardDashboardData=res.Message.DashboardHeader
      this.totalRecords=res.Message.TotalRecords
    })
}
onSearch()
{
 this.selectedSkCode=this.selectedSkCode==""?null:this.selectedSkCode
  
debugger
  if(this.selectedCities==null)
  {
    this.showWarn("Please Select City")
    return false
  }
  if(this.fromBucket>this.toBucket)
   {
    this.showWarn("To Bucket No Should be greater than From Bucket No")
    return false
   }

const payload=
{
  'CityId':this.selectedCities.Cityid,
  'Warehouseid':this.cityHub,
  'Skcode':this.selectedSkCode,
  'FromBucketNo':this.fromBucket,
  'EndBucketNo':this.toBucket,
  'Skip':this.skip,
  'Take':this.take
}
this.blocked=true
this.salesAppService.GetDashboardGameProgress(payload).subscribe(res=>
  {
    debugger
    this.blocked=false
    this.rewardDashboardData=res.Message.DashboardHeader
    this.totalRecords=res.Message.TotalRecords
    
    
  })
}
showWarn(msg) {
  this.messageService.add({severity:'error', summary:msg });
}
showSuccess(msg)
{
this.messageService.add({severity:'success', summary: msg})
}
isShowPOp:boolean=false
GetGameDashboardDetail:any[]=[]
showPop(skcode)
{
  debugger
  this.isShowPOp=true
  const payload=
  {
    'CityId':this.selectedCities.Cityid,
    'Warehouseid':this.cityHub,
    'Skcode':skcode,
    'FromBucketNo':this.fromBucket,
    'EndBucketNo':this.toBucket
  }
  this.blocked=true
  this.salesAppService.GetGameDashboardDetail(payload).subscribe(res=>
    {
      this.blocked=false
     this.GetGameDashboardDetail=res.Data

     
    })
}

ExportDashBoardData()
{
  this.exportRewardDashboardData=[]
  if(this.rewardDashboardData.length==0)
  {
    this.showWarn("No Data Found")
    return false
  }
   
  const payload=
{
  'CityId':this.selectedCities.Cityid,
  'Warehouseid':this.cityHub,
  'Skcode':this.selectedSkCode,
  'FromBucketNo':this.fromBucket,
  'EndBucketNo':this.toBucket,
  'Skip':1,
  'Take':this.totalRecords
}
this.blocked=true
this.salesAppService.GetDashboardGameProgress(payload).subscribe(res=>
  {
    debugger
    this.blocked=false
    this.exportRewardDashboardData=res.Message.DashboardHeader  
    var result = this.exportRewardDashboardData.map(function(a) {
      return {
        'SkCode ':  a.SkCode ,   
       ' CustomerId ':a.CustomerId,
      '  ShopName':a.ShopName,
       ' CrmBucketNo':a.CrmBucketNo ,
     '   Game Level':a.CurrentBucket,
       '  RewardBucketNo':a.BucketNo,
        'NextRewardBucketNo':a.NextBucketNo,
  '      BucketStartDate':a.BucketStartDate,
      '  BucketEndDate ':a.BucketEndDate ,
       ' LastOrderDate':a.LastOrderDate 
       };
     });
    this.exportService.exportAsExcelFile(result,"Gaming Reward DashboardData")
  })
 
}
ExportDashBoardDetails()
{
  if(this.GetGameDashboardDetail===null)
  {
    alert("No Data Found")
    return false
  }
  
  var result = this.GetGameDashboardDetail.map(function(a) {
    return {
     'Game Level':a.CurrentBucket,
      'RewardBucketNo':a.BucketNo,
    '  OrderId':a.OrderId,
    '  RewardCredit':a.RewardCredit,
     ' RewardStatus':a.RewardStatus,
      'GameBucketRewardCondition':a.gameBucketRewardCondition,
     ' Start Date':a.BucketStartDate,
      'End Date':a.BucketEndDate
     };
   });
  this.exportService.exportAsExcelFile(result,"GameDashboardDetail")
}
}
