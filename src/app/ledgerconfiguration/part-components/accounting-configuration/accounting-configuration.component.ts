import { Component, OnInit } from '@angular/core';
import { LedgerConfigurationMasterVM } from '../../../../app/shared/interface/ledger-configuration/ledger-configuration-master-vm';
import { LedgerConfigurationHeplerService } from '../../../../app/shared/services/ledger-configuration/ledger-configuration-hepler.service';
import { LedgerConfigurationService } from '../../../../app/shared/services/ledger-configuration/ledger-configuration.service';
import { MessageService } from 'primeng/api';
import { LedgerConfigurationDetailsVM } from '../../../../app/shared/interface/ledger-configuration/ledger-configuration-details-vm';
import { AccountLedgerTypeService } from '../../../../app/shared/services/ledger-configuration/account-ledger-type.service';
import { LadgerService } from '../../../../app/shared/services/ladger.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accounting-configuration',
  templateUrl: './accounting-configuration.component.html',
  styleUrls: ['./accounting-configuration.component.scss']
})
export class AccountingConfigurationComponent implements OnInit {

  ledgerConfigurationMaster: LedgerConfigurationMasterVM;
  ledgerTypeList: any[];
  vocherTypeList: any[];
  ledgerList: any[];
  selectedDebitLedger: any;
  selectedCreditLedger: any;
  isInvalid: boolean;
  isOpenPopup: boolean;
  isOpenPopupUpdate: boolean;
  ledgerConfigurationDetails: LedgerConfigurationDetailsVM;
  constructor(private ledgerConfigurationHelperService: LedgerConfigurationHeplerService,
    private ledgerConfigurationService: LedgerConfigurationService,
    private messageService: MessageService,
    private accountLedgerTypeService: AccountLedgerTypeService,
    private ledgerService: LadgerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ledgerConfigurationHelperService.ledgerConfigurationMaster.subscribe(x => {
      this.ledgerConfigurationMaster = x;
      console.log("this.ledgerConfigurationMaster" , this.ledgerConfigurationMaster )
    });
    this.getLedgerTypeList();
    this.getVocherTypeList();
    if (!this.ledgerConfigurationMaster.ledgerConfigurationDetails) {
      this.ledgerConfigurationMaster.ledgerConfigurationDetails = [];
    }

    this.intializeLedgerConfigDetails();

  }

  addNewDetail() {
    this.intializeLedgerConfigDetails();
    
    this.isOpenPopup = true;
  }

  EditDetails(data) {
    
    this.ledgerConfigurationDetails = data;
    this.isOpenPopup = true;

  }

  searchLedger(debitLedgerTypeId, event) {
    console.log('debitLedgerTypeId: ', debitLedgerTypeId)
    console.log('event: ', event.query);
    this.ledgerService.getByName(event.query, debitLedgerTypeId).subscribe(x => {
      console.log('x is', x);
      this.ledgerList = x;
    });
  }


  onSelectDebit(val, detail) {
    detail.DebitLedgerId = val.ID;
  }

  onSelectCredit(event, detail) {
    detail.CreditLedgerId = event.ID;
  }

  private getLedgerTypeList() {
    this.accountLedgerTypeService.getList().subscribe(x => {
      this.ledgerTypeList = x;
    });
  }

  save(accountConfigurationForm: any) {
    
    if (accountConfigurationForm.form.status == "VALID") {
      this.accountLedgerTypeService.postData(this.ledgerConfigurationMaster).subscribe(x => {
        
        this.ledgerConfigurationMaster = x;
        this.router.navigateByUrl('layout/ledgerconfiguration/ledgerconfigurationdetails/' + this.ledgerConfigurationMaster.Id);
        
        // this.accountLedgerTypeService.getList().subscribe(x => {
        //   
        //   this.ledgerTypeList = x;
        // })
        this.messageService.add({ severity: 'success', summary: 'Ledger Configuration Master Add Successfully!', detail: '' });
        console.log("ID", this.ledgerConfigurationMaster)
      });
    } else {
      this.isInvalid = true;
    }
  }

  saveDetails(accountAddConfigurationForm: any) {

this.ledgerConfigurationMaster.ledgerConfigurationDetails.push(this.ledgerConfigurationDetails);
    if (accountAddConfigurationForm.form.status == "VALID") {

      if (this.ledgerConfigurationDetails.IsFixedCreditLedger) {
        if (this.ledgerConfigurationDetails.CreditLedgerId == null) {

          this.messageService.add({ severity: 'error', summary: 'Please Select Debit Account!', detail: '' });
          return;
        }
      }
      if (this.ledgerConfigurationDetails.IsFixedDebitLedger) {
        if (this.ledgerConfigurationDetails.DebitLedgerId == null) {
          this.messageService.add({ severity: 'error', summary: 'Please Select Credit Account!', detail: '' });
          return;
        }

      }

      this.ledgerConfigurationDetails.LedgerConfigurationMasterId = this.ledgerConfigurationMaster.Id;
      this.accountLedgerTypeService.saveDetails(this.ledgerConfigurationDetails).subscribe(x => {
        
        
        this.getLedgerTypeList();
        this.ledgerConfigurationDetails.Id = x.Id;
        this.messageService.add({ severity: 'success', summary: 'Ledger Configuration Details Add Successfully!', detail: '' });
        
        this.intializeLedgerConfigDetails();
        
      
        this.isOpenPopup = false;
       this.ngOnInit();
        //this.ledgerConfigurationMaster.ledgerConfigurationDetails = [];
        //this.ledgerConfigurationMaster.ledgerConfigurationDetails 
      
      

       // window.location.reload();
        
        
        console.log("ID", this.ledgerConfigurationDetails)
      });
    } else {
      this.isInvalid = true;

    }

  }

  intializeLedgerConfigDetails() {
    this.ledgerConfigurationDetails = {
      CreditLedgerId: null,
      CreditLedgerTypeId: '',
      CreditPropertyName: '',
      DebitLedgerId: null,
      DebitLedgerTypeId: '',
      DebitPropertyName: '',
      Id: null,
      IsFixedCreditLedger: null,
      IsFixedDebitLedger: null,
      IsMultiple: false,
      IsSPUsed: null,
      LedgerConfigurationMasterId: null,
      ObjectIDPropertyName: '',
      ObjectType: '',
      Query: '',
      SPName: '',
      VoucherTypeId: "",
      ledgerConfigurationParameters: [],
      DebitLedgerTypeString: null,
      CreditLedgerTypeString: null,
      DebitLedgerName: null,
      CreditLedgerName: null,
      VoucherTypeName: null,
      IsPublished: false

    }


  }

  onChangeDebitFixedLedger() {
    
    if (!this.ledgerConfigurationDetails.IsFixedDebitLedger) {
      this.selectedDebitLedger = null;
      this.ledgerConfigurationDetails.DebitLedgerId = null;
    }
  }

  onChangeCreditFixedLedger () {
    if (!this.ledgerConfigurationDetails.IsFixedCreditLedger) {
      this.selectedCreditLedger = null;
      this.ledgerConfigurationDetails.CreditLedgerId = null;
    }
  }

  

  getVocherTypeList(){
    this.accountLedgerTypeService.getVocherTypeList().subscribe(x => {
      this.vocherTypeList = x;
    });


  }
}
  