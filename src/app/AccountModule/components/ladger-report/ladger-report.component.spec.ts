import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerReportComponent } from './ladger-report.component';

describe('LadgerReportComponent', () => {
  let component: LadgerReportComponent;
  let fixture: ComponentFixture<LadgerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
