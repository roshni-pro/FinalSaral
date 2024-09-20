import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetUtilizationComponent } from './fleet-utilization.component';

describe('FleetUtilizationComponent', () => {
  let component: FleetUtilizationComponent;
  let fixture: ComponentFixture<FleetUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetUtilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
