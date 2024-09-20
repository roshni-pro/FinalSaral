import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatePeopleComponent } from './activate-people.component';

describe('ActivatePeopleComponent', () => {
  let component: ActivatePeopleComponent;
  let fixture: ComponentFixture<ActivatePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivatePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivatePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
