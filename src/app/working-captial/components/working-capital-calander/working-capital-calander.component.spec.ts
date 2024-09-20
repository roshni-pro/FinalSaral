import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingCapitalCalanderComponent } from './working-capital-calander.component';

describe('WorkingCapitalCalanderComponent', () => {
  let component: WorkingCapitalCalanderComponent;
  let fixture: ComponentFixture<WorkingCapitalCalanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingCapitalCalanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingCapitalCalanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
