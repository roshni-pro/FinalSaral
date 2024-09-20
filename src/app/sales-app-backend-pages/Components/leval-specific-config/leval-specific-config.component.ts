import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import {MessageService} from 'primeng/api';
import { ConfirmationService } from 'primeng/api'

@Component({
  selector: 'app-leval-specific-config',
  templateUrl: './leval-specific-config.component.html',
  styleUrls: ['./leval-specific-config.component.scss']
})
export class LevalSpecificConfigComponent implements OnInit {
  constructor(private router:Router,private service:SalesAppServiceService,private messageService: MessageService, private confirmationService: ConfirmationService) { }
  skip:number=1
  blocked:boolean=false
  take:number=10
  levelConfigMainData:any[]=[]
  selFromBucket:any
  streakDurationOutOf:number
  selToBucket:any
  detailsData:any[]=[]
  showDetailPop:boolean=false
  fromBucketNo:any
  toBucketNo:any
  first:number=0;
  bucketNoList:any[]=[]
  checked2: boolean = true;
  isActiveState:any
  filterActive:any[]=[
    {
      'Id':0,
      'name':'Both'
    },
    {
      'Id':1,
      'name':'Active'
    },
    {
      'Id':2,
      'name':'Inactive'
    }
  ]
  selectedMessage:any
  
  ngOnInit() {
    this.GetDistinctBucketNo()
    this.isActiveState={
        'Id':0,
        'name':'Both'
    }
    this.service.currentMessage.subscribe(res => { console.log("messagew",res);
    if(res.length!=0){
   this.selFromBucket=res[0].selectedFromBucketNo
   this.selToBucket = res[0].selectedToBucketNo
  // debugger;
   this.service.GetGameStreakLevelConfigMaster(this.selFromBucket,this.selToBucket,this.skip,this.take,0).subscribe(res=>  {
      this.blocked=false
      this.levelConfigMainData=res     
    }) } });
  }

  AddLevalConfig()
  {
    this.router.navigateByUrl('layout/salesApp/addLevelConfig');
  }
  load(event)
{
  if (event) {
    var Last = event.first ? event.first + event.rows : 10
    this.take = event.rows
    this.skip = Last / event.rows
  this.service.GetGameStreakLevelConfigMaster(this.selFromBucket,this.selToBucket,this.skip,this.take,this.isActiveState.Id).subscribe(res=>
    {
      this.levelConfigMainData=res
    })
  }
}
OnSearch(selFromBucket,selToBucket,isActiveState)
{
  if(selFromBucket==null)
  {
    this.showWarn("Please Select From Bucket No")
    return false
  }
  if(selToBucket==null)
  {
    this.showWarn("Please Select To Bucket No.")
    return false
  }
  this.first=0;
  this.blocked=true
  this.service.GetGameStreakLevelConfigMaster(selFromBucket,selToBucket,this.skip,this.take,isActiveState.Id).subscribe(res=>
    {
      this.blocked=false
      this.levelConfigMainData=res
     
    })
}
 GetDistinctBucketNo()
 {
  this.service.GetDistinctBucketNo().subscribe(res=>
    {
      if(res.status==true)
      {
        this.bucketNoList=res.Message
      }
    })
 }

 DetailData(item)
 {
  this.streakDurationOutOf=0
  this.fromBucketNo=item.BucketNoFrom
  this.toBucketNo=item.BucketNoTo
  this.showDetailPop=true
  this.blocked=true
  this.service.GetGameStreakLevelConfigDetail(item.BucketNoFrom,item.BucketNoTo,this.skip,this.take,item.CreatedDate).subscribe(res=>
    {
      this.blocked=false
      this.detailsData=res
      console.log(this.detailsData,"detailsData");
      this.detailsData.forEach(x=>
      {
        if(x.OutOf_OutOfBucket>0)
        {
          this.streakDurationOutOf=x.OutOf_OutOfBucket
        }
      })        
    })
 }
 Refresh()
 {
  this.levelConfigMainData=[]
 }
 DeleteConfig(item)
 {
  this.blocked=true
  this.service.DeleteGameStreakMaster(item.BucketNoFrom,item.BucketNoTo).subscribe(res=>
    {
      this.blocked=false
      if(res.status==true)
      {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
         this.showSuccess(res.Message)
        //alert(res.Message)
        this.OnSearch(this.selFromBucket,this.selToBucket,this.isActiveState)
      }
      else
      {
        this.showWarn(res.Message)
      }
      
    })
 }
 confirm1(item)
 {  
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       this.DeleteConfig(item)
      },
      reject: () => {
      }
  });
 }
 Configconfirm(item)
 {  
    var msg=item.IsActiveCurrent==true?"Active":"InActive"
    this.confirmationService.confirm({
      message: 'Are you sure that you want to '+msg+'?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       this.ConfigActive(item)
      },
      reject: () => {
        item.IsActiveCurrent=item.IsActiveCurrent==true?false:true
      }
  });
 }

 showWarn(msg) {
  this.messageService.add({severity:'error', summary:msg });
}
showSuccess(msg)
{
this.messageService.add({severity:'success', summary: msg})
}
ConfigActive(item)
{
  this.blocked=true
  this.service.InActiveActiveGameStreakMaster(item.BucketNoFrom,item.BucketNoTo,item.IsActiveCurrent,item.CreatedDate).subscribe(res=>
    {
      console.log(res,"Configconfirm");
      
      if(res.status == true){
        this.blocked=false
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.showSuccess(res.Message)
      }
      else{
        this.blocked=false
        this.showWarn(res.Message)
        item.IsActiveCurrent=false
      }
   
    })
}
}
