import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsReportComponent } from './cms-report.component';

describe('CmsReportComponent', () => {
  let component: CmsReportComponent;
  let fixture: ComponentFixture<CmsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
