import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedeliveryassignmentComponent } from './createdeliveryassignment.component';

describe('CreatedeliveryassignmentComponent', () => {
  let component: CreatedeliveryassignmentComponent;
  let fixture: ComponentFixture<CreatedeliveryassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedeliveryassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedeliveryassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
