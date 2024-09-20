export class OrderColorRequest {

    WarehouseIds: any;
    StartDate: Date;
    EndDate: Date;
    ReportType: string;

    constructor(data?) {
        
        this.WarehouseIds = data && data.WarehouseIds ? data.WarehouseIds : []
        this.StartDate = data && data.StartDate ? data.StartDate : new Date(new Date().setMonth(new Date().getMonth() - 3));
        
        this.EndDate = data && data.EndDate ? data.EndDate : new Date();
        this.ReportType = data && data.ReportType ? data.ReportType : '';

    }

}
