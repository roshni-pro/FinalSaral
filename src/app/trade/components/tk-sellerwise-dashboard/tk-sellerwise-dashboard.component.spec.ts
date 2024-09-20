import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TkSellerwiseDashboardComponent } from './tk-sellerwise-dashboard.component';

describe('TkSellerwiseDashboardComponent', () => {
  let component: TkSellerwiseDashboardComponent;
  let fixture: ComponentFixture<TkSellerwiseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TkSellerwiseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TkSellerwiseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
