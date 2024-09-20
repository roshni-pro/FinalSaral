import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConditionComponent } from './event-condition.component';

describe('EventConditionComponent', () => {
  let component: EventConditionComponent;
  let fixture: ComponentFixture<EventConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
