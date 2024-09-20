import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { LedgerTypeUIService } from 'app/shared/services/ledger-type-ui.service';
import { LedgeDropDownService } from '../../services/ledge-drop-down.service';
import { Ladger } from 'app/shared/interface/ladger';

@Component({
  selector: 'app-ledger-drop-down',
  templateUrl: './ledger-drop-down.component.html',
  styleUrls: ['./ledger-drop-down.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LedgerDropDownComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: (c: FormControl) => {
        let err = {
          rangeError: {
            given: c.value,
            max: 10,
            min: 0
          }
        };

        return (c.value > 10 || c.value < 0) ? err : null;
      },
      multi: true
    },
    LedgeDropDownService
  ]


})
export class LedgerDropDownComponent implements ControlValueAccessor, OnInit {
  
  
  ledgerTypeList:any[];

  selectedLedgerTypeID:any;
  ledgerType:any;
  affactedPartyLedgerID:any;
  isSelected:any;
  affactedLedgerID:any;
  ledgerList: Ladger[];
  @Input()
  selectedAffactedParty:Ladger;
  @Input()
  ledgerTypeName: string;
  
  constructor(private ledgerTypeUIService:LedgerTypeUIService,
    private ledgerdropdownService:LedgeDropDownService
    ) { }

  ngOnInit() {
    this.ledgerType={};
   this.affactedLedgerID=null;
   this.affactedPartyLedgerID=null;
    this.ledgerTypeUIService.getAll()
    .subscribe(result => {
      this.ledgerTypeList = result;

      let array=[1,12,17];
      array.forEach(element => {
        
        let newRow = this.ledgerTypeList.filter(x => { return x.ID == element })[0];
        let index = this.ledgerTypeList.indexOf(newRow);
        this.ledgerTypeList.splice(index, 1);
      });
     
      if (this.ledgerTypeName) {
        this.selectedLedgerTypeID = this.ledgerTypeList.filter(x => {
          return x && x.code.toLowerCase() == this.ledgerTypeName.toLowerCase();
        })[0].ID;
      }
      console.log('result: ', this.ledgerTypeList);
    });


  }

  onAffactedLedgerTypeChange(){
    if (this.affactedPartyLedgerID!=null) {
      this.ledgerdropdownService.GetLedger(this.affactedPartyLedgerID)
        .subscribe(result => {
          this.ledgerList = result;
          console.log('this.ledgerList :', this.ledgerList);
        });
    }

  }
 
onSelectAffectLedger(event){
  this.selectedAffactedParty = event;
  this.propagateChange( this.selectedAffactedParty);
  this.isSelected = true;

}

cancel() {
  
  this.affactedLedgerID = null;
  this.propagateChange( this.selectedAffactedParty);
  this.isSelected = false;
}
propagateChange = (_: any) => { };
registerOnChange(fn) {
  this.propagateChange = fn;
}

writeValue(value: Ladger) {
  if (value !== undefined) {
    this.selectedAffactedParty = value;
  }
}

registerOnTouched() { }

setDisabledState?(): void {}   
  

}
