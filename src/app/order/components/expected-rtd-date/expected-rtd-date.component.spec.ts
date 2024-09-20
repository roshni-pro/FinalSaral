import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedRtdDateComponent } from './expected-rtd-date.component';

describe('ExpectedRtdDateComponent', () => {
  let component: ExpectedRtdDateComponent;
  let fixture: ComponentFixture<ExpectedRtdDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpectedRtdDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedRtdDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
