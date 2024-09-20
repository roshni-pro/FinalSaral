import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchToSpendTrackerComponent } from './dispatch-to-spend-tracker.component';

describe('DispatchToSpendTrackerComponent', () => {
  let component: DispatchToSpendTrackerComponent;
  let fixture: ComponentFixture<DispatchToSpendTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchToSpendTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchToSpendTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
