import { CustomerLedgerService } from 'app/shared/services/customer-ledger.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { PeopleService } from 'app/shared/services/people.service';
import { MessageService } from 'primeng/api';
import { DepartmentService } from 'app/shared/services/department.service';
import { TicketService } from './../../Services/ticket.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Ticket, FilterTicket, TicketActivityLog } from 'app/ticket/Interfaces/ticket';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignedtickets',
  templateUrl: './assignedtickets.component.html',
  styleUrls: ['./assignedtickets.component.scss']
})
export class AssignedticketsComponent implements OnInit, DoCheck {


  editLog = false;
  disabledassignedto = false;
  disablestatus = false;
  disablecategory = false;
  disabledepartment = false;
  disableseverity = false;

  statusList = [
    { level: 0, Name: 'Pending' },
    { level: 1, Name: 'Open' },
    { level: 4, Name: 'On Hold' },
    { level: 2, Name: 'Closed' },
  ]

  types = [{
    id: 1,
    name: 'Customer'

  }, {
    id: 2, name: 'People'
  }]

  displayassign = false;
  ticketCategoryList = [];
  activitylog = [];

  filterTicket: FilterTicket = new FilterTicket();
  assignedTicketsList = [];
  display = false;
  departmentList = []
  ticket: Ticket;
  blocked = false;
  severityList = [
    { level: 1, Name: 'Low' },
    { level: 2, Name: 'Medium' },
    { level: 3, Name: 'High' },
    { level: 4, Name: 'Urgent' }
  ]
  TotalRecords: any;
  peopleList = [];
  customerList = [];
  ticketLog: TicketActivityLog;
  displayLog: boolean;
  pplfiltered: any[];
  log = new TicketActivityLog();
  displaysidenav: boolean;
  chatDoCheckId: any;
  logchangeinassignedto: number;
  currentcustomer: any;

  constructor(private r: ActivatedRoute, private router: Router, private CustomerLedgerService: CustomerLedgerService, private customerService: CustomerService, private peopleService: PeopleService, private messageService: MessageService, private ticketService: TicketService, private departmentService: DepartmentService) {

    router.events
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          // Perform actions
          setTimeout(() => {

            this.router.navigateByUrl('layout/Ticket/AssignedTickets');
          }, 100);
        }
      });

  }

  ngOnInit() {

    this.GetAllAssignedTickets();
    this.getAllPeople();
    this.getAllTicketCategories();
    this.getAllDepartments();
    this.initialize();
    // this.getAllCustomers();
  }

  initialize() {
    this.ticket = new Ticket();
  }

  ngDoCheck() {
    // if (this.chatDoCheckId) {
    //   this.viewActivityLog(this.chatDoCheckId);
    // }
  }

  getAllPeople() {
    this.blocked = true;

    this.peopleService.GetAll().subscribe(result => {
      this.blocked = false;

      this.peopleList = result;
    })
  }

  getAllCustomers() {


    // this.ticketService.GetAllCustomers().subscribe(result => {

    //   this.customerList = result;
    //   
    // })

  }


  load(event) {

    this.filterTicket.Skip = event.first;
    this.filterTicket.Take = event.rows;
    this.blocked = true;

    this.ticketService.GetAllTicketsByUserId(this.filterTicket).subscribe(result => {
      this.blocked = false;

      this.assignedTicketsList = result.Tickets;
      this.TotalRecords = result.TotalRecords;
    });

  }

  reset() {
    this.filterTicket = new FilterTicket()
  }

  GetAllAssignedTickets() {
    this.blocked = true;

    this.ticketService.GetAllTicketsByUserId(this.filterTicket).subscribe(result => {
      this.blocked = false;

      if (result.Tickets.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'no records!', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'recieved!', detail: '' });

      }
      this.assignedTicketsList = result.Tickets;
      this.TotalRecords = result.TotalRecords;
    });
  }

  getAllTicketCategories() {
    this.blocked = true;

    this.ticketService.getAllTicketCategories().subscribe(result => {
      this.blocked = false;

      this.ticketCategoryList = result;
    });
  }


  getAllDepartments() {
    this.blocked = true;

    this.departmentService.GetAllDepartment().subscribe(result => {
      this.blocked = false;

      this.departmentList = result;
    });
  }

  save(ticketForm) {
    this.blocked = true;

    this.ticketService.createTicket(this.ticket).subscribe(result => {
      this.blocked = false;

      this.display = false;
      this.messageService.add({ severity: 'success', summary: 'Ticket Created!', detail: result });
      this.ticket = new Ticket();
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

  getStatus(level) {

    return this.statusList.filter(status => status.level == level)[0].Name;
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
    let name = this.peopleList.filter(res => res.PeopleID == modifiedBy)[0] ? this.peopleList.filter(res => res.PeopleID == modifiedBy)[0].DisplayName : '-';
    return name ? name : '-'
  }

  setPerson(event) {
  }

  assign(data) {
    this.displayassign = true;
    this.ticketLog = new TicketActivityLog();

    this.ticketLog.ModifiedBy = Number(localStorage.getItem('userid'));

    this.ticketLog.TicketId = data.Id;
    this.ticketLog.Ticket = new Ticket(data);
  }

  assignTicket() {
    this.blocked = true;

    this.ticketService.AssignTicket(this.ticketLog).subscribe(result => {
      this.blocked = false;

      this.messageService.add({ severity: 'success', summary: 'Ticket Assigned!', detail: result });
      this.displayassign = false;
    });
  }

  reply(log) {
    
    this.blocked = true;

    this.ticketService.AssignTicket(log).subscribe(result => {
      
      this.blocked = false;

      this.GetAllAssignedTickets()
      this.messageService.add({ severity: 'success', summary: 'saved!', detail: result });
      // this.activitylog.push(log);

      // this.setTicketLog();

      this.viewActivityLog(this.log.Ticket);
      this.displayassign = false;
      setTimeout(() => {
        if (this.logchangeinassignedto != this.log.Ticket.Assignedto) {
          this.displayLog = false;
        }
      }, 1000);

    });
  }



  searchCustomers(event) {
    if (event.query.length >= 3)
      this.ticketService.GetAllCustomers(event.query).subscribe(result => {
        this.customerList = result;

      })
  }

  searchPeople(event) {

    this.pplfiltered = this.peopleList.filter(ppl => ppl.DisplayName.includes(event.query))
  }

  searchPeopleForAssignment(event) {
    this.editLog = true;
    this.pplfiltered = this.peopleList.filter(ppl => ppl.DisplayName.includes(event.query))
  }

  onSelectParty(e) {

    this.ticket.CreatedBy = e.CustomerId ? e.CustomerId : 0;
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



      if (result && result.length) {
        this.displayLog = true;
        // this.messageService.add({ severity: 'success', summary: 'Got Log!', detail: 'log recieved' });
      }
      else {
        // this.messageService.add({ severity: 'error', summary: 'No Records Found!', detail: result });

      }
    });

  }

  getAssignedTo(id) {

    return this.peopleList.filter(ppl => ppl.PeopleID == id)[0]

  }

  assignPersonv2(event) {

    this.log.Ticket.Assignedto = event.PeopleID;
    this.log.CreatedBy = Number(localStorage.getItem('userid'));
  }

  setTicketLog() {
    this.log = new TicketActivityLog(this.activitylog[this.activitylog.length - 1]);

    this.log.CreatedBy = this.log.Ticket.Assignedto;
    this.logchangeinassignedto = this.log.Ticket.Assignedto
    this.log.Comment = ''
    this.log.ModifiedBy = Number(localStorage.getItem('userid'));

    // this.activitylog.forEach(element => {

    //   element.Comment = element.Comment.split(";").join("\n");

    // });
    // 

    
    this.router.navigate(['Ticketactivity', {


    }], { relativeTo: this.r.parent });

    this.ticketService.behavior.next({ data: { activitylog: this.activitylog, ticketLog: this.ticketLog, log: this.log } });


  }

  returnModifiedByName(id) {

    return this.peopleList.filter(x => x.PeopleID == id)[0] ? this.peopleList.filter(x => x.PeopleID == id)[0].DisplayName : '';
  }

  openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
    this.displaysidenav = true;
  }

  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    this.displaysidenav = false;
  }

  closeTicket(Ticket) {

    Ticket.ModifiedBy = Number(localStorage.getItem('userid'));
    Ticket.Description = Ticket.desc;
    this.blocked = true;

    this.ticketService.closeTicket(Ticket).subscribe(result => {
      this.blocked = false;

      // this.displayass = false;
      this.closeNav();
      this.messageService.add({ severity: 'success', summary: 'Ticket Closed!', detail: result });
      this.displayLog = false;
      this.GetAllAssignedTickets();
      this.ticket = new Ticket();
    });
  }

  cancel(colNameToDisable) {
    this[colNameToDisable] = false;
    // this.log.disabledassignedto = false;
    // disablestatus = false;
    // disablecategory = false;
    // disabledepartment = false;
    // disableseverity = false;
  }


}
