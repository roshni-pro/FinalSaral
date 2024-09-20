import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SurveyModuleService } from 'app/shared/services/survey-module.service';
import { ServeyQuestionAnswer } from 'app/shared/interface/servey/servey-question-answer';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {
  @ViewChild(Table,{static:false}) dataTableComponent: Table;
  data:any;
  blocked:boolean;
  warehouseList:any;
  surveyList:any;
  Survey:ServeyQuestionAnswer;
  selectedQue:any;
  isOpenPopup:boolean;
  isFormInvalid:boolean;
  inputModel : any;
  isSearch:boolean;
  isTable:boolean;
  Questionlist:any[]=[];
  searchKey:any;
  list:any[]=[];
  isOpen:boolean;
  publishList:any[]=[];
  questions:any[]=[];
  Id:number;
  results:any[]=[];

  constructor(private warehouseService: WarehouseService,private confirmationService: ConfirmationService,private surveyModuleService:SurveyModuleService,
    private router : Router,private messageService:MessageService) { 
this.data={};
  }

  ngOnInit() {
    this.data.WarehouseId="";
    this.data.Id="";
    this.Id=0;
    this.warehouseService.GetAllWarehouse().subscribe(result=>{
      this.warehouseList = result;
    }) 
    this.surveyModuleService.GetServeyData(this.Id).subscribe(result=>{    
     this.Questionlist=result;
     this.surveyList=result;

    })

    this.Survey={
      WarehouseId: this.data.WarehouseId,
      SurveyId: null,
      SurveyName:null,
      StartDate: null,
      EndDate:null,
      Publish: false,
      SQA : []
      }

  }

 
  load(event)
  {
    
   
  
  }

  toggleSearch(){
    if(this.isSearch==true){
      this.isSearch = false;
    }else{
      if(this.isTable==true){
        this.isTable= false;
      }
      this.isSearch = true;
   }
 }

onSearch(search){
  this.searchKey = search;
  this.surveyModuleService.searchServey( this.searchKey).subscribe(result => {
    this.Questionlist=result;
})
}

//get Survey list According to Warehouse
getsurveylist(WarehouseId)
  {
    this.data.WarehouseId=WarehouseId;
    this.surveyModuleService.GetServey(WarehouseId).subscribe(result =>{
    this.Questionlist=result;  
  })

  }

getQuestionlist(surveyId)
{
  this.blocked=true;
 for(var i=0; i< this.surveyList.length; i++)
 {
  if(this.surveyList[i].SurveyId == surveyId)
  {
     this.Id=this.surveyList[i].SurveyId;
     for(var j=0; j< this.Questionlist.length; j++)
     {
       if(this.Questionlist[j].SurveyId==this.Id)
       {
        this.Questionlist[j].SQA=this.surveyList[i].SQA;
        this.blocked=false;
        break;
       }
     }       
  }
 }
 this.toggleSearch();
  this.blocked=false;
  console.log('Survey',this.Id);

}

//Transfer Survey List
CopySurvey(data)
{
  this.selectedQue = data;
  this.isOpenPopup = true;
}

//Copy Survey To Warehouse
SavesurveyCopy(form)
{

  this.selectedQue;
 
  if (form.invalid) {
    this.isFormInvalid = true;
  }
  else {
    this.isFormInvalid = false;
   this.surveyModuleService.CopySurvey( this.selectedQue.SurveyId,form.value.warehouse).subscribe(result=>{
    this.results=result;
    this.messageService.add({ severity: 'success', summary: 'Copy', detail: 'Copy Current Survey Successfully!!!' }); 
    window.location.reload();
   })
  }
}

//Edit Current Survey
editSurvey(SurveyId)
{
  this.router.navigateByUrl("layout/questionanswer/surveymodule/" + SurveyId);
}

//create New Survey
createSurvey()
{
  this.Id=0;
  this.router.navigateByUrl("layout/questionanswer/surveymodule/" + this.Id);
}

//delete Survey 
deletesurvey(pageData)
{
  this.confirmationService.confirm({
    message: 'Are you sure that you want to delete?',
    header:'Delete Confirmation',
    icon: 'pi pi-info-circle',
     accept: () => {   
      this.surveyModuleService.deleteSurvey(pageData.SurveyId,pageData.WarehouseId).subscribe(result=> {

        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Survey Deleted Successfully!!!' }); 
        window.location.reload();
      }); 
    }
  });  

}

//Check published or Not
PublishSurvey(data) {

  if(this.data.WarehouseId != "")   
  {
    this.surveyModuleService.PublishSurvey(data.SurveyId,data.WarehouseId,data.Publish).subscribe(result => {
      if(result.Status==true)
      {  
      for(var i=0; i< this.Questionlist.length; i++)
      {
       if(this.Questionlist[i].SurveyId != data.SurveyId)
       {      
        if(this.Questionlist[i].Publish == true)
        { 
          this.Questionlist[i].Publish = false;
          this.surveyModuleService.PublishSurvey(this.Questionlist[i].SurveyId,data.WarehouseId,this.Questionlist[i].Publish).subscribe(result => {           
              this.messageService.add({ severity: 'success', summary: 'Published', detail: 'Surevy Published Successfully!!!' });                                              
          });    
             
        }          
       }
     } 
      
    }
    });
  } 
  else
  {
  this.surveyModuleService.PublishSurvey(data.SurveyId,data.WarehouseId,data.Publish).subscribe(result => {
    if(result.Status==true)
    {  
    for(var i=0; i< this.surveyList.length; i++)
    {
     if(this.surveyList[i].WarehouseId == data.WarehouseId && this.surveyList[i].SurveyId != data.SurveyId)
     {      
      if(this.surveyList[i].Publish == true)
      { 
        this.surveyList[i].Publish = false;
        this.surveyModuleService.PublishSurvey(this.surveyList[i].SurveyId,data.WarehouseId,this.surveyList[i].Publish).subscribe(result => {                
            this.messageService.add({ severity: 'success', summary: 'Published', detail: 'Surevy Published Successfully!!!' });          
                              
        });    
           
      }          
      }
    } 
     // this.messageService.add({ severity: 'success', summary: 'Published', detail: 'Survey unPublished Successfully!!!' });
   }
  });
 }
}

}


