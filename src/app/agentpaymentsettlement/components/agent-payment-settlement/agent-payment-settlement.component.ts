import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { AssignmentCommission } from './../../interfaces/AssignmentCommission';
import { AgentCommissionPaymentModel } from 'app/agent-commission-payment/interfaces/agent-commission';
import { AgentpaymentsettlementService } from './../../services/agentpaymentsettlement.service';
import { AgentPaymentSettlement } from './../../interfaces/AgentPaymentSettlement';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgentCommissionPaymentService } from 'app/agent-commission-payment/services/agent-commission-payment.service';
import { Table } from 'primeng/table';
import { AssignmentCommissionDetail } from 'app/agentpaymentsettlement/interfaces/AssignmentCommissionDetails';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-agent-payment-settlement',
  templateUrl: './agent-payment-settlement.component.html',
  styleUrls: ['./agent-payment-settlement.component.scss']
})
export class AgentPaymentSettlementComponent implements OnInit {
  @ViewChild(Table, { static: false }) table: Table;
  @ViewChild(NgForm, { static: false }) settleMentForm: NgForm;
  isLoading: boolean = true;
  agentCommissionPaymentList: AgentCommissionPaymentModel[];
  assignmentCommissions = [];
  agentList = [];
  agentCommission: AgentCommissionPaymentModel;
  agentPaymentSettlement: AgentPaymentSettlement;
  agentPaymentSettlementList: AgentPaymentSettlement[];
  objectId: number;
  amount: number = 0;
  totalAmount: number = 0;
  totalRecords: number = 0;
  totalremainingamount: number = 0;
  invalidagent: boolean;
  agentName: string;
  display = false;
  netAmount = 0;
  assignmentCommissionDetail: AssignmentCommissionDetail[] = [];
  assignmentCommissionDetailsList = []

  detailCols = [
    { field: 'OrderId', header: ' OrderId' },
    { field: 'ItemName', header: 'ItemName' },
    { field: 'TotalAmount', header: ' TotalAmount' },
    { field: 'CommissionAmount', header: 'CommissionAmount' },
    { field: 'CommissionPercentage', header: 'CommissionPercentage' },
  ];

  constructor(private router: Router,
    private r: ActivatedRoute, private agentCommissionPaymentService: AgentCommissionPaymentService,
    private agentpaymentsettlementService: AgentpaymentsettlementService, private messageService: MessageService) {
    this.agentPaymentSettlement = new AgentPaymentSettlement();
    this.agentPaymentSettlementList = [];
  }

  ngOnInit() {
    this.agentCommission = new AgentCommissionPaymentModel();
    this.agentPaymentSettlement = new AgentPaymentSettlement();
    this.isLoading = false;
  }

  navToList() {
    this.router.navigate(['../../agentcommissionpayments/agentCommissionPaymentList'], { relativeTo: this.r });
  }

  getAgentList(event, ledgerTypeId) {
    if (event.query.length > 2) {
      this.agentCommissionPaymentService.getByName(event.query, ledgerTypeId)
        .subscribe(result => {
          this.agentList = result;
        });
    }
  }

  onSelectAgent(obj) {
    this.invalidagent = false;
    this.agentName = obj.Name;
    this.objectId = obj.ObjectID
    this.GetAgentCommissionPaymentsByAgentId(obj.ObjectID);
    this.GetAssignmentCommissionsByAgentId(obj.ObjectID);
  }

  GetAgentCommissionPaymentsByAgentId(ObjectID) {
    this.agentpaymentsettlementService.GetAgentCommissionPaymentsByAgentId(ObjectID)
      .subscribe(result => {
        this.agentCommissionPaymentList = result;
      });
  }

  GetAssignmentCommissionsByAgentId(ObjectID) {
    let page = { skip: 0, take: 10 };
    this.agentpaymentsettlementService.GetAssignmentCommissions(ObjectID, page)
      .subscribe(result => {
        this.assignmentCommissions = result.AssignmentCommissionList;
        this.assignmentCommissions.forEach(commission => {
          commission.active = false;
          this.totalAmount += commission.CommissionAmount;
        });
        this.totalRecords = result.NetRecords;
      });
  }

  load(event) {
    this.assignmentCommissions = [];
    let page = { skip: event.first, take: event.rows };
    if (this.objectId) {
      this.agentpaymentsettlementService.GetAssignmentCommissions(this.objectId, page)
        .subscribe(result => {
          result.AssignmentCommissionList.forEach(commission => {
            this.totalAmount += commission.CommissionAmount;
            if (this.agentPaymentSettlementList.filter(settlement => settlement.AssignmentCommissionId == commission.Id)[0]) {
              commission.active = true;
            }
            else {
              commission.active = false;
            }
          });
          this.assignmentCommissions = result.AssignmentCommissionList;
          this.totalRecords = result.NetRecords;
        });
    }
  }

  addPaymentSettlementList(event, rowData) {
    let agentPaymentSettlement = new AgentPaymentSettlement();
    let assignmentCommission = this.assignmentCommissions.filter(assignmentCommission => assignmentCommission.Id == rowData.Id)[0]
    let amountToAdd = -(this.totalremainingamount - (assignmentCommission.CommissionAmount - assignmentCommission.PaidAmount))
    agentPaymentSettlement.Amount = assignmentCommission.CommissionAmount - assignmentCommission.PaidAmount;
    agentPaymentSettlement.SettleDate = new Date();
    agentPaymentSettlement.AssignmentCommissionId = assignmentCommission.Id;
    agentPaymentSettlement.AgentCommissionPaymentId = this.agentCommission.Id;

    let itemIndex = this.agentPaymentSettlementList.findIndex(appItem => appItem.AssignmentCommissionId == assignmentCommission.Id);

    if (itemIndex != -1) {
      this.totalremainingamount = this.totalremainingamount + (assignmentCommission.CommissionAmount - assignmentCommission.PaidAmount);
      this.agentPaymentSettlementList.splice(itemIndex, 1);
      assignmentCommission.active = false;
      event.target.checked = false;
    }
    else {
      if (amountToAdd > 0) {
        agentPaymentSettlement.Amount = ((assignmentCommission.CommissionAmount - assignmentCommission.PaidAmount) - amountToAdd);
        if (this.totalremainingamount != 0) {
          this.agentPaymentSettlementList.push(agentPaymentSettlement);
          assignmentCommission.active = true;
        }
        else {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Amount', detail: 'Amount Exceeds Total Amount Limit' });
          assignmentCommission.active = false;
          event.target.checked = false;
        }
        this.totalremainingamount = (this.totalremainingamount - (assignmentCommission.CommissionAmount - assignmentCommission.PaidAmount)) + amountToAdd;
      }
      else {
        this.totalremainingamount = this.totalremainingamount - (assignmentCommission.CommissionAmount - assignmentCommission.PaidAmount);
        this.agentPaymentSettlementList.push(agentPaymentSettlement);
        assignmentCommission.active = true;

      }
    }
    
    if (!this.agentPaymentSettlementList.length || this.agentPaymentSettlementList.length == 0) {
      
      this.totalremainingamount = this.netAmount;
    }
  }

  setAgentCommission(Id) {
    this.netAmount = 0;
    this.totalremainingamount = 0;
    this.agentCommission = new AgentCommissionPaymentModel();
    this.agentCommission = this.agentCommissionPaymentList.filter(ac => ac.Id == Id)[0];
    this.GetAssignmentCommissionsByAgentId(this.agentCommission.AgentId);
    if (!this.assignmentCommissions.length) {
      this.isLoading = false
      this.messageService.add({ severity: 'error', summary: "Error", detail: 'No assignment found for this commission' });
    }
    this.agentPaymentSettlementList = [];
    this.netAmount = this.agentCommission.Amount - this.agentCommission.SettledAmount;
    this.totalremainingamount = this.netAmount;
  }

  save() {
    this.isLoading = true;
    if (!this.agentName || this.agentName == '') {
      this.invalidagent = true;
      this.isLoading = false
      this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Please enter valid details for Agent' });
    }
    else {
      if (this.agentPaymentSettlementList.length) {
        this.isLoading = true;
        this.agentpaymentsettlementService.saveAgentPaymentSettlementList(this.agentPaymentSettlementList)
          .subscribe(result => {
            
            this.isLoading = false;
            if (result.IsSuccess) {
              this.messageService.add({ severity: 'success', summary: 'Saved', detail: '' });
              this.GetAssignmentCommissionsByAgentId(this.objectId);
              this.GetAgentCommissionPaymentsByAgentId(this.objectId);
              this.agentPaymentSettlementList = [];
              this.netAmount = this.totalremainingamount;

            }
            else {
              this.isLoading = false;
              this.messageService.add({ severity: 'error', summary: "Error", detail: result.ErrorMessage });
            }
          });
      }
      else {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Settlement List', detail: 'Please Add items to Settlement List' });
      }
    }

  }

  getAssignmentDetailById(Id) {
    this.agentpaymentsettlementService.GetAssignmentDetailById(Id)
      .subscribe(result => {
        this.assignmentCommissionDetail = result;
        this.display = true
      });
  }

  clearData() {
    this.agentName = '';
    this.invalidagent = true;
    this.agentList = [];
    this.netAmount = 0;
    this.agentName = '';
    this.objectId = null;
    this.settleMentForm.reset();
    this.agentPaymentSettlementList = [];
    this.assignmentCommissions = [];
    this.agentCommissionPaymentList = [];
    this.agentCommission = new AgentCommissionPaymentModel();
  }

  navToPaymentList() {
    this.router.navigate(['../../agentcommissionpayments/agentCommissionPaymentList'], { relativeTo: this.r });
  }

  navToNewPayment() {
    this.router.navigate(['../../agentcommissionpayments/'], { relativeTo: this.r });
  }

  navToSettlementList() {
    this.router.navigate(["settlementlist"], { relativeTo: this.r.parent });
  }

  checkValid(autoCmplt, ledgerType) {
    if (ledgerType == "agent") {
      if (this.objectId == null) {
        this.invalidagent = true;
      }
      else {
        this.invalidagent = false;
      }
    }
  }

  getTotal(assignmentCommissionDetail) {
    
    let amountTotal = 0;
    assignmentCommissionDetail.forEach(assignmentCommission => {
      amountTotal += assignmentCommission.CommissionAmount;
    });
    return amountTotal;
  }

  calculateTotalAmount(assignmentCommissions) {
    let amountTotal = 0;
    assignmentCommissions.forEach(assignmentCommission => {
      amountTotal += (assignmentCommission.CommissionAmount - assignmentCommission.PaidAmount);
    });
    return amountTotal;
  }

  ExportToExcel() {
    this.assignmentCommissionDetailsList = []
    this.assignmentCommissionDetail.forEach((appItem, index) => {
      if (true) {
        this.assignmentCommissionDetailsList.push({
          OrderId: appItem.OrderId,
          ItemName: appItem['ItemName'],
          TotalAmount: appItem.TotalAmount,
          CommissionAmount: appItem.CommissionAmount,
          CommissionPercentage: appItem.CommissionPercentage
        }
        );
      }
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.assignmentCommissionDetail);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'AssignmentCommissionDetails');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }
}
