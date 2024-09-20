import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRulesCreateNewComponent } from './attendance-rules-create-new.component';

describe('AttendanceRulesCreateNewComponent', () => {
  let component: AttendanceRulesCreateNewComponent;
  let fixture: ComponentFixture<AttendanceRulesCreateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceRulesCreateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceRulesCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
