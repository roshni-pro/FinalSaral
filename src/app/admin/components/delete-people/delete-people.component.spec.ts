import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePeopleComponent } from './delete-people.component';

describe('DeletePeopleComponent', () => {
  let component: DeletePeopleComponent;
  let fixture: ComponentFixture<DeletePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
