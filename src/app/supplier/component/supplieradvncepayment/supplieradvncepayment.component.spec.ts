import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieradvncepaymentComponent } from './supplieradvncepayment.component';

describe('SupplieradvncepaymentComponent', () => {
  let component: SupplieradvncepaymentComponent;
  let fixture: ComponentFixture<SupplieradvncepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplieradvncepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieradvncepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
