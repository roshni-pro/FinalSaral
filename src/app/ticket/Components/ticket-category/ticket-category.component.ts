import { Component, OnInit } from '@angular/core';
import { TreeNode, MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { DepartmentService } from 'app/shared/services/department.service';
import { TicketService } from 'app/ticket/Services/ticket.service';
import { TicketCategoriesNewDc, TicketCategoriesDc, DeleteTicketDc, DeleteSubCatTicketDc, AcitveSubCatTicketDc, AcitveTicketDc, TreeNodeDc } from 'app/ticket/Interfaces/ticket';
import { CalendarAngularDateFormatter } from 'angular-calendar';
// import { TreeNodeDc } from 'primeng/components/common/treenode';
// import { TreeNodeDc } from 'primeng/components/common/treenode';

@Component({
  selector: 'app-ticket-category',
  templateUrl: './ticket-category.component.html',
  styleUrls: ['./ticket-category.component.scss']
})
export class TicketCategoryComponent implements OnInit {
  filesTree6: TreeNode[];
  selectedFile2: TreeNodeDc;
  items: MenuItem[];
  deptList : any;
  data : any;
  deptCategory : TreeNodeDc[];
  istree: any;
  subcategoryList : any;
  CatoverView : boolean;
  questionField : boolean;
  sqlField : boolean;
  AddSubCategory: boolean;
  editView : boolean;
  ticketCategoriesDc : TicketCategoriesDc;
  subCategoryEditView : boolean;
  DeleteTicketDc : DeleteTicketDc;
  DeleteSubCatTicketDc : DeleteSubCatTicketDc;
  AcitveSubCatTicketDc : AcitveSubCatTicketDc;
  AcitveTicketDc : AcitveTicketDc;
  isInvalid : boolean;
  blocked : boolean;
  Id  : number;
  List : any;
  IsActive : boolean;
  EditCategoryName : boolean;
  ActiveInActiveData : boolean;
  Activedata : boolean;
  reserveData : any;
  DeptId : number;
  Overview : boolean;
  QuesHindi : boolean;
  Ques : boolean;
  AnsReplace : boolean;
  sqlqstring : boolean;
  Category : boolean;
  subCat : boolean;

  constructor(private messageService: MessageService,private ticketService : TicketService,
    private confirmationService : ConfirmationService,private departmentService : DepartmentService)
   {this.data={}; }

  ngOnInit() {
    this.Category = false;
    this.subCat = false;
    this.data.DepartmentId = '';
    this.EditCategoryName = false;
    this.items = [
      {label: 'View Child', icon: 'pi pi-search', command: (event) => this.expandRecursive(this.selectedFile2,true)},
      {label: 'OverView', icon: 'fa fa-eye', command: (event) => this.viewFile(this.selectedFile2)},
      {label: 'Add', icon: 'fa fa-plus-circle', command: (event) => this.addSubCategory(this.selectedFile2)},
      {label: 'Edit', icon: 'fa fa-pencil-square-o', command: (event) => this.editMode(this.selectedFile2)},
      {label: 'Active/InActive', icon: 'fas fa-toggle-on', command: (event) => this.ActiveInactivePopup(this.selectedFile2)},
      {label: 'Delete', icon: 'pi pi-trash', command: (event) => this.remove(this.selectedFile2)},
      {label: 'Unselect', icon: 'pi pi-close', command: (event) => this.unselectFile()}
  ];
  this.departmentService.GetAllDepartment().subscribe(y=>
    {
     this.deptList = y; 
    }) 
    this.ticketService.getAllCategories().subscribe(x=>
      {
        this.List = x;
      })
  }
  deptwiseCategory(DepartmentId)
  {
   
    this.Category = false;
    this.subCat = false;
    this.ticketService.getDepartmentCategory(DepartmentId).subscribe(x=>{
      this.istree = true;
      console.log('this.List',x);      
      this.deptCategory = x;
      console.log('this.deptCategory',this.deptCategory);
      console.log('this.subcategoryList',this.subcategoryList);
    })
  }
  viewFile(file: TreeNodeDc) {
    // file.label = file.Name;
    this.Overview = true;
    // this.data = file;
    for(var i in this.List)
    {
      if(file.Id == this.List[i].Id)
      {
        this.data = this.List[i];
        if(file.ParentId != null)
        {
          for(var i in this.List)
          {
            if(file.ParentId == this.List[i].Id)
            {
              this.data.label = this.List[i].Name;
            }
          }        
        }
      }
    }
    // this.messageService.add({severity: 'info', summary: 'Node Selected with Right Click', detail: file.label});
}
ActiveInactivePopup(data)
{
  this.reserveData = data;
  for(var i in this.List)
  {
    if(data.Id==this.List[i].Id)
    {
      data.IsActive = this.List[i].IsActive;
      if(data.IsActive == true)
      {
        this.Activedata = true;
        this.ActiveInActiveData = true;
      }
      else
      {
        this.Activedata = false;
        this.ActiveInActiveData = true;
      }
    }
  }
}

unselectFile() {
    this.selectedFile2 = null;
}
private expandRecursive(node:TreeNodeDc, isExpand:boolean){
  
    node.expanded = isExpand;
    if (node.children){
        node.children.forEach( childNode => {
            this.expandRecursive(childNode, isExpand);
            console.log('child node',childNode);           
        });
    }
}
addCategory(department)
{
  console.log('department',department);
  if(department != null && department != '')
  {
    this.CatoverView = true; 
    this.data.DepartmentId =department;
    this.data.Type = '';
    this.data.TATInHrs = null;
    this.data.Name = '';
    this.data.DisplayText = '';
    this.data.DisplayTextHindi = '';
    this.data.AfterSelectHindiMessage = '';
    this.data.AfterSelectMessage = '';
    this.data.AnswareReplaceString = '';
    this.data.Question = '';
    this.data.QuestionHindi = '';
    this.data.SqlQuery = '';
    this.data.IsAskQuestion = false;
    this.data.IsDbValue = false;
  }
 else{
  this.messageService.add({severity:'error', summary: 'Please Select Department first!', detail:''});
 }
}
editMode(page)
{
  this.ticketService.getAllCategories().subscribe(x=>{
    console.log('xcategories:',x);
    this.List = x;
    for(var i in x)
    {
      if(page.Id == x[i].Id)
      {
        page=x[i];
        console.log('page:',page);
        if(page.ParentId == x[i].Id)
        {
          this.data.label = page.Name;
          this.EditCategoryName = true;
          this.editView = false;
          this.getView(page);
        }
        else
        {
          this.EditCategoryName = false;
          this.editView = true;
          this.getView(page);
        }
      }
    }
  })
}
getView(rowData)
    {
      console.log('rowdatapage:',rowData);
      if(rowData != null)
      {
        this.data = rowData;
        if(rowData.ParentId !=null)
        {
          this.EditCategoryName = true;
          this.editView = false;
          for(var i in this.List)
          {
            if(rowData.ParentId == this.List[i].Id)
            {
              this.data.label = this.List[i].Name;
              this.EditCategoryName = true;
              this.editView = false;
            }
          }
        }
      //   else
      // {
      //   this.EditCategoryName = false;
      // }
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
addSubCategory(page)
{
  debugger;
  this.isInvalid = false;
  this.ticketService.getAllCategories().subscribe(x=>{
    console.log('xcategories:',x);
    for(var i in x)
    {
      if(page.Id == x[i].Id)
      {
        page=x[i];
        
        this.data.label = page.Name;
        console.log('page:',page);   
      this.AddSubCategory=true;
      this.data.DepartmentId = page.DepartmentId;
      this.data.Type = page.Type;
      if(this.data.Type == 1)
      {
        this.data.Type = 'Customer'
      }
      else{
        this.data.Type = 'People'
      }
      this.data.Id = page.Id;
      
      this.data.TATInHrs = null;
      this.data.Name = '';
      this.data.DisplayText = '';
      this.data.DisplayTextHindi = '';
      this.data.AfterSelectHindiMessage = '';
      this.data.AfterSelectMessage = '';
      this.data.AnswareReplaceString = '';
      this.data.Question = '';
      this.data.QuestionHindi = '';
      this.data.SqlQuery = '';
      this.data.IsAskQuestion = false;
      this.data.IsDbValue = '';
   
}
}
})
}
askQuestion(IsAskQuestion)
{
  
  if(IsAskQuestion == true)
  {
    this.questionField = true;
  }
  else{
    this.questionField = false;
    this.Ques = false;
    this.QuesHindi = false;
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
    this.sqlqstring = false;
  }
}
remove(rowData)
{
  for(var i in this.List)
  {
    if(rowData.Id == this.List[i].Id)
    {
      rowData.ParentId = this.List[i].ParentId;
      rowData.DepartmentId = this.List[i].DepartmentId;
    }
  }
  if(rowData.ParentId == null)
  {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete this Category?',
    accept: () => {
      this.editView = false;
      rowData.IsDeleted = true;
      this.DeleteTicketDc = 
      {
        id : rowData.Id,
        IsDeleted : rowData.IsDeleted
      }
      
      this.ticketService.DeleteTicketCategory(this.DeleteTicketDc).subscribe(result => {
        if(result == true)
        {
          this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
          this.deptwiseCategory(rowData.DepartmentId);
        }
        else
        {
          this.messageService.add({severity:'error', summary: 'Something Went Wrong!', detail:''});
        }
      });
     
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
      this.editView = false;
      rowData.IsDeleted = true;
      this.DeleteSubCatTicketDc = {
        id : rowData.Id,
        ParentId : rowData.ParentId,
        IsDeleted : rowData.IsDeleted
      }
      
      this.ticketService.DeleteTicketSubCategory(this.DeleteSubCatTicketDc).subscribe(result => {
        // let ac = this.deptCategory.filter(x => x.Id == rowData.Id)[0];
        // let index = this.deptCategory.indexOf(ac);
        // this.deptCategory.splice(index, 1);
        if(result == true)
        {
          this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
          this.deptwiseCategory(rowData.DepartmentId);
        }
        else
        {
          this.messageService.add({severity:'error', summary: 'Something Went Wrong!', detail:''});
        }
      });
      
    },
    reject: () => {
      rowData.IsActive = !rowData.IsActive;
      this.messageService.add({ severity: 'error', summary: 'Your Request for Deleting Process is Canceled!', detail: '' });
    }
   
  });
 }


}

ActiveInactive(row)
{
  
  this.DeptId = row.DepartmentId;
  row = this.reserveData;
  console.log('row',row);
 
  console.log('row.IsActive',row.IsActive);
  for(var i in this.List)
  {
    if(row.Id == this.List[i].Id)
    {
      row.ParentId = this.List[i].ParentId;
      row.IsActive = this.List[i].IsActive;
    }
  }
  if(row.IsActive == true)
  {
    row.IsActive = false;
  }
  else{
    row.IsActive = true;
  }
  if(row.ParentId == null)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        console.log('row.IsActive',row.IsActive);
        this.blocked = true;
        this.Id = row.Id;       
        this.AcitveTicketDc=
        {
            id : row.Id,
            IsActive : row.IsActive
        }
        
        this.ticketService.ActiveInActive(this.AcitveTicketDc).subscribe(result => {
          this.blocked = false;
          // if (result) { 
            
        if(result == true && row.IsActive == true)
        {                                      
            this.messageService.add({ severity: 'success', summary: 'Your Request is Activated Successfully!', detail: '' });         
            this.ActiveInActiveData = false;
            this.deptwiseCategory(this.DeptId);
        }       
        if(result == true && row.IsActive == false)
        {                                      
            this.messageService.add({ severity: 'success', summary: 'Your Request is DeActivated Successfully!', detail: '' });         
            this.ActiveInActiveData = false;
            this.deptwiseCategory(this.DeptId);
        }     
          // } 
          // else {
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
        this.blocked = true;
        this.Id = row.Id;
       
        this.AcitveSubCatTicketDc = 
        {
            id : row.Id,
            ParentId : row.ParentId,
            IsActive : row.IsActive
        }
        
        this.ticketService.ActiveTicketSubCategory(this.AcitveSubCatTicketDc).subscribe(result => {
          this.blocked = false;
        //   if (result) { 
        //     
        if(result == true && row.IsActive == true)
        {                                      
            this.messageService.add({ severity: 'success', summary: 'Your Request is Activated Successfully!', detail: '' });         
            this.ActiveInActiveData = false;
            this.deptwiseCategory(this.DeptId);               
        }       
        if(result == true && row.IsActive == false)
        {                                      
            this.messageService.add({ severity: 'success', summary: 'Your Request is DeActivated Successfully!', detail: '' });         
            this.ActiveInActiveData = false;
            this.deptwiseCategory(this.DeptId);
        }     
        // //   } 
        // else {
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

onCancel()
{
  this.editView = false;
  this.AddSubCategory = false;
  this.CatoverView = false;
  this.EditCategoryName = false;
}

saveCategory(data,ticketForm)
{
  
  // data.ParentId = ParentId
  if(data.Category == undefined )
  {
    data.Category = 'Category'; 
  }
  if(data.Category == 'subCategory')
  {
    data.Category = 'Category'; 
    data.Id = undefined;
  }
  if(data.Category == 'Category')
  {    
  
  if(ticketForm.form.status == "VALID")
  {   
    this.CatoverView = false;
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
  this.Category = true;
  this.ticketService.ticketCategoryAdd(this.ticketCategoriesDc).subscribe(x=>
    {
      debugger
      this.blocked = false;
      this.Category = true;
      console.log('x',x);
      if(x == true)
      {
        this.editView = false;
        this.messageService.add({severity:'success', summary:  'Category Added Succesfully.', detail:''});
        this.CatoverView = false;
        this.deptwiseCategory(data.DepartmentId);
      }
      else{
        this.messageService.add({severity:'error', summary:  'Something went wrong.', detail:''});
        this.Category = false;
      }
    })
  }
  else{
    this.isInvalid = true;
    if(data.IsAskQuestion == true)
    {
      if(data.QuestionHindi == ''  && data.Question == '' ||  data.QuestionHindi.length <= 0  && data.Question.length <= 0){
        // this.messageService.add({severity:'error', summary:  'Answer Replace String is Required.', detail:''});
        this.QuesHindi = true;
        this.Ques = true;
        // this.AnsReplace = true;
      }
      else if(data.QuestionHindi.length > 0  && data.Question.length > 0)      {
        // this.messageService.add({severity:'error', summary:  'Answer Replace String is Required.', detail:''});
        this.QuesHindi = false;
        this.Ques = false;
        // this.AnsReplace = true;
      }
      else if(data.Question.length > 0)      {
        // this.messageService.add({severity:'error', summary:  'Answer Replace String is Required.', detail:''});
        this.QuesHindi = true;
        this.Ques = false;
        // this.AnsReplace = true;
      }
      else if(data.QuestionHindi.length > 0 )      {
        // this.messageService.add({severity:'error', summary:  'Answer Replace String is Required.', detail:''});
        this.QuesHindi = false;
        this.Ques = true;
        // this.AnsReplace = true;
      }
      else if(data.QuestionHindi == '' || data.QuestionHindi == undefined)
      {
        this.messageService.add({severity:'error', summary:  'Question in Hindi is Required.', detail:''});
        this.QuesHindi = true;
        this.Ques = false;
        this.AnsReplace = false;
      }
      else if(data.Question == '' || data.Question == undefined)
      {
        this.messageService.add({severity:'error', summary:  'Question is Required.', detail:''});
        this.QuesHindi = false;
        this.Ques = true;
        this.AnsReplace = false;
      }
      // else if(data.AnswareReplaceString == '' || data.AnswareReplaceString == undefined)
      // {
      //   this.messageService.add({severity:'error', summary:  'Answer Replace String is Required.', detail:''});
      //   this.QuesHindi = false;
      //   this.Ques = false;
      //   this.AnsReplace = true;
      // }
    

     
    }
    if(data.IsDbValue == true)
    {
      if(data.SqlQuery == '' || data.SqlQuery.length <= 0){
        this.sqlqstring = true;
      }
      else if(data.SqlQuery.length > 0){
        this.sqlqstring = false;
      }
    
    }
  }
}
}
saveSubCategory(data,ticketSubForm)
{
  debugger;
  // data.ParentId = ParentId
  if(data.Category == undefined || data.Category == 'Category')
  {
    data.Category = 'subCategory'; 
  }
   if(data.Category == 'subCategory')
{
     
  
  if(ticketSubForm.form.status == "VALID")
  {   
    this.AddSubCategory = false;
   console.log('data',data);
  //  for(var i in this.List)
  //  {
  //    if(this.List[i].Name == data.label)
  //    {
  //      data.ParentId = this.List[i].Id;
  //    }
  //  }
  this.ticketCategoriesDc = {
    Id : null,
    ParentId: data.Id,
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
  this.subCat = true;
  this.ticketService.ticketCategoryAdd(this.ticketCategoriesDc).subscribe(x=>
    {
      this.blocked = false;
      this.subCat = true;
      console.log('x',x);
      if(x==true)
      {
        this.subCategoryEditView = false;
        this.messageService.add({severity:'success', summary:  'Sub Category Added Succesfully.', detail:''});
        this.AddSubCategory = false;
       this.deptwiseCategory(data.DepartmentId);
      // this.router.navigateByUrl("/layout/Ticket/TicketCategory");
      }
      else{
        // alert('something went wrong');
        this.messageService.add({severity:'error', summary:  'Something went wrong.', detail:''});
        this.subCat = false;
      }
    })
  }
  else{
    this.isInvalid = true;
    if(data.IsAskQuestion == true)
    {
      if(data.QuestionHindi == ''  && data.Question == '' ||  data.QuestionHindi.length <= 0  && data.Question.length <= 0){
        this.QuesHindi = true;
        this.Ques = true;
      }
      else if(data.QuestionHindi.length > 0  && data.Question.length > 0)      {
        this.QuesHindi = false;
        this.Ques = false;
      }
      else if(data.Question.length > 0){
        this.QuesHindi = true;
        this.Ques = false;
      }
      else if(data.QuestionHindi.length > 0 ){
        this.QuesHindi = false;
        this.Ques = true;
      }
    }
    if(data.IsDbValue == true)
    {
      if(data.SqlQuery == '' || data.SqlQuery.length <= 0){
        this.sqlqstring = true;
      }
      else if(data.SqlQuery.length > 0){
        this.sqlqstring = false;
      }
    
    }
  }
}
}


}

