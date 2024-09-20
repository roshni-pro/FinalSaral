import { PeopleAutoCompleteService } from './../../services/people-auto-complete.service';
import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-people-auto-complete',
  templateUrl: './people-auto-complete.component.html',
  styleUrls: ['./people-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeopleAutoCompleteComponent),
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
    PeopleAutoCompleteService
  ]
})
export class PeopleAutoCompleteComponent implements ControlValueAccessor {

  @ViewChild('PeopleName', { static: false }) PeopleName: any;
  isSelected: boolean;
  @Input()
  peopleValue: any;
  peopleList: [];
  selectedPeople: any;
  @Input()
  peopleTypeName: string;

  constructor(private peopleAutoCompleteService: PeopleAutoCompleteService) {
    this.isSelected = false;
  }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  writeValue(value) {
    if (value !== undefined) {
      this.peopleValue = value;
    }
  }

  registerOnTouched() { }


  getPeopleList(event) {
    if (event.query.length) {
      this.peopleAutoCompleteService.GetPeopleListByName(event.query)
        .subscribe(result => {
          
          this.peopleList = result;
        });
    }

  }

  onSelectPeople(people) {
    
    this.peopleValue = people;
    this.propagateChange(this.peopleValue);
    this.isSelected = true;

  }

  cancel() {
    this.selectedPeople = null;
    this.peopleValue = null;
    this.propagateChange(this.peopleValue);
    this.isSelected = false;
  }



}
