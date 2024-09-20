import { filter } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentCommissionPaymentModel } from 'app/agent-commission-payment/interfaces/agent-commission';
import { AgentCommissionPaymentService } from 'app/agent-commission-payment/services/agent-commission-payment.service';
import { LoaderService } from 'app/shared/services/loader.service';
import Swal from 'sweetalert2'
import { Table } from 'primeng/table';

@Component({
  selector: 'app-agent-commission-list',
  templateUrl: './agent-commission-list.component.html',
  styleUrls: ['./agent-commission-list.component.scss']
})
export class AgentCommissionListComponent implements OnInit {
  @ViewChild(Table, { static: false }) table: Table;
  blocked = true;

  agentCommissionPaymentList = [];
  totalRecords = 0;
  filterBy = '';
  searchFilterValue = '';
  peopleList = [];
  keepLoading = true;
  displayError = '';
  filters = [
    { name: 'Cancelled' },
    { name: 'Paid' }
  ]
  cols = [
    // { header: 'Edit' },
    { field: 'Id', header: ' Id' },
    { field: 'AgentId', header: ' Agent' },
    { field: 'Amount', header: 'Amount' },
    { field: 'PaymentDate', header: 'PaymentDate' },
    { field: 'Narration', header: 'Narration' },
    { field: 'Status', header: 'Status' },
    { field: 'BankLedgerId', header: 'BankLedgerId' },
  ];
  constructor(private agentCommissionPaymentService: AgentCommissionPaymentService, private router: Router,
    private r: ActivatedRoute, private messageService: MessageService, private loaderService: LoaderService) {

  }

  ngOnInit() {
    this.GetPeople();
  }

  getAgentCommissionPaymentList() {
    this.keepLoading = true;
    let page = { skip: 0, take: 10 };
    this.agentCommissionPaymentService.getAgentCommissionPaymentList(page)
      .subscribe(result => {

        this.agentCommissionPaymentList = result.AgentList;
        this.totalRecords = result.NetRecords;
        this.agentCommissionPaymentList.forEach(agentCommission => {
          agentCommission.SettledStatus = agentCommission.SettledStatus.replace(/\s+$/, '');
          agentCommission.AgentId = this.peopleList.filter(obj => obj.PeopleID == agentCommission.AgentId)[0].DisplayName;
        });
        this.blocked = false;
        console.log(result);
        this.keepLoading = false;
      });
  }

  CancePayment(agentCommissionPaymentId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Payment will be cancelled',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.keepLoading = true;
        this.blocked = true;
        this.agentCommissionPaymentService.cancelAgentCommissionPayment(agentCommissionPaymentId)
          .subscribe(result => {
            this.messageService.add({ severity: 'success', summary: 'Payment Cancelled!', detail: '' });
            this.agentCommissionPaymentList.filter(agentCommission => agentCommission.Id == agentCommissionPaymentId)[0].Status = 'Cancelled';
            this.keepLoading = false;
            this.blocked = false;
          });
      }
    });
  }

  load(event) {
    this.keepLoading = true;
    let page = { skip: event.first, take: event.rows };
    if (this.searchFilterValue == '') {
      this.searchFilterValue = 'noname';
      this.agentCommissionPaymentService.getAgentCommissionPaymentListByName(this.searchFilterValue, this.filterBy, page)
        .subscribe(result => {
          this.blocked = false;
          this.agentCommissionPaymentList = result.AgentList;
          this.totalRecords = result.NetRecords;
          this.agentCommissionPaymentList.forEach(agentCommission => {
            agentCommission.SettledStatus = agentCommission.SettledStatus.replace(/\s+$/, '');
            agentCommission.AgentId = this.peopleList.filter(obj => obj.PeopleID == agentCommission.AgentId)[0].DisplayName;
            this.displayError = '';
          });
          console.log('agentCommissionPaymentList:', this.agentCommissionPaymentList);
        });
      this.searchFilterValue = ''
    }
    else {
      this.agentCommissionPaymentService.getAgentCommissionPaymentListByName(this.searchFilterValue, this.filterBy, page)
        .subscribe(result => {
          this.blocked = false;
          this.agentCommissionPaymentList = result.AgentList;
          this.totalRecords = result.NetRecords;
          this.agentCommissionPaymentList.forEach(agentCommission => {
            agentCommission.SettledStatus = agentCommission.SettledStatus.replace(/\s+$/, '');
            agentCommission.AgentId = this.peopleList.filter(obj => obj.PeopleID == agentCommission.AgentId)[0].DisplayName;
            this.displayError = '';
          });
          console.log('agentCommissionPaymentList:', this.agentCommissionPaymentList);
        });
    }
  }

  navToAddItem() {
    this.router.navigate(["addAgentCommissionPayment"], { relativeTo: this.r.parent });
  }

  navToSettlePayments() {
    this.router.navigate(['../../agentpaymentsettlement'], { relativeTo: this.r });
  }

  searchFilter(filterValue) {
    this.table.reset();
    let page = { skip: 0, take: 10 };
    if (filterValue == '') {
      filterValue = 'noname';
    }

    this.agentCommissionPaymentService.getAgentCommissionPaymentListByName(filterValue, this.filterBy, page)
      .subscribe(result => {
        this.blocked = false;
        this.agentCommissionPaymentList = result.AgentList;
        this.totalRecords = result.NetRecords;
        this.agentCommissionPaymentList.forEach(agentCommission => {
          agentCommission.SettledStatus = agentCommission.SettledStatus.replace(/\s+$/, '');
          agentCommission.AgentId = this.peopleList.filter(obj => obj.PeopleID == agentCommission.AgentId)[0].DisplayName;
          this.displayError = '';
        });
        console.log('agentCommissionPaymentList:', this.agentCommissionPaymentList);
      });

  }

  GetPeople() {
    this.agentCommissionPaymentService.GetPeople()
      .subscribe(result => {
        this.blocked = false;
        this.agentCommissionPaymentList.forEach(agentCommission => {
          this.peopleList = result;
        });
        this.getAgentCommissionPaymentList();
      });
  }

}
