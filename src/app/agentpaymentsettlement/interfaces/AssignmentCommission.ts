export class AssignmentCommission {
    Id: number;
    AssignmentID: number;
    AgentID: number;
    CommissionAmount: number;
    TDSAmount: number;
    PaidAmount: number;
    FreezeDate: Date;
    Status: string;

    constructor(assignmentCommission?: AssignmentCommission) {
        this.Id = assignmentCommission && assignmentCommission.Id ? assignmentCommission.Id : 0;
        this.AssignmentID = assignmentCommission && assignmentCommission.AssignmentID ? assignmentCommission.AssignmentID : 0;
        this.AgentID = assignmentCommission && assignmentCommission.AgentID ? assignmentCommission.AgentID : 0;
        this.CommissionAmount = assignmentCommission && assignmentCommission.CommissionAmount ? assignmentCommission.CommissionAmount : 0;
        this.TDSAmount = assignmentCommission && assignmentCommission.TDSAmount ? assignmentCommission.TDSAmount : 0;
        this.PaidAmount = assignmentCommission && assignmentCommission.PaidAmount ? assignmentCommission.PaidAmount : 0;
        this.FreezeDate = assignmentCommission && assignmentCommission.FreezeDate ? new Date(assignmentCommission.FreezeDate) : new Date();
        this.Status = assignmentCommission && assignmentCommission.Status ? assignmentCommission.Status : "";
    }
}
