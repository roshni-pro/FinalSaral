import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseScheduleCapacityComponent } from './warehouse-schedule-capacity.component';

describe('WarehouseScheduleCapacityComponent', () => {
  let component: WarehouseScheduleCapacityComponent;
  let fixture: ComponentFixture<WarehouseScheduleCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseScheduleCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseScheduleCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
