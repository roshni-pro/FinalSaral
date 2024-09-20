import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTReportComponent } from './gstreport.component';

describe('GSTReportComponent', () => {
  let component: GSTReportComponent;
  let fixture: ComponentFixture<GSTReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSTReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
