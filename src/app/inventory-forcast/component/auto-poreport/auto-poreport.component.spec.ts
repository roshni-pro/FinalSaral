import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPOReportComponent } from './auto-poreport.component';

describe('AutoPOReportComponent', () => {
  let component: AutoPOReportComponent;
  let fixture: ComponentFixture<AutoPOReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoPOReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoPOReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
