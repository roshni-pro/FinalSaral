import { BookExpenseDetail } from './book-expense-detail';

export interface BookExpense {
    Id: number | null;
    ExpenseId: number | null;
    TotalAmount: number | null;
    DebitLedgerId: number | null;
    DebitLedgerTypeId: number | null;
    DebitLedgerAmount: number;
    DepartmentId: number | null;
    WorkingLocationId: number | null;
    WorkingCompanyId: number | null;
    IsChecked: boolean;
    IsLedgerGenerated: boolean;
    CheckerId: number | null;
    ExpenseDate: Date | null;
    BookExpenseDetailList: BookExpenseDetail[];
    IsTDSApplied: Boolean;
    IsGSTApplied: Boolean;
    TDSLedgerId: number;
    GSTLedgerId: number;
    TDSAmount: number;
    GSTAmount: number;

}

export interface BookExpensePager {
    SkipCount: number | null;
    Take : number | null;
    Filter : string | null;
    DepartmentId : number | null;
    WorkingCompanyId : number | null;
    WorkingLocatiponID : number | null;

}