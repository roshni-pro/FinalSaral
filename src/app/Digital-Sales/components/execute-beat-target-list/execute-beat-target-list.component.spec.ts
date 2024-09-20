import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteBeatTargetListComponent } from './execute-beat-target-list.component';

describe('ExecuteBeatTargetListComponent', () => {
  let component: ExecuteBeatTargetListComponent;
  let fixture: ComponentFixture<ExecuteBeatTargetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecuteBeatTargetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteBeatTargetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
