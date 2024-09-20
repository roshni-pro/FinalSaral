import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakDashboardComponent } from './streak-dashboard.component';

describe('StreakDashboardComponent', () => {
  let component: StreakDashboardComponent;
  let fixture: ComponentFixture<StreakDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreakDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreakDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
