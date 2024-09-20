import { Component, OnInit } from '@angular/core';
import { BookExpenseService } from 'app/expense/services/book-expense.service';

@Component({
  selector: 'app-book-expense-list',
  templateUrl: './book-expense-list.component.html',
  styleUrls: ['./book-expense-list.component.scss']
})
export class BookExpenseListComponent implements OnInit {

  constructor(private bookExpenseService: BookExpenseService) { }

  ngOnInit() {
  }

}
