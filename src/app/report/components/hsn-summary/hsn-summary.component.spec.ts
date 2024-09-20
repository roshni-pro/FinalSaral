import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsnSummaryComponent } from './hsn-summary.component';

describe('HsnSummaryComponent', () => {
  let component: HsnSummaryComponent;
  let fixture: ComponentFixture<HsnSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsnSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsnSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
