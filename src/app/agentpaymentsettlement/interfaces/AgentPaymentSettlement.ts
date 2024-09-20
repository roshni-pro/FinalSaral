export class AgentPaymentSettlement {
    Id: number;
    Amount: Number;
    SettleDate: Date;
    AgentCommissionPaymentId: Number;
    AssignmentCommissionId: Number;

    constructor(agentPaymentSettlement?: AgentPaymentSettlement) {
        this.Id = agentPaymentSettlement && agentPaymentSettlement.Id ? agentPaymentSettlement.Id : 0;
        this.Amount = agentPaymentSettlement && agentPaymentSettlement.Amount ? agentPaymentSettlement.Amount : null;
        this.SettleDate = agentPaymentSettlement && agentPaymentSettlement.SettleDate ? new Date(agentPaymentSettlement.SettleDate) : new Date();
        this.AgentCommissionPaymentId = agentPaymentSettlement && agentPaymentSettlement.AgentCommissionPaymentId ? agentPaymentSettlement.AgentCommissionPaymentId : null;
        this.AssignmentCommissionId = agentPaymentSettlement && agentPaymentSettlement.AssignmentCommissionId ? agentPaymentSettlement.AssignmentCommissionId : null;
    }
}
