import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrPaymentSummaryComponent } from './pr-payment-summary.component';


describe('PrPaymentSummaryComponent', () => {
  let component: PrPaymentSummaryComponent;
  let fixture: ComponentFixture<PrPaymentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrPaymentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrPaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
