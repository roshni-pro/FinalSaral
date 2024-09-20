import { Router, ActivatedRoute } from '@angular/router';
import { AutoComplete } from 'primeng/autocomplete';
import { AgentCommissionPaymentService } from './../../services/agent-commission-payment.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentCommissionPaymentModel } from 'app/agent-commission-payment/interfaces/agent-commission';
import { LadgerService } from 'app/shared/services/ladger.service';
import { Ladger } from 'app/shared/interface/ladger';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agent-commission',
  templateUrl: './agent-commission.component.html',
  styleUrls: ['./agent-commission.component.scss']
})
export class AgentCommissionComponent implements OnInit {

  agentCommissionPayment: AgentCommissionPaymentModel;
  ledgerList: Ladger[];
  @ViewChild('agentCommissionForm', { static: false }) agentCommissionForm: NgForm;
  invalidagent: boolean;
  invalidbank: boolean;
  dateTime = new Date();
  blocked = true;


  constructor(private agentCommissionPaymentService: AgentCommissionPaymentService, private ledgerService: LadgerService,
    private messageService: MessageService, private router: Router, private r: ActivatedRoute) {
    this.agentCommissionPayment = new AgentCommissionPaymentModel();
  }

  ngOnInit() {
    this.blocked = false;
  }

  AddNewPayment() {
    if (this.agentCommissionPayment.AgentLedgerId && this.agentCommissionPayment.Amount && this.agentCommissionPayment.Narration &&
      this.agentCommissionPayment.RefNumber && this.agentCommissionPayment.Amount && this.agentCommissionPayment.BankLedgerId) {
      this.blocked = true;
      this.agentCommissionPaymentService.AddNewPayment(this.agentCommissionPayment).subscribe(result => {
        this.messageService.add({ severity: 'success', summary: 'Payment is Added!', detail: '' });
        setTimeout(() => {
          this.router.navigate(["agentCommissionPaymentList"], { relativeTo: this.r.parent });
          this.blocked = false;
        }, 1200);

      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Please Add Valid Details For Payment', detail: '' });
      this.agentCommissionPayment.AgentLedgerId == null || this.agentCommissionPayment.AgentId == null ? this.invalidagent = true : this.invalidagent = false;
      this.agentCommissionPayment.BankLedgerId == null ? this.invalidbank = true : this.invalidbank = false;
      this.agentCommissionForm.controls.Narrations.value == "" ? (this.agentCommissionForm.controls.Narrations.markAsTouched(), this.agentCommissionForm.controls.Narrations.errors.required = true) : this.agentCommissionForm.controls.Narrations.errors.required = false;
      this.agentCommissionForm.controls.refNumbr.value == "" ? (this.agentCommissionForm.controls.refNumbr.markAsTouched(), this.agentCommissionForm.controls.refNumbr.errors.required = true) : this.agentCommissionForm.controls.refNumbr.errors.required = false;
      this.agentCommissionForm.controls.amountToPay.value == null ? (this.agentCommissionForm.controls.amountToPay.markAsTouched(), this.agentCommissionForm.controls.amountToPay.errors.required = true) : this.agentCommissionForm.controls.amountToPay.errors.required = false;

    }
  }

  getLedgerList(event, ledgerTypeId) {
    if (event.query.length > 2) {
      this.agentCommissionPaymentService.getByName(event.query, ledgerTypeId)
        .subscribe(result => {
          this.ledgerList = result;
          console.log('this.ledgerList :', this.ledgerList);
        });
    }
  }

  onSelectLedger(obj, ledgerType) {
    if (ledgerType == 'agent') {
      this.agentCommissionPayment.AgentLedgerId = obj.ID;
      this.agentCommissionPayment.AgentId = obj.ObjectID;
      this.invalidagent = false;
    }
    if (ledgerType == 'bank') {
      this.agentCommissionPayment.BankLedgerId = obj.ID;
      this.invalidbank = false;
    }

  }

  checkValid(autoCmplt, ledgerType) {
    if (ledgerType == "agent") {
      if (this.agentCommissionPayment.AgentId == null || this.agentCommissionPayment.AgentLedgerId == null) {
        this.invalidagent = true;
      }
      else {
        this.invalidagent = false;
      }
    }
    if (ledgerType == "bank") {
      if (this.agentCommissionPayment.BankLedgerId == null) {
        this.invalidbank = true;
      }
      else {
        this.invalidbank = false;
      }
    }

  }

  clearBankAgentVal(ledgerType) {
    if (ledgerType == 'agent') {
      this.agentCommissionPayment.AgentLedgerId = null;
      this.agentCommissionPayment.AgentId = null;
      this.invalidagent = false;
    }
    if (ledgerType == 'bank') {
      this.agentCommissionPayment.BankLedgerId = null;
      this.invalidbank = false;
    }
  }

  goToPaymentList() {
    this.router.navigate(["agentCommissionPaymentList"], { relativeTo: this.r.parent });
  }

}
