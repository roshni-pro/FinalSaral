import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import {ConfirmationService, MessageService} from 'primeng/api';
@Component({
  selector: 'app-add-level-config',
  templateUrl: './add-level-config.component.html',
  styleUrls: ['./add-level-config.component.scss']
})
export class AddLevelConfigComponent implements OnInit {
  // @Output() ToBucket = new EventEmitter<any>();
  // @Output() FromBucket = new EventEmitter<any>();

  constructor(private router:Router ,private salesAppService:SalesAppServiceService,private messageService: MessageService,private confirmationService:ConfirmationService) { }
  showStreak:boolean=false
  showIndividual:boolean=false
  showOutOff:boolean=false
  isShowAdd:boolean=false
  selectedCondition:any
  rewardList:any[]=[]
  OpenCheck:boolean=true
  selectedToBucketNo:any
  selectedFromBucketNo:any
  streakCount:any
  streakDuration:any
  streakRewardType:any
  conditionDataList:any[]=[]
  streakRewardSection:any
  streakBlank:any
  IndLeval:any
  totalStrakBucket:any
  outOffBucket:number=0
  outofNew:any
  blocked:boolean=false
  isPush:boolean=false
  isShowOut:boolean=false
  levalConditionsList:any[]=[
    {
      'Name':'Streak'
    },
    {
      'Name':'Individual'
    },
    {
      'Name':'Out-Of'
    }
  ]
  rewardType:any[]=[
    {
      'Name':'Multiplier'
    },
    {
      'Name':'Fixed'
    }
  ]
  
  @Output() newItemEvent = new EventEmitter<boolean>();
  ngOnInit() {
    this.GetRewardList()
  }
  OnChangeCondition()
  {
    debugger
    if(this.selectedCondition.Name=='Streak')
    {
      this.showStreak=true
      this.showIndividual=false
      this.showOutOff=false
    }
    if(this.selectedCondition.Name=='Individual')
    {
      this.showStreak=false
      this.showIndividual=true
      this.showOutOff=false
    }
    if(this.selectedCondition.Name=='Out-Of')
    {
      
      this.outOffBucket=this.streakDuration
      this.showStreak=false
      this.showIndividual=false
      this.showOutOff=true
    }
    this.IndLeval=null
    this.streakBlank=null
    this.streakCount=null
    this.totalStrakBucket=null
    
    this.streakRewardSection=null
    this.streakRewardType=null
    this.streakRewardSection=null
  }
  Back()
  {
    this.router.navigateByUrl('layout/salesApp/LevelConfig');
  }
  GetRewardList()
  {
    this.salesAppService.RewardTypeList().subscribe(res=>
      {
        this.rewardList=res 
        console.log(this.rewardList,"rewardList");
        
      })
  }
 
  AddCondition()
  {
    this.isShowOut=false
   
    if(this.selectedCondition==null)
    {
      this.showWarn("Please Select Condition")
      return false
    }
    if(this.streakRewardType==null)
    {
      this.showWarn("Please Select Reward Type")
      return false
    }
    if(this.streakRewardSection==null  && this.selectedCondition.Name=='Streak') 
    {
      this.showWarn("Please Select Choose Reward Type")
      return false
    }
    if(this.streakBlank==null)
    {
      this.showWarn("Enter Reward Value")
      return false
    }
    if(this.streakBlank<=0)
    {
      this.showWarn("Reward Value should be greater than 0")
      return false
    }
    if(this.streakCount==null && this.selectedCondition.Name=='Streak')
    {
      this.showWarn("Enter Streak Count")
      return false
    }
    if(this.streakCount<=0 && this.selectedCondition.Name=='Streak')
    {
      this.showWarn("Streak Count should be greater than 0")
      return false
    }
    if(this.streakCount>this.streakDuration && this.selectedCondition.Name=='Streak')
    {
      this.showWarn("Streak Count cannot more than Streak Duration")
      return false
    }
    if(this.IndLeval==null && this.selectedCondition.Name=='Individual' )
    {
      this.showWarn("Enter Level")
      return false
    }
    if(this.IndLeval<=0 && this.selectedCondition.Name=='Individual' )
    {
      this.showWarn("Level should be greater than 0")
      return false
    }
    if(this.IndLeval>this.streakDuration && this.selectedCondition.Name=='Individual' )
    {
      this.showWarn("Level cannot more than Streak Duration")
      return false
    }
    if(this.totalStrakBucket ==null && this.selectedCondition.Name=='Out-Of')
    {
      this.showWarn("Enter Total Streak Bucket")
      return false
    }
    if(this.totalStrakBucket<=0 && this.selectedCondition.Name=='Out-Of')
    {
      this.showWarn("Total Streak Bucket should be greater than 0")
      return false
    }
    if(this.totalStrakBucket>this.streakDuration && this.selectedCondition.Name=='Out-Of')
    {
      this.showWarn("Total Streak Bucket cannot more than Streak Duration")
      return false
    }
    if(this.outOffBucket ==null && this.selectedCondition.Name=='Out-Of')
    {
      this.showWarn("Enter Out_Off")
      return false
    }
    var condition =null
    if(this.selectedCondition.Name=='Streak')
    { 
      condition='Continuous_'+this.streakCount
       var StreakConditionType =2
    }
    if(this.selectedCondition.Name=='Individual')
    {
      condition='Streak Level_'+this.IndLeval
      StreakConditionType =1
    }
    if(this.selectedCondition.Name=='Out-Of')
    {
      condition=this.totalStrakBucket+'_Out-of_'+this.outOffBucket
      StreakConditionType =3
    }
    if(this.streakRewardSection!=null)
    {
       var rewardSection=this.streakRewardSection.Name=='Multiplier'?this.streakBlank+'x':this.streakBlank
    }
    else
    {
    rewardSection=this.streakBlank
    }
    if(this.streakRewardSection!=null)
    {
     var Streak_ChooseRewardId= this.streakRewardSection.Name=='Multiplier'?1:2
    }
  
    const payload ={
      'Id':null,
      'BucketNoFrom':this.selectedFromBucketNo,
      'BucketNoTo':this.selectedToBucketNo,
      'StreakConditionType':StreakConditionType,
      'StreakConditionTypeName':this.selectedCondition.Name,
       'RewardType':this.streakRewardType.RewardID,
       'RewardTypeName':this.streakRewardType.RewardType,
       'RewardValue':this.streakBlank,
       'Streak_StreakCount':this.streakCount,
       'Streak_ChooseReward':Streak_ChooseRewardId?Streak_ChooseRewardId:null,
       'Streak_ChooseRewardName':this.streakRewardSection?this.streakRewardSection.Name:null,
       'OutOf_OutOfBucket':this.outOffBucket?this.outOffBucket:null,
       'OutOf_TotalBucket':this.totalStrakBucket?this.totalStrakBucket:null,
       'LevelNo':this.IndLeval?this.IndLeval:null,
       'LevelValue':this.selectedCondition.Name=='Individual'?this.streakBlank:null,
       'Condition':condition,
       'Reward':rewardSection,
    }
     this.isPush=false
  
    this.conditionDataList.forEach(x=>
      {
        debugger
        console.log(payload,"payload");

            if(payload.StreakConditionTypeName=='Out-Of')
            {
              if(x.StreakConditionTypeName=='Out-Of')
              {
                this.isPush=true
                this.isShowOut=true
              }
            }
         if(payload.StreakConditionTypeName=='Streak')
         {
          if(x.RewardTypeName==payload.RewardTypeName && x.Streak_ChooseRewardName==payload.Streak_ChooseRewardName && x.Streak_StreakCount==payload.Streak_StreakCount && x.RewardValue==payload.RewardValue)
          {
            this.isPush=true
          }
         }
         if(payload.StreakConditionTypeName=='Individual')
         {
          if(x.RewardTypeName==payload.RewardTypeName && x.Streak_ChooseRewardName==payload.Streak_ChooseRewardName && x.LevelNo==payload.LevelNo && x.RewardValue==payload.RewardValue)
          {
            this.isPush=true
          }
         }
         if(payload.StreakConditionTypeName=='Out-Of')
         {
          if(x.RewardTypeName==payload.RewardTypeName && x.Streak_ChooseRewardName==payload.Streak_ChooseRewardName && x.OutOf_TotalBucket==payload.OutOf_TotalBucket && x.RewardValue==payload.RewardValue && x.OutOf_OutOfBucket==payload.OutOf_OutOfBucket)
          {
            this.isPush=true
          }
         }
      })
      console.log(this.conditionDataList);
      debugger
      if(this.isPush)
      {
        if(this.isShowOut)
        {
          this.showWarn("Out-Off Condition Already Exists")
        }
        else
        {
          this.showWarn("Already Exist")
        }
      }
      else
      {
        this.conditionDataList.push(payload)
        this.OnCancel()
  
      }
  }
Data:any[]=[]
  redirect() {
    debugger;
  //  this.newItemEvent.emit(true);
   let list = 
   {
      selectedFromBucketNo: this.selectedFromBucketNo,
      selectedToBucketNo: this.selectedToBucketNo
   }
   this.Data.push(list);   
   this.salesAppService.FromBucket(this.Data);   //,this.selectedToBucketNo
   this.router.navigateByUrl("layout/salesApp/LevelConfig")
  }


  SaveAllConfig()
  {
    debugger;
    if(this.conditionDataList.length==0)
    {
      this.showWarn("Please Add Condtion")
      return false
    }
    debugger;
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        debugger;
        this.blocked=true
        this.salesAppService.InsertGameStreakLevelConfig(this.conditionDataList).subscribe(res=>
          {
            this.blocked=false
            console.log(res,"res");
            if(res.status==true)
            {
              this.showSuccess(res.Message)
              this.redirect()
            }
            else
            {
              this.showWarn(res.Message)
            }
          })
      },
      reject: () => {
        this.blocked=false
      }
    });

   
  }

  Check()
  {
    
    if(this.selectedFromBucketNo==null)
    {
     this.showWarn("Enter From Bucket No")
     return false
    }
    if(this.selectedToBucketNo==null)
    {
      this.showWarn("Enter To Bucket No")
      return false
    }
    if(this.selectedFromBucketNo>this.selectedToBucketNo)
    {
      this.showWarn("To Bucket No. Should be Greater than From Bucket No")
      return false
    }
    this.salesAppService.CheckBucketNo(this.selectedFromBucketNo,this.selectedToBucketNo).subscribe(res=>
      {
        if(res=='true')
        {
          this.OpenCheck=false
          this.showOutOff=false
          this.showIndividual=false
          this.showStreak=false
        }
        else
        {
          this.showWarn(res)
        }
        
      })
      this.StreakDuration()

  }
  clear()
  {
    this.OpenCheck=true
    this.selectedFromBucketNo=null
    this.selectedToBucketNo=null
    this.conditionDataList=[]
    this.selectedCondition=[]
  }
 
  StreakDuration()
  {
    this.salesAppService.StreakDuration().subscribe(res=>
      {
        console.log(res,"Duration");
        this.streakDuration=res
        
      })
  }
  Delete(item)
  {
    debugger
    console.log(item);
    // this.conditionDataList.slice(item)
    this.conditionDataList=this.conditionDataList.filter(x=>x!=item)
    console.log(this.conditionDataList,"slice(1)");
    if(this.conditionDataList.length==0)
    {
      this.clear()
    }
    
  }
  OnCancel()
  {
       this.selectedCondition=null
        this.streakCount=null
        this.streakRewardType=null
        this.streakRewardSection=null
        this.streakBlank=null
        this.outOffBucket=null
        this.totalStrakBucket=null
        this.IndLeval=null
        this.showOutOff=false
        this.showIndividual=false
        this.showStreak=false
  }
  showWarn(msg) {
    this.messageService.add({severity:'error', summary:msg });
  }
  showSuccess(msg)
  {
  this.messageService.add({severity:'success', summary: msg})
  }
}
