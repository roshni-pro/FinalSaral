import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackedOrderInvoiceComponent } from './backed-order-invoice.component';

describe('BackedOrderInvoiceComponent', () => {
  let component: BackedOrderInvoiceComponent;
  let fixture: ComponentFixture<BackedOrderInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackedOrderInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackedOrderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
