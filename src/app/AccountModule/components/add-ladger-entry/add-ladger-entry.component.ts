import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VoucherTypeService } from 'app/shared/services/voucher-type.service';
import { LadgerEntryService } from 'app/shared/services/ladger-entry.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LedgerEntryViewModel } from 'app/shared/interface/ledger-entry-view-model';
import { LedgerTypeUIService } from 'app/shared/services/ledger-type-ui.service';
import { LadgerService } from 'app/shared/services/ladger.service';
import { VoucherService } from 'app/shared/services/voucher.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Ladger } from 'app/shared/interface/ladger';


@Component({
  selector: 'app-add-ladger-entry',
  templateUrl: './add-ladger-entry.component.html',
  styleUrls: ['./add-ladger-entry.component.scss']
})
export class AddLadgerEntryComponent implements OnInit {
  @Input() ID: number;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  ladgerEntry: LedgerEntryViewModel;
  voucherTypeList: any;
  isFormInvalid: boolean;
  partyLedgerList: any[];
  ledgerTypeList: any[];
  partyLedgerID: null;
  affactedPartyLedgerID: null;
  selectedParty: any;
  selectedAffactedParty: any;
  vchCode: string;
  voucher: any;
  isDebit: boolean;
  affactedledgerValue : Ladger;
  constructor(private ladgerentry: LadgerEntryService,
    private vouchertype: VoucherTypeService,
    private router: Router,
    private ledgerTypeUIService: LedgerTypeUIService,
    private ledgerService: LadgerService,
    private voucherService: VoucherService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.vchCode = '';
    this.isFormInvalid = false;
    this.partyLedgerID = null;
    this.voucher = null;
    this.isDebit = false;
    if (this.ID) {
      this.ladgerentry.GetByID(this.ID).subscribe(result => {
        this.ladgerEntry = result;
        //this.ladgerEntry.Date = this.ladgerEntry.Date ? moment(this.ladgerEntry.Date).format('DD/MM/YYYY') : null
      })
    }
    else {
      this.ladgerEntry = {
        Active: true,
        AffectedLadgerID: null,
        CreatedBy: 0,
        CreatedDate: null,
        Credit: null,
        Date: new Date(),
        Debit: null,
        ID: 0,
        LagerID: null,
        ObjectID: null,
        ObjectType: '',
        Particulars: '',
        UpdatedBy: null,
        UpdatedDate: null,
        VouchersNo: null,
        VouchersTypeID: null,
        RefNo: null
      }
    }
    this.vouchertype.allMenulEdit().subscribe(result => {
      this.voucherTypeList = result;
      this.ladgerEntry.VouchersTypeID = this.voucherTypeList[0].ID;
      console.log('this.voucherTypeList: ', this.voucherTypeList);
    });

    this.ledgerTypeUIService.getAll()
      .subscribe(result => {
        this.ledgerTypeList = result;
        this.partyLedgerID = this.ledgerTypeList[0].ID;
        this.affactedPartyLedgerID = this.ledgerTypeList[1].ID;
        console.log('result: ', this.ledgerTypeList);
      });

  }
  save(bodyform) {
    
    console.log('form is: ', bodyform);
    if (bodyform.form.status == "VALID" && this.selectedParty ) {
      this.isFormInvalid = false;
      this.saveLedgerEntry();
    } else {
      this.isFormInvalid = true;
    }

  }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/Account/ladgerentry')
  }

  searchPartyLedger(event: any, ledgerID: number) {
    if (event.query && event.query.length > 2) {
      this.ledgerService.getByName(event.query, ledgerID)
        .subscribe(result => {
          this.partyLedgerList = result;
        });
    }
  }

  onSelectParty() {
    this.ladgerEntry.LagerID = this.selectedParty.ID;
    this.ladgerEntry.ObjectID = this.selectedParty.ID;
    this.ladgerEntry.ObjectType = 'Manual';
  }
  onSelectAffactedParty() {
    this.ladgerEntry.AffectedLadgerID = this.selectedAffactedParty.ID;
  }

  addVoucher() {
    if (this.vchCode) {
      this.voucherService.generate(this.vchCode)
        .subscribe(result => {
          this.voucher = result;
          this.ladgerEntry.VouchersNo = this.voucher.ID;
        });
    }
  }

  private saveLedgerEntry() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (this.ID == null) {
          //this.onSelectAffactedParty();
          this.ladgerentry.addLadgerEntry(this.ladgerEntry).subscribe(result => {
            this.router.navigateByUrl('layout/Account/ladgerreport');
          },
            (err) => {
            });
        } else {
          this.ladgerentry.UpdateLadgerEntry(this.ladgerEntry).subscribe(result => {
            this.refreshParent.emit();
          },
            (err) => {
    
            });
        }
      }
    });

  
  }


  onDebitCreditChange(){
    this.ladgerEntry.Credit = null;
    this.ladgerEntry.Debit = null;
  }

  vouchertypeChanged(VoucherId){
   if(VoucherId==7){
    this.isDebit=false;
   }else if(VoucherId==8){
    this.isDebit=true;

   }
  }
}
