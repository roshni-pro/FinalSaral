import { ExpenseDetails } from './expense-details';

export interface Expense {
    Id: number|null;
    DebitLedgerId: number|null;
    DebitLedgerTypeId: number|null;
    Name: string;
    CheckerId: number|null;
    ExpenseDetailList: ExpenseDetails[]; 
    DebitLedgerTypeName: string;
    DebitLedgerName: string;
    IsTDSApplied:boolean;
    IsGSTApplied:boolean;
    CheckerName:string;
}
