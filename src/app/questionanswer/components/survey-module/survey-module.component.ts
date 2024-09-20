import { Component, OnInit, Input } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServeyQuestionAnswer, SQA, AnswerList } from 'app/shared/interface/servey/servey-question-answer';
import { element } from 'protractor';
import { SurveyModuleService } from 'app/shared/services/survey-module.service';
import { count } from 'rxjs/operators';
import  * as moment from 'moment';
import { CompanyDashboardModule } from 'app/company-dashboard/company-dashboard.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-survey-module',
  templateUrl: './survey-module.component.html',
  styleUrls: ['./survey-module.component.scss']
})
export class SurveyModuleComponent implements OnInit {
  warehouseList:any;
  data:any;
  surveyList:any;
  @Input() SurveyId: any;
  isSearch : boolean;
  isTable : boolean;
  isEnabled:boolean;
  blocked:boolean;
  isActive:boolean;
  isResultFalse:boolean;
  isOpenPopup: boolean;
  isFormInvalid:boolean;
  Questionlist:any[]=[];
  Answerlist:any[]=[];
  deletedlist:any[]=[];
  selectedQue:any;
  quesid:number;
  Answer:string;
  QuestionName:string;
  results:any;
  RightAnsId:number;
  Sequence:number;
  Survey:ServeyQuestionAnswer;
  SurveyQuestion:SQA;
  checked: boolean = true;

  constructor(private route: ActivatedRoute, private router : Router,
    private warehouseService:WarehouseService,
     private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private surveyModuleService : SurveyModuleService) {
     this.data={};
     this.quesid = 0;   
     this.RightAnsId=0;
    }

  ngOnInit() {
    this.isOpenPopup = false;
    this.isResultFalse=true;
      this.data.WarehouseId=0;  
      this.data.SurveyId=0;     
      this.data.StartDate=null;
      this.data.EndDate=null;
      this.data.SurveyId =0;
      this.SurveyId = Number(this.route.snapshot.paramMap.get("SurveyId")); 
      if(this.SurveyId != 0)
      {
      this.onInitialize();
      } 
      this.warehouseService.GetAllWarehouse().subscribe(result=>{
       this.warehouseList = result;
      }) 

    this.Survey={
    WarehouseId: this.data.WarehouseId,
    SurveyName:null,
    SurveyId: null,
    StartDate: null,
    EndDate:null,
    Publish: true,
    SQA : []
    }
    this.Questionlist = this.Survey.SQA;
  }

  onInitialize(){   
    this.surveyModuleService.GetServeyData(this.SurveyId).subscribe(result=>{
        this.results=result[0];   
        this.data.WarehouseId= this.results.WarehouseId;
       // this.data.StartDate=this.results.StartDate;
        this.data.SurveyId=this.results.SurveyId;
        //this.data.EndDate=this.results.EndDate;
        this.data.SurveyName=this.results.SurveyName;
        this.Questionlist=this.results.SQA; 
        for(var i=0; i<this.Questionlist.length;i++)
        {
           this.Answerlist =this.Questionlist[i].AnswerList;
          for(var j=0; j< this.Answerlist.length; j++)
          {
            if(this.Questionlist[i].RightAnsId==this.Answerlist[j].Id)
            {
              this.Questionlist[i].RightAnsId=this.Answerlist[j].Sequence;
              break;
            }
          }
       }
        this.Survey=this.results;
        this.isResultFalse=false;
        // this.surveyModuleService.GetServey(this.data.WarehouseId).subscribe(result =>{
        //       this.surveyList=result;
        // });
        this.isActive=true;  
    })
    return
   }

  onDrop(event: CdkDragDrop<string[]>) { 
       moveItemInArray( this.Questionlist, event.previousIndex, event.currentIndex);
  }
  
onanswerDrop(event: CdkDragDrop<string[]>) {
    for(var i=0; i< this.Questionlist.length; i++)
    {
       this.Questionlist[i].AnswerList=this.Questionlist[i].AnswerList;
            
         moveItemInArray(this.Questionlist[i].AnswerList, event.previousIndex, event.currentIndex);                    
    }    
}

  
  // toggleSearch(){
  //   if(this.isSearch==true){
  //     this.isSearch = false;
  //   }else{
  //     if(this.isTable==true){
  //       this.isTable= false;
  //     }
  //     this.isSearch = true;
  //   }
  // }

  //get survey list according to warehouse
  // getsurveylist(WarehouseId)
  // {  
  // }

  //add Qustions
  addQuestion(data)
  {
    
   if(data.StartDate !=null && data.EndDate !=null)
   {
      data.start =moment(data.StartDate).format('YYYY/MM/DD');
      data.end =moment(data.EndDate).format('YYYY/MM/DD');  
    }
    if(data.QueName == "" || data.QueName == undefined)
    {
      this.messageService.add({ severity: 'error', summary: 'Question is Required!', detail: ''});
      return data.QueName;
      
    }
    else
    {
      this.isFormInvalid = false;
      this.quesid = this.quesid + 1;
      this.Survey.WarehouseId=data.WarehouseId;
      this.Survey.StartDate=data.start;
      this.Survey.EndDate=data.end;
      this.Survey.SurveyId=data.SurveyId;
      this.Survey.SurveyName=data.SurveyName;
      var dataToPost = {
        QuestionId: this.quesid,
        RightAnsId: 0,
        Point:1,
        Sequence:this.quesid,
        isRequired:false,
        IsDeleted:false,
        QueName:data.QueName,   
        AnswerList: []
      }
      this.Questionlist.push(dataToPost);
      data.QueName=null;
      this.isResultFalse=false;
      console.log("Survey", this.Survey);
   }
}

 


//add Answer
addAnswer(item){
  
console.log(item);
this.isEnabled=false;
if(item.Answer == "" || item.Answer == undefined)
{
  this.messageService.add({ severity: 'error', summary: 'Answer is Required!', detail: ''});
   return item.Answer;
}
else
{
  this.isEnabled=true;
if(item.AnswerList.length==0)
{
  this.RightAnsId=0;
}
for(var i=0;i < this.Questionlist.length;i++)
{
 this.Sequence = this.Questionlist[i].Sequence;
  if(item.QuestionId == this.Questionlist[i].QuestionId)
  {   
   this.RightAnsId= (this.RightAnsId + 1);
   var dataToPost = { 
    Id:this.RightAnsId,   
    QuestionId: item.QuestionId,
    Answer: item.Answer,
    Sequence: this.RightAnsId
  }
  this.Questionlist[i].AnswerList.push(dataToPost);
  break;
  }

}
console.log("Survey", this.Survey);
  this.Answer = "";
  item.Answer="";
}
}

//Save Customer Survey
Saveservey(data){
  
    var count=0;
    for(var i=0; i< data.SQA.length;i++)
    {
      if(data.SQA[i].AnswerList[0] == null)
      {
        this.messageService.add({ severity: 'error', summary: 'Please Add Answer First!', detail: ''});
        return null;
      }
    
    }
    for(var j=0; j< data.SQA.length; j++)
    {
      if (data.SQA[j].RightAnsId == 0)
      { 
        this.messageService.add({severity: 'error', summary: 'Please select one correct Answer!', detail: ''});
        count=0;
        break;
      }
      else{
        count++;
      }
    }
  if(count > 0)
 {
  this.blocked=true;
    this.surveyModuleService.AddServeyQuestionaries(data).subscribe(result=>{
    this.blocked=false;
    this.results=result;
    if(this.results.Status ==true)
    {
      this.messageService.add({severity: 'success', summary: 'Question Survey Save Successfully!', detail: ''});
    }
    else
    {
      this.messageService.add({severity: 'error', summary: 'Something went Wrong!', detail: ''});
    }

    });
 }
    else{
    this.messageService.add({severity: 'error', summary: 'Something went wrong.Plz,Check all Questions!', detail: ''});
    }
   //console.log('SQA Data:',data);

}

//Update Servey Questions
UpdateServeyQuestion(survey)
{
  
  var count=0;
  for(var i=0; i< survey.SQA.length;i++)
  {
    if(survey.SQA[i].AnswerList[0] == null)
    {
      this.messageService.add({ severity: 'error', summary: 'Please Add Answer First!', detail: ''});
      return null;
    }
  
  }
  for(var j=0; j< survey.SQA.length; j++)
  {
    if (survey.SQA[j].RightAnsId == 0)
    { 
      this.messageService.add({severity: 'error', summary: 'Please select one correct Answer!', detail: ''});
      count=0;
      break;
    }
    else{
      count++;
    }
  }
  if(count > 0)
  {
  this.blocked=true;
  this.surveyModuleService.UpdateServeyQuestionaries(survey).subscribe(result => {
    this.blocked=false;
    this.results=result;
    if(this.results.Status ==true)
    {
      this.messageService.add({severity: 'success', summary: 'Question Survey Update Successfully!', detail: ''});
      window.location.reload();
    }
    else
    {
      this.messageService.add({severity: 'error', summary: 'Update Failed!', detail: ''});
    }
   })
 }
 else{
  this.messageService.add({severity: 'error', summary: 'Update Failed!', detail: ''});
  }

}

//Edit Question
editQuestion(Id){
  for(var i=0;i < this.Questionlist.length;i++)
  {
    if(this.Questionlist[i].QuestionId==Id)
    {
      this.selectedQue = this.Questionlist[i];
        this.QuestionName=this.Questionlist[i].QueName;
      this.isOpenPopup = true;
    }
  }
}

//Save Edit Question
SaveeditQuestion(form, titleInput)
{
  if (form.invalid) {
    this.isFormInvalid = true;
  }
  else {
    if(form.value.question=="")
    {
      this.isFormInvalid = true;
      this.selectedQue.QueName=this.QuestionName;
      return this.selectedQue.QueName;       
    }
    this.isFormInvalid = false;
    this.isOpenPopup = false;
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Question Saved Successfully!!!' }); 
  }
}

delete(Id){
  
  console.log(Id);
this.confirmationService.confirm({
  message: 'Are you sure that you want to delete?',
  header:'Delete Confirmation',
  icon: 'pi pi-info-circle',
   accept: () => {   
     
    for(var j=0; j< this.Questionlist.length; j++)
    {      
      this.deletedlist= this.Questionlist[j];
        if (this.Questionlist[j].QuestionId == Id)
        { 
          this.Questionlist[j].IsDeleted=true;
         //console.log('index' ,this.Answerlist.indexOf(this.Answerlist[k]));
         // this.Questionlist.splice(j,1);        
        }      
    }   
    this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Question Deleted!' });    
    this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Click on Submit button to delete Permanently!.'});   
  
}
  });
}

//back to Survey List
backtopage()
{
  this.router.navigateByUrl("layout/questionanswer/surveylist" );
}


}



