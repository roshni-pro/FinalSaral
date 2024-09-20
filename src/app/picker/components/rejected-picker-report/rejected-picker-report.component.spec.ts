import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPickerReportComponent } from './rejected-picker-report.component';

describe('RejectedPickerReportComponent', () => {
  let component: RejectedPickerReportComponent;
  let fixture: ComponentFixture<RejectedPickerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedPickerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedPickerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
