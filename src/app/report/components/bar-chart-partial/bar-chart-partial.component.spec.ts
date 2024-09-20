import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartPartialComponent } from './bar-chart-partial.component';

describe('BarChartPartialComponent', () => {
  let component: BarChartPartialComponent;
  let fixture: ComponentFixture<BarChartPartialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartPartialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
