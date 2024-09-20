import { CustomerLedgerService } from 'app/shared/services/customer-ledger.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { PeopleService } from 'app/shared/services/people.service';
import { skip } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { DepartmentService } from 'app/shared/services/department.service';
import { TicketService } from './../../Services/ticket.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Ticket, FilterTicket, TicketActivityLog } from 'app/ticket/Interfaces/ticket';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-ticket-generation',
  templateUrl: './ticket-generation.component.html',
  styleUrls: ['./ticket-generation.component.scss']
})
export class TicketGenerationComponent implements OnInit, DoCheck {

  editLog = false;
  displayassign = false;
  ticketCategoryList = [];
  types = [{
    id: 1,
    name: 'Customer'

  },
  {
    id: 2, name: 'People'
  }]
  activitylog = [];
  log = new TicketActivityLog();
  filterTicket: FilterTicket = new FilterTicket();
  ticketList = [];
  display = false;
  departmentList = []
  ticket: Ticket;
  blocked :boolean= false;
  severityList = [
    { level: 1, Name: 'Low' },
    { level: 2, Name: 'Medium' },
    { level: 3, Name: 'High' },
    { level: 4, Name: 'Urgent' }
  ]
  statusList = [
    { level: 0, Name: 'Pending' },
    { level: 1, Name: 'Open' },
    { level: 4, Name: 'On Hold' },
    { level: 2, Name: 'Closed' },


  ]
  TotalRecords: any;
  peopleList = [];
  customerList = [];
  ticketLog: TicketActivityLog;
  displayLog: boolean;
  pplfiltered: any[];
  chatDoCheckId: any;
  deptFiltered: any[];
  currentcustomer: any;
  DepartmentName: any;

  constructor(private router: Router, private r: ActivatedRoute, private CustomerLedgerService: CustomerLedgerService, private customerService: CustomerService,
   private peopleService: PeopleService, private messageService: MessageService, private ticketService: TicketService,
    private departmentService: DepartmentService,private exportService: ExportServiceService) {

    // router.events
    //   .subscribe((event: NavigationStart) => {
    //     if (event.navigationTrigger === 'popstate') {
    //       // Perform actions
    //       setTimeout(() => {
    //         // this.router.navigateByUrl('layout/Account/accountclassificatiion')
    //         this.router.navigateByUrl('layout/Ticket/TicketGeneration');
    //       }, 100);
    //     }
    //   });

  }

  ngOnInit() {
    this.getAllCustomers();
    this.getAllTicketCategories();
    this.getAllDepartments();
    this.initialize();

    this.getAllPeople();
    // this.GetAllTickets();
  }

  initialize() {
    this.ticket = new Ticket();
  }

  getAllPeople() {
    this.blocked = true;
    this.peopleService.GetAll().subscribe(result => {
      this.blocked = true;

      this.peopleList = result;
    })
  }

  reset() {
    this.filterTicket = new FilterTicket()
  }

  getAllCustomers() {
    this.blocked = true;

    this.ticketService.GetAllCustomers('a').subscribe(result => {

      this.customerList = result;
      this.blocked = false;

      this.ticketService.GetAllCustomers('e').subscribe(result => {

        this.customerList = this.customerList.concat(result);
        this.blocked = false;

      })
    })
  }


  load(event) {
debugger;
if(this.ticketCategoryList.length > 0)
{    this.filterTicket.Skip = event ? event.first : 0;
    this.filterTicket.Take = event ? event.rows : 10;
    this.blocked = true;
    debugger;
    this.filterTicket.CategoryIds = [];
    this.ticketCategoryList.forEach(element => {
      this.filterTicket.CategoryIds.push(element.Id);
    });
    this.TotalRecords = [];
    this.ticketService.GetAllTickets(this.filterTicket).subscribe(result => {
      this.blocked = false;
debugger;
      this.ticketList = result.Tickets;
      this.ticketList.forEach(element => {
        element.CustomerDetail = element.CustomerName + ' ' + element.Skcode;
      });
      this.TotalRecords = result.TotalRecords;
    });
}
  }

  export()
  {
    debugger;
    this.filterTicket.StartDate;
    this.filterTicket.EndDate;
    this.filterTicket.Take = this.TotalRecords;
    this.blocked = true;
        this.ticketService.exportAllTickets(this.filterTicket).subscribe(result => {
      this.blocked = false;
      debugger;
      if (result.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'no records!', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Export in Progress!', detail: '' });
        this.exportService.exportAsExcelFile(result, 'Ticket Details');
        console.log('export',result);
      }
    });
  }

  assignPerson(event) {
    // this.ticketLog.CreatedBy = event.PeopleID;
    this.ticketLog.CreatedBy = event.PeopleID;
  }

  initializeticketlog() {
    this.ticketLog = new TicketActivityLog()
  }

  assignPersonv2(event) {

    this.log.Ticket.Assignedto = event.PeopleID;
    this.log.CreatedBy = Number(localStorage.getItem('userid'));
  }

  GetAllTickets() {
    this.TotalRecords = [];
    this.blocked = true;
    debugger;
    this.filterTicket.CategoryIds = [];
    this.ticketCategoryList.forEach(element => {
      this.filterTicket.CategoryIds.push(element.Id);
    });
    this.ticketService.GetAllTickets(this.filterTicket).subscribe(result => {
      this.blocked = false;
      debugger;
      if (result.Tickets.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'no records!', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'recieved!', detail: '' });

      }
      this.ticketList = result.Tickets;
         this.ticketList.forEach(element => {
        element.CustomerDetail = element.CustomerName + ' ' + element.Skcode;
      });
      this.TotalRecords = result.TotalRecords;
    });
  }

  getAllTicketCategories() {
    this.blocked = true;

    this.ticketService.getAllTicketCategories().subscribe(result => {
      this.blocked = false;
      debugger;
      this.ticketCategoryList = result;
      this.ticketList = [];
      this.TotalRecords = 0;
      // this.GetAllTickets();
      this.load(null);
    });
  }


  getAllDepartments() {
    this.blocked = true;

    this.departmentService.GetAllDepartment().subscribe(result => {
      this.blocked = false;

      this.departmentList = result;
    });
  }

  searchPeopleForAssignment(event) {
    this.editLog = true;
    this.pplfiltered = this.peopleList.filter(ppl => ppl.DisplayName.toLowerCase().includes(event.query.toLowerCase()))
  }

  getAssignedTo(id) {

    return this.peopleList.filter(ppl => ppl.PeopleID == id)[0]

  }

  save(ticket) {
    this.blocked = true;

    this.ticketService.createTicket(this.ticket).subscribe(result => {
      this.blocked = false;

      if (this.ticketLog.Comment != '' && this.ticketLog.CreatedBy) {
        ticket.Id = result;
        this.assignatcreation(ticket);
      }
      this.display = false;
      this.messageService.add({ severity: 'success', summary: 'Ticket Created!', detail: result });
      this.ticket = new Ticket();
      this.GetAllTickets();
    });

  }

  getCategory(categoryId) {
    let name = this.ticketCategoryList.filter(category => category.Id == categoryId)[0] ? this.ticketCategoryList.filter(category => category.Id == categoryId)[0].Name : '-';
    return name ? name : '-'
  }

  getDepartment(deptUId) {

    let name = this.departmentList.filter(category => category.DepId == deptUId)[0] ? this.departmentList.filter(category => category.DepId == deptUId)[0].DepName : '-';
    return name ? name : '-'
  }

  getSeverityName(severityId) {
    let name = this.severityList.filter(category => category.level == severityId)[0] ? this.severityList.filter(category => category.level == severityId)[0].Name : '-';
    return name ? name : '-'


  }

  getAppliedBy(appliedBy) {

    // return this.customerList.filter(res => res.PeopleID == appliedBy)[0].DisplayName;
    return 'aaa'

  }

  getModifiedBy(modifiedBy) {
    let name = this.peopleList.filter(res => res.PeopleID == modifiedBy)[0] ? this.peopleList.filter(res => res.PeopleID == modifiedBy)[0].DisplayName : '-';
    return name ? name : '-'
  }

  getModifiedByPerson(modifiedBy) {
debugger;
    let name = this.peopleList.filter(res => res.PeopleID == modifiedBy)[0] ? this.peopleList.filter(res => res.PeopleID == modifiedBy)[0].DisplayName : '-';
    return name ? name : '-'
  }

  getModifiedByPersonv2(modifiedBy) {

    let name = this.peopleList.filter(res => res.PeopleID == modifiedBy)[0] ? this.peopleList.filter(res => res.PeopleID == modifiedBy)[0].DisplayName : '-';
    return name ? name : '-'
  }





  setPerson(event) {
  }

  ngDoCheck() {
    // if (this.chatDoCheckId) {
    //   this.viewActivityLog(this.chatDoCheckId);
    // }
  }

  assign(data) {
    this.displayassign = true;
    this.ticketLog = new TicketActivityLog();

    this.ticketLog.ModifiedBy = Number(localStorage.getItem('userid'));

    this.ticketLog.TicketId = data.Id;
    this.ticketLog.Ticket = new Ticket(data);
  }

  assignatcreation(data) {
    // this.displayassign = true;
    // this.ticketLog = new TicketActivityLog();

    this.ticketLog.ModifiedBy = Number(localStorage.getItem('userid'));

    this.ticketLog.TicketId = data.Id;
    this.ticketLog.Ticket = new Ticket(data);
    this.ticketLog.Ticket.Assignedto = this.ticketLog.CreatedBy;
    this.assignTicket();
  }

  assignTicket() {
    this.blocked = true;

    this.ticketService.AssignTicket(this.ticketLog).subscribe(result => {
      this.blocked = false;

      this.messageService.add({ severity: 'success', summary: 'Ticket Assigned!', detail: result });
      this.displayassign = false;
      this.GetAllTickets();
    });
  }

  reply(log) {
    this.blocked = true;

    this.ticketService.AssignTicket(log).subscribe(result => {
      this.blocked = false;

      this.messageService.add({ severity: 'success', summary: 'saved!', detail: result });
      // this.activitylog.push(log);

      // this.setTicketLog();

      this.viewActivityLog(this.log.Ticket);
      this.displayassign = false;
    });
  }

  searchCustomers(event) {


    if (event.query.length >= 3)
      this.ticketService.GetAllCustomers(event.query.toLowerCase()).subscribe(result => {



        this.customerList = result;

      })
  }

  searchPeople(event) {
    

    // this.pplfiltered = this.peopleList.filter(ppl => ppl.DisplayName.toLowerCase().includes(event.query.toLowerCase()))
    this.pplfiltered = this.peopleList.filter(ppl => ppl.Department == this.DepartmentName && ppl.DisplayName.toLowerCase().includes(event.query.toLowerCase()))
  }

  searchDept(event) {
    
    this.deptFiltered = this.departmentList.filter(ppl => ppl.DepName.toLowerCase().includes(event.query.toLowerCase()))
  }

  onSelectDept(e) {

    this.ticket.DepartmentId = e.DepId ? e.DepId : 0;
  }

  selectDepartmentOnCategory() {
    
    this.ticket.DepartmentId = this.ticketCategoryList.filter(t => t.Id == this.ticket.CategoryId)[0].DepartmentId;
    this.DepartmentName = this.departmentList.filter(d => d.DepId == this.ticket.DepartmentId)[0].DepName;
  }

  onSelectParty(e) {

    this.ticket.CreatedBy = e.CustomerId ? -(e.CustomerId) : 0;
  }

  onSelectPeople(e) {

    this.ticket.CreatedBy = e.PeopleID ? e.PeopleID : 0;
  }

  viewActivityLog(rowData) {
    let id = rowData.Id;
    this.chatDoCheckId = rowData.Id;

    this.blocked = true;

    this.ticketService.getActivityLogByTicketId(id).subscribe(result => {

      this.blocked = false;

      this.currentcustomer = rowData.CustomerName;
      this.activitylog = result;
      this.setTicketLog();
      this.displayLog = true;



      if (result && result.length) {

        // this.messageService.add({ severity: 'success', summary: 'Got Log!', detail: 'log recieved' });

      }
      else {
        // this.messageService.add({ severity: 'error', summary: 'No Records Found!', detail: result });

      }
    });

  }

  setTicketLog() {
    this.log = new TicketActivityLog(this.activitylog[this.activitylog.length - 1]);
    this.log.CreatedBy = this.log.Ticket.Assignedto;
    this.log.Comment = ''
    this.log.ModifiedBy = Number(localStorage.getItem('userid'));

    // this.activitylog.forEach(element => {

    //   element.Comment.replace(/\u21B5/g,'<br/>')
    //   element.Comment.replace(/↵/g, '<br/>');
    //   // element.Comment = element.Comment.split(";").join("\n").replace(/↵/g, '<br/>');
    // });


    this.router.navigate(['Ticketactivity', {


    }], { relativeTo: this.r.parent });

    this.ticketService.behavior.next({ data: { activitylog: this.activitylog, ticketLog: this.ticketLog, log: this.log } });

  }


  returnModifiedByName(id) {

    return this.peopleList.filter(x => x.PeopleID == id)[0] ? this.peopleList.filter(x => x.PeopleID == id)[0].DisplayName : '';
  }

  closeTicket(Ticket) {

    Ticket.ModifiedBy = Number(localStorage.getItem('userid'));
    Ticket.Description = Ticket.desc;
    this.blocked = true;

    this.ticketService.closeTicket(Ticket).subscribe(result => {
      // this.displayass = false;
      this.blocked = false;

      this.messageService.add({ severity: 'success', summary: 'Ticket Closed!', detail: result });
      this.displayLog = false;
      this.GetAllTickets()
      this.ticket = new Ticket();
    });
  }

}
