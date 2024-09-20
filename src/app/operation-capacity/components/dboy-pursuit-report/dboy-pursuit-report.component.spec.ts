import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DBoyPursuitReportComponent } from './dboy-pursuit-report.component';

describe('DBoyPursuitReportComponent', () => {
  let component: DBoyPursuitReportComponent;
  let fixture: ComponentFixture<DBoyPursuitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DBoyPursuitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DBoyPursuitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
