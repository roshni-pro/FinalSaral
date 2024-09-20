import { Component, OnInit } from '@angular/core';
import { LedgerConfigurationHeplerService } from 'app/shared/services/ledger-configuration/ledger-configuration-hepler.service';
import { LedgerConfigurationService } from 'app/shared/services/ledger-configuration/ledger-configuration.service';
import { AccountLedgerTypeService } from 'app/shared/services/ledger-configuration/account-ledger-type.service';
import { LadgerService } from 'app/shared/services/ladger.service';
import { LedgerConfigurationMasterVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-master-vm';
import { LedgerConfigurationDetailsVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-details-vm';

@Component({
  selector: 'app-tester-configuration',
  templateUrl: './tester-configuration.component.html',
  styleUrls: ['./tester-configuration.component.scss']
})
export class TesterConfigurationComponent implements OnInit {
  ledgerConfigurationMaster: LedgerConfigurationMasterVM;
  constructor(private ledgerConfigurationHelperService: LedgerConfigurationHeplerService,
    private ledgerConfigurationService: LedgerConfigurationService,
    private accountLedgerTypeService: AccountLedgerTypeService,
    private ledgerService: LadgerService) { }

  ngOnInit() {
  
    this.ledgerConfigurationHelperService.ledgerConfigurationMaster.subscribe(x => {
      this.ledgerConfigurationMaster = x;
      console.log('  this.ledgerConfigurationMaster: ', this.ledgerConfigurationMaster);
    });
  }

  onPublish(){
    alert(this.ledgerConfigurationMaster.IsPublished);
  }

  onDetailPublish(detail: LedgerConfigurationDetailsVM){
    alert(detail.IsPublished);
  }

}
