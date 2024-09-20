import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsaleIncentiveComponent } from './addsale-incentive.component';

describe('AddsaleIncentiveComponent', () => {
  let component: AddsaleIncentiveComponent;
  let fixture: ComponentFixture<AddsaleIncentiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsaleIncentiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsaleIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
