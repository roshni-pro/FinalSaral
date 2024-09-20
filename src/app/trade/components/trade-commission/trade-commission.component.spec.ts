import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCommissionComponent } from './trade-commission.component';

describe('TradeCommissionComponent', () => {
  let component: TradeCommissionComponent;
  let fixture: ComponentFixture<TradeCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
