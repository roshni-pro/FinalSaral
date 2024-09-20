import { LedgerConfigurationParameterVM } from './ledger-configuration-parameter-vm';

export interface LedgerConfigurationDetailsVM
    {
        Id: number | null;
        DebitLedgerTypeId: number | "";
        CreditLedgerTypeId: number | "";
        IsFixedDebitLedger: boolean | null;
        IsFixedCreditLedger: boolean | null;
        DebitLedgerId: number | null;
        DebitPropertyName: string;
        CreditLedgerId: number | null;
        CreditPropertyName: string;
        ObjectIDPropertyName: string;
        ObjectType: '';
        VoucherTypeId: number | "";
        LedgerConfigurationMasterId: number | null;
        SPName: string;
        IsMultiple: boolean;
        Query: string;
        IsSPUsed: boolean;
        IsPublished: boolean;
        ledgerConfigurationParameters: LedgerConfigurationParameterVM[];
        DebitLedgerTypeString: string;
        CreditLedgerTypeString: string;
        DebitLedgerName:string;
        CreditLedgerName:string;
        VoucherTypeName:string;
    }
