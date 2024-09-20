
export interface BookExpenseDetail {
    Id: number|null;
    BookExpenseId: number|null;
    ExpenseDetailId: number|null;
    CreditLedgerId: number|null;
    IsFixedCreditLedgerId: boolean|null;
    CreditLedgerTypeId: number|null;
    CreditLedgerAmount: number|null;

    CreditLedgerName: string;
    CreditLedgerTypeName: string;
}
