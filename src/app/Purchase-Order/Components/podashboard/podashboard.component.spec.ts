import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PODashboardComponent } from './podashboard.component';

describe('PODashboardComponent', () => {
  let component: PODashboardComponent;
  let fixture: ComponentFixture<PODashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PODashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PODashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
