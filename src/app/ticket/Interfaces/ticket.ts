export class Ticket {

    Id: number;
    CategoryId: number;
    CreatedBy: any;

    DepartmentId: number;

    Status: number;
    severity: number
    Description: string

    type: number;
    Assignedto: number;

    Closeresolution: string;

    constructor(data?) {
        this.Id = data && data.id ? data.id : 0;
        this.CategoryId = data && data.CategoryId ? data.CategoryId : [];
        this.CreatedBy = data && data.CreatedBy ? data.CreatedBy : 0;
        this.Assignedto = data && data.Assignedto ? data.Assignedto : 0;

        this.DepartmentId = data && data.DepartmentId ? data.DepartmentId : [];

        this.Status = data && data.Status ? data.Status : 0;
        this.severity = data && data.severity ? data.severity : 0;
        this.Description = data && data.Description ? data.Description : '';
        this.Closeresolution = data && data.Closeresolution ? data.Closeresolution : '';

        this.type = data && data.type ? data.type : 0

    }
}


export class FilterTicket {

    Skip: number;
    Take: number;
    StartDate: Date;

    EndDate: Date;
    Type: number;

    CustomerId: number;
    CategoryIds: number[];
    Status: number;
    AssignedTo: number;
    Severity: number;
    SearchString: string;

    constructor(data?) {
        this.Skip = data && data.Skip ? data.Skip : 0;
        this.Take = data && data.Take ? data.Take : 10;
        this.SearchString = data && data.SearchString ? data.SearchString : null;
        this.Severity = data && data.Severity ? data.Severity : null;
        this.Type = data && data.Type ? data.Type : null;
        // this.StartDate = data && data.StartDate ? data.StartDate : new Date(new Date().setFullYear(new Date().getFullYear() - 20));

        // this.EndDate = data && data.EndDate ? data.EndDate : new Date(new Date().setFullYear(new Date().getFullYear() + 40));

        this.StartDate = data && data.StartDate ? data.StartDate : null;

        this.EndDate = data && data.EndDate ? data.EndDate : null;

        this.CustomerId = data && data.CustomerId ? data.CustomerId : null;
        this.CategoryIds = data && data.CategoryIds ? data.CategoryIds : [];
        this.AssignedTo = data && data.AssignedTo ? data.AssignedTo : null;

    }
}




export class TicketActivityLog {

    id: number;
    TicketId: number;
    CreatedBy: number;
    ModifiedBy: number;

    DepartmentId: number;

    Status: number;
    severity: number
    Comment: string

    type: number;

    Ticket: Ticket;
    ShowToCustomer: boolean


    constructor(data?) {
        this.id = data && data.id ? data.id : 0;
        this.TicketId = data && data.TicketId ? data.TicketId : [];
        this.ShowToCustomer = data && data.ShowToCustomer ? data.ShowToCustomer : false;

        this.CreatedBy = data && data.CreatedBy ? data.CreatedBy : 0;
        this.ModifiedBy = data && data.ModifiedBy ? data.ModifiedBy : 0;
        this.Ticket = data && data.Ticket ? data.Ticket : 0;


        // this.DepartmentId = data && data.DepartmentId ? data.DepartmentId : [];

        // this.Status = data && data.Status ? data.Status : 0;
        // this.severity = data && data.severity ? data.severity : 0;
        this.Comment = data && data.Comment ? data.Comment : '';


        // this.type = data && data.type ? data.type : 0

    }
}


export class TicketCategoriesDc {

    Id : number;
    ParentId: number;
    Name: string;
    DisplayText: string;
    DisplayTextHindi: string;

    IsDbValue: boolean;

    IsAskQuestion: boolean;
    Question: string
    QuestionHindi : string;
    SqlQuery: string

    AnswareReplaceString: string;

    DepartmentId: number
    Type: number
    TATInHrs: number
    CreatedDate: Date
    ModifiedDate: Date
    IsActive: boolean
    IsDeleted: boolean
    CreatedBy: number
    ModifiedBy: number
    AfterSelectMessage : string;
    AfterSelectHindiMessage : string;

}

export class AcitveTicketDc
{
    id : number;
    IsActive : boolean;
}
export class DeleteTicketDc
{
    id : number;
    IsDeleted : boolean;
}

export class AcitveSubCatTicketDc
{
    id : number;
    ParentId : number;
    IsActive : boolean;
}

export class DeleteSubCatTicketDc
{
    id : number;
    ParentId : number;
    IsDeleted : boolean;
}

export class TicketCategoriesNewDc
{
     Id : number
    CreatedDate : Date
    ModifiedDate : Date
    IsActive : boolean
    IsDeleted  : boolean
    CreatedBy : number
    ModifiedBy : number
    ParentId : number
    Name : string
    DisplayText : string
    DisplayTextHindi : string
    AfterSelectMessage : string
    AfterSelectHindiMessage : string
    IsDbValue : boolean
    IsAskQuestion : boolean
    Question : string
    QuestionHindi : string
    SqlQuery : string
    AnswareReplaceString : string
    DepartmentId : number
    Type : number 
    TATInHrs : number    
    label?: string;
    expanded?: boolean;
    ticketCategoriesNewDcs : TicketCategoriesNewDc [];
    
}

export interface TreeNodeDc {
    label?: string;
    data?: any;
    Id : number;
    IsActive : boolean;
    ParentId : TreeNodeDc[];
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNodeDc[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    parent?: TreeNodeDc;
    partialSelected?: boolean;
    styleClass?: string;
    draggable?: boolean;
    droppable?: boolean;
    selectable?: boolean;
    key?: string;
}