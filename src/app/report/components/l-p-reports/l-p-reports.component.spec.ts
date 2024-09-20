import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LPReportsComponent } from './l-p-reports.component';

describe('LPReportsComponent', () => {
  let component: LPReportsComponent;
  let fixture: ComponentFixture<LPReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LPReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LPReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
