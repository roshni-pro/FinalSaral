import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmenttatComponent } from './assignmenttat.component';

describe('AssignmenttatComponent', () => {
  let component: AssignmenttatComponent;
  let fixture: ComponentFixture<AssignmenttatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmenttatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmenttatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
