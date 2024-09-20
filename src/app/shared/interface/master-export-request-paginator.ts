
export interface MasterExportRequestPaginator {
     Skip: number;
     Take: number;
     Contains: string;
     RequesterID: number| null;
     ApproverID: number| null;
     FromDate: Date| null;
     ToDate: Date| null;
}
