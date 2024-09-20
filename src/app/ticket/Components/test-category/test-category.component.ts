import { Component, OnInit } from '@angular/core';
import { TicketService } from 'app/ticket/Services/ticket.service';
import { Router } from '@angular/router';
import { DepartmentService } from 'app/shared/services/department.service';
// import {ArrayDataSource} from '@angular/cdk/collections';
// import {NestedTreeControl} from '@angular/cdk/tree';
import { ConfirmationService, MessageService } from 'primeng/api';

// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [
//       {name: 'Apple'},
//       {name: 'Banana'},
//       {name: 'Fruit loops'},
//     ]
//   }, {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [
//           {name: 'Broccoli'},
//           {name: 'Brussels sprouts'},
//         ]
//       }, {
//         name: 'Orange',
//         children: [
//           {name: 'Pumpkins'},
//           {name: 'Carrots'},
//         ]
//       },
//     ]
//   },
// ];

@Component({
  selector: 'app-test-category',
  templateUrl: './test-category.component.html',
  styleUrls: ['./test-category.component.scss']
})
export class TestCategoryComponent implements OnInit {
  // treeControl = new NestedTreeControl<FoodNode> (node => node.children);
  // dataSource = new ArrayDataSource(TREE_DATA);

  // hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  deptList : any;
  data : any;
  deptCategory : any;
  istree: any;
  subcategoryList : any;
  subcatShow : boolean;
  List: any;
  CatoverView : boolean;
  questionField : boolean;
  sqlField : boolean;
  AddSubCategory: boolean;
  editView : boolean;
removeView : boolean;
parent : any;
child : any;
parentChildList : any;
  constructor(private ticketService : TicketService,private router : Router,private confirmationService : ConfirmationService,
    private departmentService : DepartmentService,private messageService : MessageService) {this.data={}; this.parentChildList = {};}

  ngOnInit() {
    this.data.DepartmentId = '';
    this.data.Id = '';
    this.data.Type = '';
    this.subcatShow = false;
    this.CatoverView = false;
    this.AddSubCategory = false;
    this.editView = false;
    this.removeView = false;
    this.questionField = false;
    this.sqlField = false;
    this.departmentService.GetAllDepartment().subscribe(y=>
      {
       this.deptList = y; 
      }) 
  }

  deptwiseCategory(DepartmentId)
  {
   this.parentChildList = [];
    this.ticketService.getDepartmentCategory(DepartmentId).subscribe(x=>{
      
      this.istree = true;
      this.List = x;
      console.log('this.List',x);
      this.deptCategory = x;
      for(var i in x)
      {
        this.subcategoryList = x[i].ticketCategoriesNewDcs;
      }
     
      console.log('this.deptCategory',this.deptCategory);
      console.log('this.subcategoryList',this.subcategoryList);
    })
  }
  onChildPageClick(parentPage: any) {
    
    let isAnyChecked = false;
    if (parentPage.ticketCategoriesNewDcs && parentPage.ticketCategoriesNewDcs.length > 0) {
      parentPage.ticketCategoriesNewDcs.forEach(element => {
        if (element.IsChecked) {
          isAnyChecked = true;
          this.deptCategory.ticketCategoriesNewDcs = element.ticketCategoriesNewDcs;
        }
      });
      parentPage.IsChecked = isAnyChecked;

    }
    // this.ticketService.getTicketSubCategory(parentPage.Id).subscribe(y => {
    //   this.subcategoryList = y
    // });    
  }
  collapseParent(parent: any) {
    
    // this.ticketService.getTicketSubCategory(parent).subscribe(y => {
    //   this.subcategoryList = y;
    // });
    // this.subcategoryList.forEach(element => {
    //   if (element != parent) {
    //     element.IsVisible = false;
    //     if(element.ParentId == parent.Id)

    //     {
    //       this.subcategoryList = element;
    //     }
    //   }
    // });
    parent.IsVisible = !parent.IsVisible;
    console.log('parent.IsVisible',parent.IsVisible);
    console.log('!parent.IsVisible',!parent.IsVisible);
    // this.subcategoryList = [];
  }
  onParentPageClick(role: any) {
    
   // this.data.IsChecked = true;

    for(var i in this.deptCategory)
    {
      
      for(var l in this.List.TicketSubsubCategories)
      {
        if(this.List.TicketSubsubCategories[l].ParentId == this.deptCategory[i].Id)
        {
          this.subcatShow = true;
          this.subcategoryList=this.List.TicketSubsubCategories[l].Name;
          console.log(this.subcategoryList);
        }
        // if(this.subcategoryList[l].ParentId == this.subcategoryList[i].Id)
        // {
        //   this.subcategoryList=this.subcategoryList[l];
        // }
      }
    }
    // for(var i in this.deptCategory)
    // {
      
    //     if(this.subcategoryList.ParentId == this.deptCategory[i].Id)
    //     {
    //       this.subcategoryList=this.subcategoryList;
    //     }
    // }
    // this.ticketService.getTicketSubCategory(role.Id).subscribe(y => {
    //   this.subcategoryList = y;
    // });  
  }
getsubCategoryList(ParentId)
    {
      
      //       this.ticketService.getTicketSubCategory(ParentId).subscribe(y => {
      //   this.subcategoryList = y;
       
      // });
    }
    addCategory(department)
    {
      this.CatoverView = true; 
      this.data.DepartmentId =department;
    }
    addSubCategory(page)
    {
      
      this.AddSubCategory=true;
      this.data.DepartmentId = page.DepartmentId;
      this.data.Type = page.Type;
      this.data.Id = page.Id;
    }
    editMode(rowData)
    {
      
      this.editView = true;
      this.removeView = false;
      this.getView(rowData);
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
          // this.DeleteTicketDc = 
          // {
          //   id : rowData.Id,
          //   IsDeleted : rowData.IsDeleted
          // }
          // 
          // this.ticketService.DeleteTicketCategory(this.DeleteTicketDc).subscribe(result => {
          //   let ac = this.ticketList.filter(x => x.Id == rowData.Id)[0];
          //   let index = this.ticketList.indexOf(ac);
          //   this.ticketList.splice(index, 1);
          // });
          // this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
        },
        reject: () => {
          rowData.IsActive = !rowData.IsActive;
          // this.messageService.add({ severity: 'error', summary: 'Your Request for Deleting Process is Canceled!', detail: '' });
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
          // this.DeleteSubCatTicketDc = {
          //   id : rowData.Id,
          //   ParentId : rowData.ParentId,
          //   IsDeleted : rowData.IsDeleted
          // }
          
          // this.ticketService.DeleteTicketSubCategory(this.DeleteSubCatTicketDc).subscribe(result => {
          //   let ac = this.ticketList.filter(x => x.Id == rowData.Id)[0];
          //   let index = this.ticketList.indexOf(ac);
          //   this.ticketList.splice(index, 1);
          // });
          // this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
        },
        reject: () => {
          rowData.IsActive = !rowData.IsActive;
          // this.messageService.add({ severity: 'error', summary: 'Your Request for Deleting Process is Canceled!', detail: '' });
        }
       
      });
     }
  
  
    }
    ActiveInactive(row)
    {
      
      if(row.ParentId == null)
      {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            // this.blocked = true;
            // this.Id = row.Id;
            // this.AcitveTicketDc=
            // {
            //     id : row.Id,
            //     IsActive : row.IsActive
            // }
            
            // this.ticketService.ActiveInActive(this.AcitveTicketDc).subscribe(result => {
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
              // } else {
              //   this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
              // }
            // });
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
            // this.Id = row.Id;
            // this.AcitveSubCatTicketDc = 
            // {
            //     id : row.Id,
            //     ParentId : row.ParentId,
            //     IsActive : row.IsActive
            // }
            
            // this.ticketService.ActiveTicketSubCategory(this.AcitveSubCatTicketDc).subscribe(result => {
            // //   this.blocked = false;
            // //   if (result) { 
            // //     
            // if(row.IsActive == true)
            // {                                      
            //     this.messageService.add({ severity: 'success', summary: 'Your Request is Activated Successfully!', detail: '' });         
            // }       
            // if(row.IsActive == false)
            // {                                      
            //     this.messageService.add({ severity: 'success', summary: 'Your Request is DeActivated Successfully!', detail: '' });         
            // }     
            // //   } else {
            // //     this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
            // //   }
            // });
          },
          reject: () => {
            row.IsActive = !row.IsActive;
            this.messageService.add({ severity: 'error', summary: 'Your Request for IsActive Process is Canceled!', detail: '' });
          }
        });
      }
   
    }
}
