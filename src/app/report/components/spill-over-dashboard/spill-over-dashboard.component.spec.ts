import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpillOverDashboardComponent } from './spill-over-dashboard.component';

describe('SpillOverDashboardComponent', () => {
  let component: SpillOverDashboardComponent;
  let fixture: ComponentFixture<SpillOverDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpillOverDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpillOverDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
