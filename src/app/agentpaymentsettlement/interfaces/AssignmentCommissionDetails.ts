export class AssignmentCommissionDetail {
    AssignmentID: number;
    OrderId: number;
    ItemId: number;
    SubsubCategoryId: number;
    CommissionPercentage: number;
    TotalAmount: number;
    CommissionAmount: number;
    TdsAmount: number;

    constructor(assignmentCommissionDetail?: AssignmentCommissionDetail) {
        this.AssignmentID = assignmentCommissionDetail && assignmentCommissionDetail.AssignmentID ? assignmentCommissionDetail.AssignmentID : 0;
        this.OrderId = assignmentCommissionDetail && assignmentCommissionDetail.OrderId ? assignmentCommissionDetail.OrderId : 0;
        this.ItemId = assignmentCommissionDetail && assignmentCommissionDetail.ItemId ? assignmentCommissionDetail.ItemId : 0;
        this.SubsubCategoryId = assignmentCommissionDetail && assignmentCommissionDetail.SubsubCategoryId ? assignmentCommissionDetail.SubsubCategoryId : 0;
        this.CommissionPercentage = assignmentCommissionDetail && assignmentCommissionDetail.CommissionPercentage ? assignmentCommissionDetail.CommissionPercentage : 0;
        this.TotalAmount = assignmentCommissionDetail && assignmentCommissionDetail.TotalAmount ? assignmentCommissionDetail.TotalAmount : 0;
        this.CommissionAmount = assignmentCommissionDetail && assignmentCommissionDetail.CommissionAmount ? assignmentCommissionDetail.CommissionAmount : 0;
        this.TdsAmount = assignmentCommissionDetail && assignmentCommissionDetail.TdsAmount ? assignmentCommissionDetail.TdsAmount : 0;
    }
}
