import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PRPaymentDetailsComponent } from './prpayment-details.component';


describe('IRPaymentDetailsComponent', () => {
  let component: PRPaymentDetailsComponent;
  let fixture: ComponentFixture<PRPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PRPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PRPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
