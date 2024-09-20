import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeDashboardComponent } from './trade-dashboard.component';

describe('TradeDashboardComponent', () => {
  let component: TradeDashboardComponent;
  let fixture: ComponentFixture<TradeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
