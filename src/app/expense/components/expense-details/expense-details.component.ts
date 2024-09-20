import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseDetails } from '../../interfaces/expense-details';
import { ExpenseService } from 'app/expense/services/expense.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {
  @Input()  isShowExpenseDetail: boolean;
  @Input()  expenseDetails: ExpenseDetails;
  @Output() closeDetails: EventEmitter<any> = new EventEmitter();
  @Output() getDetailsLists:EventEmitter<any> = new EventEmitter();
  constructor( private expenseService:ExpenseService,private messageService: MessageService) { }
  CreditExpenseTypeId:any;
  expenseLedgerTypeList:any[];
  selectedCreditExpense:any;
  expenseCreditList:any[];
  expenseDetailsList:ExpenseDetails[];
  isInvalid:any;
  ngOnInit() {
    
    
    this.isInvalid=false;
    this.expenseService.getExpenseLedgerTypeList().subscribe(x=> {
      this.expenseLedgerTypeList = x;
      console.log('this.expenseTypeList : ', this.expenseLedgerTypeList );
    }, error=>{

    });

  
   if(this.expenseDetails.Id>0){
    
    this.selectedCreditExpense={
      ID: this.expenseDetails.CreditLedgerID,
      Name: this.expenseDetails.CreditLedgerName

    }

    }else{
     this.intializeExpenseDetails();
    }
    

   

  }
  intializeExpenseDetails(){
    this.expenseDetails={
   
      Id:null,
      ExpenseID: this.expenseDetails.ExpenseID,
      CreditLedgerID: null,
      Name: this.expenseDetails.Name,
      IsFixedCreditLedgerId:false,
      CreditLedgerTypeId:null,
      CreditLedgerName: '',
      CreditLedgerTypeName:'',
      IsMasterLedger:null
  
     }

  }

  close(){
    this.closeDetails.emit(false);
  }
  
 
    onSelectCredit(event, detail) {
      this.expenseDetails.CreditLedgerID = event.ID;
    }

  

    onChangeCreditFixedExpense () {
    if (!this.expenseDetails.IsFixedCreditLedgerId) {
      this.selectedCreditExpense = null;
      this.expenseDetails.CreditLedgerID = null;
    }
  }
  searchLedger(CreditLedgerTypeId, event) {
    console.log('CreditLedgerTypeId: ', CreditLedgerTypeId)
    console.log('event: ', event.query);
    this.expenseService.getByName(event.query, CreditLedgerTypeId).subscribe(x => {
      console.log('x is', x);
      this.expenseCreditList = x;
    });
  }
  add(addexpensedetailsdatafrom:any){
    
    if (addexpensedetailsdatafrom.form.status == "VALID") {
        if(this.expenseDetails.IsFixedCreditLedgerId==true){
           if(this.expenseDetails.CreditLedgerID==null){
            this.messageService.add({ severity: 'error', summary: 'Please Select Credit Expense!', detail: '' });
            return;

           }

        }
      if(this.expenseDetails.Id>0){
        this.updateExpenseDetails();

      }else{
      this.expenseService.addExpenseDetails(this.expenseDetails).subscribe(x => {
        this.expenseDetails = x;
        
       if(this.expenseDetails.Id>0){
        this.messageService.add({ severity: 'success', summary: 'Add Successfully Details', detail: '' });
        this.closeDetails.emit(false);
        this.getDetailsLists.emit(this.expenseDetails.ExpenseID);
       }
      });
    }
      
    } else {
      this.isInvalid = true;
    }
   

  }
  creditLedgerChange(){
    this.expenseDetails.IsFixedCreditLedgerId=false;
    this.selectedCreditExpense=null;
    this.expenseDetails.CreditLedgerID=null;
  }
  updateExpenseDetails(){
    
    this.expenseService.updateExpenseDetails(this.expenseDetails).subscribe(x => {
      this.expenseDetails = x;
      this.messageService.add({ severity: 'success', summary: 'Update Successfully Details', detail: '' });
      this.closeDetails.emit(false);
      this.getDetailsLists.emit(this.expenseDetails.ExpenseID);
    });

  }
}
