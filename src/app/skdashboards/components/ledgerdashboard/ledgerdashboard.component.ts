import { Component, OnInit } from '@angular/core';
import { LadgerEntryService } from 'app/shared/services/ladger-entry.service';
import { LadgerService } from 'app/shared/services/ladger.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-ledgerdashboard',
  templateUrl: './ledgerdashboard.component.html',
  styleUrls: ['./ledgerdashboard.component.scss']
})
export class LedgerdashboardComponent implements OnInit {
  ledgerList: any[];
  constructor(private LadgerEntryService: LadgerEntryService, private ledgerService: LadgerService) { }

  ngOnInit() {
    this.LadgerEntryService.getledgerReport().subscribe(result => {
      this.ledgerList = result;
      //this.ledgerReport = result;

    })
  }

  downloadConsolidatedLadger() {
    try {

        this.ledgerService.SupplierConsolidatedLedger().subscribe(result => {
          window.open(environment.apiURL + '/' + result);
        });

    }
    catch (error) {

    }

  }

}
