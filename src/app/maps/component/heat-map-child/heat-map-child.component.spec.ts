import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapChildComponent } from './heat-map-child.component';

describe('HeatMapChildComponent', () => {
  let component: HeatMapChildComponent;
  let fixture: ComponentFixture<HeatMapChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatMapChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatMapChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
