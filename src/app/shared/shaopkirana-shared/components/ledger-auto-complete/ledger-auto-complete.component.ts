import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Ladger } from 'app/shared/interface/ladger';
import { LedgerAutoCompleteService } from '../../services/ledger-auto-complete.service';
import { LedgerTypeUIService } from 'app/shared/services/ledger-type-ui.service';

@Component({
  selector: 'app-ledger-auto-complete',
  templateUrl: './ledger-auto-complete.component.html',
  styleUrls: ['./ledger-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LedgerAutoCompleteComponent),
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
    LedgerAutoCompleteService
  ]
})
export class LedgerAutoCompleteComponent implements ControlValueAccessor, OnInit {


  @Input()
  ledgerValue: Ladger;
  @Input()
  ledgerTypeName: string;
  ledgerList: Ladger[];
  selectedLedger: Ladger;
  ledgerTypeList: any[];
  selectedLedgerTypeID: any;
  isSelected: boolean;
  // agent customer supplier


  constructor(private ledgerAutoCompleteService: LedgerAutoCompleteService,
    private ledgerTypeUIService: LedgerTypeUIService) {
    this.isSelected = false;
  }

  ngOnInit() {
    this.selectedLedgerTypeID = null;
    this.ledgerTypeUIService.getAll()
      .subscribe(result => {
        this.ledgerTypeList = result;
        if (this.ledgerTypeName) {
          this.selectedLedgerTypeID = this.ledgerTypeList.filter(x => {
            return x && x.code.toLowerCase() == this.ledgerTypeName.toLowerCase();
          })[0].ID;
        }
        console.log('result: ', this.ledgerTypeList);
      });
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  writeValue(value: Ladger) {
    if (value !== undefined) {
      this.ledgerValue = value;
    }
  }

  registerOnTouched() { }


  getLedgerList(event) {
    if (event.query.length > 2 && this.selectedLedgerTypeID) {
      this.ledgerAutoCompleteService.getByName(event.query, this.selectedLedgerTypeID)
        .subscribe(result => {
          this.ledgerList = result;
          console.log('this.ledgerList :', this.ledgerList);
        });
    }

  }

  onSelectLedger(event) {
    this.ledgerValue = event;
    this.propagateChange(this.ledgerValue);
    this.isSelected = true;

  }

  cancel() {
    this.selectedLedger = null;
    this.ledgerValue = null;
    this.propagateChange(this.ledgerValue);
    this.isSelected = false;
  }


  onLedgerTypeChange(){
    this.selectedLedger = null;
    this.ledgerValue = null;
    this.propagateChange(this.ledgerValue);
    this.isSelected = false;
  }

}
