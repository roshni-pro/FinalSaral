import { Component, OnInit } from '@angular/core';
import { TicketService } from 'app/ticket/Services/ticket.service';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { DepartmentService } from 'app/shared/services/department.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TicketCategoriesDc, DeleteTicketDc, DeleteSubCatTicketDc, AcitveSubCatTicketDc, AcitveTicketDc } from 'app/ticket/Interfaces/ticket';

@Component({
  selector: 'app-ticketcategory',
  templateUrl: './ticketcategory.component.html',
  styleUrls: ['./ticketcategory.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  providers: [DatePipe]
})
export class TicketcategoryComponent implements OnInit {
ticketList : any;
ticketListt : any;
deptList : any;
exportData: any [];
myDate = new Date();
blocked : boolean;
data : any;
editView : boolean;
removeView : boolean;
questionField : boolean;
  sqlField : boolean;
  subList : any;
  subcategoryList : any;
  isInvalid : boolean;
  englishField : boolean;
  hindiField : boolean;
  selectedRow : any;
  isDetails : boolean;
  selectedRowDetails: any;
  ParentId : number;
  Id  : number;
  ticketCategoriesDc : TicketCategoriesDc;
  subCategoryEditView : boolean;
  DeleteTicketDc : DeleteTicketDc;
  DeleteSubCatTicketDc : DeleteSubCatTicketDc;
  AcitveSubCatTicketDc : AcitveSubCatTicketDc;
  AcitveTicketDc : AcitveTicketDc;
  Iddata : any;
  viewData : boolean;
  deptCategory : any;
  CatoverView : boolean;
  SubCatView : boolean;

  constructor(private ticketService : TicketService,private router : Router,
    private departmentService : DepartmentService, private exportService: ExportServiceService,
     private datePipe: DatePipe,private messageService: MessageService,
     private confirmationService: ConfirmationService) {this.data = {};}

  ngOnInit() {
    this.editView = false;
    this.removeView = false;
    this.viewData = false;
    this.questionField = false;
    this.data.DepartmentId = '';
    this.data.Id = '';
    this.departmentService.GetAllDepartment().subscribe(y=>
      {
       this.deptList = y; 
      })
     
        if(this.data.Category == undefined)
        {
          this.blocked = true;
        this.ticketService.getTicketCategorys().subscribe(y=>
          {
            this.blocked = false;
           console.log('cat',y);
           this.ticketList = y;
           this.exportData = this.ticketList;
           for(var i in this.ticketList)
           {
             
             if(this.ticketList[i].IsAskQuestion == true)
             {
              this.questionField = true;
              this.sqlField = false;
             }
             if(this.ticketList[i].IsDbValue == true)
             {
              // this.questionField = false;
              this.sqlField = true;
             }
             
           }
          })
        }
    
  }

  categoryview(data,event)
  {
    if(data.Category == 'Category')
    {
    // this.ticketList = [];
    this.blocked = true;
    
    this.ticketService.getTicketCategorys().subscribe(x=>
      {
        this.blocked = false;
        this.ticketList = x;
        this.exportData = this.ticketList;
        for(var i in this.ticketList)
        {
          for(var j in this.deptList)
          {
          if(this.ticketList[i].DepartmentId == this.deptList[j].DepId)
          {
            this.ticketList[i].DepartmentId = this.deptList[j].DepartmentName;
          }
        }
        }
        console.log('asd',this.ticketList);
      })
  
    }
    else if(data.Category == 'subCategory')
    {
      
      data.Id = '';
      this.data.Id = '';
    // this.ticketList = [];
    this.blocked = true;
    // this.ticketService.getAllCategory().subscribe(x=>
    //   {
    //     this.blocked = false;
    //     this.ticketList = x;
    //     this.exportData = this.ticketList;
    //   });
    }
  }

  getsubCategoryList(ParentId)
  {
    
    this.blocked = true;
    // ParentId = 1;
    this.Iddata = ParentId;
    this.ticketService.getTicketSubCategory(ParentId).subscribe(y => {
      this.subcategoryList = y;
      this.exportData = this.subcategoryList;
      this.blocked = false;
      console.log('y:', y);
    });
  }
  add()
  {
    this.router.navigateByUrl("/layout/Ticket/AddTicketCategory");
  }
  
  searchTicketfilter(event) {
    
   
    let term = event.target.value
    console.log(term);
    var a = this.ticketList;
    var b = this.subcategoryList;

    if (term.length > 3) {
      
      this.blocked = true;
      this.ticketList = this.ticketList.filter(x => x.Name == term  )
      this.blocked = false;
      if (this.ticketList.length == 0) {
        // this.ticketList = a;
        this.subcategoryList = this.subcategoryList.filter(x => x.Name == term  )
        if (this.ticketList.length == 0) {
          
          // this.subcategoryList = this.subcategoryList.filter(x => x.Name == term  )
        //  this.ticketService.getTicketCategorys().subscribe(x=>
        //   {
        //     this.ticketList = x;
        //   })
        }

      }

    }   
  }
  onTabChange(event) {
    
    if (event.index == 0) {
      this.data.Category = 'Category'     
      this.categoryview(this.data,event);
    } else if (event.index == 1) {
      this.data.Category = 'subCategory'   
      this.data.Id = '';  
      this.categoryview(this.data,event);
    }  
   }
  export()
  { 
    this.exportService.exportAsExcelFile(this.exportData, 'ExportTicketCategory');
  }
  openDetails(d,e){
    
    this.selectedRowDetails  = d;
    console.log('d',d);  
    this.selectedRow = e;
    console.log(this.selectedRow);
    this.isDetails = true;
    if(d.IsAskQuestion == false)
    {
      d.IsAskQuestion = false;
      this.questionField = false;
    }
    else{
      d.IsAskQuestion = true;
    }
   
    this.editMode(d); 
  }
  openDetailsSubCategory(d,Id,e){
    
    this.selectedRowDetails  = d;
    console.log('d',d);  
    this.selectedRow = e;
    console.log(this.selectedRow);
    this.isDetails = true;
    this.editSubCategoryMode(d,Id); 
  }
  openDetailOverviewCat(d,e)
  {
    this.selectedRowDetails  = d;
    this.getsubCategoryListView(d);
    this.CatoverView = true;
    console.log('d',d);  
    this.selectedRow = e;
    console.log(this.selectedRow);
    this.isDetails = true;
    
  }
  getsubCategoryListView(data)
  {
    
    this.blocked = true;
    // ParentId = 1;
    // this.Iddata = ParentId;
    this.ticketService.getTicketSubCategory(data.Id).subscribe(y => {
      this.subcategoryList = y;
      this.exportData = this.subcategoryList;
      this.blocked = false;
      console.log('y:', y);
    });
  }
  editSubCategoryMode(rowData,Id)
  {
    
    this.subCategoryEditView = true;
    for(var i in this.ticketList)
    {
      // if(rowData.ParentId == this.ticketList[i].Id)
      // {
      //   this.Iddata = this.ticketList[i].Name;
      //   console.log('data.ParentId',this.data.ParentId);
      // }
      if(Id == this.ticketList[i].Id)//Temp Check 1
      {
        this.Iddata = this.ticketList[i].Name;
        this.data.Id = this.Iddata;
        console.log('data.ParentId',this.data.ParentId);
      }
      if(rowData.ParentId == this.ticketList[i].ParentId)//Temp Check 2
      {
        this.Iddata = this.ticketList[i].Name;
        this.data.Id = this.Iddata;
        console.log('data.ParentId',this.data.ParentId);
      }
    }
    this.removeView = false;
    this.getView(rowData);
  }
  overview(row)
  {
    this.viewData = true;
  }
  editMode(rowData)
  {
    
    this.editView = true;
    this.removeView = false;
    this.getView(rowData);
  }
  remove(rowData)
  {
    if(rowData.ParentId == null)
    {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Category?',
      accept: () => {
        this.removeView = true;
        this.editView = false;
        rowData.IsDeleted = true;
        this.DeleteTicketDc = 
        {
          id : rowData.Id,
          IsDeleted : rowData.IsDeleted
        }
        
        this.ticketService.DeleteTicketCategory(this.DeleteTicketDc).subscribe(result => {
          let ac = this.ticketList.filter(x => x.Id == rowData.Id)[0];
          let index = this.ticketList.indexOf(ac);
          this.ticketList.splice(index, 1);
        });
        this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      },
      reject: () => {
        rowData.IsActive = !rowData.IsActive;
        this.messageService.add({ severity: 'error', summary: 'Your Request for Deleting Process is Canceled!', detail: '' });
      }
     
    });
   }
   else
    {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Category?',
      accept: () => {
        this.removeView = true;
        this.editView = false;
        rowData.IsDeleted = true;
        this.DeleteSubCatTicketDc = {
          id : rowData.Id,
          ParentId : rowData.ParentId,
          IsDeleted : rowData.IsDeleted
        }
        
        this.ticketService.DeleteTicketSubCategory(this.DeleteSubCatTicketDc).subscribe(result => {
          let ac = this.ticketList.filter(x => x.Id == rowData.Id)[0];
          let index = this.ticketList.indexOf(ac);
          this.ticketList.splice(index, 1);
        });
        this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      },
      reject: () => {
        rowData.IsActive = !rowData.IsActive;
        this.messageService.add({ severity: 'error', summary: 'Your Request for Deleting Process is Canceled!', detail: '' });
      }
     
    });
   }


  }
  getView(rowData)
  {
    
    if(rowData != null)
    {
      this.data = rowData;
    }
    if(this.data.IsAskQuestion == true)
             {
              this.questionField = true;
              this.sqlField = false;
             }
             if(this.data.IsDbValue == true)
             {
              // this.questionField = false;
              this.sqlField = true;
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
    this.editView = false;
  }
  onCancelsubcategatory()
  {
    this.subCategoryEditView = false;
  }
  ActiveInactive(row)
  {
    
    if(row.ParentId == null)
    {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          // this.blocked = true;
          this.Id = row.Id;
          this.AcitveTicketDc=
          {
              id : row.Id,
              IsActive : row.IsActive
          }
          
          this.ticketService.ActiveInActive(this.AcitveTicketDc).subscribe(result => {
            this.blocked = false;
          //   if (result) { 
          //     
          if(row.IsActive == true)
          {                                      
              this.messageService.add({ severity: 'success', summary: 'Your Request is Activated Successfully!', detail: '' });         
          }       
          if(row.IsActive == false)
          {                                      
              this.messageService.add({ severity: 'success', summary: 'Your Request is DeActivated Successfully!', detail: '' });         
          }     
            // } else {
            //   this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
            // }
          });
        },
        reject: () => {
          row.IsActive = !row.IsActive;
          this.messageService.add({ severity: 'error', summary: 'Your Request for IsActive Process is Canceled!', detail: '' });
        }
      });
    }
    else{
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          // this.blocked = true;
          this.Id = row.Id;
          this.AcitveSubCatTicketDc = 
          {
              id : row.Id,
              ParentId : row.ParentId,
              IsActive : row.IsActive
          }
          
          this.ticketService.ActiveTicketSubCategory(this.AcitveSubCatTicketDc).subscribe(result => {
          //   this.blocked = false;
          //   if (result) { 
          //     
          if(row.IsActive == true)
          {                                      
              this.messageService.add({ severity: 'success', summary: 'Your Request is Activated Successfully!', detail: '' });         
          }       
          if(row.IsActive == false)
          {                                      
              this.messageService.add({ severity: 'success', summary: 'Your Request is DeActivated Successfully!', detail: '' });         
          }     
          //   } else {
          //     this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          //   }
          });
        },
        reject: () => {
          row.IsActive = !row.IsActive;
          this.messageService.add({ severity: 'error', summary: 'Your Request for IsActive Process is Canceled!', detail: '' });
        }
      });
    }
 
  }
  saveCategory(data,ticketForm)
  {
    
    // data.ParentId = ParentId
    if(data.Category == undefined)
    {
      data.Category = 'Category'; 
    }
    if(data.Category == 'Category')
    {    
    
    if(ticketForm.form.status == "VALID")
    {   
    this.ticketCategoriesDc = {
      Id : data.Id,
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
          this.editView = false;
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
      Id : data.Id,
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
  saveSubCategory(data,ticketForm)
  {
    
    // data.ParentId = ParentId
    if(data.Category == undefined)
    {
      data.Category = 'subCategory'; 
    }
     if(data.Category == 'subCategory')
  {
        
    
    if(ticketForm.form.status == "VALID")
    {   
    this.ticketCategoriesDc = {
      Id : data.Id,
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
        if(x==true)
        {
          this.subCategoryEditView = false;
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

  deptwiseCategory(DepartmentId)
  {
    this.ticketService.getDepartmentCategory(DepartmentId).subscribe(x=>{
      this.deptCategory = x;
    })
  }
}
