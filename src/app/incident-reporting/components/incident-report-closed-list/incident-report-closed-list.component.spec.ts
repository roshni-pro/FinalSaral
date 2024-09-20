import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentReportClosedListComponent } from './incident-report-closed-list.component';

describe('IncidentReportClosedListComponent', () => {
  let component: IncidentReportClosedListComponent;
  let fixture: ComponentFixture<IncidentReportClosedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentReportClosedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentReportClosedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
