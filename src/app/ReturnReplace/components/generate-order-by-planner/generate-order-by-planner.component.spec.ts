import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOrderByPlannerComponent } from './generate-order-by-planner.component';

describe('GenerateOrderByPlannerComponent', () => {
  let component: GenerateOrderByPlannerComponent;
  let fixture: ComponentFixture<GenerateOrderByPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateOrderByPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOrderByPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
