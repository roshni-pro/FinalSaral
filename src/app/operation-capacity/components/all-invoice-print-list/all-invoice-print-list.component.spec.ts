import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInvoicePrintListComponent } from './all-invoice-print-list.component';

describe('AllInvoicePrintListComponent', () => {
  let component: AllInvoicePrintListComponent;
  let fixture: ComponentFixture<AllInvoicePrintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInvoicePrintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInvoicePrintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
