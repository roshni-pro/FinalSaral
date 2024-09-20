export interface ExpenseDetails {
    Id: number|null;
    ExpenseID: number|null;
    CreditLedgerTypeId: number|null;
    CreditLedgerID: number|null;
    IsFixedCreditLedgerId:boolean;
    Name: string;
    CreditLedgerTypeName: string;
    CreditLedgerName: string;
    IsMasterLedger:boolean;
}
