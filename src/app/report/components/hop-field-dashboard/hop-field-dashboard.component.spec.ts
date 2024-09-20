import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopFieldDashboardComponent } from './hop-field-dashboard.component';

describe('HopFieldDashboardComponent', () => {
  let component: HopFieldDashboardComponent;
  let fixture: ComponentFixture<HopFieldDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopFieldDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopFieldDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
