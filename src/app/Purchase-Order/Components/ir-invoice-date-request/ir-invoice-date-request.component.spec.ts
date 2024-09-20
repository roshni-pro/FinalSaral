import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IRInvoiceDateRequestComponent } from './ir-invoice-date-request.component';

describe('IRInvoiceDateRequestComponent', () => {
  let component: IRInvoiceDateRequestComponent;
  let fixture: ComponentFixture<IRInvoiceDateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IRInvoiceDateRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IRInvoiceDateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
