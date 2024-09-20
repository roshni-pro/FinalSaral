import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCommissionListComponent } from './trade-commission-list.component';

describe('TradeCommissionListComponent', () => {
  let component: TradeCommissionListComponent;
  let fixture: ComponentFixture<TradeCommissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCommissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCommissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
