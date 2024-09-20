import { Injectable } from '@angular/core';
import { LedgerConfigurationMasterVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-master-vm';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerConfigurationHeplerService {
  ledgerConfigurationMaster: BehaviorSubject<LedgerConfigurationMasterVM>;
  constructor() { }

  initialize(configuration: LedgerConfigurationMasterVM) {
    if (configuration) {
      this.ledgerConfigurationMaster = new BehaviorSubject<LedgerConfigurationMasterVM>(configuration);
    } else {
      configuration = {
        Action:'',
        Code:'',
        EntityName:'',
        Id:0,
        Name:'',
        ledgerConfigurationDetails:[],
        ledgerConfigurationMasterConditions:[],
        IsPublished: false
      }
      this.ledgerConfigurationMaster = new BehaviorSubject<LedgerConfigurationMasterVM>(configuration);
    }

  }
}
