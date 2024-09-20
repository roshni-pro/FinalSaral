export class POReturnRequest {
    POReturnRequestStatus: string;
    POReturnRequestId: Number;
    ItemId: Number;
    RequestedBy: string;
    RequestedDate: Date;
    ApprovedBy: string;
    ApprovedDate: Date;
    CancelType: string;
    Amount: Number;
    Status: string

    constructor(poReturn?: POReturnRequest) {

        this.POReturnRequestStatus = poReturn && poReturn.POReturnRequestStatus ? this.POReturnRequestStatus : '';
        this.POReturnRequestId = poReturn && poReturn.POReturnRequestId ? this.POReturnRequestId : 0;
        this.ItemId = poReturn && poReturn.ItemId ? this.ItemId : 0;
        this.RequestedBy = poReturn && poReturn.RequestedBy ? this.RequestedBy : '';
        this.RequestedDate = poReturn && poReturn.RequestedDate ? new Date(this.RequestedDate) : new Date();
        this.ApprovedBy = poReturn && poReturn.ApprovedBy ? this.ApprovedBy : '';
        this.ApprovedDate = poReturn && poReturn.ApprovedDate ? new Date(this.ApprovedDate) : new Date();
        this.CancelType = poReturn && poReturn.CancelType ? this.CancelType : '';
        this.Amount = poReturn && poReturn.Amount ? this.Amount : 0;
        this.Status = poReturn && poReturn.Status ? this.Status : '';


    }

}