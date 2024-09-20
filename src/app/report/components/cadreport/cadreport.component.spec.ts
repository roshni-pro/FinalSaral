import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CADReportComponent } from './cadreport.component';

describe('CADReportComponent', () => {
  let component: CADReportComponent;
  let fixture: ComponentFixture<CADReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CADReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CADReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
