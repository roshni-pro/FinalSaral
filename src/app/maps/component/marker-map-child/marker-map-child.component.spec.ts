import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerMapChildComponent } from './marker-map-child.component';

describe('MarkerMapChildComponent', () => {
  let component: MarkerMapChildComponent;
  let fixture: ComponentFixture<MarkerMapChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerMapChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerMapChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
