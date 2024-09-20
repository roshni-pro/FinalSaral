import { CustomerAutoCompleteService } from './../../services/customer-auto-complete.service';
import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-customer-auto-complete',
  templateUrl: './customer-auto-complete.component.html',
  styleUrls: ['./customer-auto-complete.component.scss'], providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerAutoCompleteComponent),
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
    CustomerAutoCompleteService
  ]
})
export class CustomerAutoCompleteComponent implements ControlValueAccessor {
  @ViewChild('CustomerName', { static: false }) CustomerName: any;
  isSelected: boolean;
  @Input()
  CustomerValue: any;
  CustomerList: [];
  selectedCustomer: any;
  @Input()
  CustomerTypeName: string;

  constructor(private customerAutoCompleteService: CustomerAutoCompleteService) {
    this.isSelected = false;
  }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  writeValue(value) {
    if (value !== undefined) {
      this.CustomerValue = value;
    }
  }

  registerOnTouched() { }


  getCustomerList(event) {
    if (event.query.length) {
      this.customerAutoCompleteService.GetCustomerListByName(event.query, 1)
        .subscribe(result => {
          
          this.CustomerList = result;
        });
    }

  }

  onSelectCustomer(customer) {
    
    this.CustomerValue = customer;
    this.propagateChange(this.CustomerValue);
    this.isSelected = true;

  }

  cancel() {
    this.selectedCustomer = null;
    this.CustomerValue = null;
    this.propagateChange(this.CustomerValue);
    this.isSelected = false;
  }



}
