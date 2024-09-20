import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'app/expense/services/expense.service';
import { ExpenseListDC } from 'app/expense/interfaces/expense-list-dc';
import { BookExpense } from 'app/expense/interfaces/book-expense';
import { WorkingLocationService } from 'app/expense/services/working-location.service';
import { WorkingCompanyService } from 'app/expense/services/working-company.service';
import { Expense } from 'app/expense/interfaces/expense';
import { BookExpenseDetail } from 'app/expense/interfaces/book-expense-detail';
import { ExpenseDetails } from 'app/expense/interfaces/expense-details';
import { BookExpenseService } from 'app/expense/services/book-expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-expense',
  templateUrl: './book-expense.component.html',
  styleUrls: ['./book-expense.component.scss']
})
export class BookExpenseComponent implements OnInit {
  expenseList: ExpenseListDC[];
  bookExpense: BookExpense;
  departmentList: any[];
  workingCompanyList: any[];
  workingLocationList: any[];
  ledgerTypeList: any[];
  expense: Expense;
  partyList: any[];
  selectedParty: any;
  tdsList: any[];
  selectedTdsID: number;
  selectedTds: any;
  formSubmitted: boolean;
  masterExpenseDetail: BookExpenseDetail;
  constructor(private expenseService: ExpenseService
    , private workingLocationService: WorkingLocationService
    , private workingCompanyService: WorkingCompanyService
    , private bookExpenseService: BookExpenseService
    , private router: Router) { }

  ngOnInit() {
    this.initializeNewBookExpense();
    this.getWorkingCompanyList();
    this.getWorkingLocationList();
    this.getLedgerTypeList();
    this.getTDSLedgerList();
    this.formSubmitted = false;
    this.selectedTdsID = null;
    this.selectedTds = null;

    this.expenseService.getDepartment()
      .subscribe(y => {
        this.departmentList = y;
        console.log('department list is: ', y);
      });
    this.expenseService.getExpenseList()
      .subscribe(x => {
        this.expenseList = x;
        console.log('this.expenseList', this.expenseList);
      });
  }

  initializeNewBookExpense() {
    this.bookExpense = {
      ExpenseId: null,
      CheckerId: null,
      DebitLedgerAmount: null,
      DebitLedgerId: null,
      DebitLedgerTypeId: null,
      DepartmentId: null,
      Id: null,
      IsChecked: false,
      IsLedgerGenerated: false,
      TotalAmount: null,
      WorkingCompanyId: null,
      WorkingLocationId: null,
      ExpenseDate: null,
      GSTAmount: null,
      GSTLedgerId: null,
      IsGSTApplied: null,
      IsTDSApplied: null,
      TDSAmount: null,
      TDSLedgerId: null,
      BookExpenseDetailList: []
    }
  }

  getWorkingCompanyList() {
    this.workingCompanyService.getAll().subscribe(x => {
      this.workingCompanyList = x;
      console.log(' this.workingCompanyList: ', this.workingCompanyList);
    });
  }

  getWorkingLocationList() {
    this.workingLocationService.getAll().subscribe(x => {
      this.workingLocationList = x;
      console.log(' this.workingLocationList: ', this.workingLocationList);
    });
  }

  getExpense() {
    if (this.bookExpense.ExpenseId) {
      this.expenseService.getById(this.bookExpense.ExpenseId).subscribe(x => {
        console.log('expense is: ', x);
        this.expense = x;
        this.updateExpenseData();
      });
    } else {
      this.updateExpenseData();
    }
  }

  getLedgerTypeList() {
    this.expenseService.getExpenseLedgerTypeList().subscribe(x => {
      this.ledgerTypeList = x;
      console.log('LedgerTypeList: ', x);
    });
  }

  updateExpenseData() {

    if (this.expense && this.bookExpense.ExpenseId) {
      this.bookExpense.DebitLedgerId = this.expense.DebitLedgerId;
      this.bookExpense.DebitLedgerTypeId = this.expense.DebitLedgerTypeId;
      this.bookExpense.ExpenseId = this.expense.Id;

      if (this.expense.ExpenseDetailList && this.expense.ExpenseDetailList.length > 0) {
        this.bookExpense.BookExpenseDetailList = [];
        this.expense.ExpenseDetailList.forEach(x => {

          let bookExpenseDetail: BookExpenseDetail = {
            BookExpenseId: null,
            CreditLedgerAmount: null,
            CreditLedgerId: x.CreditLedgerID,
            CreditLedgerTypeId: x.CreditLedgerTypeId,
            CreditLedgerName: x.CreditLedgerName,
            CreditLedgerTypeName: x.CreditLedgerTypeName,
            ExpenseDetailId: x.Id,
            Id: null,
            IsFixedCreditLedgerId: x.IsFixedCreditLedgerId
          }
          if (x.IsMasterLedger) {
            this.masterExpenseDetail = bookExpenseDetail;
          } else {
            this.bookExpense.BookExpenseDetailList.push(bookExpenseDetail);
          }

        });
      } else {
        this.bookExpense.BookExpenseDetailList = [];
      }
    } else {
      this.bookExpense.DebitLedgerId = null;
      this.bookExpense.DebitLedgerTypeId = null;
      this.bookExpense.ExpenseId = null;
      this.bookExpense.BookExpenseDetailList = [];
    }


    console.log('masterbook expense: ', this.masterExpenseDetail);
  }


  partySearchLedger(event) {
    //console.log('debitLedgerTypeId: ', this.masterExpenseDetail.CreditLedgerTypeId)
    console.log('event: ', event.query);
    this.expenseService.getByName(event.query, this.masterExpenseDetail.CreditLedgerTypeId).subscribe(x => {
      console.log('x is', x);
      this.partyList = x;
    });
  }

  onSelectParty(event) {
    console.log('selectedParty: ', this.selectedParty);
    console.log('event is: ', event);
    if (event) {
      this.masterExpenseDetail.CreditLedgerId = event.ID;
      this.masterExpenseDetail.CreditLedgerName = event.Name;
      this.bookExpense.DepartmentId = event.DepartmentId;
      this.bookExpense.WorkingCompanyId = event.WorkingCompanyId;
      this.bookExpense.WorkingLocationId = event.WorkingLocationId;
      this.bookExpense.IsTDSApplied = event.IsTDSApplied;

      if (this.bookExpense.IsTDSApplied && event.ExpenseTDSMasterID) {

        this.selectedTdsID = event.ExpenseTDSMasterID;
        this.onTDSChange();
      } else {
        this.bookExpense.IsTDSApplied = false;
        this.bookExpense.TDSLedgerId = null;
      }

    }

  }

  getTDSLedgerList() {
    this.expenseService.getTDSLedgerList()
      .subscribe(x => {
        this.tdsList = x;
        console.log('tds list is: ', x);
      });
  }

  onTDSChange() {

    if (this.selectedTdsID) {

      this.selectedTds = this.tdsList.filter(x => {
        return x.Id == this.selectedTdsID;
      })[0];
      console.log('this.selectedTds: ', this.selectedTds);

      this.bookExpense.TDSLedgerId = this.selectedTds.LedgerId;
    } else {
      this.selectedTds = null;
      this.bookExpense.TDSLedgerId = null;
    }

    this.onUpdateTotalAmount();
  }

  onUpdateTotalAmount() {
    
    if (this.bookExpense.TotalAmount) {
      if (this.selectedTds && this.selectedTds.RateOfTDS) {
        this.bookExpense.TDSAmount = this.bookExpense.TotalAmount * this.selectedTds.RateOfTDS / 100;
        this.masterExpenseDetail.CreditLedgerAmount
          = this.bookExpense.TotalAmount - this.bookExpense.TDSAmount;
      } else if (this.selectedTds && !this.selectedTds.RateOfTDS) {
        //case when rate of tds is zero or not set manual entry of tds
        this.masterExpenseDetail.CreditLedgerAmount
          = this.bookExpense.TotalAmount - this.bookExpense.TDSAmount;
      } else {
        this.bookExpense.TDSAmount = null;
        this.masterExpenseDetail.CreditLedgerAmount
          = this.bookExpense.TotalAmount;
      }

      if (this.bookExpense.GSTAmount) {
        this.masterExpenseDetail.CreditLedgerAmount -= this.bookExpense.GSTAmount;
      } else {
        this.bookExpense.GSTAmount = null;
      }

    } else {
      this.bookExpense.TDSAmount = null;
      this.masterExpenseDetail.CreditLedgerAmount = null;
    }
  }

  onOtherCreditLedgerChange(detail: BookExpenseDetail) {
    this.bookExpense.TotalAmount += (detail.CreditLedgerAmount ? detail.CreditLedgerAmount : 0);
  }

  onSaveBookExpense(form) {
    this.formSubmitted = true;
    if (form.valid) {
      this.formSubmitted = false;
      if (this.masterExpenseDetail) {
        if (!this.bookExpense.BookExpenseDetailList) {
          this.bookExpense.BookExpenseDetailList = [];
        }
        this.bookExpense.BookExpenseDetailList.push(this.masterExpenseDetail);
      }
      this.bookExpenseService.SaveBookExpense(this.bookExpense)
        .subscribe(x => {
          console.log('x: ', x);
          this.router.navigateByUrl('layout/expense/book-expense-list');
        });
    }

  }



}
