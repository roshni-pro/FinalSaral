import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { event } from 'jquery';
import { ConfirmationService } from 'primeng/api'

@Component({
  selector: 'app-game-bucket-rewards-condition',
  templateUrl: './game-bucket-rewards-condition.component.html',
  styleUrls: ['./game-bucket-rewards-condition.component.scss']
})
export class GameBucketRewardsConditionComponent implements OnInit {

  constructor(private salesAppService:SalesAppServiceService,
    private messageService: MessageService,private confirmationService: ConfirmationService) { }
  showAddCondition:boolean=false
  selectedBucketNo:any
  selectedvalue:any
  blocked:boolean=false
  BucketListData:any[]=[]
  AppDescriptionListData:any[]=[]
  selectedAppDesc:any
  conditionMasterValue:number
  conditionMasterName:string
  gameBucketConditions:any[]=[]
  totalRecords:any[]=[]
  skip:number=0
  take:number=0
  first:number=0
  selectBucketNo:number=0
  ngOnInit() {
    this.load()
  }
  load()
  {
   
    if(this.selectBucketNo==null)
    {
      alert("Enter Bucket No")
      return false
    }
    debugger
    this.skip=0
    this.take=0
    // this.skip = event ? event.first : 0;
    //   this.take = event ? event.rows : 10;
    this.first=0
      this.blocked=true
     
      this.salesAppService.GetAllGameCondition(this.skip,this.take,this.selectBucketNo).subscribe(res=>
        {
          console.log(res);
          this.blocked=false
          if(res.status == true){
            this.gameBucketConditions=res.Message.gameCondition
           
             this.totalRecords=res.Message.TotalRecords
          }
        })
  }
  AddNewConditions()
  {
  this.showAddCondition=true
  this.GetAllData()
  this.GetAppDescListData()
  }
  GetAllData()
  {
      // this.blocked=true
      this.salesAppService.GetDistinctBucketNo().subscribe(res=>
        {
          console.log(res);
          // this.blocked=false
          if(res.status == true){
            console.log(res.Message);
            this.BucketListData=res.Message

          }
        })
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
  OnchangeBucket(bucket)
  {
   this.selectedvalue=bucket.value
  }
  OnchangeAPP(data)
  {
    this.conditionMasterValue=data.Value
    this.conditionMasterName=data.Name
  }
  OnSaveBucket()
  {
    debugger
    if(this.selectedBucketNo==null)
    {
       alert("Please Select Bucket No")
       return false
    }
    if(this.selectedAppDesc==null)
    {
      alert("Please Select App Description")
      return false
    }
    debugger
    this.salesAppService.PostBucketCondition(this.selectedAppDesc.Id,this.selectedBucketNo.Id,this.selectedBucketNo).subscribe(res=>
      { 
        debugger
        if(res.status==true)
        {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
         this.showSuccess("Add Successfully")
         this.OnCancel()
         this.load()
        }
        else
        {
          alert(res.Message)
        }
      })
  }
  OnCancel()
  {
    this.showAddCondition=false
    this.selectedBucketNo=null
    this.selectedAppDesc=null
    this.conditionMasterValue=null
    this.conditionMasterName=null
    this.selectedvalue=null 
  }
  showSuccess(msg) {
    this.messageService.add({severity:'success', summary: 'Success', detail: msg});
}
showError(msg) {
  this.messageService.add({severity:'error', summary: 'Error', detail:msg});
}
confirm1(data)
{
  this.confirmationService.confirm({
    message: 'Are you sure that you want to delete?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
     this.Remove(data.Id)
    //  this.load()
    },
    reject: () => {
    }
});
}
Remove(Id)
{
  this.salesAppService.DeleteGameCondition(Id).subscribe(res=>
    {
      if(res.status==true)
  {
    //  alert(res.Message)
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.showSuccess(res.Message)
     this.load()
   }
    
})
}

}
