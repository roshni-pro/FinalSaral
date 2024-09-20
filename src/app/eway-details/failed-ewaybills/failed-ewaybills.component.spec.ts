import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedEwaybillsComponent } from './failed-ewaybills.component';

describe('FailedEwaybillsComponent', () => {
  let component: FailedEwaybillsComponent;
  let fixture: ComponentFixture<FailedEwaybillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedEwaybillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedEwaybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
