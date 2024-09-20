import { Component, OnInit } from '@angular/core';
import { DeliverycancellationreportService } from 'app/shared/services/deliverycancellationreport/deliverycancellationreport.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-customer-wallet',
  templateUrl: './customer-wallet.component.html',
  styleUrls: ['./customer-wallet.component.scss']
})
export class CustomerWalletComponent implements OnInit {
export : any;
mannualname : any;
CustomerId : any;
blocked : boolean;
  constructor(private deliverycancellationreportService : DeliverycancellationreportService, private exportService: ExportServiceService) { this.export = {}; }

  ngOnInit() {
   
  }
  search(CustomerId)
  {
     this.deliverycancellationreportService.CustomerWalletCharges(CustomerId).subscribe(dept=>
       {
         this.export =  dept.filter(x => x.NewOutWAmount == -100);
       
       })  
  }
  exportFullCustomer() {
    this.exportService.exportAsExcelFile(this.export, 'CustomerWalletChargePoints');
  }

  clear(){
    this.CustomerId='';
  }
}
