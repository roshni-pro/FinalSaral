import { Component, OnInit } from '@angular/core';
import { LedgerConfigurationHeplerService } from 'app/shared/services/ledger-configuration/ledger-configuration-hepler.service';
import { LedgerConfigurationService } from 'app/shared/services/ledger-configuration/ledger-configuration.service';
import { LedgerConfigurationMasterVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-master-vm';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ledgerconfigurationdetails',
  templateUrl: './ledgerconfigurationdetails.component.html',
  styleUrls: ['./ledgerconfigurationdetails.component.scss'],

})
export class LedgerconfigurationdetailsComponent implements OnInit {
  menuItems: MenuItem[];
  activeMenuIndex: number;

  ledgerConfigurationMaster: LedgerConfigurationMasterVM;
  constructor(private ledgerConfigurationHelperService: LedgerConfigurationHeplerService,
    private ledgerConfigurationService: LedgerConfigurationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initializeSteps();
    let masterId = this.activatedRoute.snapshot.paramMap.get('detailId');
    if (masterId) {
      this.initializeOnEdit(Number(masterId));
    } else {
      this.initializeOnAdd();
    }

  }


  initializeOnAdd() {
    this.activeMenuIndex = 0;
    this.ledgerConfigurationHelperService.initialize(null);
    this.ledgerConfigurationHelperService.ledgerConfigurationMaster.subscribe(x => {
      this.ledgerConfigurationMaster = x;
    });
  }

  initializeOnEdit(masterId: number) {
    this.activeMenuIndex = 0;
    this.ledgerConfigurationService.getByID(masterId).subscribe(x => {
      let master = x;
      this.ledgerConfigurationHelperService.initialize(master);
      this.ledgerConfigurationHelperService.ledgerConfigurationMaster.subscribe(xyz => {
        this.ledgerConfigurationMaster = xyz;
      });
    });

  }

  private initializeSteps() {
    this.menuItems = [{
      label: 'Accounting',
      command: (event: any) => {
        this.activeMenuIndex = 0;
        this.messageService.add({ severity: 'info', summary: 'First Step', detail: event.item.label });
      }
    },
    {
      label: 'Developers',
      command: (event: any) => {
        
        if (!this.checkIfIdExists()) {
          this.activeMenuIndex = 0;
          this.messageService.add({ severity: 'info', summary: 'error', detail: "please save master first" });
        } else {
          this.activeMenuIndex = 1;
          this.messageService.add({ severity: 'info', summary: 'Second Step', detail: event.item.label });
        }

      }
    },
    {
      label: 'Tester',
      command: (event: any) => {
        this.activeMenuIndex = 2;
        this.messageService.add({ severity: 'info', summary: 'Third Step', detail: event.item.label });
      }
    },
    {
      label: 'Confirmation',
      command: (event: any) => {
        this.activeMenuIndex = 3;
        this.messageService.add({ severity: 'info', summary: 'Last Step', detail: event.item.label });
      }
    }
    ];
  }

  checkIfIdExists(): boolean {
    if (this.ledgerConfigurationMaster && this.ledgerConfigurationMaster.Id) {
      return true;
    } else {
      return false;
    }
  }

}
