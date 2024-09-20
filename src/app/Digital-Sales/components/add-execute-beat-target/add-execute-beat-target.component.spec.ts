import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExecuteBeatTargetComponent } from './add-execute-beat-target.component';

describe('AddExecuteBeatTargetComponent', () => {
  let component: AddExecuteBeatTargetComponent;
  let fixture: ComponentFixture<AddExecuteBeatTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExecuteBeatTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExecuteBeatTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
