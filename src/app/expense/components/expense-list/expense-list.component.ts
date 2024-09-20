import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'app/expense/services/expense.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  constructor(private expenseService:ExpenseService,private router:Router,private confirmationService:ConfirmationService,private messageService:MessageService) { }
  expenseList:any[];
  totalRecordCount:any;
  rowSize:any;
  IsDelete:any;
  ngOnInit() {
    
    this.rowSize = 20;
   
    this.expenseService.getExpensePageList().subscribe(x => {
      this.expenseList = x;
      this.totalRecordCount= this.expenseList.length;
    });
  }
  redirectExpense(){
    this.router.navigateByUrl("layout/expense/manage");
  }
  redirectAndUpdateWithId(Id){
    
    this.router.navigateByUrl("layout/expense/manage/"+Id);


  }
  removeExpense(Id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
    this.expenseService.deleteExpense(Id).subscribe(x => {
    
      this.IsDelete = x;
      if(this.IsDelete){
        let index = this.expenseList.indexOf(Id);
        this.expenseList.splice(index, 1);
        this.messageService.add({ severity: 'error', summary: 'Delete Successfully', detail: '' });
      }
    });
  }
});

  }

  removeVendor(Id){

    
  }
}
