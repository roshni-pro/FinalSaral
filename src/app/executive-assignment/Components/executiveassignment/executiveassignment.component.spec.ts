import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveassignmentComponent } from './executiveassignment.component';

describe('ExecutiveassignmentComponent', () => {
  let component: ExecutiveassignmentComponent;
  let fixture: ComponentFixture<ExecutiveassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutiveassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
