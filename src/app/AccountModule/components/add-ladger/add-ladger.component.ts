import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LadgerService } from 'app/shared/services/ladger.service';
import { Ladger } from 'app/shared/interface/ladger';
import { SaveEditableRow } from 'primeng/table';
import { AccountgroupService } from 'app/shared/services/accountgroup.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LadgerTypeService } from 'app/shared/services/ladger-type.service';

@Component({
  selector: 'app-add-ladger',
  templateUrl: './add-ladger.component.html',
  styleUrls: ['./add-ladger.component.scss']
})
export class AddLadgerComponent implements OnInit {
  @Input() ladgerID: number;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  ladger: Ladger;
  accountGroupList: any[];
  ledgerTypeList: any[];
  bankTypeLedgerList: any[];
  constructor(private ladgerService: LadgerService,
    private accountgroupService: AccountgroupService,
    private router: Router,
    private messageService: MessageService,
    private ledgerTypeService: LadgerTypeService) { }

  ngOnInit() {

    this.isInvalid = false;

    this.ledgerTypeService.GetAllLadgerType().subscribe(result => {
      this.ledgerTypeList = result;
      console.log('this.ledgerTypeList: ', this.ledgerTypeList);
    });

    if (this.ladgerID) {
      this.ladgerService.get(this.ladgerID).subscribe(result => {
        this.ladger = result;

        // console.log('GetByID: ', this.accountgroupService);
        console.log('GetByID: ', this.ladger);
      })
    }

    // this.accounttype.GetAllAccountType().subscribe(result => {
    //   this.accountTypeList = result;
    //   console.log(this.accountTypeList);
    //  });



    // // this.accountgroupService.getList().subscribe(result => {
    // //   this.accountGroupList = result;
    // //   console.log(result);
    // // });

    this.getLadger();
  }

  // save(ladgerform: any) {
  save(ladgerform: any) {
    console.log('ladgerform: ', ladgerform);
    if (ladgerform.form.status == "VALID") {
      if (this.ladgerID == null) { //pz1Aug
        this.ladgerService.addLadger(this.ladger).subscribe(result => {
          this.ladger = result;
          this.messageService.add({ severity: 'success', summary: 'Saved Successfully!', detail: '' });
          // this.refreshParent.emit(); pz2Aug
          // this.refreshParent.emit(false); pz2Aug
          this.router.navigateByUrl('/layout/Account/ladger');
        },
          (err) => {
            alert("error")

          });
      } else {
        this.ladgerService.UpdateLadger(this.ladger).subscribe(result => {
          console.log('this.LadgerTypeIsasasasasaad    : ', this.ladgerID);
          this.router.navigateByUrl('layout/Account/ladger');
          // this.isdetailsclose.emit(false);
          this.refreshParent.emit(false);
          // this.expanded = false;
        },
          (err) => {
            alert("error")

          });
      }
    } else {
      this.isInvalid = true;
    }


  }






  cancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/Account/ladger');

  }

  private getLadger() {
    if (this.ladgerID) {
      this.ladgerService.get(this.ladgerID).subscribe(result => {
        this.ladger = result;
      });
    }
    else {
      this.ladger = {
        Address: '',
        Alias: '',
        Country: '',
        GSTno: '',
        GroupID: 1,
        ID: null,
        InventoryValuesAreAffected: true,
        Name: '',
        PAN: '',
        PinCode: null,
        ProvidedBankDetails: null,
        RegistrationType: '',
        Active: true
      }
    }
  }
}



