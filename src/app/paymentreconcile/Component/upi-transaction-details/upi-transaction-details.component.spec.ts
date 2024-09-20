import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiTransactionDetailsComponent } from './upi-transaction-details.component';

describe('UpiTransactionDetailsComponent', () => {
  let component: UpiTransactionDetailsComponent;
  let fixture: ComponentFixture<UpiTransactionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpiTransactionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
