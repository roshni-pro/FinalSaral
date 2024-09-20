import { CustomerLedgerConSentDetailsVM } from './customer-ledger-con-sent-details-vm';

export interface CustomerLedgerConsentVM {

Id:number|null;
Name:string;
StartDate:Date|null;
EndDate:Date|null;
customerledgerconsentdetails: CustomerLedgerConSentDetailsVM[];
}
