import { Component, OnInit } from '@angular/core';
import { LedgerConfigurationService } from 'app/shared/services/ledger-configuration/ledger-configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ledgerlist',
  templateUrl: './ledgerlist.component.html',
  styleUrls: ['./ledgerlist.component.scss']
})
export class LedgerlistComponent implements OnInit {

  constructor(private ledgerConfigurationMasterservice :LedgerConfigurationService,private router : Router) { }
  ledgerlist:any[];

  ngOnInit() {
    this.ledgerConfigurationMasterservice.getMasterList().subscribe(x => {
      this.ledgerlist = x;
      console.log('ledgerConfigurationMaster list: ', this.ledgerlist);
    });

  }
  redirectledgermaster(Id){
if(Id>0){
    this.router.navigateByUrl('layout/ledgerconfiguration/ledgerconfigurationdetails/'+ Id);
  }  else  
  {
  this.router.navigateByUrl('layout/ledgerconfiguration/ledgerconfigurationdetails');
  }
}

}
