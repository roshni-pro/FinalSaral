import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CityService } from 'app/shared/services/city.service';
import { ZoneService } from 'app/shared/services/zone.service';
import { CountryService } from 'app/shared/services/country.service';
import { PeopleService } from 'app/shared/services/people.service';
import { MessageService } from 'primeng/api';
import { LadgerService } from 'app/shared/services/ladger.service';

@Component({
  selector: 'app-add-ladger-bank-detail',
  templateUrl: './add-ladger-bank-detail.component.html',
  styleUrls: ['./add-ladger-bank-detail.component.scss']
})
export class AddLadgerBankDetailComponent implements OnInit {
@Input() Name: any;
bank: any;
banknameList: any;
BankName: any;
nameList: any;
bankdetail : any;
IsExist : boolean;
@Output() refreshParent = new EventEmitter();
@Output() isdetailsclose = new EventEmitter<boolean>();

constructor(private ladgerService: LadgerService, private messageService: MessageService, private router: Router) { this.bank = {}; }

ngOnInit() {

  this.ladgerService.GetBankName().subscribe(result => {
    
    this.banknameList = result;
    this.nameList = this.banknameList.BankNameDc;
    console.log('nameListBankName::::',this.nameList[1].BankName);
    console.log('banknameListbanknameListbanknameList::::',this.banknameList);

    console.log('banknameList BankNameDc ::::',this.banknameList.BankNameDc);
    console.log('banknameList BankNameDc  BankName::::',this.banknameList.BankNameDc.BankName);
  })
 
}

onCancel() {
  this.isdetailsclose.emit(false);
  this.router.navigateByUrl('layout/Account/ladgerbankdetail');
}

update(Name){
  
  console.log('Name ::::',this.Name);
  //Name==this.nameList.BankName;
  //this.bankdetail = this.nameList;
  
 // console.log('bankdetail ::::',this.bankdetail);
  this.ladgerService.AddBankDetail(this.Name).subscribe(result =>{
    
    this.bankdetail = result;
    console.log('bankdetailbankdetailbankdetailbankdetailbankdetailbankdetailbankdetail ::::',this.bankdetail);
    this.messageService.add({ severity: 'success', summary: 'Bank is Added!', detail: '' });
    
  })
}

onChangeBank(){
  
  this.ladgerService.GetBankMatch(this.Name).subscribe(result =>{
    
    this.IsExist = false;
    if(result == null)
    {
      this.IsExist = true;
      console.log('result Name Check :::: ',result);
      this.messageService.add({ severity: 'error', summary: 'Bank Already Exist!', detail: '' });
    }  
    console.log('result Name :::: ',result);  
  });
  
}



}

