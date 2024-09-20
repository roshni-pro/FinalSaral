import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityHistroyComponent } from './activity-histroy.component';

describe('ActivityHistroyComponent', () => {
  let component: ActivityHistroyComponent;
  let fixture: ComponentFixture<ActivityHistroyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityHistroyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityHistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
