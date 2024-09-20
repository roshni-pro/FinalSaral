import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopDahboardSummaryComponent } from './hop-dahboard-summary.component';

describe('HopDahboardSummaryComponent', () => {
  let component: HopDahboardSummaryComponent;
  let fixture: ComponentFixture<HopDahboardSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopDahboardSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopDahboardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
