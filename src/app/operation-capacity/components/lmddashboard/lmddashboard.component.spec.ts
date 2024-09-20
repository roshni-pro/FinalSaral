import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LMDDashboardComponent } from './lmddashboard.component';

describe('LMDDashboardComponent', () => {
  let component: LMDDashboardComponent;
  let fixture: ComponentFixture<LMDDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LMDDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LMDDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
