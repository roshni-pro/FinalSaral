import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePilotComponent } from './people-pilot.component';

describe('PeoplePilotComponent', () => {
  let component: PeoplePilotComponent;
  let fixture: ComponentFixture<PeoplePilotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoplePilotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
