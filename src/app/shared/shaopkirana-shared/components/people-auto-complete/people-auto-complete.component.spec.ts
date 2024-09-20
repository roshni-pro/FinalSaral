import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAutoCompleteComponent } from './people-auto-complete.component';

describe('PeopleAutoCompleteComponent', () => {
  let component: PeopleAutoCompleteComponent;
  let fixture: ComponentFixture<PeopleAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
