import { CustomerLedgerService } from 'app/shared/services/customer-ledger.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { PeopleService } from 'app/shared/services/people.service';
import { skip } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { DepartmentService } from 'app/shared/services/department.service';

import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Ticket, FilterTicket, TicketActivityLog } from 'app/ticket/Interfaces/ticket';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { TicketService } from 'app/ticket/Services/ticket.service';

@Component({
  selector: 'app-ticketactivity',
  templateUrl: './ticketactivity.component.html',
  styleUrls: ['./ticketactivity.component.scss']
})
export class TicketactivityComponent implements OnInit {

  log: any;
  activitylog: any;
  ticketLog: any;


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
  // activitylog = [];
  // log = new TicketActivityLog();
  filterTicket: FilterTicket = new FilterTicket();
  ticketList = [];
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
  statusList = [
    { level: 0, Name: 'Pending' },
    { level: 1, Name: 'Open' },
    { level: 4, Name: 'On Hold' },
    { level: 2, Name: 'Closed' },


  ]
  TotalRecords: any;
  peopleList = [];
  customerList = [];
  // ticketLog: TicketActivityLog;
  displayLog: boolean;
  pplfiltered: any[];
  chatDoCheckId: any;
  deptFiltered: any[];
  currentcustomer: any;

  constructor(private router: Router, private r: ActivatedRoute, private CustomerLedgerService: CustomerLedgerService, private customerService: CustomerService, private peopleService: PeopleService, private messageService: MessageService, private ticketService: TicketService, private departmentService: DepartmentService) {



  }

  ngOnInit() {
    debugger;
    // this.getAllCustomers();
    this.getAllTicketCategories();
    this.getAllDepartments();
    this.initialize();

    this.getAllPeople();
    // this.GetAllTickets();
    this.ticketService.behavior.subscribe(obj => {
      debugger;
      this.activitylog = obj.data.activitylog
      this.log = obj.data.log;
      if(this.log.Ticket.CreatedBy > 0)
      {

      }else{
        this.getAllCustomers(this.log.Ticket.GeneratedBy)
      }
      
      // if(this.log.Ticket.CreatedBy < 0)
      // {
      //   this.getModifiedBy(this.log.Ticket.GeneratedBy);
      // }
      this.ticketLog = obj.data.ticketLog
    });
    // debugger;
    // this.viewActivityLog(this.log.Ticket);

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

  getAllCustomers(custId) {
    this.blocked = true;

    this.ticketService.getAllActiveInActiveCustomers(custId).subscribe(result => {
      this.customerList = result;
      debugger;
      this.currentcustomer = this.customerList[0].Name + ' (' + this.customerList[0].Skcode + ')'; 
      this.blocked = false;
      // this.ticketService.GetAllCustomers('e').subscribe(result => {
      //   this.customerList = this.customerList.concat(result);
      //   this.blocked = false;
      // })
    })
  }


  // load(event) {

  //   this.filterTicket.Skip = event.first;
  //   this.filterTicket.Take = event.rows;
  //   this.blocked = true;

  //   this.ticketService.GetAllTickets(this.filterTicket).subscribe(result => {
  //     this.blocked = false;

  //     this.ticketList = result.Tickets;
  //     this.TotalRecords = result.TotalRecords;
  //   });

  // }

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
    this.blocked = true;

    this.ticketService.GetAllTickets(this.filterTicket).subscribe(result => {
      this.blocked = false;

      if (result.Tickets.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'no records!', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'recieved!', detail: '' });

      }
      this.ticketList = result.Tickets;
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
  debugger;
  this.getAllCustomers(modifiedBy);
    if(this.customerList.length > 0)
    {
      let nameData = this.customerList.filter(res => res.CustomerId == modifiedBy)[0];
      if(nameData)
      {
            debugger;
        let name = nameData.Name + ' (' + nameData.Skcode + ')'; 
        return name ? name : '-';
      }
    }
  }
  // getModifiedBy(modifiedBy) {
  //   // debugger;
  //   let name = this.peopleList.filter(res => res.PeopleID == modifiedBy)[0] ? this.peopleList.filter(res => res.PeopleID == modifiedBy)[0].DisplayName : '-';
  //   return name ? name : '-'
  // }

  getModifiedByPerson(modifiedBy) {

    let name = this.customerList.filter(res => res.CustomerId == modifiedBy)[0] ? this.customerList.filter(res => res.CustomerId == modifiedBy)[0].Name : '-';
    return name ? name : '-'
  }
  getModifiedByBackendPerson(modifiedBy) {

    let name = this.peopleList.filter(res => res.PeopleID == modifiedBy)[0] ? this.peopleList.filter(res => res.PeopleID == modifiedBy)[0].Name : '-';
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

  // searchCustomers(event) {


  //   if (event.query.length >= 3)
  //     this.ticketService.GetAllCustomers(event.query.toLowerCase()).subscribe(result => {



  //       this.customerList = result;

  //     })
  // }

  searchPeople(event) {

    this.pplfiltered = this.peopleList.filter(ppl => ppl.DisplayName.toLowerCase().includes(event.query.toLowerCase()))
  }

  searchDept(event) {

    this.deptFiltered = this.departmentList.filter(ppl => ppl.DepName.toLowerCase().includes(event.query.toLowerCase()))
  }

  onSelectDept(e) {

    this.ticket.DepartmentId = e.DepId ? e.DepId : 0;
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
debugger;
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
      // this.GetAllTickets()
      this.ticket = new Ticket();
    });
  }

}
