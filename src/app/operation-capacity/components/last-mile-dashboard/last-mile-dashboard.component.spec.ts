import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMileDashboardComponent } from './last-mile-dashboard.component';

describe('LastMileDashboardComponent', () => {
  let component: LastMileDashboardComponent;
  let fixture: ComponentFixture<LastMileDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastMileDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
