import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KPPReportComponent } from './kppreport.component';

describe('KPPReportComponent', () => {
  let component: KPPReportComponent;
  let fixture: ComponentFixture<KPPReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KPPReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KPPReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
