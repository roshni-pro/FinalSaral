import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopDashboardComponent } from './hop-dashboard.component';

describe('HopDashboardComponent', () => {
  let component: HopDashboardComponent;
  let fixture: ComponentFixture<HopDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
