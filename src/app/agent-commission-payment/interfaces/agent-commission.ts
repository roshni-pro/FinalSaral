export class AgentCommissionPaymentModel {
    Id: number;
    AgentId: number;
    AgentLedgerId: number;
    BankLedgerId: number;
    Amount: number;
    PaymentDate: Date;
    RefNumber: string;
    Narration: string;
    Status: string;
    SettledStatus: string;
    SettledAmount: number;

    constructor(agentCommissionPayment?: AgentCommissionPaymentModel) {
        this.Id = agentCommissionPayment && agentCommissionPayment.Id ? agentCommissionPayment.Id : 0;
        this.AgentId = agentCommissionPayment && agentCommissionPayment.AgentId ? agentCommissionPayment.AgentId : null;
        this.AgentLedgerId = agentCommissionPayment && agentCommissionPayment.AgentLedgerId ? agentCommissionPayment.AgentLedgerId : null;
        this.BankLedgerId = agentCommissionPayment && agentCommissionPayment.BankLedgerId ? agentCommissionPayment.BankLedgerId : null;
        this.Amount = agentCommissionPayment && agentCommissionPayment.Amount ? agentCommissionPayment.Amount : null;
        this.PaymentDate = agentCommissionPayment && agentCommissionPayment.PaymentDate ? agentCommissionPayment.PaymentDate : new Date();
        this.RefNumber = agentCommissionPayment && agentCommissionPayment.RefNumber ? agentCommissionPayment.RefNumber : '';
        this.Narration = agentCommissionPayment && agentCommissionPayment.Narration ? agentCommissionPayment.Narration : '';
        this.Status = agentCommissionPayment && agentCommissionPayment.Status ? agentCommissionPayment.Status : '';
        this.SettledStatus = agentCommissionPayment && agentCommissionPayment.SettledStatus ? agentCommissionPayment.SettledStatus : '';
        this.SettledAmount = agentCommissionPayment && agentCommissionPayment.SettledAmount ? agentCommissionPayment.SettledAmount : null;
        
        
    }
}
