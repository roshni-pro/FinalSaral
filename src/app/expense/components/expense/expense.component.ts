import { Component, OnInit, Input } from '@angular/core';
import { ExpenseRedirectionService } from '../../services/expense-redirection.service';
import { Expense } from '../../interfaces/expense';
import { ExpenseDetails } from '../../interfaces/expense-details';
import { ExpenseService } from '../../services/expense.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  constructor(
    private expenseRedirectionService: ExpenseRedirectionService,
    private expenseService:ExpenseService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private route: ActivatedRoute,
    private router:Router
    ) { }
  expense: Expense;
  isShowExpenseDetail: boolean;
  expenseLedgerTypeList: any[];
  editableExpenseDetails: ExpenseDetails;
  expensedebitLedgerTypeId:any;
  expenseSelectedCreditLedger:any;
  expenseLedgerList: any[];
  expenseDetails:any;
  expensedebitLedger:any;
  expenseName:any;
  isInvalid:any;
  disableAddButton:any;
  expenseDetailsList:any[];
  IsDelete:any;
  checkerList:any[];
  expenseCheckerId:any;
  @Input() Id: number; 
  ngOnInit() {    
    this.expense=this.getNewExpense();
    this.isInvalid=false;
    this.disableAddButton=true;
    this.expenseDetails={
      CreditLedgerTypeId:0
    }
    this.isShowExpenseDetail = false;
    this.expenseService.getExpenseLedgerTypeList().subscribe(x=> {
      this.expenseLedgerTypeList = x;
      console.log('this.expenseTypeList : ', this.expenseLedgerTypeList );
    }, error=>{

    });

    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    if(this.Id>0){
    this.getexpenserecord(this.Id);
    }
  }

  openExpenseTypeList(){
    this.expenseRedirectionService.openExpenseTypeList();
  }

  getNewExpense(): Expense{
    let expense: Expense = {
      DebitLedgerId: null,
      Id: null,
      Name: '',
      CheckerId: null,
      CheckerName:'',
      DebitLedgerName:'',
      DebitLedgerTypeName:'',
      DebitLedgerTypeId: null,
      ExpenseDetailList: [],
      IsGSTApplied:null,
      IsTDSApplied:null,
    }
    return expense;
  }

  getNewExpenseDetail(): ExpenseDetails{
    let expenseDetails : ExpenseDetails = {
      CreditLedgerID:null,
      ExpenseID: null,
      Id: null,
      Name: '',
      CreditLedgerName: '',
      CreditLedgerTypeId: null,
      CreditLedgerTypeName: '',
      IsFixedCreditLedgerId: null,
      IsMasterLedger:null
    }
    return expenseDetails;
  }
  expenseSearchLedger(debitLedgerTypeId, event) {
    console.log('debitLedgerTypeId: ', debitLedgerTypeId)
    console.log('event: ', event.query);
    this.expenseService.getByName(event.query, debitLedgerTypeId).subscribe(x => {
      console.log('x is', x);
      this.expenseLedgerList = x;
    });
  }

  openAddNewCreditAccount(){
    this.isShowExpenseDetail = true;
    this.editableExpenseDetails = {
      CreditLedgerID: null, 
      Name : this.expense.Name, 
      Id: null, 
      ExpenseID: this.expense.Id,
      CreditLedgerName: '',
      CreditLedgerTypeId: null,
      CreditLedgerTypeName: '',
      IsFixedCreditLedgerId: null,
      IsMasterLedger:null
    };
  }
  save(addexpensedatafrom:any){
    
     if (addexpensedatafrom.form.status == "VALID") {
      if(this.expense.DebitLedgerId!=null){
        if(this.expense.Id==null){
        this.expenseService.addExpense(this.expense).subscribe(x => {
        this.expense = x;
        if(this.expense.Id>0){
          this.messageService.add({ severity: 'success', summary: 'Add Successfully', detail: '' });
          this.router.navigateByUrl("layout/expense/manage/"+this.expense.Id);
      }
      });
    }else{

      this.updateExpense(this.expense);
    }
       }else{
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please enter valid DebitLedger', detail: '' });
       }
    } else {
      this.isInvalid = true;
    }
    
 
}
  closeExpenseDetails($event){
    this.isShowExpenseDetail = false;
  }
  debitLedgerChange(){
  this.expenseSelectedCreditLedger=null;

  }
  onSelectDebitExpense(val, expense) {
    
    this.expenseSelectedCreditLedger;
    this.expense.DebitLedgerId = val.ID;
  }
  getExpenseDetailsLists($event){
    this.expenseService.getDetailsList($event).subscribe(x => {
      
      this.expenseDetailsList = x;
    
    });
   

  }
  removeExpenseDetails(Id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
    this.expenseService.deleteExpenseDetails(Id).subscribe(x => {
      this.IsDelete = x;
      if(this.IsDelete){
        let index = this.expenseDetailsList.indexOf(Id);
        this.expenseDetailsList.splice(index, 1);
        this.messageService.add({ severity: 'error', summary: 'Delete Successfully', detail: '' });
      }
    });
  }
});
  }
  editExpenseDetails(data){
    
    this.isShowExpenseDetail = true;
    this.editableExpenseDetails = {
      CreditLedgerID: data.CreditLedgerID, 
      Name : data.Name, 
      Id: data.Id, 
      ExpenseID: this.expense.Id,
      CreditLedgerName: data.CreditLedgerName,
      CreditLedgerTypeId: data.CreditLedgerTypeId,
      CreditLedgerTypeName:data.CreditLedgerTypeName,
      IsFixedCreditLedgerId: data.IsFixedCreditLedgerId,
      IsMasterLedger:data.IsMasterLedger,
    };

  }
  getexpenserecord(Id){
    
    this.expenseService.getById(Id).subscribe(x => {
      this.expense = x;
      this.expenseDetailsList = this.expense.ExpenseDetailList;
      this.expenseSelectedCreditLedger={
        ID: this.expense.DebitLedgerId,
      Name: this.expense.DebitLedgerName

      };
      this.expenseCheckerId={
        ID: this.expense.CheckerId,
      Name: this.expense.CheckerName

      };
    });

  }
  updateExpense(expense){
    this.expenseService.addExpense(expense).subscribe(x => {
      this.expense = x;
        this.messageService.add({ severity: 'success', summary: 'Update Successfully', detail: '' });
    });

  }
  getCheckerList(event){
   this.expenseService.getCheckerList(event.query).subscribe(x => {
      this.checkerList = x;
    });
  }
  onSelectChecker(val) {
    this.expense.CheckerId = val.ID;
  }
}
