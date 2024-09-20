import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTrackerComponent } from './trip-tracker.component';

describe('TripTrackerComponent', () => {
  let component: TripTrackerComponent;
  let fixture: ComponentFixture<TripTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
