import { Component, OnInit } from '@angular/core';
import { TicketService } from 'app/ticket/Services/ticket.service';
import { TicketCategoriesDc } from 'app/ticket/Interfaces/ticket';
import { DepartmentService } from 'app/shared/services/department.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-ticker-category',
  templateUrl: './add-ticker-category.component.html',
  styleUrls: ['./add-ticker-category.component.scss']
})
export class AddTickerCategoryComponent implements OnInit {
  ticketCategoriesDc : TicketCategoriesDc;
  data : any;
  departmentList : any;
  isInvalid : boolean;
  englishField : boolean;
  hindiField : boolean;
  questionField : boolean;
  sqlField : boolean;
  subList : any;
  subcategoryList : any;
  blocked : boolean;

  constructor(private ticketService : TicketService,private departmentService : DepartmentService,private router : Router,private messageService : MessageService) { this.data = {};}

  ngOnInit() {
    this.data.DepartmentId = '';
    this.data.IsActive = '';
    this.data.IsAskQuestion = '';
    this.data.IsDbValue = '';
    this.data.Type = ''; 
    this.data.ParentId= '';
    this.data.DisplayText = ''; 
    this.data.AfterSelectMessage= '';
    this.data.DisplayTextHindi = ''; 
    this.data.AfterSelectHindiMessage= '';
    this.englishField = false;
    this.hindiField = false;
    this.questionField = false;
    this.sqlField = false;
    this.departmentService.GetAllDepartment().subscribe(y=>
      {
        this.departmentList = y;
      })
      this.subcategoryList =[];
      // this.blocked = true;
      // this.ticketService.getAllTicketCategories().subscribe(result=>
      //   {
      //     this.blocked = false;
      //     this.subList = result;
      //     console.log('subList',this.subList);
      //     
      //     for(var i in this.subList)
      //     {
      //       if(this.subList[i].ParentId != null)
      //       {
      //         this.subcategoryList.push(this.subList[i]);
      //       }
            
      //     }
      //   })
      this.ticketService.getAllCategory().subscribe(result=>
        {
          this.blocked = false;
          this.subcategoryList = result;
          console.log('subList',this.subList);
          
        })

  }
  CategoryparentId(data)
  {
    
      this.data.ParentId = data.Id;
      // for(var i in this.subcategoryList)
      // {
      //   if(data.Id == this.subcategoryList[i].Id)
      //   {
      //     this.data.Name = this.subcategoryList[i].Name;
      //     console.log('namee:',data.Name);
      //   }
      // }
      console.log('ParentId',data.Id);
      console.log('ParentId',data.ParentId);
    
  }

  save(data,ticketForm)
  {
    
    this.data.ParentId;
    // this.data.Name;
    if(data.Category == undefined)
    {
      data.Category = 'Category'; 
    }
    if(data.Category == 'Category')
    {    
    
    if(ticketForm.form.status == "VALID")
    {   
    this.ticketCategoriesDc = {
      Id : 0,
      ParentId: data.ParentId,
      Name: data.Name,
      DisplayText: data.DisplayText,
      DisplayTextHindi: data.DisplayTextHindi,  
      IsDbValue: data.IsDbValue,  
      IsAskQuestion: data.IsAskQuestion,
      Question: data.Question,
      SqlQuery: data.SqlQuery,  
      AnswareReplaceString: data.AnswareReplaceString,  
      DepartmentId: data.DepartmentId,
      Type: data.Type,
      TATInHrs: data.TATInHrs,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      IsActive: true,
      IsDeleted: false,
      CreatedBy: data.CreatedBy,        
      ModifiedBy : data.ModifiedBy  ,
      QuestionHindi : data.QuestionHindi,
      AfterSelectMessage : data.AfterSelectMessage,
      AfterSelectHindiMessage : data.AfterSelectHindiMessage
    }
    
    this.blocked = true;
    this.ticketService.ticketCategoryAdd(this.ticketCategoriesDc).subscribe(x=>
      {
        this.blocked = false;
        console.log('x',x);
        if(x == true)
        {
          this.messageService.add({severity:'success', summary:  'Category Added Succesfully.', detail:''});
        this.router.navigateByUrl("/layout/Ticket/TicketCategory");
        }
        else{
          this.messageService.add({severity:'error', summary:  'Something went wrong.', detail:''});
        }
      })
    }
    else{
      this.isInvalid = true;
    }
  }
  else if(data.Category == 'subCategory')
  {
        
    
    if(ticketForm.form.status == "VALID")
    {   
     
    this.ticketCategoriesDc = {
      Id : 0,
      ParentId: this.data.ParentId,
      Name: data.Name,
      DisplayText: data.DisplayText,
      DisplayTextHindi: data.DisplayTextHindi,  
      IsDbValue: data.IsDbValue,  
      IsAskQuestion: data.IsAskQuestion,
      Question: data.Question,
      SqlQuery: data.SqlQuery,  
      AnswareReplaceString: data.AnswareReplaceString,  
      DepartmentId: data.DepartmentId,
      Type: data.Type,
      TATInHrs: data.TATInHrs,
      CreatedDate: data.CreatedDate,
      ModifiedDate: data.ModifiedDate,
      IsActive: true,
      IsDeleted: false,
      CreatedBy: data.CreatedBy,        
      ModifiedBy : data.ModifiedBy  ,
      QuestionHindi: data.QuestionHindi,
      AfterSelectMessage : data.AfterSelectMessage,
      AfterSelectHindiMessage : data.AfterSelectHindiMessage
    }
    
    // this.blocked = true;
    this.ticketService.ticketCategoryAdd(this.ticketCategoriesDc).subscribe(x=>
      {
        this.blocked = false;
        console.log('x',x);
        if(x==true)
        {
          this.messageService.add({severity:'success', summary:  'Sub Category Added Succesfully.', detail:''});
        this.router.navigateByUrl("/layout/Ticket/TicketCategory");
        }
        else{
          // alert('something went wrong');
          this.messageService.add({severity:'error', summary:  'Something went wrong.', detail:''});
        }
      })
    }
    else{
      this.isInvalid = true;
    }
  }
  }
  type(Type)
  {
    if(Type == 1)
    {
      this.englishField = true;
      this.hindiField = false;
    }
    else{
      this.hindiField = true;
      this.englishField = false;
    }
  }
  askQuestion(IsAskQuestion)
  {
    
    if(IsAskQuestion == true)
    {
      this.questionField = true;
    }
    else{
      this.questionField = false;
    }
  }
  sqlquery(IsDbValue)
  {
    if(IsDbValue == true)
    {
      this.sqlField = true;
    }
    else{
      this.sqlField = false;
    }
  }
  onCancel()
  {
    this.router.navigateByUrl("/layout/Ticket/TicketCategory");
  }
  onTabChange(event) {
    
    if (event.index == 0) {
      this.data.Category = 'Category'     
      this.save(this.data,event);
    } else if (event.index == 1) {
      this.data.Category = 'subCategory' 
      this.data.ParentId = '';    
      this.data.Name = '';
      this.data.DisplayTextHindi ='';
      this.data.DisplayText ='';
      this.data.AfterSelectHindiMessage = '';
      this.data.AfterSelectMessage = '';
      this.data.DepartmentId = '';
      this.data.TATInHrs = '';
      this.data.Type = '';
      this.data.IsAskQuestion = '';
      this.data.Question = '';
      this.data.QuestionHindi = '';
      this.data.IsDbValue = '';
      this.data.SqlQuery = '';
      this.data.AnswareReplaceString = '';
      this.save(this.data,event);
    }  
   }

}
