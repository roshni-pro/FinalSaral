import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentpaymentsettlementService } from 'app/agentpaymentsettlement/services/agentpaymentsettlement.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-agent-payment-settlement-list',
  templateUrl: './agent-payment-settlement-list.component.html',
  styleUrls: ['./agent-payment-settlement-list.component.scss']
})
export class AgentPaymentSettlementListComponent implements OnInit {

  @ViewChild(Table, { static: false }) table: Table;
  blocked = true;

  agentPaymentSettlementList = [];
  totalRecords = 0;
  filterBy = '';
  searchFilterValue = '';
  peopleList = [];
  keepLoading = true;
  displayError = '';
  filters = [
    { name: 'Settled' },
    { name: 'Partially Settled' }
  ]
  cols = [
    // { header: 'Edit' },
    { field: 'Id', header: ' Id' },
    { field: 'AgentName', header: 'AgentName' },
    { field: 'Amount', header: ' Amount' },
    { field: 'SettleDate', header: 'SettleDate' },
    { field: 'AssignmentId', header: 'AssignmentId' },
    { field: 'Status', header: 'Status' },
  ];

  constructor(private agentpaymentsettlementService: AgentpaymentsettlementService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    this.getagentPaymentSettlementList();
  }

  getagentPaymentSettlementList() {
    this.blocked = true;
    let page = { skip: 0, take: 10 };
    this.agentpaymentsettlementService.getAgentPaymentSettlementList(page)
      .subscribe(result => {
        
        this.blocked = false;
        this.agentPaymentSettlementList = result.AgentSettlementList;
        this.totalRecords = result.NetRecords;
        console.log(result);
        this.keepLoading = false;
      });
  }

  load(event) {
    this.blocked = true;
    let page = { skip: event.first, take: event.rows };
    if (this.searchFilterValue == '') {
      this.searchFilterValue = 'noname';
      this.agentpaymentsettlementService.getAgentPaymentSettlementByName(this.searchFilterValue, this.filterBy, page)
        .subscribe(result => {
          this.blocked = false;
          this.agentPaymentSettlementList = result.AgentSettlementList;
          this.totalRecords = result.NetRecords;
          console.log('agentPaymentSettlementList:', this.agentPaymentSettlementList);
        });
      this.searchFilterValue = ''
    }
    else {
      this.agentpaymentsettlementService.getAgentPaymentSettlementByName(this.searchFilterValue, this.filterBy, page)
        .subscribe(result => {
          this.blocked = false;
          this.agentPaymentSettlementList = result.AgentSettlementList;
          this.totalRecords = result.NetRecords;
          console.log('agentPaymentSettlementList:', this.agentPaymentSettlementList);
        });
    }
  }

  searchFilter(filterValue) {
    this.table.reset();
    let page = { skip: 0, take: 10 };
    if (filterValue == '') {
      filterValue = 'noname';
    }

    this.agentpaymentsettlementService.getAgentPaymentSettlementByName(filterValue, this.filterBy, page)
      .subscribe(result => {
        this.blocked = false;
        this.agentPaymentSettlementList = result.AgentSettlementList;
        this.totalRecords = result.NetRecords;
        console.log('agentPaymentSettlementList:', this.agentPaymentSettlementList);
      });

  }

  navToSettlePayments() {
    this.router.navigate(["agentpaymentsettlement"], { relativeTo: this.r.parent });
  }
}
