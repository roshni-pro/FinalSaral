import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePickedSummaryComponent } from './trade-picked-summary.component';

describe('TradePickedSummaryComponent', () => {
  let component: TradePickedSummaryComponent;
  let fixture: ComponentFixture<TradePickedSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradePickedSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePickedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
