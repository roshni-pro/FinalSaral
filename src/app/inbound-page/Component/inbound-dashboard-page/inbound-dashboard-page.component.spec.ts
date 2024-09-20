import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundDashboardPageComponent } from './inbound-dashboard-page.component';

describe('InboundDashboardPageComponent', () => {
  let component: InboundDashboardPageComponent;
  let fixture: ComponentFixture<InboundDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundDashboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
