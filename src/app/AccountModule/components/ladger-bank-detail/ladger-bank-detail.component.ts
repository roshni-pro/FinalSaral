import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LadgerService } from 'app/shared/services/ladger.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ladger-bank-detail',
  templateUrl: './ladger-bank-detail.component.html',
  styleUrls: ['./ladger-bank-detail.component.scss']
})
export class LadgerBankDetailComponent implements OnInit {
  cols: any[];
  bankList : any;
  constructor(private messageService : MessageService, private router : Router, private ladgerService : LadgerService) { }

  ngOnInit() {
    this.cols = [
      // { header: 'Edit' },
      { field: 'Name', header: 'Name'  },   
      // { field: 'Alias', header: 'Alias' },    
      // { field: 'InventoryValuesAreAffected', header: 'Inventory Values Are Affected' },
      // { field: 'ProvidedBankDetails', header: 'Provided Bank Details' },     
      { field: 'LadgertypeID', header: 'Ladger Type ID' },     
      { field: 'Active', header: 'Active' },  
      // { field: 'CreatedBy', header: 'Created By' },  
      { field: 'CreatedDate', header: 'Created Date' },  
      // { field: 'UpdatedBy', header: 'Updated By' },  
      // { field: 'UpdatedDate', header: 'Updated Date' },  
    ];

    this.ladgerService.GetBankList().subscribe(result =>{
      this.bankList = result;
      for(var i in this.bankList){
        this.bankList[i].CreatedDate = this.bankList[i].CreatedDate ? moment(this.bankList[i].CreatedDate).format('DD/MM/YYYY') : null
        this.bankList[i].UpdatedDate = this.bankList[i].UpdatedDate ? moment(this.bankList[i].UpdatedDate).format('DD/MM/YYYY') : null
        }
    })
  }

  addBank(){
    this.router.navigateByUrl("layout/Account/addladgerbankdetail");
  }

}
