import { Component, OnInit } from '@angular/core';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api'
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-game-bucket-reward',
  templateUrl: './game-bucket-reward.component.html',
  styleUrls: ['./game-bucket-reward.component.scss']
})
export class GameBucketRewardComponent implements OnInit {

  constructor(private exportServ:ExportServiceService,
    private salesAppService:SalesAppServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.GetRewardList()
    this.GetAppDescListData()
    this.isActiveState={
      'Id':0,
      'name':'Both'
    }
    // this.load()
  }
  isFixed=[
    {
      'Name':"Fixed",
      'isFixed':true
      
    },
    {
      'Name':"Dynamic",
      'isFixed':false
    }
  ]
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
  rewardApprovedStatus=[
    // {
    //   'name':'Pending'
    // },
    {
      'name':'Delivered'
    },
    // {
    //   'name':'Settled'
    // }
  ]
  showRow:boolean=false
  rewardApproveStatus:any
  value:any
  fromBucket:number
  isActiveState:any
  tempBucket:any[]=[]
  toBucket:number
  conditionMasterName:any
  conditionMasterValue:any
  AppDescriptionListData:any[]=[]
  selectedAppDesc:any
  selectedRewardType:any
  IseditOpen:boolean=false
  EditstartDate:any=null
  EditEndDate:any=null
  isFix:any;
  selectedisFix:any
  skip:number;
  EditAppName:any
  EditAppValue:any
  EditAppDes:any
  take:number;
  bucketNo:number
  totalRecords:any
  gameBucketRewards:any
  rewardList:any
  EditselectedRewardType:any
  startDate:any
  endDate:any
  editData:any
  EditBucketNo:any
  EditisFix:any
  showEditDate:boolean=false
  EditValue:any
  EditRewardType:any
  EditRewardApproveStatus:any
  blocked:boolean=false
  first:number=0
  AddNewRow()
  {
    this.showRow=true
    this.bucketNo=null
    this.selectedisFix=null
    this.selectedRewardType=null
    this.value=null
    this.rewardApproveStatus=null
    this.startDate=null
    this.endDate=null
    this.appDescriptionArray=[]
    // this.GetAppDescListData()
  }
  GetRewardList()
  {
    this.salesAppService.RewardTypeList().subscribe(res=>
      {
        this.rewardList=res 
      })
  }
 
  AddNew()
  {
    debugger
    if(this.bucketNo==null && this.bucketNo==undefined)
    {
    alert("Enter Bucket No")
     return
    }
    if(this.bucketNo==0)
    {
      alert("Bucket No Cannot be 0")
      return false
    }
    if(this.selectedRewardType==null && this.selectedRewardType==undefined)
    {
      alert("Select RewardType")
     return
    }
    if(this.value==null && this.value==undefined || (this.value<=0))
    {
      alert("Reward Should be greater than 0")
     return
    }
    if(this.selectedisFix==null && this.selectedisFix==undefined)
    {
    alert("Select IsFix")
     return
    }
    if(this.selectedisFix.isFixed==false && this.startDate==null && this.endDate==null)
    {
      if(this.startDate==null || this.endDate==null)
      {
        alert("Please Selet StartDate And EndDate")
        return false
      } 
    }
    if(this.selectedisFix.isFixed==false && this.startDate==null)
    {
      alert("Select Start Date")
      return false
    }
    if(this.selectedisFix.isFixed==false && this.endDate==null)
    {
      alert("Select End Date")
      return false
    } 
    if(this.startDate>this.endDate)
    {
      alert("End Date Cannot be Greater than Start Date")
      return false
    }


    if(this.rewardApproveStatus==null && this.rewardApproveStatus==undefined)
    {
      alert("Select RewardApproveStatus")
     return
    }
    if(this.appDescriptionArray==null && this.appDescriptionArray==undefined)
    {
      alert("Select App Description")
     return
    }
    var arrapp = this.appDescriptionArray.map(function(a) {
      return {
        'GameConditionMasterId':a.GameConditionMasterId,
        'value':a.value
       };
     });
     if(this.appDescriptionArray.length==0)
     {
       alert("Please Add App Description")
       return false
     }
  
    const payload=
    {
      'BucketRewardConditionsID':null,
      'BucketNo':this.bucketNo,
      'IsFix':this.selectedisFix.isFixed,
      'RewardType':this.selectedRewardType.RewardID,
      'value':this.value,
      'StartDate':this.startDate,
      'EndDate':this.endDate,
      'RewardApproveStatus':this.rewardApproveStatus.name,
      // 'GameConditionMasterId':1,
      'GameConditionLists':arrapp
    }
    this.blocked=true
    this.salesAppService.AddNewGameReward(payload).subscribe(res=>
      {
        this.blocked=false
        if(res.status==true)
        {
          this.showSuccess(res.Message)
          // this.load()
          this.onSearchBucket(this.bucketNo,this.bucketNo)
          this.Cancel()
        }
        else{
         alert(res.Message)
        }
      })
  }
  Cancel()
  {
    this.showRow=false
    this.bucketNo=null
    this.selectedisFix=null
    this.selectedRewardType=null
    this.value=null
    this.rewardApproveStatus=null
    this.startDate=null
    this.endDate=null
    this.selectedAppDesc=null
    this.appDescriptionArray=[]
    this.conditionMasterName=null
    this.conditionMasterValue=[]

  }
  showWarn(msg) {
    this.messageService.add({severity:'error', summary:msg });
 }
 showSuccess(msg)
 {
  this.messageService.add({severity:'success', summary: msg})
 }

 confirm1(data)
 { 
  debugger
     var msg=data.IsActive ==true?"Active":"InActive"
    this.confirmationService.confirm({
      message: 'Are you sure that you want to '+msg+'?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       this.InactiveActiveBucket(data)
      },
      reject: () => {
        data.IsActive=data.IsActive==true?false:true
      }
  });
 }
 confirmEdit(item)
 {  
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       this.Remove2(item)
      },
      reject: () => {
      }
  });
 }
 Remove(Id)
 {
  this.blocked=true
 this.salesAppService.DeleteDataGameRewards(Id).subscribe(res=>
  {
    this.blocked=false
    if(res.status==true)
    {
      this.showSuccess(res.Message)
      this.onSearchBucket(this.fromBucket,this.toBucket)
    }
  })
 }
 BucketConditionList:any[]=[]
 EditIsActive:boolean=false
 EditData(data)
 {
  debugger
  this.EditIsActive=data.IsActive
  this.EditstartDate=null
  this.EditEndDate=null
  this.IseditOpen=true
  this.editData=data
  this.EditRewardType= this.rewardList.find(y => y.RewardID == this.editData.RewardType)
  this.EditBucketNo=this.editData.BucketNo
  this.EditisFix=this.editData.IsFix
  this.EditValue=this.editData.BucketRewardValue
  this.EditstartDate=this.editData.StartDate!=null ? new Date(this.editData.StartDate) :null
  this.EditEndDate =this.editData.EndDate!=null ? new Date(this.editData.EndDate) :null
   this.EditRewardApproveStatus= this.rewardApprovedStatus.find(y => y.name == this.editData.RewardApproveStatus)
  if(data.IsFix==false)
  {
    this.EditisFix=this.isFixed[1]
  }
  else
  {
    this.EditisFix=this.isFixed[0]
  } 
  debugger
  this.showEditDate=this.editData.IsFix== false ? true:false
  this.GetBucketNoCondition(data)
 }

 GetBucketNoCondition(data)
 {
  this.salesAppService.GetBucketNoCondition(this.EditBucketNo,this.EditBucketNo,data.BucketRewardConditionsID).subscribe(res=>
    {
    this.BucketConditionList=res.Message
    })
 }
 Edit()
 {
 this.tempBucket=[]
  if(this.EditisFix.isFixed==false && this.EditstartDate==null && this.EditEndDate ==null)
    {
        alert("Please Select Start Date and End Date")
        return false
    }
    if(this.EditisFix.isFixed==false && this.EditstartDate==null)
    {
      alert("Select Start Date")
      return false
    }
    if(this.EditisFix.isFixed==false && this.EditEndDate==null)
    {
      alert("Select End Date")
      return false
    }
    if(this.BucketConditionList.length==0)
    {
      alert("Please Add Conditions")
      return false
    }
    if(this.EditstartDate>this.EditEndDate)
    {
      alert("Start Date Cannot be greater than End Date")
      return false
    }
    var count =false
    this.BucketConditionList.forEach(x=>
      {
        if(x.GameValue<=0 || x.GameValue==null)
        {
             count=true
        }
      })
      if(count)
      {
     alert("Please Enter Value")
     return false;
      }
    this.BucketConditionList.forEach(x=>
      {
        var obj=
        {
          'GameConditionMasterId':x.GameConditionMasterId,
          'value':x.GameValue
        }
        this.tempBucket.push(obj)
      })
     
  const payload={
    'BucketRewardConditionsID':this.editData.BucketRewardConditionsID,
    'BucketNo':this.EditBucketNo,
    'IsFix':this.EditisFix.isFixed,
    'RewardType':this.EditRewardType.RewardID,
    'value':this.EditValue,
    'StartDate':this.EditstartDate,
    'EndDate':this.EditEndDate,
    'RewardApproveStatus':this.EditRewardApproveStatus.name,
    'GameConditionLists':this.tempBucket
  }
  this.blocked=true
  this.salesAppService.EditNewGameReward(payload).subscribe(res=>
    {
      this.blocked=false
      if(res.status==true)
      {
        this.showSuccess(res.Message)
        if(this.fromBucket==null && this.toBucket ==null)
        {
          // this.load()
        }
        else
        {
          this.onSearchBucket(this.fromBucket,this.toBucket)
        }
       
        this.EditCancel() 
      }
      else
      {
        alert(res.Message)
      }
    
    })
 }
 EditCancel()
 {
  this.IseditOpen=false
  this.isAddMore=false
  this.EditAppDes=null
  this.EditAppValue=null
 }
 showDate:boolean=false
 Isfixed(selectedisFix)
 {
  this.showDate=selectedisFix.Name=='Dynamic'?true:false  
 }
 OnchangeAPP(selectedApp)
 {
  this.conditionMasterName=selectedApp.Name
  // this.conditionMasterValue=selectedApp.Value
  this.conditionMasterValue=null
 }

 IsfixedEdit(EditIsFix)
 {
  debugger
  this.EditstartDate=null
  this.EditEndDate=null
  this.showEditDate=EditIsFix.Name=='Dynamic'?true:false 
 }
 GetAppDescListData()
 {  
   // this.blocked=true
   this.salesAppService.AppDescriptionList().subscribe(res=>
     {
    
       if(res.status == true){
        
         this.AppDescriptionListData=res.Message
         
       }
     })
 }
 OnEditchangeAPP(editapp)
 {
  debugger
  this.EditAppName=editapp.Name
  // this.EditAppValue=editapp.Value
  this.EditAppValue=null
 }
 onSearchBucket(fromBucket,toBucket)
 {
  debugger
  this.fromBucket=fromBucket
  this.toBucket=toBucket
   if(this.fromBucket == null)
   {
    this.showWarn("Enter From Bucket No")
    return false
   }
   if(this.toBucket == null)
   {
    this.showWarn("Enter To Bucket No")
    return false
   }
   if(this.fromBucket>this.toBucket)
   {
    this.showWarn("To Bucket No Should be greater than From Bucket No")
    return false
   }
   this.gameBucketRewards=[]
   this.blocked=true
   this.first=0
   this.salesAppService.GetSearchDataByBucketNo(this.fromBucket,this.toBucket,this.isActiveState.Id).subscribe(res=>
    {
      this.blocked=false
      if(res.status==true)
      {
        this.gameBucketRewards=res.Message.gameBucketRewards
      }
    })
 }
 Export()
 {
  debugger
  if(this.gameBucketRewards.length==0)
  {
    this.showWarn("No Data Found")
    return false
  }
  var result = this.gameBucketRewards.map(function(a) {
    return {
      'Bucket No': a.BucketNo,
      'IsFix': a.isFixTypeName,
      'Reward Type': a.RewardTypeName,
      'Reward Value':a.BucketRewardValue,
      'Start Date':a.StartDate,
      'End Date':a.EndDate,
      'Reward Approve Status':a.RewardApproveStatus,
     };
   });
  this.exportServ.exportAsExcelFile(result,"GameBucketRewardsData")
 }
 Refresh()
 {
  this.fromBucket=null
  this.toBucket=null
  //  this.load()
  this.gameBucketRewards=[]
 }
  appDescriptionArray:any[]=[]
 AddDescriptionValue(selectedAppDesc)
 {
  if(selectedAppDesc ==null)
  {
    alert("Please Select Condition")
    return false;
  }
  if(this.conditionMasterValue==null)
  {
    alert("Please Enter Value")
    return false;
  }
  if(this.conditionMasterValue<=0)
  {
    alert("Value Should be Greater than 0")
    return false;
  }
 var flag=false
  var obj={
    'GameConditionMasterId':selectedAppDesc.Id,
    'AppDescriptionName':selectedAppDesc.AppDesc,
    'Name':selectedAppDesc.Name,
    'value':this.conditionMasterValue
  }
  this.appDescriptionArray.forEach(x=>
    {
      if(x.GameConditionMasterId==obj.GameConditionMasterId)
      {
        flag = true
      }
    })
 if(!flag)
 {
  this.appDescriptionArray.push(obj)
 }
 else
 {
  alert("Please Add Other App Description")
  return false
 }
 this.selectedAppDesc=null
 this.conditionMasterValue=null
 this.conditionMasterName=null
 }
 isAddMore:boolean=false
 AddMore()
 {
  debugger
if(this.isAddMore==false)
{
  this.isAddMore=true
}
else
{
  this.isAddMore=false
}
this.EditAppDes=null
this.EditAppValue=null
this.EditAppName=null
 }
 oldgameValue:any
 UpdateAppDesc(item)
 {
  debugger
  if(this.oldgameValue==undefined)
  {
    this.oldgameValue=item.GameValue
  }
  if(item.GameValue==null)
  {
    alert("Please Enter Value")
    return false
  }
  if(this.oldgameValue==item.GameValue)
  {
    alert("Please Change Value")
    return false
  }
  
  this.salesAppService.EditBucketCondition(item.BucketRewardConditionsID,item.GameValue).subscribe(res=>
    {
      this.oldgameValue=undefined
    if(res.status==true)
    {
      alert(res.Message)
    }
    else
    {
      alert(res.Message)
    }
    // this.GetBucketNoCondition()
    })
 }
 AddNewCondition()
 {
  if(this.EditAppDes==null)
 {
  alert("Select App Description")
  return false
 }
 if(this.EditAppValue==null)
 {
  alert("Please Enter Value")
  return false
 }
 if(this.EditAppValue<=0)
 {
  alert("Value Should be greater than 0")
  return false
 }
 var obj={
  'GameConditionMasterId':this.EditAppDes.Id,
  'AppDesc':this.EditAppDes.AppDesc,
  'Name':this.EditAppName,
  'GameValue':this.EditAppValue
}
var flag=false
this.BucketConditionList.forEach(x=>
  {
    if(x.GameConditionMasterId==obj.GameConditionMasterId)
    {
      flag = true
    }
  })
if(!flag)
{
  this.BucketConditionList.push(obj)
}
else
{
alert("Please Add Other App Description")
return false
}
this.EditAppDes=null
this.EditAppName=null
this.EditAppValue=null
 }
 confirm2(data)
{
  this.confirmationService.confirm({
    message: 'Are you sure that you want to delete this condition?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.BucketConditionList=this.BucketConditionList.filter(x=>x!==data)
    },
    reject: () => {
    }
});
}
confirmDeleteAdd(data)
{
  this.confirmationService.confirm({
    message: 'Are you sure that you want to delete this condition?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.appDescriptionArray=this.appDescriptionArray.filter(x=>x!==data)
    },
    reject: () => {
    }
});
}
Remove2(Id)
{
  debugger;
  this.salesAppService.DeleteGameCondition(Id).subscribe(res=>
    {
      if(res.status==true)
  {
    alert(res.Message)
    // this.GetBucketNoCondition()
    //  this.GetBucketNoCondition()
      if(this.BucketConditionList.length==1)
      {
        this.IseditOpen=false
        this.onSearchBucket(this.fromBucket,this.toBucket)
     }
   }
    
})
}
InactiveActiveBucket(data)
{
  this.blocked=true
   this.salesAppService.CheckActiveInactiveBucket(data.BucketNo,data.IsActive,data.BucketRewardConditionsID).subscribe(res=>
    {
      this.blocked=false
      if(res.status==true)
      {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.showSuccess(res.Message)
      }else
      {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.showWarn(res.Message)
        data.IsActive=data.IsActive==true?false:true
      }
     
    }) 
}
 
}
