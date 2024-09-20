import { IrOutstandingDC } from './ir-outstanding-dc';

export interface IrOutstandingPayment
{
    BankId: number;
    BankName: string;
    RefNo: string;
    TotalAmount: number;
    TotalReaminingAmount: number | null;
    Remark: string;
    PaymentDate: Date | string | null;
    
    IrOutstandingList: IrOutstandingDC[];

}