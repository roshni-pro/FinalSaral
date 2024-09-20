import { Component, OnInit } from '@angular/core';
import { ExpenseType } from '../../interfaces/expense-type';
import { ExpenseTypeService } from '../../services/expense-type.service';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.scss']
})
export class ExpenseTypeComponent implements OnInit {
  expenseTypeList: ExpenseType[];
  constructor(private expenseTypeService: ExpenseTypeService) { }

  ngOnInit() {
    this.getExpenseTypeList();
  }



  getExpenseTypeList(){
    this.expenseTypeService.getExpenseTypeList().subscribe(x=> {
      this.expenseTypeList = x;
      console.log('this.expenseTypeList : ', this.expenseTypeList );
    });
  }


}
