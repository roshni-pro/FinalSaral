import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerMapComponent } from './planner-map.component';

describe('PlannerMapComponent', () => {
  let component: PlannerMapComponent;
  let fixture: ComponentFixture<PlannerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
